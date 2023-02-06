import React, { useEffect, useState } from "react";
import useMachineTimeMs from "../../hooks/useMachineTime";
import useBlockNumber from "../../hooks/useBlockNumber";
import useCurrentBlockTimestamp from "../../hooks/useCurrentBlockTimestamp";
import { CHAINS, SupportedChainId } from "../../connection/chains";
import { useViewport } from "../../hooks/useViewport";
import { useWeb3React } from '@web3-react/core';

const DEFAULT_MS_BEFORE_WARNING = 60000;
const NETWORK_HEALTH_CHECK_MS = 10000;

interface WarningPopupProps {
    label: string;
    subLabel: string;
}

const WarningPopup = ({ label, subLabel }: WarningPopupProps) => {
    return (
        <div className='absolute bottom-10 right-2 z-50 w-96 rounded-2xl bg-yellow-500 p-4'>
            <div className='flex text-lg font-semibold text-black'>{label}</div>
            <div className='text-black'>{subLabel}</div>
        </div>
    );
};
const NetworkConnectivityWarning = () => {
    const { chainId, active: connected } = useWeb3React()
    const { width } = useViewport();
    const [isMounting, setIsMounting] = useState<boolean>(false);
    const machineTime = useMachineTimeMs(NETWORK_HEALTH_CHECK_MS);
    const blockTime = useCurrentBlockTimestamp();
    const blockNumber = useBlockNumber();

    const info = CHAINS[chainId ?? SupportedChainId.MAINNET];
    const label = info?.chainName;

    const waitMsBeforeWarning = (DEFAULT_MS_BEFORE_WARNING) ?? DEFAULT_MS_BEFORE_WARNING;

    const warning = Boolean(!!blockTime && machineTime - blockTime.mul(1000).toNumber() > waitMsBeforeWarning);

    useEffect(() => {
        if (!blockNumber) {
            return;
        }
        setIsMounting(true);
        const mountingTimer = setTimeout(() => setIsMounting(false), 1000);

        // this will clear Timeout when component unmount like in willComponentUnmount
        return () => {
            clearTimeout(mountingTimer);
        };
    }, [blockNumber, blockTime]);

    return (
        <>
            {width > 0 && width >= 1030 ? (
                <div className='absolute bottom-6 right-10 z-50 flex items-center justify-center gap-2 rounded-2xl p-4'>
                    {connected && <div className={`h-2 min-h-[8px] w-2 min-w-[8px] rounded-full ${warning ? "bg-yellow-500" : "bg-primary"}`}>{isMounting && <div className={`absolute bottom-[17px] left-[13px] h-[14px] w-[14px]  animate-spin rounded-full border-2 ${warning ? "border-yellow-500 border-b-yellow-200" : "border-primary border-b-teal-200"}`} />}</div>}{" "}
                    {/* <div className='has-tooltip'>
                        <div className={`text-[11px] hover:cursor-pointer ${warning ? "text-yellow-500" : "text-primary"}`}>{blockNumber}</div>
                        <div className='bg-black-600 tooltip absolute right-[75px] -bottom-2 flex w-[130px] cursor-pointer items-center overflow-hidden break-words rounded-xl px-2 py-2 text-xs font-semibold text-gray-300'>{"mostRecentBlock"}</div>
                    </div> */}
                    { warning && <WarningPopup label={"networkFail"} subLabel={"renWarning"} />}
                </div>
            ) : (
                <div></div>
            )}
        </>
    );
};

export default React.memo(NetworkConnectivityWarning);
