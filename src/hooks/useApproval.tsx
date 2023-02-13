import { useWeb3React } from "@web3-react/core";
import { Contract, ethers } from 'ethers';
import { useTranslation } from "next-i18next";
import { useCallback } from "react";
import { ERC20ABI } from "@renproject/chains-ethereum/contracts";
import getContract from "../utils/getContract";
import { useTransactionFlow } from "../context/useTransactionFlowState";
import { useGlobalState } from "../context/useGlobalState";

export const useApproval = () => {
  const { setPendingTransaction } = useGlobalState()
  const { library, account: address, chainId } = useWeb3React();
  const { togglePendingModal, toggleRejectedModal, toggleSubmittedModal } = useTransactionFlow()

  const init = useCallback(
    <contract extends Contract = Contract>(
      tokenAddress: string | undefined,
      ABI: any,
      withSignerIfPossible = true
    ): contract | null => {
      if (!tokenAddress || !ABI || !library || !chainId) return null;
      try {
        return getContract(
          tokenAddress,
          ABI,
          library,
          withSignerIfPossible && address ? address : undefined
        ) as contract;
      } catch (err) {
        console.error("Failed to get contract", err);
        return null;
      }
    },
    [library, chainId, address]
  );

  const approve = useCallback(
    async (tokenAddress: string, amount: any, addressToApprove: string): Promise<void> => {
      togglePendingModal()
      const tokenContract = init(tokenAddress, ERC20ABI, true);
      if (tokenContract) {
        try {
          const approvalTransaction = await tokenContract.approve(
            addressToApprove,
            ethers.constants.MaxUint256
          );
            toggleSubmittedModal()
          await approvalTransaction.wait(1);
          setPendingTransaction(false)
        } catch (err) {
          console.error(err);
         toggleRejectedModal()
        }
      }
    },
    [chainId, init]
  );

  return { approve, init };
};
