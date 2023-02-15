import { useState, useCallback, useEffect } from "react";
import { Asset, Chain } from "@renproject/chains";
import { RenNetwork } from "@renproject/utils";
import { createGateway } from "./gatewayUtils";
import { PartialChainInstanceMap } from "../../constants/NetworkConfigs/chainUtils";
import { useWeb3React } from "@web3-react/core";
import RenJS, { Gateway } from "@renproject/ren";

type UseGatewayCreateParams = {
  asset: Asset;
  from: Chain;
  to: Chain;
  tokenAddress: string;
  amount?: string;
  toAddress?: string;
  fromAddress?: string;
};

type UseGatewayAdditionalParams = {
  chains: PartialChainInstanceMap | null;
  autoTeardown?: boolean;
  autoProviderAlteration?: boolean;
  initialGateway?: Gateway | null;
};

export type TxRecoverer = (txHash: string, localTxEntry: any) => Promise<void>;

export const useGateway = (
  {
    asset,
    from,
    to,
    tokenAddress,
    toAddress,
    fromAddress,
    amount,
  }: UseGatewayCreateParams,
  {
    autoTeardown = true,
    initialGateway = null,
    chains = null,
  }: UseGatewayAdditionalParams
) => {
  const { library } = useWeb3React();
  const [renJs, setRenJs] = useState<RenJS | null>(null);
  const [error, setError] = useState(null);
  const [gateway, setGateway] = useState<Gateway | null>(initialGateway);

  useEffect(() => {
    if (!chains) {
      return;
    }
    const initProvider = async () => {
      const chainsArray = Object.values(chains).map((chain) => {
        //@ts-ignore
        asset !== Asset.BTC && chain.chain.withSigner(library.getSigner());
        return chain.chain;
      });
      const renJs = new RenJS(RenNetwork.Testnet).withChains(...chainsArray);
      return renJs;
    };
    initProvider()
      .then((renJs) => setRenJs(renJs))
      .catch((error) => {
        console.error("gateway renJs error", error);
        setError(error);
      });
  }, [chains, asset, library]);

  useEffect(() => {
    let newGateway: Gateway | null = null;
    if (renJs && chains !== null) {
      const initializeGateway = async () => {
        newGateway = await createGateway(
          renJs,
          { asset, from, to, tokenAddress, amount, fromAddress, toAddress },
          chains
        );
        return newGateway;
      };

      initializeGateway()
        .then((newGateway) => setGateway(newGateway))
        .catch((error) => {
          console.error(error);
          setError(error);
        });
    }

    return () => {
      if (newGateway && autoTeardown) {
        setGateway(null);
      }
    };
  }, [
    chains,
    renJs,
    asset,
    from,
    to,
    toAddress,
    fromAddress,
    amount,
    autoTeardown,
    tokenAddress,
  ]);

  const recoverLocalTx = useCallback<TxRecoverer>(
    async (txHash, localTxEntry) => {
      if (renJs !== null && gateway !== null) {
        const tx = await renJs.gatewayTransaction(localTxEntry.params);
        gateway.transactions = gateway.transactions.set(txHash, tx);
        gateway.eventEmitter.emit("transaction", tx);
      } else {
        throw new Error("gateway not initialized");
      }
    },
    [gateway, renJs]
  );
  return { renJs, gateway, error, recoverLocalTx };
};
