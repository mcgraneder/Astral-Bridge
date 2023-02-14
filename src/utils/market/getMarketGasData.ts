import { BigNumber as BN, ethers } from "ethers";
import BigNumber from "bignumber.js";
import API from "../../constants/Api";
import { CHAINS } from "../../connection/chains";
// overestimate gasLimit of required to execute deposit
// user will be refunded unused gas
export const MINT_GAS_UNIT_COST = 100000;

export enum SupportedNetworks {
  ETH = "ETH",
}

export type GasPrice = {
  chain: string;
  GasPrice: number;
};

export type AnyBlockGasPrices = {
  health: boolean;
  blockNumber: number;
  blockTime: number;
  slow: number;
  standard: number;
  fast: number;
  instant: number;
};

export const fetchMarketDataGasPrices = async (
  type: "rapid" | "fast" | "slow" | "standard"
) => {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://mainnet.infura.io/v3/ac9d2c8a561a47739b23c52e6e7ec93f"
  );
  const feeData = await provider.getFeeData();
  const ethereumGasPriceData = await fetch(API.owlOracle.gasnow)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return {
        data: {
          [type]: 50000000000, // fallback avg fast gas fee
        },
      };
    });

  return ethereumGasPriceData.data[type];
};
// gasPrice
// :
// BigNumber {_hex: '0x04a8cdf0be', _isBigNumber: true}
// lastBaseFeePerGas
// :
// BigNumber {_hex: '0x04a26d397a', _isBigNumber: true}
// maxFeePerGas
// :
// BigNumber {_hex: '0x099e42a1f4', _isBigNumber: true}
// maxPriorityFeePerGas
// :
// BigNumber {_hex: '0x59682f00', _isBigNumber: true}
// [[Prototype]]
// :
// Object

export type NetworkFeeReturnType = {
  gasPrice: BN;
  lastBaseFeePerGas: BN;
  maxFeePerGas: BN;
  maxPriorityFeePerGas: BN;
};

export type GasDataReturnType = {
  gasPrice: BN;
  lastBaseFeePerGas: BN;
  maxFeePerGas: BN;
  maxPriorityFeePerGas: BN;
};

export type Fees = {
  slow: BN;
  standard: BN;
  fast: BN;
  rapid: BN;
};

export type NetReturn = {
  gasData: GasDataReturnType;
  fees: Fees
}

export const formatValue = (value: BN, units: "gwei" | "ether" | number): number => {
  return Number(ethers.utils.formatUnits(value, units));
};

export const fetchNetworkFeeData = async (chainId: number): Promise<NetReturn> => {
  const chainProviderUrl = CHAINS[chainId]?.rpcUrls[0];
  const provider = new ethers.providers.JsonRpcProvider(
    "https://mainnet.infura.io/v3/ac9d2c8a561a47739b23c52e6e7ec93f"
  );
  const feeData = (await provider.getFeeData()) as NetworkFeeReturnType;

  const gasNetworkData: GasDataReturnType = {
    gasPrice: feeData.gasPrice,
    lastBaseFeePerGas: feeData.lastBaseFeePerGas,
    maxFeePerGas: feeData.maxFeePerGas,
    maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
  };

  const fees: Fees = {
    slow: feeData.lastBaseFeePerGas.mul(ethers.utils.parseUnits("1", 1)).div(10),
    standard: feeData.lastBaseFeePerGas.mul(ethers.utils.parseUnits("1.5", 1)).div(10),
    fast: feeData.lastBaseFeePerGas.mul(ethers.utils.parseUnits("2", 1)).div(10),
    rapid: feeData.maxFeePerGas.mul(ethers.utils.parseUnits("1", 1)).div(10),
  };

  return { gasData: gasNetworkData, fees: fees };
};

export const queryNetworkGasData = (
  gasPrices: Array<GasPrice> | undefined,
  chain: string
) => {
  const gasEntry = gasPrices?.find(
    (entry) => entry.chain === chain
  ) as GasPrice;
  return gasEntry;
};
