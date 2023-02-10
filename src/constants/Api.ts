import { isProduction } from "../utils/misc";

let DOMAIN = "";
if (typeof window === "undefined") {
  if (isProduction()) DOMAIN = "https://app.catalog.fi";
  else DOMAIN = "https://app-dev.catalog.fi";
} else DOMAIN = window.location.origin;

const SigVerifierBaseUrl = isProduction()
  ? "http://localhost:5000/api/auth"
  : "http://localhost:5000/api/auth"; // "http://localhost:4000";


  const OwlOracleBaseUrl = "https://www.etherchain.org/api";
  const CoinGeckoBaseUrl = "https://api.coingecko.com/api/v3";

const API = {
  ren: {
    verify: `${SigVerifierBaseUrl}/verify`,
    balancesOf: `http://localhost:4000/balancesOf`,
    bridgeTokens: `http://localhost:4000/bridgeTokens`,
    getTokenApproval: `http://localhost:4000/getTokenApproval`,
  },
  coinGecko: {
    price: `${CoinGeckoBaseUrl}/simple/price`,
    markets: `${CoinGeckoBaseUrl}/coins/markets/`,
  },
  owlOracle: {
    gasnow: `${OwlOracleBaseUrl}/gasnow`,
  },
};

export default API;
