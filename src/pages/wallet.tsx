import { useState, useEffect, useCallback } from "react"
import type { NextPage } from "next";
import WalletModal from "../components/WalletModal/WalletModal";
import { Layout } from "../layouts";
import AssetListModal from '../components/AssetListModal/AssetListModal';
import { useWallet } from "../context/useWalletState";
import BottomNavBar from "../components/WalletModal/components/BottomNavbar";
import { useGlobalState } from "../context/useGlobalState";
import API from '../constants/Api';
import { ChainIdToRenChain } from '../connection/chains';
import { useWeb3React } from '@web3-react/core';
import { get } from "../services/axios";
import TxConfirmationModal from "../components/TxConfirmationModalFlow";
import PendingTransactionModal from '../components/TxConfirmationModalFlow/PendinTransactionModal';
import TransactionRejectedModal from '../components/TxConfirmationModalFlow/TransactionRejectedModal';
import TransactionFlowModals from '../components/TxConfirmationModalFlow/index';

const BlockPage: NextPage = () => {
  const [showTokenModal, setShowTokenModal] = useState<boolean>(false);
  const { assetBalances } = useGlobalState();
  const { confirmation, toggleConfirmationModal } = useWallet()

  return (
    <>
      <AssetListModal
        setShowTokenModal={setShowTokenModal}
        visible={showTokenModal}
        assetBalances={assetBalances}
      />
      <TransactionFlowModals/>

      <Layout>
        <WalletModal
          setShowTokenModal={setShowTokenModal}
          confirmation={confirmation}
          toggleConfirmationModal={toggleConfirmationModal}
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
