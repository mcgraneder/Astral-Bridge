import React, { useState, useCallback, useEffect } from "react";
import { TopRowNavigation } from "../../WalletConnectModal/WalletConnectModal";
import { FormWrapper } from "../../WalletConnectModal/WalletConnectModal";
import { Backdrop } from "../../WalletConnectModal/WalletConnectModal";
import { UilArrowDown } from "@iconscout/react-unicons";
import PrimaryButton from "../../PrimaryButton/PrimaryButton";
import useFetchAssetPrice from "../../../hooks/useFetchAssetPrice";
import GasOptionsModal from "./components/AdvancedOptions/GasOptionsModal";
import { useGlobalState } from "../../../context/useGlobalState";
import { Tab } from "../../WalletModal/WalletModal";
import BigNumber from "bignumber.js";
import { toFixed } from "../../../utils/misc";
import { BridgeDeployments } from "../../../constants/deployments";
import { chainAdresses } from "../../../constants/Addresses";
import { ethers } from "ethers";
import useEcecuteTransaction from "../../../hooks/useExecuteTransaction";
import { useWeb3React } from "@web3-react/core";
import RenBridgeABI from "../../../constants/ABIs/RenBridgeABI.json";
import { useApproval } from "../../../hooks/useApproval";
import {
  useGasPriceState,
  customGP,
  AdvancedGasOverride,
} from "../../../context/useGasPriceState";
import { GP, shiftBN } from "../../../context/useGasPriceState";
import AssetSummary from "./components/AssetSummary";
import FeeSummary from "./components/FeeSummary";
import TransactionSummary from "./components/TransactionSummary";

interface IAssetModal {
  toggleConfirmationModal: () => void;
  confirmation: boolean;
  text: string;
  asset: any;
  transactionType: string;
  buttonState: Tab;
}

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
  const { chain } = useGlobalState();
  const { assetPrice } = useFetchAssetPrice(asset);
  const {
    defaultGasPrice,
    customGasPrice,
    setCustomtGasPrice,
    networkGasData,
  } = useGasPriceState();

  const [gasMinLimit, setMinGasLimit] = useState<string>("0");
  const [advancedOptions, setAdvancedOptions] = useState<boolean>(false);
  const [basicGasOverride, setBasicGasOverride] = useState<customGP>(
    defaultGasPrice!
  );
  const [advancedGasOveride, setAdvancedGasOverride] = useState<customGP>({
    overrideType: "Advanced",
    baseFee: networkGasData?.gasData.lastBaseFeePerGas!,
    maxPriorityFee: networkGasData?.gasData.maxPriorityFeePerGas!,
    maxFee: networkGasData?.gasData.maxFeePerGas!,
    gasLimit: defaultGasPrice?.gasLimit!,
    networkFee: defaultGasPrice?.networkFee!,
  });

  useEffect(() => {
    console.log(customGasPrice);
    console.log(basicGasOverride);
  }, [advancedGasOveride, basicGasOverride, customGasPrice]);

  const estimateGasLimit = useCallback(async (): Promise<ethers.BigNumber> => {
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
      updateGasOverride({ gasLimit: new BigNumber(Number(gasLimit)) }, "Basic");
      updateGasOverride(
        { gasLimit: new BigNumber(Number(gasLimit)) },
        "Advanced"
      );
    });
  }, []);

  const fee = customGasPrice
    ? toFixed(shiftBN(customGasPrice.networkFee!, -18), 6)
    : toFixed(shiftBN(defaultGasPrice?.networkFee!, -18), 6);

  const toggleAdvancedOptions = useCallback((): void => {
    setAdvancedOptions((w: any) => !w);
  }, [setAdvancedOptions]);

  const exit = useCallback(() => {
    toggleConfirmationModal();
    setCustomtGasPrice(undefined);
  }, [toggleConfirmationModal, setCustomtGasPrice]);

  const updateGasOverride = useCallback(
    (newEntry: Partial<GP> | Partial<AdvancedGasOverride>, type: string) => {
      if (type === "Basic") {
        setBasicGasOverride({
          ...basicGasOverride,
          ...newEntry,
        });
      } else {
        setAdvancedGasOverride({
          ...advancedGasOveride,
          ...newEntry,
        });
      }
    },
    [basicGasOverride, advancedGasOveride]
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

      const optionalParams =
        customGasPrice && customGasPrice?.overrideType === "Basic"
          ? {
              gasLimit: customGasPrice.gasLimit!,
              gasPrice: new BigNumber(customGasPrice?.gasPrice!)
                .shiftedBy(9)
                .toString(),
            }
          : {};
      if (transactionType === "Deposit") {
        await exec(
          asset,
          chain,
          [txAmount.toString(), tokenAddress, optionalParams],
          bridgeContract?.transferFrom
        );
      } else if (transactionType === "Withdraw") {
        await exec(
          asset,
          chain,
          [account, txAmount.toString(), tokenAddress, optionalParams],
          bridgeContract?.transfer
        );
      }
    },
    [account, exec, init, toggleConfirmationModal, customGasPrice]
  );

  return (
    <Backdrop visible={confirmation}>
      <FormWrapper>
        {advancedOptions ? (
          <GasOptionsModal
            setAdvancedOptions={toggleAdvancedOptions}
            basicGasOverride={basicGasOverride}
            updateGasOverride={updateGasOverride}
            advancedGasOverride={advancedGasOveride}
            minGasLimit={gasMinLimit}
          />
        ) : (
          <>
            <TopRowNavigation
              isRightDisplay={true}
              isLeftDisplay={true}
              close={exit}
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
