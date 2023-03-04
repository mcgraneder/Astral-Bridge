import styled from "styled-components";
import HeaderRow from "./HeaderRow";
import { RowData } from './TransactionRow';
import TransactionRow from './TransactionRow';



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

const DummyData: RowData[] = [
  {
    account: "0x123453...6789108",
    Id: "1",
    date: "30s ago",
    type: "Deposit",
    chain: "Ethereum",
    amount: "0.253 ETH",
    status: "Pending",
    currency: "ETH",
  },
  {
    account: "0x123453...6789108",
    Id: "2",
    date: "30 minutes ago",
    type: "Approval",
    chain: "BinanceSmartChain",
    amount: "0.253 ETH",
    status: "Failed",
    currency: "ETH",
  },
  {
    account: "0x123453...6789108",
    Id: "3",
    date: "5 days ago",
    type: "Deposit",
    chain: "Avalanche",
    amount: "0.253 ETH",
    status: "Completed",
    currency: "DAI",
  },
  {
    account: "0x123453...6789108",
    Id: "4",
    date: "10 days ago",
    type: "Withdrawal",
    chain: "Polygon",
    amount: "0.253 ETH",
    status: "Completed",
    currency: "USDT",
  },
];
export default function TransactionsTable() {
  // TODO: consider moving prefetched call into app.tsx and passing it here, use a preloaded call & updated on interval every 60s

  /* loading and error state */
//   if (loadingTokens) {
//     return <LoadingTokenTable rowCount={PAGE_SIZE} />;
//   } else if (!tokens) {
//     return (
//       <NoTokensState
//         message={
//           <>
//             <AlertTriangle size={16} />
//             <Trans>An error occurred loading tokens. Please try again.</Trans>
//           </>
//         }
//       />
//     );
//   } else if (tokens?.length === 0) {
//     return <NoTokensState message={<Trans>No tokens found</Trans>} />;
//   } else {
    return (
      <GridContainer>
        <HeaderRow/>
        <div className="w-full border-[0.5px] border-gray-800"/>
        {DummyData.map((data: RowData) => {
            return <TransactionRow key={data.Id} {...data}/>
        })}
      </GridContainer>
    );
  }

