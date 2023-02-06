import React, { useState, useEffect } from "react";
import styled from "styled-components";
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
import { useWeb3React } from '@web3-react/core';
import { ChainIdToRenChain } from '../../connection/chains';
import { useAuth } from "../../context/useWalletAuth";

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
    background: ${(props) => (props.active ? "rgb(15, 25, 55)" : "rgb(34, 53, 83)")};
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${(props) => (props.active ? "rgb(75,135,220)" : "rgb(34, 53, 83)")};
    color: ${(props) => (props.active ? "rgb(75,135,220)" : "White")};
    &:hover {
        cursor: pointer;
    }

`;

interface IWalletModal {
    setShowTokenModal: any;
}

const WalletModal = ({ setShowTokenModal }: IWalletModal) => {
    const [text, setText] = useState<string>("");
    const [buttonState, setButtonState] = useState<Tab>({
        tabName: "Deposit",
        tabNumber: 0,
        side: "left",
    });
    const { switchNetwork } = useAuth()
    const { chainId } = useWeb3React()
    const { walletAssetType, setWalletAssetType, asset, chain } = useWallet()

    const needsToSwitchChain = ChainIdToRenChain[chainId!] === chain.fullName && chainId

    useEffect(() => {
        if (!chainId) return
    })

    const handleDeposit = () => {

    }
    return (
        <div className='my-[60px]'>
            <BridgeModalContainer>
                <Dropdown text={asset.fullName} dropDownType={"currency"} Icon={asset.Icon} type={buttonState.tabName} setType={setWalletAssetType} setShowTokenModal={setShowTokenModal} />
                <Dropdown text={chain.fullName} dropDownType={"chain"} Icon={chain.Icon} type={buttonState.tabName} setType={setWalletAssetType} setShowTokenModal={setShowTokenModal} />
                <BalanceDisplay asset={asset}/>
                <MintFormContainer>
                    <ToggleButtonContainer activeButton={buttonState} tabs={TABS} setActiveButton={setButtonState} />
                    <WalletInputForm setText={setText} text={text} />
                    <div className='mt-6 mb-1 flex items-center justify-center px-5'>
                        <PrimaryButton className={"w-full justify-center rounded-lg border border-blue-400 bg-blue-500 py-[16px] text-center text-[17px] font-semibold hover:border-blue-500 hover:bg-blue-600"} onClick={needsToSwitchChain ? () => {} : () => switchNetwork(5)}>
                            {needsToSwitchChain ? buttonState.tabName : `Switch to ${chain.fullName} network`}
                        </PrimaryButton>
                    </div>
                </MintFormContainer>
            </BridgeModalContainer>
        </div>
    );
};

export default WalletModal;
