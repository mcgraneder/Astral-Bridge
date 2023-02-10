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
  isAssetApproved: boolean;
  needsToSwitchChain: boolean;
  execute: () => void;
  text: string;
  error: boolean;
}
const WalletButton = ({
  chain,
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

  const getButtonText = (chain: any, library: boolean, buttonState: Tab) => {
    if (!library) return "Connect Wallet";
    else if (pendingTransaction) return "Transaction pending";
    else if (!needsToSwitchChain) return `Switch to ${chain.fullName} network`;
    else if (!isSufficentBalance && text !== "") return "Insufficent funds";
    else if (!isAssetApproved && text !== "")
      return `Approve ${asset.Icon} on ${chain.fullName}`;
    else return `${buttonState.tabName} ${text} ${asset.Icon}.`;
  };

  const getButtonColour = () => {
    if (!needsToSwitchChain || text == "")
      return "bg-blue-500 hover:bg-blue-600 border border-blue-400 hover:border-blue-500";
    else if (!isSufficentBalance && text !== "")
      return "bg-red-500 hover:bg-red-600 border border-red-400 hover:border-red-500";
    else
      return "bg-blue-500 hover:bg-blue-600 border border-blue-400 hover:border-blue-500";
  };
  return (
    <PrimaryButton
      className={`borde w-full justify-center rounded-lg ${getButtonColour()} py-[16px] text-center text-[17px] font-semibold`}
      disabled={error}
      onClick={execute}
    >
      {getButtonText(chain, active, buttonState)}
      {pendingTransaction && (
        <UilSpinner className={" h-6 w-6 animate-spin text-white"} />
      )}
    </PrimaryButton>
  );
};

export default WalletButton
