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
