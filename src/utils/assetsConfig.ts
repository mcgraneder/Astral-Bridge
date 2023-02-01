import { Asset, Chain } from "@renproject/chains";
import { assetsColors, Avax, Badger, Bch, Bnb, Btc, Busd, Crv, Dai, Dgb, Doge, Eth, Eurt, Fil, Ftm, Ftt, Glmr, Kava, Knc, Link, Luna, Matic, Mim, Ren, RenAvax, RenBadger, RenBch, RenBnb, RenBtc, RenBusd, RenCrv, RenDai, RenDgb, RenDoge, RenEth, RenEurt, RenFil, RenFtm, RenFtt, RenGlmr, RenKava, RenKnc, RenLink, RenLuna, RenMatic, RenMim, RenRen, RenRook, RenSol, RenSushi, RenUni, RenUsdc, RenUsdt, RenZec, Rook, Sol, Sushi, Uni, Usdc, Usdt, Zec } from "@renproject/icons";
import { getAssetChainsConfig, CustomSvgIconComponent } from './chainsConfig';
import { Icon } from "../components/Icons/AssetLogs/Icon";
import { SvgIcon, SvgIconProps } from "@material-ui/core";
import { SvgIconComponent } from "@material-ui/icons";


export type AssetIconsConfig = {
    Icon: CustomSvgIconComponent;
    RenIcon: CustomSvgIconComponent;
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
    RenIcon: null,
    shortName: "",
    fullName: "",
};

const assetsBaseConfig: Record<Asset, AssetBaseConfig> = {
    AVAX: {
        Icon: Icon(Avax),
        RenIcon: Icon(RenAvax),
        shortName: "AVAX",
        fullName: "Avalanche",
        rateService: AssetRateService.Coingecko,
        rateSymbol: "avalanche-2",
    },
    ArbETH: {
        Icon: Icon(Eth),
        RenIcon: Icon(RenEth),
        shortName: "ArbETH",
        fullName: "Arbitrum Ether",
        rateService: AssetRateService.Coingecko,
        rateSymbol: "weth", // simple hack for duplicated ethereum entry
    },
    BADGER: {
        Icon: Icon(Badger),
        RenIcon: Icon(RenBadger),
        shortName: "BADGER",
        fullName: "Badger DAO",
        rateService: AssetRateService.Coingecko,
        rateSymbol: "badger-dao",
    },
    BCH: {
        Icon: Icon(Bch),
        RenIcon: Icon(RenBch),
        shortName: "BCH",
        fullName: "Bitcoin Cash",
        rateService: AssetRateService.Coingecko,
        rateSymbol: "bitcoin-cash",
    },
    BNB: {
        Icon: Icon(Bnb),
        RenIcon: Icon(RenBnb),
        shortName: "BNB",
        fullName: "Binance Coin",
        rateService: AssetRateService.Coingecko,
        rateSymbol: "binancecoin",
    },
    BTC: {
        Icon: Icon(Btc),
        RenIcon: Icon(RenBtc),
        shortName: "BTC",
        fullName: "Bitcoin",
        rateService: AssetRateService.Coingecko,
        rateSymbol: "bitcoin",
    },
    BUSD: {
        Icon: Icon(Busd),
        RenIcon: Icon(RenBusd),
        shortName: "BUSD",
        fullName: "Binance USD",
        rateService: AssetRateService.Coingecko,
        rateSymbol: "binance-usd",
    },
    CRV: {
        Icon: Icon(Crv),
        RenIcon: Icon(RenCrv),
        shortName: "CRV",
        fullName: "Curve DAO Token",
        rateService: AssetRateService.Coingecko,
        rateSymbol: "curve-dao-token",
    },
    DAI: {
        Icon: Icon(Dai),
        RenIcon: Icon(RenDai),
        shortName: "DAI",
        fullName: "Dai",
        rateService: AssetRateService.Coingecko,
        rateSymbol: "dai",
    },
    DGB: {
        Icon: Icon(Dgb),
        RenIcon: Icon(RenDgb),
        shortName: "DGB",
        fullName: "DigiByte",
        rateService: AssetRateService.Coingecko,
        rateSymbol: "digibyte",
    },
    DOGE: {
        Icon: Icon(Doge),
        RenIcon: Icon(RenDoge),
        shortName: "DOGE",
        fullName: "Dogecoin",
        rateService: AssetRateService.Coingecko,
        rateSymbol: "dogecoin",
    },
    ETH: {
        Icon: Icon(Eth),
        RenIcon: Icon(RenEth),
        shortName: "ETH",
        fullName: "Ether",
        rateService: AssetRateService.Coingecko,
        rateSymbol: "ethereum",
    },
    EURT: {
        Icon: Icon(Eurt),
        RenIcon: Icon(RenEurt),
        shortName: "EURT",
        fullName: "Euro Tether",
        rateService: AssetRateService.Coingecko,
        rateSymbol: "euro-tether",
    },
    FIL: {
        Icon: Icon(Fil),
        RenIcon: Icon(RenFil),
        shortName: "FIL",
        fullName: "Filecoin",
        rateService: AssetRateService.Coingecko,
        rateSymbol: "filecoin",
    },
    FTM: {
        Icon: Icon(Ftm),
        RenIcon: Icon(RenFtm),
        shortName: "FTM",
        fullName: "Fantom",
        rateService: AssetRateService.Coingecko,
        rateSymbol: "fantom",
    },
    FTT: {
        Icon: Icon(Ftt),
        RenIcon: Icon(RenFtt),
        shortName: "FTT",
        fullName: "FTX Token",
        rateService: AssetRateService.Coingecko,
        rateSymbol: "ftx-token",
    },
    GLMR: {
        Icon: Icon(Glmr),
        RenIcon: Icon(RenGlmr),
        shortName: "GLMR",
        fullName: "Glimmer",
        rateService: AssetRateService.Coingecko,
        rateSymbol: "moonbeam",
    },
    KAVA: {
        Icon: Icon(Kava),
        RenIcon: Icon(RenKava),
        shortName: "KAVA",
        fullName: "Kava",
        rateService: AssetRateService.Coingecko,
        rateSymbol: "kava",
    },
    KNC: {
        Icon: Icon(Knc),
        RenIcon: Icon(RenKnc),
        shortName: "KNC",
        fullName: "Kyber Network Crystal",
        rateService: AssetRateService.Coingecko,
        rateSymbol: "kyber-network-crystal",
    },
    LINK: {
        Icon: Icon(Link),
        RenIcon: Icon(RenLink),
        shortName: "LINK",
        fullName: "Chainlink",
        rateService: AssetRateService.Coingecko,
        rateSymbol: "chainlink",
    },
    LUNA: {
        Icon: Icon(Luna),
        RenIcon: Icon(RenLuna),
        shortName: "LUNA",
        fullName: "Terra",
        rateService: AssetRateService.Coingecko,
        rateSymbol: "terra-luna",
    },
    MATIC: {
        Icon: Icon(Matic),
        RenIcon: Icon(RenMatic),
        shortName: "MATIC",
        fullName: "Polygon",
        rateService: AssetRateService.Coingecko,
        rateSymbol: "polygon",
    },
    MIM: {
        Icon: Icon(Mim),
        RenIcon: Icon(RenMim),
        shortName: "MIM",
        fullName: "Magic Internet Money",
        rateService: AssetRateService.Coingecko,
        rateSymbol: "magic-internet-money",
    },
    REN: {
        Icon: Icon(Ren),
        RenIcon: Icon(RenRen),
        shortName: "REN",
        fullName: "REN",
        rateService: AssetRateService.Coingecko,
        rateSymbol: "republic-protocol",
    },
    ROOK: {
        Icon: Icon(Rook),
        RenIcon: Icon(RenRook),
        shortName: "ROOK",
        fullName: "KeeperDAO",
        rateService: AssetRateService.Coingecko,
        rateSymbol: "rook",
    },
    SUSHI: {
        Icon: Icon(Sushi),
        RenIcon: Icon(RenSushi),
        shortName: "SUSHI",
        fullName: "Sushi",
        rateService: AssetRateService.Coingecko,
        rateSymbol: "sushi",
    },
    SOL: {
        Icon: Icon(Sol),
        RenIcon: Icon(RenSol),
        shortName: "SOL",
        fullName: "Solana",
        rateService: AssetRateService.Coingecko,
        rateSymbol: "solana",
    },
    UNI: {
        Icon: Icon(Uni),
        RenIcon: Icon(RenUni),
        shortName: "UNI",
        fullName: "Uniswap",
        rateService: AssetRateService.Coingecko,
        rateSymbol: "uniswap",
    },
    USDC: {
        Icon: Icon(Usdc),
        RenIcon: Icon(RenUsdc),
        shortName: "USDC",
        fullName: "USD Coin",
        rateService: AssetRateService.Coingecko,
        rateSymbol: "usd-coin",
    },
    USDT: {
        Icon: Icon(Usdt),
        RenIcon: Icon(RenUsdt),
        shortName: "USDT",
        fullName: "Tether",
        rateService: AssetRateService.Coingecko,
        rateSymbol: "tether",
    },
    ZEC: {
        Icon: Icon(Zec),
        RenIcon: Icon(RenZec),
        shortName: "ZEC",
        fullName: "Zcash",
        rateService: AssetRateService.Coingecko,
        rateSymbol: "zcash",
    },
    gETH: unsetAssetConfig,
    oETH: unsetAssetConfig,
};

const getAssetColorConfig = (asset: Asset) => {
    const color = assetsColors[asset];
    return color.primary;
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
            ...getAssetChainsConfig(asset as Asset),
            color: getAssetColorConfig(asset as Asset),
            // prevent UNSET for simple cases
            shortName: config.shortName || asset,
            fullName: config.fullName || asset,
        },
    ])
) as Record<Asset, AssetConfig>;

console.log("assetsConfig", assetsConfig);
(window as any).assetsConfig = assetsConfig;

export const getAssetConfig = (asset: Asset | string) => {
    const config = assetsConfig[asset as Asset];
    if (!config) {
        throw new Error(`Asset config not found for ${asset}`);
    }
    return config;
};

export const getRenAssetConfig = (asset: Asset | string) => {
    const assetConfig = getAssetConfig(asset);
    const { shortName, fullName, Icon, RenIcon, ...rest } = assetConfig;
    return {
        shortName: getRenAssetName(shortName),
        fullName: getRenAssetFullName(fullName),
        Icon: RenIcon,
        RenIcon,
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
