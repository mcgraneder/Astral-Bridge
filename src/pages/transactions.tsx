import type { NextPage } from "next";
import { Layout } from "../layouts";
import Transactions from '../components/transactions/Transactions';

const TransactionsPage: NextPage = () => {
  return (
    <Layout>
      <Transactions />
    </Layout>
  );
};

export default TransactionsPage;
