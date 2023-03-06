import { useState, useEffect, useCallback } from "react";
import styled, { css } from "styled-components";
import HeaderRow from "./HeaderRow";
import TransactionRow from "./TransactionRow";
import { useGlobalState } from "../../../context/useGlobalState";
import API from "../../../constants/Api";
import { get } from "../../../services/axios";
import { StyledTokenRow } from './HeaderRow';
import { loadingAnimation } from '../../CSS/SkeletomStyles';
import { UilAngleRightB, UilAngleLeftB } from "@iconscout/react-unicons";
import { useTxFilterState } from "../TransactionsContext";
import ReactPaginate from "react-paginate";

export const MAX_WIDTH_MEDIA_BREAKPOINT = "1200px";

const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: ${MAX_WIDTH_MEDIA_BREAKPOINT};
  background-color: rgb(15, 25, 55);
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04),
    0px 16px 24px rgba(0, 0, 0, 0.04), 0px 24px 32px rgba(0, 0, 0, 0.01);
  margin-left: auto;
  margin-right: auto;
  border-radius: 12px;
  /* justify-content: center; */
  align-items: center;
  border: 1px solid rgb(48, 63, 88);
`;


export type UserTxType = {
  Id: string;
  account: string;
  amount: string;
  chain: string;
  Ethereum: string;
  currency: string;
  BTC: string;
  date: number;
  status: string;
  completed: string;
  txHash: string;
  type: string;
  deposit: string;
};

export const GlowingText = styled.div`
  font-size: 35px;
  width: 100%;
  height: 80%;
  border-radius: 12px;
  animation-fill-mode: both;
  background: ${(props: any) =>
    props.loading
      ? `linear-gradient(
    to left,
    rgb(62, 68, 82) 25%,
    rgb(100, 102, 116) 50%,
    rgb(62, 68, 82) 75%
  )`
      : "white"};
  will-change: background-position;
  background-size: 400%;

  color: transparent;

  ${(props: any) =>
    props.loading &&
    css`
      animation: ${loadingAnimation} 1s infinite;
    `}
`;

interface TransactionTableProps {
  filteredChain: any;
  filteredStatus: any;
  filteredType: any;
}

export default function TransactionsTable() {
  const {
    encryptedId: accountId,
    pendingTransaction,
    transactions,
    setTransactions,
    loadedTxs,
    setLoadedTxs,
  } = useGlobalState();
  const { filteredChain, filteredStatus, filteredType } =
    useTxFilterState();
    const [activePage, setActivePage] = useState(0);
  const [loading, setLoading] = useState<boolean>(
    loadedTxs == false ? true : false
  );
  const _pageStart = activePage * 10;

  useEffect(() => {
    // setActivePage(0)
    if (loadedTxs) return;
    const loaderTimeout: NodeJS.Timeout = setTimeout(() => {
      setLoading(false);
      setLoadedTxs(true);
    }, 2000);

    return () => clearTimeout(loaderTimeout);
  }, []);

  const fetchTxs = useCallback(async () => {
    if (!accountId) return;
    try {
      const transactionsResponse = await get<{
        txs: UserTxType[];
      } | null>(API.next.gettransactions, {
        params: {
          accountId,
          limit: 100,
        },
      });
      if (!transactionsResponse) return;
      console.log(transactionsResponse);
      const cache: any = {};
      cache[accountId] = transactionsResponse.txs;
      sessionStorage.setItem("user-transactions", JSON.stringify(cache));
      setTransactions(transactionsResponse.txs);
    } catch (err) {
      //  setError("notifications.somethingWentWrongTryLater");
    }
   
  }, [accountId, setTransactions]);

  useEffect(() => {
    fetchTxs();
    const intervalId: NodeJS.Timer = setInterval(
      fetchTxs,
      pendingTransaction ? 3000 : 30000
    );
    return () => clearInterval(intervalId);
  }, [accountId, fetchTxs, pendingTransaction]);

  useEffect(() => {
    const txns = sessionStorage.getItem("user-transactions");
    if (accountId && txns) {
      const cache = JSON.parse(txns);
      if (
        Object.keys(cache).length > 0 &&
        cache[accountId] &&
        cache[accountId].length > 0
      ) {
        setTransactions(cache[accountId]);
        //  setError(null);
      }
    }
  }, [accountId, setTransactions]);

  
  const onPageChange = (selectedItem: { selected: number }) => {
    setActivePage(selectedItem.selected);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!transactions || loading)
    return (
    
      <GridContainer>
        <HeaderRow />
        <div className="w-full border-[0.5px] border-gray-800" />
        {["1", "2", "3", "5", "6", "1", "2", "3", "5", "6"].map(
          (item: any, index: number) => {
            return (
              <StyledTokenRow key={index}>
                <div className="mr-4">
                  <GlowingText loading={true}>
                    <div className=" rounded-lg  p-3" />
                  </GlowingText>
                </div>
                <div className="flex w-[90%] items-center gap-2 text-blue-600">
                  <GlowingText loading={true}>
                    <div className=" h-5 w-5 rounded-full" />
                  </GlowingText>
                </div>
                <div className="flex w-[90%] items-center gap-2">
                  <GlowingText loading={true}>
                    <div className=" h-5 w-5 rounded-full" />
                  </GlowingText>
                </div>
                <div className="flex w-[90%] items-center gap-2">
                  <GlowingText loading={true}>
                    <div className=" h-5 w-5 rounded-full" />
                  </GlowingText>
                </div>
                <div className="flex w-[80%] items-center gap-2">
                  <GlowingText loading={true}>
                    <div className=" h-5 w-5 rounded-full" />
                  </GlowingText>
                </div>
                <div className="flex w-[90%] items-center gap-2">
                  <GlowingText loading={true}>
                    <div className=" h-5 w-5 rounded-full" />
                  </GlowingText>
                </div>
                <div className="flex w-[90%] items-center gap-2">
                  <GlowingText loading={true}>
                    <div className=" h-5 w-5 rounded-full" />
                  </GlowingText>
                </div>
              </StyledTokenRow>
            );
          }
        )}
      </GridContainer>
    );
  else
    return (
      <GridContainer>
        <HeaderRow />
        <div className="w-full border-[0.5px] border-gray-800" />
        {transactions
          .filter((transaction) => {
            console.log(filteredChain);
            if (filteredChain === "All Chains") return transaction;
            return transaction.chain === filteredChain;
          })
          .filter((transaction) => {
            if (filteredStatus === "All Statuses") return transaction;
            return (
              transaction.status.toLowerCase() === filteredStatus.toLowerCase()
            );
          })
          .filter((transaction) => {
            if (filteredType === "All Types") return transaction;
            const formattedStatus =
              filteredType === "Deposits" || filteredType === "Approvals"
                ? filteredType.substring(0, filteredType.length - 1)
                : filteredType.substring(0, filteredType.length - 3);
            console.log(transaction.type, filteredStatus);
            return (
              transaction.type.toLowerCase() === formattedStatus.toLowerCase()
            );
          })
          .slice(_pageStart, _pageStart + 9)
          .map((data: UserTxType) => {
            if (transactions.length === 0) return;
            return <TransactionRow key={data.Id} {...data} />;
          })}
        {Math.ceil(transactions.length / 10) > 1 && (
          // <div></div>
          <ReactPaginate
            className="my-3 p-2 flex items-center justify-center gap-3 rounded-xl bg-hoverLightground"
            breakLabel="..."
            nextLabel={<UilAngleRightB />}
            previousClassName={`${activePage === 0 && "text-gray-500"}`}
            nextClassName={`${
              activePage === Math.ceil(transactions.length / 10) - 1 &&
              "text-gray-500"
            }`}
            pageClassName="w-6 h-6 flex items-center justify-center rounded-lg "
            activeClassName="bg-blue-500"
            forcePage={activePage}
            onPageChange={onPageChange}
            pageCount={Math.ceil(transactions.length / 10)}
            previousLabel={<UilAngleLeftB />}
          />
        )}
      </GridContainer>
    );
}
