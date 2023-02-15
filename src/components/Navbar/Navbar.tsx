import React, { useState, useEffect, use } from "react";
import styled from "styled-components";
import LogoIcon from "../../../public/svgs/assets/RenIconHome.svg";
import EthereumIcon from "../../../public/svgs/chains/ethereum.svg";
import { UilSearch } from '@iconscout/react-unicons';
import { UilSpinner, UilAngleDown } from "@iconscout/react-unicons";
import { useWeb3React } from "@web3-react/core";
import { shortenAddress } from "../../utils/misc";
import { walletIcon } from "../../connection/wallets";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import TokenSelectDropdown from "./ChainSelector";
import { useViewport } from '../../hooks/useViewport';
import { useRouter } from 'next/router';
import { useGlobalState } from "../../context/useGlobalState";

export const Wrapper = styled.div`
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
    -webkit-box-pack: justify;
    justify-content: space-between;
    position: fixed;
    top: 0px;
    z-index: 100;
    /* background: black; */
`;

export const Nav = styled.nav`
    padding: 20px 12px;
    width: 100%;
    height: 72px;
    z-index: 2;
    box-sizing: border-box;
    display: block;
`;

export const Box = styled.div`
    box-sizing: border-box;
    vertical-align: initial;
    -webkit-tap-highlight-color: transparent;
    display: flex;
    flex-wrap: nowrap;
    height: 100%;
`;

export const BoxItemContainer = styled.div`
    box-sizing: border-box;
    vertical-align: initial;
    -webkit-tap-highlight-color: transparent;
    justify-content: ${(props: any) => props.allignment};
    display: flex;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0;
    width: 100%;
    align-items: center;
`;

interface INavbar {
    toggleWalletModal: () => void;
    toggleAccoundDetailsModal: () => void;

}

const ROUTES: string[] = ["Bridge", "Wallet", "Trade", "History"];

const NavLinks = ({ routes }: { routes: string[] }) => {
    return (
        <>
            {routes.map((route: string) => {
                return (
                    <div key={route} className='hidden md:flex flex-row items-center gap-2'>
                        <span className='my-2 w-full rounded-xl px-4 py-2 text-center hover:cursor-pointer hover:bg-black hover:bg-opacity-20'>{route}</span>
                    </div>
                );
            })}
        </>
    );
};
export const Navbar = ({ toggleWalletModal, toggleAccoundDetailsModal }: INavbar) => {
    const [provider, setProvider] = useState<any>(undefined);
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState<string>("");
    const { account, active } = useWeb3React();
    const { width } = useViewport();
    const { pendingTransaction } = useGlobalState()
    const activePath = router.pathname;

    useEffect(() => {
        if (typeof window == "undefined" || !active) return;
        const provider = localStorage.getItem("provider");
        setProvider(provider);
    }, [active]);

    const Icon = provider ? walletIcon[provider] : undefined;
    return (
      <Wrapper>
        <Nav>
          <Box>
            <BoxItemContainer allignment={"flex-start"}>
              <div className="mr-5 flex h-full">
                <LogoIcon />
              </div>
              {activePath !== "/home" && <NavLinks routes={ROUTES} />}
            </BoxItemContainer>
            {activePath !== "/home" && (
              <BoxItemContainer allignment={"flex-end"}>
                <div className="mr-4 flex h-[45px] w-fit max-w-[90%] items-center justify-center rounded-lg border border-transparent bg-black bg-opacity-10 px-2 lg:w-full lg:border-gray-500">
                  <UilSearch className="text-grey-400 mr-2 h-6 w-6" />
                  {width >= 1000 && (
                    <input
                      value={searchTerm}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        () =>
                          setSearchTerm(e.target.value)}
                      className="placeholder:text-grey-400 flex-1 bg-transparent  text-[15px] font-medium tracking-wide outline-none"
                      placeholder={"Search for tokens or transactions"}
                    />
                  )}
                </div>
              </BoxItemContainer>
            )}
            <BoxItemContainer allignment={"flex-end"}>
              {activePath !== "/home" && (
                <div className="mr-5 flex  h-full">
                  <TokenSelectDropdown />
                </div>
              )}
              <div className="mr-5 flex  h-full items-center">
                <PrimaryButton
                  className="mt-[2px] bg-blue-500 py-[6px] hover:bg-blue-600"
                  onClick={
                    !active ? toggleWalletModal : toggleAccoundDetailsModal
                  }
                >
                  {pendingTransaction ? (
                    <>
                      <UilSpinner
                       
                        className={" h-6 w-6 animate-spin text-white"}
                      />
                      <span className="mr-2 hidden xs:block">
                        {"1 Pending"}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="mr-2 hidden xs:block">
                        {active ? shortenAddress(account) : "Connect"}
                      </span>
                      <span className="mr-2 hidden xs:block">|</span>
                      {active && Icon ? (
                        <Icon className={"h-5 w-5"} />
                      ) : (
                        <UilAngleDown className={"h-5 w-5"} />
                      )}
                    </>
                  )}
                </PrimaryButton>
              </div>
            </BoxItemContainer>
          </Box>
        </Nav>
      </Wrapper>
    );
};

export default Navbar;
