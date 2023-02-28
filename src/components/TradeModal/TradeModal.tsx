import React, { useState, useEffect } from "react";
import styled from "styled-components";
import EthereumLogo from "../../../public/svgs/assets/renETH.svg";
import { Settings, ChevronDown } from "react-feather";
// import UniswapLogoPink from "../../../public/svgs/";
// import UniswapLogo from "../../../public/svgs/assets/uniswapPink.svg";
import { UilAngleDown } from '@iconscout/react-unicons';

export const TokenAmountWrapper = styled.div`
  // width: 100%;
  height: ${(props: any) => props.height};
  background: rgb(34, 53, 83);
  border: 1.5px solid rgb(27, 32, 52);
  border-radius: 15px;
  margin-top: ${(props: any) => props.marginTop};
  padding-left: 15px;
  padding-right: 20px;

  &:hover {
    border: 1.2px solid rgb(61, 70, 87);
  }
`;

export const TokenAmount = styled.div`
  font-family: "Open Sans", sans-serif;
  height: 100%;
  font-size: ${(props: any) => props.size};
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  float: ${(props: any) => props.float};
  color: White;
  line-height: ${(props: any) => props.lineHeight};
  margin-left: 5px;
`;

export const ImgWrapper = styled.div`
  padding-top: ${(props: any) => props.padding};
  padding-bottom: ${(props: any) => props.paddingBottom};
  display: flex;
  align-items: center;
  justify-content: center;
  float: ${(props: any) => props.float};
`;

export const ErrorText = styled.div`
  position: absolute;
  left: 10.5%;
  top: 5%;
  color: #adadad;
  font-size: 18px;
`;

export const CloseIcon = styled(Settings)`
  position: absolute;
  left: 91%;
  top: 5%;
  cursor: pointer;
  color: White;
  width: 20px;
  color: #adadad;
`;

export const UniswapIcon = styled.img`
  position: absolute;
  left: 4%;
  top: 4%;
  cursor: pointer;
  color: White;
  width: 23px;
  color: #adadad;
`;

export const ArrowDownContainer = styled.div`
  position: absolute;
  top: ${(props: any) => (props.swapState === true ? "45%" : "36.5%")};
  left: 45%;
  // color: White;
  background: White;
  background-color: rgb(27, 32, 52);
  border: 5px solid rgb(34, 53, 83);
  border-radius: 10px;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
  }
`;

export const Button = styled.div`
  height: 55px;
  width: 100%;
  background: rgb(34, 53, 83);
  border-radius: 20px;
  text-align: center;
  line-height: 55px;
  font-size: 18px;
  color: rgb(67, 92, 112);
  margin-bottom: 5px;

  &:hover {
    cursor: pointer;
    background: rgb(13, 94, 209);
    color: white;
  }
`;

export const ButtonWrapper = styled.div`
  font-family: "Open Sans", sans-serif;
  margin-top: 30px;
  margin-bottom: 10px;
  height: 30px;
  // margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const DisclaimerContainer = styled.div`

    font-family: 'Open Sans', sans-serif;
    margin-top: 70px;
    width: 100%;
    height: 30px;
    font-size: 15px;
    // background: White;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #adadad;
    font-weight: bold;
`;

export const InfoWrapper = styled.div`
  display: flex;
  padding: 1rem 0;
  justify-content: space-between;
  flex-flow: row nowrap;
  align-items: center;
  // background: white;
`;

export const TokenInput = styled.input`
  font-family: "Inter custom", sans-serif;
  width: 100%;
  background: transparent;
  border: none;
  font-size: 30px;
  color: #adadad;
  outline: none;
`;

export const TokenSelectButton = styled.div`
  font-family: "Open Sans", sans-serif;
  display: flex;
  align-items: center;
  background: ${(props: any) => props.color};
  color: rgb(255, 255, 255);
  cursor: pointer;
  border-radius: 16px;
  box-shadow: rgb(0 0 0 / 8%) 0px 6px 10px;
  outline: none;
  user-select: none;
  border: none;
  font-size: 24px;
  font-weight: 500;
  height: 2.4rem;
  // width: 100%;
  // width: 100%;
  padding: 0px 8px;
  -webkit-box-pack: justify;
  justify-content: space-between;
  margin-left: 12px;
  visibility: visible;
`;
export const SelectedTokenContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 0px;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: start;
  justify-content: flex-start;
`;

export const TokenImg = styled.img`
  width: 24px;
  height: 24px;
  background: radial-gradient(
    white 50%,
    rgba(255, 255, 255, 0) calc(75% + 1px),
    rgba(255, 255, 255, 0) 100%
  );
  border-radius: 50%;
  box-shadow: white 0px 0px 1px;
  border: 0px solid rgba(255, 255, 255, 0);
  margin-right: 5px;
`;

export const SelectedToken = styled.span`
display: flex;
  margin: 0px 0.25rem;
  font-size: 18px;
`;

export const ChevronDownImg = styled.img`
  margin: 0px 0.25rem 0px 0.35rem;
  height: 35%;
`;

export const ButtonContents = styled.span`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  width: 100%;
`;

export const BridgeModalContainer = styled.div`
  max-width: 480px;
  color: White;
  background-color: rgb(15, 25, 55);
  text-align: right;
  padding: 12px 12px;
  border: 1px solid rgb(57, 62, 82);
  border-radius: 20px;
  box-shadow: 0px 10px 150px 5px rgba(75, 135, 220, 0.03);
  margin: 30px auto 0;
  transition: height 3s ease-out;
  position: relative;;
`;

const DexModal = () => {
  const [swapState, setSwapState] = useState(true);
  const toggleSwapState = () => setSwapState(!swapState);
  const close = () => {}

  useEffect(() => {
    if (!localStorage.getItem("provider")) window.location.href = "/";
  }, []);

  return (
    <div className="mt-[60px] mb-[40px]">
      <BridgeModalContainer>
        {/* <UniswapLogoPink /> */}
        <ErrorText>Swap</ErrorText>
        <CloseIcon></CloseIcon>
        <ArrowDownContainer onClick={toggleSwapState} swapState={swapState}>
          <UilAngleDown className={"h-6 w-6"} />
        </ArrowDownContainer>
        <TokenAmountWrapper
          height={swapState === true ? "100px" : "70px"}
          marginTop={"25px"}
          marginBottom={"0px"}
          borderTrue={true}
        >
          <InfoWrapper>
            <TokenInput placeholder={"0.0"}></TokenInput>
            <TokenSelectButton
              color={swapState === true ? "rgb(57,62,82)" : "rgb(13,94,209)"}
              onClick={close}
            >
              <ButtonContents>
                {swapState === true ? (
                  <div className="flex-fro items0center jutsify-center gap` break-words` flex">
                    <TokenImg src={EthereumLogo} alt="#"></TokenImg>
                    <SelectedToken initialWidth={true}>ETH</SelectedToken>
                  </div>
                ) : (
                  <div className="flex-fro items0center jutsify-center gap` break-words` flex">
                    <SelectedToken initialWidth={false}>
                      Select a token
                    </SelectedToken>
                  </div>
                )}
                
                  <ChevronDown size={"25px"}></ChevronDown>
                
              </ButtonContents>
            </TokenSelectButton>
          </InfoWrapper>
        </TokenAmountWrapper>
        <TokenAmountWrapper
          height={swapState === false ? "100px" : "70px"}
          marginTop={"7px"}
          marginBottom={"0px"}
          borderTrue={false}
        >
          <InfoWrapper>
            <TokenInput placeholder={"0.0"}></TokenInput>
            <TokenSelectButton
              color={swapState === false ? "rgb(57,62,82)" : "rgb(13,94,209)"}
              onClick={close}
            >
              <ButtonContents>
                {swapState === false ? (
                  <SelectedTokenContainer>
                    <EthereumLogo />
                    <SelectedToken initialWidth={true}>ETH</SelectedToken>
                  </SelectedTokenContainer>
                ) : (
                  <SelectedTokenContainer>
                    <SelectedToken initialWidth={false}>Select</SelectedToken>
                  </SelectedTokenContainer>
                )}
                <ChevronDown size={"25px"}></ChevronDown>
              </ButtonContents>
            </TokenSelectButton>
          </InfoWrapper>
        </TokenAmountWrapper>
        <ButtonWrapper>
          <Button>Enter An Amount</Button>
        </ButtonWrapper>
      </BridgeModalContainer>
    </div>
  );
};

export default DexModal;
