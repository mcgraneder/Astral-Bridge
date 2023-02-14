import API from "../../constants/Api";
import { get } from "../../services/axios";

export type SupportedFiat = "USD";
export type SupportedToken = keyof typeof CoinGeckoTokenIdsMap;
export type SupportedTokens = Array<keyof typeof CoinGeckoTokenIdsMap>;
export type ResponseType = {
  [x in SupportedToken]: number;
};
export type ErrorResponse = "API_FAILED";

export const CoinGeckoTokenIdsMap: { [x: string]: string } = {
  BTC: "bitcoin",
  ETH: "ethereum",
  DAI: "dai",
  USDC: "usd-coin",
  USDT: "tether",
  LUNA: "terra-luna",
  "1INCH": "1inch",
  ROOK: "rook",
  REN: "republic-protocol",
  BUSD: "binance-usd",
};

export async function fetchPrice(token: SupportedToken, currency: SupportedFiat) {
    try {
      const fiat = currency.toLowerCase();
      const ids = new Array(CoinGeckoTokenIdsMap[token]).join(",");
      const response = await get<{
        [token: string]: { [fiat: string]: unknown };
      }>(`${API.coinGecko.price}`, {
        params: { ids, vs_currencies: fiat },
      });
      if (!response) {
        throw new Error("coingecko api failed");
      }
      // console.log(response);

      return response;
    } catch (error) {
      return "API_FAILED" as ErrorResponse;
    }
  }
export async function getMarketData(tokens: SupportedTokens, currency: SupportedFiat) {
    try {
      const ids = tokens.map((token) => CoinGeckoTokenIdsMap[token]).join(",");
      return get<any>(API.coinGecko.markets, {
        params: {
          vs_currency: currency.toLowerCase(),
          ids: ids,
          price_change_percentage: "24h,7d,1y",
        },
      });
    } catch (error) {
      console.error(error);
      return "API_FAILED" as ErrorResponse;
    }
  }
