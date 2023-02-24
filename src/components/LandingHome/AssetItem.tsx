import React from "react";
import styled from "styled-components";
import { supportedAssets, WhiteListedLegacyAssets, assetsBaseConfig } from '../../utils/assetsConfig';
import { chainsBaseConfig, EVMChains, LeacyChains } from '../../utils/chainsConfig';
import { Icon } from "../Icons/AssetLogs/Icon";

export const CurrencyItemContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: -webkit-match-parent;
  list-style-type: none;
  padding-left: ${(props: any) => props.marginL};
  padding-right: ${(props: any) => props.marginR};

  @media (max-width: 630px) {
    width: 100px;
  }
`;
export const CurrencyItemWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  text-align: -webkit-match-parent;
  list-style-type: none;
`;
export const CurrencyLogoContainer = styled.div`
  height: 66px;
  width: 70px;
  font-size: 66px;
  line-height: 1;
  text-align: -webkit-match-parent;
  list-style-type: none;
`;

export const CurrencyTitle = styled.p`
  color: #adadad;
  font-size: 14px;
  margin-top: 12px;
  text-align: left;
  font-family: SuisseIntl, Helvetica, Arial, sans-serif;
  font-weight: 400;
  line-height: 1.5;
  margin: 0;
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
`;

const getOptions = (mode: any) => {
  const options =
    mode === "chain"
      ? Object.values(chainsBaseConfig)
      : Object.values(assetsBaseConfig);
  return options as any;
};

const createAvailabilityFilter = (available: any, walletAssetType: string) => (option: any) => {
  if (!available) {
    return true;
  }
   return walletAssetType === "chain"
     ? (available).includes(option.fullName)
     : (available).includes(option.Icon);
};

const AssetItem = ({ assetType, type }: any) => {
  const available =
    assetType === "currency"
      ? supportedAssets
      : [...EVMChains, ...LeacyChains];

  const LegacyavailabilityFilter = React.useMemo(
    () => createAvailabilityFilter(available, "chain"),
    [available]
  );

  const EvmavailabilityFilter = React.useMemo(
    () => createAvailabilityFilter(supportedAssets, "currency"),
    []
  );


return (
    
  <>
    {getOptions(assetType).filter(
        type === "LEGACY" ? LegacyavailabilityFilter : EvmavailabilityFilter
      )
      .map((option: any, index: any) => {
        if (option.Icon === "Terra") return
        // if (option.Icon === "ROOK" || option.Icon === "GLMR" || option.Icon === "EURT" || option.icon === "DAI") return
        return (
          <div
            key={index}
            className="flex flex-col items-center justify-center gap-2 mx-4 p-4 min-w-[90px]"
          >
            <Icon chainName={option.Icon} className="h-16 w-16"/>
            <span>{option.shortName}</span>
          </div>
        );
      })}
    {/* <CurrencyItemContainer
      marginL={type === "EVM" ? "6px" : "0px"}
      marginR={type === "EVM" ? "6px" : "0px"}
    > */}
      {/* <CurrencyItemWrapper>
        <CurrencyLogoContainer>
          <CurrencyLogo src={Grey} effect="blur"></CurrencyLogo>
        </CurrencyLogoContainer>
        <CurrencyTitle>+ More soon</CurrencyTitle>
      </CurrencyItemWrapper>
    </CurrencyItemContainer> */}
  </>
);
};

export default AssetItem;
