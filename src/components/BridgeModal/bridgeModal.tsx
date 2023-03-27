import React, { useState, useEffect, useCallback } from 'react';
import styled, { css } from 'styled-components';
import ToggleButtonContainer from './components/ToggleButton';
import Dropdown from './components/Dropdown';
import WalletInputForm from './components/WalletInput';
import BalanceDisplay from '../NativeBalanceDisplay/BalanceDisplay';
import { useWeb3React } from '@web3-react/core';
import { ChainIdToRenChain } from '../../connection/chains';
import { useGlobalState } from '../../context/useGlobalState';
import BigNumber from 'bignumber.js';
import FeeData from './components/FeeData';
import BridegButton from '../Buttons/BridgeButton';
import BridgeToggleButton from './components/BridgeToggleButton';
import { Dispatch, SetStateAction } from 'react';
import ConfirmationStep from './steps/GatewayStep';
import { Gateway } from '@renproject/ren';
import {
    WhiteListedLegacyAssets,
    supportedAssets,
    Asset
} from '../../utils/assetsConfig';
import useMarketGasData from '../../hooks/useMarketGasData';
import AssetListModal from './components/AssetListModal';

import {
    LeacyChains,
    EVMChains,
    alphaCHAINs,
    supportedEthereumChains1,
    supportedEthereumChains2
} from '../../utils/chainsConfig';
import { supportedAssets2 } from '../../utils/assetsConfig';

import useAuth from '../../hooks/useAuth';
import { chainsBaseConfig } from '../../utils/chainsConfig';
import API from '../../constants/Api';
import { chainAdresses } from '../../constants/Addresses';
import { useApproval } from '../../hooks/useApproval';
import { ERC20ABI } from '@renproject/chains-ethereum/contracts';
import { ethers } from 'ethers';
import useEcecuteTransaction from '../../hooks/useExecuteTransaction';
import { get } from '../../services/axios';
import { WarningPopup } from '../NetworkWarning/NetworkWarning';

export type Tab = {
    tabName: string;
    tabNumber: number;
    side: string;
    contractFunc?: any;
};

const BRIDGE_TABS: Tab[] = [
    {
        tabName: 'Mint',
        tabNumber: 0,
        side: 'left'
    },
    {
        tabName: 'Release',
        tabNumber: 1,
        side: 'right'
    }
];

const TABS: Tab[] = [
    {
        tabName: 'Bridge',
        tabNumber: 0,
        side: 'left'
    },
    {
        tabName: 'Release',
        tabNumber: 1,
        side: 'right'
    }
];
export const BridgeModalContainer = styled.div`
    max-width: 480px;
    color: White;
    background-color: rgb(13, 17, 28);
    text-align: right;
    /* padding: 12px 18px; */
    border: 1px solid rgb(60, 65, 80); //rgb(60, 65, 80)
    border-radius: 20px;
    box-shadow: 0px 10px 150px 5px rgba(75, 135, 220, 0.03);
    margin: 30px auto 0;
    position: relative;
    transition: height 3s ease-out;
`;

export const MintFormContainer = styled.div`
    margin-top: 10px;
    padding-bottom: 20px;
    margin-bottom: 10px;
    background: rgb(36, 39, 54);
    border: 1px solid rgb(34, 43, 68);
    border-radius: 10px;
`;

export const MinFormToggleButtonContainer = styled.div`
    height: 40px;
    display: flex;
    margin-bottom: 25px;
    background: rgb(13, 17, 28);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;

    &:hover {
        background: rgb(34, 43, 68);
    }
`;

export const InfoContainer = styled.div`
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 10px;
    height: ${(props: any) => (props.visible ? '87px' : '0px')};
    transition: height 0.25s ease-in;
    background: rgb(13, 17, 28);
    border-radius: 10px;

    ${(props: any) =>
        props.visible &&
        css`
            border: 1px solid rgb(57, 75, 105);
        `}
`;

export const DropdownWrapper = styled.div`
    height: ${(props: any) => (props.isVisible ? '130px' : '85px')};
    transition: height 0.2s ease;
`;

interface IWalletModal {
    asset: any;
    text: string;
    setText: any;
    buttonState: Tab;
    setButtonState: Dispatch<SetStateAction<Tab>>;
    bridgeState: Tab;
    setBridgeState: Dispatch<SetStateAction<Tab>>;
    gateway: Gateway<any, any> | null;
    setAsset: any;
}
type AssetType = 'chain' | 'currency';

const BridgeModal = ({
    asset,
    text,
    setText,
    buttonState,
    setButtonState,
    bridgeState,
    setBridgeState,
    gateway,
    setAsset
}: IWalletModal) => {
    const [isAssetApproved, setIsAssetApproved] = useState<boolean>(false);
    const [gatewayStep, setGatewayStep] = useState<boolean>(false);
    const [isSufficentBalance, setIsSufficientBalance] =
        useState<boolean>(true);
    const [walletBalance, setWalletBalance] = useState<any>(0);
    const [showTokenModal, setShowTokenModal] = useState<boolean>(false);
    const [showTokenModal1, setShowTokenModal1] = useState<boolean>(false);
    const [showTokenModal2, setShowTokenModal2] = useState<boolean>(false);

    const [walletAssetType, setWalletAssetType] = useState<AssetType>('chain');
    const [isMax, setIsMax] = useState<boolean>(false);
    const { chainId, account } = useWeb3React();
    const { defaultGasPrice } = useMarketGasData();
    const { switchNetwork } = useAuth();
    const { executeTransaction: exec } = useEcecuteTransaction();
    const { init } = useApproval();
    const {
        pendingTransaction,
        destinationChain,
        assetBalances,
        setFromChain,
        setDestinationChain,
        setPendingTransaction
    } = useGlobalState();

    const from =
        buttonState.tabName === 'Mint' ? 'Ethereum' : 'BinanceSmartChain';
    const to =
        buttonState.tabName === 'Release' ? 'BinanceSmartChain' : 'Ethereum';

    const toggleGatewayStep = useCallback((w: any) => setGatewayStep(!w), []);
    const needsToSwitchChain =
        buttonState.tabName === 'Mint'
            ? ChainIdToRenChain[chainId!] === from
            : ChainIdToRenChain[chainId!] === to;

    const error = !needsToSwitchChain
        ? false
        : text === '' || Number(text) == 0 || !isSufficentBalance;
    // console.log(error);

    useEffect(() => {
        setDestinationChain(chainsBaseConfig.Ethereum);
    }, []);

    useEffect(() => {
        if (!asset || !account) return;
        if (buttonState.tabName === 'Release') {
            setIsAssetApproved(true);
            return;
        }
        (async () => {
            const approvalResponse = await get<{
                result: any;
            }>(API.next.getbridgeapproval, {
                params: {
                    chainName: 'Ethereum',
                    assetName: asset.Icon,
                    account: account
                }
            });
            console.log(Number(approvalResponse?.result.hex));
            if (!approvalResponse) throw new Error('Multicall Failed');
            if (
                Number(approvalResponse.result.hex) >=
                    Number(text) / 10 ** -asset.decimals ||
                buttonState.tabName === 'Withdraw'
            )
                setIsAssetApproved(true);
            else setIsAssetApproved(false);
        })();
    }, [asset, account, buttonState.tabName, text]);

    const handleApprovalRequest = useCallback(() => {
        setPendingTransaction(true);
        const bridgeAddress = '0x53de366dA21a6F3cF477C2Fbb238a9a4bbBF0002';
        const tokenAddress =
            chainAdresses[destinationChain.fullName]?.assets[asset.Icon]
                ?.tokenAddress!;

        const tokenContract = init(tokenAddress, ERC20ABI, true);
        exec(
            asset,
            destinationChain,
            [bridgeAddress, ethers.constants.MaxUint256],
            new BigNumber(text).shiftedBy(-asset.decimals).toString(),
            'Approval',
            tokenContract?.approve
        ).then(() => {
            setIsAssetApproved(true);
            setPendingTransaction(false);
        });
    }, [setPendingTransaction, init, exec, destinationChain, asset, text]);

    useEffect(() => {
        if (typeof assetBalances === 'undefined') return;
        (async () => {
            setIsSufficientBalance(true); // reset on component mount to override previous tokens' value
            const walletBalance = new BigNumber(
                assetBalances[asset.Icon]?.walletBalance!
            ).shiftedBy(-asset.decimals);

            setWalletBalance(Number(walletBalance));
            setIsSufficientBalance(+walletBalance >= Number(text));
        })();
    }, [text, setIsSufficientBalance, asset, assetBalances, buttonState]);

    console.log(buttonState);

    const handleChainSwitchRequest = useCallback(() => {
        switchNetwork(buttonState.tabName === 'Mint' ? 5 : 97).then(
            (result: any) => {
                setDestinationChain(
                    chainsBaseConfig[
                        ChainIdToRenChain[
                            buttonState.tabName === 'Mint' ? 5 : 97
                        ]!
                    ]
                );
            }
        );
    }, [setDestinationChain, switchNetwork, buttonState.tabName]);

    const execute = useCallback(async () => {
        if (!needsToSwitchChain) handleChainSwitchRequest();
        else if (!isAssetApproved) handleApprovalRequest();
        else setGatewayStep(true);
    }, [
        needsToSwitchChain,
        handleChainSwitchRequest,
        isAssetApproved,
        handleApprovalRequest
    ]);

    if (gatewayStep) {
        return (
            <div className="mt-[60px] mb-[40px]">
                <BridgeModalContainer>
                    <ConfirmationStep
                        close={toggleGatewayStep}
                        gateway={gateway}
                        transactionType={buttonState.tabName}
                    />
                </BridgeModalContainer>
            </div>
        );
    } else
        return (
            <div className="mt-[60px] mb-[40px]">
                <WarningPopup label={'Dont have USDT on Goerli'} />
                <BridgeModalContainer>
                    <BridgeToggleButton
                        activeButton={buttonState}
                        tabs={BRIDGE_TABS}
                        setActiveButton={setButtonState}
                        setAsset={setAsset}
                        setFromChain={setFromChain}
                        setDestinationChain={setDestinationChain}
                    />
                    <div className="px-[18px] pb-[12px]">
                        <DropdownWrapper
                            isVisible={bridgeState.tabName !== 'Native Bridge'}
                        >
                            <AssetListModal
                                setShowTokenModal={setShowTokenModal}
                                visible={showTokenModal}
                                setAsset={setAsset}
                                walletAssetType={'currency'}
                                buttonState={bridgeState}
                                dType={'Move'}
                                disabledAsset={
                                    buttonState.tabName !== 'Mint'
                                        ? 'ASTRAL_USDT'
                                        : 'USDT_Goerli'
                                }
                                assets={
                                    buttonState.tabName === 'Mint'
                                        ? supportedAssets
                                        : supportedAssets2
                                }
                            />

                            <AssetListModal
                                setShowTokenModal={setShowTokenModal1}
                                visible={showTokenModal1}
                                setAsset={setAsset}
                                walletAssetType={'chain'}
                                buttonState={bridgeState}
                                dType={
                                    buttonState.tabName !== 'Mint'
                                        ? 'To'
                                        : 'From'
                                }
                                disabledAsset={
                                    buttonState.tabName === 'Mint'
                                        ? 'Ethereum'
                                        : 'BinanceSmartChain'
                                }
                                assets={
                                    buttonState.tabName === 'Mint'
                                        ? supportedEthereumChains2
                                        : supportedEthereumChains1
                                }
                            />
                            <AssetListModal
                                setShowTokenModal={setShowTokenModal2}
                                visible={showTokenModal2}
                                setAsset={setAsset}
                                walletAssetType={'chain'}
                                buttonState={bridgeState}
                                dType={
                                    buttonState.tabName === 'Mint'
                                        ? 'To'
                                        : 'From'
                                }
                                disabledAsset={
                                    buttonState.tabName === 'Mint'
                                        ? 'BinanceSmartChain'
                                        : 'Ethereum'
                                }
                                assets={
                                    buttonState.tabName === 'Mint'
                                        ? supportedEthereumChains1
                                        : supportedEthereumChains2
                                }
                            />
                        </DropdownWrapper>
                        <BalanceDisplay
                            asset={asset}
                            isNative={false}
                            buttonState={buttonState.tabName}
                        />
                        <MintFormContainer>
                            <ToggleButtonContainer
                                activeButton={buttonState}
                                tabs={TABS}
                                setActiveButton={setButtonState}
                                isVisible={
                                    bridgeState.tabName === 'Native Bridge'
                                }
                            />
                            <WalletInputForm
                                setAmount={setText}
                                amount={text}
                                isMax={isMax}
                                setIsMax={setIsMax}
                                walletBalance={walletBalance}
                                buttonState={buttonState.tabName}
                            />
                            {text !== '' && (
                                <FeeData
                                    text={text}
                                    defaultGasPrice={defaultGasPrice}
                                    asset={asset}
                                />
                            )}

                            <div className="mt-6 mb-1 flex items-center justify-center px-5">
                                <BridegButton
                                    chain={destinationChain}
                                    asset={asset}
                                    buttonState={buttonState}
                                    isSufficentBalance={isSufficentBalance}
                                    needsToSwitchChain={needsToSwitchChain}
                                    setGatewayStep={setGatewayStep}
                                    text={text}
                                    error={error}
                                    execute={execute}
                                    from={from}
                                    to={to}
                                    isAssetApproved={isAssetApproved}
                                />
                            </div>
                        </MintFormContainer>
                    </div>
                </BridgeModalContainer>
            </div>
        );
};

export default BridgeModal;
