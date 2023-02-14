import React, { useState, useCallback, useEffect } from "react";
import { TopRowNavigation } from "../WalletConnectModal/WalletConnectModal";
import { FormWrapper } from "../WalletConnectModal/WalletConnectModal";
import { Backdrop } from "../WalletConnectModal/WalletConnectModal";
import { Icon } from "../Icons/AssetLogs/Icon";
import { UilArrowDown } from "@iconscout/react-unicons";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import useFetchAssetPrice from "../../hooks/useFetchAssetPrice";
import GasOptionsModal from "./GasOptionsModal";
import { useGlobalState } from "../../context/useGlobalState";
import { Tab } from "../WalletModal/WalletModal";
import BigNumber from "bignumber.js";
import { toFixed } from "../../utils/misc";
import { BridgeDeployments } from "../../constants/deployments";
import { chainAdresses } from "../../constants/Addresses";
import { ethers } from "ethers";
import useEcecuteTransaction from "../../hooks/useExecuteTransaction";
import { useWeb3React } from "@web3-react/core";
import RenBridgeABI from "../../constants/ABIs/RenBridgeABI.json";
import { useApproval } from "../../hooks/useApproval";
import { useGasPrices } from "../../hooks/usGasPrices";
import { useGasPriceState, customGP } from '../../context/useGasPriceState';
import { GP } from "./GasOptionsModal";

export type GasPriceType = {
  fast: number;
  priceUSD: number;
  rapid: number;
  slow: number;
  standard: number;
  timestamp: number;
};

interface IAssetModal {
  toggleConfirmationModal: () => void;
  confirmation: boolean;
  text: string;
  asset: any;
  transactionType: string;
  buttonState: Tab;
}

interface IAssetSummary {
  fullName: string;
  shortName: string;
  icon: string;
}

interface IFeeSummary {
  gasPrice: number;
  text: string;
  asset: any;
  toggleAdvancedOptions: () => void;
}

interface ITxSummary {
  fee: number;
  text: string;
  asset: any;
}

interface IFeeSummaryItem {
  title: string;
  titleValue: string;
  subTitle: string;
  subTitleValue: string;
}

const AssetSummary = ({ icon, fullName, shortName }: IAssetSummary) => {
  return (
    <div className="my-1 mb-1 flex items-center justify-between rounded-xl border border-gray-600 bg-secondary p-4">
      <span className="text-[20px] font-semibold">{fullName}</span>
      <div className="flex items-center justify-center gap-3">
        <Icon chainName={icon} className="h-7 w-7" />
        <div className="flex flex-col items-start justify-start text-center">
          <span className="text-[16px]">{shortName}</span>
        </div>
      </div>
    </div>
  );
};

const FeeSummaryItem = ({
  title,
  titleValue,
  subTitle,
  subTitleValue,
}: IFeeSummaryItem) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-between">
        <span className="text-gray-400">{title}</span>
        <span className="">{titleValue}</span>
      </div>
      <div className="flex flex-row items-center justify-between">
        <span className="text-gray-400">{subTitle}</span>
        <span className="">
          <span>{subTitleValue}</span> Gwei
        </span>
      </div>
    </div>
  );
};

const FeeSummary = ({
  gasPrice,
  text,
  asset,
  toggleAdvancedOptions,
}: IFeeSummary) => {
  return (
    <div className="my-1 mb-2 flex flex-col rounded-xl border border-gray-600 bg-secondary px-4 py-2 text-[14px]">
      <FeeSummaryItem
        title={"Expected Output"}
        titleValue={text}
        subTitle={"Network Fee"}
        subTitleValue={gasPrice.toString()}
      />
      <div className="my-2 h-[1.2px] w-full bg-gray-600" />
      <FeeSummaryItem
        title={"Expected bridge tx fee"}
        titleValue={<span>{`0.00 ${asset.Icon}`}</span>}
        subTitle={"0.00%"}
        subTitleValue={asset.Icon}
      />
      <div className="mt-3 mb-[3px]">
        <PrimaryButton
          className={
            "w-full justify-center rounded-lg border border-blue-500 bg-secondaryButtonColor py-[6px] text-center text-blue-400"
          }
          onClick={toggleAdvancedOptions}
        >
          Advanced Options
        </PrimaryButton>
      </div>
    </div>
  );
};

const TransactionSummary = ({ text, fee, asset }: ITxSummary) => {
  return (
    <div className="mt-3 mb-4 w-full break-words px-4 text-left text-[14px] text-gray-400">
      <span>
        output is estimated. You will receive at least{" "}
        <span>
          {Number(text) + Number(fee)} {asset.Icon}
        </span>{" "}
        from this transaction
      </span>
    </div>
  );
};

export type GasOverride = {
  type: string;
  gasPrice: string;
  gasLimit: string;
  networkFee: string;
};

export type AdvancedGasOverride = {
  baseFee: string;
  maxPriorityFee: string;
  maxFee: string;
  gasLimit: string;
  networkFee: string;
};

const TxConfirmationModal = ({
  toggleConfirmationModal,
  confirmation,
  text,
  asset,
  transactionType,
  buttonState,
}: IAssetModal) => {
   const { account, library } = useWeb3React();
   const { executeTransaction: exec } = useEcecuteTransaction();
   const { init } = useApproval();
   const { defaultGasPrice, customGasPrice, setCustomtGasPrice, networkGasData } =
     useGasPriceState();
   const { chain } = useGlobalState();
  const { assetPrice } = useFetchAssetPrice(asset);
  const [gasMinLimit, setMinGasLimit] = useState<string>("0");
  const [advancedOptions, setAdvancedOptions] = useState<boolean>(false);
  const [basicGasOverride, setBasicGasOverride] = useState<customGP>(defaultGasPrice!);
  const [advancedGasOveride, setAdvancedGasOverride] =
    useState<customGP>({
      overrideType: "Advanced",
      baseFee: networkGasData?.gasData.lastBaseFeePerGas.toString()!,
      maxPriorityFee: networkGasData?.gasData.maxPriorityFeePerGas.toString()!,
      maxFee: networkGasData?.gasData.maxFeePerGas.toString()!,
      gasLimit: defaultGasPrice?.gasLimit?.toString()!,
      networkFee: defaultGasPrice?.networkFee?.toString()
    });

    useEffect(() => {
      console.log(advancedGasOveride);
      console.log(basicGasOverride);
    }, [advancedGasOveride, basicGasOverride]);
      const estimateGasLimit =
        useCallback(async (): Promise<ethers.BigNumber> => {
          const bridgeAddress = BridgeDeployments[chain.fullName];
          const tokenAddress =
            chainAdresses[chain.fullName]?.assets[asset.Icon]?.tokenAddress!;
          const bridgeContract = new ethers.Contract(
            bridgeAddress!,
            RenBridgeABI,
            await library.getSigner()
          );
          const gasEstimate =
            buttonState.tabName === "Deposit"
              ? await bridgeContract.estimateGas.transferFrom?.(
                  "10000",
                  tokenAddress!
                )
              : await bridgeContract.estimateGas.transfer?.(
                  account!,
                  "10000",
                  tokenAddress!
                );

          return gasEstimate as ethers.BigNumber;
        }, [chain, library, account, buttonState, asset]);

      useEffect(() => {
        estimateGasLimit().then((gasLimit: ethers.BigNumber) => {
          setMinGasLimit(Number(gasLimit).toString());
          updateBasicGasOverride({ gasLimit: gasLimit.toString() });
          updateAdvancedGasOverride({ gasLimit: gasLimit.toString() });

        });
      }, []);


  const fee = customGasPrice
    ? toFixed(Number(customGasPrice?.networkFee!), 6)
    : toFixed(Number(defaultGasPrice?.networkFee!), 6);

  const toggleAdvancedOptions = useCallback(() => {
    setAdvancedOptions((w: any) => !w);
  }, [setAdvancedOptions]);

  const updateBasicGasOverride = useCallback(
    (newEntry: any) => {
      setBasicGasOverride({
        ...basicGasOverride,
        ...newEntry,
      });
    },
    [basicGasOverride]
  );

    const updateAdvancedGasOverride = useCallback(
      (newEntry: any) => {
        setAdvancedGasOverride({
          ...advancedGasOveride,
          ...newEntry,
        });
      },
      [advancedGasOveride]
    );

  const executeTransaction = useCallback(
    async (
      transactionType: string,
      amount: string,
      chain: any,
      asset: any
    ): Promise<void> => {
      toggleConfirmationModal();
      const txAmount = new BigNumber(amount).shiftedBy(asset.decimals);
      const bridgeAddress = BridgeDeployments[chain.fullName];
      const tokenAddress =
        chainAdresses[chain.fullName]?.assets[asset.Icon]?.tokenAddress!;

      const bridgeContract = init(bridgeAddress!, RenBridgeABI);

      if (transactionType === "Deposit") {
        await exec(
          asset,
          chain,
          [txAmount.toString(), tokenAddress],
          bridgeContract?.transferFrom
        );
      } else if (transactionType === "Withdraw") {
        await exec(
          asset,
          chain,
          [account, txAmount.toString(), tokenAddress],
          bridgeContract?.transfer
        );
      }
    },
    [account, exec, init, toggleConfirmationModal]
  );

  return (
    <Backdrop visible={confirmation}>
      <FormWrapper>
        {advancedOptions ? (
          <GasOptionsModal
            setAdvancedOptions={toggleAdvancedOptions}
            basicGasOverride={basicGasOverride}
            updateBasicGasOverride={updateBasicGasOverride}
            advancedGasOverride={advancedGasOveride}
            updateAdvancedGasOverride={updateAdvancedGasOverride}
            minGasLimit={gasMinLimit}
          />
        ) : (
          <>
            <TopRowNavigation
              isRightDisplay={true}
              isLeftDisplay={true}
              close={toggleConfirmationModal}
              title={`Confirm Transaction`}
            />
            <div className="relative flex flex-col">
              <AssetSummary
                fullName={asset.fullName}
                shortName={text}
                icon={asset.Icon}
              />
              <AssetSummary
                fullName={chain.fullName}
                shortName={chain.shortName}
                icon={chain.Icon}
              />
              <div className="absolute top-[37%] right-[45%] flex h-9 w-9 items-center justify-center rounded-xl border border-gray-600 bg-darkBackground">
                <UilArrowDown className={""} />
              </div>
            </div>
            <div className="my-2 px-4 text-left">
              <span>{`1 ${asset.Icon} = ${assetPrice}`}</span>
            </div>
            <FeeSummary
              gasPrice={Number(fee)}
              asset={asset}
              text={text}
              toggleAdvancedOptions={toggleAdvancedOptions}
            />
            <TransactionSummary fee={Number(fee)} asset={asset} text={text} />
            <PrimaryButton
              className={
                "w-full justify-center rounded-2xl bg-blue-500 py-[14px] text-center"
              }
              onClick={() =>
                executeTransaction(transactionType, text, chain, asset)
              }
            >
              Confirm {transactionType}
            </PrimaryButton>
          </>
        )}
      </FormWrapper>
    </Backdrop>
  );
};

export default TxConfirmationModal;
