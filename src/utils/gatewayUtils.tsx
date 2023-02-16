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
  chains: PartialChainInstanceMap
): Promise<Gateway> => {
  if (!gatewayParams.from || !gatewayParams.to) {
    throw new Error(`Missing gateway field.`);
  }
  const fromChainInstance = chains[gatewayParams.from];
  const toChainInstance = chains[gatewayParams.to];
  if (!fromChainInstance || !toChainInstance) {
    throw new Error(`Missing chain instances.`);
  }

  const { asset } = gatewayParams;
  let fromChain;
  if (isEthereumBaseChain(gatewayParams.from)) {
    const ethereum = fromChainInstance.chain as unknown as Ethereum;

    fromChain = ethereum.Account({
      amount: gatewayParams.amount,
      convertUnit: true,
    });
  } else {
    fromChain = (fromChainInstance.chain as BitcoinBaseChain).GatewayAddress();
  }

  const toChain = getConytactObject(
    toChainInstance.chain as Ethereum,
    gatewayParams.tokenAddress
  );

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
