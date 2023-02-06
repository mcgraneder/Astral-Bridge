import { useState } from "react"
import type { NextPage } from "next";
import WalletModal from "../components/WalletModal/WalletModal";
import { Layout } from "../layouts";
import AssetListModal from '../components/AssetListModal/AssetListModal';
import { useWallet } from "../context/useWalletState";

const BlockPage: NextPage = () => {

  const [showTokenModal, setShowTokenModal] = useState<boolean>(false)
  return (
      <>
          <AssetListModal setShowTokenModal={setShowTokenModal} visible={showTokenModal} />
          <Layout>
              <WalletModal setShowTokenModal={setShowTokenModal} />
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
