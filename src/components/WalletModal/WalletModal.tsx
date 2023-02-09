import React, { useState, useEffect, useCallback } from "react";
import styled, { css } from "styled-components";
import BtcIcon from "../../../public/svgs/assets/renBTC.svg";
import EthIcon from "../../../public/svgs/chains/ethereum.svg";

import { UilAngleDown } from "@iconscout/react-unicons";
import { MintFormTextWrapper2, MintFormText2 } from "../CSS/WalletModalStyles";
import ToggleButtonContainer from "./components/ToggleButton";
import Dropdown from "./components/Dropdown";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import WalletInputForm from "./components/WalletInput";
import BalanceDisplay from "../NativeBalanceDisplay/BalanceDisplay";
import { useWallet } from "../../context/useWalletState";
import { useWeb3React } from "@web3-react/core";
import { ChainIdToRenChain, CHAINS } from "../../connection/chains";
import { useAuth } from "../../context/useWalletAuth";
import { RenNetwork } from "@renproject/utils";
import { MulticallReturn, useGlobalState } from "../../context/useGlobalState";
import { get } from "../../services/axios";
import API from "../../constants/Api";
import { ethers } from "ethers";
import { MINT_GAS_UNIT_COST } from "../../utils/market/getMarketGasData";
import { UilPump } from "@iconscout/react-unicons";
import { Icon } from "../Icons/AssetLogs/Icon";
export type Tab = {
  tabName: string;
  tabNumber: number;
  side: string;
};

const TABS: Tab[] = [
  {
    tabName: "Deposit",
    tabNumber: 0,
    side: "left",
  },
  {
    tabName: "Withdraw",
    tabNumber: 1,
    side: "right",
  },
];

export const BridgeModalContainer = styled.div`
  max-width: 480px;
  color: White;
  background-color: rgb(15, 25, 55);
  text-align: right;
  padding: 12px 18px;
  border: 1px solid rgb(57, 62, 82);
  border-radius: 20px;
  box-shadow: 0px 10px 150px 5px rgba(75, 135, 220, 0.03);
  margin: 30px auto 0;
  position: relative;
  transition: height 3s ease-out;
`;

export const MintFormContainer = styled.div`
  margin-top: 10px;
  padding-bottom: 20px;
  margin-bottom: 10px;
  background: rgb(34, 53, 83);
  border: 1px solid rgb(34, 43, 68);
  border-radius: 10px;
`;

export const MinFormToggleButtonContainer = styled.div`
  height: 40px;
  display: flex;
  margin-bottom: 25px;
  background: rgb(15, 25, 55);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  &:hover {
    background: rgb(34, 43, 68);
  }
`;

export const MintToggleButton = styled.div`

   
    width: 50%;
    height: 100%;
    border-top-${(props) => props.side}-radius: 10px;
    border-right: 1.5px solid rgb(14, 22, 39);
    background: ${(props) =>
      props.active ? "rgb(15, 25, 55)" : "rgb(34, 53, 83)"};
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${(props) =>
      props.active ? "rgb(75,135,220)" : "rgb(34, 53, 83)"};
    color: ${(props) => (props.active ? "rgb(75,135,220)" : "White")};
    &:hover {
        cursor: pointer;
    }

`;

export const InfoContainer = styled.div`
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 10px;
  height: ${(props: any) => (props.visible ? "87px" : "0px")};
  transition: height 0.25s ease-in;
  background: rgb(15, 25, 55);
  border-radius: 10px;

  ${(props: any) =>
    props.visible &&
    css`
      border: 1px solid rgb(57, 75, 105);
    `}
`;

const NETWORK: RenNetwork = RenNetwork.Testnet;

interface IWalletModal {
  setShowTokenModal: any;
  confirmation: boolean;
  toggleConfirmationModal: () => void;
}

const WalletModal = ({
  setShowTokenModal,
  confirmation,
  toggleConfirmationModal,
}: IWalletModal) => {
  const [isSufficentBalance, setIsSufficientBalance] = useState<boolean>(true);
  const [bridgeBalance, setBridgeBalance] = useState<any>(0);
  const [walletBalance, setWalletBalance] = useState<any>(0);
  const [isMax, setIsMax] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [buttonState, setButtonState] = useState<Tab>({
    tabName: "Deposit",
    tabNumber: 0,
    side: "left",
  });
  const { switchNetwork } = useAuth();
  const { chainId, active } = useWeb3React();
  const { setWalletAssetType, asset, chain, gasPrice } = useWallet();
  const { assetBalances } = useGlobalState();

  const needsToSwitchChain = ChainIdToRenChain[chainId!] === chain.fullName;
  console.log(ChainIdToRenChain[chainId!], chain.fullName);
  const handleDeposit = () => {};

  useEffect(() => {
    if (typeof assetBalances === "undefined") return;
    (async () => {
      setIsSufficientBalance(true); // reset on component mount to override previous tokens' value
      if (buttonState.tabName === "Deposit") {
        const bridgeBalance =
          Number(assetBalances[asset.Icon]?.bridgeBalance) /
          10 ** asset.decimals;

        console.log(
          text,
          bridgeBalance,
          Number(bridgeBalance) + Number(gasPrice)
        );
        setBridgeBalance(Number(bridgeBalance));
        setIsSufficientBalance(
          +bridgeBalance >= Number(text) + Number(gasPrice)
        );
      } else {
        const walletBalance =
          Number(assetBalances["USDT_Goerli"]?.walletBalance) / 10 ** 6;

        console.log(text, walletBalance, Number(walletBalance) + gasPrice);
        setWalletBalance(Number(walletBalance));
        setIsSufficientBalance(
          Number(text) <= Number(walletBalance) + gasPrice
        );
      }
    })();
  }, [text, setIsSufficientBalance, asset, assetBalances, buttonState]);

  const getButtonText = (chain: any, library: boolean, buttonState: Tab) => {
    if (!library) return "Connect Wallet";
    // else if (pending) return "Pending"
    else if (!needsToSwitchChain) return `Switch to ${chain.fullName} network`;
    else if (!isSufficentBalance && text !== "") return "Insufficent funds";
    else return `${buttonState.tabName} ${text} ${asset.Icon}`;
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
    <div className="mt-[60px] mb-[40px]">
      <BridgeModalContainer>
        <Dropdown
          text={asset.fullName}
          dropDownType={"currency"}
          Icon={asset.Icon}
          type={buttonState.tabName}
          setType={setWalletAssetType}
          setShowTokenModal={setShowTokenModal}
        />
        <Dropdown
          text={chain.fullName}
          dropDownType={"chain"}
          Icon={chain.Icon}
          type={buttonState.tabName}
          setType={setWalletAssetType}
          setShowTokenModal={setShowTokenModal}
        />
        <BalanceDisplay
          asset={asset}
          isNative={false}
          buttonState={buttonState.tabName}
        />
        <MintFormContainer>
          <ToggleButtonContainer
            activeButton={buttonState}
            tabs={TABS}
            setActiveButton={setButtonState}
          />
          <WalletInputForm
            setAmount={setText}
            amount={text}
            isMax={isMax}
            setIsMax={setIsMax}
            bridgeBalance={bridgeBalance}
            walletBalance={walletBalance}
            buttonState={buttonState.tabName}
          />
          {!needsToSwitchChain ? (
            <InfoContainer visible={text !== ""}>
              <div
                className={`flex flex-col items-start justify-center gap-2 text-[15px] ${
                  text === "" ? "opacity-0" : "opacity-100"
                } mx-5 my-4`}
              >
                <div className="justify0center flex items-center gap-2">
                  <UilPump className={"h-[18px] w-[18px] text-blue-500"} />
                  <div>Estimated network fee: </div>
                  <span className="text-gray-400">
                    {gasPrice}{" "}
                    <span className="text-grey-600">
                      {CHAINS[chainId!]?.symbol!}
                    </span>
                  </span>
                </div>
                <div className="justify0center flex items-center gap-2">
                  <Icon
                    className={"h-[18px] w-[18px]"}
                    chainName={asset.Icon}
                  />
                  <div>Estimated Bridge fee: </div>
                  <span className="text-gray-400">
                    {"0.00"} <span className="text-grey-600">{asset.Icon}</span>
                  </span>
                </div>
              </div>
            </InfoContainer>
          ) : null}
          <div className="mt-6 mb-1 flex items-center justify-center px-5">
            <PrimaryButton
              className={`borde w-full justify-center rounded-lg ${getButtonColour()} py-[16px] text-center text-[17px] font-semibold`}
              onClick={
                needsToSwitchChain
                  ? toggleConfirmationModal
                  : () =>
                      switchNetwork(
                        NETWORK === RenNetwork.Testnet
                          ? chain.testnetChainId
                          : chain.mainnetChainId
                      )
              }
            >
              {getButtonText(chain, active, buttonState)}
            </PrimaryButton>
          </div>
        </MintFormContainer>
      </BridgeModalContainer>
    </div>
  );
};

export default WalletModal;
