import { createContext, Dispatch, SetStateAction, useCallback, useContext, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { injected, walletconnect } from "../connection/providers";
import { NoEthereumProviderError, UserRejectedRequestError as UserRejectedRequestErrorInjected } from "@web3-react/injected-connector";
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from "@web3-react/walletconnect-connector";
import { WalletInfo } from "../connection/wallets";
import { AbstractConnector } from "@web3-react/abstract-connector";
import { CHAINS, ChainType } from "../connection/chains";
import { assetsBaseConfig } from '../utils/assetsConfig';
import { chainsBaseConfig } from '../utils/chainsConfig';

interface WalletProviderProps {
    children: React.ReactNode;
}

type WalletContextType = {
    asset: any;
    setAsset: any;
    chain: any;
    setChain: any;
    walletAssetType: string;
    setWalletAssetType: any;
};

const WalletContext = createContext({} as WalletContextType);


function WalletProvider({ children }: WalletProviderProps) {
    const { library, activate, deactivate, active: connected, active, chainId, account } = useWeb3React();

    const [asset, setAsset] = useState<any>(assetsBaseConfig.BTC)
    const [chain, setChain] = useState<any>(chainsBaseConfig.Ethereum)
    const [walletAssetType, setWalletAssetType] = useState<"chain" | "currency">("chain")



    return (
        <WalletContext.Provider
            value={{
                asset,
                setAsset,
                chain,
                setChain,
                walletAssetType,
                setWalletAssetType
            }}>
            {children}
        </WalletContext.Provider>
    );
}

const useWallet = () => {
    return useContext(WalletContext);
};

export { WalletProvider, useWallet };
