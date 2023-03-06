import { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import TransactionsTable from "./components/TransactionTable";
import TransactionFilterButtons from './components/TransactionFilterButton';

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
  const [filteredChain, setFilteredChain] = useState<any>("All Chains")
  const [filteredType, setFilteredType] = useState<any>("All Types");
  const [filteredStatus, setFilteredStatus] = useState<any>("All Statuses");

  const clearFilters = useCallback(() => {
    setFilteredChain("All Chains");
    setFilteredStatus("All Statuses");
    setFilteredType("All Types");

  }, [setFilteredChain, setFilteredStatus, setFilteredType]);

  return (
    <ExploreContainer>
      <TitleContainer>
        <span className="text-3xl">Transactions</span>
      </TitleContainer>

      <FiltersWrapper>
        <div className="flex gap-2">
          <TransactionFilterButtons
            setFilteredChain={setFilteredChain}
            setFilteredType={setFilteredType}
            setFilteredStatus={setFilteredStatus}
            filteredChain={filteredChain}
            filteredStatus={filteredStatus}
            filteredType={filteredType}
            clearFilters={clearFilters}
          />
        </div>
      </FiltersWrapper>
      <TransactionsTable
        filteredChain={filteredChain}
        filteredStatus={filteredStatus}
        filteredType={filteredType}
      />
    </ExploreContainer>
  );
};

export default Transactions;
