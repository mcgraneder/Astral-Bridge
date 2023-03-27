import React from "react";
import styled from "styled-components";
import AssetItem from "./AssetItem";
import { motion } from 'framer-motion';
import { fadeIn } from '../../utils/fadeIn.';

export const SupportedAssetsContainer = styled.div`
    max-width: ${(props: any) => props.maxWidth};
    // width: 100%;
    display: flex;
    box-sizing: border-box;
    margin-left: auto;
    margin-right: auto;
    overflow-x: hidden;
    overflow-y: hidden;

    z-index: 1000000;

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
  overflow-y: hidden;
  overflow-x: hidden;
  margin-top: 10px;
  z-index: -1000;

  @media (max-width: 690px) {
    display: block;
  }
`;

export const CurrencysContainer = styled.div`
  flex-grow: 5;
  border-right: ${(props: any) => (props.border ? "2px solid #c1c2c4" : "none")};
  padding-right: ${(props: any) => props.paddingR};
  padding-left: ${(props: any) => props.paddingL};
  display: block;
  // max-width: 430px;

  @media (max-width: 690px) {
    border: none;
    padding: 0;
  }
  z-index: 9999999999;
`;

export const CurrenciesHeader = styled.h2`
    text-align: center;
    font-weight: bold;
    color: #adadad;
    display: block;
    font-family: SuisseIntl, Helvetica, Arial, sans-serif;
    color: rgb(216, 222, 255);
    font-size: 25px;
    z-index: 99999999999;
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
    z-index: 0;
`;

export const Glow = styled.div`
    position: absolute;
    top: 30%;
    bottom: 0;
    background: radial-gradient(
        72.04% 72.04% at 50% 10.99%,
        #492e6f 0%,
        rgba(166, 151, 255, 0) 100%
    );
    filter: blur(80px);

    max-width: 420px;
    width: 100%;
    height: 65%;
    z-index: 0;
`;

const SupportedAssets = ({ type }: any) => {
 
    return (
        <div className="relative flex gap-6 overflow-x-hidden overflow-y-hidden">
            <GlowContainer>
                <Glow />
            </GlowContainer>
            <SupportedAssetsContainer maxWidth={'100%'}>
                <SupportedAssetsWrapper>
                    <CurrencysContainer
                        paddingR={'0px'}
                        paddingL={'0px'}
                        border={false}
                        className={'overflow-y-hidden'}
                    >
                        <motion.div
                            variants={fadeIn('right', 0.01)}
                            initial="hidden"
                            whileInView={'show'}
                            viewport={{ once: true, amount: 0.7 }}
                        >
                            <CurrenciesHeader>
                                {type === 'LEGACY' ? 'Supported Chains' : 'Supported Assets'}
                            </CurrenciesHeader>
                        </motion.div>
                        <CurrenciesList>
                            <AssetItem
                                assetType={
                                    type === 'LEGACY' ? 'chain' : 'currency'
                                }
                                type={type}
                            />
                        </CurrenciesList>
                    </CurrencysContainer>
                </SupportedAssetsWrapper>
            </SupportedAssetsContainer>
        </div>
    );
  
};

export default SupportedAssets;
