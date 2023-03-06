import React from "react";
import styled from "styled-components";
import { useViewport } from '../../hooks/useViewport';
import { Breakpoints } from '../../constants/Breakpoints';
import NetworkWarning from "../NetworkWarning/NetworkWarning";
import Identicon from "../Identicon/Identicon";
import Github from "../../../public/svgs/github.svg"
import LinkedIn from "../../../public/svgs/linkedin.svg";
import Image from "next/image";

export const Wrapper = styled.div`
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
    -webkit-box-pack: justify;
    justify-content: space-between;
    position: fixed;
    bottom: 0px;
    z-index: 1000;
    /* background: black; */
`;

export const Nav = styled.nav`
    padding: 20px 12px;
    width: 100%;
    height: 60px;
    z-index: 2;
    box-sizing: border-box;
    display: block;
    overflow: hidden;
    background: ${(props: any) => props.backgroundColor};
`;

export const Box = styled.div`
    box-sizing: border-box;
    vertical-align: initial;
    -webkit-tap-highlight-color: transparent;
    display: flex;
    flex-wrap: nowrap;
    height: 100%;
    overflow: hidden;
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
    overflow: hidden;
`;


const ROUTES: string[] = ["Bridge", "Wallet", "Trade", "History"];

const NavLinks = ({ routes }: { routes: string[] }) => {
    return (
        <>
            {routes.map((route: string) => {
                return (
                    <div key={route} className='flex md:hidden flex-row items-center gap-2'>
                        <span className='my-2 w-full rounded-xl px-4 py-2 text-center hover:cursor-pointer hover:bg-black hover:bg-opacity-20'>{route}</span>
                    </div>
                );
            })}
        </>
    );
};
export const BottomNavBar = () => {
    const { width } = useViewport()
    return (
      <Wrapper>
        <Nav>
          <Box>
            <BoxItemContainer
              allignment={"flex-start"}
              backgroundColor={width >= 1000 ? "rgb(15,26,58)" : "transparent"}
            >
              {width >= 800 && (
                <div className="flex items-center justify-center gap-2 px-4">
                  <Identicon />
                  <span className="mr-6 text-gray-500">
                    Created by Evan McGrane
                  </span>
                  <div className="flex items-center gap-2 hover:cursor-pointer">
                    <Github className={"text-white"} />

                    <a
                      className=" text-gray-500 no-underline hover:text-gray-400"
                      rel="noopener noreferrer"
                      href="https://github.com/mcgraneder"
                      target={"_blank"}
                    >
                      Github
                    </a>
                  </div>
                </div>
              )}
            </BoxItemContainer>
            <BoxItemContainer
              allignment={"flex-end"}
              backgroundColor={width >= 1000 ? "rgb(15,26,58)" : "transparent"}
            >
              <NetworkWarning />
            </BoxItemContainer>
          </Box>
        </Nav>
      </Wrapper>
    );
};

export default BottomNavBar;
