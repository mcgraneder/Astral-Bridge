import { useState, useEffect, useCallback } from "react";
import type { NextPage } from "next";
import { Layout } from "../layouts";
import Home from "../components/LandingHome/Home";
import { useGlobalState } from "../context/useGlobalState";
import UserInfoModal from "../components/UserInformationModal/UserInformationModal";

const HomePage: NextPage = () => {

  return (
    <>
      <Layout>
        <Home />
      </Layout>
    </>
  );
};

export default HomePage;
