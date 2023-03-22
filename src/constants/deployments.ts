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



export const BridgeFactory: { [chain: string]: string } = {
    [Ethereum.chain]: '0xfa141247477D8f03100155e084767Aaf48e4Cfab',
    [BinanceSmartChain.chain]: '0x6cAE43dEAc56291fFb04EC293D49b9cd053919B8'
};

export const BridgeAssets: {
    [chain in Chains]: { [asset: string]: BridgeAsset };
} = {
    [Ethereum.chain]: {
        ['aUSDT']: {
            tokenAddress: '0x11B364AF13f157a790CD5dB2E768e533b4972d63',
            bridgeAddress: '0x53de366dA21a6F3cF477C2Fbb238a9a4bbBF0002'
        }
    },
    [BinanceSmartChain.chain]: {
        ['aUSDT']: {
            tokenAddress: '0x8b4F896F83a52dE9ee19f41eaFa7abe35007Ce47',
            bridgeAddress: '0x1A4006a7636F2715F8Fc51991708ff201cbd8c4b'
        }
    }
};



export const registries: { [chain: string]: string } = {
    [Ethereum.chain]: '0xDEB2be610258902505AbD7c41724b592261C8c05',
    [BinanceSmartChain.chain]: '0xeDE6D6861B26cbeDACd487A31E2E236065fB97dA'
};
