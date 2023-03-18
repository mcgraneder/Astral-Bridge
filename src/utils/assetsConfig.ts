import { Chain } from "@renproject/chains";

export type AssetIconsConfig = {
    Icon: string | null;
};

export type AssetLabelsConfig = {
    shortName: string;
    fullName: string;
    decimals: number;
};

export enum AssetRateService {
    Coingecko = "Coingecko",
}

export type AssetRateConfig = {
    rateService?: AssetRateService;
    rateSymbol?: string;
};

export type AssetBaseConfig = AssetIconsConfig & AssetLabelsConfig & AssetRateConfig & {};

const unsetAssetConfig: AssetBaseConfig = {
    Icon: null,
    shortName: "",
    fullName: "",
    decimals: 18
};

export enum Asset {
  ArbETH = "ArbETH",
  AVAX = "AVAX",
  BADGER = "BADGER",
  BCH = "BCH",
  BNB = "BNB",
  BTC = "BTC",
  BUSD = "BUSD",
  CRV = "CRV",
  DAI = "DAI",
  DGB = "DGB",
  DOGE = "DOGE",
  ETH = "ETH",
  EURT = "EURT",
  FIL = "FIL",
  FTM = "FTM",
  FTT = "FTT",
  gETH = "gETH",
  GLMR = "GLMR",
  KAVA = "KAVA",
  KNC = "KNC",
  LINK = "LINK",
  LUNA = "LUNA",
  MATIC = "MATIC",
  MIM = "MIM",
  oETH = "oETH",
  REN = "REN",
  ROOK = "ROOK",
  SOL = "SOL",
  SUSHI = "SUSHI",
  UNI = "UNI",
  USDC = "USDC",
  USDT = "USDT",
  ZEC = "ZEC",
  USDT_Goerli = "USDT_Goerli",
  USDC_Goerli = "USDC_Goerli",
  DAI_Goerli = "DAI_Goerli",
  REN_Goerli = "REN_Goerli",
  ASTRAL_USDT = "ASTRAL_USDT",
}

export const assetsBaseConfig: Record<Asset, AssetBaseConfig> = {
    AVAX: {
        Icon: Asset.AVAX,

        shortName: 'AVAX',
        fullName: 'Avalanche',
        rateService: AssetRateService.Coingecko,
        rateSymbol: 'avalanche-2',
        decimals: 18
    },
    ArbETH: {
        Icon: Asset.ArbETH,

        shortName: 'ArbETH',
        fullName: 'Arbitrum Ether',
        rateService: AssetRateService.Coingecko,
        rateSymbol: 'weth',
        decimals: 18 // simple hack for duplicated ethereum entry
    },
    BADGER: {
        Icon: Asset.BADGER,

        shortName: 'BADGER',
        fullName: 'Badger DAO',
        rateService: AssetRateService.Coingecko,
        rateSymbol: 'badger-dao',
        decimals: 18
    },
    BCH: {
        Icon: Asset.BCH,

        shortName: 'BCH',
        fullName: 'Bitcoin Cash',
        rateService: AssetRateService.Coingecko,
        rateSymbol: 'bitcoin-cash',
        decimals: 8
    },
    BNB: {
        Icon: Asset.BNB,

        shortName: 'BNB',
        fullName: 'Binance Coin',
        rateService: AssetRateService.Coingecko,
        rateSymbol: 'binancecoin',
        decimals: 18
    },
    BTC: {
        Icon: Asset.BTC,

        shortName: 'BTC',
        fullName: 'Bitcoin',
        rateService: AssetRateService.Coingecko,
        rateSymbol: 'bitcoin',
        decimals: 8
    },
    BUSD: {
        Icon: Asset.BUSD,

        shortName: 'BUSD',
        fullName: 'Binance USD',
        rateService: AssetRateService.Coingecko,
        rateSymbol: 'binance-usd',
        decimals: 18
    },
    CRV: {
        Icon: Asset.CRV,

        shortName: 'CRV',
        fullName: 'Curve DAO Token',
        rateService: AssetRateService.Coingecko,
        rateSymbol: 'curve-dao-token',
        decimals: 18
    },
    DAI: {
        Icon: Asset.DAI,

        shortName: 'DAI',
        fullName: 'Dai',
        rateService: AssetRateService.Coingecko,
        rateSymbol: 'dai',
        decimals: 18
    },
    DGB: {
        Icon: Asset.DGB,

        shortName: 'DGB',
        fullName: 'DigiByte',
        rateService: AssetRateService.Coingecko,
        rateSymbol: 'digibyte',
        decimals: 18
    },
    DOGE: {
        Icon: Asset.DOGE,

        shortName: 'DOGE',
        fullName: 'Dogecoin',
        rateService: AssetRateService.Coingecko,
        rateSymbol: 'dogecoin',
        decimals: 18
    },
    ETH: {
        Icon: Asset.ETH,

        shortName: 'ETH',
        fullName: 'Ether',
        rateService: AssetRateService.Coingecko,
        rateSymbol: 'ethereum',
        decimals: 18
    },
    EURT: {
        Icon: Asset.EURT,

        shortName: 'EURT',
        fullName: 'Euro Tether',
        rateService: AssetRateService.Coingecko,
        rateSymbol: 'euro-tether',
        decimals: 18
    },
    FIL: {
        Icon: Asset.FIL,

        shortName: 'FIL',
        fullName: 'Filecoin',
        rateService: AssetRateService.Coingecko,
        rateSymbol: 'filecoin',
        decimals: 18
    },
    FTM: {
        Icon: Asset.FTM,

        shortName: 'FTM',
        fullName: 'Fantom',
        rateService: AssetRateService.Coingecko,
        rateSymbol: 'fantom',
        decimals: 18
    },
    FTT: {
        Icon: Asset.FTT,

        shortName: 'FTT',
        fullName: 'FTX Token',
        rateService: AssetRateService.Coingecko,
        rateSymbol: 'ftx-token',
        decimals: 18
    },
    GLMR: {
        Icon: Asset.GLMR,

        shortName: 'GLMR',
        fullName: 'Glimmer',
        rateService: AssetRateService.Coingecko,
        rateSymbol: 'moonbeam',
        decimals: 18
    },
    KAVA: {
        Icon: Asset.KAVA,

        shortName: 'KAVA',
        fullName: 'Kava',
        rateService: AssetRateService.Coingecko,
        rateSymbol: 'kava',
        decimals: 18
    },
    KNC: {
        Icon: Asset.KNC,

        shortName: 'KNC',
        fullName: 'Kyber Network Crystal',
        rateService: AssetRateService.Coingecko,
        rateSymbol: 'kyber-network-crystal',
        decimals: 18
    },
    LINK: {
        Icon: Asset.LINK,

        shortName: 'LINK',
        fullName: 'Chainlink',
        rateService: AssetRateService.Coingecko,
        rateSymbol: 'chainlink',
        decimals: 18
    },
    LUNA: {
        Icon: Asset.LUNA,

        shortName: 'LUNA',
        fullName: 'Terra',
        rateService: AssetRateService.Coingecko,
        rateSymbol: 'terra-luna',
        decimals: 18
    },
    MATIC: {
        Icon: Asset.MATIC,

        shortName: 'MATIC',
        fullName: 'Polygon',
        rateService: AssetRateService.Coingecko,
        rateSymbol: 'polygon',
        decimals: 18
    },
    MIM: {
        Icon: Asset.MIM,

        shortName: 'MIM',
        fullName: 'Magic Internet Money',
        rateService: AssetRateService.Coingecko,
        rateSymbol: 'magic-internet-money',
        decimals: 18
    },
    REN: {
        Icon: Asset.REN,

        shortName: 'REN',
        fullName: 'REN',
        rateService: AssetRateService.Coingecko,
        rateSymbol: 'republic-protocol',
        decimals: 18
    },
    ROOK: {
        Icon: Asset.ROOK,

        shortName: 'ROOK',
        fullName: 'KeeperDAO',
        rateService: AssetRateService.Coingecko,
        rateSymbol: 'rook',
        decimals: 18
    },
    SUSHI: {
        Icon: Asset.SUSHI,

        shortName: 'SUSHI',
        fullName: 'Sushi',
        rateService: AssetRateService.Coingecko,
        rateSymbol: 'sushi',
        decimals: 18
    },
    SOL: {
        Icon: Asset.SOL,

        shortName: 'SOL',
        fullName: 'Solana',
        rateService: AssetRateService.Coingecko,
        rateSymbol: 'solana',
        decimals: 18
    },
    UNI: {
        Icon: Asset.UNI,

        shortName: 'UNI',
        fullName: 'Uniswap',
        rateService: AssetRateService.Coingecko,
        rateSymbol: 'uniswap',
        decimals: 18
    },
    USDC: {
        Icon: Asset.USDC,

        shortName: 'USDC',
        fullName: 'USD Coin',
        rateService: AssetRateService.Coingecko,
        rateSymbol: 'usd-coin',
        decimals: 6
    },
    USDT: {
        Icon: Asset.USDT,

        shortName: 'USDT',
        fullName: 'Tether',
        rateService: AssetRateService.Coingecko,
        rateSymbol: 'tether',
        decimals: 6
    },
    ZEC: {
        Icon: Asset.ZEC,

        shortName: 'ZEC',
        fullName: 'Zcash',
        rateService: AssetRateService.Coingecko,
        rateSymbol: 'zcash',
        decimals: 8
    },
    gETH: {
        Icon: Asset.ETH,

        shortName: 'gETH',
        fullName: 'Goerli Ether',
        rateService: AssetRateService.Coingecko,
        rateSymbol: 'ethereum',
        decimals: 18
    },
    oETH: {
        Icon: Asset.oETH,

        shortName: 'oETH',
        fullName: 'Optimism Ether',
        rateService: AssetRateService.Coingecko,
        rateSymbol: 'ethereum',
        decimals: 18
    },
    USDT_Goerli: {
        Icon: Asset.USDT_Goerli,

        shortName: 'USDT_Goerli',
        fullName: 'Tether',
        rateService: AssetRateService.Coingecko,
        rateSymbol: 'tether',
        decimals: 6
    },
    USDC_Goerli: {
        Icon: Asset.USDC_Goerli,

        shortName: 'USDC_Goerli',
        fullName: 'USD Coin',
        rateService: AssetRateService.Coingecko,
        rateSymbol: 'usd-coin',
        decimals: 6
    },
    REN_Goerli: {
        Icon: Asset.REN_Goerli,

        shortName: 'REN_Goerli',
        fullName: 'REN',
        rateService: AssetRateService.Coingecko,
        rateSymbol: 'republic-protocol',
        decimals: 18
    },
    DAI_Goerli: {
        Icon: Asset.DAI_Goerli,

        shortName: 'DAI_Goerli',
        fullName: 'Dai',
        rateService: AssetRateService.Coingecko,
        rateSymbol: 'dai',
        decimals: 18
    },
    ASTRAL_USDT: {
        Icon: Asset.ASTRAL_USDT,

        shortName: 'ASTRAL_USDT',
        fullName: 'ASTRAL_USDT',
        rateService: AssetRateService.Coingecko,
        rateSymbol: 'tether',
        decimals: 6
    }
};

export type AssetChainsConfig = {
  lockChain: Chain;
  mintChains: Array<Chain>;
  lockChainConnectionRequired?: boolean; // better name?
};

export type AssetColorConfig = {
  color: string;
};

export type AssetConfig = AssetBaseConfig &
  AssetColorConfig &
  AssetChainsConfig;

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
  const entry = Object.entries(assetsConfig).find(
    ([_, config]) => config.rateSymbol === symbol
  );
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

export const supportedAssets = [
    Asset.USDT_Goerli,
    Asset.USDT,
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
];

export const supportedAssets2 = [
    Asset.ASTRAL_USDT,
    Asset.USDT,
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
    Asset.KNC
];

export const whiteListedEVMAssets = [
  Asset.gETH,
  Asset.ETH,
  Asset.BNB,
  Asset.MATIC,
  Asset.oETH,
  Asset.AVAX,
  Asset.KAVA,
  Asset.FTM,
  Asset.ArbETH,
  Asset.GLMR,
  Asset.REN_Goerli,
  Asset.DAI_Goerli,
  Asset.USDC_Goerli,
  Asset.USDT_Goerli,
  Asset.DAI_Goerli,
];

export const WhiteListedLegacyAssets = [
  Asset.BTC,
  Asset.BCH,
  Asset.DGB,
  Asset.DOGE,
  Asset.FIL,
  Asset.LUNA,
  Asset.ZEC,
];

export const whiteListedEVMAssetsALPHA_NATIVE = [
  Asset.USDT_Goerli
];

export const whiteListedEVMAssetsALPHA_SYNTH = [
    Asset.ASTRAL_USDT,
];

