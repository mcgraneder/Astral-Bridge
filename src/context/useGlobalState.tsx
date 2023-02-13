import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useRef
} from "react";
import { useWeb3React } from "@web3-react/core";
import { ChainIdToRenChain } from "../connection/chains";
import { Chain, Asset } from "@renproject/chains";
import API from "../constants/Api";
import { SetStateAction, Dispatch } from 'react';
import { chainsBaseConfig } from "../utils/chainsConfig";
import { ChainBaseConfig } from '../constants/Addresses';
import { GasPriceType } from "../components/TxConfirmationModalFlow/TransactionConfirmationModal";
import { get } from "../services/axios";
import { ethers } from 'ethers';
import { fetchNetworkFeeData, NetReturn } from '../utils/market/getMarketGasData';
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
  chain: any;
  setChain: any;
  fetchMarketDataGasPrices: () => Promise<void>;
  gasPrices: NetReturn | null;
  activeGasPriceType: GP;
  setActiveGasPriceType: Dispatch<SetStateAction<GP>>;
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
}
const GlobalStateContext = createContext({} as GlobalContextType);

function GlobalStateProvider({ children }: GlobalStateProviderProps) {
  const [gasPrices, setGasPrices] = useState<NetReturn | null>(null);
  const [activeGasPriceType, setActiveGasPriceType] = useState<GP>({ type: "standard", gasPrice: null, gasLimit: null })
  const [fetchedStoredChain, setFetchStoredChain] = useState<boolean>(false)
  const [pendingTransaction, setPendingTransaction] = useState<boolean>(false);
  const [fetchingBalances, setFetchingBalances] = useState<boolean>(false);
  const [chain, setChain] = useState<any>(chainsBaseConfig.Ethereum);
  const [assetBalances, setAssetBalances] = useState<{
    [x: string]: MulticallReturn | undefined;
  }>({});
  const { account, chainId, active } = useWeb3React();

  const fetchMarketDataGasPrices = useCallback(async () => {
    console.log("fetching")
    const gp = await fetchNetworkFeeData(chainId!)
    setGasPrices(gp);
  }, [setGasPrices, chainId]);
  

  const memoizedFetchBalances = useCallback(async () => {
    if (!account || !chainId || !chain) return;
    setFetchingBalances(true);
    const tokensResponse = await get<{
      result: {
        multicall: { [x: string]: MulticallReturn };
      };
    }>(API.ren.balancesOf, {
      params: {
        of: account,
        chainName: chain.fullName,
      },
    });

    if (!tokensResponse) {
      setFetchingBalances(false);
      throw new Error("Multicall Failed");
    }
    setAssetBalances(tokensResponse.result.multicall);
    setTimeout(() => setFetchingBalances(false), 500);
  }, [account, chainId, setFetchingBalances, chain]);
  
  useEffect(() => {
    if (fetchedStoredChain || !chainId) return;
    setChain(chainsBaseConfig[ChainIdToRenChain[chainId!]!]);
    setFetchStoredChain(true);
  }, [fetchedStoredChain, chainId]);

  useEffect(() => {
    if (!active || !account || !chain) return;
    const interval: NodeJS.Timer = setInterval(memoizedFetchBalances, 50000);

    return () => clearInterval(interval);
  }, [memoizedFetchBalances, account, active, chain]);

  useEffect(() => {
    if (!chainId || !chain) return;
    memoizedFetchBalances();
  }, [memoizedFetchBalances, chainId, chain]);


  return (
    <GlobalStateContext.Provider
      value={{
        memoizedFetchBalances,
        assetBalances,
        fetchingBalances,
        pendingTransaction,
        setPendingTransaction,
        chain,
        setChain,
        fetchMarketDataGasPrices,
        gasPrices,
        activeGasPriceType,
        setActiveGasPriceType
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
