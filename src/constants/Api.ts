import { isProduction } from "../utils/misc";

let DOMAIN = "";
if (typeof window === "undefined") {
  if (isProduction()) DOMAIN = "https://app.catalog.fi";
  else DOMAIN = "https://app-dev.catalog.fi";
} else DOMAIN = window.location.origin;

const SigVerifierBaseUrl = isProduction()
  ? "http://localhost:5000/api/auth"
  : "http://localhost:5000/api/auth"; // "http://localhost:4000";

const API = {
  ren: {
    verify: `${SigVerifierBaseUrl}/verify`,
    balancesOf: `http://localhost:4000/balancesOf`
  }
};

export default API;
