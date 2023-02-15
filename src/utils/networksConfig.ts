import { Catalog, Chain, EthProvider, EVMNetworkConfig } from "@renproject/chains";
import { RenNetwork } from "@renproject/utils";
import { getChainNetworkConfig } from "./chainsConfig";
import { providers } from "ethers"
import { Ethereum } from '@renproject/chains-ethereum';
import { EthereumBaseChain } from '@renproject/chains-ethereum/base';
import { BitcoinBaseChain, Bitcoin } from '@renproject/chains-bitcoin';
import { Chain as GatewayChain } from "@renproject/utils";

export type NetworkConfig = {
  id: string | number;
  fullName: string;
  shortName?: string;
};

export type NetworksConfig = Partial<Record<RenNetwork, NetworkConfig>>;

export const createNetworkConfig = (
  network: RenNetwork,
  id: string | number,
  name = network as string
) => {
  const fullName = network === RenNetwork.Mainnet ? "Mainnet" : "Testnet";
  return {
    [network]: {
      id,
      fullName,
    },
  } as Record<RenNetwork, NetworkConfig>;
};

export const createNetworksConfig = (
  mainnetId: string | number,
  testnetId: string | number,
  mainnetName = RenNetwork.Mainnet,
  testnetName = RenNetwork.Testnet
) => {
  return {
    ...createNetworkConfig(RenNetwork.Mainnet, mainnetId, mainnetName),
    ...createNetworkConfig(RenNetwork.Testnet, testnetId, testnetName),
  } as Record<RenNetwork, NetworkConfig>;
};

type NetworkIdMapper = (id: string | number) => RenNetwork;

export const createNetworkIdMapper = (chain: Chain) => {
  const mainnet = getChainNetworkConfig(chain, RenNetwork.Mainnet);
  const testnet = getChainNetworkConfig(chain, RenNetwork.Testnet);

  const mapper: NetworkIdMapper = (id) => {
    const parsedId = parseInt(id as string).toString();
    if (mainnet.id === id || parsedId === mainnet.id.toString()) {
      return RenNetwork.Mainnet;
    } else if (testnet.id === id || parsedId === testnet.id.toString()) {
      return RenNetwork.Testnet;
    } else {
      console.warn(`Network mapping failed for ${chain}:${id}`);
      return RenNetwork.Testnet; // hack to show correct wrong network info
    }
  };
  return mapper;
};

const network: RenNetwork = RenNetwork.Testnet;

export interface ChainInstance<C = GatewayChain> {
  chain: C;
  connectionRequired?: boolean;
  accounts?: string[];
}

export type ChainInstanceMap = Record<Chain, ChainInstance>;
export type PartialChainInstanceMap = Partial<ChainInstanceMap>;

interface EVMConstructor<EVM> {
  configMap: {
    [network in RenNetwork]?: EVMNetworkConfig;
  };
  new ({
    network,
    provider,
  }: {
    network: RenNetwork;
    provider: EthProvider;
  }): EVM;
}

const getEVMDefaultProvider = (
  ChainClass: EVMConstructor<any>,
  network: RenNetwork,
  configMap = ChainClass.configMap
) => {
  const config = configMap[network];
  if (!config) {
    throw new Error(`No configuration for ${ChainClass.name} on ${network}.`);
  }

  let rpcUrl = config.config.rpcUrls[0];
  // if (env.INFURA_ID) {
  //   for (const url of config.config.rpcUrls) {
  //     if (url.match(/^https:\/\/.*\$\{INFURA_API_KEY\}/)) {
  //       rpcUrl = url.replace(/\$\{INFURA_API_KEY\}/, env.INFURA_ID);
  //       break;
  //     }
  //   }
  // }

  let provider = new providers.JsonRpcProvider(rpcUrl);

  return provider;
};

export const getEthereumChain = (
  network: RenNetwork
): ChainInstance & {
  chain: Ethereum;
} => {
  const provider = getEVMDefaultProvider(Ethereum as unknown as any, network);
  const signer = provider.getSigner(
    "0x13480Ea818fE2F27b82DfE7DCAc3Fd3E63A94113"
  );
  return {
    chain: new Ethereum({
      network,
      provider,
      // @ts-ignore
      signer: signer,
      defaultTestnet: "goerli",
    }),
    connectionRequired: true,
    accounts: [],
  };
};

export const getEthereumBaseChain = <EVM extends EthereumBaseChain>(
  ChainClass: EVMConstructor<EVM>,
  network: RenNetwork
): ChainInstance & {
  chain: EVM;
} => {
  const config = ChainClass.configMap[network];
  if (!config) {
    throw new Error(`No configuration for ${ChainClass.name} on ${network}.`);
  }
  const provider = getEVMDefaultProvider(ChainClass, network);
  //   const signer = provider.getSigner("0x13480Ea818fE2F27b82DfE7DCAc3Fd3E63A94113")

  return {
    chain: new ChainClass({
      network,
      provider,
    }),
    connectionRequired: true,
    accounts: [],
  };
};

const getBitcoinBaseChain = <BTC extends BitcoinBaseChain>(ChainClass: BTC) => {
  return {
    chain: ChainClass,
  };
};

export const getDefaultChains = (network: RenNetwork): ChainInstanceMap => {
  const ethereumBaseChains = {
    [Chain.Ethereum]: getEthereumChain(network),
    // [Chain.Goerli]: getEthereumBaseChain(Goerli, network),
    [Chain.Catalog]: getEthereumBaseChain(Catalog, network),
  };

  const bitcoinBaseChains = {
    [Chain.Bitcoin]: getBitcoinBaseChain(new Bitcoin({ network })),
  };

  return {
    ...ethereumBaseChains,
    ...bitcoinBaseChains,
  } as unknown as ChainInstanceMap;
};

export const supportedEthereumChains: Array<Chain> = [
  network === RenNetwork.Mainnet ? Chain.Ethereum : Chain.Goerli,
];

export const isEthereumBaseChain = (chain: Chain) =>
  supportedEthereumChains.includes(chain);

export const pickChains = (
  chains: ChainInstanceMap,
  from: Chain,
  to: Chain
) => {
  const pickedChains = { [from]: chains[from], [to]: chains[to] };
  return pickedChains;
};
