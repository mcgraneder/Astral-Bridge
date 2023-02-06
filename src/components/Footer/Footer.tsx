import React, { useEffect } from "react";
import styled from "styled-components";
import { NavContainer, NavWrapper, NavMenu, NavItem, NavButton, NavButton2, NavItem2, NavMenu2, NavButton2Container } from "../CSS/FooterStyles";
import TwitterIcon from "../../../public/twitter.png";
import GithubIcon from "../../../public/github.png";
import discordIcon from "../../../public/discordIcon.png";
import { useWeb3React } from "@web3-react/core";

export const GreenCircle = styled.div`
    height: 7px;
    width: 7px;
    border-radius: 50%;
    background: rgb(14, 209, 69);
`;
export default function Footer({ visible }: { visible: boolean}) {
    const { library, chainId } = useWeb3React();
    const [blockNumber, setBlockNumber] = React.useState();

    useEffect(() => {
        if (library) {
            let stale = false;
            library
                .getBlockNumber()
                .then((blockNumber) => {
                    if (!stale) {
                        setBlockNumber(blockNumber);
                    }
                })
                .catch(() => {
                    if (!stale) {
                        setBlockNumber(null);
                    }
                });

            const updateBlockNumber = (blockNumber) => {
                setBlockNumber(blockNumber);
            };
            library.on("block", updateBlockNumber);

            return () => {
                library.removeListener("block", updateBlockNumber);
                stale = true;
                setBlockNumber(undefined);
            };
        }
    }, [library, chainId]);

    return (
        <div>
            <NavContainer>
                <NavWrapper>
                    <NavMenu visible={visible}>
                        <NavItem marginL={"60px"}>
                            <NavButton to='/'>About</NavButton>
                            <NavButton to='/wallet'>Docs</NavButton>
                            <NavButton to='/transactions'>FAQS</NavButton>
                            <NavButton to='/transactions'>Wiki</NavButton>
                        </NavItem>
                    </NavMenu>
                    <NavMenu visible={visible}>
                        <NavItem marginL={"0px"} style={{ position: "absolute", left: "93.5%" }}>
                            {library && <GreenCircle></GreenCircle>}
                            <NavButton style={{ color: "rgb(35,100,66)", fontSize: "13px" }} to='/' color={"colour"}>
                                {blockNumber}
                            </NavButton>
                        </NavItem>
                    </NavMenu>
                    <NavMenu2 visible={visible}>
                        <NavItem2>
                            <NavButton2Container>
                                <NavButton2 src={TwitterIcon}></NavButton2>
                            </NavButton2Container>
                            <NavButton2Container>
                                <NavButton2 src={GithubIcon}></NavButton2>
                            </NavButton2Container>
                            <NavButton2Container>
                                <NavButton2 src={discordIcon}></NavButton2>
                            </NavButton2Container>
                            {/* <NavButton2Container>
                                <NavButton2 src={telegramIcon}></NavButton2>
                            </NavButton2Container> */}
                        </NavItem2>
                    </NavMenu2>
                </NavWrapper>
            </NavContainer>
        </div>
    );
}
