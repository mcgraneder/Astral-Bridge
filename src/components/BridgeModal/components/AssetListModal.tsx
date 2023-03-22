import React, { useState, useCallback } from 'react';
import { TopRowNavigation } from '../../WalletConnectModal/WalletConnectModal';
import {
    TokenInputContainer,
    TokenInput
} from '../../CSS/AssetListModalStyles';
import { Icon } from '../../Icons/AssetLogs/Icon';
import {
    chainsConfig,
    ChainConfig,
    supportedEthereumChains,
    chainsBaseConfig
} from '../../../utils/chainsConfig';
import {
    assetsConfig,
    AssetConfig,
    whiteListedEVMAssets,
    WhiteListedLegacyAssets
} from '../../../utils/assetsConfig';
import { useGlobalState } from '../../../context/useGlobalState';
import { Tab } from '../../WalletModal/WalletModal';
import { Asset } from '../../../utils/assetsConfig';
import { Chain } from '@renproject/chains';
import { UilAngleDown } from '@iconscout/react-unicons';
import { Icon as AssetIcon } from '../../Icons/AssetLogs/Icon';
import styled, { css } from 'styled-components';
import { alphaCHAINs } from '../../../utils/chainsConfig';
import { supportedAssets } from '../../AssetRotator/AssetRotator';
import { Icons } from '../../Icons/AssetLogs/assets';

export const Backdrop = styled.div`
    position: fixed;
    height: 100vh;
    width: 100vw;
    opacity: 0;
    top: 0;
    left: 0;
    pointer-events: none;
    backdrop-filter: blur(5px);
    z-index: 1000;
    pointer-events: none;
    transition: opacity 0.15s ease-in-out !important;
    background: rgba(2, 8, 26, 0.45);
    ${(props: any) =>
        props.visible &&
        css`
            opacity: 1;
            pointer-events: all;
        `}
`;

export const FormWrapper = styled.div`
    position: fixed;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -50%);
    width: 430px;
    background-color: rgb(15, 18, 44);
    text-align: right;
    /* padding: 30px 25px; */
    /* padding-bottom: 20px; */
    border: 1.5px solid rgb(48, 63, 88);
    border-radius: 15px;
    display: block;
    z-index: 10000000000;
    color: white;
    box-shadow: 14px 19px 5px 0px rgba(0, 0, 0, 0.85);
`;

export const DropDownContainer = styled.div`
    margin: ${(props: any) => (props.isVisible ? '8px 0px' : '0px')};

    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 6px;
    border: ${(props: any) =>
        props.isVisible ? '1px solid rgb(75 85 99);' : 'none'};
    background-color: rgb(43, 49, 102);
    padding: 0px 12px;
    height: ${(props: any) => (props.isVisible ? '38px' : '0px')};
    transition: height 0.2s ease;

    &:hover {
        cursor: pointer;
    }
`;
interface IDropdown {
    text: string;
    dropDownType: string;
    Icon: any;
    type: string;
    setShowTokenModal: any;
    isVisible: boolean;
}
const Dropdown = ({
    text,
    dropDownType,
    Icon,
    type,
    setShowTokenModal,
    isVisible
}: IDropdown) => {
    // console.log("iconnnnnn", Icon);
    const on = () => {
        setShowTokenModal(true);
    };
    return (
        <DropDownContainer isVisible={isVisible} onClick={on}>
            <div
                className={`flex items-center justify-center gap-2 ${
                    !isVisible && 'hidden'
                }`}
            >
                <div className="h-6 w-6">
                    <AssetIcon chainName={Icon as string} className="h-6 w-6" />
                </div>
                {dropDownType === 'currency' ? (
                    <span className="text-[15px]">Move {text}</span>
                ) : type === 'From' ? (
                    <span className="text-[15px]">From {text}</span>
                ) : (
                    <span className="text-[15px]">To {text}</span>
                )}
            </div>
            <div className={`h-6 w-6 ${!isVisible && 'hidden'}`}>
                <UilAngleDown className="h-6 w-6 font-bold text-blue-600" />
            </div>
        </DropDownContainer>
    );
};

const getOptions = (mode: string): Array<AssetConfig | ChainConfig> => {
    const options =
        mode === 'chain'
            ? Object.values(chainsConfig)
            : Object.values(assetsConfig);
    return options;
};

const getOptionBySymbol = (symbol: string, mode: string) =>
    getOptions(mode).find(
        (option: ChainConfig | AssetConfig) => option.fullName === symbol
    );

interface IAssetModal {
    setShowTokenModal: any;
    visible: boolean;
    setAsset: any;
    walletAssetType: any;
    buttonState: Tab;
    dType: any;
    disabledAsset: string;
    assets: any;
}

const createAvailabilityFilter =
    (available: Array<Chain> | Array<Asset>, walletAssetType: string) =>
    (option: ChainConfig | AssetConfig) => {
        if (!available) {
            return true;
        }
        return walletAssetType === 'chain'
            ? (available as Chain[]).includes(option.fullName as Chain)
            : (available as Asset[]).includes(option.Icon as Asset);
    };

const AssetListModal = ({
    setShowTokenModal,
    visible,
    setAsset,
    walletAssetType,
    buttonState,
    dType,
    disabledAsset,
    assets
}: IAssetModal) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const { assetBalances, setDestinationChain, setFromChain, chainType } =
        useGlobalState();

    const close = useCallback((): void => {
        setShowTokenModal(false);
        setSearchTerm('');
    }, [setSearchTerm, setShowTokenModal]);

    const available = useCallback(
        () => (walletAssetType === 'chain' ? [...assets] : [...assets]),
        [walletAssetType, assets]
    );

    const availabilityFilter = React.useMemo(
        () => createAvailabilityFilter(available(), walletAssetType),
        [available, walletAssetType]
    );

    const handleSearch = (val: any) => {
        if (!val) return;
        return (
            searchTerm === '' ||
            val.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            val.fullName.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    const handleSort = (a: any, b: any) => {
        if (a.fullName === 'Ethereum' || a.fulllName === 'BinanceSmartChain')
            return -1;
        if (a.Icon === 'ASTRAL_USDT' || a.Icon === 'USDT') return -1;
        else if (buttonState.tabName === 'Deposit') {
            if (
                Number(assetBalances[a.Icon]?.walletBalance) >
                Number(assetBalances[b.Icon]?.walletBalance)
            )
                return -1;
        } else {
            if (
                Number(assetBalances[a.Icon]?.bridgeBalance) >
                Number(assetBalances[b.Icon]?.bridgeBalance)
            )
                return -1;
        }
        return 0;
    };

    const setSelectedToken = React.useCallback(
        (option: any, type: string) => {
            if (type === 'currency') {
                setAsset(option);
            } else if (type === 'chain' && chainType === 'from') {
                setFromChain(option);
            } else if (type === 'chain' && chainType === 'destination') {
                setDestinationChain(option);
            }
            setSearchTerm('');
            close();
        },
        [close, setAsset, setDestinationChain, chainType, setFromChain]
    );

    const handleCurrencyChange = useCallback(
        (currency: string, option: Partial<AssetConfig>): void => {
            setSelectedToken(option, 'currency');
            if (WhiteListedLegacyAssets.includes(option.Icon as Asset))
                setFromChain(chainsBaseConfig[option.fullName as Chain]);
            const selectedCurrency = getOptionBySymbol(currency, 'currency');
            localStorage.setItem(
                'selected_currency',
                JSON.stringify(selectedCurrency)
            );
            setShowTokenModal(false);
        },
        [setSelectedToken, setShowTokenModal, setFromChain]
    );

    const handleChainChange = useCallback(
        (chain: string, option: any): void => {
            setSelectedToken(option, 'chain');
            const selectedChain = getOptionBySymbol(chain, 'chain');
            localStorage.setItem(
                'selected_chain',
                JSON.stringify(selectedChain)
            );
            setShowTokenModal(false);
        },
        [setSelectedToken, setShowTokenModal]
    );
    return (
        <>
            <Dropdown
                text={disabledAsset}
                dropDownType={walletAssetType}
                Icon={disabledAsset}
                type={dType}
                setShowTokenModal={setShowTokenModal}
                isVisible={true}
            />

            <Backdrop visible={visible}>
                <FormWrapper>
                    <div className="border-b border-tertiary px-[25px] pt-[30px] pb-[15px]">
                        <TopRowNavigation
                            isRightDisplay={true}
                            isLeftDisplay={true}
                            close={close}
                            title={`Select a ${walletAssetType}`}
                        />
                        <TokenInputContainer>
                            <TokenInput
                                placeholder={`Search ${walletAssetType} by name or symbol`}
                                value={searchTerm}
                                name={'search'}
                                type={'text'}
                                onChange={(e: any) =>
                                    setSearchTerm(e.currentTarget.value)
                                }
                            />
                        </TokenInputContainer>
                        <div className="my-2 flex flex-row items-center justify-start gap-2">
                            <div className="flex items-center justify-center gap-1 rounded-xl border border-tertiary bg-secondary  p-2">
                                <Icon chainName="BTC" className="h-6 w-6" />
                                <span className="mx-1">BTC</span>
                            </div>
                            <div className="flex items-center justify-center gap-1 rounded-xl border border-tertiary bg-secondary  p-2">
                                <Icon chainName="ETH" className="h-6 w-6" />
                                <span className="mx-1">ETH</span>
                            </div>
                        </div>
                    </div>
                    <div className=" max-h-[287px] min-h-[287px] overflow-y-auto bg-extraDarkBackground">
                        {getOptions(
                            walletAssetType === 'chain' ? 'chain' : 'currency'
                        )
                            .filter(availabilityFilter)
                            .sort(handleSort)
                            .map(
                                (
                                    asset: Partial<AssetConfig> &
                                        Partial<ChainConfig>,
                                    index: number
                                ) => {
                                    const formattedBalance =
                                        buttonState.tabName === 'Mint'
                                            ? Number(
                                                  assetBalances[asset.Icon!]
                                                      ?.walletBalance
                                              ) /
                                              10 ** asset.decimals!
                                            : Number(
                                                  assetBalances[asset.Icon!]
                                                      ?.bridgeBalance
                                              ) /
                                              10 ** asset.decimals!;
                                    const disabled =
                                        asset.Icon !== disabledAsset;

                                    return (
                                        <div
                                            key={index}
                                            className={` flex items-center justify-between py-[10px] px-8 ${
                                                disabled
                                                    ? 'cursor-not-allowed'
                                                    : 'hover:cursor-pointer hover:bg-secondary'
                                            } `}
                                            onClick={
                                                walletAssetType === 'chain'
                                                    ? () =>
                                                          handleChainChange(
                                                              asset.fullName!,
                                                              asset
                                                          )
                                                    : () =>
                                                          handleCurrencyChange(
                                                              asset.fullName!,
                                                              asset
                                                          )
                                            }
                                        >
                                            <div className="flex items-center justify-center gap-4">
                                                <Icon
                                                    chainName={
                                                        asset.Icon as string
                                                    }
                                                    className="h-8 w-8"
                                                />
                                                <div className="flex flex-col items-start justify-start text-center">
                                                    <span
                                                        className={` ${
                                                            disabled
                                                                ? 'text-gray-500'
                                                                : 'white'
                                                        } text-[16px]
                                                            font-semibold leading-tight`}
                                                    >
                                                        {asset.fullName}
                                                    </span>
                                                    <span
                                                        className={`text-[14px] leading-tight ${
                                                            disabled
                                                                ? 'text-gray-500'
                                                                : 'text-gray-600'
                                                        }`}
                                                    >
                                                        {asset.shortName}
                                                    </span>
                                                </div>
                                            </div>
                                            {walletAssetType === 'currency' ? (
                                                <span
                                                    className={`text-[14px]  ${
                                                        disabled &&
                                                        'text-gray-500'
                                                    }`}
                                                >
                                                    {formattedBalance}
                                                </span>
                                            ) : null}
                                        </div>
                                    );
                                }
                            )}
                    </div>
                    <div className="border-t border-tertiary px-[25px] py-[20px] text-center">
                        <span className="text-center text-[17px] font-semibold text-blue-500">
                            Currency selection
                        </span>
                    </div>
                </FormWrapper>
            </Backdrop>
        </>
    );
};

export default AssetListModal;
