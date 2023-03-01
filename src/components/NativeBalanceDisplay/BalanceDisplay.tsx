import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { toFixed } from "../../utils/misc";
import { useGlobalState } from "../../context/useGlobalState";
import { CHAINS } from "../../connection/chains";
import { GlowingText } from "../CSS/SkeletomStyles";
import useFetchAssetPrice from "../../hooks/useFetchAssetPrice";

interface ITokenDisplay {
  asset: any;
  chainId: number | undefined;
  assetBalance: number;
  balance: string | undefined;
  fetchingBalances: boolean;
  assetPrice: any;
  isNative: boolean;
  chain: any;
}

type AssetQuery =
  | {
      [token: string]: {
        [fiat: string]: unknown;
      };
    }
  | "API_FAILED";

const BalanceDisplayInner = ({
  asset,
  chainId,
  assetBalance,
  balance,
  fetchingBalances,
  assetPrice,
  isNative,
  chain,
}: ITokenDisplay) => {
  return (
    <div className="my-5 flex flex-col items-center rounded-lg border border-tertiary p-2 text-center">
      {!isNative ? (
        <span className=" text-[17px]">
          <span>{asset.shortName}</span> Balance
          <span> on {chain.fullName}</span>
        </span>
      ) : null}
      {isNative ? (
        <GlowingText loading={fetchingBalances}>
          {balance ? balance : "0.00"}
          {balance ? <span>{` ${CHAINS[chainId!]?.symbol}`}</span> : null}
        </GlowingText>
      ) : (
        <GlowingText loading={fetchingBalances}>
          {assetBalance ? assetBalance : "0.00"}
          <span>{` ${asset.shortName}`}</span>
        </GlowingText>
      )}
      {assetPrice ? (
        <span className=" text-[17px] text-gray-400">{`$ ${assetPrice}`}</span>
      ) : null}
    </div>
  );
};
const BalanceDisplay = ({
  asset,
  buttonState,
  isNative,
}: {
  asset: any;
  isNative: boolean;
  buttonState?: string;
}) => {
  const [balance, setBalance] = useState<string | undefined>(undefined);
  const [assetBalance, setAssetBalance] = useState<number>(0);
  const { library, account, chainId } = useWeb3React();
  const {
    assetBalances,
    fetchingBalances,
    destinationChain: chain,
  } = useGlobalState();
  const { assetPrice } = useFetchAssetPrice(asset);

  useEffect(() => {
    if (!library || !account) return;
    library
      .getBalance(account)
      .then((balance: string): void =>
        setBalance(
          toFixed(Number(ethers.utils.formatUnits(balance)), 4).toString()
        )
      );

    const balanceInteral: NodeJS.Timer = setInterval((): void => {
      library
        .getBalance(account)
        .then((balance: string): void =>
          setBalance(
            toFixed(Number(ethers.utils.formatUnits(balance)), 4).toString()
          )
        );
    }, 60000);
    return (): void => clearInterval(balanceInteral);
  }, [balance, library, account]);

  useEffect(() => {
    if (typeof assetBalances == "undefined") return;
    const formattedBalance =
      buttonState !== "Deposit"
        ? Number(assetBalances[asset.Icon]?.bridgeBalance) /
          10 ** asset.decimals
        : Number(assetBalances[asset.Icon]?.walletBalance) /
          10 ** asset.decimals;

    setAssetBalance(formattedBalance);
  }, [assetBalances, buttonState, asset]);

  return (
    <BalanceDisplayInner
      asset={asset}
      chainId={chainId}
      assetBalance={assetBalance}
      balance={balance}
      fetchingBalances={fetchingBalances}
      assetPrice={assetPrice}
      isNative={isNative}
      chain={chain}
    />
  );
};

export default BalanceDisplay;
