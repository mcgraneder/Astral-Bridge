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
import {
  fetchMarketDataGasPrices,
  MINT_GAS_UNIT_COST,
} from "../utils/market/getMarketGasData";
import { ethers } from "ethers";
import { toFixed } from "../utils/misc";

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
  gasPrice: any;
  transactionFailed: boolean;
  pending: boolean;
  confirmation: boolean;
  rejected: boolean;
  toggleTransactionFailedModal: () => void;
  togglePendingModal: () => void;
  toggleRejectedModal: () => void;
  toggleConfirmationModal: () => void;
};

const WalletContext = createContext({} as WalletContextType);

function WalletProvider({ children }: WalletProviderProps) {
  const [transactionFailed, setTransactionFailed] = useState<boolean>(false);
  const [rejected, setRejected] = useState<boolean>(false);
  const [confirmation, setConfirmation] = useState<boolean>(false);
  const [pending, setPending] = useState<boolean>(false);

  const [gasPrice, setGasPrice] = useState<any>(0);
  const [assetPrices, setAssetPrices] = useState<any>([]);
  const [asset, setAsset] = useState<any>(assetsBaseConfig.BTC);
  const [chain, setChain] = useState<any>(chainsBaseConfig.Ethereum);
  const [walletAssetType, setWalletAssetType] = useState<"chain" | "currency">(
    "chain"
  );
  const [supportedMintAssets, setSupportedMintAssets] = useState<Array<string>>(
    []
  );

  const { chainId, library } = useWeb3React();

  const toggleTransactionFailedModal = useCallback(
    () => setTransactionFailed(false),
    [setTransactionFailed]
  );
  const togglePendingModal = useCallback(
    () => setPending((c: boolean) => !c),
    [setPending]
  );
  const toggleRejectedModal = useCallback(
    () => setRejected((w: boolean) => !w),
    [setRejected]
  );

  const toggleConfirmationModal = useCallback(
    () => setConfirmation((w: boolean) => !w),
    [setConfirmation]
  );

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

  const fetchGasData = useCallback(() => {
    fetchMarketDataGasPrices("fast").then((price) => {
      const totalGas = Number(
        ethers.utils.formatEther((price * MINT_GAS_UNIT_COST).toString())
      );
      setGasPrice(toFixed(totalGas, 7));
    });
  }, []);

  useEffect(() => {
    if (!library) {
      fetchGasData();
      const intervalId = setInterval(fetchGasData, 30000);
      return () => clearInterval(intervalId);
    }
  }, [fetchGasData, library]);

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
        gasPrice,
        transactionFailed,
        pending,
        confirmation,
        rejected,
        toggleTransactionFailedModal,
        togglePendingModal,
        toggleRejectedModal,
        toggleConfirmationModal,
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
