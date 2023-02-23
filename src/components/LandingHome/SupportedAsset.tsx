import React from "react";
import styled from "styled-components";
import AssetItem from "./AssetItem";

export const SupportedAssetsContainer = styled.div`
  max-width: ${(props) => props.maxWidth};
  // width: 100%;
  display: flex;
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;

  z-index: -1000;

  @media (max-width: 950px) {
    max-width: 800px;
  }

  @media (max-width: 800px) {
    max-width: 650px;
  }
`;

export const SupportedAssetsWrapper = styled.div`
  display: flex;
  // flex-direction: row;
  // justify-content: stretch;
  margin-top: 10px;
  z-index: -1000;

  @media (max-width: 690px) {
    display: block;
  }
`;

export const CurrencysContainer = styled.div`
  flex-grow: 5;
  border-right: ${(props) => (props.border ? "2px solid #c1c2c4" : "none")};
  padding-right: ${(props) => props.paddingR};
  padding-left: ${(props) => props.paddingL};
  display: block;
  // max-width: 430px;

  @media (max-width: 690px) {
    border: none;
    padding: 0;
  }
`;

export const CurrenciesHeader = styled.h2`
  text-align: center;
  font-weight: bold;
  color: #adadad;
  display: block;
  font-family: SuisseIntl, Helvetica, Arial, sans-serif;
  color: White;
  font-size: 25px;
`;

export const CurrenciesList = styled.ul`
  justify-content: space-between;
  margin: 40px auto;
  display: flex;
  flex-wrap: wrap;
  // max-width: 40vw;
  padding: 0;
  list-style-type: none;
`;

const SupportedAssets = ({ type }) => {
  if (type === "LEGACY") {
    return (
      <SupportedAssetsContainer maxWidth={"1050px"}>
        <SupportedAssetsWrapper>
          <CurrencysContainer paddingR={"0px"} paddingL={"0px"} border={false}>
            <CurrenciesHeader>Supported Chains</CurrenciesHeader>
            <CurrenciesList>
              <AssetItem assetType={"chain"} type={type} />
            </CurrenciesList>
          </CurrencysContainer>
        </SupportedAssetsWrapper>
      </SupportedAssetsContainer>
    );
  } else
    return (
      <SupportedAssetsContainer maxWidth={"1200px"}>
        <SupportedAssetsWrapper>
          <CurrencysContainer paddingR={"0px"} paddingL={"0px"}>
            <CurrenciesHeader>Supported Currencies</CurrenciesHeader>
            <CurrenciesList>
              <AssetItem assetType={"currency"} type={type} />
            </CurrenciesList>
          </CurrencysContainer>
        </SupportedAssetsWrapper>
      </SupportedAssetsContainer>
    );
};

export default SupportedAssets;
