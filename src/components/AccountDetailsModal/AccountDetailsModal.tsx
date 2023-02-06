import React from "react";
import { useWeb3React } from "@web3-react/core";
import { useViewport } from "../../hooks/useViewport";
import { Breakpoints } from "../../constants/Breakpoints";
import BottomSheetOptions from "../BottomSheet/BottomSheetOptions";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import { UilTimes } from "@iconscout/react-unicons";
import { useAuth } from "../../context/useWalletAuth";
import { useRouter } from "next/router";
import Identicon from "../Identicon/Identicon";
import { shortenAddress } from "../../utils/misc";
import CopyIcon from "../Icons/CopyIcon";
import { ExternalLink, Power } from "react-feather";
import styled, { css } from "styled-components";
import BalanceDisplay from "../NativeBalanceDisplay/BalanceDisplay";
import { useWallet } from "../../context/useWalletState";

export const Backdrop = styled.div`
    position: fixed;
    height: 100vh;
    width: 100vw;
    opacity: 0;
    pointer-events: none;
    backdrop-filter: blur(5px);
    z-index: 10000000000;
    pointer-events: none;
    background: rgba(2, 8, 26, 0.45);
    transition: opacity 0.15s ease-in-out !important;

    ${(props: any) =>
        props.visible &&
        css`
            opacity: 1;

            pointer-events: all;
        `}
`;

export const FormWrapper = styled.div`
    position: fixed;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -50%);
    width: 390px;
    background-color: rgb(15, 25, 55);
    text-align: right;
    padding: 20px 15px;
    padding-bottom: 20px;
    border: 1.5px solid rgb(48, 63, 88);
    border-radius: 15px;
    display: block;
    z-index: 10000000000;
`;

interface AccountDetailsProps {
    toggleAccoundDetailsModal: () => void;
    showAccount?: boolean;
}

interface ITopRow {
    account: any;
    toggleAccoundDetailsModal: () => void;
}

export const TopRowNavigation = ({ account, toggleAccoundDetailsModal }: ITopRow) => {
    return (
        <div className={`mb-2 flex items-center justify-between px-2`}>
            <div className='flex items-center gap-2'>
                <Identicon />
                <span className='text-[15px]'>{shortenAddress(account)}</span>
            </div>
            <div className='flex items-center gap-2'>
                <div className='rounded-xl bg-gray-600 p-0.5 hover:bg-gray-500'>
                    <CopyIcon text={account} />
                </div>
                <div className='rounded-xl bg-gray-600 p-0.5 hover:bg-gray-500'>
                    <button className='bg-black-600 rounded-full p-[5px]'>
                        <ExternalLink className='h-4 w-4 text-gray-400 ' />
                    </button>
                </div>
                <div className='rounded-xl bg-gray-600 p-0.5 hover:bg-gray-500'>
                    <button className='bg-black-600 rounded-full p-[5px]'>
                        <Power className='h-4 w-4 text-gray-400 ' />
                    </button>
                </div>
                <div className='rounded-xl bg-gray-600 p-0.5 hover:bg-gray-500'>
                    <button className='bg-black-600 rounded-full p-[5px]' onClick={toggleAccoundDetailsModal}>
                        <UilTimes className='h-4 w-4 text-gray-400 ' />
                    </button>
                </div>
            </div>
        </div>
    );
};

const AccountDetailsModalIner = ({ toggleAccoundDetailsModal }: AccountDetailsProps) => {
    const { disconnect } = useAuth();
    const { asset, chain } = useWallet()
    const { account } = useWeb3React();
    const { push } = useRouter();

    const deactivate = (): void => {
        disconnect();
        toggleAccoundDetailsModal();
        push("/home");
    };

    return (
        <>
            <TopRowNavigation account={account} toggleAccoundDetailsModal={toggleAccoundDetailsModal} />
            <BalanceDisplay asset={asset} chain={chain}/>
            <div className='mt-4 flex items-center justify-center'>
                <PrimaryButton className={"w-full justify-center rounded-lg bg-blue-500 py-[15px] text-center"} onClick={deactivate}>
                    Disconnect
                </PrimaryButton>
            </div>
        </>
    );
};

function AccountDetailsModal({ toggleAccoundDetailsModal, showAccount }: AccountDetailsProps) {
    const { width } = useViewport();

    return (
        <>
            {width > 0 && width >= Breakpoints.sm1 ? (
                <Backdrop visible={showAccount}>
                    <FormWrapper>
                        <AccountDetailsModalIner toggleAccoundDetailsModal={toggleAccoundDetailsModal} />
                    </FormWrapper>
                </Backdrop>
            ) : (
                <BottomSheetOptions hideCloseIcon open={showAccount} setOpen={toggleAccoundDetailsModal} title={"Connecting"}>
                    <AccountDetailsModalIner toggleAccoundDetailsModal={toggleAccoundDetailsModal} />
                </BottomSheetOptions>
            )}
        </>
    );
}

export default AccountDetailsModal;
