import React, { useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useViewport } from '../../hooks/useViewport';
import { Backdrop, FormWrapper } from '../WalletConnectModal/WalletConnectModal';
import { TopRowNavigation } from '../WalletConnectModal/WalletConnectModal';
import { Breakpoints } from '../../constants/Breakpoints';
import BottomSheetOptions from '../BottomSheet/BottomSheetOptions';
import {
    UilSpinner,
    UilExclamationTriangle,
    UilCheckCircle
} from '@iconscout/react-unicons';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import { WALLETS, PROVIDERS } from '../../connection/wallets';
import Link from 'next/link';
import { chainAdresses } from '../../constants/Addresses';
import { useGlobalState } from '../../context/useGlobalState';
import { Icon } from "../Icons/AssetLogs/Icon"
import { BalanceContainer } from '../CSS/BridgeModalStyles';
import useAuth from '../../hooks/useAuth';
import { CHAINS } from '../../connection/chains';

interface TxSuccessProps {
    close: () => void;
    open: boolean;
    asset: any;
    chain: any;
}

interface IconProps {
    active: boolean;
}

const TxSubmittedInner = ({
    active,
    close,
    addAsset,
    onCorrectChain,
    switchNetwork,
    symbol
}: {
    active: boolean;
    close: () => void;
    addAsset: () => Promise<void>;
    onCorrectChain: boolean;
    switchNetwork: (id: number) => Promise<
        | {
              switched: boolean;
              errorCode: any;
          }
        | undefined
    >;
    symbol: string;
}) => {
    const IconM = WALLETS[PROVIDERS.INJECTED!]!.icon as any;
    const { filteredTransaction } = useGlobalState();
    return (
        <>
            <TopRowNavigation isRightDisplay={true} close={close} />
            <div className="my-2 flex flex-col items-center justify-center  px-2">
                <Icon chainName={'ASTRAL_USDT'} className={'h-28 w-28'} />
            </div>
            <div className="my-4 mx-auto flex max-w-[90%] flex-col items-center justify-center gap-2 text-center">
                <span className=" text-[26px] font-[700]">
                    Congratulations!
                </span>
                <div className="flex flex-col">
                    { !onCorrectChain ? (<div
                        className="mx-auto my-0 mb-4 flex w-fit items-center justify-center gap-3 rounded-full bg-secondary px-4 py-2 text-gray-400 hover:cursor-pointer hover:bg-lightTertiary"
                        onClick={() => switchNetwork(symbol === "aUSDT" ? 97 : 5)}
                    >
                        <span>Switch Chain to add Token to Wallet</span>
                        <IconM className={'h-5 w-5'} />
                    </div>)
                    :
                    (<div
                        className="mx-auto my-0 mb-4 flex w-fit items-center justify-center gap-3 rounded-full bg-secondary px-4 py-2 text-gray-400 hover:cursor-pointer hover:bg-lightTertiary"
                        onClick={addAsset}
                    >
                        <span>Add Token to Metamask</span>
                        <IconM className={'h-5 w-5'} />
                    </div>)}
                    <span className=" text-[16px] text-gray-400">
                        {`You just recieved your ${symbol}. You can now view your
                        Balance in the wallet section.`}
                    </span>
                </div>
            </div>

            <div className="mt-6 mb-2 flex items-center justify-center">
                <Link
                    href={`/wallet`}
                    passHref
                    className={
                        'w-full justify-center rounded-2xl bg-blue-500 py-[15.5px] text-center text-[17px] font-semibold'
                    }
                    onClick={close}
                >
                    Go to wallet
                </Link>
            </div>
        </>
    );
};

function TransactionSuccessModal({
}: TxSuccessProps) {
    const { active, chainId } = useWeb3React();
    const { width } = useViewport();
    const { successType, isSuccessOpen, setIsSuccessOpen } = useGlobalState();

    const symbol = successType === 'Mint' ? 'aUSDT' : 'USDT';
    const onCorrectChain =
        successType === 'Mint' && chainId == 97
            ? true
            : successType === 'Release' && chainId == 5;

    const AddAsset = useCallback(async (): Promise<void> => {
        const tokenAddress =
            successType === 'Mint'
                ? '0x8b4F896F83a52dE9ee19f41eaFa7abe35007Ce47'
                : '0x270203070650134837F3C33Fa7D97DC456eF624e';

        const symbol = successType === 'Mint' ? 'aUSDT' : 'USDT';
        //@ts-ignore
        const { ethereum } = window;
        try {
            await ethereum.request({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC20',
                    options: {
                        address: tokenAddress,
                        symbol: symbol,
                        decimals: 6
                    }
                }
            });
        } catch (error: any) {
            console.log(error);
        }
    }, [successType]);

      const switchNetwork = useCallback(
          async (network: number) => {
              //@ts-ignore
              const { ethereum } = window;
              const hexChainId = `0x${network.toString(16)}`;
              const chainInfo = CHAINS[network];

              try {
                  await ethereum?.request({
                      method: 'wallet_switchEthereumChain',
                      params: [{ chainId: hexChainId }]
                  });
              } catch (error: any) {
                console.log(error)
                  if (error.code === 4902) {
                      // TODO: get new chain params
                      try {
                          await ethereum?.request({
                              method: 'wallet_addEthereumChain',
                              params: [
                                  {
                                      chainId: hexChainId,
                                      chainName: chainInfo?.chainName,
                                      rpcUrls: chainInfo?.rpcUrls,
                                      nativeCurrency: {
                                          name: chainInfo?.currency,
                                          symbol: chainInfo?.symbol,
                                          decimals: 18
                                      },
                                      blockExplorerUrls: [
                                          chainInfo?.explorerLink
                                      ]
                                  }
                              ]
                          });
                      } catch (addError: any) {
                          return { switched: false, errorCode: addError.code };
                      }
                  }

                  return { switched: false, errorCode: error.code };
              }
          },
          []
      );

    return (
        <>
            {width > 0 && width >= Breakpoints.sm1 ? (
                <Backdrop visible={isSuccessOpen}>
                    <FormWrapper>
                        <TxSubmittedInner
                            active={isSuccessOpen}
                            close={() => setIsSuccessOpen(false)}
                            addAsset={AddAsset}
                            onCorrectChain={onCorrectChain}
                            switchNetwork={switchNetwork}
                            symbol={symbol}
                        />
                    </FormWrapper>
                </Backdrop>
            ) : (
                <BottomSheetOptions
                    hideCloseIcon
                    open={isSuccessOpen}
                    setOpen={() => null}
                    title={'Pending'}
                >
                    <TxSubmittedInner
                        active={active}
                        close={() => setIsSuccessOpen(false)}
                        addAsset={AddAsset}
                        onCorrectChain={onCorrectChain}
                        switchNetwork={switchNetwork}
                        symbol={symbol}
                    />
                </BottomSheetOptions>
            )}
        </>
    );
}

export default TransactionSuccessModal;
