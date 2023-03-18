import {
  Ethereum,
  Polygon,
  BinanceSmartChain,
  Moonbeam,
  Fantom,
  Avalanche,
  Optimism,
  Kava,
  Arbitrum,
} from "@renproject/chains-ethereum";


export type BridgeAsset = {
    tokenAddress: string;
    bridgeAddress: string;
};

export enum Chains {
    Ethereum = 'Ethereum',
    BinanceSmartChain = 'BinanceSmartChain'
}

export const BridgeDeployments: { [x: string]: string } = {
  [Ethereum.chain]: "0xe3Af7dde1F89515a3E114F228757b5213ec86Dd2",//"0x9dFFd9DA32975f0955e3EfB62669aC167376d8AA",
  [BinanceSmartChain.chain]: "0x2eB3BFaadDe245450e29a7307897051d457234FC",//"0x0E245bF0dca306eac0a666001de3862E895acbd7",
  [Polygon.chain]: "0x0E245bF0dca306eac0a666001de3862E895acbd7",
  [Moonbeam.chain]: "0x0E245bF0dca306eac0a666001de3862E895acbd7",
  [Optimism.chain]: "0xa36E9D4B7D00875588A3B00cEb46cE6DB34D6A72",
  [Fantom.chain]: "0x0E245bF0dca306eac0a666001de3862E895acbd7",
  [Avalanche.chain]: "0xa36E9D4B7D00875588A3B00cEb46cE6DB34D6A72",
  [Arbitrum.chain]: "0x0E245bF0dca306eac0a666001de3862E895acbd7",
  [Kava.chain]: "0x0E245bF0dca306eac0a666001de3862E895acbd7",
};


export const BridgeAssets: {
    [chain in Chains]: { [asset: string]: BridgeAsset };
} = {
    [Ethereum.chain]: {
        ['aUSDT']: {
            tokenAddress: '0xb7fEB55476D3fC26724Ba23794FB9c723c71b9b0',
            bridgeAddress: '0xf3894e0289300a43dD7f0E0e852058011377CD26'
        }
    },
    [BinanceSmartChain.chain]: {
        ['aUSDT']: {
            tokenAddress: '0xD93521D9E6B21D54D5276203848f1397624De87A',
            bridgeAddress: '0xcB0aB22B59a6A4d30E9cB06AF234Cad3B2Ad9658'
        }
    }
};


export const BridgeFactory: { [chain: string]: string } = {
    [Ethereum.chain]: '0xf3894e0289300a43dD7f0E0e852058011377CD26',
    [BinanceSmartChain.chain]: '0xcB0aB22B59a6A4d30E9cB06AF234Cad3B2Ad9658'
};

export const registries: { [chain: string]: string } = {
    [Ethereum.chain]: '0xDEB2be610258902505AbD7c41724b592261C8c05',
    [BinanceSmartChain.chain]: '0xeDE6D6861B26cbeDACd487A31E2E236065fB97dA'
};
