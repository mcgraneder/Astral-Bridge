import { createContext, Dispatch, SetStateAction, useCallback, useContext, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { injected, walletconnect } from "../connection/providers";
import { NoEthereumProviderError, UserRejectedRequestError as UserRejectedRequestErrorInjected } from "@web3-react/injected-connector";
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from "@web3-react/walletconnect-connector";
import { WalletInfo } from "../connection/wallets";
import { AbstractConnector } from "@web3-react/abstract-connector";
// import _switchNetwork from "src/utils/switchNetwork";
import { isProduction } from "../utils/misc";
import { CHAINS, ChainType } from '../connection/chains';

const Networks = {
    mainnet: 0x1,
    ropsten: 0x3,
    rinkeby: 0x4,
    goerli: 0x5,
    kovan: 0x2a,
    ren: 0x47ee,
    avalanche: 0xa86a,
    arbitrum: 0xa4b1,
    bsc: 0x38,
    polygon: 0x89,
    optimism: 0xa,
    gnosis: 0x64,
    fantom: 0xfa,
};

interface AuthProviderProps {
    children: React.ReactNode;
}

type AuthContextType = {
    disconnect: () => void;
    connectOn: (w: WalletInfo) => void;
    error: boolean;
    setWalletError: Dispatch<SetStateAction<boolean>>;
    openWalletModal: boolean;
    setOpenWalletModal: Dispatch<SetStateAction<boolean>>;
    connecting: boolean;
    setConnecting: Dispatch<SetStateAction<boolean>>;
    pendingWallet: AbstractConnector | undefined;
    setPendingWallet: Dispatch<SetStateAction<AbstractConnector | undefined>>;
    toggleErrorModal: () => void;
    toggleConecting: () => void;
    toggleWalletModal: () => void;
    reset: () => void
    errorMessage: string;
    needToSwitchChain: (id: number) => boolean;
    switchNetwork: (id: number) => Promise<void>;
    pendingChain: number | undefined;
};

const AuthContext = createContext({} as AuthContextType);

export const ERROR_MESSSAGES: { [x: string]: string } = {
    ["USER_REJECTED"]: "User rejected the request. Please click try again and follow the steps to connect in your wallet.",
    ["REQUEST_PENDING"]: "Metamask is already open in the background. Please open MetaMask via your extensions and accept the connection.",
    ["NO_PROVIDER"]: "You dont have Metamask installed. Please install Metamask to continue using this application",
    ["UNKNOWN"]: "Unknown error occured causing the connection to fail.  Please click try again and follow the steps to connect in your wallet."
}

function AuthProvider({ children }: AuthProviderProps) {
    const { library, activate, deactivate, active: connected, active } = useWeb3React();

    const [error, setWalletError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>(ERROR_MESSSAGES["USER_REJECTED"] as string)
    const [openWalletModal, setOpenWalletModal] = useState<boolean>(false);
    const [connecting, setConnecting] = useState<boolean>(false);
    const [pendingWallet, setPendingWallet] = useState<AbstractConnector | undefined>();
    const [pendingChain, setPendingChain] = useState< number | undefined>(undefined)

    const toggleErrorModal = useCallback(() => setWalletError(false), [setWalletError]);
    const toggleConecting = useCallback(() => setConnecting((c) => !c), [setConnecting]);
    const toggleWalletModal = useCallback(() => setOpenWalletModal((w) => !w), [setOpenWalletModal]);

    useEffect(() => {
        if (active) setWalletError(false)
    }, [active])

    useEffect(() => {
        setTimeout(() => {
            setConnecting(false);
        }, 1000);
    }, [connected]);

    useEffect(() => {
        if (error) setConnecting(false);
    }, [error]);

    const onCorrectNetwork = (chainId: number, requestedNetwork?: number) => {
        const network = requestedNetwork ?? getCorrectNetwork();
        return +chainId === +network;
    };

    const getCorrectNetwork = () => (isProduction() ? Networks.mainnet : Networks.goerli);

    const getConnector = (provider: string): AbstractConnector => {
        let connector;
        if (provider === "injected") connector = injected;
        if (provider === "walletconnect") connector = walletconnect;
        else connector = injected;
        return connector;
    };

    const disconnect = useCallback(() => {
        deactivate();
        localStorage.removeItem("provider");
    }, [deactivate]);

    const activateWallet = useCallback(
        (wallet: AbstractConnector) => {
            if (wallet == undefined) return; //default to injected
            activate(wallet, async (err: any) => {
                if (
                    err instanceof UserRejectedRequestErrorInjected || 
                    err instanceof UserRejectedRequestErrorWalletConnect
                ) {
                    setWalletError(true);
                    setErrorMessage(ERROR_MESSSAGES["USER_REJECTED"]!)
                } else if (err instanceof NoEthereumProviderError) {
                    setWalletError(true);
                    setErrorMessage(ERROR_MESSSAGES["NO_PROVIDER"]!)

                } else if (err.code == -32002) {
                    setWalletError(true);
                    setErrorMessage(ERROR_MESSSAGES["REQUEST_PENDING"]!)
                }
                 else {
                    setWalletError(true);
                    setErrorMessage(ERROR_MESSSAGES["UNKNOWN"]!)
                }
            });
        },
        [activate]
    );

    const connectOnLoad = useCallback(
        (WalletConnector: AbstractConnector) => {
            if (WalletConnector === injected) {
                activateWallet(WalletConnector);
            } else {
                setTimeout(async () => {
                    activateWallet(WalletConnector);
                }, 2000);
            }
        },
        [activateWallet]
    ); //run once on page load

    const reset = (): void => {
        setOpenWalletModal(false)
        setConnecting(false)
        setWalletError(false)
    }

    //run only once on mount solves bug from our call.
    //if curious ask me and ill explain
    useEffect(() => {
        if (typeof window == "undefined") return;
        const provider = localStorage.getItem("provider");

        const WalletConnector = getConnector(provider!);
        if (!library && provider && WalletConnector) {
            connectOnLoad(WalletConnector as AbstractConnector);
        }
    }, []);

    function connectOn(wallet: WalletInfo) {
        localStorage.setItem("provider", wallet.provider);
        activateWallet(wallet.connector);
    }

    const _switchNetwork = useCallback(async (network: number) => {
        //@ts-ignore
        const { ethereum } = window;
        const hexChainId = `0x${network.toString(16)}`;
        const chainInfo = CHAINS[network]
        setPendingChain(network)
    
        try {
          await ethereum?.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: hexChainId }],
          });
          setPendingChain(undefined)
          return { switched: true };
        } catch (error: any) {
          if (error.code === 4902) {
            // TODO: get new chain params
            try {
              await ethereum?.request({
                method: "wallet_addEthereumChain",
                params: [
                    {
                        chainId: hexChainId,
                        chainName: chainInfo?.chainName,
                        rpcUrls: chainInfo?.rpcUrls,
                        nativeCurrency: {
                          name: chainInfo?.currency,
                          symbol: chainInfo?.symbol,
                          decimals: 18,
                        },
                        blockExplorerUrls: [chainInfo?.explorerLink],
                      },
                ],
              });
              setPendingChain(undefined)
              return { switched: true };
            } catch (addError: any) {
              // handle "add" error
              setPendingChain(undefined)
              return { switched: false, errorCode: addError.code };
            }
          } else if (error.code === 4001) {
            setPendingChain(undefined)
            // user rejected the switch
          }
          setPendingChain(undefined)
          return { switched: false, errorCode: error.code };
        }
      }, [pendingChain]);

    const needToSwitchChain =
      (id: number): boolean => {
        const chains =  Object.values(CHAINS);
        const chain = chains.find((chain: ChainType) => chain.id == id)
        if (!chain) return false
        else return true
      }

    const switchNetwork =
      async (id: number) => {
        const { errorCode } = await _switchNetwork(id);
      }

    return (
        <AuthContext.Provider
            value={{
                disconnect,
                connectOn,
                error,
                setWalletError,
                openWalletModal,
                setOpenWalletModal,
                connecting,
                setConnecting,
                pendingWallet,
                setPendingWallet,
                toggleErrorModal,
                toggleConecting,
                toggleWalletModal,
                reset,
                errorMessage,
                needToSwitchChain,
                switchNetwork,
                pendingChain
            }}>
            {children}
        </AuthContext.Provider>
    );
}

const useAuth = () => {
    return useContext(AuthContext);
};

export { AuthProvider, useAuth };
