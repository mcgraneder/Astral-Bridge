import { RenNetwork } from "@renproject/utils";

import { EthereumBaseChain } from "@renproject/chains-ethereum";
import { resolveEVMNetworkConfig } from "@renproject/chains-ethereum";
import { EVMNetworkConfig } from "@renproject/chains-ethereum";

const ethereumMainnetConfig: EVMNetworkConfig = {
  selector: "Ethereum",

  nativeAsset: { name: "Ether", symbol: "ETH", decimals: 18 },
  averageConfirmationTime: 15,

  config: {
    chainId: "0x1",
    chainName: "Ethereum Mainnet",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    rpcUrls: [
      "https://mainnet.infura.io/v3/ac9d2c8a561a47739b23c52e6e7ec93f",
      "https://mainnet.infura.io/v3/${INFURA_API_KEY}",
      "wss://mainnet.infura.io/ws/v3/${INFURA_API_KEY}",
      "https://api.mycryptoapi.com/eth",
    ],
    blockExplorerUrls: ["https://etherscan.io"],
  },

  addresses: {
    GatewayRegistry: "0xf36666C230Fa12333579b9Bd6196CB634D6BC506",
    BasicBridge: "0x82DF02A52E2e76C0c233367f2fE6c9cfe51578c5",
  },
};


export const goerliConfig: EVMNetworkConfig = {
  selector: "Goerli",

  nativeAsset: { name: "Görli Ether", symbol: "gETH", decimals: 18 },
  averageConfirmationTime: 15,

  config: {
    chainId: "0x5",
    chainName: "Görli",
    nativeCurrency: {
      name: "Görli Ether",
      symbol: "GOR",
      decimals: 18,
    },
    rpcUrls: [
      "https://goerli.infura.io/v3/ac9d2c8a561a47739b23c52e6e7ec93f",
      "https://goerli.infura.io/v3/${INFURA_API_KEY}",
      "https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}",
      "wss://goerli.infura.io/v3/${INFURA_API_KEY}",
      "wss://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}",
    ],
    blockExplorerUrls: ["https://goerli.etherscan.io"],
  },

  addresses: {
    GatewayRegistry: "0x5076a1F237531fa4dC8ad99bb68024aB6e1Ff701",
    BasicBridge: "0xcb6bD6B6c7D7415C0157e393Bb2B6Def7555d518",
  },
};

export const defaultConfigMap: EthereumBaseChain["configMap"] = {
  [RenNetwork.Mainnet]: ethereumMainnetConfig,
  [RenNetwork.Testnet]: goerliConfig,
};

export const goerliConfigMap: EthereumBaseChain["configMap"] = {
  [RenNetwork.Mainnet]: ethereumMainnetConfig,
  [RenNetwork.Testnet]: goerliConfig,
};

export enum EthereumTestnet {
  Goerli = "goerli",
  Görli = "goerli",
  Kovan = "kovan",
}

const defaultAssets = {
  ETH: "ETH" as const,
  USDC: "USDC" as const,
  USDT: "USDT" as const,
};

const goerliAssets = {
  ETH: "gETH" as const,
  USDT: "USDT_Goerli" as const,

  // Goerli only
  gETH: "gETH" as const,
  USDT_Goerli: "USDT_Goerli" as const,
  ETH_Goerli: "gETH" as const,
};

/**
 * The Ethereum RenJS implementation.
 */
export class Ethereum extends EthereumBaseChain {
  public static chain = "Ethereum" as const;
  public static configMap = defaultConfigMap;
  public static assets = {
    ...goerliAssets,
    ...defaultAssets,
  };

  public configMap = Ethereum.configMap;
  public assets = Ethereum.assets;

  public constructor({
    network,
    defaultTestnet,
    ...params
  }: ConstructorParameters<typeof EthereumBaseChain>[0] & {
    defaultTestnet: EthereumTestnet | `${EthereumTestnet}`;
  }) {
    super({
      ...params,
      network: resolveEVMNetworkConfig(
        defaultTestnet === EthereumTestnet.Görli
          ? goerliConfigMap
          : defaultConfigMap,
        network
      ),
    });
    this.configMap =
      defaultTestnet === EthereumTestnet.Görli
        ? goerliConfigMap
        : defaultConfigMap;
    this.assets = (
      defaultTestnet === EthereumTestnet.Görli && network === RenNetwork.Testnet
        ? goerliAssets
        : defaultAssets
    ) as typeof this.assets;
  }
}
