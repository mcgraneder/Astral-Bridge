import type { NextPage } from "next";
import { Layout } from "../layouts";
import Home from "../components/LandingHome/Home";

const HomePage: NextPage = () => {

  return (
      <Layout>
          <Home />
      </Layout>
  );
};


export default HomePage;
