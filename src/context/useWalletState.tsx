import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useWeb3React } from "@web3-react/core";
import { ChainIdToRenChain } from "../connection/chains";
import { assetsBaseConfig } from "../utils/assetsConfig";
import { chainsBaseConfig } from "../utils/chainsConfig";
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
import { useGlobalState } from "./useGlobalState";
import { useNotification } from "./useNotificationState";
import { useTransactionFlow } from "./useTransactionFlowState";
import useEcecuteTransaction from "../hooks/useExecuteTransaction";

interface WalletProviderProps {
  children: React.ReactNode;
}

type WalletContextType = {
  asset: any;
  setAsset: any;
  chain: any;
  setChain: any;
  walletAssetType: "chain" | "currency";
  setWalletAssetType: Dispatch<SetStateAction<"chain" | "currency">>;
  supportedMintAssets: string[];
  gasPrice: any;
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  buttonState: Tab;
  setButtonState: Dispatch<SetStateAction<Tab>>;
  handleTransaction: (
    transactionType: string,
    amount: string,
    chain: any,
    asset: any
  ) => Promise<void>;
};

const WalletContext = createContext({} as WalletContextType);

function WalletProvider({ children }: WalletProviderProps) {
  const [text, setText] = useState<string>("");
  const [gasPrice, setGasPrice] = useState<any>(0);
  const [asset, setAsset] = useState<any>(assetsBaseConfig.BTC);
  const [chain, setChain] = useState<any>(chainsBaseConfig.Ethereum);
  const [buttonState, setButtonState] = useState<Tab>({
    tabName: "Deposit",
    tabNumber: 0,
    side: "left",
  });
  const [walletAssetType, setWalletAssetType] = useState<"chain" | "currency">(
    "chain"
  );
  const [supportedMintAssets, setSupportedMintAssets] = useState<Array<string>>(
    []
  );
  const { chainId, library, account } = useWeb3React();
  const { executeTransaction } = useEcecuteTransaction();
  const { pendingTransaction } = useGlobalState()

  useEffect(() => setText(""), [buttonState, pendingTransaction])

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

  const handleTransaction = useCallback(async (
      transactionType: string,
      amount: string,
      chain: any,
      asset: any
    ): Promise<void> => {
      const bridgeAddress = BridgeDeployments[chain.fullName];
      const tokenAddress =
        chainAdresses[chain.fullName]?.assets[asset.Icon]?.tokenAddress!;

        console.log(chain, asset)
      if (transactionType === "Deposit") {
        const bridgeContract = new ethers.Contract(
          bridgeAddress!,
          RenBridgeABI,
          await library.getSigner()
        );
        await executeTransaction(
          asset,
          chain,
          ["100", tokenAddress],
          bridgeContract.transferFrom
        );
      } else if (transactionType === "Withdraw") {
        const bridgeContract = new ethers.Contract(
          bridgeAddress!,
          RenBridgeABI,
          await library.getSigner()
        );
        await executeTransaction(
          asset,
          chain,
          [account, "10", tokenAddress],
          bridgeContract.transfer
        );
      }
    },
    [library, account, asset, chain]
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
        text,
        setText,
        buttonState,
        setButtonState,
        handleTransaction,
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
