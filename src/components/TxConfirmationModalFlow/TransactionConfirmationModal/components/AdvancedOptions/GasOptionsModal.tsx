import React, { useState, useEffect, useCallback } from "react";
import { TopRowNavigation } from "../../../../WalletConnectModal/WalletConnectModal";
import { UilPump } from "@iconscout/react-unicons";
import PrimaryButton from "../../../../PrimaryButton/PrimaryButton";
import { Tab } from "../../../../WalletModal/WalletModal";
import styled from "styled-components";
import BigNumber from "bignumber.js";
import GasLimitInput from "./components/GasLimitInput";
import {
  useGasPriceState,
  customGP,
  GP,
  AdvancedGasOverride,
} from "../../../../../context/useGasPriceState";
import BasicOptions from "./components/BasicGasOptions";
import ToggleButtonContainer from "./components/ToggleButton";
import AdvancedOptions from "./components/AdvancedGasOptions";

const TABS: Tab[] = [
  {
    tabName: "Basic",
    tabNumber: 0,
    side: "left",
  },
  {
    tabName: "Advanced",
    tabNumber: 1,
    side: "right",
  },
];

export const WalletInput = styled.input`
  width: 100%;
  height: 100%;
  background: transparent;
  border: 1px solid transparent;
  color: white;
  font-size: 20px;
  border-radius: 10px;
  padding-left: 25px;
  padding-right: 25px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: ${(props: any) => (props.error ? "red" : "rgb(107, 168, 238)")};
  }
`;

export const WalletInputWrapper = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  -webkit-appearance: none;
  background-color: rgb(34 53 83);
  border-radius: 10px;
  font-size: 14px;
  border: 0.5px solid transparent;
  border-color: ${(props: any) => (props.error ? "red" : "transparent")};
`;

interface IAssetModal {
  setAdvancedOptions: () => void;
  basicGasOverride: customGP;
  updateGasOverride: (
    newEntry: Partial<GP> | Partial<AdvancedGasOverride>,
    type: string
  ) => void;
  advancedGasOverride: customGP;
  minGasLimit: string;
  showTopRow: boolean
}

const GasOptionsModal = ({
  setAdvancedOptions,
  basicGasOverride,
  updateGasOverride,
  advancedGasOverride,
  minGasLimit,
  showTopRow
}: IAssetModal) => {
  const { fetchMarketDataGasPrices, networkGasData, setCustomtGasPrice } =
    useGasPriceState();

  const [buttonError, setButtonError] = useState<boolean>(false);  
  const [activeButton, setActiveButton] = useState<Tab>({
    tabName: "Basic",
    tabNumber: 0,
    side: "left",
  });

  useEffect(() => {
    const interval: NodeJS.Timer = setInterval(fetchMarketDataGasPrices, 5000);
    return () => clearInterval(interval);
  }, [fetchMarketDataGasPrices]);

  const overrideCustomOptions = useCallback(
    (overrideType: string): void => {
      setCustomtGasPrice(
        overrideType === "Basic" ? basicGasOverride : advancedGasOverride
      );
      setAdvancedOptions();
    },
    [
      setCustomtGasPrice,
      setAdvancedOptions,
      basicGasOverride,
      advancedGasOverride,
    ]
  );

  const onChange = useCallback(
    (e: any) => {
      const baseFee = advancedGasOverride.baseFee;
      const priorityFee = advancedGasOverride.maxPriorityFee;

      const gasPrice = baseFee?.multipliedBy(priorityFee!);
      const aNetworkFee = new BigNumber(e.target.value!).multipliedBy(
        gasPrice!
      );
      const bNetworkFee = new BigNumber(e.target.value).multipliedBy(
        basicGasOverride.gasPrice!
      );

      updateGasOverride(
        {
          gasLimit: new BigNumber(e.target.value),
          networkFee: aNetworkFee,
        },
        "Advanced"
      );
      updateGasOverride(
        {
          gasLimit: new BigNumber(e.target.value),
          networkFee: bNetworkFee,
        },
        "Basic"
      );
    },
    [advancedGasOverride, basicGasOverride, updateGasOverride]
  );

  return (
    <>
      {showTopRow && <TopRowNavigation
        isRightDisplay={true}
        isLeftDisplay={true}
        close={setAdvancedOptions}
        title={
          <div className="flex gap-2">
            <UilPump />
            <span>Gas Options</span>
          </div>
        }
      />}
      <ToggleButtonContainer
        activeButton={activeButton}
        tabs={TABS}
        setActiveButton={setActiveButton}
      />
      {activeButton.tabName === "Basic" ? (
        <BasicOptions
          networkGasData={networkGasData}
          updateGasOverride={updateGasOverride}
          basicGasOverride={basicGasOverride}
        />
      ) : (
        <AdvancedOptions
          advancedGasOverride={advancedGasOverride}
          updateAdvancedGasOverride={updateGasOverride}
          setButtonError={setButtonError}
        />
      )}
      <GasLimitInput
        gasOverride={basicGasOverride}
        minGasLimit={minGasLimit}
        onChange={onChange}
        setButtonError={setButtonError}
      />
      <div className="mx-2 mb-1 mt-2 flex items-center justify-center">
        <PrimaryButton
          className={
            `w-full justify-center rounded-2xl ${buttonError ? "bg-red-600" : "bg-blue-500"} py-[15px] text-center`
          }
          disabled={buttonError}
          onClick={() => overrideCustomOptions(activeButton.tabName)}
        >
          Confirm Options
        </PrimaryButton>
      </div>
    </>
  );
};

export default GasOptionsModal;
