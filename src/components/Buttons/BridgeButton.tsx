import { useCallback } from "react";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import { Tab } from "../WalletModal/WalletModal";
import { useWeb3React } from "@web3-react/core";
import { UilSpinner } from "@iconscout/react-unicons";
import { useGlobalState } from "../../context/useGlobalState";

interface IWalletButton {
  chain: any;
  asset: any;
  buttonState: Tab;
  isSufficentBalance: boolean;
  needsToSwitchChain: boolean;
  setGatewayStep: React.Dispatch<React.SetStateAction<boolean>>;
  text: string;
  error: boolean;
  execute: () => Promise<void>;
}
const BridegButton = ({
  chain,
  asset,
  buttonState,
  isSufficentBalance,
  needsToSwitchChain,
  setGatewayStep,
  text,
  error,
  execute
}: IWalletButton) => {
  const { active } = useWeb3React();
  const { pendingTransaction } = useGlobalState();

  const getButtonText = useCallback(
    (chain: any, library: boolean, buttonState: Tab) => {
      if (!library) return "Connect Wallet";
      else if (pendingTransaction) return "Transaction pending";
      else if (!needsToSwitchChain)
        return `Switch to ${chain.fullName} network`;
      else if (!isSufficentBalance && text !== "") return "Insufficent funds";
      else return `${buttonState.tabName} ${text} ${asset.Icon}`;
    },
    [isSufficentBalance, needsToSwitchChain, text, pendingTransaction, asset]
  );

  const getButtonColour = useCallback(() => {
    if (error && active) return "bg-gray-500 hover:bg-gary-600 border border-gray-400 hover:border-gray-500";
    else if (!active)
      return "bg-blue-500 hover:bg-blue-600 border border-blue-400 hover:border-blue-500";
    else if (!needsToSwitchChain || text === "")
      return "bg-blue-500 hover:bg-blue-600 border border-blue-400 hover:border-blue-500";
    else if (pendingTransaction || text === "" || Number(text) == 0)
      return "bg-gray-500 hover:bg-gary-600 border border-gray-400 hover:border-gray-500";
    else if (!isSufficentBalance && text !== "")
      return "bg-red-500 hover:bg-red-600 border border-red-400 hover:border-red-500";
    else
      return "bg-blue-500 hover:bg-blue-600 border border-blue-400 hover:border-blue-500";
  }, [
    isSufficentBalance,
    needsToSwitchChain,
    text,
    pendingTransaction,
    active,
  ]);

  return (
    <PrimaryButton
      className={`x-50 w-full justify-center rounded-2xl border ${getButtonColour()} py-[14px] text-center text-[17px] font-semibold hover:cursor-pointer`}
      disabled={error}
      onClick={execute}
    >
      <span>{getButtonText(chain, active, buttonState)}</span>
      {pendingTransaction && (
        <UilSpinner className={" h-6 w-6 animate-spin text-white"} />
      )}
    </PrimaryButton>
  );
};

export default BridegButton;
