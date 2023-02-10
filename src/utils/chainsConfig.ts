import { Asset, Chain, chains } from "@renproject/chains";

import { RenNetwork } from "@renproject/utils";
import { Icon } from "../components/Icons/AssetLogs/Icon";;
import { AssetChainsConfig } from "./assetsConfig";
import {
  createNetworkConfig,
  createNetworksConfig,
  NetworkConfig,
  NetworksConfig
} from "./networksConfig";
import { SvgIconProps } from "@material-ui/core";
import { SvgIconComponent } from "@material-ui/icons";
import { chainsColors } from "./chainColours";


export type CustomSvgIconComponent =
    //@ts-ignore
  | FunctionComponent<SvgIconProps>
  | SvgIconComponent;


export type ChainIconsConfig = {
  Icon: string | null;
};

export type ChainLabelsConfig = {
  fullName: string;
  shortName: string;
  mainnetChainId?: number;
  testnetChainId?: number;

};

export type ChainNetworksConfig = {
  networks?: NetworksConfig;
};

type ChainBaseConfig = ChainIconsConfig &
  ChainLabelsConfig &
  ChainNetworksConfig & {};

export type ChainColorConfig = {
  color: string;
};

export type ChainConfig = ChainBaseConfig & ChainColorConfig & {};

const unsetChainConfig: ChainBaseConfig = {
  Icon: null,
  fullName: "",
  shortName: "",
};

export const chainsBaseConfig: Record<Chain, ChainBaseConfig> = {
  Arbitrum: {
    Icon: "Arbitrum",
    fullName: "Arbitrum",
    shortName: "Arbitrum",
    networks: createNetworksConfig(42161, 421613),
    mainnetChainId: 42161,
    testnetChainId: 421613,
  },
  Avalanche: {
    Icon: "Avalanche",
    fullName: "Avalanche",
    shortName: "Avalanche",
    networks: createNetworksConfig(43114, 43113),
    mainnetChainId: 43114,
    testnetChainId: 43113,
  },
  BinanceSmartChain: {
    Icon: "BinanceSmartChain",
    fullName: "BinanceSmartChain",
    shortName: "BSC",
    networks: createNetworksConfig(56, 97),
    mainnetChainId: 56,
    testnetChainId: 97
  },
  Bitcoin: {
    Icon: "Bitcoin",
    fullName: "Bitcoin",
    shortName: "Bitcoin",
  },
  BitcoinCash: {
    Icon: "BitcoinCash",
    fullName: "Bitcoin Cash",
    shortName: "Bitcoin Cash",
  },
  Dogecoin: {
    Icon: "DogeCoin",
    fullName: "Dogecoin",
    shortName: "Dogecoin",
  },
  Ethereum: {
    Icon: "Ethereum",
    fullName: "Ethereum",
    shortName: "Eth",
    networks: {
      ...createNetworkConfig(RenNetwork.Mainnet, 1),
      ...createNetworkConfig(RenNetwork.Testnet, 5, "Goerli Testnet"),
    },
    mainnetChainId: 1,
    testnetChainId: 5
  },
  Goerli: {
    Icon: "Ethereum",
    fullName: "Goerli Testnet",
    shortName: "Goerli",
    networks: createNetworksConfig(1, 5),
    mainnetChainId: 1,
    testnetChainId: 1
  },
  Fantom: {
    Icon: "Fantom",
    fullName: "Fantom",
    shortName: "Fantom",
    networks: createNetworksConfig(250, 4002),
    mainnetChainId: 250,
    testnetChainId: 4002
  },
  Kava: {
    Icon: "Kava",
    shortName: "Kava",
    fullName: "Kava",
    networks: createNetworksConfig(2222, 2221),
    mainnetChainId: 2222,
    testnetChainId: 2221
  },
  Moonbeam: {
    Icon: "Moonbeam",
    fullName: "Moonbeam",
    shortName: "Moonbeam",
    networks: createNetworksConfig(1284, 1287),
    mainnetChainId: 1284,
    testnetChainId: 1287
  },
  Optimism: {
    Icon: "Optimism",
    fullName: "Optimism",
    shortName: "Optimism",
    networks: createNetworksConfig(10, 69),
    mainnetChainId: 10,
    testnetChainId: 69
  },
  Polygon: {
    Icon: "Polygon",
    fullName: "Polygon",
    shortName: "Polygon",
    networks: createNetworksConfig(137, 80001),
    mainnetChainId: 137,
    testnetChainId: 80001
  },
  Zcash: {
    Icon: "Zcash",    
    fullName: "Zcash",
    shortName: "Zcash",
  },
  DigiByte: {
    Icon: "DigiByte",
    fullName: "DigiByte",
    shortName: "DigiByte",
  },
  Filecoin: {
    Icon: "Filecoin",
    fullName: "Filecoin",
    shortName: "Filecoin",
  },
  Terra: {
    Icon: "Terra",    
    fullName: "Terra",
    shortName: "Terra",
  },
  Solana: {
    Icon: "Solana",
    fullName: "Solana",
    shortName: "Solana",
    networks: createNetworksConfig(1, 2, RenNetwork.Mainnet, RenNetwork.Testnet),
    mainnetChainId: 1,
    testnetChainId: 2
  },
  Catalog: unsetChainConfig,
};

const getChainColorConfig = (chain: Chain) => {
  const color = chainsColors[chain];
  return color.primary;
};
export const chainsConfig = Object.fromEntries(
  Object.entries(chainsBaseConfig).map(([chain, config]) => [
    chain,
    {
      ...config,
      color: getChainColorConfig(chain as Chain),
    },
  ])
) as Record<Chain, ChainConfig>;

export const getChainConfig = (chain: Chain | string) => {
  const config = chainsConfig[chain as Chain];
  if (!config) {
    throw new Error(`Chain config not found for ${chain}`);
  }
  return config;
};

export const getChainNetworks = (chain: Chain) => {
  const chainConfig = getChainConfig(chain);
  if (!chainConfig.networks) {
    throw new Error(`Chain networks config not found for ${chain}`);
  }
  return chainConfig.networks;
};

export const getChainNetworkConfig = (chain: Chain, network: RenNetwork) => {
  const networks = getChainNetworks(chain);
  if (!networks[network]) {
    throw new Error(`Network config incomplete for ${chain} ${network}`);
  }
  return networks[network] as NetworkConfig;
};

type AssetChainsData = AssetChainsConfig & {
  asset: Asset;
};

export const supportedDepositChains: Array<Chain> = [
  Chain.Bitcoin,
  Chain.BitcoinCash,
  Chain.Dogecoin,
  Chain.Zcash,
  Chain.DigiByte,
  Chain.Terra,
  Chain.Filecoin,
];

export const isDepositBaseChain = (chain: Chain) =>
  supportedDepositChains.includes(chain);

export const supportedEthereumChains: Array<Chain> = [
  //TODO: hacky till Goerli became default Ethereum testnet in renJS
  Chain.Ethereum,
  Chain.BinanceSmartChain,
  Chain.Fantom,
  Chain.Polygon,
  Chain.Avalanche,
  Chain.Arbitrum,
  Chain.Kava,
  Chain.Moonbeam,
  Chain.Optimism,
];

export const isEthereumBaseChain = (chain: Chain) =>
  supportedEthereumChains.includes(chain);

export const supportedSolanaChains: Array<Chain> = [Chain.Solana];

export const isSolanaBaseChain = (chain: Chain) =>
  supportedSolanaChains.includes(chain);

export const isContractBaseChain = (chain: Chain) => {
  return isEthereumBaseChain(chain) || isSolanaBaseChain(chain);
};

export const contractChains = [
  ...supportedEthereumChains,
  ...supportedSolanaChains,
];

const mintChains = [...supportedEthereumChains, ...supportedSolanaChains];

export const isChainConnectionRequired = (chain: Chain) =>
  contractChains.includes(chain);

export const assetChainsArray = Object.values(chains).reduce(
  (acc, chain) => [
    ...acc,
    ...Object.values(chain.assets).map((asset) => ({
      asset: asset as Asset,
      lockChain: chain.chain as Chain,
      mintChains: mintChains.filter((mintChain) => mintChain !== chain.chain),
      lockChainConnectionRequired: isChainConnectionRequired(
        chain.chain as Chain
      ),
    })),
  ],
  [] as Array<AssetChainsData>
);

export const getAssetChainsConfig = (asset: Asset, nullForNotFound = false) => {
  const info = assetChainsArray.find((entry) => entry.asset === asset);
  if (!info) {
    if (nullForNotFound) {
      return null;
    } else {
      throw new Error(`Chain mapping for ${asset} not found.`);
    }
  }
  return {
    lockChain: info.lockChain,
    mintChains: info.mintChains,
    lockChainConnectionRequired: info.lockChainConnectionRequired,
  } as AssetChainsConfig;
};

export const supportedContractChains = contractChains;

export const supportedAllChains = [
  ...supportedContractChains,
  ...supportedDepositChains,
];
