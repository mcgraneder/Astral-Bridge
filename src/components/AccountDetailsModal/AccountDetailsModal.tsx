import React, { useState, useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import { useViewport } from "../../hooks/useViewport";
import { Breakpoints } from "../../constants/Breakpoints";
import BottomSheetOptions from "../BottomSheet/BottomSheetOptions";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import {
  UilTimes,
  UilAngleRightB,
  UilSun,
  UilCheckCircle,
} from "@iconscout/react-unicons";
import { useAuth } from "../../context/useWalletAuth";
import { useRouter } from "next/router";
import Identicon from "../Identicon/Identicon";
import { shortenAddress } from "../../utils/misc";
import CopyIcon from "../Icons/CopyIcon";
import { ExternalLink, Power } from "react-feather";
import styled, { css } from "styled-components";
import BalanceDisplay from "../NativeBalanceDisplay/BalanceDisplay";
import Tooltip from "../Tooltip/Tooltip";
import { CHAINS } from "../../connection/chains";
import { TopRowNavigation as TopRowNavigationAlt } from "../TxConfirmationModalFlow";
import { useGlobalState } from "../../context/useGlobalState";
import { Icon } from "../Icons/AssetLogs/Icon";
import { formatTime } from "../../utils/date";
import Link from "next/link";

export const Backdrop = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  opacity: 0;
  pointer-events: none;
  backdrop-filter: blur(5px);
  z-index: 10000000000;
  pointer-events: none;
  background: rgba(2, 8, 26, 0.45);
  transition: opacity 0.15s ease-in-out !important;

  ${(props: any) =>
    props.visible &&
    css`
      opacity: 1;

      pointer-events: all;
    `}
`;

export const FormWrapper = styled.div`
    position: fixed;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -50%);
    width: 390px;
    height: 365px;
    background-color: rgb(13, 17, 28);
    padding: 20px 15px;
    padding-bottom: 20px;
    border: 1.5px solid rgb(60, 65, 80);
    border-radius: 15px;
    display: block;
    z-index: 10000000000;
    box-shadow: 14px 19px 5px 0px rgba(0, 0, 0, 0.85);
`;

interface AccountDetailsProps {
  toggleAccoundDetailsModal: () => void;
  showAccount?: boolean;
}

interface ITopRow {
  account: any;
  toggleAccoundDetailsModal: () => void;
}

export const TopRowNavigation = ({
  account,
  toggleAccoundDetailsModal,
}: ITopRow) => {
  const { disconnect } = useAuth();
  const { chainId } = useWeb3React();
  const explorerLink = CHAINS[chainId!]?.explorerLink;
  return (
    <div className={`mb-2 flex items-center justify-between px-2`}>
      <div className="flex items-center gap-2">
        <Identicon />
        <span className="text-[16px]">{shortenAddress(account)}</span>
      </div>
      <div className="flex items-center gap-2">
        <Tooltip content={"Copy Address"}>
          <div className="rounded-xl bg-gray-600 p-0.5 hover:bg-gray-500">
            <CopyIcon text={account} />
          </div>
        </Tooltip>

        <div className="rounded-xl bg-gray-600 p-0.5 hover:bg-gray-500">
          <Tooltip content={"View address on explorer"}>
            <button className="bg-black-600 rounded-full p-[5px]">
              <a
                href={explorerLink}
                rel="noreferrer noopener"
                target={"_blank"}
              >
                <ExternalLink className="h-4 w-4 text-gray-400" />
              </a>
            </button>
          </Tooltip>
        </div>
        <div className="rounded-xl bg-gray-600 p-0.5 hover:bg-gray-500">
          <Tooltip content={"Disconnect"}>
            <button
              className="bg-black-600 rounded-full p-[5px]"
              onClick={disconnect}
            >
              <Power className="h-4 w-4 text-gray-400 " />
            </button>
          </Tooltip>
        </div>
        <div className="rounded-xl bg-gray-600 p-0.5 hover:bg-gray-500">
          <button
            className="bg-black-600 rounded-full p-[5px]"
            onClick={toggleAccoundDetailsModal}
          >
            <UilTimes className="h-4 w-4 text-gray-400 " />
          </button>
        </div>
      </div>
    </div>
  );
};

const AccountDetailsModalIner = ({
  toggleAccoundDetailsModal,
  toggleTxModal,
}: AccountDetailsProps & { toggleTxModal: () => void }) => {
  const { disconnect } = useAuth();
  const { account } = useWeb3React();
  const { push } = useRouter();

  const deactivate = (): void => {
    disconnect();
    toggleAccoundDetailsModal();
    push("/home");
  };

  return (
    <>
      <TopRowNavigation
        account={account}
        toggleAccoundDetailsModal={toggleAccoundDetailsModal}
      />
      <BalanceDisplay asset={"ETH"} isNative={true} />
      <hr className="mx-[4px] h-[1px] border-gray-600" />
      <div className="mt-4 flex items-center justify-center">
        <PrimaryButton
          className={
            "w-full justify-center rounded-lg bg-blue-500 py-[10px] text-center"
          }
          onClick={deactivate}
        >
          Disconnect
        </PrimaryButton>
      </div>
      <div className="mt-4 flex flex-col items-center gap-2">
        <div
          className="flex w-full items-center justify-between rounded-xl p-2 hover:cursor-pointer hover:bg-tertiary"
          onClick={toggleTxModal}
        >
          <span className="text-[15px] text-gray-400">Recent Transactions</span>
          <UilAngleRightB className={"text-gray-400"} />
        </div>
        <div className="flex w-full items-center justify-between rounded-xl p-2 hover:cursor-pointer hover:bg-tertiary">
          {/* <Tooltip content="Light Theme Not Implemented yet" className="flex justify-between w-full"> */}
          <span className="text-[15px] text-gray-400">Dark Theme</span>
          <UilSun className={"text-gray-400"} />
          {/* </Tooltip> */}
        </div>
      </div>
    </>
  );
};

const RecentTransactions = ({
  transactions,
  close,
}: {
  transactions: any;
  close: () => void;
}) => {
  const getTxTypeText = (type: string) => {
    if (type === "deposit") return "Deposited";
    else if (type === "withdrawal") return "Withdrew";
    else return "Approved";
  };

  return (
    <>
      <TopRowNavigationAlt
        isLeftDisplay={true}
        title={"Recent Transactions"}
        isRightDisplay={true}
        close={close}
      />
      {!transactions || transactions.length === 0 ? (
        <div className="mt-4 flex items-center justify-center">
          <span className="text-gray-400">
            You have no recent transactions.
          </span>
        </div>
      ) : (
        <div className="mt-4 mx-1 flex flex-col items-center justify-center gap-4">
          {transactions.slice(0, 4).map((transaction: any) => {
            const formattedDate = formatTime(
              Math.floor(transaction.date / 1000).toString(),
              0
            );

            return (
              <Link
                key={transaction.txHash}
                className="flex items-center justify-center gap-2 break-words hover:bg-hoverLightground rounded-xl p-1"
                passHref
                href={`/transactions/${transaction.txHash}`}
              >
                <div className="px-2">
                  <Icon chainName={transaction.currency} className="h=8 w-8" />
                </div>
                <div className="break-words px-2 text-left text-[15px] font-semibold">
                  <span className="text-gray-400">
                    {getTxTypeText(transaction.txType)}{" "}
                  </span>
                  <span>
                    {`${transaction.amount} ${transaction.currency}`}{" "}
                  </span>
                  <span className="text-gray-400">on </span>
                  <span>
                    {transaction.chain === "BinanceSmartChain"
                      ? "Binance"
                      : transaction.chain}{" "}
                  </span>
                  <span className="text-gray-400">{formattedDate}</span>
                </div>
                <div className="px-2">
                  <UilCheckCircle className="h-5 w-5 text-green-500" />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
};

function AccountDetailsModal({
  toggleAccoundDetailsModal,
  showAccount,
}: AccountDetailsProps) {
  const [showTransactions, setShowTransactions] = useState<boolean>(false);
  const { width } = useViewport();
  const { transactions } = useGlobalState();

  const toggleTxModal = useCallback(() => {
    setShowTransactions((t: boolean) => !t);
  }, [setShowTransactions]);
  return (
    <>
      {width > 0 && width >= Breakpoints.sm1 ? (
        <Backdrop visible={showAccount}>
          <FormWrapper>
            {showTransactions ? (
               (
                <RecentTransactions
                  transactions={transactions}
                  close={toggleTxModal}
                />
              )
            ) : (
              <AccountDetailsModalIner
                toggleAccoundDetailsModal={toggleAccoundDetailsModal}
                toggleTxModal={toggleTxModal}
              />
            )}
          </FormWrapper>
        </Backdrop>
      ) : (
        <BottomSheetOptions
          hideCloseIcon
          open={showAccount!}
          setOpen={toggleAccoundDetailsModal}
          title={"Connecting"}
        >
          {showTransactions ? (
           (
              <RecentTransactions
                transactions={transactions}
                close={toggleTxModal}
              />
            )
          ) : (
            <AccountDetailsModalIner
              toggleAccoundDetailsModal={toggleAccoundDetailsModal}
              toggleTxModal={toggleTxModal}
            />
          )}
        </BottomSheetOptions>
      )}
    </>
  );
}

export default AccountDetailsModal;
