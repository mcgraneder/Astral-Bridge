import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import { useTransactionFlow } from "../context/useTransactionFlowState";
import { useGlobalState } from "../context/useGlobalState";
import { useNotification } from "../context/useNotificationState";
import { patch, post } from "../services/axios";
import API from '../constants/Api';
import { BigNumber } from "bignumber.js";
import { ResponseData } from "../pages/api/user";
import { ethers } from "ethers";
import { MESSAGES } from "../components/Notification/NotificationMessages";

type ExecuteTxType = {
    executeTransaction: (
        asset: any,
        chain: any,
        args: any[],
        amount: string,
        transactionType: string,
        contractFn: any
    ) => Promise<void>;
    executeBridgeTransaction: (
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
  const { setPendingTransaction, encryptedId, setFilteredTransaction, setTransactionId } =
    useGlobalState();
  const { togglePendingModal, toggleSubmittedModal, toggleRejectedModal } =
    useTransactionFlow();
  const dispatch = useNotification();

  const provider: ethers.providers.Web3Provider | undefined = library;

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

  const executeTransaction = async (
      asset: any,
      chain: any,
      args: any[],
      amount: string,
      transactionType: string,
      contractFn: any
  ): Promise<void> => {
      if (!provider || !account) return;
      if (transactionType !== 'Approval') togglePendingModal();
      const formattedAmount =
          transactionType === 'Approval'
              ? amount
              : new BigNumber(amount).shiftedBy(-asset.decimals);

      try {
          const tx = await contractFn(...args);
          setFilteredTransaction(tx.hash);
          const txReceipt = (await provider.getTransaction(
              tx.hash
          )) as ethers.providers.TransactionResponse;

          const {
              gasLimit,
              gasPrice,
              maxFeePerGas,
              maxPriorityFeePerGas,
              ...rest
          } = txReceipt;

          const type =
              transactionType === 'Deposit'
                  ? 'deposit'
                  : transactionType === 'Approval'
                  ? 'approve'
                  : 'withdraw';

          const transactionResponse = await post<ResponseData>(
              API.next.depositTx,
              {
                  account,
                  encryptedId,
                  txType: type,
                  chain: chain.fullName,
                  amount: formattedAmount,
                  txHash: tx.hash,
                  currency: asset.Icon,
                  gasLimit: Number(txReceipt.gasLimit),
                  gasPrice: Number(txReceipt.gasPrice),
                  maxFeePerGas: Number(txReceipt.maxFeePerGas),
                  maxPriorityFeePerGas: Number(txReceipt.maxPriorityFeePerGas),
                  ...rest
              }
          );
          if (!transactionResponse) return;

          const txId = transactionResponse.txId;
          setTimeout(() => toggleSubmittedModal(), 250);

          await tx
              .wait(1)
              .then(async (txReceipt: any) => {
                  await patch(API.next.depositTx, {
                      encryptedId: encryptedId,
                      txId: txId,
                      blockHash: txReceipt.blockHash,
                      blockNumber: txReceipt.blockNumber,
                      gasPrice: Number(txReceipt.effectiveGasPrice).toString(),
                      gasLimit: Number(txReceipt.gasUsed).toString()
                  });
              })
              .catch((error: Error) => {
                  throw new Error('transaction execution failed');
              });

          setPendingTransaction(false);

          HandleNewNotification(
              'Transaction Success',
              MESSAGES(
                  transactionType,
                  true,
                  formattedAmount.toString(),
                  asset,
                  chain
              )
          );
      } catch (error) {
          toggleRejectedModal();

          HandleNewNotification(
              'Transaction Success',
              MESSAGES(
                  transactionType,
                  false,
                  formattedAmount.toString(),
                  asset,
                  chain
              )
          );
          throw new Error(`transaction execution failed`);
      }
  };

  const executeBridgeTransaction = async (
      asset: any,
      chain: any,
      args: any[],
      amount: string,
      transactionType: string,
      contractFn: any
  ): Promise<void> => {
      if (!provider || !account) return;
      togglePendingModal();
      const formattedAmount = new BigNumber(amount).shiftedBy(-asset.decimals);

      try {
          const tx = await contractFn(...args);
          setFilteredTransaction(tx.hash);
          const txReceipt = (await provider.getTransaction(
              tx.hash
          )) as ethers.providers.TransactionResponse;

          const {
              gasLimit,
              gasPrice,
              maxFeePerGas,
              maxPriorityFeePerGas,
              ...rest
          } = txReceipt;

          console.log(transactionType);
          const transactionResponse = await post<ResponseData>(
              API.next.mintTx,
              {
                  account,
                  encryptedId,
                  txType: transactionType,
                  chain: chain.fullName,
                  amount: formattedAmount,
                  txHash: tx.hash,
                  currency: asset.Icon,
                  gasLimit: Number(txReceipt.gasLimit),
                  gasPrice: Number(txReceipt.gasPrice),
                  maxFeePerGas: Number(txReceipt.maxFeePerGas),
                  maxPriorityFeePerGas: Number(txReceipt.maxPriorityFeePerGas),
                  ...rest
              }
          );
          if (!transactionResponse) return;

          const txId = transactionResponse.txId;
          setTransactionId(tx.hash);

          await tx
              .wait(1)
              .then(async (txReceipt: any) => {
                  await patch(API.next.mintTx, {
                      encryptedId: encryptedId,
                      status: 'verifying',
                      txId: txId,
                      blockHash: txReceipt.blockHash,
                      blockNumber: txReceipt.blockNumber,
                      gasPrice: Number(txReceipt.effectiveGasPrice).toString(),
                      gasLimit: Number(txReceipt.gasUsed).toString()
                  });
              })
              .catch((error: Error) => {
                  throw new Error('transaction execution failed');
              });
      } catch (error) {
          toggleRejectedModal();

          HandleNewNotification(
              'Transaction Failed',
              MESSAGES(
                  transactionType,
                  false,
                  formattedAmount.toString(),
                  asset,
                  chain
              )
          );
          throw new Error(`transaction execution failed`);
      }
  };

  return { executeTransaction, executeBridgeTransaction };
};

export default useEcecuteTransaction;
