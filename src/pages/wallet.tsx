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

type AssetType = "chain" | "currency";

const WalletPage: NextPage = () => {
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [showTokenModal, setShowTokenModal] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [walletAssetType, setWalletAssetType] = useState<AssetType>("chain");
  const [asset, setAsset] = useState<any>(assetsBaseConfig.BTC);
  const [buttonState, setButtonState] = useState<Tab>({
    tabName: "Withdraw",
    tabNumber: 1,
    side: "right",
  });

  const { loading } = useGlobalState();

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
          message={
            <span>
              The core Ren Bridge protocol which i use in this app is currently
              under maintenence has been halted for the time being. Therefore
              new users will not be able to get the syntethic ren ERC20 assets
              used to trade in this app.
              <br />
              <br />
              Therefore to show off the apps functionality I have left some Ren
              BTC, DAI and USDT in my bridge contract which you can use to use
              and test the deposit and withdrawal functionality on this page.
              <br />
              <br />
              Sorry for the inconvienience as I am paitentily waiting for the
              Ren protocol to go live again
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
