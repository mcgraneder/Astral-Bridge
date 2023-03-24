import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { supportedAssets, assetsBaseConfig } from '../../utils/assetsConfig';
import { chainsBaseConfig, EVMChains, LeacyChains } from '../../utils/chainsConfig';
import { Icon } from "../Icons/AssetLogs/Icon";
import { delay, motion } from 'framer-motion';
import { Layout } from 'react-feather';

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
  const available = useCallback(() =>{
    return assetType === "currency"
      ? supportedAssets
      : [...EVMChains, ...LeacyChains]}, [assetType])

  const LegacyavailabilityFilter = React.useMemo(
    () => createAvailabilityFilter(available(), "chain"),
    [available]
  );

  const EvmavailabilityFilter = React.useMemo(
    () => createAvailabilityFilter(supportedAssets, "currency"),
    []
  );

  const [showCard, setShowCard] = useState<boolean>(false)

return (
    <>
        
        {getOptions(assetType)
            .filter(
                type === 'LEGACY'
                    ? LegacyavailabilityFilter
                    : EvmavailabilityFilter
            )
           .map((option: any, index: any) => {
                if (option.Icon === 'Terra') return;
                // if (option.Icon === "ROOK" || option.Icon === "GLMR" || option.Icon === "EURT" || option.icon === "DAI") return
                return (
                    <>
                        <div
                            key={index}
                            className="mx-4 flex min-w-[160px] flex-col items-center justify-center gap-2 p-4 hover:cursor-pointer "
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, amount: 1 }}
                                transition={{
                                    duration: 0.4,
                                    delay: 0 + index / 15,
                                    ease: [0, 0.71, 0.2, 1.01],
                                    // scale: {
                                    //     type: 'spring',
                                    //     damping: 8,
                                    //     stiffness: 120,
                                    //     restDelta: 0.001
                                    // }
                                    //  Layout: { type: "spring"}
                                }}
                                className="flex flex-col gap-2 items-center justify-center"
                            >
                                <Icon
                                    chainName={option.Icon}
                                    className="h-16 w-16"
                                />
                                 <span>{option.shortName}</span>
                            </motion.div>
                        </div>
                    </>
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
