import { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import TransactionsTable from "./components/TransactionTable";
import TransactionFilterButtons from './components/TransactionFilterButton';
import { TransactionFilterStateProvider } from "./TransactionsContext";

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
  padding: 50px 12px 0px;

  @media only screen and (max-width: 768px) {
    padding-top: 48px;
  }

  @media only screen and (max-width: 640px) {
    padding-top: 20px;
  }
`;
const TitleContainer = styled.div`
  margin-bottom: 10px;
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
  return (
    <TransactionFilterStateProvider>
      <ExploreContainer>
        <TitleContainer>
          <span className="text-3xl">Transactions</span>
        </TitleContainer>
        <FiltersWrapper>
          <div className="flex gap-2">
            <TransactionFilterButtons />
          </div>
        </FiltersWrapper>
        <TransactionsTable />
      </ExploreContainer>
    </TransactionFilterStateProvider>
  );
};

export default Transactions;
