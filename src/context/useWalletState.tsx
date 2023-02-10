import { createContext, Dispatch, SetStateAction, useCallback, useContext, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { injected, walletconnect } from "../connection/providers";
import { NoEthereumProviderError, UserRejectedRequestError as UserRejectedRequestErrorInjected } from "@web3-react/injected-connector";
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from "@web3-react/walletconnect-connector";
import { WalletInfo } from "../connection/wallets";
import { AbstractConnector } from "@web3-react/abstract-connector";
import { CHAINS, ChainType, ChainIdToRenChain } from '../connection/chains';
import { assetsBaseConfig } from '../utils/assetsConfig';
import { chainsBaseConfig } from '../utils/chainsConfig';
import { get } from "../services/axios";
import API from "../constants/Api";
import {
  fetchMarketDataGasPrices,
  MINT_GAS_UNIT_COST,
} from "../utils/market/getMarketGasData";
import { ethers } from "ethers";
import { toFixed } from "../utils/misc";
import { Tab } from "../components/WalletModal/WalletModal";
import { useApproval } from "../hooks/useApproval";
import { chainAdresses } from "../constants/Addresses";
import { ERC20ABI } from "@renproject/chains-ethereum/contracts";
import RenBridgeABI from "../constants/ABIs/RenBridgeABI.json";
import { BridgeDeployments } from "../constants/deployments";
import BigNumber from "bignumber.js";
import { useGlobalState } from "./useGlobalState";
import { useNotification } from './useNotificationState';

interface WalletProviderProps {
  children: React.ReactNode;
}

type WalletContextType = {
  asset: any;
  setAsset: any;
  chain: any;
  setChain: any;
  walletAssetType: string;
  setWalletAssetType: any;
  supportedMintAssets: string[];
  gasPrice: any;
  transactionFailed: boolean;
  pending: boolean;
  confirmation: boolean;
  rejected: boolean;
  toggleTransactionFailedModal: () => void;
  togglePendingModal: () => void;
  toggleRejectedModal: () => void;
  toggleConfirmationModal: () => void;
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  buttonState: Tab;
  setButtonState: Dispatch<SetStateAction<Tab>>;
  handleTransaction: (
    transactionType: string,
    amount: string,
    chain: string,
    asset: string
  ) => Promise<void>;
  handleApproval: (asset: string, chain: any, amount: string) => Promise<void>;
  isAssetApproved: boolean;
  setIsAssetApproved: Dispatch<SetStateAction<boolean>>;
  submitted: boolean;
  toggleSubmittedModal: () => void;
};

const WalletContext = createContext({} as WalletContextType);

function WalletProvider({ children }: WalletProviderProps) {
  const [transactionFailed, setTransactionFailed] = useState<boolean>(false);
  const [rejected, setRejected] = useState<boolean>(false);
  const [confirmation, setConfirmation] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const [pending, setPending] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [buttonState, setButtonState] = useState<Tab>({
    tabName: "Deposit",
    tabNumber: 0,
    side: "left",
  });
  const [isAssetApproved, setIsAssetApproved] = useState<boolean>(false);
  const [gasPrice, setGasPrice] = useState<any>(0);
  const [assetPrices, setAssetPrices] = useState<any>([]);
  const [asset, setAsset] = useState<any>(assetsBaseConfig.BTC);
  const [chain, setChain] = useState<any>(chainsBaseConfig.Ethereum);
  const [walletAssetType, setWalletAssetType] = useState<"chain" | "currency">(
    "chain"
  );
  const [supportedMintAssets, setSupportedMintAssets] = useState<Array<string>>(
    []
  );
  const { chainId, library, active, account } = useWeb3React();
  const { pendingTransaction, setPendingTransaction } = useGlobalState();
  const { init, approve } = useApproval();
  const dispatch = useNotification();

  const HandleNewNotification = (title: string, message: string) => {
    dispatch({
      type: "info",
      message: message,
      title: title,
      position: "topR" || "topR",
      success: true,
    });
  };

  const toggleTransactionFailedModal = useCallback(
    () => setTransactionFailed(false),
    [setTransactionFailed]
  );
  const togglePendingModal = useCallback(
    () => setPending((c: boolean) => !c),
    [setPending]
  );
  const toggleRejectedModal = useCallback(
    () => setRejected((w: boolean) => !w),
    [setRejected]
  );

  const toggleConfirmationModal = useCallback(
    () => setConfirmation((w: boolean) => !w),
    [setConfirmation]
  );

  const toggleSubmittedModal = useCallback(
    () => setSubmitted((w: boolean) => !w),
    [setSubmitted]
  );

  const fetchSupportedMintAssets = useCallback(async () => {
    if (!chainId) return;
    const mintAssetsResponse = await get<{
      result: string[];
    }>(API.ren.bridgeTokens, {
      params: { chainName: ChainIdToRenChain[chainId!] },
    });

    if (!mintAssetsResponse) {
      throw new Error("Multicall Failed");
    }
    setSupportedMintAssets(mintAssetsResponse.result);
  }, [setSupportedMintAssets, chainId]);

  useEffect(() => {
    if (!chainId) return;
    fetchSupportedMintAssets();
  }, [chainId, fetchSupportedMintAssets]);

  const fetchGasData = useCallback(() => {
    fetchMarketDataGasPrices("fast").then((price) => {
      const totalGas = Number(
        ethers.utils.formatEther((price * MINT_GAS_UNIT_COST).toString())
      );
      setGasPrice(toFixed(totalGas, 7));
    });
  }, []);

  useEffect(() => {
    if (!library) {
      fetchGasData();
      const intervalId = setInterval(fetchGasData, 30000);
      return () => clearInterval(intervalId);
    }
  }, [fetchGasData, library]);

  const handleDeposit = useCallback(async (amount: string) => {
    console.log("aaaaaa");
    const approvalResponse = await get<{
      result: any;
    }>(API.ren.getTokenApproval, {
      params: { chainName: chain, assetName: asset, account: account },
    });

    console.log(approvalResponse);
    if (!approvalResponse) {
      togglePendingModal();
      toggleRejectedModal();
      throw new Error("Multicall Failed");
    }
    const bridgeAddress =
      chainAdresses[ChainIdToRenChain[chainId!]!]?.bridgeAddress!;
    if (Number(approvalResponse.result) <= 0) {
      const success = await approve(
        chainAdresses[ChainIdToRenChain[chainId!]!]?.assets[asset]
          ?.tokenAddress!,
        amount,
        bridgeAddress
      );
    }
    const bridgeContract = await init(bridgeAddress, RenBridgeABI, true);
    const depositTx = await bridgeContract?.transferFrom(
      account,
      bridgeAddress,
      amount
    );
    const depositReceipt = await depositTx.wait(1);
    togglePendingModal();
  }, []);

  const handleWithdrawal = useCallback(async () => {}, []);

  const handleApproval = useCallback(
    async (asset: any, chain: any, amount: string): Promise<void> => {
      if (!library) return;
      setPending(true);
      setPendingTransaction(true);
      setConfirmation(false);
      const tokenAddress =
        chainAdresses[chain.fullName]?.assets[asset.Icon]?.tokenAddress!;
      const bridgeAddress = BridgeDeployments[chain.fullName];
      const signer = await library.getSigner();
      const tokenContract = new ethers.Contract(tokenAddress, ERC20ABI, signer);

      try {
        const approvalTx = await tokenContract.approve(bridgeAddress, "0");
        setPending(false);
        setSubmitted(true);
        await approvalTx.wait(1);
        setPendingTransaction(false);
        HandleNewNotification("Approval Success", `Successfully approved asset ${asset.Icon} on ${chain.fullName}`)
      } catch (error) {
        setPending(false);
        setPendingTransaction(false);
        setRejected(true);
      }
    },
    [library]
  );

  const handleTransaction = useCallback(
    async (
      transactionType: string,
      amount: string,
      chain: string,
      asset: string
    ): Promise<void> => {
      console.log("hey");
      //   if (!active) return;
      console.log(transactionType);
      if (transactionType === "Deposit") {
        console.log("oooof");
        handleDeposit(amount);
      }
      //   else handleWithdrawal();
    },
    []
  );

  return (
    <WalletContext.Provider
      value={{
        asset,
        setAsset,
        chain,
        setChain,
        walletAssetType,
        setWalletAssetType,
        supportedMintAssets,
        gasPrice,
        transactionFailed,
        pending,
        confirmation,
        rejected,
        toggleTransactionFailedModal,
        togglePendingModal,
        toggleRejectedModal,
        toggleConfirmationModal,
        text,
        setText,
        buttonState,
        setButtonState,
        handleTransaction,
        handleApproval,
        isAssetApproved,
        setIsAssetApproved,
        submitted,
        toggleSubmittedModal,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

const useWallet = () => {
    return useContext(WalletContext);
};

export { WalletProvider, useWallet };
