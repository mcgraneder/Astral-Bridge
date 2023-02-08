import { useState } from "react"
import type { NextPage } from "next";
import WalletModal from "../components/WalletModal/WalletModal";
import { Layout } from "../layouts";
import AssetListModal from '../components/AssetListModal/AssetListModal';
import { useWallet } from "../context/useWalletState";
import BottomNavBar from "../components/WalletModal/components/BottomNavbar";
import { useGlobalState } from "../context/useGlobalState";

const BlockPage: NextPage = () => {
  const [showTokenModal, setShowTokenModal] = useState<boolean>(false);
  const { assetBalances } = useGlobalState();
  return (
    <>
      <AssetListModal
        setShowTokenModal={setShowTokenModal}
        visible={showTokenModal}
        assetBalances={assetBalances}
      />
      <Layout>
        <WalletModal
          setShowTokenModal={setShowTokenModal}
          assetBalances={assetBalances}
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
