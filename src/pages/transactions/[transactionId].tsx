import type { NextPage } from "next";
import { Layout } from "../../layouts";
import TransactionId from '../../components/transactions/TransactionId';

const TransactionsPage: NextPage = () => {
  return (
    <Layout>
      <TransactionId />
    </Layout>
  );
};

export default TransactionsPage;
