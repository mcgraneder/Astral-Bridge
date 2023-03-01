import { useState, useCallback, useEffect } from "react";
import type { NextPage } from "next";
import { Layout } from "../layouts";
import AssetListModal from "../components/AssetListModal/AssetListModal";
import BottomNavBar from "../components/WalletModal/components/BottomNavbar";
import { useGlobalState } from "../context/useGlobalState";
import { Tab } from "../components/WalletModal/WalletModal";
import { WhiteListedLegacyAssets, whiteListedEVMAssets } from '../utils/assetsConfig';
import BridgeModal from '../components/BridgeModal/bridgeModal';
import { useGateway } from "../context/useGatewayState";
import { LeacyChains, EVMChains } from '../utils/chainsConfig';
import UserInfoModal from "../components/UserInformationModal/UserInformationModal";

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
  const { asset, setAsset, gateway } = useGateway();
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
          message={
            <span>
              This page is used to bridge native assets between blockchains in
              return to a 1:1 Synetheic Ren asset Peg. Since the Ren protocol is
              under maintenence I have blocked the features and briging services
              hosted on this page.
              <br />
              <br />
              Navigate to the wallet page if you want to try test out how users
              can withdraw bridged tokens to their wallet and deposit bridged
              tokens from thir wallet to my contract in order to burn the ren
              syth assets for their orginal tokens
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
