import React, { useEffect, useState } from "react";
import useMachineTimeMs from "../../hooks/useMachineTime";
import useBlockNumber from "../../hooks/useBlockNumber";
// import useCurrentBlockTimestamp from "../../hooks/useCurrentBlockTimestamp";
import { CHAINS, SupportedChainId } from "../../connection/chains";
import { useViewport } from "../../hooks/useViewport";
import { useWeb3React } from '@web3-react/core';
import { BigNumber } from "bignumber.js";

const DEFAULT_MS_BEFORE_WARNING = 60000;
const NETWORK_HEALTH_CHECK_MS = 10000;

interface WarningPopupProps {
    label: string;
}

export const WarningPopup = ({ label }: WarningPopupProps) => {
    return (
        <div className="absolute bottom-16 right-6 w-96 rounded-2xl bg-yellow-500 p-4">
            <div className="flex text-lg font-semibold text-black">{label}</div>
            <span className="z-[1000000000] text-black">
                No worries. I made a faucet so that you can get some to try a
                mint & release bridge yourself. Get some at this faucet{' '}
            </span>
            <a
                href="https://simplefaucet.vercel.app/"
                rel="noreferrer noopener"
                target={'_blank'}
                className="font-semibold text-blue-600 no-underline hover:cursor-pointer"
            >
                here
            </a>
        </div>
    );
};
const NetworkConnectivityWarning = () => {
    const { chainId, active: connected } = useWeb3React()
    const { width } = useViewport();
    const [isMounting, setIsMounting] = useState<boolean>(false);
    const machineTime = useMachineTimeMs(NETWORK_HEALTH_CHECK_MS);
    // const blockTime = useCurrentBlockTimestamp();
    const blockNumber = useBlockNumber();

    const info = CHAINS[chainId ?? SupportedChainId.MAINNET];
    const label = info?.chainName;

    const waitMsBeforeWarning = (DEFAULT_MS_BEFORE_WARNING) ?? DEFAULT_MS_BEFORE_WARNING;

    const warning = Boolean(!!blockNumber && machineTime - new BigNumber(blockNumber).multipliedBy(1000).toNumber() > waitMsBeforeWarning);

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
    }, [blockNumber]);

    return (
        <>
            {width > 0 && width >= 1030 ? (
                <div className='flex gap-2 mx-6 items-center justify-center'>
                    {connected && <div className={`h-2 min-h-[8px] w-2 min-w-[8px] rounded-full bg-green-500`}>{isMounting && <div className={`absolute bottom-[22.8px] right-[88.7px] h-[14px] w-[14px]  animate-spin rounded-full border-2 border-primary border-b-green-400`} />}</div>}{" "}
                    {/* <div className='has-tooltip'>
                        <div className={`text-[11px] hover:cursor-pointer ${warning ? "text-yellow-500" : "text-primary"}`}>{blockNumber}</div>
                        <div className='bg-black-600 tooltip absolute right-[75px] -bottom-2 flex w-[130px] cursor-pointer items-center overflow-hidden break-words rounded-xl px-2 py-2 text-xs font-semibold text-gray-300'>{"mostRecentBlock"}</div>
                    </div> */}
                    <div className={`text-[11px] hover:cursor-pointer text-green-500`}>{blockNumber}</div>
                    {/* {warning && <WarningPopup label={"networkFail"} subLabel={"renWarning"} />} */}
                </div>
            ) : (
                <div></div>
            )}
        </>
    );
};

export default React.memo(NetworkConnectivityWarning);
