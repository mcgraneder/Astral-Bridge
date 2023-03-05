import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import HeaderRow from "./HeaderRow";
import { RowData } from "./TransactionRow";
import TransactionRow from "./TransactionRow";
import { useGlobalState } from "../../../context/useGlobalState";
import API from "../../../constants/Api";
import { get } from "../../../services/axios";
import { useWeb3React } from "@web3-react/core";

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

const TokenDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  height: 100%;
  width: 100%;
`;

const NoTokenDisplay = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 60px;
  color: black;
  font-size: 16px;
  font-weight: 500;
  align-items: center;
  padding: 0px 28px;
  gap: 8px;
`;

// function NoTokensState({ message }: { message: ReactNode }) {
//   return (
//     <GridContainer>
//       <HeaderRow />
//       <NoTokenDisplay>{message}</NoTokenDisplay>
//     </GridContainer>
//   );
// }

// const LoadingRows = ({ rowCount }: { rowCount: number }) => (
//   <>
//     {Array(rowCount)
//       .fill(null)
//       .map((_, index) => {
//         return (
//           <LoadingRow
//             key={index}
//             first={index === 0}
//             last={index === rowCount - 1}
//           />
//         );
//       })}
//   </>
// );

// function LoadingTokenTable({ rowCount = 20 }: { rowCount?: number }) {
//   return (
//     <GridContainer>
//       <HeaderRow />
//       <TokenDataContainer>
//         <LoadingRows rowCount={rowCount} />
//       </TokenDataContainer>
//     </GridContainer>
//   );
// }
export type UserTxType = {
  Id: string
  account: string
  amount: string
  chain: string
  Ethereum: string
  currency: string
  BTC: string
  date: number;
  status: string
  completed: string
  txHash: string
  type: string
  deposit: string
};
export default function TransactionsTable() {
  const { encryptedId: accountId, pendingTransaction } = useGlobalState();
  const { account } = useWeb3React();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [fetchingState, setFetchingState] = useState<any>("FETCHING");

  const fetchTxs = useCallback(async () => {
    if (!accountId) return;
    try {
      const transactionsResponse = await get<{
        txs: UserTxType[];
      } | null>(API.next.gettransactions, {
        params: {
          accountId: "wqKTxW9NW8fCmitVFiS4",
          limit: 100,
        },
      });
      if (!transactionsResponse) return;
      const cache: any = {};
      cache["wqKTxW9NW8fCmitVFiS4"] = transactionsResponse.txs;
      sessionStorage.setItem("user-transactions", JSON.stringify(cache));
      setTransactions(transactionsResponse.txs);
    } catch (err) {
      //  setError("notifications.somethingWentWrongTryLater");
    }
    setFetchingState("FETCHED");
  }, [accountId]);

  useEffect(() => console.log(transactions),[transactions])
  useEffect(() => {
    fetchTxs();
    const intervalId: NodeJS.Timer = setInterval(
      fetchTxs,
      pendingTransaction ? 3000 : 20000
    );
    return () => clearInterval(intervalId);
  }, [accountId, fetchTxs, pendingTransaction]);

  useEffect(() => {
    const txns = sessionStorage.getItem("user-transactions");
    if (accountId && txns) {
      const cache = JSON.parse(txns);
      if (Object.keys(cache).length > 0 && cache[accountId].length > 0) {
        setTransactions(cache[accountId]);
        //  setError(null);
        setFetchingState("FETCHED_CACHED");
      }
    }
  }, [accountId]);

  if (transactions.length == 0) return <></>;
  else
    return (
      <GridContainer>
        <HeaderRow />
        <div className="w-full border-[0.5px] border-gray-800" />
        {transactions.map((data: RowData) => {
          if (transactions.length === 0) return;
          return <TransactionRow key={data.Id} {...data} />;
        })}
      </GridContainer>
    );
}
