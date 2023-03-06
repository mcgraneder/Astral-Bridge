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
import { ethers } from "ethers";
import { gasPriceData } from "./useMarketGasData";

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
  const { setPendingTransaction, encryptedId, setFilteredTransaction } =
    useGlobalState();
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
        setFilteredTransaction(tx.hash);
        const txReceipt = await library.getTransaction(tx.hash);

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
            blockHash: txReceipt.blockHash,
            blockNumber: txReceipt.blockNumber,
            chainId: txReceipt.chainId,
            from: txReceipt.from,
            gasLimit: Number(txReceipt.gaLimit).toString(),
            gasPrice: Number(txReceipt.gasPriceData),
            hash: txReceipt.hash,
            maxFeePerGas: Number(txReceipt.maxFeePerGas).toString(),
            maxPriorityFeePerGas: Number(txReceipt.maxPriorityFeePerGas),
            nonce: txReceipt.nonce,
            to: txReceipt.to,
            value: Number(txReceipt.value).toString(),
          }
        );
        if (!transactionResponse) return;

        const txId = transactionResponse.txId;
        setTimeout(() => toggleSubmittedModal(), 250);
        await tx.wait(1).then(async (txReceipt: any) => {
          await patch(API.next.depositTx, {
            encryptedId: encryptedId,
            txId: txId,
            blockHash: txReceipt.blockHash,
            blockNumber: txReceipt.blockNumber,
            gasPrice: Number(txReceipt.effectiveGasPrice).toString(),
            gasLimit: Number(txReceipt.gasUsed).toString(),
          });
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
      encryptedId,
      setFilteredTransaction
    ]
  );

  return { executeTransaction };
};

export default useEcecuteTransaction;
