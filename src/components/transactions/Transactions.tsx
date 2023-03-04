// import { Trace } from "@uniswap/analytics";
// import { InterfacePageName } from "@uniswap/analytics-events";
// import NetworkFilter from "components/Transactions/TokenTable/NetworkFilter";
// import SearchBar from "components/Transactions/TokenTable/SearchBar";
// import TimeSelector from "components/Transactions/TokenTable/TimeSelector";
// import TokenTable from "components/Transactions/TokenTable/TokenTable";
// import { MouseoverTooltip } from "components/Tooltip";
import { useEffect } from "react";
import styled from "styled-components";
import TransactionsTable from "./components/TransactionTable";
import { UilAngleDown } from "@iconscout/react-unicons";
import SearchBar from "./components/SearchBar";

export const MAX_WIDTH_MEDIA_BREAKPOINT = "1200px";
export const XLARGE_MEDIA_BREAKPOINT = "960px";
export const LARGE_MEDIA_BREAKPOINT = "840px";
export const MEDIUM_MEDIA_BREAKPOINT = "720px";
export const SMALL_MEDIA_BREAKPOINT = "540px";
export const MOBILE_MEDIA_BREAKPOINT = "420px";

export const BREAKPOINTS = {
  xs: 396,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
  xxxl: 1920,
};

const ExploreContainer = styled.div`
  width: 100%;
  min-width: 320px;
  padding: 68px 12px 0px;


  @media only screen and (max-width: 768px) {
    padding-top: 48px;
  }

  @media only screen and (max-width: 640px) {
    padding-top: 20px;
  }
`;
const TitleContainer = styled.div`
  margin-bottom: 32px;
  max-width: ${MAX_WIDTH_MEDIA_BREAKPOINT};
  margin-left: auto;
  margin-right: auto;
  display: flex;
`;
const FiltersContainer = styled.div`
  display: flex;
  gap: 8px;
  height: 40px;

  @media only screen and (max-width: ${MEDIUM_MEDIA_BREAKPOINT}) {
    order: 2;
  }
`;
const SearchContainer = styled(FiltersContainer)`
  margin-left: 8px;
  width: 100%;

  @media only screen and (max-width: ${MEDIUM_MEDIA_BREAKPOINT}) {
    margin: 0px;
    order: 1;
  }
`;
const FiltersWrapper = styled.div`
  display: flex;
  max-width: ${MAX_WIDTH_MEDIA_BREAKPOINT};
  margin: 0 auto;
  margin-bottom: 20px;
  color: black;
  flex-direction: row;

  @media only screen and (max-width: ${MEDIUM_MEDIA_BREAKPOINT}) {
    flex-direction: column;
    gap: 8px;
  }
`;

const Transactions = () => {
  return (
    <ExploreContainer>
      <TitleContainer>
        <span className="text-3xl">Transactions</span>
      </TitleContainer>

      <FiltersWrapper>
        <div className="flex gap-2">
          <div className="flex items-center gap-2 rounded-xl border-tertiary bg-blue-600 py-2 px-4 text-white">
            <span>Ethereum</span>
            <UilAngleDown />
          </div>
          <div className="flex items-center gap-2 rounded-xl border-tertiary bg-blue-600 py-2 px-4 text-white">
            <span>Deposits</span>
            <UilAngleDown />
          </div>
          <div className="flex items-center gap-2 rounded-xl border-tertiary bg-blue-600 py-2 px-4 text-white">
            <span>Pending</span>
            <UilAngleDown />
          </div>

          <div className="flex items-center gap-2 rounded-xl border-tertiary bg-blue-600 py-2 px-4 text-white">
            <span>1D</span>
            <UilAngleDown />
          </div>
          <SearchBar/>
        </div>
      </FiltersWrapper>
      {/* <TokenTable / */}
      <TransactionsTable />
    </ExploreContainer>
  );
};

export default Transactions;
