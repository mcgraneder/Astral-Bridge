import type { NextPage } from "next";
import { Layout } from "../layouts";

const BlockPage: NextPage = () => {

  return (
    <>
      <Layout>
        <div></div>
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
