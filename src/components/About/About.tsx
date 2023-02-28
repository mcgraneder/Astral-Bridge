import React from "react"
import styled from "styled-components"
// import RenLogo1 from "../assets/icons/ren-logo-3f.svg"
// import RenLogo4 from "../assets/icons/renvm-logo.svg"
import { ArrowLeft } from "react-feather"
import Link from 'next/link';

export const PageContainer = styled.div`

font-family: SuisseIntl,Helvetica,Arial,sans-serif;
    padding-left: 24px;
    padding-right: 24px;
    width: 100%;
    display: block;
    box-sizing: border-box;
    margin-left: auto;
    margin-right: auto;
`
export const PageWrapper = styled.div`

// margin: 0;
    // box-sizing: border-box;
    // width: 100%;
    // display: flex;
    // flex-wrap: wrap;
`

export const AboutPageContentsConainer = styled.div`

margin-top: -1px;
    min-height: calc(100vh - 137px);
    padding-top: 1px;
    display: block;
`
export const AboutPageContentsWrapper = styled.div`
margin-top: 124px;
width: 100%;
    display: block;
    box-sizing: border-box;
    margin-left: auto;
    margin-right: auto;
    max-width: 600px;
    padding-left: 24px;
    padding-right: 24px;

`

export const Title = styled.h1`

font-size: 27px;
margin-bottom: 15px;
font-family: SuisseIntl,Helvetica,Arial,sans-serif;
    font-weight: bold;
    line-height: 1.2;
    display: block;
    color: White;
`
export const Text = styled.p`

    margin-bottom: 23px;
    font-size: 17px;
    font-family: SuisseIntl,Helvetica,Arial,sans-serif;
    font-weight: 400;
    line-height: 1.5;
    color: #adadad;

    a {
        text-decoration: none;
        color: rgb(13,94,209);
    }

    span {
        text-decoration: none;
        color: orange;
    }
`

export const FooterContainer = styled.div`

display: flex;
    margin-top: 48px;
    align-items: center;
`

export const LeftIconContainer = styled.span`
    display: inline-flex;
    font-size: 50px;
    align-items: center;
    border-right: 2px solid White;
    padding-right: 25px;
`
export const Icon = styled.img`

width: 2.32692em;
font-size: inherit;
fill: currentColor;
    height: 1em;
    display: inline-block;
    transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    flex-shrink: 0;
    user-select: none;
    pointer-events: none;
    overflow: hidden;

`

export const RightIconContainer = styled.span`

    display: inline-flex;
    font-size: 42px;
    align-items: center;
    padding-top: 2px;
    padding-left: 25px;
`

export const HeaderContainer = styled.div`

    display: flex;
    align-items: center;
    padding-bottom: 25px;
    justify-content: space-between;
`
export const BackContainer = styled.div`

    min-width: 72px;
    display: flex;
    justify-content: left;

    &:hover {
        cursor: pointer;
    }
`

export const BackArrow = styled(ArrowLeft)`

    font-size: 1.125rem;
    lex: 0 0 auto;
    color: White;
    margin-right: 8px;

`

export const HeaderText = styled.div`

    width: 100%;
    text-align: center;
    display: flex;
    justify-self: center;
    align-items: center;
    justify-content: center;
    font-size: 17px;
    color: White;
    // line-height: 25px;
`
const About = () => {

    return (
      <PageContainer>
        <AboutPageContentsConainer>
          <AboutPageContentsWrapper>
            <HeaderContainer>
              <Link
                href={"/home"}
                passHref
                className="hover: flex cursor-pointer justify-start"
              >
                <>
                  <BackArrow size={"30px"} />
                  <HeaderText>Back to Home page</HeaderText>
                </>
              </Link>
            </HeaderContainer>
            <Title>What is The Ren Protocol?</Title>
            <Text>
              RenBridge enables the simple wrapping of digital assets on
              different blockchains. For example, RenBridge allows users to take{" "}
              <span>BTC</span> and put it on <a>Ethereum</a>, as an ERC-20
              called renBTC.
            </Text>
            <Title>How does it work?</Title>
            <Text>
              Using RenVM, a universal translator, it converts digital assets to
              the format needed by its destination chain. For example, RenVM
              takes <span>BTC</span>, holds it, and then converts it to an{" "}
              <a>ERC-20</a> with a 1:1 ratio to ensure your renBTC is always
              backed by the same amount of BTC. Find out more here ↗.
            </Text>
            <Title>How Safe is it?</Title>
            <Text>
              RenVM holds on to your assets when they are on other blockchains.
              RenVM is new technology, and <a>security audits ↗</a>{" "}
              <span>{"don't"}</span>
              completely eliminate risks. Please <span>{"don't"}</span> supply
              assets you <span>{"can't"}</span> afford to lose!
            </Text>
          </AboutPageContentsWrapper>
        </AboutPageContentsConainer>
      </PageContainer>
    );
}

export default About