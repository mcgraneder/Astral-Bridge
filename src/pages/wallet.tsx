import { useState, useEffect, useCallback } from "react";
import type { NextPage } from "next";
import WalletModal from "../components/WalletModal/WalletModal";
import { Layout } from "../layouts";
import AssetListModal from "../components/AssetListModal/AssetListModal";
import BottomNavBar from "../components/WalletModal/components/BottomNavbar";
import { useGlobalState } from "../context/useGlobalState";
import TransactionFlowModals from "../components/TxConfirmationModalFlow/index";
import { Tab } from "../components/WalletModal/WalletModal";
import {
  assetsBaseConfig,
  whiteListedEVMAssets,
  WhiteListedLegacyAssets,
} from "../utils/assetsConfig";
import { EVMChains, LeacyChains } from "../utils/chainsConfig";
import UserInfoModal from "../components/UserInformationModal/UserInformationModal";
import { formatHighValues } from '../utils/misc';
import useMarketGasData from "../hooks/useMarketGasData";
import { walletconnect } from '../connection/providers';

type AssetType = "chain" | "currency";

const WalletPage: NextPage = () => {
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [showTokenModal, setShowTokenModal] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [walletAssetType, setWalletAssetType] = useState<AssetType>("chain");
  const [asset, setAsset] = useState<any>(assetsBaseConfig.ASTRAL_USDT);
  const [buttonState, setButtonState] = useState<Tab>({
    tabName: "Deposit",
    tabNumber: 0,
    side: "left",
  });

  const { loading } = useGlobalState();
  const {
    defaultGasPrice,
    customGasPrice,
    setCustomtGasPrice,
    networkGasData,
    fetchMarketDataGasPrices,
  } = useMarketGasData();

  const chainFilter = [...LeacyChains, ...EVMChains];
  const assetFilter = [...whiteListedEVMAssets, ...WhiteListedLegacyAssets];

  useEffect(() => {
    if (typeof window === "undefined") return;
    const warning = localStorage.getItem("walletPageWarning");
    if (warning !== "true") setShowWarning(true);
  }, []);

  const closeWarning = useCallback(() => {
    setShowWarning(false);
    localStorage.setItem("walletPageWarning", "true");
  }, []);

  return (
    <>
      {!loading && (
        <UserInfoModal
          open={showWarning}
          close={closeWarning}
          isHomePageWarning={false}
          message={
            <span>
              This page wll eventually.... be the gateway from your wallet. Connect
              to your traded tokens. When u bridge asses they will move through here for the dex
            </span>
          }
        />
      )}
      {!loading && (
        <AssetListModal
          setShowTokenModal={setShowTokenModal}
          visible={showTokenModal}
          setAsset={setAsset}
          walletAssetType={walletAssetType}
          buttonState={buttonState}
          assetFilter={assetFilter}
          chainFilter={chainFilter}
        />
      )}
      {!loading && (
        <TransactionFlowModals
          text={text}
          buttonState={buttonState}
          asset={asset}
          setText={setText}
          defaultGasPrice={defaultGasPrice}
          customGasPrice={customGasPrice}
          setCustomtGasPrice={setCustomtGasPrice}
          networkGasData={networkGasData}
          fetchMarketDataGasPrices={fetchMarketDataGasPrices}
        />
      )}
      <Layout>
        <WalletModal
          setShowTokenModal={setShowTokenModal}
          setWalletAssetType={setWalletAssetType}
          asset={asset}
          text={text}
          setText={setText}
          buttonState={buttonState}
          setButtonState={setButtonState}
        />
        <BottomNavBar />
      </Layout>
    </>
  );
};

// export const getStaticProps = async ({ locale }: any) => ({
//   props: {
//     ...(await serverSideTranslations(locale, ["common", "errors"])),
//   },
// });

export default WalletPage;
