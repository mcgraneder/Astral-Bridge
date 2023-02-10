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
  const { assetBalances, chain, setChain } = useGlobalState();
    const {
      gasPrice,
      text,
      buttonState,
      asset,
      setAsset,
      walletAssetType,
      setText,
      setWalletAssetType,
      setButtonState,
      handleTransaction
    } = useWallet();

    return (
      <>
        <AssetListModal
          setShowTokenModal={setShowTokenModal}
          visible={showTokenModal}
          assetBalances={assetBalances}
          setAsset={setAsset}
          setChain={setChain}
          walletAssetType={walletAssetType}
        />
        <TransactionFlowModals
          gasPrice={gasPrice}
          text={text}
          buttonState={buttonState}
          asset={asset}
          chain={chain}
          handleTransaction={handleTransaction}
        />

        <Layout>
          <WalletModal
            setShowTokenModal={setShowTokenModal}
            setWalletAssetType={setWalletAssetType}
            asset={asset}
            chain={chain}
            gasPrice={gasPrice}
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

export default BlockPage;
