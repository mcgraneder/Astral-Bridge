import { Asset, Chain } from '@renproject/chains';
import { Gateway, GatewayTransaction } from '@renproject/ren';
import {
    supportedAssets,
    assetsBaseConfig,
    AssetBaseConfig
} from '../utils/assetsConfig';
import { chainsConfig, isEthereumBaseChain } from '../utils/chainsConfig';
import { ChainInstanceMap } from '../utils/networksConfig';
import { getDefaultChains } from '../bridgeGateway/chainUtils';
import { RenNetwork } from '@renproject/utils';
import { useWeb3React } from '@web3-react/core';
import RenJS from '@renproject/ren';
import {
    useEffect,
    useState,
    useCallback,
    createContext,
    Dispatch,
    SetStateAction,
    useContext
} from 'react';
import { useGlobalState } from '../context/useGlobalState';
import { createGateway } from '../utils/gatewayUtils';

type GatewayContextType = {
    gateway: Gateway | null;
    setGateway: Dispatch<SetStateAction<Gateway<any, any> | null>>;
    // defaultChains: ChainInstanceMap;
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
};

export enum GatewayIOType {
    lockAndMint = 'lockAndMint',
    burnAndMint = 'burnAndMint',
    burnAndRelease = 'burnAndRelease'
}

function useGatewayProvider(): GatewayContextType {
    // const allAssets = supportedAssets;
    // const allChains = Object.keys(chainsConfig);
    // const defaultChains = getDefaultChains(RenNetwork.Testnet);
    const { fromChain, destinationChain } = useGlobalState();

    const [listenGatewayTx, setListenGatewayTx] = useState<boolean>(false);
    const { library, account } = useWeb3React();
    const [renJs, setRenJs] = useState<RenJS | null>(null);
    const [gateway, setGateway] = useState<Gateway | null>(null);
    const [asset, setAsset] = useState<AssetBaseConfig>(assetsBaseConfig.USDT_Goerli);
    const [transactions, setTransactions] = useState<Array<GatewayTransaction>>(
        []
    );
    const addTransaction = useCallback((newTx: GatewayTransaction) => {
        setTransactions((txs) => {
            const index = txs.findIndex((tx) => tx.hash === newTx.hash);
            if (index >= 0) {
                return txs.splice(index, 1, newTx);
            }
            return [...txs, newTx];
        });
    }, []);

    // useEffect(() => {
    //   console.info("gateway useEffect renJs and provider");
    //   if (!fromChain || !destinationChain || !library) {
    //     return;
    //   }
    //   const initProvider = async () => {
    //     const f = getDefaultChains(RenNetwork.Testnet)[
    //       fromChain.fullName as Chain
    //     ];
    //     const d = getDefaultChains(RenNetwork.Testnet)[
    //       destinationChain.fullName as Chain
    //     ];

    //     if (isEthereumBaseChain(fromChain.fullName as Chain))
    //       f?.chain?.withSigner?.(library.getSigner());
    //     if (isEthereumBaseChain(destinationChain.fullName as Chain))
    //       d?.chain?.withSigner?.(library.getSigner());

    //     const chainsArray = new Array(f.chain, d.chain);
    //     const renJs = new RenJS(RenNetwork.Testnet).withChains(...chainsArray);
    //     return renJs;
    //   };
    //   initProvider()
    //     .then((renJs) => {
    //       setRenJs(renJs);
    //     })
    //     .catch((error) => {
    //       console.error("gateway renJs error", error);
    //     });
    // }, [destinationChain, fromChain, library]);

    // useEffect(() => {
    //   if (!library) return;
    //   // setGateway(null); // added
    //   let newGateway: Gateway | null = null;
    //   if (renJs && (fromChain || destinationChain) !== null) {
    //     const initializeGateway = async () => {
    //       const f = getDefaultChains(RenNetwork.Testnet)[
    //         fromChain.fullName as Chain
    //       ];
    //       const d = getDefaultChains(RenNetwork.Testnet)[
    //         destinationChain.fullName as Chain
    //       ];

    //       const allChains = getDefaultChains(RenNetwork.Testnet);
    //       if (!f || !d) return;
    //       renJs.withChains(f.chain, d.chain);

    //       if (isEthereumBaseChain(fromChain.fullName as Chain))
    //         f?.chain?.withSigner?.(library.getSigner());
    //       if (isEthereumBaseChain(destinationChain.fullName as Chain))
    //         d?.chain?.withSigner?.(library.getSigner());

    //       newGateway = await createGateway(
    //         renJs,
    //         {
    //           asset: asset.Icon as Asset,
    //           from: fromChain.fullName! as Chain,
    //           to: destinationChain.fullName! as Chain,
    //           fromAddress: account!,
    //           toAddress: account!,
    //           amount: "1000",
    //         },
    //         allChains as Partial<ChainInstanceMap>
    //       );

    //       newGateway.on("transaction", addTransaction);
    //       return newGateway;
    //     };
    //     initializeGateway()
    //       .then((newGateway) => setGateway(newGateway!))
    //       .catch((error) => {
    //         console.error(error);
    //       });
    //   }

    //   return () => {
    //     if (newGateway) {
    //       newGateway.eventEmitter.removeListener("transaction", addTransaction);
    //     }
    //   };
    // }, [
    //   account,
    //   asset,
    //   destinationChain,
    //   fromChain,
    //   renJs,
    //   library,
    //   addTransaction,
    // ]);

    return {
        setGateway,
        // defaultChains,
        gateway,
        renJs,
        asset,
        setAsset,
        listenGatewayTx,
        setListenGatewayTx,
        transactions,
        setTransactions
    };
}

export { useGatewayProvider };
