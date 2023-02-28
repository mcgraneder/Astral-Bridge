import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar/Navbar";
import WalletConnect from "../../components/WalletConnectModal/WalletConnectModal";
import { useAuth } from '../../context/useWalletAuth';
import BottomNavBar from '../../components/Navbar/BottomNavBar';
import { useViewport } from '../../hooks/useViewport';
import AccountVerificationModal from "../../components/AccountVerificationModal/AccountVerificationModal";
import styled from "styled-components"
import { Z_INDEX } from "../../components/theme/zIndex";
import AccountDetailsModal from "../../components/AccountDetailsModal/AccountDetailsModal";
import { ChainColor, chainsColors } from '../../utils/chainColours';
import { useWeb3React } from '@web3-react/core';
import { ChainIdToRenChain } from '../../connection/chains';
import Footer from "../../components/Footer/Footer";
import NetworkWarning from "../../components/NetworkWarning/NetworkWarning";
import AppLoader from "./AppLoader";
import { useGlobalState } from "../../context/useGlobalState";

const Background = styled.div`
  background: rgb(27, 50, 105);
  background: radial-gradient(
    circle,
    rgba(27, 50, 105, 1) 0%,
    rgba(0, 0, 0, 1) 100%
  );
`;
const Gradient = styled.div<{ isDarkMode: boolean }>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  bottom: 0;
  width: 100%;
  min-height: 300px;
  background: ${({ isDarkMode }: any) =>
    isDarkMode
      ? "linear-gradient(rgba(7, 8, 22, 0) 0%, rgb(7 8 22 / 100%) 45%)"
      : "linear-gradient(rgba(255, 255, 255, 0) 0%, rgb(255 255 255 /100%) 45%)"};
  z-index: 10;
  pointer-events: none;
  height: 2000px;
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
  height: 100%;
`;

const Glow = styled.div`
  position: absolute;
  top: 25px;
  bottom: 0;
  background: radial-gradient(
    72.04% 72.04% at 50% 10.99%,
    #5392ff 0%,
    rgba(166, 151, 255, 0) 100%
  );
  filter: blur(60px);

  max-width: 420px;
  width: 100%;
  height: 100%;
`;

const ChainGlow = styled.div`
  position: absolute;
  top: -400px;
  bottom: 0;
  background: ${(props: any) =>
    `radial-gradient(92.04% 92.04% at 50% 0%, ${props.colour} 0%, rgba(166, 151, 255, 0) 100%)`};
  filter: blur(70px);
  opacity: 0.95;
  max-width: 1250px;
  width: 100%;
  height: 100%;
`;
interface DefaultLayoutProps {
  children: React.ReactNode;
}

function DefaultLayout({ children }: DefaultLayoutProps) {
  const [showAccount, setShowAccount] = useState<boolean>(false);
  const [chainColour, setChainColour] = useState<string | null>(null);
  const { toggleWalletModal } = useAuth();
  const { loading } = useGlobalState()
  const { chainId } = useWeb3React();
  const { pathname } = useRouter();
  const toggleAccoundDetailsModal = (): void => setShowAccount(!showAccount);

  useEffect(() => {
    if (!chainId) return;
    const colour = chainsColors[ChainIdToRenChain[chainId]!];
    setChainColour(colour.primary);
  }, [chainId]);


  return (
    <>
      {loading ? (
        <AppLoader />
      ) : (
        <div className="flex h-screen flex-col items-center text-white  lg:h-auto lg:min-h-screen">
          {pathname === "/home" && (
            <>
              <Gradient isDarkMode={true} />
              <GlowContainer>
                <Glow />
              </GlowContainer>
            </>
          )}
          <ChainGlow colour={chainColour ? chainColour : "transparent"} />
          <AccountVerificationModal />
          <AccountDetailsModal
            toggleAccoundDetailsModal={toggleAccoundDetailsModal}
            showAccount={showAccount}
          />
          <Navbar
            toggleWalletModal={toggleWalletModal}
            toggleAccoundDetailsModal={toggleAccoundDetailsModal}
          />
          <BottomNavBar />
          <WalletConnect toggleWalletModal={toggleWalletModal} />

          <div
            id="layout"
            className={`bg-black-900 coingrid-scrollbar relative z-50 w-full flex-1 items-center overflow-x-hidden overflow-y-scroll rounded-t-[40px]  pb-2 pt-6 sm:p-8   md:rounded-[40px] md:p-10 lg:mb-6 lg:overflow-y-auto`}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
}


export default DefaultLayout;
