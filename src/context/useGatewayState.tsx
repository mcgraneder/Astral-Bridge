import { Asset, Chain } from "@renproject/chains";
import { Gateway } from "@renproject/ren";
import { supportedAssets } from "../utils/assetsConfig";
import { chainsConfig } from "../utils/chainsConfig";
import { ChainInstanceMap, pickChains } from "../utils/networksConfig";
import { getDefaultChains, ChainInstance } from "../bridgeGateway/chainUtils";
import { RenNetwork } from "@renproject/utils";
import { useWeb3React } from "@web3-react/core";
import RenJS from "@renproject/ren";
import { Bitcoin } from "@renproject/chains-bitcoin";
import { Ethereum } from "../bridgeGateway/Ethereum";
import {
  useEffect,
  useState,
  useCallback,
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";

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
  initProvider: (
    fromChain: Chain,
    destinationChain: Chain
  ) => Promise<RenJS | undefined>;
  renJs: RenJS | null;
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

  const { library } = useWeb3React();
  const [renJs, setRenJs] = useState<RenJS | null>(null);
  const [error, setError] = useState(null);
  const [gateway, setGateway] = useState<Gateway | null>(null);

  const initProvider = useCallback(
    async (fromChain: Chain, toChain: Chain): Promise<RenJS | undefined> => {
      if (!library) {
        return;
      }
      const chains = Object.values(defaultChains).filter((chain) => {
        return chain.chain.chain != fromChain || chain.chain.chain != toChain;
      });
      const supported = chains.map((chain: ChainInstance) => chain.chain);
      const renJs = new RenJS(RenNetwork.Testnet).withChains(...supported);
      setRenJs(renJs);
      return renJs;
    },
    [library, defaultChains]
  );

    useEffect(() => {
      if (!defaultChains || library) {
        return;
      }
      const initProvider = async () => {
        const chainsArray = Object.values(defaultChains).map((chain) => {
          //@ts-ignore
          // chain.chain.withSigner(library.getSigner());
          return chain.chain;
        });
        const renJs = new RenJS(RenNetwork.Testnet).withChains(...chainsArray);
        console.log(renJs)
        return renJs;
      };
      initProvider()
        .then((renJs) => {
          setRenJs(renJs)})
        .catch((error) => {
          console.error("gateway renJs error", error);
          setError(error);
        });
        console.log(renJs)
    }, [defaultChains, library, renJs]);

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
        initProvider,
        renJs,
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
