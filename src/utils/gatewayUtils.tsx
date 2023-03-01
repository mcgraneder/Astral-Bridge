import { Asset, Chain } from "@renproject/chains";
import { BitcoinBaseChain } from "@renproject/chains-bitcoin";
import { Ethereum, EthereumBaseChain } from '@renproject/chains-ethereum';
import { Solana } from "@renproject/chains-solana";
import RenJS, { Gateway } from "@renproject/ren";
import { ChainTransaction } from "@renproject/utils";
import queryString from "query-string";
import { isDepositBaseChain, isEthereumBaseChain } from "./chainsConfig";
import { PartialChainInstanceMap } from "./networksConfig";

export type PartialChainTransaction = Partial<ChainTransaction> &
  (
    | {
        txid: string;
      }
    | {
        txHash: string;
      }
  );

export interface CreateGatewayParams {
  asset: Asset;
  from: Chain;
  to: Chain;
  nonce?: string | number;
  amount?: string;
  toAddress?: string;
  fromAddress?: string;
}

const convertUnit = true;
const anyoneCanSubmit = false;

export const createGateway = async (
  renJS: RenJS,
  gatewayParams: CreateGatewayParams,
  chains: PartialChainInstanceMap,
  partialTx?: PartialChainTransaction | null
): Promise<Gateway> => {

  if (!gatewayParams.from || !gatewayParams.to) {
    throw new Error(`Missing gateway field.`);
  }
  const fromChainInstance = chains[gatewayParams.from];
  const toChainInstance = chains[gatewayParams.to];
  if (!fromChainInstance || !toChainInstance) {
    throw new Error(`Missing chain instances.`);
  }

  const { asset, nonce } = gatewayParams;
  let fromChain;
  if (isEthereumBaseChain(gatewayParams.from)) {
    const ethereum = fromChainInstance.chain as unknown as EthereumBaseChain;

    if (partialTx) {
      fromChain = ethereum.Transaction(partialTx);
    } else if (gatewayParams.fromAddress) {
      fromChain = fromChain = ethereum.Account({
        account: gatewayParams.fromAddress,
        amount: gatewayParams.amount,
        convertUnit,
        anyoneCanSubmit,
      });
    } else {
      fromChain = ethereum.Account({
        amount: gatewayParams.amount,
        convertUnit,
        anyoneCanSubmit,
      });
    }
  } else if (isDepositBaseChain(gatewayParams.from)) {
    fromChain = (fromChainInstance.chain as BitcoinBaseChain).GatewayAddress();
  } else {
    throw new Error(`Unknown chain "from": ${gatewayParams.from}`);
  }

  let toChain;
  if (isEthereumBaseChain(gatewayParams.to)) {
    const ethereumChain = toChainInstance.chain as unknown as Ethereum;
    toChain = getCMintContractObject(toChainInstance.chain);
  } else if (isDepositBaseChain(gatewayParams.to)) {
    if (!gatewayParams.toAddress) {
      throw new Error(`No recipient address provided.`);
    }
    toChain = (toChainInstance.chain as BitcoinBaseChain).Address(
      gatewayParams.toAddress
    );
  } else {
    throw new Error(`Unknown chain "to": ${gatewayParams.to}`);
  }
  return await renJS.gateway({
    asset,
    from: fromChain,
    to: toChain,
    nonce: 2
  });
};

export type AdditionalGatewayParams = {
  expiryTime?: number;
  renVMHash?: string;
  partialTx?: string;
};

export const createGatewayQueryString = (
  gatewayParams: CreateGatewayParams,
  additionalParams: AdditionalGatewayParams = {}
) => {
  return queryString.stringify({ ...gatewayParams, ...additionalParams });
};

export const parseGatewayQueryString = (query: string, checkNonce = false) => {
  const parsed = queryString.parse(query) as unknown as CreateGatewayParams &
    AdditionalGatewayParams;
  const {
    expiryTime,
    renVMHash,
    partialTx: partialTxString,
    ...gatewayParams
  } = parsed;
  const additionalParams = {
    expiryTime,
    renVMHash,
    partialTxString,
  };
  let error;
  let nonce = undefined;
  if (checkNonce) {
    nonce = Number(gatewayParams.nonce);
    if (isNaN(nonce)) {
      error = `Unable to parse nonce as number: ${gatewayParams.nonce}`;
    }
  }

  const sanitized = {
    asset: gatewayParams.asset,
    from: gatewayParams.from,
    to: gatewayParams.to,
    toAddress: gatewayParams.toAddress,
    amount: gatewayParams.amount,
    nonce,
  };
  return { gatewayParams: sanitized, additionalParams, error };
};

const DAY_S = 24 * 3600;
const DAY_MS = DAY_S * 1000;
export const GATEWAY_EXPIRY_OFFSET_S = DAY_S;
export const GATEWAY_EXPIRY_OFFSET_MS = GATEWAY_EXPIRY_OFFSET_S * 1000;

export const getSessionDay = (pastDayOffset = 0) =>
  Math.floor(Date.now() / 1000 / DAY_S) - pastDayOffset;

export const getGatewayNonce = (pastDayOffset = 0) => {
  const sessionDay = getSessionDay(pastDayOffset);
  return sessionDay;
  // return toURLBase64(Buffer.from([sessionDay]));
};

export const getGatewayExpiryTime = (pastDayOffset = 0) => {
  return getSessionDay(pastDayOffset) * DAY_MS + GATEWAY_EXPIRY_OFFSET_MS;
};

export const getBridgeNonce = (renJSNonce: string) => {
  // TODO: Noah - is there a better way?
  // "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASoo" => 19082;
  let result = 0;
  try {
    result = Buffer.from(renJSNonce, "base64").readIntBE(0, 32);
  } catch (ex) {
    console.error("Unable to decode renJSNonce", renJSNonce);
  }
  return result;
};

const getCMintContractObject = (chain: any) => {
  return chain.Contract({
    to: "0x2e8084cd0d6a3d7923504c3d68E849Ba7f032C6b",
    method: "deposit",
    withRenParams: true,
    params: [
      {
        name: "symbol",
        type: "string",
        value: "BTC",
      },
      {
        name: "message",
        type: "string",
        value: "Hello world.",
      },
    ],
  });
};