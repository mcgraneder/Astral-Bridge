import React, { useState, useEffect, useRef } from "react";
import { UilAngleDown, UilSpinner } from "@iconscout/react-unicons";
import styled from "styled-components";
import { CHAINS, ChainType } from "../../connection/chains";
import { useWeb3React } from "@web3-react/core";
import { useAuth } from "../../context/useWalletAuth";
import { Toast } from "../Notification/Toast";
import { Breakpoints } from "../../constants/Breakpoints";
import { useViewport } from "../../hooks/useViewport";
import BottomSheetOptions from "../BottomSheet/BottomSheetOptions";
import GreenDot from "../Icons/GreenDot";

export const FormWrapper = styled.div`
    position: fixed;
    left: 73.5%;
    top: 18.5%;
    transform: translate(-50%, -50%);
    width: 300px;
    background-color: rgb(15, 25, 55);
    text-align: right;
    padding: 10px;
    padding-bottom: 20px;
    border: 1.5px solid rgb(48, 63, 88);
    border-radius: 15px;
    display: block;
    z-index: 10000000000;
`;

const getChainOptions = () => {
    return Object.values(CHAINS);
};

const TokenSelectDropdown = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [activeChain, setActiveChain] = useState<ChainType | undefined>(undefined);
    const { chainId } = useWeb3React();
    const { width } = useViewport();
    const { needToSwitchChain, switchNetwork } = useAuth();
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!chainId) return;
        const activeChain: ChainType | undefined = CHAINS[chainId];
        setActiveChain(activeChain);
        const onCorrectChain = needToSwitchChain(chainId);
        console.log(onCorrectChain);
        // if (!onCorrectChain) Toast.info("you are currently on an unsupported chain")
    }, [chainId, needToSwitchChain]);

    useEffect(() => {
        const checkIfClickedOutside = (e: Event) => {
            if (!ref.current) return;
            if (!ref.current.contains(e.target as Node | null)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("click", checkIfClickedOutside);
        return () => {
            document.removeEventListener("click", checkIfClickedOutside);
        };
    }, [isMenuOpen]);

    return (
        <>
            <div className='relative left-0 h-fit w-fit' ref={ref}>
                <ChainSelectorButton setIsMenuOpen={setIsMenuOpen} activeChain={activeChain} />
                {isMenuOpen && (
                    width > 0 && width >= Breakpoints.sm1 ? (
                        <FormWrapper>
                            {getChainOptions()
                                .filter((chain: ChainType) => chain.isTestnet)
                                .map((chain: ChainType) => {
                                    return <ChainSelector chain={chain} currentChain={chainId} switchNetwork={switchNetwork} />;
                                })}
                    </FormWrapper>)
                    :
                    (<BottomSheetOptions hideCloseIcon open={true} setOpen={() => null} title={"Chain selection"}>
                        {getChainOptions()
                            .filter((chain: ChainType) => chain.isTestnet)
                            .map((chain: ChainType) => {
                                return <ChainSelector chain={chain} currentChain={chainId}  switchNetwork={switchNetwork} />;
                            })}
                    </BottomSheetOptions>)
                )}
            </div>
        </>
    );
};

const ChainSelectorButton = ({ setIsMenuOpen, activeChain }: { setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>; activeChain: ChainType | undefined }) => {
    return (
        <div
            className=' flex items-center rounded-lg px-2 text-center hover:cursor-pointer hover:border-gray-500 hover:bg-black hover:bg-opacity-20'
            onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                e.stopPropagation();
                setIsMenuOpen((o: boolean) => !o);
            }}>
            {activeChain && <activeChain.logo />}
            <span className='hidden w-full text-center mlg:block'>{activeChain ? activeChain.chainName : "Unknown"}</span>
            <UilAngleDown className={"h-5 w-5 mlg:h-8 mlg:w-8"} />
        </div>
    );
};
const ChainSelector = ({ chain, currentChain, switchNetwork }: { chain: ChainType; currentChain: number | undefined;  switchNetwork: (id: number) => Promise<void> }) => {
    return (
        <div className='flex flex-row items-center gap-3 rounded-lg px-2 py-2 hover:cursor-pointer hover:bg-tertiary' onClick={() => switchNetwork(chain.id)}>
            <div className='flex h-full'>
                <chain.logo className={"h-5 w-5"} />
            </div>
            <span className='text-[15px]'>{chain.chainName}</span>
            {currentChain && currentChain == chain.id && <GreenDot/>}
        </div>
    );
};

export default TokenSelectDropdown;
