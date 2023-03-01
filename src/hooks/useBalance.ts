import { useState, useEffect, useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import getContract from "../utils/getContract";
import { ERC20ABI } from "@renproject/chains-ethereum/contracts";
import { Contract, ethers } from "ethers";
import { chainAdresses } from "../constants/Addresses";

export const useBalance = (chain: any, asset: any) => {
  const [bridgeBalance, setBridgeBalance] = useState<string>("0");
  const [walletBalance, setWalletBalance] = useState<string>("0");

  const { library, account: address, chainId } = useWeb3React();

  const initContract = useCallback(
    <contract extends Contract = Contract>(
      tokenAddress: string | undefined,
      ABI: any,
      withSignerIfPossible = true
    ): contract | null => {
      if (!tokenAddress || !ABI || !library || !chainId) return null;
      try {
        return getContract(
          tokenAddress,
          ABI,
          library,
          withSignerIfPossible && address ? address : undefined
        ) as contract;
      } catch (err) {
        console.error("Failed to get contract", err);
        return null;
      }
    },
    [library, chainId, address]
  );

  const fetchBalance = useCallback(
    (address: string, setBalance: any) => {
      const tokenContract = initContract(
        chainAdresses[chain.fullName]?.assets[asset.Icon]?.tokenAddress!,
        ERC20ABI,
        false
      );
      const decimals: number = asset.decimals;
    
      if (tokenContract !== null) {
        tokenContract.balanceOf(address).then((balance: ethers.BigNumber) => {
          const formattedBalance = ethers.utils.formatUnits(balance, decimals);
          setBalance(formattedBalance);
       
        });
      }
    },
    [asset, chain, initContract]
  );

  useEffect(() => {
    if (!asset || !chain || !address) return;
    const interval: NodeJS.Timer = setInterval(() => {
      fetchBalance(
        "0x30774f9B5d010E8891625c487fC23f2dbBd5925E",
        setBridgeBalance
      );
      fetchBalance(address!, setWalletBalance);
    }, 5000);

    return () => clearInterval(interval);
  }, [initContract, chain, asset, fetchBalance, address]);

  useEffect(() => {
    fetchBalance(
      "0x30774f9B5d010E8891625c487fC23f2dbBd5925E",
      setBridgeBalance
    );
    fetchBalance(address!, setWalletBalance);
  }, [])

  return { bridgeBalance, walletBalance };
};
