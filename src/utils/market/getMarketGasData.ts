import API from "../../constants/Api";
// overestimate gasLimit of required to execute deposit
// user will be refunded unused gas
export const MINT_GAS_UNIT_COST = 120000; // gas limit used on mainnet from uniswap

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

export const queryNetworkGasData = (
  gasPrices: Array<GasPrice> | undefined,
  chain: string
) => {
  const gasEntry = gasPrices?.find(
    (entry) => entry.chain === chain
  ) as GasPrice;
  return gasEntry;
};
