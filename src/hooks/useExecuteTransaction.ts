import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import { useTransactionFlow } from "../context/useTransactionFlowState";
import { useGlobalState } from "../context/useGlobalState";
import { useNotification } from "../context/useNotificationState";
import { patch, post } from "../services/axios";
import API from '../constants/Api';
import { BigNumber } from "bignumber.js";
import { TxType } from "../pages/api/walletTx";
import { ResponseData } from '../pages/api/user';

type ExecuteTxType = {
  executeTransaction: (
    asset: any,
    chain: any,
    args: any[],
    amount: string,
    transactionType: string,
    contractFn: any
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
      transactionType: string,
      contractFn: any
    ): Promise<void> => {
      if (!library || !account) return;
      togglePendingModal();
      const formattedAmount = new BigNumber(amount).shiftedBy(-asset.decimals);
      try {
        const tx = await contractFn(...args);
        const transactionResponse = await post<ResponseData>(
          API.next.depositTx,
          {
            Id: "2",
            account: account,
            type: transactionType === "Deposit" ? "deposit" : "withdraw",
            chain: chain.fullName,
            amount: formattedAmount,
            txHash: tx.hash,
            currency: asset.Icon,
            encryptedId: encryptedId,
          }
        );
        if (!transactionResponse) return;

        const txId = transactionResponse.txId;
        setTimeout(() => toggleSubmittedModal(), 250);
        await tx.wait(1);

        await patch(API.next.depositTx, {
          encryptedId: encryptedId,
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
      encryptedId
    ]
  );

  return { executeTransaction };
};

export default useEcecuteTransaction;
