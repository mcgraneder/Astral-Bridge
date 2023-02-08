import { useState, useEffect } from "react"
import { useWeb3React } from '@web3-react/core';
import { ethers } from "ethers";
import { toFixed } from "../../utils/misc";
import { useGlobalState } from "../../context/useGlobalState";
import { CHAINS, ChainIdToRenChain } from "../../connection/chains";
import { GlowingText } from "../CSS/SkeletomStyles";

interface ITokenDisplay {
  asset: any;
  chainId: number | undefined;
  assetBalance: number;
  balance: string | undefined;
  fetchingBalances: boolean;
  isNative: boolean;
}

const BalanceDisplayInner = ({
  asset,
  chainId,
  assetBalance,
  balance,
  fetchingBalances,
  isNative,
}: ITokenDisplay) => {
  return (
    <div className="my-5 flex flex-col items-center rounded-lg border border-tertiary p-2 text-center">
      <span className=" text-[17px]">
        <span>{asset.shortName}</span> Balance
        {isNative ? <span> on {ChainIdToRenChain[chainId!]}</span> : null}
      </span>
      {isNative ? (
        <GlowingText loading={fetchingBalances}>
          {balance ? balance : 0}
          {balance ? <span>{` ${CHAINS[chainId!]?.symbol}`}</span> : null}
        </GlowingText>
      ) : (
        <GlowingText loading={fetchingBalances}>
          {assetBalance ? assetBalance : 0}
          <span>{` ${asset.shortName}`}</span>
        </GlowingText>
      )}
      <span className=" text-[17px] text-gray-500">$ 10.67</span>
    </div>
  );
};
const BalanceDisplay = ({
  asset,
  isNative,
}: {
  asset: any;
  isNative: boolean;
}) => {
  const [balance, setBalance] = useState<string | undefined>(undefined);
  const [assetBalance, setAssetBalance] = useState<number>(0);
  const { library, account, chainId } = useWeb3React();
  const { assetBalances, fetchingBalances } = useGlobalState();

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
      Number(assetBalances[asset.Icon]?.bridgeBalance) / 10 ** asset.decimals;
    setAssetBalance(formattedBalance);
  }, [assetBalances, setAssetBalance]);

  return (
        <BalanceDisplayInner
          asset={asset}
          chainId={chainId}
          assetBalance={assetBalance}
          balance={balance}
          fetchingBalances={fetchingBalances}
          isNative={isNative}
        />   
  );
};

export default BalanceDisplay