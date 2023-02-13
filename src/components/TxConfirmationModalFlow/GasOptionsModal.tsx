import React, { useState, useEffect, useCallback } from "react";
import { TopRowNavigation } from "../WalletConnectModal/WalletConnectModal";
import { FormWrapper } from "../WalletConnectModal/WalletConnectModal";
import { Backdrop } from "../WalletConnectModal/WalletConnectModal";
import { Icon } from "../Icons/AssetLogs/Icon";
import { UilArrowDown, UilPump, UilCheckCircle, UilSpinner } from '@iconscout/react-unicons';
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import { fetchPrice } from "../../utils/market/fetchAssetPrice";
import useFetchAssetPrice from "../../hooks/useFetchAssetPrice";
import { Tab } from "../WalletModal/WalletModal";
import { MintFormText2 } from '../CSS/WalletModalStyles';

import styled, { css } from "styled-components"
import { GasPriceType } from './TransactionConfirmationModal';
import BigNumber from "bignumber.js";
import { toFixed } from '../../utils/misc';
import { GP, useGlobalState } from '../../context/useGlobalState';
import { formatValue, NetReturn, fetchMarketDataGasPrices } from '../../utils/market/getMarketGasData';
import { ethers } from "ethers";
import { BridgeDeployments } from "../../constants/deployments";
import { chainAdresses } from "../../constants/Addresses";
import { useWeb3React } from "@web3-react/core";
import { ERC20ABI } from "@renproject/chains-ethereum/contracts";
import RenBridgeABI from "../../constants/ABIs/RenBridgeABI.json";
import { useGasPriceState, gasPriceData } from '../../context/useGasPriceState';

const GASPRICES = ["slow", "standard", "fast", "rapid"];

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
  width: 50%;
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
    border: none;
  }
  &:active {
    border: none;
  }
`;

export const WalletInputWrapper = styled.div`
  height: 50px;
  

  // width: 100%;
  /* line-height: 50px; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* align-items: center;
    justify-content: center; */
  border: ${(props) => props.error ? "1px solid red" : "none"};
  -webkit-appearance: none;
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
  background-color: rgb(34 53 83);
  
  border-radius: 10px;
  font-size: 14px;

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

//    <div className="h-6 w-6 border border-white bg-blue-500 rounded-full">

//             </div>
const RadioButton = styled.div`
  height: 22px;
  width: 22px;
  border: ${(props) => (props.active ? "1px solid white" : "1px solid gray")};
  border-radius: 50%;
  background-color: ${(props) =>
    props.active ? "rgb(59,130,246)" : "transparent"};
  transition: background-color 0.35s ease, border 0.35s ease;
  /* transition: border 2s ease; */
  ${(props) =>
    props.active &&
    css`
      box-shadow: 0px 0px 1.2px 1.2px #fff;
    `}

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

interface IBasicOptions {
  networkGasData: gasPriceData | undefined;
  defaultGasPrice: GP | undefined;
  setDefaultGasPrice: React.Dispatch<React.SetStateAction<GP | undefined>>;
  gasLimit: string;
  loading: boolean;
}
const BasicOptions = ({
  networkGasData,
  defaultGasPrice,
  setDefaultGasPrice,
  gasLimit,
  loading,
}: IBasicOptions) => {
  return (
    <div className="mx-[6px] mb-3 flex flex-col gap-2 rounded-xl border-gray-400 bg-secondary px-2 py-2">
      {networkGasData &&
        GASPRICES.map((type: string, index: number) => {
          const gasPriceFeeTypes: number[] = Object.values(
            networkGasData?.fees!
          );
          return (
            <div
              key={type}
              className="flex justify-between rounded-lg py-1 px-2 "
            >
              <div className="flex items-center justify-center gap-2">
                <RadioButton
                  active={type === defaultGasPrice?.type}
                  onClick={() => {
                    setDefaultGasPrice({
                      type: type,
                      gasPrice: Number(gasPriceFeeTypes[index]),
                      gasLimit: Number(gasLimit),
                    });
                  }}
                />

                <span
                  className={`${
                    type === defaultGasPrice?.type ? "white" : "text-gray-500"
                  }`}
                >
                  {type}
                </span>
              </div>
              {loading ? (
                <UilSpinner className={"animate-spin"} />
              ) : (
                <>
                  <span
                    className={`${
                      type === defaultGasPrice?.type ? "white" : "text-gray-500"
                    }`}
                  >
                    {toFixed(gasPriceFeeTypes[index]!, 3)} Gwei
                  </span>
                </>
              )}
            </div>
          );
        })}
    </div>
  );
};

const AdvancedOptions = ({ networkGasData, maxPriorityFee, maxFee }: any) => {
  return (
    <div className="broder mx-[6px] mb-3 flex flex-col gap-2 rounded-2xl border-tertiary px-1 text-[20px]">
      <WalletInputWrapper>
        <WalletInput
          //   onKeyPress={preventMinus}
          type={"number"}
          value={formatValue(networkGasData.fees.slow!, 9)}
          placeholder={"Amount"}
        ></WalletInput>
        <span className="mx-6 text-[14px] text-gray-400">Base fee</span>
      </WalletInputWrapper>
      <WalletInputWrapper>
        <WalletInput
          //   onKeyPress={preventMinus}
          type={"number"}
          value={maxPriorityFee}
          placeholder={"Amount"}
        ></WalletInput>
        <span className="mx-6 text-[14px] text-gray-400">Max Prioity Fee</span>
      </WalletInputWrapper>
      <WalletInputWrapper>
        <WalletInput
          //   onKeyPress={preventMinus}
          type={"number"}
          value={Number(maxFee)}
          placeholder={networkGasData}
        ></WalletInput>
        <span className="mx-6 text-[14px] text-gray-400">MaxFee</span>
      </WalletInputWrapper>
    </div>
  );
};
interface IAssetModal {
  setAdvancedOptions: () => void;
  buttonState: Tab;
  chain: any;
  asset: any;
}

const GasOptionsModal = ({
  setAdvancedOptions,
  buttonState,
  chain,
  asset
}: IAssetModal) => {
  const { account, library } = useWeb3React();
 const { fetchMarketDataGasPrices, networkGasData, setDefaultGasPrice, defaultGasPrice, customGasPrice, setCustomtGasPrice } = useGasPriceState()

  const [loading, setLoading] = useState<boolean>(true)
  const [maxPriorityFee, setMaxPriorityFee] = useState<string>("1.5");
  const [gasLimit, setGasLimit] = useState<string>("0");
  const [gasMinLimit, setMinGasLimit] = useState<string>("0");
  const [baseFee, setBaseFee] = useState<string | undefined>(
    networkGasData?.fees!.slow!.toString()
  );
  const [maxFee, setMaxFee] = useState<string | undefined>(networkGasData?.fees!.rapid!.toString());
  const [activeButton, setActiveButton] = useState<Tab>({
    tabName: "Basic",
    tabNumber: 0,
    side: "left",
  });

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
      setGasLimit(Number(gasLimit).toString())
      setMinGasLimit(Number(gasLimit).toString())
  });
  }, []);

  useEffect(() => {
    fetchMarketDataGasPrices().then(() => setLoading(false));
    const interval: NodeJS.Timer = setInterval(fetchMarketDataGasPrices, 5000);
    return () => clearInterval(interval);
  }, [fetchMarketDataGasPrices]);

  const onChange = useCallback(
    (v: string, _isMax = false) => {
      let value: number | string = v;
      setGasLimit(String(value));
    },
    [setGasLimit]
  );

  const handleChange = (e: any) => {
    e.preventDefault();
    const value: string = e.target.value;
    if (value.length > 11) {
      const pointIndex = value.indexOf(".");
      if (
        pointIndex === -1 ||
        (pointIndex >= 0 && value.substring(0, pointIndex).length > 11)
      ) {
        e.preventDefault();
        return;
      }
    }
    onChange(value);
  };

  console.log(Number(gasMinLimit) > Number(gasLimit));

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
      <div className="mx-[6px] flex items-center justify-start gap-2 p-2">
        <span className="text-[14px] text-gray-300">GasPrice</span>
      </div>
      {activeButton.tabName === "Basic" ? (
        <BasicOptions
          networkGasData={networkGasData}
          defaultGasPrice={customGasPrice}
          setDefaultGasPrice={setCustomtGasPrice}
          gasLimit={gasLimit}
          loading={loading}
        />
      ) : (
        <AdvancedOptions
          networkGasData={networkGasData}
          maxPriorityFee={maxPriorityFee}
          maxFee={maxFee}
        />
      )}
      <div className="mx-[6px] mt-2 flex items-center justify-between gap-2 p-2">
        <span className="text-[14px] text-gray-300">GasLimit</span>
        {Number(gasMinLimit) > Number(gasLimit) && (
          <span className="text-[14px] text-red-500">gas limit too low</span>
        )}
      </div>
      <div className="broder mx-[6px] mb-3 flex flex-col gap-2 rounded-2xl border-tertiary px-1 text-[20px]">
        <WalletInputWrapper error={Number(gasMinLimit) > Number(gasLimit)}>
          <WalletInput
            //   onKeyPress={preventMinus}
            type={"number"}
            value={gasLimit}
            placeholder={gasMinLimit}
            onChange={handleChange}
            error={Number(gasMinLimit) > Number(gasLimit)}
          ></WalletInput>
        </WalletInputWrapper>
      </div>
      <div className=" mb-4 w-full break-words px-5 text-left text-[14px] text-gray-400">
        <span>
          Chainging the GasLimit may have unintened effects. Only change this if
          you know what your doing
        </span>
      </div>
      <div className="mx-2 mb-1 mt-2 flex items-center justify-center">
        <PrimaryButton
          className={
            "w-full justify-center rounded-2xl bg-blue-500 py-[15px] text-center"
          }
          onClick={setAdvancedOptions}
        >
          Confirm Options
        </PrimaryButton>
      </div>
    </>
  );
};

export default GasOptionsModal;
