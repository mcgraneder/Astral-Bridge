import { createContext, Dispatch, SetStateAction, useCallback, useContext, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { injected, walletconnect } from "../connection/providers";
import { NoEthereumProviderError, UserRejectedRequestError as UserRejectedRequestErrorInjected } from "@web3-react/injected-connector";
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from "@web3-react/walletconnect-connector";
import { WalletInfo } from "../connection/wallets";
import { AbstractConnector } from "@web3-react/abstract-connector";
import { CHAINS, ChainType, ChainIdToRenChain } from '../connection/chains';
import { assetsBaseConfig } from '../utils/assetsConfig';
import { chainsBaseConfig } from '../utils/chainsConfig';
import { get } from "../services/axios";
import API from '../constants/Api';
import CG from "../utils/market/fetchAssetPrice";

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
  supportedMintAssets: string[];
};

const WalletContext = createContext({} as WalletContextType);


function WalletProvider({ children }: WalletProviderProps) {

    const [assetPrices, setAssetPrices] = useState<any>([])
    const [asset, setAsset] = useState<any>(assetsBaseConfig.BTC)
    const [chain, setChain] = useState<any>(chainsBaseConfig.Ethereum)
    const [walletAssetType, setWalletAssetType] = useState<"chain" | "currency">("chain")
     const [supportedMintAssets, setSupportedMintAssets] = useState<
       Array<string>
     >([]);

     const { chainId } = useWeb3React();

     const fetchSupportedMintAssets = useCallback(async () => {
        if (!chainId) return;
       const mintAssetsResponse = await get<{
         result: string[];
       }>(API.ren.bridgeTokens, {
         params: { chainName: ChainIdToRenChain[chainId!] },
       });

       if (!mintAssetsResponse) {
         throw new Error("Multicall Failed");
       }
       setSupportedMintAssets(mintAssetsResponse.result);
     }, [setSupportedMintAssets, chainId]);

     useEffect(() => {
       if (!chainId) return;
       fetchSupportedMintAssets();
     }, [chainId, fetchSupportedMintAssets]);




    return (
      <WalletContext.Provider
        value={{
          asset,
          setAsset,
          chain,
          setChain,
          walletAssetType,
          setWalletAssetType,
          supportedMintAssets,
        }}
      >
        {children}
      </WalletContext.Provider>
    );
}

const useWallet = () => {
    return useContext(WalletContext);
};

export { WalletProvider, useWallet };
