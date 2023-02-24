import React, { useState, useEffect, useCallback } from "react";
import styled, { css } from "styled-components";
import BtcIcon from "../../../public/svgs/assets/renBTC.svg";
import EthIcon from "../../../public/svgs/chains/ethereum.svg";

import { UilAngleDown, UilSpinner } from '@iconscout/react-unicons';
import { MintFormTextWrapper2, MintFormText2 } from "../CSS/WalletModalStyles";
import ToggleButtonContainer from "./components/ToggleButton";
import Dropdown from "./components/Dropdown";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import WalletInputForm from "./components/WalletInput";
import BalanceDisplay from "../NativeBalanceDisplay/BalanceDisplay";
import { useWeb3React } from "@web3-react/core";
import { ChainIdToRenChain, CHAINS } from "../../connection/chains";
import { useAuth } from "../../context/useWalletAuth";
import { RenNetwork } from "@renproject/utils";
import { MulticallReturn, useGlobalState } from "../../context/useGlobalState";
import { get } from "../../services/axios";
import API from "../../constants/Api";
import { ethers } from "ethers";
import {
  MINT_GAS_UNIT_COST,
  NetReturn,
} from "../../utils/market/getMarketGasData";
import { UilPump } from "@iconscout/react-unicons";
import { Icon } from "../Icons/AssetLogs/Icon";
import { useNotification } from "../../context/useNotificationState";
import WalletButton from "../Buttons/WalletButton";
import { useTransactionFlow } from "../../context/useTransactionFlowState";
import { useApproval } from "../../hooks/useApproval";
import { BridgeDeployments } from "../../constants/deployments";
import { chainAdresses } from "../../constants/Addresses";
import BigNumber from "bignumber.js";
import { chainsBaseConfig } from "../../utils/chainsConfig";
import { toFixed } from "../../utils/misc";
import { useGasPriceState } from "../../context/useGasPriceState";
import FeeData from "./components/FeeData";
export type Tab = {
  tabName: string;
  tabNumber: number;
  side: string;
  contractFunc?: any;
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
    border-top-${(props: any) => props.side}-radius: 10px;
    border-right: 1.5px solid rgb(14, 22, 39);
    background: ${(props: any) =>
      props.active ? "rgb(15, 25, 55)" : "rgb(34, 53, 83)"};
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${(props: any) =>
      props.active ? "rgb(75,135,220)" : "rgb(34, 53, 83)"};
    color: ${(props: any) => (props.active ? "rgb(75,135,220)" : "White")};
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
  setWalletAssetType: any;
  asset: any;
  text: string;
  setText: any;
  buttonState: Tab;
  setButtonState: any;
}

const WalletModal = ({
  setShowTokenModal,
  setWalletAssetType,
  asset,
  text,
  setText,
  buttonState,
  setButtonState,
}: IWalletModal) => {
  const [isAssetApproved, setIsAssetApproved] = useState<boolean>(false);
  const [isSufficentBalance, setIsSufficientBalance] = useState<boolean>(true);
  const [bridgeBalance, setBridgeBalance] = useState<any>(0);
  const [walletBalance, setWalletBalance] = useState<any>(0);
  const [isMax, setIsMax] = useState<boolean>(false);
  const { switchNetwork } = useAuth();
  const { chainId, account } = useWeb3React();
  const { toggleConfirmationModal } = useTransactionFlow();
  const { defaultGasPrice } = useGasPriceState();
  const { approve } = useApproval();
  const {
    setDestinationChain,
    pendingTransaction,
    destinationChain,
    assetBalances,
    setChainType,
  } = useGlobalState();

  const needsToSwitchChain =
    ChainIdToRenChain[chainId!] === destinationChain.fullName;
  const error = !needsToSwitchChain
    ? false
    : text === "" || Number(text) == 0 || !isSufficentBalance;
  // console.log(error);

  useEffect(
    () => setText(""),
    [buttonState, pendingTransaction, destinationChain, setText]
  );

  const setChainT = useCallback(
    (type: string) => setChainType(type),
    [setChainType]
  );
  useEffect(() => {
    if (!asset || !account) return;
    (async () => {
      const approvalResponse = await get<{
        result: any;
      }>(API.ren.getTokenApproval, {
        params: {
          chainName: destinationChain.fullName,
          assetName: asset.Icon,
          account: account,
        },
      });
      if (!approvalResponse) throw new Error("Multicall Failed");
      if (
        Number(approvalResponse.result.hex) > 0 ||
        buttonState.tabName === "Withdraw"
      )
        setIsAssetApproved(true);
      else setIsAssetApproved(false);
    })();
  }, [asset, account, buttonState.tabName, destinationChain.fullName]);

  useEffect(() => {
    if (typeof assetBalances === "undefined") return;
    (async () => {
      setIsSufficientBalance(true); // reset on component mount to override previous tokens' value
      if (buttonState.tabName === "Deposit") {
        const walletBalance = new BigNumber(
          assetBalances[asset.Icon]?.walletBalance!
        ).shiftedBy(-asset.decimals);

        setBridgeBalance(Number(walletBalance));
        setIsSufficientBalance(+walletBalance >= Number(text));
      } else {
        const bridgeBalance = new BigNumber(
          assetBalances[asset.Icon]?.bridgeBalance!
        ).shiftedBy(-asset.decimals);

        setWalletBalance(Number(bridgeBalance));
        setIsSufficientBalance(Number(text) <= Number(bridgeBalance));
      }
    })();
  }, [text, setIsSufficientBalance, asset, assetBalances, buttonState]);

  const execute = useCallback(() => {
    const bridgeAddress = BridgeDeployments[destinationChain.fullName];
    const tokenAddress =
      chainAdresses[destinationChain.fullName]?.assets[asset.Icon]
        ?.tokenAddress!;

    if (!needsToSwitchChain) {
      switchNetwork(destinationChain.testnetChainId!).then((result: any) => {
        setDestinationChain(
          chainsBaseConfig[ChainIdToRenChain[destinationChain.testnetChainId!]!]
        );
      });
      
    } else if (!isAssetApproved) {
      approve(tokenAddress, text, bridgeAddress!);
      setIsAssetApproved(true);
    } else toggleConfirmationModal();
  }, [
    approve,
    asset,
    destinationChain,
    isAssetApproved,
    needsToSwitchChain,
    switchNetwork,
    text,
    toggleConfirmationModal,
    setDestinationChain,
  ]);

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
          setChainType={() => {}}
        />
        <Dropdown
          text={destinationChain.fullName}
          dropDownType={"chain"}
          Icon={destinationChain.Icon as any}
          type={buttonState.tabName}
          setType={setWalletAssetType}
          setShowTokenModal={setShowTokenModal}
          setChainType={setChainT}
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
          {text !== "" && (
            <FeeData
              text={text}
              defaultGasPrice={defaultGasPrice}
              asset={asset}
            />
          )}

          <div className="mt-6 mb-1 flex items-center justify-center px-5">
            <WalletButton
              destinationChain={destinationChain}
              asset={asset}
              buttonState={buttonState}
              isSufficentBalance={isSufficentBalance}
              isAssetApproved={isAssetApproved}
              needsToSwitchChain={needsToSwitchChain}
              execute={execute}
              text={text}
              error={error}
            />
          </div>
        </MintFormContainer>
      </BridgeModalContainer>
    </div>
  );
};

export default WalletModal;
