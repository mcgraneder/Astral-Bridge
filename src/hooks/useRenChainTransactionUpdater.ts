import { useState, useEffect, useCallback } from "react";
import { Chain } from "@renproject/chains";
import { isDefined } from './useGatewayTrnasactionProcessor';
import BigNumber from 'bignumber.js';
import {
  ChainTransactionStatus,
  InputChainTransaction,
  TxSubmitter,
  TxWaiter,
} from "@renproject/utils";

type RenVMChainTransactionStatusUpdater = {
  tx?: TxSubmitter | TxWaiter;
  startTrigger?: boolean;
  waitTarget?: number;
  debugLabel?: string;
};
export const useRenVMChainTransactionStatusUpdater = ({
  tx,
  startTrigger = true,
  waitTarget, // TODO: 1 ?
  debugLabel = "renVM",
}: RenVMChainTransactionStatusUpdater) => {
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<ChainTransactionStatus | null>(null);
  const [target, setTarget] = useState<number | null>(null);
  const [txId, setTxId] = useState<string | null>(null);
  const [txIdFormatted, setTxIdFormatted] = useState<string | null>(null);
  const [txIndex, setTxIndex] = useState<string | null>(null);
  const [amount, setAmount] = useState<string | null>(null);

  const reset = useCallback(() => {
    setStatus(null);
    //TODO: add rest
  }, []);

  const trackProgress = useCallback(
    (progress: any) => {
      setError(null);
      console.info(`tx: newStatus`, progress);
      setStatus(progress.status);
      setTarget(progress.target);

      if (isDefined(progress.transaction)) {
        setTxId(progress.transaction.txid);
        setTxIdFormatted(progress.transaction.txidFormatted);
        setTxIndex(progress.transaction.txindex);
        if (isDefined((progress.transaction as InputChainTransaction).amount)) {
          setAmount((progress.transaction as InputChainTransaction).amount);
        }
      }
      const response = (progress as any).response as any; // RenVMTransactionWithStatus
      if (isDefined(response)) {
        if (isDefined(response.tx.out.amount)) {
          setAmount((response.tx.out.amount as BigNumber).toString());
        }
      }
    },
    []
  );

  useEffect(() => {
    reset();
    if (!tx || !startTrigger) {
      return;
    }
    console.info(`tx: attaching listener`);
    tx.wait()
      .on("progress", trackProgress)
      .then(trackProgress)
      .catch((error) => {
        console.info(`tx: error`, error.message);
        setError(error);
      });

    return () => {
      console.info(`tx: detaching listener`);
      tx.eventEmitter.removeListener("progress", trackProgress);
    };
  }, [trackProgress, waitTarget, tx, startTrigger, reset]);

  return {
    error,
    status,
    target,
    txId,
    txIdFormatted,
    txIndex,
    amount,
  };
};
