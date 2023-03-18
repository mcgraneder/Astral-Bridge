import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
    useMemo
} from 'react';
import { useWeb3React } from '@web3-react/core';
import { ChainIdToRenChain } from '../connection/chains';
import { Chain, Asset } from '@renproject/chains';
import API from '../constants/Api';
import { SetStateAction, Dispatch } from 'react';
import { chainsBaseConfig, ChainConfig } from '../utils/chainsConfig';
import { get, post } from '../services/axios';
import { ChainInstanceMap, getDefaultChains } from '../utils/networksConfig';
import { RenNetwork } from '@renproject/utils';
import ErrorCodes from '../constants/errorCodes';
import { ResponseData } from '../pages/api/user';
import useAuth from '../hooks/useAuth';
import { UserTxType } from '../components/transactions/components/TransactionTable';
import { useViewport } from '../hooks/useViewport';

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
    // const defaultChains = getDefaultChains(RenNetwork.Testnet);
    const [loading, setLoading] = useState<boolean>(true);
    const { disconnect } = useAuth();
    const [encryptedId, setEncryptedId] = useState<string | null>(null);
    const [fetchedStoredChain, setFetchStoredChain] = useState<boolean>(false);
    const [pendingTransaction, setPendingTransaction] =
        useState<boolean>(false);
    const [fetchingBalances, setFetchingBalances] = useState<boolean>(false);
    const [fromChain, setFromChain] = useState<any>(chainsBaseConfig.Bitcoin);
    const [destinationChain, setDestinationChain] = useState<any>(
        chainsBaseConfig.Ethereum
    );
    const { width } = useViewport();
    const [chainType, setChainType] = useState<string>('from');
    const [transactions, setTransactions] = useState<any[] | undefined>(
        undefined
    );
    const [filteredTransaction, setFilteredTransaction] = useState<
        string | null
    >(null);

    const [assetBalances, setAssetBalances] = useState<{
        [x: string]: MulticallReturn | undefined;
    }>({});
    const { account, chainId, active } = useWeb3React();

    const memoizedFetchBalances = useCallback(async () => {
        if (!account || !chainId || !destinationChain) return;
        setFetchingBalances(true);
        const tokensResponse = await get<{
            result: {
                multicall: { [x: string]: MulticallReturn };
            };
        }>(API.ren.balancesOf, {
            params: {
                of: account,
                chainName: destinationChain.fullName
            }
        });

        if (!tokensResponse) {
            setFetchingBalances(false);
            throw new Error('Multicall Failed');
        }

        setAssetBalances(tokensResponse.result.multicall);
        setTimeout(() => setFetchingBalances(false), 500);
    }, [account, chainId, setFetchingBalances, destinationChain]);

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
        if (fetchedStoredChain || !chainId) return;
        setDestinationChain(chainsBaseConfig[ChainIdToRenChain[chainId!]!]);
        setFetchStoredChain(true);
    }, [fetchedStoredChain, chainId]);

    useEffect(() => {
        if (!active || !destinationChain) return;
        memoizedFetchBalances();
        const interval: NodeJS.Timer = setInterval(
            memoizedFetchBalances,
            50000
        );
        return () => clearInterval(interval);
    }, [memoizedFetchBalances, active, destinationChain]);

    useEffect(() => {
        const interval: NodeJS.Timeout = setTimeout(
            () => setLoading(false),
            3800
        );
        return () => clearTimeout(interval);
    }, []);

    const ProvRet = useMemo(
        () => ({
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
            width
        }),
        [
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

            loading,
            encryptedId,
            setEncryptedId,
            transactions,
            setTransactions,
            filteredTransaction,
            setFilteredTransaction,
            width
        ]
    );
    return (
        <GlobalStateContext.Provider value={ProvRet}>
            {children}
        </GlobalStateContext.Provider>
    );
}

const useGlobalState = () => {
    return useContext(GlobalStateContext);
};

export { GlobalStateProvider, useGlobalState };
