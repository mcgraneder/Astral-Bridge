import { useCallback } from "react";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import { Tab } from "../WalletModal/WalletModal";
import { useWeb3React } from "@web3-react/core";
import { UilSpinner } from "@iconscout/react-unicons";
import { useGlobalState } from "../../context/useGlobalState";

interface IWalletButton {
  destinationChain: any;
  asset: any;
  buttonState: Tab;
  isSufficentBalance: boolean;
  isAssetApproved: boolean;
  needsToSwitchChain: boolean;
  execute: () => void;
  text: string;
  error: boolean;
}
const WalletButton = ({
  destinationChain,
  asset,
  buttonState,
  isSufficentBalance,
  isAssetApproved,
  needsToSwitchChain,
  execute,
  text,
  error,
}: IWalletButton) => {
  const { active } = useWeb3React();
  const { pendingTransaction } = useGlobalState();

  const getButtonText = useCallback(
    (destinationChain: any, library: boolean, buttonState: Tab) => {
      if (!library) return "Connect Wallet";
      else if (pendingTransaction) return "Transaction pending";
      else if (!needsToSwitchChain)
        return `Switch to ${destinationChain.fullName} network`;
      else if (!isAssetApproved && buttonState.tabName !== "Withdraw")
        return `Approve ${asset.Icon} first`;
      else if (!isSufficentBalance && text !== "") return "Insufficent funds";
      else return `${buttonState.tabName} ${text} ${asset.Icon}`;
    },
    [
      isSufficentBalance,
      needsToSwitchChain,
      text,
      pendingTransaction,
      asset,
      isAssetApproved,
    ]
  );

  const getButtonColour = useCallback(() => {
    if (!active)
      return "bg-blue-500 hover:bg-blue-600 border border-blue-400 hover:border-blue-500";
    else if (!isAssetApproved)
      return "bg-blue-500 hover:bg-blue-600 border border-blue-400 hover:border-blue-500";
    else if (!isSufficentBalance && text !== "")
      return "bg-red-500 hover:bg-red-600 border border-red-400 hover:border-red-500";
    if (error && active)
      return "bg-gray-500 hover:bg-gary-600 border border-gray-400 hover:border-gray-500";
    else if (!needsToSwitchChain || text === "")
      return "bg-blue-500 hover:bg-blue-600 border border-blue-400 hover:border-blue-500";
    else if (pendingTransaction || text === "" || Number(text) == 0)
      return "bg-gray-500 hover:bg-gary-600 border border-gray-400 hover:border-gray-500";
   
    else
      return "bg-blue-500 hover:bg-blue-600 border border-blue-400 hover:border-blue-500";
  }, [
    isSufficentBalance,
    needsToSwitchChain,
    text,
    pendingTransaction,
    active,
    error,
    isAssetApproved,
    
  ]);

  return (
    <PrimaryButton
      className={`x-50 w-full justify-center rounded-2xl border ${getButtonColour()} py-[14px] text-center text-[17px] font-semibold hover:cursor-pointer`}
      disabled={isAssetApproved && error}
      onClick={execute}
    >
      <span>{getButtonText(destinationChain, active, buttonState)}</span>
      {pendingTransaction && (
        <UilSpinner className={" h-6 w-6 animate-spin text-white"} />
      )}
    </PrimaryButton>
  );
};

export default WalletButton;
