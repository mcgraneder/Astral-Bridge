import { useState, useCallback, useEffect } from "react";
import type { NextPage } from "next";
import { Layout } from "../layouts";
import AssetListModal from "../components/AssetListModal/AssetListModal";
import BottomNavBar from "../components/WalletModal/components/BottomNavbar";
import { useGlobalState } from "../context/useGlobalState";
import { Tab } from "../components/WalletModal/WalletModal";
import { WhiteListedLegacyAssets, whiteListedEVMAssets, whiteListedEVMAssetsALPHA_NATIVE, whiteListedEVMAssetsALPHA_SYNTH, supportedAssets } from '../utils/assetsConfig';
import BridgeModal from '../components/BridgeModal/bridgeModal';
import { LeacyChains, EVMChains, alphaCHAINs } from '../utils/chainsConfig';
import UserInfoModal from "../components/UserInformationModal/UserInformationModal";
import { useGatewayProvider } from "../hooks/useGatewayProvider";
import TransactionFlowModals from '../components/TxConfirmationModalFlow/index';
import useMarketGasData from '../hooks/useMarketGasData';

type AssetType = "chain" | "currency";

const defaultButtonState: Tab = {
  tabName: "Mint",
  tabNumber: 0,
  side: "left",
};

const defaultBridgeState: Tab = {
  tabName: "Mint",
  tabNumber: 0,
  side: "left",
};
const BridgePage: NextPage = () => {
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [bridgeState, setBridgeState] = useState<Tab>(defaultBridgeState);
  // const [showTokenModal, setShowTokenModal] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  // const [walletAssetType, setWalletAssetType] = useState<AssetType>("chain");
  const { asset, setAsset, gateway } = useGatewayProvider();
  const [buttonState, setButtonState] = useState<Tab>(defaultButtonState);
  const {loading } = useGlobalState();

   const {
       defaultGasPrice,
       customGasPrice,
       setCustomtGasPrice,
       networkGasData,
       fetchMarketDataGasPrices
   } = useMarketGasData();

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
                  isHomePageWarning={true}
                  open={showWarning}
                  close={closeWarning}
                  message={
                      <span>
                          This application is a current work in progress. I have
                          only been working on it, sparingly, for 2 months so
                          most of the features are not finished.
                          <br />
                          <br />I will show popups wherever I have an unfinished
                          or in-progress feature. The only reason I am showing
                          this app on my portfolio in its early stages is for
                          curious employers to see my latest work .
                      </span>
                  }
              />
          )}
          {/* {!loading && (
              <AssetListModal
                  setShowTokenModal={setShowTokenModal}
                  visible={showTokenModal}
                  setAsset={setAsset}
                  walletAssetType={walletAssetType}
                  buttonState={bridgeState}
                  assetFilter={supportedAssets}
                  chainFilter={alphaCHAINs}
              />
          )} */}
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
              <BridgeModal
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
