import { Asset, Chain } from "@renproject/chains";
import { getAssetChainsConfig, CustomSvgIconComponent } from './chainsConfig';
import { Icon } from "../components/Icons/AssetLogs/Icon";

export type AssetIconsConfig = {
    Icon: string | null;
};

export type AssetLabelsConfig = {
    shortName: string;
    fullName: string;
};

export enum AssetRateService {
    Coingecko = "Coingecko",
}

export type AssetRateConfig = {
    rateService?: AssetRateService;
    rateSymbol?: string;
};

type AssetBaseConfig = AssetIconsConfig & AssetLabelsConfig & AssetRateConfig & {};

const unsetAssetConfig: AssetBaseConfig = {
    Icon: null,
    shortName: "",
    fullName: "",
};

export const assetsBaseConfig: Record<Asset, AssetBaseConfig> = {
    AVAX: {
        Icon: Asset.AVAX,

        shortName: "AVAX",
        fullName: "Avalanche",
        rateService: AssetRateService.Coingecko,
        rateSymbol: "avalanche-2",
    },
    ArbETH: {
        Icon: Asset.ArbETH,

        shortName: "ArbETH",
        fullName: "Arbitrum Ether",
        rateService: AssetRateService.Coingecko,
        rateSymbol: "weth", // simple hack for duplicated ethereum entry
    },
    BADGER: {
        Icon: Asset.BADGER,

        shortName: "BADGER",
        fullName: "Badger DAO",
        rateService: AssetRateService.Coingecko,
        rateSymbol: "badger-dao",
    },
    BCH: {
        Icon: Asset.BCH,

        shortName: "BCH",
        fullName: "Bitcoin Cash",
        rateService: AssetRateService.Coingecko,
        rateSymbol: "bitcoin-cash",
    },
    BNB: {
        Icon: Asset.BNB,

        shortName: "BNB",
        fullName: "Binance Coin",
        rateService: AssetRateService.Coingecko,
        rateSymbol: "binancecoin",
    },
    BTC: {
        Icon: Asset.BTC,

        shortName: "BTC",
        fullName: "Bitcoin",
        rateService: AssetRateService.Coingecko,
        rateSymbol: "bitcoin",
    },
    BUSD: {
        Icon: Asset.BUSD,

        shortName: "BUSD",
        fullName: "Binance USD",
        rateService: AssetRateService.Coingecko,
        rateSymbol: "binance-usd",
    },
    CRV: {
        Icon: Asset.CRV,

        shortName: "CRV",
        fullName: "Curve DAO Token",
        rateService: AssetRateService.Coingecko,
        rateSymbol: "curve-dao-token",
    },
    DAI: {
        Icon: Asset.DAI,

        shortName: "DAI",
        fullName: "Dai",
        rateService: AssetRateService.Coingecko,
        rateSymbol: "dai",
    },
    DGB: {
        Icon: Asset.DGB,

        shortName: "DGB",
        fullName: "DigiByte",
        rateService: AssetRateService.Coingecko,
        rateSymbol: "digibyte",
    },
    DOGE: {
        Icon: Asset.DOGE,

        shortName: "DOGE",
        fullName: "Dogecoin",
        rateService: AssetRateService.Coingecko,
        rateSymbol: "dogecoin",
    },
    ETH: {
        Icon: Asset.ETH,

        shortName: "ETH",
        fullName: "Ether",
        rateService: AssetRateService.Coingecko,
        rateSymbol: "ethereum",
    },
    EURT: {
        Icon: Asset.EURT,

        shortName: "EURT",
        fullName: "Euro Tether",
        rateService: AssetRateService.Coingecko,
        rateSymbol: "euro-tether",
    },
    FIL: {
        Icon: Asset.FIL,

        shortName: "FIL",
        fullName: "Filecoin",
        rateService: AssetRateService.Coingecko,
        rateSymbol: "filecoin",
    },
    FTM: {
        Icon: Asset.FTM,

        shortName: "FTM",
        fullName: "Fantom",
        rateService: AssetRateService.Coingecko,
        rateSymbol: "fantom",
    },
    FTT: {
        Icon: Asset.FTT,

        shortName: "FTT",
        fullName: "FTX Token",
        rateService: AssetRateService.Coingecko,
        rateSymbol: "ftx-token",
    },
    GLMR: {
        Icon: Asset.GLMR,

        shortName: "GLMR",
        fullName: "Glimmer",
        rateService: AssetRateService.Coingecko,
        rateSymbol: "moonbeam",
    },
    KAVA: {
        Icon: Asset.KAVA,

        shortName: "KAVA",
        fullName: "Kava",
        rateService: AssetRateService.Coingecko,
        rateSymbol: "kava",
    },
    KNC: {
        Icon: Asset.KNC,

        shortName: "KNC",
        fullName: "Kyber Network Crystal",
        rateService: AssetRateService.Coingecko,
        rateSymbol: "kyber-network-crystal",
    },
    LINK: {
        Icon: Asset.LINK,

        shortName: "LINK",
        fullName: "Chainlink",
        rateService: AssetRateService.Coingecko,
        rateSymbol: "chainlink",
    },
    LUNA: {
        Icon: Asset.LUNA,

        shortName: "LUNA",
        fullName: "Terra",
        rateService: AssetRateService.Coingecko,
        rateSymbol: "terra-luna",
    },
    MATIC: {
        Icon: Asset.MATIC,

        shortName: "MATIC",
        fullName: "Polygon",
        rateService: AssetRateService.Coingecko,
        rateSymbol: "polygon",
    },
    MIM: {
        Icon: Asset.MIM,

        shortName: "MIM",
        fullName: "Magic Internet Money",
        rateService: AssetRateService.Coingecko,
        rateSymbol: "magic-internet-money",
    },
    REN: {
        Icon: Asset.REN,

        shortName: "REN",
        fullName: "REN",
        rateService: AssetRateService.Coingecko,
        rateSymbol: "republic-protocol",
    },
    ROOK: {
        Icon: Asset.ROOK,

        shortName: "ROOK",
        fullName: "KeeperDAO",
        rateService: AssetRateService.Coingecko,
        rateSymbol: "rook",
    },
    SUSHI: {
        Icon: Asset.SUSHI,

        shortName: "SUSHI",
        fullName: "Sushi",
        rateService: AssetRateService.Coingecko,
        rateSymbol: "sushi",
    },
    SOL: {
        Icon: Asset.SOL,

        shortName: "SOL",
        fullName: "Solana",
        rateService: AssetRateService.Coingecko,
        rateSymbol: "solana",
    },
    UNI: {
        Icon: Asset.UNI,

        shortName: "UNI",
        fullName: "Uniswap",
        rateService: AssetRateService.Coingecko,
        rateSymbol: "uniswap",
    },
    USDC: {
        Icon: Asset.USDC,

        shortName: "USDC",
        fullName: "USD Coin",
        rateService: AssetRateService.Coingecko,
        rateSymbol: "usd-coin",
    },
    USDT: {
        Icon: Asset.USDT ,

        shortName: "USDT",
        fullName: "Tether",
        rateService: AssetRateService.Coingecko,
        rateSymbol: "tether",
    },
    ZEC: {
        Icon: Asset.ZEC,

        shortName: "ZEC",
        fullName: "Zcash",
        rateService: AssetRateService.Coingecko,
        rateSymbol: "zcash",
    },
    gETH: unsetAssetConfig,
    oETH: unsetAssetConfig,
};


export type AssetChainsConfig = {
    lockChain: Chain;
    mintChains: Array<Chain>;
    lockChainConnectionRequired?: boolean; // better name?
};

export type AssetColorConfig = {
    color: string;
};

export type AssetConfig = AssetBaseConfig & AssetColorConfig & AssetChainsConfig;

export const assetsConfig = Object.fromEntries(
    Object.entries(assetsBaseConfig).map(([asset, config]) => [
        asset,
        {
            ...config,
            // prevent UNSET for simple cases
            shortName: config.shortName || asset,
            fullName: config.fullName || asset,
        },
    ])
) as Record<Asset, AssetConfig>;

console.log("assetsConfig", assetsConfig);

export const getAssetConfig = (asset: Asset | string) => {
    const config = assetsConfig[asset as Asset];
    if (!config) {
        throw new Error(`Asset config not found for ${asset}`);
    }
    return config;
};

export const getRenAssetConfig = (asset: Asset | string) => {
    const assetConfig = getAssetConfig(asset);
    const { shortName, fullName, Icon, ...rest } = assetConfig;
    return {
        shortName: getRenAssetName(shortName),
        fullName: getRenAssetFullName(fullName),
        Icon: Icon,
        ...rest,
    };
};

export const getAssetSymbolByRateSymbol = (symbol: string) => {
    const entry = Object.entries(assetsConfig).find(([_, config]) => config.rateSymbol === symbol);
    if (!entry) {
        throw new Error(`Asset config not found by rateSymbol: ${symbol}`);
    }
    return entry[0];
};

export const getRenAssetFullName = (fullName: string) => `Ren ${fullName}`;
// TODO: invent naming similar to renJS, Noah
export const getRenAssetName = (asset: Asset | string) => `ren${asset}`; //or mint?
export const getOriginAssetName = (renAsset: string) => {
    if (renAsset.indexOf("ren") !== 0) {
        throw new Error(`Unable to convert asset to origin (locked): ${renAsset}`);
    }
    return renAsset.substr(3);
};

export const isChainNativeAsset = (chain: Chain, asset: Asset) => {
    return getAssetConfig(asset).lockChain === chain;
};

export const getUIAsset = (asset: Asset, chain: Chain) => {
    const assetConfig = getAssetConfig(asset);
    const isNative = isChainNativeAsset(chain, asset);
    const renAssetConfig = getRenAssetConfig(asset);
    const shortName = isNative ? assetConfig.shortName : renAssetConfig.shortName;
    const fullName = isNative ? assetConfig.fullName : renAssetConfig.fullName;
    const Icon = isNative ? assetConfig.Icon : renAssetConfig.Icon;
    return { shortName, fullName, Icon };
};

export const supportedAssets =
 [
              Asset.BTC,
              Asset.BCH,
              Asset.DGB,
              Asset.DOGE,
              Asset.FIL,
              Asset.LUNA,
              Asset.ZEC,
              Asset.ETH,
              Asset.BNB,
              Asset.AVAX,
              Asset.FTM,
              Asset.ArbETH,
              Asset.MATIC,
              Asset.GLMR,
              Asset.KAVA,
              // Asset.SOL, // not sure about that
              Asset.REN,
              Asset.DAI,
              Asset.USDC,
              Asset.USDT,
              Asset.EURT,
              Asset.BUSD,
              Asset.MIM,
              Asset.CRV,
              Asset.LINK,
              Asset.UNI,
              Asset.SUSHI,
              Asset.FTT,
              Asset.ROOK,
              Asset.BADGER,
              Asset.KNC,
          ]
       

console.log("supportedAssets", supportedAssets);
