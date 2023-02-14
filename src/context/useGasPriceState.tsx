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
import { AdvancedGasOverride, GasPriceType } from "../components/TxConfirmationModalFlow/TransactionConfirmationModal";
import { get } from "../services/axios";
import { ethers } from "ethers";
import {
  fetchNetworkFeeData,
  MINT_GAS_UNIT_COST,
} from "../utils/market/getMarketGasData";
import { useGasPrices } from "../hooks/usGasPrices";
import BigNumber from "bignumber.js";

export type NetworkFeeReturnType = {
  gasPrice: string;
  lastBaseFeePerGas: string;
  maxFeePerGas: string;
  maxPriorityFeePerGas: string;
};

export type Fees = {
  slow: string;
  standard: string;
  fast: string;
  rapid: string;
};

export type gasPriceData = {
  gasData: NetworkFeeReturnType;
  fees: Fees;
};

export type GP = {  
  type: string;
  gasPrice: string;
  gasLimit: string;
  networkFee: string;
};

export type customGP = (Partial<GP> & Partial<AdvancedGasOverride>) & {
    overrideType: string;
}

interface GasStateProviderProps {
  children: React.ReactNode;
}

type GasContextType = {
  networkGasData: gasPriceData | undefined;
  fetchMarketDataGasPrices: () => Promise<void>;
  defaultGasPrice: customGP | undefined;
  setDefaultGasPrice: Dispatch<SetStateAction<customGP | undefined>>;
  customGasPrice: customGP | undefined;
  setCustomtGasPrice: Dispatch<
    SetStateAction<customGP | undefined>
  >;
};

const GasStateContext = createContext({} as GasContextType);

const formatToBigNumber = (
  value: ethers.BigNumber,
  shiftIndex: number,
  mod: number
) => {
  return Number(
    new BigNumber(Number(value)).shiftedBy(shiftIndex).multipliedBy(mod)
  ).toString();
};
function GasStateProvider({ children }: GasStateProviderProps) {
  const { chainId } = useWeb3React();
  const [networkGasData, setNetworkGasData] = useState<
    gasPriceData | undefined
  >(undefined);
  const [defaultGasPrice, setDefaultGasPrice] = useState<customGP | undefined>(
    undefined
  );
  const [customGasPrice, setCustomtGasPrice] = useState<
    customGP | undefined
  >(undefined);

  useEffect(() => {
    console.log(customGasPrice)
  }, [customGasPrice])

  const fetchNetworkFeeData = async (
    chainId: number
  ): Promise<gasPriceData> => {
    const chainProviderUrl = CHAINS[chainId]?.rpcUrls[0];
    // console.log(chainProviderUrl);
    const provider = new ethers.providers.JsonRpcProvider(chainProviderUrl);
    const feeData = (await provider.getFeeData());

    const gasData: NetworkFeeReturnType = {
      gasPrice: formatToBigNumber(feeData.gasPrice!, -9, 1),
      lastBaseFeePerGas: formatToBigNumber(feeData.lastBaseFeePerGas!, -9, 1),
      maxPriorityFeePerGas: formatToBigNumber(feeData.maxPriorityFeePerGas!, -9, 1),
      maxFeePerGas: formatToBigNumber(feeData.maxFeePerGas!, -9, 1),
    };

    const fees: Fees = {
      slow: formatToBigNumber(feeData.lastBaseFeePerGas!, -9, 1),
      standard: formatToBigNumber(feeData.lastBaseFeePerGas!, -9, 1.5),
      fast: formatToBigNumber(feeData.lastBaseFeePerGas!, -9, 2),
      rapid: formatToBigNumber(feeData.maxFeePerGas!, -9, 1),
    };

    return { gasData: gasData, fees: fees };
  };

  const fetchMarketDataGasPrices =
    useCallback(async (): Promise<void> => {
      if (!chainId) return;
      let gasPriceData: gasPriceData | null = null;
      try {
        gasPriceData = await fetchNetworkFeeData(chainId);
        const price =
          Number(gasPriceData.gasData.lastBaseFeePerGas) * Number(MINT_GAS_UNIT_COST / 10 ** -9);
        setNetworkGasData(gasPriceData);
        setDefaultGasPrice({
          overrideType: "Basic",
          type: "standard",
          gasLimit: MINT_GAS_UNIT_COST.toString(),
          gasPrice: gasPriceData.fees.standard.toString(),
          networkFee: Number(ethers.utils.formatEther(price)).toString(),
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
