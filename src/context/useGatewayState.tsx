import { Asset, Chain } from "@renproject/chains";
import { Gateway } from "@renproject/ren";
import { supportedAssets } from "../utils/assetsConfig";
import { chainsConfig } from "../utils/chainsConfig";
import { getDefaultChains, ChainInstanceMap } from "../utils/networksConfig";
import { RenNetwork } from "@renproject/utils";
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
  asset: Asset;
  from: Chain;
  to: Chain;
  amount: string;
  toAddress: string;
  toContractAddress: string;
  gateway: Gateway | null;
  setAsset: Dispatch<SetStateAction<Asset>>;
  setFrom: Dispatch<SetStateAction<Chain>>;
  setTo: Dispatch<SetStateAction<Chain>>;
  // setFromTo: Dispatch<SetStateAction<Chain>>,
  setAmount: Dispatch<SetStateAction<string>>;
  setToAddress: Dispatch<SetStateAction<string>>;
  setToContractAddress: Dispatch<SetStateAction<string>>;
  setGateway: Dispatch<SetStateAction<Gateway<any, any> | null>>;
  allAssets: string[];
  allChains: string[];
  getIoTypeFromPath: (
    path: string
  ) => GatewayIOType.lockAndMint | GatewayIOType.burnAndRelease;
  defaultChains: ChainInstanceMap;
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

  const [asset, setAsset] = useState<Asset>(Asset.gETH);
  const [from, setFrom] = useState<Chain>(Chain.Ethereum);
  const [to, setTo] = useState<Chain>(Chain.Catalog);
  const [amount, setAmount] = useState<string>("");
  const [toAddress, setToAddress] = useState<string>("");
  const [toContractAddress, setToContractAddress] = useState<string>("");
  const [gateway, setGateway] = useState<Gateway | null>(null);

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
        asset,
        from,
        to,
        amount,
        toAddress,
        toContractAddress,
        gateway,
        setAsset,
        setFrom,
        setTo,
        setAmount,
        setToAddress,
        setToContractAddress,
        setGateway,
        allAssets,
        allChains,
        getIoTypeFromPath,
        defaultChains,
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
