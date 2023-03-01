import { Asset, Chain } from "@renproject/chains";
import { Gateway, GatewayTransaction } from "@renproject/ren";
import {
  supportedAssets,
  assetsBaseConfig,
  AssetBaseConfig,
} from "../utils/assetsConfig";
import { chainsConfig, isEthereumBaseChain } from '../utils/chainsConfig';
import { ChainInstanceMap } from "../utils/networksConfig";
import { getDefaultChains } from '../bridgeGateway/chainUtils';
import { RenNetwork } from "@renproject/utils";
import { useWeb3React } from "@web3-react/core";
import RenJS from "@renproject/ren";
import {
  useEffect,
  useState,
  useCallback,
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useRef
} from "react";
import { useGlobalState } from "./useGlobalState";
import { createGateway } from "../utils/gatewayUtils";
import { get, post } from "../services/axios";
import API from "../constants/Api";

interface GatewayProviderProps {
  children: React.ReactNode;
}

type GatewayContextType = {
  gateway: Gateway | null;
  setGateway: Dispatch<SetStateAction<Gateway<any, any> | null>>;
  allAssets: string[];
  allChains: string[];
  getIoTypeFromPath: (
    path: string
  ) => GatewayIOType.lockAndMint | GatewayIOType.burnAndRelease;
  defaultChains: ChainInstanceMap;
  renJs: RenJS | null;
  asset: any;
  setAsset: any;
  listenGatewayTx: boolean;
  setListenGatewayTx: Dispatch<SetStateAction<boolean>>;
  transactions: GatewayTransaction<{
    chain: string;
  }>[];
  setTransactions: Dispatch<
    SetStateAction<
      GatewayTransaction<{
        chain: string;
      }>[]
    >
  >;
  memoizedOnTxReceivedCb: (data: any) => Promise<void>;
};

const GatewayContext = createContext({} as GatewayContextType);

export enum GatewayIOType {
  lockAndMint = "lockAndMint",
  burnAndMint = "burnAndMint",
  burnAndRelease = "burnAndRelease",
}

function GatewayProvider({ children }: GatewayProviderProps) {
  const allAssets = supportedAssets;
  const allChains = Object.keys(chainsConfig);
  const defaultChains = getDefaultChains(RenNetwork.Testnet);
  const { fromChain, destinationChain } = useGlobalState();

    const pendingTxIntervalRef = useRef<any>(null);

  const [listenGatewayTx, setListenGatewayTx] = useState<boolean>(false);
  const { library, account } = useWeb3React();
  const [renJs, setRenJs] = useState<RenJS | null>(null);
  const [error, setError] = useState(null);
  const [gateway, setGateway] = useState<Gateway | null>(null);
  const [asset, setAsset] = useState<AssetBaseConfig>(assetsBaseConfig.BTC);
    const [transactions, setTransactions] = useState<Array<GatewayTransaction>>(
      []
    );
    const [pendingTxs, setPendingTxs] = useState<any[]>([]);
    const addTransaction = useCallback((newTx: GatewayTransaction) => {
      console.info("gateway detected tx:", newTx.hash, newTx);
      setTransactions((txs) => {
        const index = txs.findIndex((tx) => tx.hash === newTx.hash);
        if (index >= 0) {
          return txs.splice(index, 1, newTx);
        }
        return [...txs, newTx];
      });
    }, []);

      const pushPendingTx = useCallback(
        (obj: any) => setPendingTxs((txs) => [...txs, obj]),
        []
      );

    const memoizedOnTxReceivedCb = useCallback(
      async (data: any) => {
        const { exportedTx, renVMTxId } = data;
        const tokenAddress = "0x880Ad65DC5B3F33123382416351Eef98B4aAd7F1";
        const amount = exportedTx.amount;

        const submitMintResponse = await post(API.ren.submitMintRenTx, {
          token: tokenAddress,
          amount,
          to: account!,
          chain: "Ethereum",
          txHash: exportedTx.txHash,
          txIndex: exportedTx.txindex,
        });

        if (!submitMintResponse) {
         console.log("error")
        }
      

       
          pushPendingTx({
            token: "0x880Ad65DC5B3F33123382416351Eef98B4aAd7F1",
            renVMTxId,
            amount,
            type: "deposit",
          });
          // setListenGatewayTx(false);
          // setTokenAmount("0");
          // setCurrentStep(3);

          // setTimeout(() => {
          //   if (selectedToken?.symbol === "BTC") pushFlow("txPending");
          //   setSubmitted(true);
          // }, 1500);
        
      },
      [
        account,
        pushPendingTx
      ]
    );

    
  useEffect(() => {
    const intervalCb = async () => {
      if (!pendingTxs.length) {
        clearInterval(pendingTxIntervalRef.current);
        return;
      }

      pendingTxs.forEach(async (_tx) => {
        const response = await get<any>(API.ren.queryRenTx, {
          params: { txHash: _tx.renVMTxId },
        });
        if (response?.result.txStatus === "done") {

        }
          // memoizedOnTxReceivedCb(_tx, response.result);
      });
    };

    pendingTxIntervalRef.current = setInterval(intervalCb, 5000);
    return () => clearInterval(pendingTxIntervalRef.current);
  }, [pendingTxs]);

  useEffect(() => {
    console.info("gateway useEffect renJs and provider");
    if (!fromChain || !destinationChain || !library) {
      return;
    }
    const initProvider = async () => {
      const f = getDefaultChains(RenNetwork.Testnet)[
        fromChain.fullName as Chain
      ];
      const d = getDefaultChains(RenNetwork.Testnet)[
        destinationChain.fullName as Chain
      ];

      if (isEthereumBaseChain(fromChain.fullName as Chain)) f?.chain?.withSigner?.(library.getSigner())
      if (isEthereumBaseChain(destinationChain.fullName as Chain)) d?.chain?.withSigner?.(library.getSigner())

      const chainsArray = new Array(f.chain, d.chain);
      const renJs = new RenJS(RenNetwork.Testnet).withChains(...chainsArray);
      return renJs;
    };
    initProvider()
      .then((renJs) => {
        setRenJs(renJs);
        console.log(renJs);
      })
      .catch((error) => {
        console.error("gateway renJs error", error);
        setError(error);
      });
  }, [destinationChain, fromChain, library]);

  useEffect(() => {
    if(!library) return
    // setGateway(null); // added
    console.info("gateway useEffect gateway init");
    let newGateway: Gateway | null = null;
    if (renJs && (fromChain || destinationChain) !== null) {
      const initializeGateway = async () => {
        const f = getDefaultChains(RenNetwork.Testnet)[
          fromChain.fullName as Chain
        ];
        const d = getDefaultChains(RenNetwork.Testnet)[
          destinationChain.fullName as Chain
        ];

        const allChains = getDefaultChains(RenNetwork.Testnet)
        if (!f || !d) return
        renJs.withChains(f.chain, d.chain)

              if (isEthereumBaseChain(fromChain.fullName as Chain))
                f?.chain?.withSigner?.(library.getSigner());
              if (isEthereumBaseChain(destinationChain.fullName as Chain))
                d?.chain?.withSigner?.(library.getSigner());


        newGateway = await createGateway(
          renJs,
          {
            asset: asset.Icon as Asset,
            from: fromChain.fullName! as Chain,
            to: destinationChain.fullName! as Chain,
            fromAddress: account!,
            toAddress: account!,
            amount: "1000",
          },
          allChains as Partial<ChainInstanceMap>
        );
     
        newGateway.on("transaction", addTransaction);
        // console.info("gateway transaction listener added");
        // (window as any).gateway = newGateway;
        return newGateway;
      };
      // console.info("gateway initializing", chains);
      initializeGateway()
        .then((newGateway) => setGateway(newGateway!))
        .catch((error) => {
          console.error(error);
          setError(error);
        });
    }

    return () => {
      if (newGateway) {
        console.info("gateway removing listeners");
        newGateway.eventEmitter.removeListener("transaction", addTransaction);
      }
    };
  }, [account, asset, destinationChain, fromChain, renJs, library, addTransaction]);

  const getIoTypeFromPath = (path: string) => {
    if (path === "deposit") {
      return GatewayIOType.lockAndMint;
    } else {
      return GatewayIOType.burnAndRelease;
    }
  };

  return (
    <GatewayContext.Provider
      value={{
        setGateway,
        allAssets,
        allChains,
        getIoTypeFromPath,
        defaultChains,
        gateway,
        renJs,
        asset,
        setAsset,
        listenGatewayTx,
        setListenGatewayTx,
        transactions,
        setTransactions,
        memoizedOnTxReceivedCb,
      }}
    >
      {children}
    </GatewayContext.Provider>
  );
}

const useGateway = () => {
  return useContext(GatewayContext);
};

export { GatewayProvider, useGateway };
