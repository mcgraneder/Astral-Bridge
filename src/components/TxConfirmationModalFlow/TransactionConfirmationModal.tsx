import React, { useState, useEffect, useCallback } from "react";
import { TopRowNavigation } from "../WalletConnectModal/WalletConnectModal";
import { FormWrapper } from "../WalletConnectModal/WalletConnectModal";
import { Backdrop } from "../WalletConnectModal/WalletConnectModal";
import { Icon } from "../Icons/AssetLogs/Icon";
import { UilArrowDown } from "@iconscout/react-unicons";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import { fetchPrice } from "../../utils/market/fetchAssetPrice";
import useFetchAssetPrice from '../../hooks/useFetchAssetPrice';

interface IAssetModal {
  toggleConfirmationModal: () => void;
  confirmation: boolean;
  text: string;
  asset: any;
  chain: any;
  transactionType: string;
  gasPrice: number;
  handleTransaction: (transactionType: string, amount: string, chain: any, asset: any) => void
}

const TxConfirmationModal = ({
  toggleConfirmationModal,
  confirmation,
  text,
  asset,
  chain,
  transactionType,
  gasPrice,
  handleTransaction,
}: IAssetModal) => {
  const { assetPrice } = useFetchAssetPrice(asset)

  const executeTransaction = useCallback(() => {
    toggleConfirmationModal();
    handleTransaction(transactionType, text, chain, asset);
  }, [
    asset,
    chain,
    toggleConfirmationModal,
    handleTransaction,
    text,
    transactionType,
  ]);
  
  return (
    <Backdrop visible={confirmation}>
      <FormWrapper>
        <TopRowNavigation
          isRightDisplay={true}
          isLeftDisplay={true}
          close={toggleConfirmationModal}
          title={`Confirm Transaction`}
        />
        <div className="relative flex flex-col">
          <div className="my-1 mb-1 flex items-center justify-between rounded-xl border border-gray-600 bg-secondary p-4">
            <span className="text-[20px] font-semibold">{chain.fullName}</span>
            <div className="flex items-center justify-center gap-3">
              <Icon chainName={chain.Icon} className="h-7 w-7" />
              <div className="flex flex-col items-start justify-start text-center">
                <span className="text-[16px]">{chain.shortName}</span>
              </div>
            </div>
          </div>
          <div className="my-1 mb-1 flex items-center justify-between rounded-xl border border-gray-600 bg-secondary p-4">
            <span className="text-[20px] font-semibold">{text}</span>
            <div className="flex items-center justify-center gap-3">
              <Icon chainName={asset.Icon} className="h-7 w-7" />
              <div className="flex flex-col items-start justify-start text-center">
                <span className="text-[16px]">{asset.Icon}</span>
              </div>
            </div>
          </div>
          <div className="absolute top-[37%] right-[45%] flex h-9 w-9 items-center justify-center rounded-xl border border-gray-600 bg-darkBackground">
            <UilArrowDown className={""} />
          </div>
        </div>
        <div className="my-2 px-4 text-left">
          <span>{`1 ${asset.Icon} = ${assetPrice}`}</span>
        </div>

        <div className="my-1 mb-2 flex flex-col rounded-xl border border-gray-600 bg-secondary px-4 py-2 text-[14px]">
          <div className="flex flex-col">
            <div className="flex flex-row items-center justify-between">
              <span className="text-gray-400">Expected Output</span>
              <span className="">{text}</span>
            </div>
            <div className="flex flex-row items-center justify-between">
              <span className="text-gray-400">Network Fee</span>
              <span className="">{gasPrice} Gwei</span>
            </div>
          </div>
          <div className="my-2 h-[1.2px] w-full bg-gray-600" />
          <div className="flex flex-col">
            <div className="flex flex-row items-center justify-between">
              <span className="text-gray-400">Expected bridge tx fee</span>
              <span className="">{`0.00 ${asset.Icon}`}</span>
            </div>
            <div className="flex flex-row items-center justify-between">
              <span className="text-gray-400">(0.00%)</span>
              <span className="">{asset.Icon}</span>
            </div>
          </div>
        </div>
        <div className="mt-3 mb-4 w-full break-words px-4 text-left text-[14px] text-gray-400">
          <span>
            output is estimated. You will receive at least{" "}
            <span>
              {text} {asset.Icon}
            </span>{" "}
            from this transaction
          </span>
        </div>
        <PrimaryButton
          className={
            "w-full justify-center rounded-2xl bg-blue-500 py-[14px] text-center"
          }
          onClick={executeTransaction}
        >
          Confirm {transactionType}
        </PrimaryButton>
      </FormWrapper>
    </Backdrop>
  );
};

export default TxConfirmationModal;
