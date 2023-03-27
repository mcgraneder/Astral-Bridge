import { ERC20ABI } from '@renproject/chains-ethereum/contracts';
import { MultiCallService } from '@1inch/multicall';
import { chainAdresses } from '../constants/Addresses';
import BridgeABI from '../constants/ABIs/RenBridgeABI.json';
import TestBridgeABI from '../constants/ABIs/TestBridgeABI.json';
import { Chain } from '@renproject/chains';
import Web3 from 'web3';
import { MultiCallParams } from '@1inch/multicall/model';
import { Web3ProviderConnector } from '@1inch/multicall/connector';
import {
    Polygon,
    BinanceSmartChain,
    Ethereum,
    Optimism,
    Moonbeam,
    Fantom,
    Avalanche,
    Kava,
    Arbitrum
} from '@renproject/chains-ethereum';

type ProviderConfig = {
    gas: number;
    chainId: number;
    url: string;
    accounts: string[];
};
export const PorividerConfig: { [chain: string]: ProviderConfig } = {
    [Polygon.chain]: {
        gas: 3000000,
        chainId: 80001,
        url: 'https://polygon-mumbai.g.alchemy.com/v2/Jcsa7sP9t3l4NPGg2pg9FDUMvVXt4Im-',
        accounts: [process.env.PK1!]
    },
    [BinanceSmartChain.chain]: {
        url: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
        gas: 3000000,
        chainId: 97,
        accounts: [process.env.PK1!]
    },
    [Ethereum.chain]: {
        chainId: 5,
        url: `https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161`,
        gas: 3000000,
        accounts: [process.env.PK1!]
    },
    [Optimism.chain]: {
        chainId: 420,
        url: `https://goerli.optimism.io`,
        gas: 3000000,
        accounts: [process.env.PK1!]
    },
    [Moonbeam.chain]: {
        chainId: 1287,
        url: `https://rpc.api.moonbase.moonbeam.network`,
        gas: 3000000,
        accounts: [process.env.PK1!]
    },
    [Fantom.chain]: {
        chainId: 4002,
        url: `https://fantom-testnet.public.blastapi.io`,
        gas: 3000000,
        accounts: [process.env.PK1!]
    },
    [Avalanche.chain]: {
        chainId: 43113,
        url: `https://api.avax-test.network/ext/bc/C/rpc`,
        gas: 3000000,
        accounts: [process.env.PK1!]
    },
    [Kava.chain]: {
        chainId: 2221,
        url: `https://evm.testnet.kava.io`,
        gas: 3000000,
        accounts: [process.env.PK1!]
    },
    [Arbitrum.chain]: {
        chainId: 421613,
        url: `https://goerli-rollup.arbitrum.io/rpc`,
        gas: 3000000,
        accounts: [process.env.PK1!]
    }
};

export const EVMChains: Chain[] = [
    Chain.Ethereum,
    //   Chain.Arbitrum,  //multicall not supported for now
    //   Chain.Avalanche,  //multicall not supported for now
    Chain.Polygon,
    //   Chain.Optimism,  //multicall not supported for now
    Chain.Kava,
    Chain.Moonbeam,
    Chain.BinanceSmartChain,
    Chain.Fantom
];

export type MulticallConfig = {
    chain: Chain;
    multicallService: MultiCallService;
    multicallProvider: Web3ProviderConnector;
    assets: Asset[];
    tickers: string[];
};

export type MulticallSetupConfig = {
    multicallConfigMap: {
        [chain: string]: MulticallConfig;
    };
    combinedConfigs: MulticallConfig[];
};

type Asset = {
    tokenAddress: string;
    mintGatewayAddress: string;
};

const getMulticallConfig = (chain: Chain): MulticallConfig => {
    const chainProvider = new Web3(
        new Web3.providers.HttpProvider(PorividerConfig[chain]!.url)
    ) as any;

    const multicallProvider = new Web3ProviderConnector(chainProvider);
    const multicallService = new MultiCallService(
        multicallProvider,
        chainAdresses[chain]!.multicallContract
    );
    const multicallConfig: MulticallConfig = {
        chain: chain,
        multicallService,
        multicallProvider,
        assets: Object.values(chainAdresses[chain]!.assets),
        tickers: Object.keys(chainAdresses[chain]!.assets)
    };
    return multicallConfig;
};
export const setupMulticallConfig = (): MulticallSetupConfig => {
    let multicallConfigMap = {} as { [chain: string]: MulticallConfig };
    const combinedConfigs = EVMChains.map((chain: Chain) => {
        multicallConfigMap[chain] = getMulticallConfig(chain);
        return multicallConfigMap[chain];
    }) as MulticallConfig[];

    return { multicallConfigMap, combinedConfigs };
};
export default async function TokenMulticall1(
    combinedConfig: MulticallConfig[],
    of: string
) {
    // The parameters are optional, if not specified, the default will be used
    const params: MultiCallParams = {
        chunkSize: 10,
        retriesLimit: 3,
        blockNumber: 'latest'
    };

    const WalletBalancePromises: any = [];
    combinedConfig.forEach(async (config: MulticallConfig) => {
        WalletBalancePromises.push(
            config.multicallService.callByChunks(
                config.assets.map((asset: Asset) => {
                    return {
                        to: asset.tokenAddress,
                        data: config.multicallProvider.contractEncodeABI(
                            ERC20ABI,
                            asset.tokenAddress,
                            'balanceOf',
                            [of]
                        )
                    };
                }),
                params
            )
        );
    });

    const BridgeBalancePromises: any = [];
    combinedConfig.forEach(async (config: MulticallConfig) => {
        const func =
            config.chain === 'Ethereum' || config.chain === 'BinanceSmartChain'
                ? 'getContractTokenbalance'
                : 'getUserbalanceInContract';
        const ABI =
            config.chain === 'Ethereum' || config.chain === 'BinanceSmartChain'
                ? TestBridgeABI
                : BridgeABI;

        BridgeBalancePromises.push(
            config.multicallService.callByChunks(
                config.assets.map((asset: Asset) => {
                    return {
                        to: chainAdresses[config.chain]!.bridgeAddress,
                        data: config.multicallProvider.contractEncodeABI(
                            ABI,
                            chainAdresses[config.chain]!.bridgeAddress,
                            func,
                            [asset.tokenAddress, of]
                        )
                    };
                }),
                params
            )
        );
    });

    const walletTokenBalances = (await Promise.all(
        WalletBalancePromises
    )) as string[][];
    const bridgeTokenBalances = (await Promise.all(
        BridgeBalancePromises
    )) as string[][];

    return { walletTokenBalances, bridgeTokenBalances };
}
