import React, { useState, useEffect, useCallback } from "react"
import { TopRowNavigation } from "../WalletConnectModal/WalletConnectModal"
import { FormWrapper, TokenInputContainer, TokenInput } from '../CSS/AssetListModalStyles';
import { Backdrop } from "../WalletConnectModal/WalletConnectModal"
import { Icon } from '../Icons/AssetLogs/Icon';
import { chainsConfig, ChainConfig, supportedEthereumChains } from '../../utils/chainsConfig';
import {
  assetsConfig,
  AssetConfig,
  assetsBaseConfig,
  supportedAssets,
  whiteListedEVMAssets,
  WhiteListedLegacyAssets,
} from "../../utils/assetsConfig";
import { Asset, Chain } from "@renproject/chains";
import { useWallet } from "../../context/useWalletState";
import { MulticallReturn } from "../../context/useGlobalState";
import { Tab } from "../WalletModal/WalletModal";

const getOptions = (mode: string): Array<AssetConfig | ChainConfig> => {
  const options =
    mode === "chain"
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
  assetBalances: {
    [x: string]: MulticallReturn | undefined;
  };
  setAsset: any;
  setChain: any;
  walletAssetType: any;
  buttonState: Tab;
}

const createAvailabilityFilter =
  (available: any, walletAssetType: string) => (option: any) => {
    if (!available) {
      return true;
    }
    return walletAssetType === "chain"
      ? available.includes(option.fullName)
      : available.includes(option.Icon);
  };

const AssetListModal = ({
  setShowTokenModal,
  visible,
  assetBalances,
  setAsset,
  setChain,
  walletAssetType,
  buttonState,
}: IAssetModal) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const close = useCallback((): void => {
    setShowTokenModal(false);
    setSearchTerm("");
  }, [setSearchTerm, setShowTokenModal]);

  const available =
    walletAssetType === "chain"
      ? supportedEthereumChains
      : [...whiteListedEVMAssets, ...WhiteListedLegacyAssets];

  const availabilityFilter = React.useMemo(
    () => createAvailabilityFilter(available, walletAssetType),
    [available, walletAssetType]
  );

  const handleSearch = (val: any) => {
    if (!val) return;
    return (
      searchTerm === "" ||
      val.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      val.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleSort = (a: any, b: any) => {
    if (buttonState.tabName === "Deposit") {
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
      if (type === "currency") {
        setAsset(option);
      } else if (type === "chain") {
        setChain(option);
      }
      setSearchTerm("");
      close();
    },
    [close, setAsset, setChain]
  );

  const handleCurrencyChange = useCallback(
    (currency: string, option: any): void => {
      setSelectedToken(option, "currency");
      const selectedCurrency = getOptionBySymbol(currency, "currency");
      localStorage.setItem(
        "selected_currency",
        JSON.stringify(selectedCurrency)
      );
      setShowTokenModal(false);
    },
    [setSelectedToken, setShowTokenModal]
  );

  const handleChainChange = useCallback(
    (chain: string, option: any): void => {
      setSelectedToken(option, "chain");
      const selectedChain = getOptionBySymbol(chain, "chain");
      localStorage.setItem("selected_chain", JSON.stringify(selectedChain));
      setShowTokenModal(false);
    },
    [setSelectedToken, setShowTokenModal]
  );
  return (
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
              name={"search"}
              type={"text"}
              onChange={(e) => setSearchTerm(e.currentTarget.value)}
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
          {getOptions(walletAssetType === "chain" ? "chain" : "currency")
            .filter(availabilityFilter)
            .filter((val) => {
              return handleSearch(val);
            })
            .sort(handleSort)
            .map((asset: any, index: number) => {
              const formattedBalance =
                buttonState.tabName !== "Deposit"
                  ? Number(assetBalances[asset.Icon]?.bridgeBalance) /
                    10 ** asset.decimals
                  : Number(assetBalances[asset.Icon]?.walletBalance) /
                    10 ** asset.decimals;
              return (
                <div
                  key={index}
                  className="cursor: pointer flex items-center justify-between py-[10px] px-8 hover:cursor-pointer hover:bg-secondary"
                  onClick={
                    walletAssetType === "chain"
                      ? () => handleChainChange(asset.fullName, asset)
                      : () => handleCurrencyChange(asset.fullName, asset)
                  }
                >
                  <div className="flex items-center justify-center gap-4">
                    <Icon chainName={asset.Icon} className="h-8 w-8" />
                    <div className="flex flex-col items-start justify-start text-center">
                      <span className="text-[16px] font-semibold leading-tight">
                        {asset.fullName}
                      </span>
                      <span className="text-[14px] leading-tight text-gray-500">
                        {asset.shortName}
                      </span>
                    </div>
                  </div>
                  {walletAssetType === "currency" ? (
                    <span className="text-[14px]">{formattedBalance}</span>
                  ) : null}
                </div>
              );
            })}
        </div>
        <div className="border-t border-tertiary px-[25px] py-[20px] text-center">
          <span className="text-center text-[17px] font-semibold text-blue-500">
            Currency selection
          </span>
        </div>
      </FormWrapper>
    </Backdrop>
  );
};

export default AssetListModal