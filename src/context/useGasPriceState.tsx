import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import { useWeb3React } from "@web3-react/core";
import { ChainIdToRenChain, CHAINS } from "../connection/chains";
import { Chain, Asset } from "@renproject/chains";
import API from "../constants/Api";
import { SetStateAction, Dispatch } from "react";
import { chainsBaseConfig } from "../utils/chainsConfig";
import { ChainBaseConfig } from "../constants/Addresses";
import { GasPriceType } from "../components/TxConfirmationModalFlow/TransactionConfirmationModal";
import { get } from "../services/axios";
import { ethers } from "ethers";
import {
  fetchNetworkFeeData,
  MINT_GAS_UNIT_COST,
} from "../utils/market/getMarketGasData";
import { useGasPrices } from "../hooks/usGasPrices";
import BigNumber from "bignumber.js";

export type NetworkFeeReturnType = {
  gasPrice: ethers.BigNumber;
  lastBaseFeePerGas: ethers.BigNumber;
  maxFeePerGas: ethers.BigNumber;
  maxPriorityFeePerGas: ethers.BigNumber;
};

export type Fees = {
  slow: number;
  standard: number;
  fast: number;
  rapid: number;
};

export type gasPriceData = {
  gasData: NetworkFeeReturnType;
  fees: Fees;
};

export type GP = {
  type: string;
  gasPrice: number;
  gasLimit: number;
  networkFee: number;
};

interface GasStateProviderProps {
  children: React.ReactNode;
}

type GasContextType = {
  networkGasData: gasPriceData | undefined;
  fetchMarketDataGasPrices: () => Promise<void>;
  defaultGasPrice: GP | undefined;
  setDefaultGasPrice: Dispatch<SetStateAction<GP | undefined>>;
  customGasPrice: GP | undefined;
  setCustomtGasPrice: Dispatch<SetStateAction<GP | undefined>>;
};

const GasStateContext = createContext({} as GasContextType);

const formatToBigNumber = (
  value: ethers.BigNumber,
  shiftIndex: number,
  mod: number
) => {
  return Number(
    new BigNumber(Number(value)).shiftedBy(shiftIndex).multipliedBy(mod)
  );
};
function GasStateProvider({ children }: GasStateProviderProps) {
  const { chainId } = useWeb3React();
  const [networkGasData, setNetworkGasData] = useState<
    gasPriceData | undefined
  >(undefined);
  const [defaultGasPrice, setDefaultGasPrice] = useState<GP | undefined>(
    undefined
  );
  const [customGasPrice, setCustomtGasPrice] = useState<GP | undefined>(
    undefined
  );

  const fetchNetworkFeeData = async (
    chainId: number
  ): Promise<gasPriceData> => {
    const chainProviderUrl = CHAINS[chainId]?.rpcUrls[0];
    console.log(chainProviderUrl);
    const provider = new ethers.providers.JsonRpcProvider(chainProviderUrl);
    const feeData = (await provider.getFeeData()) as NetworkFeeReturnType;

    const fees: Fees = {
      slow: formatToBigNumber(feeData.lastBaseFeePerGas, -9, 1),
      standard: formatToBigNumber(feeData.lastBaseFeePerGas, -9, 1.5),
      fast: formatToBigNumber(feeData.lastBaseFeePerGas, -9, 2),
      rapid: formatToBigNumber(feeData.maxFeePerGas, -9, 1),
    };

    return { gasData: feeData, fees: fees };
  };

  const fetchMarketDataGasPrices =
    useCallback(async (): Promise<void> => {
      if (!chainId) return;
      let gasPriceData: gasPriceData | null = null;
      try {
        gasPriceData = await fetchNetworkFeeData(chainId);
        const price =
          gasPriceData.gasData.lastBaseFeePerGas.mul(MINT_GAS_UNIT_COST);
        setNetworkGasData(gasPriceData);
        setDefaultGasPrice({
          type: "standard",
          gasLimit: MINT_GAS_UNIT_COST,
          gasPrice: gasPriceData.fees.standard,
          networkFee: Number(ethers.utils.formatEther(price)),
        });
      } catch (error: any) {
        console.error(error);
      }
    }, [setNetworkGasData, chainId]);

  useEffect(() => {
    fetchMarketDataGasPrices();
  }, [fetchMarketDataGasPrices]);
  return (
    <GasStateContext.Provider
      value={{
        networkGasData,
        fetchMarketDataGasPrices,
        defaultGasPrice,
        setDefaultGasPrice,
        customGasPrice,
        setCustomtGasPrice,
      }}
    >
      {children}
    </GasStateContext.Provider>
  );
}

const useGasPriceState = () => {
  return useContext(GasStateContext);
};

export { GasStateProvider, useGasPriceState };
