import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { Copy } from "react-feather";
import { TopRowNavigation } from "../../WalletConnectModal/WalletConnectModal";
import { Icon } from "../../Icons/AssetLogs/Icon";
import { assetsBaseConfig } from "../../../utils/assetsConfig";
import PrimaryButton from "../../PrimaryButton/PrimaryButton";
import { Gateway } from "@renproject/ren";
import { useWeb3React } from '@web3-react/core';
import { useTransactionFlow } from "../../../context/useTransactionFlowState";
import { BridgeAssets } from "../../../constants/deployments";
import { Ethereum } from "@renproject/chains";

export const GatewaySection = styled.div`
  padding-bottom: 10px;
  padding-left: 15px;
  padding-right: 15px;
`;

export const GatewaySectionWrapper = styled.div`
  position: relative;
  display: block;
`;

export const Spacer = styled.hr`
  position: absolute;
  border: none;
  width: 100%;
  height: 1px;
  left: 0;
  flex-shrink: 0;
  background-color: rgb(47, 52, 72);
`;

export const FeeDetailsTextContainer = styled.div`
  display: flex;
  font-size: 13px;
  margin-bottom: 8px;
  justify-content: space-between;
`;

export const FeeDetailsTextWrapper = styled.div`
  color: #737478;
  max-width: 50%;
  flex-shrink: 0;
  display: block;
  font-size: 15px;
`;
export const FeeDetailsAssetConatiner = styled.div`
  color: #000;
  overflow: hidden;
  flex-grow: 1;
  text-align: right;
  font-size: 13px;
  display: block;
`;
export const FeeDetailsAssetText = styled.span`
  white-space: nowrap;
  color: #000;
  overflow: hidden;
  flex-grow: 1;
  text-align: right;
  font-size: 15px;
  color: #adadad;
  font-family: SuisseIntl, Helvetica, Arial, sans-serif;
`;

export const ChainSelectorIconWrapper = styled.div`
  height: 20px;
  width: 20px;
  display: flex;
  justify-content: right;
  align-items: right;
`;

export const DetailsSection = styled.div`
    background-color: rgb(43 49 102);
    border: 1px solid rgb(47, 52, 72);
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 5px;
    padding-bottom: 5px;
    border-radius: 15px;
    margin-top: 45px;
    margin-bottom: 10px;
`;
export const FeesSection = styled.div`
  padding-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
`;

const ConfirmationStep = ({
    close,
    gateway,
    transactionType
}: {
    close: (w: any) => void;
    gateway: Gateway<any, any> | null;
    transactionType: string;
}) => {
    const { account } = useWeb3React();
    const { toggleConfirmationModal } = useTransactionFlow();
    const [asset, setAsset] = useState(assetsBaseConfig.BTC);

    const execute = useCallback(() => {
        toggleConfirmationModal();
    }, [toggleConfirmationModal]);

    const bridgeAddr = BridgeAssets[Ethereum.chain]["aUSDT"]?.bridgeAddress
    return (
        <div className="px-[18px] py-[12px]">
            <TopRowNavigation
                isRightDisplay={true}
                isLeftDisplay={true}
                title={'Astral Gateway'}
                close={close as any}
            />
            <GatewaySection>
                <GatewaySectionWrapper>
                    <div className="mt-5 mb-4 flex flex-col items-center justify-center gap-2">
                        <Icon
                            chainName={'ASTRAL_USDT'}
                            className={'h-24 w-24'}
                        />
                    </div>
                    <div className="flex flex-col items-center justify-center text-[25px]">
                        {transactionType === 'Mint' ? (
                            <span>Mint aUSDT to</span>
                        ) : (
                            <span>Release USDT to</span>
                        )}
                    </div>
                    <div className="flex flex-col items-center justify-center text-[15px] leading-none text-gray-500">
                        <span>Minimum amount: 0.000128 BTC</span>
                    </div>

                    {/* <div className="my-3 mt-5 flex flex-row items-center justify-center gap-2">
            <div className="max-w-[82%] rounded-full border-tertiary bg-secondary px-4 py-2">
              <div className="overflow-hidden text-[16px] text-blue-600">
                {gateway?.gatewayAddress}
              </div>
            </div>
            <div className="flex items-center justify-center rounded-full border-tertiary bg-secondary px-2 py-2">
              <Copy className="h-6 w-6" />
            </div>
          </div> */}
                </GatewaySectionWrapper>
            </GatewaySection>
            <div className="mx-2 mb-4 flex flex-col rounded-xl bg-secondary">
                <div className=" mt-6 flex w-full flex-row items-center justify-center gap-2">
                    <div className="flex w-[90%] gap-2 rounded-full border-[rgb(48,63,88)] bg-darkBackground px-4 py-2">
                        <div className="flex w-full items-center justify-center gap-2 overflow-hidden text-[16px] text-gray-500">
                            Recipient Address:
                            <div className="overflow-hidden text-[14px] text-blue-600">
                                {`${account?.substring(
                                    0,
                                    8
                                )}...${account?.substring(
                                    account?.length - 8,
                                    account?.length
                                )}`}
                            </div>
                        </div>
                        <div className="flex items-center justify-center rounded-full border-[rgb(48,63,88)] bg-secondary px-1 py-1">
                            <Copy className="h-4 w-4" />
                        </div>
                    </div>
                </div>
                <div className=" mt-2 mb-4 flex flex-row items-center justify-center gap-2">
                    <div className="flex w-[90%] gap-2 rounded-full border-[rgb(48,63,88)] bg-darkBackground px-4 py-2">
                        <div className="flex w-full items-center justify-center gap-2 overflow-hidden text-[16px] text-gray-500">
                            Bridge Address:
                            <div className="overflow-hidden text-[14px] text-blue-600">
                                {`${bridgeAddr?.substring(
                                    0,
                                    8
                                )}...${bridgeAddr?.substring(
                                    bridgeAddr?.length - 8,
                                    bridgeAddr?.length
                                )}`}
                            </div>
                        </div>
                        <div className="flex items-center justify-center rounded-full border-[rgb(48,63,88)] bg-secondary px-1 py-1">
                            <Copy className="h-4 w-4" />
                        </div>
                    </div>
                </div>

                <div className="mt-1 mb-5 flex items-center justify-center px-5">
                    <PrimaryButton
                        className={`x-50 w-full justify-center rounded-2xl border border-blue-600 bg-blue-500 py-[14px] text-center text-[17px] font-semibold hover:cursor-pointer`}
                        onClick={execute}
                    >
                        {transactionType === 'Mint' ? (
                            <span>Mint</span>
                        ) : (
                            <span>Release</span>
                        )}
                    </PrimaryButton>
                </div>
            </div>

            <Spacer />
            <FeesSection>
                <DetailsSection>
                    <FeeDetailsTextContainer>
                        <FeeDetailsTextWrapper>RenVM Fee</FeeDetailsTextWrapper>
                        <FeeDetailsAssetConatiner>
                            <FeeDetailsAssetText>3.00%</FeeDetailsAssetText>
                        </FeeDetailsAssetConatiner>
                    </FeeDetailsTextContainer>
                    <FeeDetailsTextContainer>
                        <FeeDetailsTextWrapper>
                            EVM Miner Fee
                        </FeeDetailsTextWrapper>
                        <FeeDetailsAssetConatiner>
                            <FeeDetailsAssetText>
                                0.000064 ETH ($2.86)
                            </FeeDetailsAssetText>
                        </FeeDetailsAssetConatiner>
                    </FeeDetailsTextContainer>
                    <FeeDetailsTextContainer>
                        <FeeDetailsTextWrapper>
                            Esti. ETH Fee
                        </FeeDetailsTextWrapper>
                        <FeeDetailsAssetConatiner>
                            <FeeDetailsAssetText>
                                0.0058 ETH ($18.5332)
                            </FeeDetailsAssetText>
                        </FeeDetailsAssetConatiner>
                    </FeeDetailsTextContainer>
                    <FeeDetailsTextContainer>
                        <FeeDetailsTextWrapper>
                            Recipient Address
                        </FeeDetailsTextWrapper>
                        <FeeDetailsAssetConatiner>
                            <FeeDetailsAssetText>
                                0x4a013...a90Da9D8B
                            </FeeDetailsAssetText>
                        </FeeDetailsAssetConatiner>
                    </FeeDetailsTextContainer>
                </DetailsSection>
            </FeesSection>

            {/* <div className="p-5">
        {transactions
          // .filter((confirmingTx: GatewayTransaction) => {
          //   return confirmingTx.in.progress.status === "confirming";
          // })
          .map((transaction: GatewayTransaction, index: number) => {
           return (
                <ChainTx
                  key={index}
                  transaction={transaction}
                />
              );
          })}
      </div> */}
        </div>
    );
};

export default ConfirmationStep;
