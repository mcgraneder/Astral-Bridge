import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState
} from 'react';
import { useWeb3React } from '@web3-react/core';
import { ChainIdToRenChain } from '../connection/chains';
import { Chain, Asset } from '@renproject/chains';
import API from '../constants/Api';
import { SetStateAction, Dispatch } from 'react';
import { chainsBaseConfig, ChainConfig } from '../utils/chainsConfig';
import { get, post } from '../services/axios';
import ErrorCodes from '../constants/errorCodes';
import { ResponseData } from '../pages/api/user';
import useAuth from '../hooks/useAuth';
import { UserTxType } from '../components/transactions/components/TransactionTable';
import { useViewport } from '../hooks/useViewport';
import { useNotification } from './useNotificationState';
import { get } from "../services/axios"
interface GlobalStateProviderProps {
    children: React.ReactNode;
}

type GlobalContextType = {
    memoizedFetchBalances: () => Promise<void>;
    assetBalances: {
        [x: string]: MulticallReturn | undefined;
    };
    fetchingBalances: boolean;
    pendingTransaction: boolean;
    setPendingTransaction: Dispatch<SetStateAction<boolean>>;
    fromChain: ChainConfig;
    setFromChain: any;
    destinationChain: ChainConfig;
    setDestinationChain: any;
    chainType: string;
    setChainType: Dispatch<SetStateAction<string>>;
    loading: boolean;
    setEncryptedId: Dispatch<SetStateAction<string | null>>;
    encryptedId: string | null;
    transactions: any[] | undefined;
    setTransactions: any;
    filteredTransaction: string | null;
    setFilteredTransaction: Dispatch<SetStateAction<string | null>>;
    width: number;
    setTransactionId: (value: SetStateAction<string | undefined>) => void;
    successType: string;
    isSuccessOpen: boolean;
    setIsSuccessOpen: Dispatch<SetStateAction<boolean>>;
};

export type MulticallReturn = {
    tokenAddress: string;
    chain: Chain;
    asset: Asset;
    walletBalance: string;
    bridgeBalance: string;
};

export type GP = {
    type: string;
    gasPrice: number | null;
    gasLimit: number | null;
};
const GlobalStateContext = createContext({} as GlobalContextType);

function GlobalStateProvider({ children }: GlobalStateProviderProps) {
    const { disconnect } = useAuth();
    const { width } = useViewport();
    const { account, chainId, active } = useWeb3React();
    const [loading, setLoading] = useState<boolean>(true);
    const [isSuccessOpen, setIsSuccessOpen] = useState<boolean>(false);
    const [encryptedId, setEncryptedId] = useState<string | null>(null);
    const [pendingTransaction, setPendingTransaction] =
        useState<boolean>(false);
    const [fetchingBalances, setFetchingBalances] = useState<boolean>(false);
    const [fromChain, setFromChain] = useState<any>(chainsBaseConfig.Ethereum);
    const [destinationChain, setDestinationChain] = useState<any>(
        chainsBaseConfig.Ethereum
    );
    const [chainType, setChainType] = useState<string>('from');
    const [successType, setSuccessType] = useState<string>('Mint');
    const [transactions, setTransactions] = useState<any[] | undefined>(
        undefined
    );
    const [filteredTransaction, setFilteredTransaction] = useState<
        string | null
    >(null);
    const [transactionId, setTransactionId] = useState<string | undefined>(
        undefined
    );
    const [allBalances, setAllBalances] = useState<{
        [chain: string]: { [x: string]: MulticallReturn };
    }>({});
    const [assetBalances, setAssetBalances] = useState<{
        [x: string]: MulticallReturn | undefined;
    }>({});

    useEffect(() => {
        get<{
            result: {
                multicall: {
                    [chain: string]: { [x: string]: MulticallReturn };
                };
            };
        }>(API.ren.balancesOf, {
            params: {
                of: account
            }

        })
    }, [])

    const memoizedFetchBalances = useCallback(async () => {
        if (!account) return;
        setFetchingBalances(true);
        const tokensResponse = await get<{
            result: {
                multicall: {
                    [chain: string]: { [x: string]: MulticallReturn };
                };
            };
        }>(API.next.balancesof, {
            params: {
                of: account
            }
        });
        if (!tokensResponse) {
            setFetchingBalances(false);
            throw new Error('Multicall Failed');
        }

        setAllBalances(tokensResponse.result.multicall);
        setFetchingBalances(false);
    }, [account, setFetchingBalances]);

    useEffect(() => {
        if (!allBalances[destinationChain.Icon]) return;
        setAssetBalances(allBalances[destinationChain.Icon] as any);
    }, [destinationChain.Icon, allBalances]);

    useEffect(() => {
        if (!chainId || !account) return;
        (async () => {
            setDestinationChain(chainsBaseConfig[ChainIdToRenChain[chainId!]!]);
            const userData = { address: account! };
            const response = await post<ResponseData>(API.next.user, userData);

            if (!response) {
                disconnect();
                throw new Error(ErrorCodes.apiFailed);
            }
            setEncryptedId(response.data.accountId);
        })();
    }, [chainId, account, disconnect]);

    useEffect(() => {
        if (!active) return;
        memoizedFetchBalances();
        const interval: NodeJS.Timer = setInterval(
            memoizedFetchBalances,
            50000
        );
        return () => clearInterval(interval);
    }, [memoizedFetchBalances, active]);

    useEffect(() => {
        const interval: NodeJS.Timeout = setTimeout(
            () => setLoading(false),
            3800
        );
        return () => clearTimeout(interval);
    }, []);

    const dispatch = useNotification();

    const HandleNewNotification = useCallback(
        (title: string, message: string): void => {
            dispatch({
                type: 'info',
                message: message,
                title: title,
                position: 'topR' || 'topR',
                success: true
            });
        },
        [dispatch]
    );

    useEffect(() => {
        const loaderTimeout: NodeJS.Timeout = setTimeout(() => {
            setLoading(false);
        }, 1400);

        return () => clearTimeout(loaderTimeout);
    }, []);

    const fetchTxs = useCallback(
        async (accountId: string, txId: string) => {
            try {
                const transactionsResponse = await get<{
                    tx: UserTxType[];
                } | null>(API.next.gettransaction, {
                    params: {
                        accountId,
                        txHash: txId
                    }
                });
                if (!transactionsResponse) return;
                console.log(transactionsResponse);
                // setTransaction(transactionsResponse.tx);
                if (
                    transactionsResponse.tx[0]?.status === 'completed' &&
                    pendingTransaction
                ) {
                    memoizedFetchBalances();
                    setPendingTransaction(false);
                    setTransactionId(undefined);
                    HandleNewNotification(
                        'Transaction Success',
                        `Successfylly bridged ${transactionsResponse.tx[0]?.amount} ${transactionsResponse.tx[0]?.currency}`
                    );
                    setSuccessType(
                        transactionsResponse.tx[0]?.txType === 'mint'
                            ? 'Mint'
                            : 'Release'
                    );
                    setIsSuccessOpen(true);
                }
            } catch (err) {
                //  setError("notifications.somethingWentWrongTryLater");
            }
        },
        [setTransactionId, pendingTransaction]
    );

    useEffect(() => {
        console.log(transactionId);
        if (!pendingTransaction || !encryptedId || !transactionId) return;
        fetchTxs(encryptedId, transactionId);
        const intervalId: NodeJS.Timer = setInterval(
            () => fetchTxs(encryptedId, transactionId),
            3000
        );
        return () => clearInterval(intervalId);
    }, [fetchTxs, pendingTransaction, encryptedId, transactionId]);

    return (
        <GlobalStateContext.Provider
            value={{
                memoizedFetchBalances,
                assetBalances,
                fetchingBalances,
                pendingTransaction,
                setPendingTransaction,
                fromChain,
                setFromChain,
                destinationChain,
                setDestinationChain,
                chainType,
                setChainType,
                // defaultChains,
                loading,
                encryptedId,
                setEncryptedId,
                transactions,
                setTransactions,
                filteredTransaction,
                setFilteredTransaction,
                width,

                setTransactionId,
                successType,
                isSuccessOpen,
                setIsSuccessOpen
            }}
        >
            {children}
        </GlobalStateContext.Provider>
    );
}

const useGlobalState = () => {
    return useContext(GlobalStateContext);
};

export { GlobalStateProvider, useGlobalState };
