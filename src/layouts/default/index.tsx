import React from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar/Navbar";
import WalletConnect from "../../components/WalletConnectModal/WalletConnectModal";
import { useAuth } from '../../context/useWalletAuth';
import BottomNavBar from '../../components/Navbar/BottomNavBar';
import { useViewport } from '../../hooks/useViewport';
import AccountVerificationModal from "../../components/AccountVerificationModal/AccountVerificationModal";
import styled from "styled-components"
import { Z_INDEX } from "../../components/theme/zIndex";
const Gradient = styled.div<{ isDarkMode: boolean }>`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    bottom: 0;
    width: 100%;
    min-height: 300px;
    background: ${({ isDarkMode }) => (isDarkMode ? "linear-gradient(rgba(7, 8, 22, 0) 0%, rgb(7 8 22 / 100%) 45%)" : "linear-gradient(rgba(255, 255, 255, 0) 0%, rgb(255 255 255 /100%) 45%)")};
    z-index: 10;
    pointer-events: none;
  
    /* @media screen and (min-width: ${({ theme }) => theme.breakpoint.md}px) {
        height: 100vh;
    } */
`;

const GlowContainer = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    bottom: 0;
    width: 100%;
    overflow-y: hidden;
    height: calc(100vh - ${100}px);
   
`;

const Glow = styled.div`
    position: absolute;
    top: 25px;
    bottom: 0;
    background: radial-gradient(72.04% 72.04% at 50% 10.99%, #5392ff 0%, rgba(166, 151, 255, 0) 100%);
    filter: blur(60px);

    max-width: 420px;
    width: 100%;
    height: 100%;
`;
interface DefaultLayoutProps {
    children: React.ReactNode;
}

function DefaultLayout({ children }: DefaultLayoutProps) {
    const { toggleWalletModal } = useAuth();
    return (
        <>
            <div className='flex h-screen flex-col items-center text-white  lg:h-auto lg:min-h-screen'>
                <Gradient isDarkMode={true} />
                <GlowContainer>
                    <Glow />
                </GlowContainer>
                <AccountVerificationModal />
                <Navbar toggleWalletModal={toggleWalletModal} />
                <BottomNavBar />
                <WalletConnect toggleWalletModal={toggleWalletModal} />

                <div id='layout' className={`z-50 bg-black-900 coingrid-scrollbar relative w-full flex-1 items-center overflow-x-hidden overflow-y-scroll rounded-t-[40px] px-2 pb-2 pt-6 sm:p-8   md:rounded-[40px] md:p-10 lg:mb-6 lg:overflow-y-auto`}>
                    {children}
                </div>
            </div>
        </>
    );
}


export default DefaultLayout;
