import { useState, useEffect, useCallback } from "react"
import type { NextPage } from "next";
import WalletModal from "../components/WalletModal/WalletModal";
import { Layout } from "../layouts";
import AssetListModal from "../components/AssetListModal/AssetListModal";
import BottomNavBar from "../components/WalletModal/components/BottomNavbar";
import { useGlobalState } from "../context/useGlobalState";
import API from "../constants/Api";
import { ChainIdToRenChain } from "../connection/chains";
import { useWeb3React } from "@web3-react/core";
import { get } from "../services/axios";
import TransactionFlowModals from "../components/TxConfirmationModalFlow/index";
import { Tab } from "../components/WalletModal/WalletModal";
import { assetsBaseConfig, whiteListedEVMAssets, WhiteListedLegacyAssets } from '../utils/assetsConfig';
import { EVMChains, LeacyChains } from "../utils/chainsConfig";

type AssetType = "chain" | "currency";

const WalletPage: NextPage = () => {
  
  const [showTokenModal, setShowTokenModal] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [walletAssetType, setWalletAssetType] = useState<AssetType>("chain");
  const [asset, setAsset] = useState<any>(assetsBaseConfig.BTC);
  const [buttonState, setButtonState] = useState<Tab>({
    tabName: "Deposit",
    tabNumber: 0,
    side: "left",
  });

  console.log(asset)

  const chainFilter = [...LeacyChains, ...EVMChains];
  const assetFilter = [...whiteListedEVMAssets, ...WhiteListedLegacyAssets];
  return (
    <>
      <Layout>
        <AssetListModal
          setShowTokenModal={setShowTokenModal}
          visible={showTokenModal}
          setAsset={setAsset}
          walletAssetType={walletAssetType}
          buttonState={buttonState}
          assetFilter={assetFilter}
          chainFilter={chainFilter}
        />
        <TransactionFlowModals
          text={text}
          buttonState={buttonState}
          asset={asset}
        />
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
