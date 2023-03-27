import {
    Ethereum,
    EthereumBaseChain,
    EthereumClassConfig,
    EthProvider,
    EthSigner,
    EVMNetworkConfig,
    Goerli,
    resolveRpcEndpoints
} from '@renproject/chains-ethereum';
import RenJS from '@renproject/ren';
import { RenNetwork } from '@renproject/utils';
import { ethers, providers, Wallet } from 'ethers';

export interface EVMConstructor<EVM> {
    configMap: {
        [network in RenNetwork]?: EVMNetworkConfig;
    };
    chain: string;

    new ({
        network,
        provider,
        defaultTestnet,
        signer,
        config
    }: {
        network: EVMNetworkConfig;
        provider: EthProvider;
        defaultTestnet: 'goerli';
        signer?: EthSigner;
        config?: EthereumClassConfig;
    }): EVM;
}

export const getEVMProvider = <EVM extends EthereumBaseChain>(
    ChainClass: EVMConstructor<EVM>,
    network: RenNetwork,
    overrideProvider?: EthProvider
): { provider: EthProvider } => {
    const config = (
        ChainClass.chain === 'Ethereum' && network === RenNetwork.Testnet
            ? Goerli
            : ChainClass
    ).configMap[network];
    if (!config) {
        throw new Error(
            `No configuration for ${ChainClass.name} on ${network}.`
        );
    }

    const rpcUrls: string[] = resolveRpcEndpoints(config.config.rpcUrls, {
        INFURA_API_KEY: process.env.INFURA_KEY,
        ALCHEMY_API_KEY: process.env.ALCHEMY_KEY
    });

    let provider;
    if (
        ChainClass.chain === Ethereum.chain ||
        (ChainClass.chain === Goerli.chain && network === RenNetwork.Testnet)
    )
        provider =
            overrideProvider ||
            new providers.JsonRpcProvider(
                'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'
            );
    else
        provider =
            overrideProvider || new providers.JsonRpcProvider(rpcUrls[0]);

    return { provider };
};

export const getEVMChain = <EVM extends EthereumBaseChain>(
    ChainClass: EVMConstructor<EVM>,
    network: RenNetwork,
): EVM => {
    return new ChainClass({
        network: network as any,
        defaultTestnet: 'goerli',
        ...getEVMProvider(ChainClass, network)
    });
};

export const getChain = (renJS: RenJS, chain: string, network: RenNetwork) => {
    if (chain === 'Ethereum' && network === RenNetwork.Testnet) {
        return renJS.getChain('Goerli');
    }
    return renJS.getChain(chain);
};
