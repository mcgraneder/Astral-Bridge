import type { NextApiRequest, NextApiResponse } from 'next';
import { chainAdresses } from '../../constants/Addresses';
import {
    getEVMChain,
    getEVMProvider,
    getChain
} from '../../services/getProvider';
import { RenNetwork } from '@renproject/utils';
import { Arbitrum } from '../../bridgeGateway/Arbitrum';
import { Avalanche } from '@renproject/chains';
import { Optimism } from '../../bridgeGateway/Optimism';
import {
    BinanceSmartChain,
    Ethereum,
    Fantom,
    Polygon,
    Kava,
    Moonbeam,
    Goerli
} from '@renproject/chains-ethereum';
import RenJS from '@renproject/ren';

import { getAddress } from '@ethersproject/address';
import { AddressZero } from '@ethersproject/constants';
import { Contract } from '@ethersproject/contracts';
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import { ERC20ABI } from '@renproject/chains-ethereum/contracts';
import { BridgeDeployments, BridgeAssets } from '../../constants/deployments';

const isAddress = (value: any): string | false => {
    try {
        return getAddress(value);
    } catch {
        return false;
    }
};

const getSigner = (library: Web3Provider, account: string): JsonRpcSigner => {
    return library.getSigner(account).connectUnchecked();
};

const getProviderOrSigner = (
    library: Web3Provider,
    account?: string
): Web3Provider | JsonRpcSigner => {
    return account ? getSigner(library, account) : library;
};

const getContract = (
    address: string,
    ABI: any,
    provider: Web3Provider
): Contract => {
    if (!isAddress(address) || address === AddressZero) {
        throw Error(`Invalid 'address' parameter '${address}'.`);
    }

    return new Contract(address, ABI, provider);
};

export const returnContract = <contract extends Contract = Contract>(
    tokenddress: string,
    ABI: any,
    provider: Web3Provider
): contract | null => {
    try {
        return getContract(tokenddress, ABI, provider) as contract;
    } catch (error) {
        console.error('Failed to get contract', error);
        return null;
    }
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const chainName = req.query.chainName!.toString();
    const assetName = req.query.assetName!.toString();
    const account = req.query.account!.toString();

    const network = RenNetwork.Testnet;

    const ArbitrumChain = getEVMChain(Arbitrum, network);
    const AvalancheChain = getEVMChain(Avalanche, network);
    const BinanceSmartChainChain = getEVMChain(BinanceSmartChain, network);
    const FantomChain = getEVMChain(Fantom, network);
    const PolygonChain = getEVMChain(Polygon, network);
    const OptimismChain = getEVMChain(Optimism, network);
    const MoonBeamChain = getEVMChain(Moonbeam, network);
    const KavaChain = getEVMChain(Kava, network);
    const EthereumChain = new Ethereum({
        network,
        defaultTestnet: 'goerli',
        // ...getEVMProvider(Ethereum, network, catalogAdminKey),
        ...getEVMProvider(Goerli, network)
    });

    const RenJSProvider = new RenJS(RenNetwork.Testnet).withChains(
        ArbitrumChain,
        AvalancheChain,
        BinanceSmartChainChain,
        EthereumChain,
        FantomChain,
        PolygonChain,
        OptimismChain,
        KavaChain,
        MoonBeamChain
    );

    const assets = chainAdresses[chainName!]!.assets;

    const { provider } = getChain(RenJSProvider, chainName, RenNetwork.Testnet);

    const tokenContract = (await returnContract(
        assets[assetName]!.tokenAddress,
        ERC20ABI,
        provider
    ));

    const allowance = await tokenContract?.allowance(
        account,
        BridgeAssets[Ethereum.chain]!['aUSDT']!.bridgeAddress
    );

    res.json({
        result: allowance
    });
}

export default handler;

