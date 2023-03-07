import { useState, useCallback, useEffect } from "react";
import type { NextPage } from "next";
import { Layout } from "../layouts";
import AssetListModal from "../components/AssetListModal/AssetListModal";
import BottomNavBar from "../components/WalletModal/components/BottomNavbar";
import { useGlobalState } from "../context/useGlobalState";
import { Tab } from "../components/WalletModal/WalletModal";
import { WhiteListedLegacyAssets, whiteListedEVMAssets } from '../utils/assetsConfig';
import BridgeModal from '../components/BridgeModal/bridgeModal';
import { LeacyChains, EVMChains } from '../utils/chainsConfig';
import UserInfoModal from "../components/UserInformationModal/UserInformationModal";
import { useGatewayProvider } from "../hooks/useGatewayProvider";

type AssetType = "chain" | "currency";

const defaultButtonState: Tab = {
  tabName: "Bridge",
  tabNumber: 0,
  side: "left",
};

const defaultBridgeState: Tab = {
  tabName: "Native Bridge",
  tabNumber: 0,
  side: "left",
};
const BridgePage: NextPage = () => {
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [bridgeState, setBridgeState] = useState<Tab>(defaultBridgeState);
  const [showTokenModal, setShowTokenModal] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [walletAssetType, setWalletAssetType] = useState<AssetType>("chain");
  const { asset, setAsset, gateway } = useGatewayProvider();
  const [buttonState, setButtonState] = useState<Tab>(defaultButtonState);
  const {loading } = useGlobalState();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const warning = localStorage.getItem("bridgePageWarning");
  
    if (warning !== "true") setShowWarning(true);
  }, []);

  const closeWarning = useCallback(() => {
    setShowWarning(false);
    localStorage.setItem("bridgePageWarning", "true");
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
              This page is used to bridge native assets between blockchains in
              return for Ren assets so that they can be withdrawn from the wallet page. Since the Ren protocol is
              under maintenence I have blocked the features and briging services
              hosted on this page.
              <br />
              <br />
              Again Sorry for the inconvienience as I am paitentily waiting for
              the Ren protocol to go live again
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
          buttonState={defaultButtonState}
          assetFilter={
            bridgeState.tabName === "Native Bridge"
              ? WhiteListedLegacyAssets
              : whiteListedEVMAssets
          }
          chainFilter={
            bridgeState.tabName !== "Native Bridge" ? EVMChains : LeacyChains
          }
        />
      )}

      <Layout>
        <BridgeModal
          setShowTokenModal={setShowTokenModal}
          setWalletAssetType={setWalletAssetType}
          asset={asset}
          text={text}
          setText={setText}
          buttonState={buttonState}
          setButtonState={setButtonState}
          bridgeState={bridgeState}
          setBridgeState={setBridgeState}
          gateway={gateway}
          setAsset={setAsset}
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

export default BridgePage;
