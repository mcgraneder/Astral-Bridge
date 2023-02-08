import { useState, useEffect } from "react"
import { useWeb3React } from '@web3-react/core';
import { ethers } from "ethers";
import { toFixed } from "../../utils/misc";
import { MulticallReturn, useGlobalState } from "../../context/useGlobalState";
import { CHAINS } from "../../connection/chains";

interface ITokenDisplay {
  asset: any;
  chain: any;
  assetBalance: number;
}

interface INativeDisplay {
  chain: any;
  balance: string | undefined;
  chainId: number | undefined;
}
const NativeDisplay = ({ chain, balance, chainId }: INativeDisplay) => {
  return (
    <div className="my-5 flex flex-col items-center rounded-lg border border-tertiary p-2 text-center">
      <span className=" text-[17px]">
        <span>{chain.fullName}</span> Balance
      </span>
      <span className="text-[35px]">
        {balance ? balance : 0}
        {balance ? <span>{` ${CHAINS[chainId!]?.symbol}`}</span> : null}
      </span>
      <span className=" text-[17px] text-gray-500">$ 10.67</span>
    </div>
  );
};

const TokenDisplay = ({ asset, chain, assetBalance }: ITokenDisplay) => {
  return (
    <div className="my-5 flex flex-col items-center rounded-lg border border-tertiary p-2 text-center">
      <span className=" text-[17px]">
        <span>{asset.shortName}</span> Balance
        <span> on {chain.fullName}</span>
      </span>
      <span className="text-[35px]">
        {assetBalance ? assetBalance : 0}
        {assetBalance ? <span>{` ${asset.shortName}`}</span> : null}
      </span>
      <span className=" text-[17px] text-gray-500">$ 10.67</span>
    </div>
  );
};
const BalanceDisplay = ({
  asset,
  chain,
  isNative,
}: {
  asset: any;
  chain: any;
  isNative: boolean;
}) => {
  const [balance, setBalance] = useState<string | undefined>(undefined);
  const [assetBalance, setAssetBalance] = useState<number>(0);
  const { library, account, chainId } = useWeb3React();
  const { assetBalances } = useGlobalState()

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
    <>
      {isNative ? (
        <NativeDisplay chain={chain} balance={balance} chainId={chainId} />
      ) : (
        <TokenDisplay asset={asset} chain={chain} assetBalance={assetBalance} />
      )}
    </>
  );
};

export default BalanceDisplay