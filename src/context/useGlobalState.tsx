import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useWeb3React } from "@web3-react/core";
import { ChainIdToRenChain } from "../connection/chains";
import { Chain, Asset } from "@renproject/chains";
import { get } from "../services/axios";
import API from "../constants/Api";

interface GlobalStateProviderProps {
  children: React.ReactNode;
}

type GlobalContextType = {
  memoizedFetchBalances: () => Promise<void>;
  assetBalances: {
    [x: string]: MulticallReturn | undefined;
  };
  fetchingBalances: boolean;
};

export type MulticallReturn = {
  tokenAddress: string;
  chain: Chain;
  asset: Asset;
  walletBalance: string;
  bridgeBalance: string;
};

const GlobalStateContext = createContext({} as GlobalContextType);

function GlobalStateProvider({ children }: GlobalStateProviderProps) {
  const [fetchingBalances, setFetchingBalances] = useState<boolean>(false)
  const [assetBalances, setAssetBalances] = useState<{
    [x: string]: MulticallReturn | undefined;
  }>({});
  const { library, account, chainId, active } = useWeb3React();

  const memoizedFetchBalances = useCallback(async () => {
    if (!account || !chainId) return;
    setFetchingBalances(true)
    const tokensResponse = await get<{
      result: {
        multicall: { [x: string]: MulticallReturn };
      };
    }>(API.ren.balancesOf, {
      params: {
        of: account,
        chainName: ChainIdToRenChain[chainId!],
      },
    });

    if (!tokensResponse) {
        setFetchingBalances(false)
      throw new Error("Multicall Failed");
    }
    setAssetBalances(tokensResponse.result.multicall);
    setFetchingBalances(false)
  }, [account, chainId, setFetchingBalances]);

  useEffect(() => {
    if (!active || !account) return;
    const interval: NodeJS.Timer = setInterval(memoizedFetchBalances, 50000);

    return () => clearInterval(interval);
  }, [memoizedFetchBalances, account, active]);

  useEffect(() => {
    if (!chainId) return
    memoizedFetchBalances();
  }, [memoizedFetchBalances, chainId])

  return (
    <GlobalStateContext.Provider value={{
        memoizedFetchBalances,
        assetBalances,
        fetchingBalances
    }}>
      {children}
    </GlobalStateContext.Provider>
  );
}

const useGlobalState = () => {
  return useContext(GlobalStateContext);
};

export { GlobalStateProvider, useGlobalState };
