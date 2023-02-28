import { useState, useEffect, useCallback } from "react";
import type { NextPage } from "next";
import { Layout } from "../layouts";
import Home from "../components/LandingHome/Home";
import { useGlobalState } from "../context/useGlobalState";
import UserInfoModal from "../components/UserInformationModal/UserInformationModal";

const HomePage: NextPage = () => {
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const { loading } = useGlobalState();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const warning = localStorage.getItem("homePageWarning");
    console.log("warning", warning);
    if (warning !== "true") setShowWarning(true);
  }, []);

  const closeWarning = useCallback(() => {
    setShowWarning(false);
    localStorage.setItem("homePageWarning", "true");
  }, []);

  return (
    <>
      {!loading && (
        <UserInfoModal
          open={showWarning}
          close={closeWarning}
          message={
            <span>
              This application is a current work in progress. I have only been working on it for 3 weeks
              so most of the features are not finished. The protocol I use to bridge assets, RenJS, is
              also under maintenence
              <br />
              <br />
              I have therefore disabled some features within this app. I will show popups wherever i have disabled
              certain features.
              <br />
              <br />
              The only reason I am showing this app on my portfolio in its early stages is for curious employers
              or recruiters to see my latest work
            </span>
          }
        />
      )}
      <Layout>
        <Home />
      </Layout>
    </>
  );
};

export default HomePage;
