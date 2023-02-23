import { useState, useEffect, useCallback } from "react"
import { Chain } from '@renproject/chains';
import {
  ChainTransactionStatus,
  InputChainTransaction,
  TxSubmitter,
  TxWaiter,
} from "@renproject/utils";

type ChainTransactionStatusUpdater = {
  tx?: TxSubmitter | TxWaiter;
  startTrigger?: boolean;
  waitTarget?: number;
  debugLabel?: string;
};

export const isDefined = <T>(x: T | null | undefined): x is T =>
  x !== undefined;

const useChainTransactionStatusUpdater = ({
  tx,
  startTrigger = true,
  waitTarget = 1,
  debugLabel = "",
}: ChainTransactionStatusUpdater) => {

  const [error, setError] = useState<Error | null>(null);
  const [confirmations, setConfirmations] = useState<number | null>(null);
  const [target, setTarget] = useState<number | null>(null);
  const [status, setStatus] = useState<ChainTransactionStatus | null>(null);
  const [txId, setTxId] = useState<string | null>(null);
  const [txIdFormatted, setTxIdFormatted] = useState<string | null>(null);
  const [txIndex, setTxIndex] = useState<string | null>(null);
  const [amount, setAmount] = useState<string | null>(null);
  const [txUrl, setTxUrl] = useState<string | null>(null);

  const reset = useCallback(() => {
    // setStatus(null);
    //TODO: add rest
  }, []);

  const trackProgress = useCallback(
    (progress) => {
      setError(null);
      setStatus(progress.status);
      setTarget(progress.target);
      if (isDefined(progress.confirmations)) {
        setConfirmations(progress.confirmations);
      }
      if (isDefined(progress.transaction)) {
        setTxId(progress.transaction.txid);
        setTxIdFormatted(progress.transaction.txidFormatted);
        setTxIndex(progress.transaction.txindex);
        if (isDefined((progress.transaction as InputChainTransaction).amount)) {
          setAmount((progress.transaction as InputChainTransaction).amount);
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
    tx.wait()
      .on("progress", trackProgress)
      .then(trackProgress)
      .catch((error) => {
        // TODO: typical error message
        if (!error.message.includes(".submit")) {
          console.error(error);
          setError(error);
        }
      });
    return () => {
      tx.eventEmitter.removeListener("progress", trackProgress);
    };
  }, [trackProgress, tx, waitTarget, reset, startTrigger]);

  return {
    error,
    status,
    target,
    confirmations,
    txId,
    txIdFormatted,
    txIndex,
    txUrl,
    amount,
  };
};

export default useChainTransactionStatusUpdater