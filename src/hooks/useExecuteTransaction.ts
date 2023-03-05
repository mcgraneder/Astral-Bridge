import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import { useTransactionFlow } from "../context/useTransactionFlowState";
import { useGlobalState } from "../context/useGlobalState";
import { useNotification } from "../context/useNotificationState";
import { patch, post } from "../services/axios";
import API from '../constants/Api';
import { BigNumber } from "bignumber.js";

type ExecuteTxType = {
  executeTransaction: (
    asset: any,
    chain: any,
    args: any[],
    amount: string,
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
      amount: string,
      contractFn: any,
    ): Promise<void> => {
      if (!library || !account) return;
      togglePendingModal();
      const formattedAmount = new BigNumber(amount).shiftedBy(-asset.decimals)
      try {
        const tx = await contractFn(...args);
        console.log(tx)
        const transactionResponse = await post(API.next.depositTx, {
            Id: "2",
            account: account,
            chain: chain.fullName,
            amount: formattedAmount,
            txHash: tx.hash,
            currency: asset.Icon,
            encryptedId: "wqKTxW9NW8fCmitVFiS4"
          }) as any;

          console.log(transactionResponse)
        const txId = transactionResponse.txId;
        setTimeout(() => toggleSubmittedModal(), 250);
        await tx.wait(1);

         await patch(API.next.depositTx, {
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
