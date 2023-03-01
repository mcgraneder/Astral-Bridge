import React from "react";
import { useWeb3React } from "@web3-react/core";
import { useViewport } from "../../hooks/useViewport";
import { FormWrapper } from "./WalletConnectModal";
import { TopRowNavigation } from "./WalletConnectModal";
import { Breakpoints } from "../../constants/Breakpoints";
import BottomSheetOptions from "../BottomSheet/BottomSheetOptions";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import { WalletInfo, WALLETS } from "../../connection/wallets";
import GreenDot from "../Icons/GreenDot";
import { useRouter } from 'next/router';

const getWalletOptions = () => {
    return Object.values(WALLETS);
};

interface WalletOptionsProps {
    connect: (provider: any) => void;
    active: boolean;
    provider: any;
}

interface WalletSelectProps {
    toggleWalletModal: () => void;
    setConnecting: React.Dispatch<React.SetStateAction<boolean>>;
    connectOn: (provider1: any) => void;
    setPendingWallet: React.Dispatch<any>;
    width: any
}

interface WalletSelectInnerProps {
    toggleWalletModal: () => void;
    active: boolean;
    connect: (provider: any) => void;
    deactivate: () => void;
}

const WalletOption = ({ connect, provider, active }: WalletOptionsProps) => {
    return (
        <>
            {getWalletOptions().map((wallet: WalletInfo) => {
                return (
                    <div key={wallet.provider} onClick={() => connect(wallet)} className='flex flex-row gap-3 rounded-xl border border-gray-500 bg-tertiary px-4 py-4 hover:cursor-pointer hover:bg-lightTertiary'>
                        <div className='flex h-full'>
                            <wallet.icon />
                        </div>
                        <span className='text-[17px] font-semibold'>{wallet.name}</span>
                        {active && provider === wallet.provider && <GreenDot/>}
                    </div>
                );
            })}
        </>
    );
};

const WalletSelectModalInner = ({ connect, active, toggleWalletModal, deactivate }: WalletSelectInnerProps) => {
    const provider = localStorage.getItem("provider");
    return (
        <>
            <TopRowNavigation isRightDisplay={true} isLeftDisplay={true} close={toggleWalletModal} title={"Connect"} />
            <div className='mt-4 flex flex-col justify-center gap-3 px-2'>
                <WalletOption connect={connect} provider={provider} active={active} />
                <div className='my-2 px-4 text-left text-[16px] text-gray-400'>By connecting a wallet, you agree to Astrals’ Terms of Service and consent to its Privacy Policy.</div>
            </div>
            {active ? (
                <div className='mt-2 mb-2 flex items-center justify-center'>
                    <PrimaryButton className={"w-full justify-center rounded-lg bg-blue-500 py-4 text-center hover:cursor-pointer hover:bg-blue-600"} onClick={deactivate}>
                        Disconnect
                    </PrimaryButton>
                </div>
            ) : null}
           
        </>
    );
};

const WalletSelectModal = ({ toggleWalletModal, setConnecting, connectOn, setPendingWallet, width }: WalletSelectProps) => {
    const { active, deactivate } = useWeb3React();
    const { push } = useRouter()

    const disconnect = () => {
        deactivate()
        toggleWalletModal()
        push("/home")
    }
    const connect = async (web3Provider: any): Promise<void> => {
        if (active)  return;
        setPendingWallet(web3Provider);
        setConnecting(true);
        toggleWalletModal();
        setTimeout(() => {
            connectOn(web3Provider);
        }, 1200);
    };

    return (
        <>
            {width > 0 && width >= Breakpoints.sm1 ? (
                <FormWrapper>
                    <WalletSelectModalInner toggleWalletModal={toggleWalletModal} connect={connect} deactivate={disconnect} active={active} />
                </FormWrapper>
            ) : (
                <BottomSheetOptions hideCloseIcon open={true} setOpen={() => null} title={"Connecting"}>
                    <WalletSelectModalInner toggleWalletModal={toggleWalletModal} connect={connect} deactivate={disconnect} active={active} />
                </BottomSheetOptions>
            )}
        </>
    );
};

export default WalletSelectModal;
