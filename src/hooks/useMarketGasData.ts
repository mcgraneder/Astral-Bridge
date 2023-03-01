import {
  useCallback,
  useEffect,
  useState,
} from "react";
import { useWeb3React } from "@web3-react/core";
import { CHAINS } from "../connection/chains";
import { SetStateAction, Dispatch } from "react";
import { ethers } from "ethers";
import { MINT_GAS_UNIT_COST } from "../utils/market/getMarketGasData";
import BigNumber from "bignumber.js";

export type NetworkFeeReturnType = {
  gasPrice: BigNumber;
  lastBaseFeePerGas: BigNumber;
  maxFeePerGas: BigNumber;
  maxPriorityFeePerGas: BigNumber;
};

export type Fees = {
  slow: BigNumber;
  standard: BigNumber;
  fast: BigNumber;
  rapid: BigNumber;
};

export type gasPriceData = {
  gasData: NetworkFeeReturnType;
  fees: Fees;
};

export type GP = {
  type: string;
  gasPrice: BigNumber;
  gasLimit: BigNumber;
  networkFee: BigNumber;
};

export type AdvancedGasOverride = {
  baseFee: BigNumber;
  maxPriorityFee: BigNumber;
  maxFee: BigNumber;
  gasLimit: BigNumber;
  networkFee: BigNumber;
};

export type customGP = (Partial<GP> & Partial<AdvancedGasOverride>) & {
  overrideType: string;
};

type GasTypeConvert = Partial<NetworkFeeReturnType> & Partial<Fees>;


type GasContextType = {
  networkGasData: gasPriceData | undefined;
  fetchMarketDataGasPrices: () => Promise<void>;
  defaultGasPrice: customGP | undefined;
  setDefaultGasPrice: Dispatch<SetStateAction<customGP | undefined>>;
  customGasPrice: customGP | undefined;
  setCustomtGasPrice: Dispatch<SetStateAction<customGP | undefined>>;
};

const convertBNType = (object: { [x: string]: any }): GasTypeConvert => {
  const keys = Object.keys(object);
  const values = Object.values(object);
  let formattedObj: GasTypeConvert | {} = {};

  keys.forEach((key: string, index: number) => {
    formattedObj = {
      ...formattedObj,
      [key]: new BigNumber(Number(values[index])),
    };
  });
  return formattedObj as GasTypeConvert;
};

export const shiftBN = (bigNumber: BigNumber, decimals: number): string => {
  return bigNumber.shiftedBy(decimals).toString();
};

function useMarketGasData(): GasContextType {
  const { chainId } = useWeb3React();
  const [networkGasData, setNetworkGasData] = useState<
    gasPriceData | undefined
  >(undefined);
  const [defaultGasPrice, setDefaultGasPrice] = useState<customGP | undefined>(
    undefined
  );
  const [customGasPrice, setCustomtGasPrice] = useState<customGP | undefined>(
    undefined
  );

  const fetchNetworkFeeData = async (
    chainId: number
  ): Promise<gasPriceData> => {
    const chainProviderUrl = CHAINS[chainId]?.rpcUrls[0];
    const provider = new ethers.providers.JsonRpcProvider(chainProviderUrl);
    const gasData = convertBNType(
      await provider.getFeeData()
    ) as NetworkFeeReturnType;

    const fees: Fees = {
      slow: gasData.lastBaseFeePerGas.multipliedBy(1),
      standard: gasData.lastBaseFeePerGas.multipliedBy(1.5),
      fast: gasData.lastBaseFeePerGas.multipliedBy(2),
      rapid: gasData.maxFeePerGas.multipliedBy(1),
    };

    return { gasData: gasData, fees: fees };
  };

  const fetchMarketDataGasPrices = useCallback(async (): Promise<void> => {
    if (!chainId) return;
    fetchNetworkFeeData(chainId)
      .then((gasData: gasPriceData) => {
        setNetworkGasData(gasData);
        setDefaultGasPrice({
          overrideType: "Basic",
          type: "standard",
          gasLimit: new BigNumber(MINT_GAS_UNIT_COST),
          gasPrice: gasData.fees.standard,
          networkFee:
            gasData.gasData.lastBaseFeePerGas.multipliedBy(MINT_GAS_UNIT_COST),
        });
      })
      .catch((error: Error) => console.error(error));
  }, [setNetworkGasData, chainId]);

  useEffect(() => {
    fetchMarketDataGasPrices();
  }, [fetchMarketDataGasPrices]);

  return{
        networkGasData,
        fetchMarketDataGasPrices,
        defaultGasPrice,
        setDefaultGasPrice,
        customGasPrice,
        setCustomtGasPrice,
      }
}

export default useMarketGasData
