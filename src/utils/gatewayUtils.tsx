import { Asset, Chain } from "@renproject/chains";
import { BitcoinBaseChain, Bitcoin } from "@renproject/chains-bitcoin";
import { Solana } from "@renproject/chains-solana";
import RenJS, { Gateway } from "@renproject/ren";
import { ChainTransaction } from "@renproject/utils";
import { isEthereumBaseChain } from "./networksConfig";
import { isDepositChain } from "@renproject/utils";
import { EthereumBaseChain, Ethereum } from "@renproject/chains-ethereum";
import { PartialChainInstanceMap } from "./networksConfig";
import BigNumber from "bignumber.js";
import { BridgeDeployments } from '../constants/deployments';
import { ChainInstance } from '../bridgeGateway/chainUtils';
import { isContractBaseChain } from './chainsConfig';

export interface CreateGatewayParams {
  asset: Asset;
  from: Chain;
  to: Chain;
  tokenAddress: string;
  amount?: string;
  toAddress?: string;
  fromAddress?: string;
}

export const createGateway = async (
  renJS: RenJS,
  gatewayParams: CreateGatewayParams,
  chains: PartialChainInstanceMap,
  patialTx: boolean = false
): Promise<Gateway | void> => {
  if (!gatewayParams.from || !gatewayParams.to) {
    throw new Error(`Missing gateway field.`);
  }
  console.log(chains)
  const fromChainInstance = chains[gatewayParams.from];
  const toChainInstance = chains[gatewayParams.to];
  if (!fromChainInstance || !toChainInstance) {
    throw new Error(`Missing chain instances.`);
  }

  const { asset } = gatewayParams;
  console.info("gatewayParams", gatewayParams);
  let fromChain;
  if (isEthereumBaseChain(gatewayParams.from)) {
    const ethereum = fromChainInstance.chain as unknown as EthereumBaseChain;
    console.info("resolving from chain", gatewayParams);
    if (patialTx) {
      console.info("resolved from paritalTx", gatewayParams);
    //   fromChain = ethereum.Transaction(partialTx);
    } else if (gatewayParams.fromAddress) {
      console.info("resolved from fromAddress", gatewayParams);
      fromChain = ethereum.Account({
        account: gatewayParams.fromAddress,
        amount: gatewayParams.amount,
        convertUnit: false,
        anyoneCanSubmit: true,
      });
    } else {
      console.info("resolved from account", gatewayParams);
      fromChain = ethereum.Account({
        amount: gatewayParams.amount,
        convertUnit: false,
        anyoneCanSubmit: true,
      });
    }
  } else if (!isEthereumBaseChain(gatewayParams.from)) {
    fromChain = (fromChainInstance.chain as BitcoinBaseChain).GatewayAddress();
  } else {
    throw new Error(`Unknown chain "from": ${gatewayParams.from}`);
  }

  console.log(fromChain)

  let toChain;
  if (isContractBaseChain(gatewayParams.to)) {
    const ethereumChain = toChainInstance.chain as unknown as EthereumBaseChain;
    console.log(ethereumChain)
    toChain = ethereumChain.Contract({
      to: BridgeDeployments[gatewayParams.to as Chain]!,
      method: "deposit",
      withRenParams: true,
      params: [
        {
          name: "symbol",
          type: "string",
          value: "USDT",
        },
        {
          name: "message",
          type: "string",
          value: "Hello world.",
        },
      ],
    }); 

 } else if (isDepositChain(gatewayParams.to)) {
    if (!gatewayParams.toAddress) {
      throw new Error(`No recipient address provided.`);
    }
    toChain = (toChainInstance.chain as BitcoinBaseChain).Address(
      gatewayParams.toAddress
    ) } else {
    throw new Error(`Unknown chain "to": ${gatewayParams.to}`);}

  console.info("creating gateway with fromChain", fromChain);
  console.info("creating gateway with toChain", toChain);
  if (!fromChain || !toChain) return
  return await renJS.gateway({
    asset,
    from: fromChain,
    to: toChain,
  });
};


const getConytactObject = (chain: Ethereum, symbol: string) => {
  return chain.Contract({
    to: "0x96081a4e7C3617a4d7dAc9AC84D97255d63773d2",
    method: "deposit",
    withRenParams: true,
    params: [
      {
        name: "symbol",
        type: "string",
        value: symbol,
      },
      {
        name: "message",
        type: "string",
        value: "Hello world.",
      },
    ],
  });
};
