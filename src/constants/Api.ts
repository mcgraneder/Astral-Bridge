import { isProduction } from "../utils/misc";

let DOMAIN = "";
if (typeof window !== "undefined") {
 DOMAIN = window.location.origin;
} 
const SigVerifierBaseUrl = isProduction()
  ? "http://localhost:8000/api/auth"
  : "http://localhost:8000/api/auth"; // "http://loclahost:4000";


  const OwlOracleBaseUrl = "https://www.etherchain.org/api";
  const CoinGeckoBaseUrl = "https://api.coingecko.com/api/v3";

  const NextBaseUrl = `${DOMAIN}/api`;
const API = {
  next: {
    user: `${NextBaseUrl}/user`,
    depositTx: `${NextBaseUrl}/depositTx`,
    gettransactions: `${NextBaseUrl}/get-transactions`,
    gettransaction: `${NextBaseUrl}/get-transaction`,
  },
  ren: {
    verify: `${SigVerifierBaseUrl}/verify`,
    balancesOf: `https://astral-sol.onrender.com/balancesOf`,
    bridgeTokens: `https://astral-sol.onrender.com/bridgeTokens`,
    getTokenApproval: `https://astral-sol.onrender.com/getTokenApproval`,
    queryRenTx: "https://astral-sol.onrender.com/queryRenTx",
    submitMintRenTx: "https://astral-sol.onrender.com/submitMintRenTx",
  },
  coinGecko: {
    price: `${CoinGeckoBaseUrl}/simple/price`,
    markets: `${CoinGeckoBaseUrl}/coins/markets/`,
  },
  owlOracle: {
    gasnow: `${OwlOracleBaseUrl}/gasnow`,
    gasPrice: `https://api.blocknative.com/gasprices/blockprices`,
  },
};

export default API;
