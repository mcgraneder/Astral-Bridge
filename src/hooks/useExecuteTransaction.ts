import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import { useTransactionFlow } from "../context/useTransactionFlowState";
import { GP, useGlobalState } from "../context/useGlobalState";
import { useNotification } from "../context/useNotificationState";
import getContract from "../utils/getContract";
import { MINT_GAS_UNIT_COST } from "../utils/market/getMarketGasData";

type ExecuteTxType = {
  executeTransaction: (
    asset: any,
    chain: any,
    args: any[],
    contractFn: any,
    estimateGas: any,
    activeGasPriceType: GP
  ) => Promise<void>;
};
const useEcecuteTransaction = (): ExecuteTxType => {
  const { library, account } = useWeb3React();
  const { setPendingTransaction } = useGlobalState();
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
      estimateGas: any,
      activeGasPriceType: GP
    ): Promise<void> => {
      if (!library || !account) return;
      togglePendingModal();

      try {
        const overrideParams =
          activeGasPriceType.gasLimit !== null
            ? {
                gasLimit: activeGasPriceType.gasLimit,
                gasPrice: activeGasPriceType.gasPrice,
              }
            : {};

            console.log(overrideParams)
        const tx = await contractFn(...args, overrideParams);

        setTimeout(() => toggleSubmittedModal(), 250);
        await tx.wait(1);
        setPendingTransaction(false);

        HandleNewNotification(
          "Approval Success",
          `Successfully approved asset ${asset.Icon} on ${chain.fullName}`
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
