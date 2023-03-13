import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar/Navbar";
import WalletConnect from "../../components/WalletConnectModal/WalletConnectModal";
import { useAuth } from "../../context/useWalletAuth";
import BottomNavBar from "../../components/Navbar/BottomNavBar";
import AccountVerificationModal from "../../components/AccountVerificationModal/AccountVerificationModal";
import styled from "styled-components";
import AccountDetailsModal from "../../components/AccountDetailsModal/AccountDetailsModal";
import { chainsColors } from "../../utils/chainColours";
import { useWeb3React } from "@web3-react/core";
import { ChainIdToRenChain } from "../../connection/chains";
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
  z-index: -100000000000;
  pointer-events: none;
  height: 100%;
`;

export const G = styled.div`
    background: ${(props: any) =>
        props.visible
            ? 'linear-gradient(rgba(7, 8, 22, 0) 0%, rgb(7 8 22 / 100%) 45%)'
            : 'linear-gradient(rgba(7, 8, 22, 0) 40%, rgb(7 8 22 / 100%) 80%)'};
`;

export const GlowContainer = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    bottom: 0;
    width: 100%;
    overflow-y: hidden;
    height: 100%;
    /* color: rgb(56, 52, 107); */
    color: rgb(43, 49, 102);
`;

export const Glow = styled.div`
  position: absolute;
  top: 25px;
  bottom: 0;
  background: radial-gradient(
    72.04% 72.04% at 50% 10.99%,
    #592e96 0%,
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
  const { loading } = useGlobalState();
  const { chainId } = useWeb3React();
  const [showAccount, setShowAccount] = useState<boolean>(false);
  const [chainColour, setChainColour] = useState<string | null>(
    chainId ? chainsColors[ChainIdToRenChain[chainId]!].primary : null
  );
  const { toggleWalletModal } = useAuth();
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
              <G visible={pathname === '/home'}>
                  <div className="flex h-screen flex-col items-center text-white  lg:h-auto lg:min-h-screen">
                      {/* {pathname === '/home' && ( */}
                          <>
                              {/* <Gradient isDarkMode={true} /> */}
                              <GlowContainer>
                                  <Glow />
                              </GlowContainer>
                          </>
                      {/* )} */}
                      <ChainGlow
                          colour={chainColour ? chainColour : 'transparent'}
                      />
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
              </G>
          )}
      </>
  );
}

export default DefaultLayout;
