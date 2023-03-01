import { useState, useEffect, useCallback } from "react";
import {
  ChainTransactionStatus,
  TxSubmitter,
  TxWaiter,
} from "@renproject/utils";

type ChainTransactionSubmitterParams = {
  tx?: TxSubmitter | TxWaiter;
  waitTarget?: number;
  autoSubmit?: boolean;
  debugLabel?: string;
  attempts?: number;
};

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));


export const useChainTransactionSubmitter = ({
  tx,
  waitTarget = 1,
  autoSubmit = false,
  debugLabel = "",
  attempts = 1,
}: ChainTransactionSubmitterParams) => {
  const [submitting, setSubmitting] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [errorSubmitting, setErrorSubmitting] = useState<Error>();
  const [errorWaiting, setErrorWaiting] = useState<Error>();
  const [submittingDone, setSubmittingDone] = useState(false);
  const [waitingDone, setWaitingDone] = useState(false);
  const [done, setDone] = useState(false);

  const handleReset = useCallback(() => {
    setSubmitting(false);
    setWaiting(false);
    setErrorSubmitting(undefined);
    setErrorWaiting(undefined);
    setSubmittingDone(false);
    setWaitingDone(false);
    setDone(false);
  }, []);

  const wait = useCallback(async () => {
    setErrorWaiting(undefined);

    try {
      setWaiting(true);
      if (tx) {
 
        await tx.wait(waitTarget);
      } else {
     
        setErrorWaiting(new Error(`Waiting not ready`));
      }
    } catch (error: any) {
      console.error(`tx: waiting error,`, error);
      setErrorWaiting(error);
    }
    setWaiting(false);
  }, [ waitTarget, tx]);

  const handleSubmit = useCallback(async () => {
    setErrorSubmitting(undefined);
    console.info(`tx: submitting`);
    if (
      tx &&
      tx.submit &&
      tx.progress.status === ChainTransactionStatus.Ready
    ) {
      for (let i = 0; i < attempts; i++) {
        try {
          setSubmitting(true);
          await tx.submit!.bind(tx);
          i = attempts;
          setSubmittingDone(true);
          await wait();
          setDone(true);
         
        } catch (error: any) {
          console.error(`tx: submitting error`, error);
          setErrorSubmitting(error);
          if (attempts > 1) {
            // exponential backoff
            await sleep((i + 1) * 7000);
          }
        }
      }

      setSubmitting(false);
    } else {
      console.error(`tx: submitting error, tx not ready`);
      setErrorSubmitting(new Error("Submitting not ready"));
    }
  }, [ wait, tx, attempts]);

  useEffect(() => {
   
    if (Boolean(autoSubmit)) {
      
      console.info(`tx: automatic submit`);
      handleSubmit().catch((error) => {
        console.info(`tx: automatic submit failed`);
        console.error(error);
      });
    }
  }, [handleSubmit, autoSubmit, tx, tx?.submit, tx?.progress.status]);

  return {
    handleSubmit,
    errorSubmitting,
    errorWaiting,
    waiting,
    submitting,
    waitingDone,
    submittingDone,
    done,
    handleReset,
  };
};

export default useChainTransactionSubmitter