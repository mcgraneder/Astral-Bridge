import React, { useState, useEffect, useCallback } from "react";
import styled, { css } from "styled-components";
import LogoIcon from "../../../public/svgs/assets/RenIconHome.svg";
import { UilSearch } from "@iconscout/react-unicons";
import { UilSpinner, UilAngleDown } from "@iconscout/react-unicons";
import { useWeb3React } from "@web3-react/core";
import { shortenAddress } from "../../utils/misc";
import { walletIcon } from "../../connection/wallets";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import TokenSelectDropdown from "./ChainSelector";
import { useViewport } from "../../hooks/useViewport";
import { useRouter } from "next/router";
import { useGlobalState } from "../../context/useGlobalState";
import Link from "next/link";
import { UserTxType } from "../transactions/components/TransactionTable";
import API from "../../constants/Api";
import { formatTime } from "../../utils/date";
import { Icon } from "../Icons/AssetLogs/Icon";
import { get } from "../../services/axios";
import Image from "next/image";
import AstralLogo from "../../../public/images/astralLogo.png"
import AstralLogoAlt from '../../../public/images/AstralLogoAlt.png';
import { StyledSubTitle } from '../CSS/HomePage.styles';


export const Wrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  justify-content: space-between;
  position: fixed;
  top: 0px;
  z-index: 100;
  /* background: rgb(12, 18, 43); */

  ${(props: any) =>
    props.isNavbarDark &&
    css`
      background: rgb(12, 18, 43);
    `}
`;

export const Nav = styled.nav`
  padding: 20px 12px;
  width: 100%;
  height: 72px;
  z-index: 2;
  box-sizing: border-box;
  display: block;
`;

export const Box = styled.div`
  box-sizing: border-box;
  vertical-align: initial;
  -webkit-tap-highlight-color: transparent;
  display: flex;
  flex-wrap: nowrap;
  height: 100%;
`;

export const BoxItemContainer = styled.div`
  box-sizing: border-box;
  vertical-align: initial;
  -webkit-tap-highlight-color: transparent;
  justify-content: ${(props: any) => props.allignment};
  display: flex;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0;
  width: 100%;
  align-items: center;
`;

interface INavbar {
  toggleWalletModal: () => void;
  toggleAccoundDetailsModal: () => void;
}

const ROUTES: string[] = ["bridge", "wallet", "history", "trade"];

const NavLinks = ({ routes }: { routes: string[] }) => {
  return (
    <>
      {routes.map((route: string, index: number) => {
        return (
          <Link
            href={`/${route === "history" ? "transactions" : route}`}
            key={route}
            className="mx-1 hidden flex-row items-center gap-2 md:flex"
          >
            <span className="my-2 w-full rounded-xl bg-black bg-opacity-20 px-4 py-2 text-center text-[16px] hover:cursor-pointer hover:bg-black hover:bg-opacity-40">
              {route}
            </span>
          </Link>
        );
      })}
    </>
  );
};

const InputDrowdownSkeleton = ({ searchTerm }: { searchTerm: string }) => {
  return (
    <div className="absolute top-0 left-0 -z-10 w-full rounded-lg border  border-gray-500 bg-darkBackground px-4 pt-[45px] pb-2">
      {searchTerm !== "" ? (
        <div className="flex items-center justify-center  gap-2 px-1 py-4">
          <span className="text-gray-400">You currently have no transactions.</span>
        </div>
      ) : (
        <>
        <div className="flex items-center justify-start px-2 pt-2">
                <span className="text-gray-400 text-sm">
                  start typing to search
                </span>
              </div>
        {[1, 2, 3, 4].map((item, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-3 items-center   gap-2 overflow-hidden py-4 pr-2 pl-2"
            >
              <div className="flex items-center justify-start gap-2 text-sm">
                <span className="h-6 w-6 rounded-full bg-tertiary" />
                <span className="h-4 w-full rounded-full bg-tertiary" />
              </div>
              <div className="flex items-center text-start text-sm w-full">
                <span className="h-4 w-full rounded-full bg-tertiary" />
              </div>
              <div className="flex items-center justify-start text-sm">
                <span className="h-4 w-full rounded-full bg-tertiary" />
              </div>
              
              
            </div>
          );
        })}
        </>
      )}
      
    </div>
  );
};

export const StyledTokenRow = styled.div<{
  first?: boolean;
  last?: boolean;
  loading?: boolean;
}>`
  background-color: transparent;
  display: grid;
  grid-template-columns: 2fr 4fr 2fr 2fr;
  padding: 16px;
  width: 100%;
`;

const InputDropdown = ({
  transactions,
  searchTerm,
}: {
  transactions: UserTxType[];
  searchTerm: string;
}) => {
  const handleSearch = (val: any) => {
    if (!val) return;
    return (
      searchTerm === "" ||
      val.currency.toLowerCase().includes(searchTerm.toLowerCase()) ||
      val.txHash.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const trimAsset = (asset: string) => {
    const trimmedText = asset.substring(asset.length - 6, asset.length);
    if (trimmedText === "Goerli") return asset.substring(0, asset.length - 7);
    else return asset;
  };

  if (transactions.length == 0 || searchTerm === "")
    return (
      <InputDrowdownSkeleton
        searchTerm={searchTerm}
      />
    );
  else
    return (
      <div className="absolute top-0 left-0 -z-10 w-full overflow-hidden rounded-lg  border border-gray-500 bg-darkBackground pt-[45px] pb-2">
        {transactions
          .filter((val) => {
            return handleSearch(val);
          })
          .map((transaction: UserTxType, index: number) => {
            const date = formatTime(
              Math.floor(transaction.date / 1000).toString(),
              0
            );
            const asset = trimAsset(transaction.currency);

            return (
              <Link
                key={index}
                href={`/transactions/${transaction.txHash}`}
                passHref
                className="hover:bg-hoverLightground grid grid-cols-3   items-center gap-2 overflow-hidden py-4 pr-2 pl-4"
              >
                <div className="flex items-center justify-start gap-2 text-sm">
                  <Icon chainName={transaction.currency} className="h-6 w-6" />
                  <span>{`${transaction.amount} ${asset}`}</span>
                </div>
                <div className="text-start text-sm">
                  <span>{date}</span>
                </div>
                <div className="justify-start text-sm">
                  <span className="w-full overflow-hidden rounded-full text-[15px] text-blue-500">{`iD: ${transaction.txHash.substring(
                    0,
                    8
                  )}...`}</span>
                </div>
              </Link>
            );
          })}
      </div>
    );
};

const TokenSearchBar = ({
  width,
  accountId,
}: {
  width: number;
  accountId: string | null;
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [dropDownActive, setDropdownActive] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<any[]>([]);

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
      console.log(transactionsResponse);
      if (!transactionsResponse) return;
      setTransactions(transactionsResponse.txs);
    } catch (err) {
      //  setError("notifications.somethingWentWrongTryLater");
    }
  }, [accountId, setTransactions]);

  useEffect(() => {
    console.log("fetching");
    fetchTxs();
  }, [accountId, fetchTxs]);

  const handleOnBlur = useCallback(() => {
    setTimeout(() => {
      setDropdownActive(false);
    }, 500);
  }, []);

  return (
    <BoxItemContainer allignment={width >= 1000 ? "center" : "end"}>
      <div
        className={`relative  flex h-[45px] w-fit max-w-[95%] items-center justify-center rounded-lg border border-transparent bg-darkBackground bg-opacity-40 px-2 lg:w-full lg:border-gray-500 ${
          dropDownActive && "border-b-0 bg-opacity-100"
        } ${width <= 1000 && "mr-4"}`}
      >
        <UilSearch className="text-grey-400 mr-2 h-6 w-6" />
        {width >= 1000 && (
          <>
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="placeholder:text-grey-400 flex-1 bg-transparent  text-[15px] font-medium tracking-wide outline-none"
              placeholder={"Search transactions by token"}
              onFocus={() => setDropdownActive(true)}
              onBlur={handleOnBlur}
            />
            {dropDownActive && (
              <InputDropdown
                transactions={transactions}
                searchTerm={searchTerm}
              />
            )}
          </>
        )}
      </div>
    </BoxItemContainer>
  );
};
export const Navbar = ({
  toggleWalletModal,
  toggleAccoundDetailsModal,
}: INavbar) => {
  const [isNavbarDark, setIsNavbarDark] = useState(false);
  const [provider, setProvider] = useState<any>(undefined);
  const router = useRouter();
  const { account, active } = useWeb3React()
  const { pendingTransaction, encryptedId, width } =
    useGlobalState();
  const activePath = router.pathname;


    const changeBackground = () => {
      
      if (window.scrollY >= 66) {
        setIsNavbarDark(true);
      } else {
        setIsNavbarDark(false);
      }
    };

    useEffect(() => {
      if (typeof window === "undefined") return
      changeBackground();
      window.addEventListener("scroll", changeBackground);
    });

  useEffect(() => {
    if (typeof window == "undefined" || !active) return;
    const provider = localStorage.getItem("provider");
    setProvider(provider);
  }, [active]);

  const Icon = provider ? walletIcon[provider] : undefined;
  return (
      <Wrapper isNavbarDark={isNavbarDark}>
          <Nav>
              <Box>
                  <BoxItemContainer allignment={'flex-start'}>
                      {width >= 1000 && (
                          <div className="mr-5 flex h-full items-center gap-2 ">
                              <Image
                                  alt=""
                                  src={AstralLogo}
                                  className="mx-4 h-10 w-10 "
                              />
                              
                          </div>
                      )}
                      {activePath !== '/home' && <NavLinks routes={ROUTES} />}
                  </BoxItemContainer>
                  {activePath !== '/home' && (
                      <TokenSearchBar width={width} accountId={encryptedId} />
                  )}
                  <BoxItemContainer allignment={'flex-end'}>
                      {activePath !== '/home' && (
                          <div className="mr-5 flex h-full items-center">
                              <TokenSelectDropdown />
                          </div>
                      )}
                      <div className="mr-5 flex  h-full items-center">
                          <PrimaryButton
                              className="mt-[2px] bg-blue-500 py-[6px] hover:bg-blue-600"
                              onClick={
                                  !active
                                      ? toggleWalletModal
                                      : toggleAccoundDetailsModal
                              }
                          >
                              {pendingTransaction ? (
                                  <>
                                      <UilSpinner
                                          className={
                                              ' h-6 w-6 animate-spin text-white'
                                          }
                                      />
                                      <span className="mr-2 hidden xs:block">
                                          {'1 Pending'}
                                      </span>
                                  </>
                              ) : (
                                  <>
                                      <span className="mr-2 hidden xs:block">
                                          {active
                                              ? shortenAddress(account)
                                              : 'Connect'}
                                      </span>
                                      <span className="mr-2 hidden xs:block">
                                          |
                                      </span>
                                      {active && Icon ? (
                                          <Icon className={'h-5 w-5'} />
                                      ) : (
                                          <UilAngleDown className={'h-5 w-5'} />
                                      )}
                                  </>
                              )}
                          </PrimaryButton>
                      </div>
                  </BoxItemContainer>
              </Box>
          </Nav>
      </Wrapper>
  );
};

export default Navbar;
