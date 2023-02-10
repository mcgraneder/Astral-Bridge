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
  [Ethereum.chain]: "0xffE167291A3A815A7Af8bEA9a9522387AcEb6f6f",
  [BinanceSmartChain.chain]: "0x0E245bF0dca306eac0a666001de3862E895acbd7",
  [Polygon.chain]: "0x0E245bF0dca306eac0a666001de3862E895acbd7",
  [Moonbeam.chain]: "0x0E245bF0dca306eac0a666001de3862E895acbd7",
  [Optimism.chain]: "0xa36E9D4B7D00875588A3B00cEb46cE6DB34D6A72",
  [Fantom.chain]: "0x0E245bF0dca306eac0a666001de3862E895acbd7",
  [Avalanche.chain]: "0xa36E9D4B7D00875588A3B00cEb46cE6DB34D6A72",
  [Arbitrum.chain]: "0x0E245bF0dca306eac0a666001de3862E895acbd7",
  [Kava.chain]: "0x0E245bF0dca306eac0a666001de3862E895acbd7",
};