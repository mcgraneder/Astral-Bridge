import React, { useState, useEffect, useCallback } from "react";
import { TopRowNavigation } from "../WalletConnectModal/WalletConnectModal";
import { FormWrapper } from "../WalletConnectModal/WalletConnectModal";
import { Backdrop } from "../WalletConnectModal/WalletConnectModal";
import { Icon } from "../Icons/AssetLogs/Icon";
import { UilArrowDown, UilPump, UilCheckCircle } from '@iconscout/react-unicons';
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import { fetchPrice } from "../../utils/market/fetchAssetPrice";
import useFetchAssetPrice from "../../hooks/useFetchAssetPrice";
import { Tab } from "../WalletModal/WalletModal";
import { MintFormText2 } from '../CSS/WalletModalStyles';

import styled from "styled-components"
import { GasPriceType } from './TransactionConfirmationModal';
import BigNumber from "bignumber.js";
import { toFixed } from '../../utils/misc';
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

export const MinFormToggleButtonContainer = styled.div`
  height: 40px;
  display: flex;
  margin: 15px 5px;
  background: rgb(15, 25, 55);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  &:hover {
    background: rgb(34, 43, 68);
  }
`;

export const WalletInput = styled.input`
  width: 100%;
  background: transparent;
  border: none;
  color: white;
  font-size: 20px;
  /* padding-left: 20px; */
  border-radius: 10px;
  padding-left: 25px;
  padding-right: 25px;
  font-size: 14px;
  font-family: "SuisseIntl", "Helvetica", "Arial", sans-serif;
  // border: 3px solid: blue;
  -webkit-appearance: none;
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }

  &:focus {
    border: 1px solid rgb(59, 130, 246);
  }
`;

export const WalletInputWrapper = styled.div`
  height: 100%;
  // width: 100%;
  line-height: 50px;
  display: flex;
  /* align-items: center;
    justify-content: center; */
  border: none;
  -webkit-appearance: none;
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
  background-color: rgb(9, 13, 31);
  border: 1px solid rgb(48, 63, 88);
  border-radius: 10px;

  // border: 3px solid rgb(34,43,68);

  // padding-left: 50px;
  // padding-right: 15px;
`;

export const MintToggleButton = styled.div`

   
    width: 50%;
    height: 100%;
    border-top-${(props) => props.side}-radius: 10px;
    border-bottom-${(props) => props.side}-radius: 10px;
    border-right: 1.5px solid rgb(14, 22, 39);
    background: ${(props) =>
      props.active ? "rgb(59,130,246)" : "rgb(34, 53, 83)"};
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${(props) =>
      props.active ? "rgb(75,135,220)" : "rgb(34, 53, 83)"};
    color: ${(props) => (props.active ? "White" : "rgb(74, 107, 161)")};
    &:hover {
        cursor: pointer;
    }

`;

interface IToggleButton {
  side: string;
  text: string;
  active: boolean;
  onClick: (index: number) => void;
}

interface IToggleContainer {
  activeButton: Tab;
  tabs: Tab[];
  setActiveButton: React.Dispatch<React.SetStateAction<Tab>>;
}
const ToggleButton = ({ side, text, active, onClick }: IToggleButton) => {
  return (
    <MintToggleButton side={side} active={active} onClick={onClick}>
      <MintFormText2>{text}</MintFormText2>
    </MintToggleButton>
  );
};
const ToggleButtonContainer = ({
  activeButton,
  tabs,
  setActiveButton,
}: IToggleContainer) => {
  const tabSelect = (index: number): void =>
    setActiveButton(tabs[index] as Tab);

  return (
    <MinFormToggleButtonContainer>
      {tabs.map((tab: Tab, index: number) => {
        return (
          <ToggleButton
            key={index}
            side={tab.side}
            text={tab.tabName}
            active={activeButton.tabNumber == index}
            onClick={() => tabSelect(index)}
          />
        );
      })}
    </MinFormToggleButtonContainer>
  );
};

interface IAssetModal {
  setAdvancedOptions: () => void;
  fetchMarketDataGasPrices: () => Promise<void>;
  gasPrices: GasPriceType[];
  priceTypes: any;
}

const GasOptionsModal = ({
setAdvancedOptions,
fetchMarketDataGasPrices,
gasPrices,
priceTypes
}: IAssetModal) => {
    const [activeButton, setActiveButton] = useState<Tab>({
      tabName: "Basic",
      tabNumber: 0,
      side: "left",
    });

    useEffect(() => {
      const interval: NodeJS.Timer = setInterval(
        fetchMarketDataGasPrices,
        5000
      );
      return () => clearInterval(interval);
    }, [fetchMarketDataGasPrices]);

  return (
    <>
      <TopRowNavigation
        isRightDisplay={true}
        isLeftDisplay={true}
        close={setAdvancedOptions}
        title={
          <div className="flex gap-2">
            <UilPump />
            <span>Gas Options</span>
          </div>
        }
      />
      <ToggleButtonContainer
        activeButton={activeButton}
        tabs={TABS}
        setActiveButton={setActiveButton}
      />
      <div className="mx-[6px] mb-3 mt-5 flex flex-col gap-2 rounded-xl border-gray-400 bg-secondary px-2 py-2">
        {priceTypes.map((type: any, index: number) => {
            const vals = Object.values(gasPrices);
            const gasPrice = toFixed(Number(new BigNumber(vals[index]).shiftedBy(-9)), 3)
            return (
              <div
                key={type}
                className="flex justify-between rounded-lg py-1 px-2 "
              >
                <div className="flex items-center justify-center gap-1">
                  <input
                    id={`radio${index.toString()}`}
                    type="radio"
                    name="radio"
                    className="hidden"
                    checked
                  />
                  <label
                    htmlFor={`radio${index.toString()}`}
                    className="flex cursor-pointer items-center"
                  >
                    <span className="border-grey flex-no-shrink mr-2 inline-block h-6 w-6 rounded-full border"></span>
                    {type}
                  </label>
                </div>
                <span>{gasPrice}</span>
              </div>
            );
        })}
      </div>
      <div className="mx-[6px] mt-2 mb-1 flex items-center justify-start gap-2 p-2">
        <UilPump />
        <span>Gas Limit</span>
      </div>
      <div className="broder mx-[6px] mb-5 flex flex-col gap-2 rounded-xl border-tertiary px-1 text-[20px]">
        <WalletInputWrapper>
          <WalletInput
            //   onKeyPress={preventMinus}
            type={"number"}
            value={"21000"}
            placeholder={"Amount"}
          ></WalletInput>
        </WalletInputWrapper>
      </div>
      <PrimaryButton
        className={
          "w-full justify-center rounded-2xl bg-blue-500 py-[14px] text-center"
        }
        onClick={setAdvancedOptions}
      >
        Confirm Options
      </PrimaryButton>
    </>
  );
};

export default GasOptionsModal;
