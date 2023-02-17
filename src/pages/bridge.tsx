import { useState } from "react";
import type { NextPage } from "next";
import { Layout } from "../layouts";
import AssetListModal from "../components/AssetListModal/AssetListModal";
import BottomNavBar from "../components/WalletModal/components/BottomNavbar";
import { useGlobalState } from "../context/useGlobalState";
import { useWeb3React } from "@web3-react/core";
import TransactionFlowModals from "../components/TxConfirmationModalFlow/index";
import { Tab } from "../components/WalletModal/WalletModal";
import { assetsBaseConfig } from "../utils/assetsConfig";
import BridgeModal from '../components/BridgeModal/bridgeModal';
import { useGateway } from "../context/useGatewayState";
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
const BlockPage: NextPage = () => {
  const [bridgeState, setBridgeState] = useState<Tab>(defaultBridgeState);
  const [showTokenModal, setShowTokenModal] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [walletAssetType, setWalletAssetType] = useState<AssetType>("chain");
  const [asset, setAsset] = useState<any>(assetsBaseConfig.BTC);
   const [buttonState, setButtonState] = useState<Tab>(defaultButtonState);
  const { fromChain, destinationChain } = useGlobalState();
   const [gatewayChains, setGatewayChains] = useState<any>(null);
  const { library, account } = useWeb3React()

  // useEffect(() => {
  //   if (!fromChain || !destinationChain) return;
  //   initProvider(fromChain.Icon as Chain, destinationChain.Icon as Chain)
  //     .catch((error: Error) => console.error(error));
  // }, [fromChain, destinationChain, initProvider]);


  return (
    <>
      <AssetListModal
        setShowTokenModal={setShowTokenModal}
        visible={showTokenModal}
        setAsset={setAsset}
        walletAssetType={walletAssetType}
        buttonState={defaultButtonState}
      />
      <TransactionFlowModals
        text={text}
        buttonState={defaultButtonState}
        asset={asset}
      />

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

export default BlockPage;
