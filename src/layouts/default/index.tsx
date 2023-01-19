import React from "react";
import Image from "next/image";
import NavigationBar from "./NavigationBar";
import styles from "./layout.module.css";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar/Navbar";
import WalletConnect from "../../components/WalletConnectModal/WalletConnectModal";
import { useAuth } from '../../context/useWalletAuth';
import BottomNavBar from '../../components/Navbar/BottomNavBar';
import { useViewport } from '../../hooks/useViewport';
interface DefaultLayoutProps {
  children: React.ReactNode;
}

function DefaultLayout({ children }: DefaultLayoutProps) {
  const router = useRouter();
  const { width } = useViewport()
  const { toggleWalletModal } = useAuth()
  const pathName = router.pathname;
  const onCorrectPage = ["/explorerHome"].includes(router.pathname);

  return (
    <>
      <div className='flex flex-col items-center h-screen text-white md:px-8 lg:h-auto lg:min-h-screen'>
        <Navbar toggleWalletModal={toggleWalletModal}/>
        <BottomNavBar/>
        <WalletConnect toggleWalletModal={toggleWalletModal}/>
        <div
          id='layout'
          className={`relative bg-black-900 pb-2 pt-6 px-2 overflow-y-scroll coingrid-scrollbar lg:overflow-y-auto md:p-10 sm:p-8 rounded-t-[40px] md:rounded-[40px] overflow-x-hidden   items-center flex-1 w-full lg:mb-6`}>
          {children}
        </div>
      </div>
    </>
  );
}


export default DefaultLayout;
