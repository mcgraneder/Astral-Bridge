import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo
} from "react";
import { useWeb3React } from "@web3-react/core";
import { ChainIdToRenChain } from "../connection/chains";
import { Chain, Asset } from "@renproject/chains";
import API from "../constants/Api";
import { SetStateAction, Dispatch } from 'react';
import { chainsBaseConfig } from "../utils/chainsConfig";
import { ChainBaseConfig } from '../constants/Addresses';
import { GasPriceType } from "../components/TxConfirmationModalFlow/TransactionConfirmationModal/TransactionConfirmationModal";
import { get } from "../services/axios";
import { ethers } from 'ethers';
import { fetchNetworkFeeData, NetReturn } from '../utils/market/getMarketGasData';
import { useGasPrices } from "../hooks/usGasPrices";
import { ChainInstanceMap, getDefaultChains } from "../utils/networksConfig";
import { supportedAssets } from "../utils/assetsConfig";
import { chainsConfig } from "../utils/chainsConfig";
import { RenNetwork } from '@renproject/utils';

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
  fromChain: any;
  setFromChain: any;
  destinationChain: any;
  setDestinationChain: any;
  chainType: string;
  setChainType: Dispatch<SetStateAction<string>>;
  defaultChains: ChainInstanceMap;
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
    const allAssets = supportedAssets;
    const allChains = Object.keys(chainsConfig);
    const defaultChains = getDefaultChains(RenNetwork.Testnet);
  const [fetchedStoredChain, setFetchStoredChain] = useState<boolean>(false);
  const [pendingTransaction, setPendingTransaction] = useState<boolean>(false);
  const [fetchingBalances, setFetchingBalances] = useState<boolean>(false);
  const [fromChain, setFromChain] = useState<any>(chainsBaseConfig.Bitcoin);
  const [destinationChain, setDestinationChain] = useState<any>(chainsBaseConfig.Ethereum);
  const [chainType, setChainType] = useState<string>("from");


  const [assetBalances, setAssetBalances] = useState<{
    [x: string]: MulticallReturn | undefined;
  }>({});
  const { account, chainId, active } = useWeb3React();

  const memoizedFetchBalances = useCallback(async () => {
    if (!account || !chainId || !fromChain) return;
    setFetchingBalances(true);
    const tokensResponse = await get<{
      result: {
        multicall: { [x: string]: MulticallReturn };
      };
    }>(API.ren.balancesOf, {
      params: {
        of: account,
        chainName: fromChain.fullName,
      },
    });

    if (!tokensResponse) {
      setFetchingBalances(false);
      throw new Error("Multicall Failed");
    }
    setAssetBalances(tokensResponse.result.multicall);
    setTimeout(() => setFetchingBalances(false), 500);
  }, [account, chainId, setFetchingBalances, fromChain]);

  // useEffect(() => {
  //   if (fetchedStoredChain || !chainId) return;
  //   setFromChain(chainsBaseConfig[ChainIdToRenChain[chainId!]!]);
  //   setFetchStoredChain(true);
  // }, [fetchedStoredChain, chainId]);

  useEffect(() => {
    if (!active || !account || !fromChain) return;
      memoizedFetchBalances();
    const interval: NodeJS.Timer = setInterval(memoizedFetchBalances, 50000);
    return () => clearInterval(interval);
  }, [memoizedFetchBalances, account, active, fromChain]);


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
        defaultChains
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
        defaultChains
      ]
    );
  return (
    <GlobalStateContext.Provider
      value={ProvRet}
    >
      {children}
    </GlobalStateContext.Provider>
  );
}

const useGlobalState = () => {
  return useContext(GlobalStateContext);
};

export { GlobalStateProvider, useGlobalState };
