import {
  useState,
  useCallback,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import {
  NetReturn,
  fetchNetworkFeeData,
  NetworkFeeReturnType,
  Fees,
} from "../utils/market/getMarketGasData";
import { GP } from "../context/useGlobalState";
import { useWeb3React } from "@web3-react/core";
import { CHAINS } from "../connection/chains";
import { ethers } from "ethers";

interface IUseGasPrice {
  gasPrice: NetReturn | undefined;
  fetchMarketDataGasPrices: () => Promise<void>;
  overiddenGasPrice: GP | undefined;
  setOverridenGasPrice: Dispatch<SetStateAction<GP | undefined>>;
}
export const useGasPrices = (): IUseGasPrice => {
  const { chainId } = useWeb3React();
  const [gasPrice, setGasPrice] = useState<NetReturn | undefined>(undefined);
  const [overiddenGasPrice, setOverridenGasPrice] = useState<GP | undefined>(
    undefined
  );

  const fetchNetworkFeeData = async (
    chainId: number
  ): Promise<NetReturn> => {
    const chainProviderUrl = CHAINS[chainId]?.rpcUrls[0];
    const provider = new ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/ac9d2c8a561a47739b23c52e6e7ec93f");
    const feeData = (await provider.getFeeData()) as NetworkFeeReturnType;

    const fees: Fees = {
      slow: feeData.lastBaseFeePerGas
        .mul(ethers.utils.parseUnits("1", 1))
        .div(10),
      standard: feeData.lastBaseFeePerGas
        .mul(ethers.utils.parseUnits("1.5", 1))
        .div(10),
      fast: feeData.lastBaseFeePerGas
        .mul(ethers.utils.parseUnits("2", 1))
        .div(10),
      rapid: feeData.maxFeePerGas.mul(ethers.utils.parseUnits("1", 1)).div(10),
    };

    return { gasData: feeData, fees: fees };
  };

  const fetchMarketDataGasPrices = useCallback(async (): Promise<void> => {
    let gasPriceData: NetReturn;
    
    try {
      gasPriceData = await fetchNetworkFeeData(chainId!);
      console.log("heyyyyyyyyyyyyyyyyyyyyy", gasPriceData);
      setGasPrice(gasPriceData);
    } catch (error: any) {
      console.error(error);
    }
  }, [setGasPrice, chainId]);

  useEffect(() => {
    fetchMarketDataGasPrices();
  }, [fetchMarketDataGasPrices]);

  return {
    gasPrice,
    fetchMarketDataGasPrices,
    overiddenGasPrice,
    setOverridenGasPrice,
  };
};
