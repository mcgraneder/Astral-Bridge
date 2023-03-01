import { useState, useCallback, useEffect } from "react";
import type { NextPage } from "next";
import { Layout } from "../layouts";
import BottomNavBar from "../components/WalletModal/components/BottomNavbar";
import { useGlobalState } from "../context/useGlobalState";
import DexModal from "../components/TradeModal/TradeModal";
import UserInfoModal from '../components/UserInformationModal/UserInformationModal';

const TradePage: NextPage = () => {
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const { loading } = useGlobalState();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const warning = localStorage.getItem("tradePageWarning");

    if (warning !== "true") setShowWarning(true);
  }, []);

  const closeWarning = useCallback(() => {
    setShowWarning(false);
    localStorage.setItem("tradePageWarning", "true");
  }, []);

  return (
    <>
      {!loading && (
        <UserInfoModal
          open={showWarning}
          close={closeWarning}
          message={
            <span>
              This page is not yet functional and I have only scaffolded out some basic CSS
              as a placeholder for ppl who visit this demo app
              <br />
              <br />
              I am currently working on the cross chain DEX contracts which will alow users to trade their
              bridged sythetic Ren assets amoung AMMs deployed all all of the chains supported by this app
              
            </span>
          }
        />
      )}
      <Layout>
        <DexModal />
        <BottomNavBar />
      </Layout>
    </>
  );
};


export default TradePage;
