import { ChainBaseConfig } from "../../utils/chainsConfig";
import { AssetBaseConfig } from "../../utils/assetsConfig";

export const MESSAGES = (
  transactionType: string,
  success: boolean,
  amount: string,
  asset: AssetBaseConfig,
  chain: ChainBaseConfig
): string => {
  const messageMapping: { [title: string]: string } = {
    ["Deposit"]: `${
      success ? "Successfully deposited" : "Failed to deposit"
    } ${amount} ${asset.Icon} on ${chain.fullName}`,
    ["Withdraw"]: `${
      success ? "Successfully withdrew" : "Failed to withdraw"
    } ${amount} ${asset.Icon} on ${chain.fullName}`,
    ["Approve"]: `${
      success ? "Successfully approved" : "Failed to approve"
    } ${amount} ${asset.Icon} on ${chain.fullName}`,
  };

  return messageMapping[transactionType] as string;
};
