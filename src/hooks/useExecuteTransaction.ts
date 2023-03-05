import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import { useTransactionFlow } from "../context/useTransactionFlowState";
import { useGlobalState } from "../context/useGlobalState";
import { useNotification } from "../context/useNotificationState";
import { patch, post } from "../services/axios";
import API from '../constants/Api';

type ExecuteTxType = {
  executeTransaction: (
    asset: any,
    chain: any,
    args: any[],
    contractFn: any,
  ) => Promise<void>;
};
const useEcecuteTransaction = (): ExecuteTxType => {
  const { library, account } = useWeb3React();
  const { setPendingTransaction, encryptedId } = useGlobalState();
  const { togglePendingModal, toggleSubmittedModal, toggleRejectedModal } =
    useTransactionFlow();
  const dispatch = useNotification();

  const HandleNewNotification = useCallback(
    (title: string, message: string): void => {
      dispatch({
        type: "info",
        message: message,
        title: title,
        position: "topR" || "topR",
        success: true,
      });
    },
    [dispatch]
  );

  const executeTransaction = useCallback(
    async (
      asset: any,
      chain: any,
      args: any[],
      contractFn: any,
    ): Promise<void> => {
      if (!library || !account) return;
      togglePendingModal();

      try {
          const response = await post(API.next.depositTx, {
            Id: "2",
            account: account,
            chain: chain.fullName,
            amount: "0.00133",
            txHash: "0zsdh",
            currency: asset.Icon,
            encryptedId: "wqKTxW9NW8fCmitVFiS4"
          }) as any;

        // console.log(response);
        const txId = response.txId;

        // setTimeout(async () => {
        //   const response = await patch(API.next.depositTx, {
        //     encryptedId: "wqKTxW9NW8fCmitVFiS4",
        //     txId: txId,
        //   });
        //   console.log(response)
        // }, 10000);
        const tx = await contractFn(...args);

        console.log(tx)

        setTimeout(() => toggleSubmittedModal(), 250);
        await tx.wait(1);

         const updateResponse = await patch(API.next.depositTx, {
            encryptedId: "wqKTxW9NW8fCmitVFiS4",
            txId: txId,
          });
        setPendingTransaction(false);

        HandleNewNotification(
          "Transaction Success",
          `Successfully transacted with asset ${asset.Icon} on ${chain.fullName}`
        );
      } catch (error) {
        console.log(error);
        toggleRejectedModal();
      }
    },
    [
      library,
      account,
      togglePendingModal,
      toggleSubmittedModal,
      toggleRejectedModal,
      setPendingTransaction,
      HandleNewNotification,
    ]
  );

  return { executeTransaction };
};

export default useEcecuteTransaction;
