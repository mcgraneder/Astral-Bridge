import { useWeb3React } from "@web3-react/core";
import { Contract } from "ethers";
import { useTranslation } from "next-i18next";
import { useCallback } from "react";
import { ERC20ABI } from "@renproject/chains-ethereum/contracts";
import getContract from "../utils/getContract";
import { useWallet } from "../context/useWalletState";

export const useApproval = () => {
  const { library, account: address, chainId } = useWeb3React();
  const { togglePendingModal, toggleRejectedModal } = useWallet()

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
    //   togglePendingModal()
    console.log("hy")
      const tokenContract = init(tokenAddress, ERC20ABI, true);
      console.log(tokenContract)
      if (tokenContract) {
        try {
          const approvalTransaction = await tokenContract.approve(
            addressToApprove,
            amount
          );
        //   togglePendingModal()
          await approvalTransaction.wait(1);
        } catch (err) {
          console.error(err);
        //   togglePendingModal()
        //   toggleRejectedModal()
        }
      }
    },
    [chainId, init]
  );

  return { approve, init };
};
