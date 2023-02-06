import React, { useEffect, useState, useCallback } from "react";
import getContract from "../utils/getContract";
import getBlockTimestampABI from "../constants/ABIs/MulticallABI.json";
import { BigNumber } from "ethers";
import useBlockNumber from "./useBlockNumber";
import { useWeb3React } from '@web3-react/core';

const contractAddress = "0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696"; //need to deploy on mainnet

const useCurrentBlockTimestamp = () => {
  const [currentBlockTimeStamp, setCurrentBlockTimestamp] = useState<BigNumber | undefined>(
    undefined
  );
  const blockNumber = useBlockNumber();
  const { library: provider, account: address } = useWeb3React();

  const getCurrenTimestamp = useCallback(async () => {
    if (provider && address) {
      const contract = getContract(contractAddress, getBlockTimestampABI, provider, address);
      const blockTime = await contract.getCurrentBlockTimestamp();
      setCurrentBlockTimestamp(blockTime);
    }
  }, [provider, address]);

  useEffect(() => {
    getCurrenTimestamp();
  }, [provider, address, getCurrenTimestamp, blockNumber]);

  return currentBlockTimeStamp;
};

export default useCurrentBlockTimestamp;
