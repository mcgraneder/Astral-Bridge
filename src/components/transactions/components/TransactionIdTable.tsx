import { useState, useEffect, useCallback } from "react";
import styled, { css } from "styled-components";
import HeaderRow from "./HeaderRow";
import { RowData } from "./TransactionRow";
import TransactionRow from "./TransactionRow";
import { useGlobalState } from "../../../context/useGlobalState";
import API from "../../../constants/Api";
import { get } from "../../../services/axios";
import { useWeb3React } from "@web3-react/core";
import { StyledTokenRow } from "./HeaderRow";
import { loadingAnimation } from "../../CSS/SkeletomStyles";
import PrimaryButton from "../../PrimaryButton/PrimaryButton";
import { UilArrowLeft } from "@iconscout/react-unicons";
import { useTxFilterState } from "../TransactionsContext";
import Link from "next/link";
import TransactionIdRow from './TransactionIdRow';

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

export default function TransactionsIdTable() {
  const { encryptedId: accountId, pendingTransaction } = useGlobalState();
  const [loading, setLoading] = useState<boolean>(true);
  const [transaction, setTransaction] = useState<any[] | undefined>(undefined);

  useEffect(() => {
    const loaderTimeout: NodeJS.Timeout = setTimeout(() => {
      setLoading(false);
    }, 1400);

    return () => clearTimeout(loaderTimeout);
  }, []);

  const fetchTxs = useCallback(async () => {
    if (!accountId) return;
    try {
      const transactionsResponse = await get<{
        tx: UserTxType[];
      } | null>(API.next.gettransaction, {
        params: {
          accountId,
          txHash:
            "0xfadab842733eaa0c52ebd46c901d941f0ae843dc8daaf3ab657a261b4ba6eebf",
        },
      });
      if (!transactionsResponse) return;
      console.log(transactionsResponse);
      setTransaction(transactionsResponse.tx);
    } catch (err) {
      //  setError("notifications.somethingWentWrongTryLater");
    }
  }, [accountId, setTransaction]);

  useEffect(() => {
    fetchTxs();
    const intervalId: NodeJS.Timer = setInterval(
      fetchTxs,
      pendingTransaction ? 3000 : 30000
    );
    return () => clearInterval(intervalId);
  }, [accountId, fetchTxs, pendingTransaction]);

  if (!transaction || loading)
    return (
      <GridContainer>
        <HeaderRow />
        <div className="w-full border-[0.5px] border-gray-800" />
        {["1"].map((item: any, index: number) => {
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
        })}
      </GridContainer>
    );
  else
    return (
      <>
        <GridContainer>
          <HeaderRow />
          <div className="w-full border-[0.5px] border-gray-800" />
          <TransactionIdRow {...transaction[0]} />
        </GridContainer>
        <div className="mt-8 mb-2 flex items-center justify-center">
          <Link
          href={"/transactions"}
          passHref
            className={
              "flex w-[200px] items-center justify-center rounded-2xl bg-blue-500 py-[10px] text-center text-[17px] font-semibold"
            }
          >
            <UilArrowLeft />
            <span> back to all</span>
          </Link>
        </div>
      </>
    );
}
