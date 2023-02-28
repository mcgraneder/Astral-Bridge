import { useState, useCallback, useEffect } from "react";
import { GatewayTransaction } from "@renproject/ren";
import { ChainTransactionStatus } from "@renproject/utils";
import useChainTransactionStatusUpdater from "../../../hooks/useGatewayTrnasactionProcessor";
import useChainTransactionSubmitter from '../../../hooks/useTransactionSubmitter';
import { useRenVMChainTransactionStatusUpdater } from '../../../hooks/useRenChainTransactionUpdater';

import {
  TxSubmitter,
  TxWaiter,
} from "@renproject/utils";

export const isTxSubmittable = (tx: TxSubmitter | TxWaiter | undefined) => {
    console.log(tx?.progress.status)
  return tx && tx.submit && tx.progress.status === ChainTransactionStatus.Ready;
};


interface Props {
  // The chain transaction
  transaction: GatewayTransaction;
}
const ChainTx = ({ transaction }: Props) => {

      const inTxMeta = useChainTransactionStatusUpdater({
        tx: transaction.in,
        debugLabel: "in",
      });

   const {
     // error: lockError,
     status: lockStatus,
     confirmations: lockConfirmations,
     target: lockTargetConfirmations,
     // txId: lockTxId,
     txIdFormatted: lockTxIdFormatted,
     // txIndex: lockTxIndex,
     txUrl: lockTxUrl,
     amount: lockAmount,
   } = inTxMeta;


   const renVmSubmitter = useChainTransactionSubmitter({
     tx: transaction.renVM,
     autoSubmit:
       lockStatus === ChainTransactionStatus.Done &&
       isTxSubmittable(transaction.renVM),
     attempts: 4,
     debugLabel: "renVM",
   });
   const { submitting: renVMSubmitting } = renVmSubmitter;
   const renVMTxMeta = useRenVMChainTransactionStatusUpdater({
     tx: transaction.renVM,
     debugLabel: "renVM",
     // startTrigger: renVMSubmittingDone, //this blocks resolving from url
   });
   const {
     amount: mintAmount,
     error: renVMError,
     status: renVMStatus,
   } = renVMTxMeta;

   const outSubmitter = useChainTransactionSubmitter({
     tx: transaction.out,
     debugLabel: "out",
   });
   const {
     submittingDone: submittingMintDone,
     handleSubmit: handleSubmitMint,
     submitting: submittingMint,
     handleReset: handleResetMint,
     errorSubmitting: submittingMintError,
   } = outSubmitter;

   const [submittingOutSetup, setSubmittingOutSetup] = useState(false);
   const [submittingOutError, setSubmittingOutError] = useState<any>();

   const handleReset = useCallback(() => {
     setSubmittingOutError(false);
     setSubmittingOutSetup(false);
     handleResetMint();
   }, [handleResetMint]);

   const handleSubmit = useCallback(async () => {
     setSubmittingOutSetup(true);
     try {
       for (const key of Object.keys(transaction.outSetup)) {
         if (transaction.outSetup[key]) {
           await transaction?.outSetup[key]?.submit?.();
           await transaction?.outSetup[key]?.wait();
         }
       }
       setSubmittingOutSetup(false);
       await handleSubmitMint();
     } catch (error: any) {
       setSubmittingOutError({ code: 1984, message: "outSetup error" });
       console.error(error);
     }
   }, [handleSubmitMint, transaction.outSetup]);

   const outTxMeta = useChainTransactionStatusUpdater({
     tx: transaction.out,
     debugLabel: "out",
     startTrigger:
       submittingMintDone || lockStatus === ChainTransactionStatus.Done,
   });

   const {
     // error: mintError,
     status: mintStatus,
     confirmations: mintConfirmations,
     target: mintTargetConfirmations,
     // txId: mintTxId,
     txIdFormatted: mintTxIdFormatted,
     // txIndex: mintTxIndex,
     txUrl: mintTxUrl,
   } = outTxMeta;

  return (
    <>
      {
        <div className="m-4 border border-black p-2">
          <p className="my-2">
            {"lock status: "}
            {lockStatus}
          </p>
          <p className="my-2">
            {"lockConfirmations: "}
            {lockConfirmations}
          </p>
          <p className="my-2">
            {"renVmStatus: "}
            {renVMStatus}
          </p>
          <p className="my-2">
            {"mint status: "}
            {mintStatus}
          </p>
          <p className="my-2">
            {"lmintConfirmations: "}
            {mintConfirmations}
          </p>
        </div>
      }
    </>
  );
};

export default ChainTx
