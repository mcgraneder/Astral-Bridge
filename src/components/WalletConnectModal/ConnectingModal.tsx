import React from "react";
import { useWeb3React } from "@web3-react/core";
import { useViewport } from "../../hooks/useViewport";
import { FormWrapper } from "./WalletConnectModal";
import { TopRowNavigation } from "./WalletConnectModal";
import { Breakpoints } from "../../constants/Breakpoints";
import BottomSheetOptions from "../BottomSheet/BottomSheetOptions";
import { UilCheckCircle, UilSpinner } from "@iconscout/react-unicons";

interface ConnectingModalProps {
    close: () => void;
    open: boolean;
}

interface IconProps {
    active: boolean;

}
export const GetIcon = ({ active }: IconProps) => {

    return (
        <>
            {active ? (
                <div>
                    <UilCheckCircle color={"rgb(59 130 246)"} size={"80px"} />
                </div>
            ) : (
                <UilSpinner size={20} className={" h-20 w-20 animate-spin text-blue-500"} />
            )}
        </>
    );
};

const ConnectingModalInner = ({ active, close }: { active: boolean; close: () => void }) => {
    return (
        <>
            <TopRowNavigation isRightDisplay={true} close={close} />
            <div className='my-4 flex flex-col items-center justify-center  px-2'>
                <GetIcon active={active} />
            </div>
            <div className='my-2 flex flex-col items-center gap-2'>
                <span className=' text-[17px] font-semibold'>Waiting to connect</span>
                <span className='text-[15px] text-gray-500'>Please confirm the request in your wallet</span>
            </div>
        </>
    );
};

function ConnectingModal({ close, open }: ConnectingModalProps) {
    const { active } = useWeb3React();
    const { width } = useViewport();

    return (
        <>
            {width > 0 && width >= Breakpoints.sm1 ? (
                <FormWrapper>
                    <ConnectingModalInner active={active} close={close}  />
                </FormWrapper>
            ) : (
                <BottomSheetOptions hideCloseIcon open={open} setOpen={() => null} title={"Connecting"}>
                    <ConnectingModalInner active={active} close={close} />
                </BottomSheetOptions>
            )}
        </>
    );
}

export default ConnectingModal;
