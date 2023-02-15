import { Asset, Chain } from "@renproject/chains";
import { BitcoinBaseChain } from "@renproject/chains-bitcoin";
import { Solana } from "@renproject/chains-solana";
import RenJS, { Gateway } from "@renproject/ren";
import { ChainTransaction } from "@renproject/utils";
import { isEthereumBaseChain } from "../utils/chainsConfig";
import { isDepositChain } from "@renproject/utils";
import { EthereumBaseChain } from "@renproject/chains-ethereum";
import { PartialChainInstanceMap } from "src/constants/NetworkConfigs/chainUtils";
import { Catalog } from "../../constants/NetworkConfigs/catalog";
import { isProduction } from "../../utils/misc";
import BigNumber from "bignumber.js";
import { Ethereum } from "@renproject/chains-ethereum";

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

  const toChain = getCatalogMintContractObject(
    toChainInstance.chain as Catalog,
    gatewayParams.tokenAddress,
    gatewayParams.fromAddress!
  );

  return await renJS.gateway({
    asset,
    from: fromChain,
    to: toChain,
  });
};

const getCatalogMintContractObject = (
  chain: Catalog,
  tokenAddress: string,
  userAddress: string
) => {
  return chain.Contract({
    to: isProduction()
      ? "0x96081a4e7C3617a4d7dAc9AC84D97255d63773d2"
      : "0xa3DEB3F1A03A505502C1b7D679521f93F1105542",
    method: "mint",
    params: [
      {
        name: "_token",
        type: "address",
        value: tokenAddress,
      },
      {
        name: "_to",
        type: "address",
        value: userAddress,
      },
    ],
    withRenParams: true,
  });
};
