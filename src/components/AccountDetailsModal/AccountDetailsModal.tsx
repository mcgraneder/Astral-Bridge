import React from "react";
import { useWeb3React } from "@web3-react/core";
import { useViewport } from "../../hooks/useViewport";
import { FormWrapper } from "./WalletConnectModal";
import { TopRowNavigation } from "./WalletConnectModal";
import { Breakpoints } from "../../constants/Breakpoints";
import BottomSheetOptions from "../BottomSheet/BottomSheetOptions";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import { ERROR_MESSSAGES } from "../../context/useWalletAuth";
import { UilExclamationTriangle } from "@iconscout/react-unicons";
import { AbstractConnector } from "@web3-react/abstract-connector";

interface ConnectionErrorModalProps {
    close: () => void;
    setConnecting: React.Dispatch<React.SetStateAction<boolean>>;
    toggleWalletModal: () => void;
    pendingWallet: AbstractConnector | undefined;
    connectOn: (provider1: any) => void;
    message: string;
}

const ConnectionErrorModalInner = ({ close, setConnecting, toggleWalletModal, pendingWallet, connectOn, message }: ConnectionErrorModalProps) => {
    const backToWalletModal = (): void => {
        toggleWalletModal();
        close();
    };
    const connect = (): void => {
        if (!pendingWallet) {
            return;
        }
        close();
        setConnecting(true);
        setTimeout(() => connectOn(pendingWallet), 1200);
    };

    return (
        <>
            <TopRowNavigation isRightDisplay={true} isLeftDisplay={true} backFunction={backToWalletModal} close={close} />
            <div className='my-4 flex flex-col items-center justify-center  px-2'>
                <UilExclamationTriangle className={"h-20 w-20 text-red-500"} />
            </div>
            <div className='my-2 flex flex-col items-center gap-2 text-center'>
                <span className=' text-[17px] font-semibold'>Error connecting</span>
                <span className='text-[15px] text-gray-500'>{message}</span>
            </div>
            {message !== ERROR_MESSSAGES["REQUEST_PENDING"] ? (
                <div className='mt-8 mb-2 flex items-center justify-center'>
                    <PrimaryButton className={"w-full justify-center rounded-lg bg-blue-500 py-4 text-center"} onClick={connect}>
                        Try again
                    </PrimaryButton>
                </div>
            ) : null}
        </>
    );
};

function AccountDetailsModal({ close, setConnecting, toggleWalletModal, pendingWallet, connectOn, message }: ConnectionErrorModalProps) {
    const { width } = useViewport();

    return (
        <>
            {width > 0 && width >= Breakpoints.sm1 ? (
                <FormWrapper>
                    <ConnectionErrorModalInner close={close} setConnecting={setConnecting} toggleWalletModal={toggleWalletModal} pendingWallet={pendingWallet} connectOn={connectOn} message={message} />
                </FormWrapper>
            ) : (
                <BottomSheetOptions hideCloseIcon open={true} setOpen={() => null} title={"Connecting"}>
                    <ConnectionErrorModalInner close={close} setConnecting={setConnecting} toggleWalletModal={toggleWalletModal} pendingWallet={pendingWallet} connectOn={connectOn} message={message} />
                </BottomSheetOptions>
            )}
        </>
    );
}

export default AccountDetailsModal;
