import type { NextApiRequest, NextApiResponse } from "next";
import TokenMulticall1, { MulticallConfig, setupMulticallConfig } from '../../services/multicall';
import { Chain } from '@renproject/chains';
import { Asset } from '../../utils/assetsConfig';
import BigNumber from 'bignumber.js';
import {
    BinanceSmartChain,
    Ethereum,
    Fantom,
    Polygon,
    Kava,
    Moonbeam
} from '@renproject/chains-ethereum';

export type MulticallReturn = {
    tokenAddress: string;
    chain: Chain;
    asset: Asset;
    walletBalance: string;
    bridgeBalance: string;
};

export type MulticallAsset = {
    tokenAddress: string;
    mintGatewayAddress: string;
};

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    // const params = Object.values(req.query)
    // const fails: string[] = [];
    // for (const param of params) {
    //   if (!req.query[param as string]) {
    //     fails.push(param as string);
    //   }
    // }
    // if (fails.length > 0) {
    //   res.status(400).send(`${fails.join(",")} required`);
    // } 
    const multicallConfig = setupMulticallConfig();
    const combinedConfigs = multicallConfig.combinedConfigs;
    const of = req.query.of!.toString();

    let balancesMap = {
        [Ethereum.chain]: {},
        [BinanceSmartChain.chain]: {},
        [Polygon.chain]: {},
        [Kava.chain]: {},
        [Moonbeam.chain]: {},
        [Fantom.chain]: {}
    } as { [chain: string]: { [x: string]: any } };

    const { walletTokenBalances, bridgeTokenBalances } = await TokenMulticall1(
        combinedConfigs,
        of
    );

    combinedConfigs.forEach((config: MulticallConfig, chainIndex: number) => {
        config.assets.forEach((asset: MulticallAsset, index: number) => {
            balancesMap[config.chain!]![config.tickers[index]!] = {
                tokenAddress: asset.tokenAddress,
                chain: config.chain as Chain,
                asset: config.tickers[index] as Asset,
                walletBalance: config.multicallProvider
                    .decodeABIParameter<BigNumber>(
                        'uint256',
                        walletTokenBalances[chainIndex!]![index!]!
                    )
                    .toString(),
                bridgeBalance: config.multicallProvider
                    .decodeABIParameter<BigNumber>(
                        'uint256',
                        bridgeTokenBalances[chainIndex]!![index]!
                    )
                    .toString()
            };
        });
    });
    res.json({
        result: {
            multicall: balancesMap
        }
    });
};

export default handler;

