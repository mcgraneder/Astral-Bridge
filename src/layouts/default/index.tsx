import React from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar/Navbar";
import WalletConnect from "../../components/WalletConnectModal/WalletConnectModal";
import { useAuth } from '../../context/useWalletAuth';
import BottomNavBar from '../../components/Navbar/BottomNavBar';
import { useViewport } from '../../hooks/useViewport';
import AccountVerificationModal from "../../components/AccountVerificationModal/AccountVerificationModal";

interface DefaultLayoutProps {
    children: React.ReactNode;
}

function DefaultLayout({ children }: DefaultLayoutProps) {
    const { toggleWalletModal } = useAuth();
    return (
        <>
            <div className='flex h-screen flex-col items-center text-white md:px-8 lg:h-auto lg:min-h-screen'>
                <AccountVerificationModal />
                <Navbar toggleWalletModal={toggleWalletModal} />
                <BottomNavBar />
                <WalletConnect toggleWalletModal={toggleWalletModal} />

                <div id='layout' className={`bg-black-900 coingrid-scrollbar relative w-full flex-1 items-center overflow-x-hidden overflow-y-scroll rounded-t-[40px] px-2 pb-2 pt-6 sm:p-8   md:rounded-[40px] md:p-10 lg:mb-6 lg:overflow-y-auto`}>
                    {children}
                </div>
            </div>
        </>
    );
}


export default DefaultLayout;
