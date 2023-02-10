import {
  Arbitrum,
  Avalanche,
  BinanceSmartChain,
  Ethereum,
  Fantom,
  Kava,
  Moonbeam,
  Optimism,
  Polygon,
} from "@renproject/chains-ethereum";
import { Chain, Asset } from "@renproject/chains";
import { BridgeDeployments } from "./deployments";

type AssetBaseConfig = {
  [asset: string]: {
    tokenAddress: string;
    mintGatewayAddress: string;
  };
};
export type ChainBaseConfig = {
  bridgeAddress: string;
  multicallContract: string;
  chain: Chain;
  assets: AssetBaseConfig;
};

export const chainAdresses: { [chain: string]: ChainBaseConfig } = {
  [Arbitrum.chain]: {
    bridgeAddress: BridgeDeployments[Arbitrum.chain]!,
    multicallContract: "0x442576f76F190FEbbCd83C3f4A879aC27675C923",
    chain: Chain.Arbitrum,
    assets: {
      [Asset.BTC]: {
        tokenAddress: "0x43D828c81Ea229f5F4601D12C5EC00133bD17dE1",
        mintGatewayAddress: "0xF47dff1B8442f6f37491DF74c058904AB2d306fd",
      },
      [Asset.ZEC]: {
        tokenAddress: "0xb98E6dA48F27e86D32dc9ab8721ce19c95E206b8",
        mintGatewayAddress: "0x83785ad4B3B5255Af409Da3e34052ca5eaa8f9d5",
      },
      [Asset.BCH]: {
        tokenAddress: "0x5AF020172107C379a62D8C9B1614d3038186E0eA",
        mintGatewayAddress: "0x07deB3917d234f787AEd86E0c88E829277D4a33b",
      },
      [Asset.DOGE]: {
        tokenAddress: "0xBB25c81031ae580B0029dA1859c625e87e5468cD",
        mintGatewayAddress: "0xd46aBBa0936915d8B34c6a5d4687241413e1B142",
      },
      [Asset.DGB]: {
        tokenAddress: "0xec1fbb79bcA682EF2CCcBE6194Ab62413e6c7895",
        mintGatewayAddress: "0x84c9eb3c7e21714dfEe7c1AA91800a8B365daa9E",
      },
      [Asset.FIL]: {
        tokenAddress: "0x527C7f02588D0d1fba5059d3D69DF55E44186F9e",
        mintGatewayAddress: "0xcD2D8f9E9f6A0Ef47FD3F8dDD011ee2B12Ae91D9",
      },
      [Asset.LUNA]: {
        tokenAddress: "0xCa920A213f8f20406612eB02AA00EDDdAf5005EF",
        mintGatewayAddress: "0xa6e39c23fe29D15b0302E8ca234b365328fD49B5",
      },
      ["ibBTC"]: {
        tokenAddress: "0x1d3FfDd58f17bfD204B770CBA6d67A6c048A5Ab7",
        mintGatewayAddress: "0x1a4F5BE3cce35D5e3302c0F3b993a32eFFe8817a",
      },
      [Asset.REN]: {
        tokenAddress: "0x20aA737F98e93aD5092EF2024E5d3a2c8E18edA4",
        mintGatewayAddress: "0x0522d5e6108Dc6F6A9B2f6BC233416FA040618ad",
      },
      [Asset.DAI]: {
        tokenAddress: "0x5E5f602c982C196141D4eE0d1d05DAf3a9ABE5c9",
        mintGatewayAddress: "0xF61E124cA54EACF86507D0d7d927Fe38EeF8C100",
      },
      [Asset.USDC]: {
        tokenAddress: "0x7bCeCc655AEB8eb5a15f854490f643Bd34448508",
        mintGatewayAddress: "0x5f6d1b16246A3ba21D9036ceCcdB495ff65b09ED",
      },
      [Asset.USDT]: {
        tokenAddress: "0x3ab7632A1cbEAbC1422F8fE24750C1ea66e169BC",
        mintGatewayAddress: "0x3657a1F93E3d55FED214bFA8039fA1D814a5fE3f",
      },
      [Asset.EURT]: {
        tokenAddress: "0xe2d8C484411D8fCD5Af35C081d71591bAFDceF5B",
        mintGatewayAddress: "0xb92D83260ecB1B2b30645f3C0c88a26E2747e329",
      },
      [Asset.BUSD]: {
        tokenAddress: "0x79E28f786E6Ba3C7fa755D99191fe2e9b3d33d77",
        mintGatewayAddress: "0x3d7194D9e5812AAD72d0090485eFf721B76F2B39",
      },
      [Asset.MIM]: {
        tokenAddress: "0x38B31b1Ee77AAd541808D3c6052c4C64ca61Da72",
        mintGatewayAddress: "0x4f4DFF8e4985AA26d68A451920a0dCC4eAaB367f",
      },
      [Asset.CRV]: {
        tokenAddress: "0x0C3C180D731E7d0826f92F8f312456752b800b24",
        mintGatewayAddress: "0x5EBb45521B925A11B53C06A0495B6A227eC3AdcF",
      },
      [Asset.LINK]: {
        tokenAddress: "0xd1590209769BC9eb645ee523A355CB7dB6BDAf33",
        mintGatewayAddress: "0x15dff465d7Bd75DFbd107924D9d674dA156328AD",
      },
      [Asset.UNI]: {
        tokenAddress: "0x8648d79572Eec4dEd03dE40C747564BD6ddB9091",
        mintGatewayAddress: "0x2d8E10901399586A3a8e04ec25f3a5548F51E91B",
      },
      [Asset.SUSHI]: {
        tokenAddress: "0xa901047Cb7F93d0D9d72334Bad1871082AFB4F0e",
        mintGatewayAddress: "0x9994aABFcAF8590095DbFaE44a6662E5D2013740",
      },
      [Asset.FTT]: {
        tokenAddress: "0x429940e4c699b9114C7fBf1c52d81704f7746Fd1",
        mintGatewayAddress: "0x63b8060Ad5317BA35F1b3c4dd8339294D0F580ee",
      },
      [Asset.ROOK]: {
        tokenAddress: "0x83E374aC386779CC5782509bD682E853b854eDF7",
        mintGatewayAddress: "0xf19970b7cF852F5d96B8B95A0d9828Ad1E84d749",
      },
      [Asset.BADGER]: {
        tokenAddress: "0xC47C76D33fc7Bb57D6d2845E3B82558752cA5Fbe",
        mintGatewayAddress: "0x465a0b226a175F1392F324bcdaE046987b3ffcB9",
      },
      [Asset.KNC]: {
        tokenAddress: "0x8759CD7B4b926AdF4Da4dBeee76c97C05C071B46",
        mintGatewayAddress: "0xA32DB7c8b405c66457d7f11e17b2c270E44961a4",
      },
      [Asset.ETH]: {
        tokenAddress: "0xf72cDECe7eA0821F4789002701db1A662d399342",
        mintGatewayAddress: "0xc39ccf0E1644844358C657B9bF9B6e0D636Ae6Cc",
      },
      [Asset.BNB]: {
        tokenAddress: "0xf600DF44E1330b30Fab580BC4aEFCF031520a94A",
        mintGatewayAddress: "0x0E88eD2220519f60341e19bDdC37E76923ca41D3",
      },
      [Asset.FTM]: {
        tokenAddress: "0x6446E04f4829FcbAD012C933d2FB65B01CE62EA2",
        mintGatewayAddress: "0xa9d345a20fD38Da52173198C3FB7276a8F0Fb36E",
      },
      [Asset.MATIC]: {
        tokenAddress: "0x0F323557938489Ffe83cf7DC951e879fCF8C48d8",
        mintGatewayAddress: "0x1243A19866718aB4B8bb69dA9B68e83841d0Fd68",
      },
      [Asset.AVAX]: {
        tokenAddress: "0xa1ba3fD170833BaB86761780070D069b1F0033eB",
        mintGatewayAddress: "0x826EEC9eAe16720Db6C5E59DE8bfee030ce13a3a",
      },
      [Asset.gETH]: {
        tokenAddress: "0x238282B65EfeA1f80a3A1B23b85B78Ff743da9c6",
        mintGatewayAddress: "0xc90ff883a2D4E5F46731766ff92aEcB1AdDc9770",
      },
      [Asset.GLMR]: {
        tokenAddress: "0xffA5d332DA402682f15dab9528213baf37352F44",
        mintGatewayAddress: "0x866724cE6C167d9517b8229c4B70ef9A0026839e",
      },
      [Asset.KAVA]: {
        tokenAddress: "0xCFA0859D44D64daEB000b9eD7a14772459da42cA",
        mintGatewayAddress: "0xf8eD1f5433e7BE58332FB124D56c6d67e990DF91",
      },
      [Asset.oETH]: {
        tokenAddress: "0x6A70A587451Eae2117693926863BcdCa244Db61A",
        mintGatewayAddress: "0xfb6c3F4467496AEa90956d8CD1873D790659E94D",
      },
      ["REN_Goerli"]: {
        tokenAddress: "0xf147382E2e18D252EA57C4cb79C8BB3794739e53",
        mintGatewayAddress: "0x7260871a5F92d9f9B9d2b914B2eF932A6d8689A9",
      },
      ["DAI_Goerli"]: {
        tokenAddress: "0xd80FD06C79B21763329488EB4B96551Cd5ECD08f",
        mintGatewayAddress: "0xf8cF76E32Fe3063d79Ff9D75701d2Bb89311fE03",
      },
      ["USDC_Goerli"]: {
        tokenAddress: "0x2b8435cAe98a18EaF080dDC4f72392A94b5c4556",
        mintGatewayAddress: "0xcA24bC8A2f203f8aC6a2A5BBCaAB4d905047Db75",
      },
      ["USDT_Goerli"]: {
        tokenAddress: "0xF0dbeB58522b96cdCdB790BCaD9Fd8Da7D7fa35c",
        mintGatewayAddress: "0xda07AD211799496A8473cdeBAA91Df03db156644",
      },
    },
  },
  [Avalanche.chain]: {
    bridgeAddress: BridgeDeployments[Avalanche.chain]!,
    multicallContract: "0x442576f76F190FEbbCd83C3f4A879aC27675C923",
    chain: Chain.Avalanche,
    assets: {
      [Asset.BTC]: {
        tokenAddress: "0x880Ad65DC5B3F33123382416351Eef98B4aAd7F1",
        mintGatewayAddress: "0x29Aa535b65b9C9A08bEdEbA8F9398aAf4832F98b",
      },
      [Asset.ZEC]: {
        tokenAddress: "0xEF685D1D44EA983927D9F8D67F77894fAEC92FCF",
        mintGatewayAddress: "0xF9fAE250B8dda539B9AFfEb606C8e2631976413E",
      },
      [Asset.BCH]: {
        tokenAddress: "0x6662449d05312Afe0Ca147Db6Eb155641077883F",
        mintGatewayAddress: "0x42c72B4090Ed0627c85ED878f699B2dB254beECa",
      },
      [Asset.DOGE]: {
        tokenAddress: "0x799709491B1A26B867450bc68aC0d10979884aae",
        mintGatewayAddress: "0x6268002A734EDcDe6c2111ae339E0D92B1ED2Bfa",
      },
      [Asset.DGB]: {
        tokenAddress: "0xc96884276D70a1176b2fe102469348d224B0A1fa",
        mintGatewayAddress: "0x7352e7244899b7Cb5d803CC02741c8910d3B75de",
      },
      [Asset.FIL]: {
        tokenAddress: "0xcf3B06E64dc24CCd4Add10E6f97D8EF0438D6e54",
        mintGatewayAddress: "0xec1fbb79bcA682EF2CCcBE6194Ab62413e6c7895",
      },
      [Asset.LUNA]: {
        tokenAddress: "0x59fE85a45D2ecBDB1499dab315A109De8E4e2DAd",
        mintGatewayAddress: "0xA0b04e9D8B883626769Ac23aF4fb019e34B944C4",
      },
      [Asset.ETH]: {
        tokenAddress: "0xf72cDECe7eA0821F4789002701db1A662d399342",
        mintGatewayAddress: "0xc39ccf0E1644844358C657B9bF9B6e0D636Ae6Cc",
      },
      [Asset.DAI]: {
        tokenAddress: "0x5E5f602c982C196141D4eE0d1d05DAf3a9ABE5c9",
        mintGatewayAddress: "0xF61E124cA54EACF86507D0d7d927Fe38EeF8C100",
      },
      [Asset.REN]: {
        tokenAddress: "0x20aA737F98e93aD5092EF2024E5d3a2c8E18edA4",
        mintGatewayAddress: "0x0522d5e6108Dc6F6A9B2f6BC233416FA040618ad",
      },
      [Asset.USDC]: {
        tokenAddress: "0x7bCeCc655AEB8eb5a15f854490f643Bd34448508",
        mintGatewayAddress: "0x5f6d1b16246A3ba21D9036ceCcdB495ff65b09ED",
      },
      [Asset.USDT]: {
        tokenAddress: "0x3ab7632A1cbEAbC1422F8fE24750C1ea66e169BC",
        mintGatewayAddress: "0x3657a1F93E3d55FED214bFA8039fA1D814a5fE3f",
      },
      [Asset.EURT]: {
        tokenAddress: "0xe2d8C484411D8fCD5Af35C081d71591bAFDceF5B",
        mintGatewayAddress: "0xb92D83260ecB1B2b30645f3C0c88a26E2747e329",
      },
      [Asset.BUSD]: {
        tokenAddress: "0x79E28f786E6Ba3C7fa755D99191fe2e9b3d33d77",
        mintGatewayAddress: "0x3d7194D9e5812AAD72d0090485eFf721B76F2B39",
      },
      [Asset.MIM]: {
        tokenAddress: "0x38B31b1Ee77AAd541808D3c6052c4C64ca61Da72",
        mintGatewayAddress: "0x4f4DFF8e4985AA26d68A451920a0dCC4eAaB367f",
      },
      [Asset.CRV]: {
        tokenAddress: "0x0C3C180D731E7d0826f92F8f312456752b800b24",
        mintGatewayAddress: "0x5EBb45521B925A11B53C06A0495B6A227eC3AdcF",
      },
      [Asset.LINK]: {
        tokenAddress: "0xd1590209769BC9eb645ee523A355CB7dB6BDAf33",
        mintGatewayAddress: "0x15dff465d7Bd75DFbd107924D9d674dA156328AD",
      },
      [Asset.UNI]: {
        tokenAddress: "0x8648d79572Eec4dEd03dE40C747564BD6ddB9091",
        mintGatewayAddress: "0x2d8E10901399586A3a8e04ec25f3a5548F51E91B",
      },
      [Asset.SUSHI]: {
        tokenAddress: "0xa901047Cb7F93d0D9d72334Bad1871082AFB4F0e",
        mintGatewayAddress: "0x9994aABFcAF8590095DbFaE44a6662E5D2013740",
      },
      [Asset.FTT]: {
        tokenAddress: "0x429940e4c699b9114C7fBf1c52d81704f7746Fd1",
        mintGatewayAddress: "0x63b8060Ad5317BA35F1b3c4dd8339294D0F580ee",
      },
      [Asset.ROOK]: {
        tokenAddress: "0x83E374aC386779CC5782509bD682E853b854eDF7",
        mintGatewayAddress: "0xf19970b7cF852F5d96B8B95A0d9828Ad1E84d749",
      },
      [Asset.BADGER]: {
        tokenAddress: "0xC47C76D33fc7Bb57D6d2845E3B82558752cA5Fbe",
        mintGatewayAddress: "0x465a0b226a175F1392F324bcdaE046987b3ffcB9",
      },
      [Asset.KNC]: {
        tokenAddress: "0x8759CD7B4b926AdF4Da4dBeee76c97C05C071B46",
        mintGatewayAddress: "0xA32DB7c8b405c66457d7f11e17b2c270E44961a4",
      },
      [Asset.ArbETH]: {
        tokenAddress: "0x0f709956660FBc0DA83Efd32b213606Ea75F0e69",
        mintGatewayAddress: "0xaa2DC89fD6C1d82bd0AE3D979588906227Bf9BE1",
      },
      [Asset.BNB]: {
        tokenAddress: "0xf600DF44E1330b30Fab580BC4aEFCF031520a94A",
        mintGatewayAddress: "0x0E88eD2220519f60341e19bDdC37E76923ca41D3",
      },
      [Asset.FTM]: {
        tokenAddress: "0x6446E04f4829FcbAD012C933d2FB65B01CE62EA2",
        mintGatewayAddress: "0xa9d345a20fD38Da52173198C3FB7276a8F0Fb36E",
      },
      [Asset.gETH]: {
        tokenAddress: "0x238282B65EfeA1f80a3A1B23b85B78Ff743da9c6",
        mintGatewayAddress: "0xc90ff883a2D4E5F46731766ff92aEcB1AdDc9770",
      },
      [Asset.MATIC]: {
        tokenAddress: "0x0F323557938489Ffe83cf7DC951e879fCF8C48d8",
        mintGatewayAddress: "0x1243A19866718aB4B8bb69dA9B68e83841d0Fd68",
      },
      [Asset.GLMR]: {
        tokenAddress: "0xffA5d332DA402682f15dab9528213baf37352F44",
        mintGatewayAddress: "0x866724cE6C167d9517b8229c4B70ef9A0026839e",
      },
      [Asset.KAVA]: {
        tokenAddress: "0xCFA0859D44D64daEB000b9eD7a14772459da42cA",
        mintGatewayAddress: "0xf8eD1f5433e7BE58332FB124D56c6d67e990DF91",
      },
      ["ibBTC"]: {
        tokenAddress: "0x1d3FfDd58f17bfD204B770CBA6d67A6c048A5Ab7",
        mintGatewayAddress: "0x1a4F5BE3cce35D5e3302c0F3b993a32eFFe8817a",
      },
      [Asset.oETH]: {
        tokenAddress: "0x6A70A587451Eae2117693926863BcdCa244Db61A",
        mintGatewayAddress: "0xfb6c3F4467496AEa90956d8CD1873D790659E94D",
      },
      ["REN_Goerli"]: {
        tokenAddress: "0xf147382E2e18D252EA57C4cb79C8BB3794739e53",
        mintGatewayAddress: "0x7260871a5F92d9f9B9d2b914B2eF932A6d8689A9",
      },
      ["DAI_Goerli"]: {
        tokenAddress: "0xd80FD06C79B21763329488EB4B96551Cd5ECD08f",
        mintGatewayAddress: "0xf8cF76E32Fe3063d79Ff9D75701d2Bb89311fE03",
      },
      ["USDC_Goerli"]: {
        tokenAddress: "0x2b8435cAe98a18EaF080dDC4f72392A94b5c4556",
        mintGatewayAddress: "0xcA24bC8A2f203f8aC6a2A5BBCaAB4d905047Db75",
      },
      ["USDT_Goerli"]: {
        tokenAddress: "0xF0dbeB58522b96cdCdB790BCaD9Fd8Da7D7fa35c",
        mintGatewayAddress: "0xda07AD211799496A8473cdeBAA91Df03db156644",
      },
    },
  },
  [BinanceSmartChain.chain]: {
    bridgeAddress: BridgeDeployments[BinanceSmartChain.chain]!,
    multicallContract: "0x442576f76F190FEbbCd83C3f4A879aC27675C923",
    chain: Chain.BinanceSmartChain,
    assets: {
      [Asset.BTC]: {
        tokenAddress: "0x5eB4F537889eC3C7Ec397F1acB33c70D8C0ee438",
        mintGatewayAddress: "0x6003FD1C2d4eeDed7cb5E89923AB457d1DE5cE89",
      },
      [Asset.DOGE]: {
        tokenAddress: "0xAF787a25241c69ae213A8Ee08a2518D858b32dBd",
        mintGatewayAddress: "0x7517FadFA7247ffe52d57c78780FfF0662a09936",
      },
      [Asset.ZEC]: {
        tokenAddress: "0xD566bB681a231f5648D7cB0f09A89cb47fd09513",
        mintGatewayAddress: "0x00E094aff24746196Bf73491A4C276fa4db503b4",
      },
      [Asset.BCH]: {
        tokenAddress: "0xE980BC9e17094EB273c6b5A1139b3A30EcdF05e0",
        mintGatewayAddress: "0xBA7236b2fbe3F12Df15a0d5fcE57d891016822f8",
      },
      [Asset.DGB]: {
        tokenAddress: "0x8C0248Ab26FcD6868Cc5aaea954f0ce28F8E103f",
        mintGatewayAddress: "0xd5E7d585D471BaFF2060dAFeaf701ff89114e439",
      },
      [Asset.FIL]: {
        tokenAddress: "0xDC42759e28e41898BdE199aB044F366dACbF3436",
        mintGatewayAddress: "0xF461Fe16eb3BcFC6e930dB0bDD2A3aD28636BBB9",
      },
      [Asset.LUNA]: {
        tokenAddress: "0x2c82a39549858A0fF1a369D84695D983791d0786",
        mintGatewayAddress: "0x26f4F36A070190Ee4379241DD1463A420768EB4B",
      },
      [Asset.ETH]: {
        tokenAddress: "0xf72cDECe7eA0821F4789002701db1A662d399342",
        mintGatewayAddress: "0xc39ccf0E1644844358C657B9bF9B6e0D636Ae6Cc",
      },
      [Asset.DAI]: {
        tokenAddress: "0x5E5f602c982C196141D4eE0d1d05DAf3a9ABE5c9",
        mintGatewayAddress: "0xF61E124cA54EACF86507D0d7d927Fe38EeF8C100",
      },
      [Asset.REN]: {
        tokenAddress: "0x20aA737F98e93aD5092EF2024E5d3a2c8E18edA4",
        mintGatewayAddress: "0x0522d5e6108Dc6F6A9B2f6BC233416FA040618ad",
      },
      [Asset.USDC]: {
        tokenAddress: "0x7bCeCc655AEB8eb5a15f854490f643Bd34448508",
        mintGatewayAddress: "0x5f6d1b16246A3ba21D9036ceCcdB495ff65b09ED",
      },
      [Asset.USDT]: {
        tokenAddress: "0x3ab7632A1cbEAbC1422F8fE24750C1ea66e169BC",
        mintGatewayAddress: "0x3657a1F93E3d55FED214bFA8039fA1D814a5fE3f",
      },
      [Asset.EURT]: {
        tokenAddress: "0xe2d8C484411D8fCD5Af35C081d71591bAFDceF5B",
        mintGatewayAddress: "0xb92D83260ecB1B2b30645f3C0c88a26E2747e329",
      },
      [Asset.BUSD]: {
        tokenAddress: "0x79E28f786E6Ba3C7fa755D99191fe2e9b3d33d77",
        mintGatewayAddress: "0x3d7194D9e5812AAD72d0090485eFf721B76F2B39",
      },
      [Asset.MIM]: {
        tokenAddress: "0x38B31b1Ee77AAd541808D3c6052c4C64ca61Da72",
        mintGatewayAddress: "0x4f4DFF8e4985AA26d68A451920a0dCC4eAaB367f",
      },
      [Asset.CRV]: {
        tokenAddress: "0x0C3C180D731E7d0826f92F8f312456752b800b24",
        mintGatewayAddress: "0x5EBb45521B925A11B53C06A0495B6A227eC3AdcF",
      },
      [Asset.LINK]: {
        tokenAddress: "0xd1590209769BC9eb645ee523A355CB7dB6BDAf33",
        mintGatewayAddress: "0x15dff465d7Bd75DFbd107924D9d674dA156328AD",
      },
      [Asset.UNI]: {
        tokenAddress: "0x8648d79572Eec4dEd03dE40C747564BD6ddB9091",
        mintGatewayAddress: "0x2d8E10901399586A3a8e04ec25f3a5548F51E91B",
      },
      [Asset.SUSHI]: {
        tokenAddress: "0xa901047Cb7F93d0D9d72334Bad1871082AFB4F0e",
        mintGatewayAddress: "0x9994aABFcAF8590095DbFaE44a6662E5D2013740",
      },
      [Asset.FTT]: {
        tokenAddress: "0x429940e4c699b9114C7fBf1c52d81704f7746Fd1",
        mintGatewayAddress: "0x63b8060Ad5317BA35F1b3c4dd8339294D0F580ee",
      },
      [Asset.ROOK]: {
        tokenAddress: "0x83E374aC386779CC5782509bD682E853b854eDF7",
        mintGatewayAddress: "0xf19970b7cF852F5d96B8B95A0d9828Ad1E84d749",
      },
      [Asset.BADGER]: {
        tokenAddress: "0xC47C76D33fc7Bb57D6d2845E3B82558752cA5Fbe",
        mintGatewayAddress: "0x465a0b226a175F1392F324bcdaE046987b3ffcB9",
      },
      [Asset.KNC]: {
        tokenAddress: "0x8759CD7B4b926AdF4Da4dBeee76c97C05C071B46",
        mintGatewayAddress: "0xA32DB7c8b405c66457d7f11e17b2c270E44961a4",
      },
      [Asset.ArbETH]: {
        tokenAddress: "0x0f709956660FBc0DA83Efd32b213606Ea75F0e69",
        mintGatewayAddress: "0xaa2DC89fD6C1d82bd0AE3D979588906227Bf9BE1",
      },
      [Asset.AVAX]: {
        tokenAddress: "0xa1ba3fD170833BaB86761780070D069b1F0033eB",
        mintGatewayAddress: "0x826EEC9eAe16720Db6C5E59DE8bfee030ce13a3a",
      },
      [Asset.FTM]: {
        tokenAddress: "0x6446E04f4829FcbAD012C933d2FB65B01CE62EA2",
        mintGatewayAddress: "0xa9d345a20fD38Da52173198C3FB7276a8F0Fb36E",
      },
      [Asset.gETH]: {
        tokenAddress: "0x238282B65EfeA1f80a3A1B23b85B78Ff743da9c6",
        mintGatewayAddress: "0xc90ff883a2D4E5F46731766ff92aEcB1AdDc9770",
      },
      [Asset.MATIC]: {
        tokenAddress: "0x0F323557938489Ffe83cf7DC951e879fCF8C48d8",
        mintGatewayAddress: "0x1243A19866718aB4B8bb69dA9B68e83841d0Fd68",
      },
      [Asset.GLMR]: {
        tokenAddress: "0xffA5d332DA402682f15dab9528213baf37352F44",
        mintGatewayAddress: "0x866724cE6C167d9517b8229c4B70ef9A0026839e",
      },
      [Asset.KAVA]: {
        tokenAddress: "0xCFA0859D44D64daEB000b9eD7a14772459da42cA",
        mintGatewayAddress: "0xf8eD1f5433e7BE58332FB124D56c6d67e990DF91",
      },
      ["ibBTC"]: {
        tokenAddress: "0x1d3FfDd58f17bfD204B770CBA6d67A6c048A5Ab7",
        mintGatewayAddress: "0x1a4F5BE3cce35D5e3302c0F3b993a32eFFe8817a",
      },
      [Asset.oETH]: {
        tokenAddress: "0x6A70A587451Eae2117693926863BcdCa244Db61A",
        mintGatewayAddress: "0xfb6c3F4467496AEa90956d8CD1873D790659E94D",
      },
      ["REN_Goerli"]: {
        tokenAddress: "0xf147382E2e18D252EA57C4cb79C8BB3794739e53",
        mintGatewayAddress: "0x7260871a5F92d9f9B9d2b914B2eF932A6d8689A9",
      },
      ["DAI_Goerli"]: {
        tokenAddress: "0xd80FD06C79B21763329488EB4B96551Cd5ECD08f",
        mintGatewayAddress: "0xf8cF76E32Fe3063d79Ff9D75701d2Bb89311fE03",
      },
      ["USDC_Goerli"]: {
        tokenAddress: "0x2b8435cAe98a18EaF080dDC4f72392A94b5c4556",
        mintGatewayAddress: "0xcA24bC8A2f203f8aC6a2A5BBCaAB4d905047Db75",
      },
      ["USDT_Goerli"]: {
        tokenAddress: "0xF0dbeB58522b96cdCdB790BCaD9Fd8Da7D7fa35c",
        mintGatewayAddress: "0xda07AD211799496A8473cdeBAA91Df03db156644",
      },
    },
  },
  [Ethereum.chain]: {
    bridgeAddress: BridgeDeployments[Ethereum.chain]!,
    multicallContract: "0x57B249fCF4b71c0c1E3f51fE25bC358ae6705b79",
    chain: Chain.Ethereum,
    assets: {
      [Asset.BTC]: {
        tokenAddress: "0x880Ad65DC5B3F33123382416351Eef98B4aAd7F1",
        mintGatewayAddress: "0x29Aa535b65b9C9A08bEdEbA8F9398aAf4832F98b",
      },
      [Asset.ZEC]: {
        tokenAddress: "0xf98A573BEabDB73a2d8697001bD411c21CBb89b1",
        mintGatewayAddress: "0x098ecF3bEb11E308f1B9C38c1E1b50c10FC02af3",
      },
      [Asset.BCH]: {
        tokenAddress: "0xc735241F93F87D4DBEA499EE6e1d41Ec50e3D8cE",
        mintGatewayAddress: "0xe1Ae770a368ef05158c65c572701778575Da85d0",
      },
      [Asset.DGB]: {
        tokenAddress: "0x6268002A734EDcDe6c2111ae339E0D92B1ED2Bfa",
        mintGatewayAddress: "0x20471d322f20E3cAE8f8b75D1481B5BD53c41695",
      },
      [Asset.DOGE]: {
        tokenAddress: "0x7352e7244899b7Cb5d803CC02741c8910d3B75de",
        mintGatewayAddress: "0x0E6bbBb35835cC3624a000e1698B7B68E9eeC7DF",
      },
      [Asset.FIL]: {
        tokenAddress: "0x1156663dFab56A9BAdd844e12eDD69eC96Dd0eFb",
        mintGatewayAddress: "0x038b63C120a7e60946d6EbAa6Dcfc3a475108cc9",
      },
      [Asset.LUNA]: {
        tokenAddress: "0xA0b04e9D8B883626769Ac23aF4fb019e34B944C4",
        mintGatewayAddress: "0x75A33b43Af9d532da65750c01F5fAB3c3FC0b8F9",
      },
      [Asset.ETH]: {
        tokenAddress: "0xf72cDECe7eA0821F4789002701db1A662d399342",
        mintGatewayAddress: "0xc39ccf0E1644844358C657B9bF9B6e0D636Ae6Cc",
      },
      [Asset.DAI]: {
        tokenAddress: "0x5E5f602c982C196141D4eE0d1d05DAf3a9ABE5c9",
        mintGatewayAddress: "0xF61E124cA54EACF86507D0d7d927Fe38EeF8C100",
      },
      [Asset.REN]: {
        tokenAddress: "0x20aA737F98e93aD5092EF2024E5d3a2c8E18edA4",
        mintGatewayAddress: "0x0522d5e6108Dc6F6A9B2f6BC233416FA040618ad",
      },
      [Asset.USDC]: {
        tokenAddress: "0x7bCeCc655AEB8eb5a15f854490f643Bd34448508",
        mintGatewayAddress: "0x5f6d1b16246A3ba21D9036ceCcdB495ff65b09ED",
      },
      [Asset.USDT]: {
        tokenAddress: "0x3ab7632A1cbEAbC1422F8fE24750C1ea66e169BC",
        mintGatewayAddress: "0x3657a1F93E3d55FED214bFA8039fA1D814a5fE3f",
      },
      [Asset.EURT]: {
        tokenAddress: "0xe2d8C484411D8fCD5Af35C081d71591bAFDceF5B",
        mintGatewayAddress: "0xb92D83260ecB1B2b30645f3C0c88a26E2747e329",
      },
      [Asset.BUSD]: {
        tokenAddress: "0x79E28f786E6Ba3C7fa755D99191fe2e9b3d33d77",
        mintGatewayAddress: "0x3d7194D9e5812AAD72d0090485eFf721B76F2B39",
      },
      [Asset.MIM]: {
        tokenAddress: "0x38B31b1Ee77AAd541808D3c6052c4C64ca61Da72",
        mintGatewayAddress: "0x4f4DFF8e4985AA26d68A451920a0dCC4eAaB367f",
      },
      [Asset.CRV]: {
        tokenAddress: "0x0C3C180D731E7d0826f92F8f312456752b800b24",
        mintGatewayAddress: "0x5EBb45521B925A11B53C06A0495B6A227eC3AdcF",
      },
      [Asset.LINK]: {
        tokenAddress: "0xd1590209769BC9eb645ee523A355CB7dB6BDAf33",
        mintGatewayAddress: "0x15dff465d7Bd75DFbd107924D9d674dA156328AD",
      },
      [Asset.UNI]: {
        tokenAddress: "0x8648d79572Eec4dEd03dE40C747564BD6ddB9091",
        mintGatewayAddress: "0x2d8E10901399586A3a8e04ec25f3a5548F51E91B",
      },
      [Asset.SUSHI]: {
        tokenAddress: "0xa901047Cb7F93d0D9d72334Bad1871082AFB4F0e",
        mintGatewayAddress: "0x9994aABFcAF8590095DbFaE44a6662E5D2013740",
      },
      [Asset.FTT]: {
        tokenAddress: "0x429940e4c699b9114C7fBf1c52d81704f7746Fd1",
        mintGatewayAddress: "0x63b8060Ad5317BA35F1b3c4dd8339294D0F580ee",
      },
      [Asset.ROOK]: {
        tokenAddress: "0x83E374aC386779CC5782509bD682E853b854eDF7",
        mintGatewayAddress: "0xf19970b7cF852F5d96B8B95A0d9828Ad1E84d749",
      },
      [Asset.BADGER]: {
        tokenAddress: "0xC47C76D33fc7Bb57D6d2845E3B82558752cA5Fbe",
        mintGatewayAddress: "0x465a0b226a175F1392F324bcdaE046987b3ffcB9",
      },
      [Asset.KNC]: {
        tokenAddress: "0x8759CD7B4b926AdF4Da4dBeee76c97C05C071B46",
        mintGatewayAddress: "0xA32DB7c8b405c66457d7f11e17b2c270E44961a4",
      },
      [Asset.ArbETH]: {
        tokenAddress: "0x0f709956660FBc0DA83Efd32b213606Ea75F0e69",
        mintGatewayAddress: "0xaa2DC89fD6C1d82bd0AE3D979588906227Bf9BE1",
      },
      [Asset.AVAX]: {
        tokenAddress: "0xa1ba3fD170833BaB86761780070D069b1F0033eB",
        mintGatewayAddress: "0x826EEC9eAe16720Db6C5E59DE8bfee030ce13a3a",
      },
      [Asset.BNB]: {
        tokenAddress: "0xf600DF44E1330b30Fab580BC4aEFCF031520a94A",
        mintGatewayAddress: "0x0E88eD2220519f60341e19bDdC37E76923ca41D3",
      },
      [Asset.FTM]: {
        tokenAddress: "0x6446E04f4829FcbAD012C933d2FB65B01CE62EA2",
        mintGatewayAddress: "0xa9d345a20fD38Da52173198C3FB7276a8F0Fb36E",
      },
      [Asset.MATIC]: {
        tokenAddress: "0x0F323557938489Ffe83cf7DC951e879fCF8C48d8",
        mintGatewayAddress: "0x1243A19866718aB4B8bb69dA9B68e83841d0Fd68",
      },
      [Asset.GLMR]: {
        tokenAddress: "0xffA5d332DA402682f15dab9528213baf37352F44",
        mintGatewayAddress: "0x866724cE6C167d9517b8229c4B70ef9A0026839e",
      },
      [Asset.KAVA]: {
        tokenAddress: "0xCFA0859D44D64daEB000b9eD7a14772459da42cA",
        mintGatewayAddress: "0xf8eD1f5433e7BE58332FB124D56c6d67e990DF91",
      },
      ["ibBTC"]: {
        tokenAddress: "0x1d3FfDd58f17bfD204B770CBA6d67A6c048A5Ab7",
        mintGatewayAddress: "0x1a4F5BE3cce35D5e3302c0F3b993a32eFFe8817a",
      },
      [Asset.oETH]: {
        tokenAddress: "0x6A70A587451Eae2117693926863BcdCa244Db61A",
        mintGatewayAddress: "0xfb6c3F4467496AEa90956d8CD1873D790659E94D",
      },
    },
  },
  [Fantom.chain]: {
    bridgeAddress: BridgeDeployments[Fantom.chain]!,
    multicallContract: "0x442576f76F190FEbbCd83C3f4A879aC27675C923",
    chain: Chain.Fantom,
    assets: {
      [Asset.BTC]: {
        tokenAddress: "0xe10d0253Aa8242d542265607cb9253FF8b8bf68e",
        mintGatewayAddress: "0xcCfFF6762Ce0Cad34Fda40300da72CB3c355C75f",
      },
      [Asset.ZEC]: {
        tokenAddress: "0xcEe1D5a9DD8bcD337eAbE9D53c0754E60C404c9F",
        mintGatewayAddress: "0x31A320f0Af9897eF1bf2599f681d727d377F24Bf",
      },
      [Asset.BCH]: {
        tokenAddress: "0x44d4ee551934cfC8aD7f9Ae20ce4bA58f7ed9D3C",
        mintGatewayAddress: "0xBef2E118E4138D6aF64Dd8cFa12918104F16A27E",
      },
      [Asset.DOGE]: {
        tokenAddress: "0x6FCa0Ef511F2Dad8B51e55E3eB8E4404AFD2Feb0",
        mintGatewayAddress: "0xC50BDE3Cb2eedC62abB10247F5cE785Afb00245F",
      },
      [Asset.DGB]: {
        tokenAddress: "0x8e95761fF55Ec16ffc1845273387E17d829F3026",
        mintGatewayAddress: "0x15Bb312a96ca334348E98F6284B23D0Ce5Df1267",
      },
      [Asset.FIL]: {
        tokenAddress: "0xEd9780F478a28786A30C51d004972910bb8778fd",
        mintGatewayAddress: "0xD566bB681a231f5648D7cB0f09A89cb47fd09513",
      },
      [Asset.LUNA]: {
        tokenAddress: "0x671c7f6319d04999dE58aF32075C50061383240F",
        mintGatewayAddress: "0x075046dE7D7e708da1593bB7476dE0547a3A057a",
      },
      [Asset.ETH]: {
        tokenAddress: "0xf72cDECe7eA0821F4789002701db1A662d399342",
        mintGatewayAddress: "0xc39ccf0E1644844358C657B9bF9B6e0D636Ae6Cc",
      },
      [Asset.DAI]: {
        tokenAddress: "0x5E5f602c982C196141D4eE0d1d05DAf3a9ABE5c9",
        mintGatewayAddress: "0xF61E124cA54EACF86507D0d7d927Fe38EeF8C100",
      },
      [Asset.REN]: {
        tokenAddress: "0x20aA737F98e93aD5092EF2024E5d3a2c8E18edA4",
        mintGatewayAddress: "0x0522d5e6108Dc6F6A9B2f6BC233416FA040618ad",
      },
      [Asset.USDC]: {
        tokenAddress: "0x7bCeCc655AEB8eb5a15f854490f643Bd34448508",
        mintGatewayAddress: "0x5f6d1b16246A3ba21D9036ceCcdB495ff65b09ED",
      },
      [Asset.USDT]: {
        tokenAddress: "0x3ab7632A1cbEAbC1422F8fE24750C1ea66e169BC",
        mintGatewayAddress: "0x3657a1F93E3d55FED214bFA8039fA1D814a5fE3f",
      },
      [Asset.EURT]: {
        tokenAddress: "0xe2d8C484411D8fCD5Af35C081d71591bAFDceF5B",
        mintGatewayAddress: "0xb92D83260ecB1B2b30645f3C0c88a26E2747e329",
      },
      [Asset.BUSD]: {
        tokenAddress: "0x79E28f786E6Ba3C7fa755D99191fe2e9b3d33d77",
        mintGatewayAddress: "0x3d7194D9e5812AAD72d0090485eFf721B76F2B39",
      },
      [Asset.MIM]: {
        tokenAddress: "0x38B31b1Ee77AAd541808D3c6052c4C64ca61Da72",
        mintGatewayAddress: "0x4f4DFF8e4985AA26d68A451920a0dCC4eAaB367f",
      },
      [Asset.CRV]: {
        tokenAddress: "0x0C3C180D731E7d0826f92F8f312456752b800b24",
        mintGatewayAddress: "0x5EBb45521B925A11B53C06A0495B6A227eC3AdcF",
      },
      [Asset.LINK]: {
        tokenAddress: "0xd1590209769BC9eb645ee523A355CB7dB6BDAf33",
        mintGatewayAddress: "0x15dff465d7Bd75DFbd107924D9d674dA156328AD",
      },
      [Asset.UNI]: {
        tokenAddress: "0x8648d79572Eec4dEd03dE40C747564BD6ddB9091",
        mintGatewayAddress: "0x2d8E10901399586A3a8e04ec25f3a5548F51E91B",
      },
      [Asset.SUSHI]: {
        tokenAddress: "0xa901047Cb7F93d0D9d72334Bad1871082AFB4F0e",
        mintGatewayAddress: "0x9994aABFcAF8590095DbFaE44a6662E5D2013740",
      },
      [Asset.FTT]: {
        tokenAddress: "0x429940e4c699b9114C7fBf1c52d81704f7746Fd1",
        mintGatewayAddress: "0x63b8060Ad5317BA35F1b3c4dd8339294D0F580ee",
      },
      [Asset.ROOK]: {
        tokenAddress: "0x83E374aC386779CC5782509bD682E853b854eDF7",
        mintGatewayAddress: "0xf19970b7cF852F5d96B8B95A0d9828Ad1E84d749",
      },
      [Asset.BADGER]: {
        tokenAddress: "0xC47C76D33fc7Bb57D6d2845E3B82558752cA5Fbe",
        mintGatewayAddress: "0x465a0b226a175F1392F324bcdaE046987b3ffcB9",
      },
      [Asset.KNC]: {
        tokenAddress: "0x8759CD7B4b926AdF4Da4dBeee76c97C05C071B46",
        mintGatewayAddress: "0xA32DB7c8b405c66457d7f11e17b2c270E44961a4",
      },
      [Asset.ArbETH]: {
        tokenAddress: "0x0f709956660FBc0DA83Efd32b213606Ea75F0e69",
        mintGatewayAddress: "0xaa2DC89fD6C1d82bd0AE3D979588906227Bf9BE1",
      },
      [Asset.AVAX]: {
        tokenAddress: "0xa1ba3fD170833BaB86761780070D069b1F0033eB",
        mintGatewayAddress: "0x826EEC9eAe16720Db6C5E59DE8bfee030ce13a3a",
      },
      [Asset.BNB]: {
        tokenAddress: "0xf600DF44E1330b30Fab580BC4aEFCF031520a94A",
        mintGatewayAddress: "0x0E88eD2220519f60341e19bDdC37E76923ca41D3",
      },
      [Asset.gETH]: {
        tokenAddress: "0x238282B65EfeA1f80a3A1B23b85B78Ff743da9c6",
        mintGatewayAddress: "0xc90ff883a2D4E5F46731766ff92aEcB1AdDc9770",
      },
      [Asset.MATIC]: {
        tokenAddress: "0x0F323557938489Ffe83cf7DC951e879fCF8C48d8",
        mintGatewayAddress: "0x1243A19866718aB4B8bb69dA9B68e83841d0Fd68",
      },
      [Asset.GLMR]: {
        tokenAddress: "0xffA5d332DA402682f15dab9528213baf37352F44",
        mintGatewayAddress: "0x866724cE6C167d9517b8229c4B70ef9A0026839e",
      },
      [Asset.KAVA]: {
        tokenAddress: "0xCFA0859D44D64daEB000b9eD7a14772459da42cA",
        mintGatewayAddress: "0xf8eD1f5433e7BE58332FB124D56c6d67e990DF91",
      },
      ["ibBTC"]: {
        tokenAddress: "0x1d3FfDd58f17bfD204B770CBA6d67A6c048A5Ab7",
        mintGatewayAddress: "0x1a4F5BE3cce35D5e3302c0F3b993a32eFFe8817a",
      },
      [Asset.oETH]: {
        tokenAddress: "0x6A70A587451Eae2117693926863BcdCa244Db61A",
        mintGatewayAddress: "0xfb6c3F4467496AEa90956d8CD1873D790659E94D",
      },
      ["REN_Goerli"]: {
        tokenAddress: "0xf147382E2e18D252EA57C4cb79C8BB3794739e53",
        mintGatewayAddress: "0x7260871a5F92d9f9B9d2b914B2eF932A6d8689A9",
      },
      ["DAI_Goerli"]: {
        tokenAddress: "0xd80FD06C79B21763329488EB4B96551Cd5ECD08f",
        mintGatewayAddress: "0xf8cF76E32Fe3063d79Ff9D75701d2Bb89311fE03",
      },
      ["USDC_Goerli"]: {
        tokenAddress: "0x2b8435cAe98a18EaF080dDC4f72392A94b5c4556",
        mintGatewayAddress: "0xcA24bC8A2f203f8aC6a2A5BBCaAB4d905047Db75",
      },
      ["USDT_Goerli"]: {
        tokenAddress: "0xF0dbeB58522b96cdCdB790BCaD9Fd8Da7D7fa35c",
        mintGatewayAddress: "0xda07AD211799496A8473cdeBAA91Df03db156644",
      },
    },
  },
  [Kava.chain]: {
    bridgeAddress: BridgeDeployments[Kava.chain]!,
    multicallContract: "0x442576f76F190FEbbCd83C3f4A879aC27675C923",
    chain: Chain.Kava,
    assets: {
      [Asset.BTC]: {
        tokenAddress: "0x26480B20B94623841349545118CF7e96b69c6195",
        mintGatewayAddress: "0x826bcDdc767Cb379B2698d09EF978b84c047a5e8",
      },
      [Asset.ZEC]: {
        tokenAddress: "0xC8182E956a7f0805D597d3798c1e498ad59048f1",
        mintGatewayAddress: "0xb8C82963Fd5df1Ca5ae7A22A5e608b1265d406A4",
      },
      [Asset.BCH]: {
        tokenAddress: "0xBb94A9A0cd4eD1a09968969d4fd95687b2BD0705",
        mintGatewayAddress: "0x07d6c552303fE6A466A184B33a51C735ca7f2B1d",
      },
      [Asset.DGB]: {
        tokenAddress: "0xB615293f5Bf0FA49cE337a825854a984386Ef098",
        mintGatewayAddress: "0xd64e9c9Ae306bb665B10Dc1B8213941e0A8A5500",
      },
      [Asset.DOGE]: {
        tokenAddress: "0x422c578Fa5E6E6ffc78B652aE35ca6018fbc9F0f",
        mintGatewayAddress: "0xBDa032CA4D2A782B63a0942E4A71b706b51AA1d7",
      },
      [Asset.FIL]: {
        tokenAddress: "0x243b3a4FE0fe7921331bd276Ac08429a02A8D62B",
        mintGatewayAddress: "0x02A3A0C17eF109c81fbddaD0d34b52536F93318e",
      },
      [Asset.LUNA]: {
        tokenAddress: "0xBc2D727B47B00beb9403f5eC0Af185698Ae495D0",
        mintGatewayAddress: "0x6F81DfaEd40a133c74CD1592044a8923c897C15e",
      },
      ["ibBTC"]: {
        tokenAddress: "0x1d3FfDd58f17bfD204B770CBA6d67A6c048A5Ab7",
        mintGatewayAddress: "0x1a4F5BE3cce35D5e3302c0F3b993a32eFFe8817a",
      },
      [Asset.REN]: {
        tokenAddress: "0x20aA737F98e93aD5092EF2024E5d3a2c8E18edA4",
        mintGatewayAddress: "0x0522d5e6108Dc6F6A9B2f6BC233416FA040618ad",
      },
      [Asset.DAI]: {
        tokenAddress: "0x5E5f602c982C196141D4eE0d1d05DAf3a9ABE5c9",
        mintGatewayAddress: "0xF61E124cA54EACF86507D0d7d927Fe38EeF8C100",
      },
      [Asset.USDC]: {
        tokenAddress: "0x7bCeCc655AEB8eb5a15f854490f643Bd34448508",
        mintGatewayAddress: "0x5f6d1b16246A3ba21D9036ceCcdB495ff65b09ED",
      },
      [Asset.USDT]: {
        tokenAddress: "0x3ab7632A1cbEAbC1422F8fE24750C1ea66e169BC",
        mintGatewayAddress: "0x3657a1F93E3d55FED214bFA8039fA1D814a5fE3f",
      },
      [Asset.EURT]: {
        tokenAddress: "0xe2d8C484411D8fCD5Af35C081d71591bAFDceF5B",
        mintGatewayAddress: "0xb92D83260ecB1B2b30645f3C0c88a26E2747e329",
      },
      [Asset.BUSD]: {
        tokenAddress: "0x79E28f786E6Ba3C7fa755D99191fe2e9b3d33d77",
        mintGatewayAddress: "0x3d7194D9e5812AAD72d0090485eFf721B76F2B39",
      },
      [Asset.MIM]: {
        tokenAddress: "0x38B31b1Ee77AAd541808D3c6052c4C64ca61Da72",
        mintGatewayAddress: "0x4f4DFF8e4985AA26d68A451920a0dCC4eAaB367f",
      },
      [Asset.CRV]: {
        tokenAddress: "0x0C3C180D731E7d0826f92F8f312456752b800b24",
        mintGatewayAddress: "0x5EBb45521B925A11B53C06A0495B6A227eC3AdcF",
      },
      [Asset.LINK]: {
        tokenAddress: "0xd1590209769BC9eb645ee523A355CB7dB6BDAf33",
        mintGatewayAddress: "0x15dff465d7Bd75DFbd107924D9d674dA156328AD",
      },
      [Asset.UNI]: {
        tokenAddress: "0x8648d79572Eec4dEd03dE40C747564BD6ddB9091",
        mintGatewayAddress: "0x2d8E10901399586A3a8e04ec25f3a5548F51E91B",
      },
      [Asset.SUSHI]: {
        tokenAddress: "0xa901047Cb7F93d0D9d72334Bad1871082AFB4F0e",
        mintGatewayAddress: "0x9994aABFcAF8590095DbFaE44a6662E5D2013740",
      },
      [Asset.FTT]: {
        tokenAddress: "0x429940e4c699b9114C7fBf1c52d81704f7746Fd1",
        mintGatewayAddress: "0x63b8060Ad5317BA35F1b3c4dd8339294D0F580ee",
      },
      [Asset.ROOK]: {
        tokenAddress: "0x83E374aC386779CC5782509bD682E853b854eDF7",
        mintGatewayAddress: "0xf19970b7cF852F5d96B8B95A0d9828Ad1E84d749",
      },
      [Asset.BADGER]: {
        tokenAddress: "0xC47C76D33fc7Bb57D6d2845E3B82558752cA5Fbe",
        mintGatewayAddress: "0x465a0b226a175F1392F324bcdaE046987b3ffcB9",
      },
      [Asset.KNC]: {
        tokenAddress: "0x8759CD7B4b926AdF4Da4dBeee76c97C05C071B46",
        mintGatewayAddress: "0xA32DB7c8b405c66457d7f11e17b2c270E44961a4",
      },
      [Asset.ETH]: {
        tokenAddress: "0xf72cDECe7eA0821F4789002701db1A662d399342",
        mintGatewayAddress: "0xc39ccf0E1644844358C657B9bF9B6e0D636Ae6Cc",
      },
      [Asset.BNB]: {
        tokenAddress: "0xf600DF44E1330b30Fab580BC4aEFCF031520a94A",
        mintGatewayAddress: "0x0E88eD2220519f60341e19bDdC37E76923ca41D3",
      },
      [Asset.FTM]: {
        tokenAddress: "0x6446E04f4829FcbAD012C933d2FB65B01CE62EA2",
        mintGatewayAddress: "0xa9d345a20fD38Da52173198C3FB7276a8F0Fb36E",
      },
      [Asset.MATIC]: {
        tokenAddress: "0x0F323557938489Ffe83cf7DC951e879fCF8C48d8",
        mintGatewayAddress: "0x1243A19866718aB4B8bb69dA9B68e83841d0Fd68",
      },
      [Asset.ArbETH]: {
        tokenAddress: "0x0f709956660FBc0DA83Efd32b213606Ea75F0e69",
        mintGatewayAddress: "0xaa2DC89fD6C1d82bd0AE3D979588906227Bf9BE1",
      },
      [Asset.AVAX]: {
        tokenAddress: "0xa1ba3fD170833BaB86761780070D069b1F0033eB",
        mintGatewayAddress: "0x826EEC9eAe16720Db6C5E59DE8bfee030ce13a3a",
      },
      [Asset.gETH]: {
        tokenAddress: "0x238282B65EfeA1f80a3A1B23b85B78Ff743da9c6",
        mintGatewayAddress: "0xc90ff883a2D4E5F46731766ff92aEcB1AdDc9770",
      },
      [Asset.GLMR]: {
        tokenAddress: "0xffA5d332DA402682f15dab9528213baf37352F44",
        mintGatewayAddress: "0x866724cE6C167d9517b8229c4B70ef9A0026839e",
      },
      [Asset.oETH]: {
        tokenAddress: "0x6A70A587451Eae2117693926863BcdCa244Db61A",
        mintGatewayAddress: "0xfb6c3F4467496AEa90956d8CD1873D790659E94D",
      },
      ["REN_Goerli"]: {
        tokenAddress: "0xf147382E2e18D252EA57C4cb79C8BB3794739e53",
        mintGatewayAddress: "0x7260871a5F92d9f9B9d2b914B2eF932A6d8689A9",
      },
      ["DAI_Goerli"]: {
        tokenAddress: "0xd80FD06C79B21763329488EB4B96551Cd5ECD08f",
        mintGatewayAddress: "0xf8cF76E32Fe3063d79Ff9D75701d2Bb89311fE03",
      },
      ["USDC_Goerli"]: {
        tokenAddress: "0x2b8435cAe98a18EaF080dDC4f72392A94b5c4556",
        mintGatewayAddress: "0xcA24bC8A2f203f8aC6a2A5BBCaAB4d905047Db75",
      },
      ["USDT_Goerli"]: {
        tokenAddress: "0xF0dbeB58522b96cdCdB790BCaD9Fd8Da7D7fa35c",
        mintGatewayAddress: "0xda07AD211799496A8473cdeBAA91Df03db156644",
      },
    },
  },
  [Moonbeam.chain]: {
    bridgeAddress: BridgeDeployments[Moonbeam.chain]!,
    multicallContract: "0x442576f76F190FEbbCd83C3f4A879aC27675C923",
    chain: Chain.Moonbeam,
    assets: {
      [Asset.BTC]: {
        tokenAddress: "0x26480B20B94623841349545118CF7e96b69c6195",
        mintGatewayAddress: "0x826bcDdc767Cb379B2698d09EF978b84c047a5e8",
      },
      [Asset.ZEC]: {
        tokenAddress: "0xC8182E956a7f0805D597d3798c1e498ad59048f1",
        mintGatewayAddress: "0xb8C82963Fd5df1Ca5ae7A22A5e608b1265d406A4",
      },
      [Asset.BCH]: {
        tokenAddress: "0xBb94A9A0cd4eD1a09968969d4fd95687b2BD0705",
        mintGatewayAddress: "0x07d6c552303fE6A466A184B33a51C735ca7f2B1d",
      },
      [Asset.DGB]: {
        tokenAddress: "0xB615293f5Bf0FA49cE337a825854a984386Ef098",
        mintGatewayAddress: "0xd64e9c9Ae306bb665B10Dc1B8213941e0A8A5500",
      },
      [Asset.DOGE]: {
        tokenAddress: "0x422c578Fa5E6E6ffc78B652aE35ca6018fbc9F0f",
        mintGatewayAddress: "0xBDa032CA4D2A782B63a0942E4A71b706b51AA1d7",
      },
      [Asset.FIL]: {
        tokenAddress: "0x243b3a4FE0fe7921331bd276Ac08429a02A8D62B",
        mintGatewayAddress: "0x02A3A0C17eF109c81fbddaD0d34b52536F93318e",
      },
      [Asset.LUNA]: {
        tokenAddress: "0xBc2D727B47B00beb9403f5eC0Af185698Ae495D0",
        mintGatewayAddress: "0x6F81DfaEd40a133c74CD1592044a8923c897C15e",
      },
      [Asset.REN]: {
        tokenAddress: "0x20aA737F98e93aD5092EF2024E5d3a2c8E18edA4",
        mintGatewayAddress: "0x0522d5e6108Dc6F6A9B2f6BC233416FA040618ad",
      },
      [Asset.DAI]: {
        tokenAddress: "0x5E5f602c982C196141D4eE0d1d05DAf3a9ABE5c9",
        mintGatewayAddress: "0xF61E124cA54EACF86507D0d7d927Fe38EeF8C100",
      },
      [Asset.USDC]: {
        tokenAddress: "0x7bCeCc655AEB8eb5a15f854490f643Bd34448508",
        mintGatewayAddress: "0x5f6d1b16246A3ba21D9036ceCcdB495ff65b09ED",
      },
      [Asset.USDT]: {
        tokenAddress: "0x3ab7632A1cbEAbC1422F8fE24750C1ea66e169BC",
        mintGatewayAddress: "0x3657a1F93E3d55FED214bFA8039fA1D814a5fE3f",
      },
      [Asset.EURT]: {
        tokenAddress: "0xe2d8C484411D8fCD5Af35C081d71591bAFDceF5B",
        mintGatewayAddress: "0xb92D83260ecB1B2b30645f3C0c88a26E2747e329",
      },
      [Asset.BUSD]: {
        tokenAddress: "0x79E28f786E6Ba3C7fa755D99191fe2e9b3d33d77",
        mintGatewayAddress: "0x3d7194D9e5812AAD72d0090485eFf721B76F2B39",
      },
      [Asset.MIM]: {
        tokenAddress: "0x38B31b1Ee77AAd541808D3c6052c4C64ca61Da72",
        mintGatewayAddress: "0x4f4DFF8e4985AA26d68A451920a0dCC4eAaB367f",
      },
      [Asset.CRV]: {
        tokenAddress: "0x0C3C180D731E7d0826f92F8f312456752b800b24",
        mintGatewayAddress: "0x5EBb45521B925A11B53C06A0495B6A227eC3AdcF",
      },
      [Asset.LINK]: {
        tokenAddress: "0xd1590209769BC9eb645ee523A355CB7dB6BDAf33",
        mintGatewayAddress: "0x15dff465d7Bd75DFbd107924D9d674dA156328AD",
      },
      [Asset.UNI]: {
        tokenAddress: "0x8648d79572Eec4dEd03dE40C747564BD6ddB9091",
        mintGatewayAddress: "0x2d8E10901399586A3a8e04ec25f3a5548F51E91B",
      },
      [Asset.SUSHI]: {
        tokenAddress: "0xa901047Cb7F93d0D9d72334Bad1871082AFB4F0e",
        mintGatewayAddress: "0x9994aABFcAF8590095DbFaE44a6662E5D2013740",
      },
      [Asset.FTT]: {
        tokenAddress: "0x429940e4c699b9114C7fBf1c52d81704f7746Fd1",
        mintGatewayAddress: "0x63b8060Ad5317BA35F1b3c4dd8339294D0F580ee",
      },
      [Asset.ROOK]: {
        tokenAddress: "0x83E374aC386779CC5782509bD682E853b854eDF7",
        mintGatewayAddress: "0xf19970b7cF852F5d96B8B95A0d9828Ad1E84d749",
      },
      [Asset.BADGER]: {
        tokenAddress: "0xC47C76D33fc7Bb57D6d2845E3B82558752cA5Fbe",
        mintGatewayAddress: "0x465a0b226a175F1392F324bcdaE046987b3ffcB9",
      },
      [Asset.KNC]: {
        tokenAddress: "0x8759CD7B4b926AdF4Da4dBeee76c97C05C071B46",
        mintGatewayAddress: "0xA32DB7c8b405c66457d7f11e17b2c270E44961a4",
      },
      [Asset.ETH]: {
        tokenAddress: "0xf72cDECe7eA0821F4789002701db1A662d399342",
        mintGatewayAddress: "0xc39ccf0E1644844358C657B9bF9B6e0D636Ae6Cc",
      },
      [Asset.BNB]: {
        tokenAddress: "0xf600DF44E1330b30Fab580BC4aEFCF031520a94A",
        mintGatewayAddress: "0x0E88eD2220519f60341e19bDdC37E76923ca41D3",
      },
      [Asset.FTM]: {
        tokenAddress: "0x6446E04f4829FcbAD012C933d2FB65B01CE62EA2",
        mintGatewayAddress: "0xa9d345a20fD38Da52173198C3FB7276a8F0Fb36E",
      },
      [Asset.MATIC]: {
        tokenAddress: "0x0F323557938489Ffe83cf7DC951e879fCF8C48d8",
        mintGatewayAddress: "0x1243A19866718aB4B8bb69dA9B68e83841d0Fd68",
      },
      [Asset.ArbETH]: {
        tokenAddress: "0x0f709956660FBc0DA83Efd32b213606Ea75F0e69",
        mintGatewayAddress: "0xaa2DC89fD6C1d82bd0AE3D979588906227Bf9BE1",
      },
      [Asset.AVAX]: {
        tokenAddress: "0xa1ba3fD170833BaB86761780070D069b1F0033eB",
        mintGatewayAddress: "0x826EEC9eAe16720Db6C5E59DE8bfee030ce13a3a",
      },
      [Asset.gETH]: {
        tokenAddress: "0x238282B65EfeA1f80a3A1B23b85B78Ff743da9c6",
        mintGatewayAddress: "0xc90ff883a2D4E5F46731766ff92aEcB1AdDc9770",
      },
      [Asset.KAVA]: {
        tokenAddress: "0xCFA0859D44D64daEB000b9eD7a14772459da42cA",
        mintGatewayAddress: "0xf8eD1f5433e7BE58332FB124D56c6d67e990DF91",
      },
      [Asset.oETH]: {
        tokenAddress: "0x6A70A587451Eae2117693926863BcdCa244Db61A",
        mintGatewayAddress: "0xfb6c3F4467496AEa90956d8CD1873D790659E94D",
      },
      ["ibBTC"]: {
        tokenAddress: "0x1d3FfDd58f17bfD204B770CBA6d67A6c048A5Ab7",
        mintGatewayAddress: "0x1a4F5BE3cce35D5e3302c0F3b993a32eFFe8817a",
      },
      ["REN_Goerli"]: {
        tokenAddress: "0xf147382E2e18D252EA57C4cb79C8BB3794739e53",
        mintGatewayAddress: "0x7260871a5F92d9f9B9d2b914B2eF932A6d8689A9",
      },
      ["DAI_Goerli"]: {
        tokenAddress: "0xd80FD06C79B21763329488EB4B96551Cd5ECD08f",
        mintGatewayAddress: "0xf8cF76E32Fe3063d79Ff9D75701d2Bb89311fE03",
      },
      ["USDC_Goerli"]: {
        tokenAddress: "0x2b8435cAe98a18EaF080dDC4f72392A94b5c4556",
        mintGatewayAddress: "0xcA24bC8A2f203f8aC6a2A5BBCaAB4d905047Db75",
      },
      ["USDT_Goerli"]: {
        tokenAddress: "0xF0dbeB58522b96cdCdB790BCaD9Fd8Da7D7fa35c",
        mintGatewayAddress: "0xda07AD211799496A8473cdeBAA91Df03db156644",
      },
    },
  },
  [Optimism.chain]: {
    bridgeAddress: BridgeDeployments[Optimism.chain]!,
    multicallContract: "",
    chain: Chain.Optimism,
    assets: {
      [Asset.BTC]: {
        tokenAddress: "0x26480B20B94623841349545118CF7e96b69c6195",
        mintGatewayAddress: "0x826bcDdc767Cb379B2698d09EF978b84c047a5e8",
      },
      [Asset.ZEC]: {
        tokenAddress: "0xC8182E956a7f0805D597d3798c1e498ad59048f1",
        mintGatewayAddress: "0xb8C82963Fd5df1Ca5ae7A22A5e608b1265d406A4",
      },
      [Asset.BCH]: {
        tokenAddress: "0xBb94A9A0cd4eD1a09968969d4fd95687b2BD0705",
        mintGatewayAddress: "0x07d6c552303fE6A466A184B33a51C735ca7f2B1d",
      },
      [Asset.DGB]: {
        tokenAddress: "0xB615293f5Bf0FA49cE337a825854a984386Ef098",
        mintGatewayAddress: "0xd64e9c9Ae306bb665B10Dc1B8213941e0A8A5500",
      },
      [Asset.DOGE]: {
        tokenAddress: "0x422c578Fa5E6E6ffc78B652aE35ca6018fbc9F0f",
        mintGatewayAddress: "0xBDa032CA4D2A782B63a0942E4A71b706b51AA1d7",
      },
      [Asset.FIL]: {
        tokenAddress: "0x243b3a4FE0fe7921331bd276Ac08429a02A8D62B",
        mintGatewayAddress: "0x02A3A0C17eF109c81fbddaD0d34b52536F93318e",
      },
      [Asset.LUNA]: {
        tokenAddress: "0xBc2D727B47B00beb9403f5eC0Af185698Ae495D0",
        mintGatewayAddress: "0x6F81DfaEd40a133c74CD1592044a8923c897C15e",
      },
      ["ibBTC"]: {
        tokenAddress: "0x1d3FfDd58f17bfD204B770CBA6d67A6c048A5Ab7",
        mintGatewayAddress: "0x1a4F5BE3cce35D5e3302c0F3b993a32eFFe8817a",
      },
      [Asset.REN]: {
        tokenAddress: "0x20aA737F98e93aD5092EF2024E5d3a2c8E18edA4",
        mintGatewayAddress: "0x0522d5e6108Dc6F6A9B2f6BC233416FA040618ad",
      },
      [Asset.DAI]: {
        tokenAddress: "0x5E5f602c982C196141D4eE0d1d05DAf3a9ABE5c9",
        mintGatewayAddress: "0xF61E124cA54EACF86507D0d7d927Fe38EeF8C100",
      },
      [Asset.USDC]: {
        tokenAddress: "0x7bCeCc655AEB8eb5a15f854490f643Bd34448508",
        mintGatewayAddress: "0x5f6d1b16246A3ba21D9036ceCcdB495ff65b09ED",
      },
      [Asset.USDT]: {
        tokenAddress: "0x3ab7632A1cbEAbC1422F8fE24750C1ea66e169BC",
        mintGatewayAddress: "0x3657a1F93E3d55FED214bFA8039fA1D814a5fE3f",
      },
      [Asset.EURT]: {
        tokenAddress: "0xe2d8C484411D8fCD5Af35C081d71591bAFDceF5B",
        mintGatewayAddress: "0xb92D83260ecB1B2b30645f3C0c88a26E2747e329",
      },
      [Asset.BUSD]: {
        tokenAddress: "0x79E28f786E6Ba3C7fa755D99191fe2e9b3d33d77",
        mintGatewayAddress: "0x3d7194D9e5812AAD72d0090485eFf721B76F2B39",
      },
      [Asset.MIM]: {
        tokenAddress: "0x38B31b1Ee77AAd541808D3c6052c4C64ca61Da72",
        mintGatewayAddress: "0x4f4DFF8e4985AA26d68A451920a0dCC4eAaB367f",
      },
      [Asset.CRV]: {
        tokenAddress: "0x0C3C180D731E7d0826f92F8f312456752b800b24",
        mintGatewayAddress: "0x5EBb45521B925A11B53C06A0495B6A227eC3AdcF",
      },
      [Asset.LINK]: {
        tokenAddress: "0xd1590209769BC9eb645ee523A355CB7dB6BDAf33",
        mintGatewayAddress: "0x15dff465d7Bd75DFbd107924D9d674dA156328AD",
      },
      [Asset.UNI]: {
        tokenAddress: "0x8648d79572Eec4dEd03dE40C747564BD6ddB9091",
        mintGatewayAddress: "0x2d8E10901399586A3a8e04ec25f3a5548F51E91B",
      },
      [Asset.SUSHI]: {
        tokenAddress: "0xa901047Cb7F93d0D9d72334Bad1871082AFB4F0e",
        mintGatewayAddress: "0x9994aABFcAF8590095DbFaE44a6662E5D2013740",
      },
      [Asset.FTT]: {
        tokenAddress: "0x429940e4c699b9114C7fBf1c52d81704f7746Fd1",
        mintGatewayAddress: "0x63b8060Ad5317BA35F1b3c4dd8339294D0F580ee",
      },
      [Asset.ROOK]: {
        tokenAddress: "0x83E374aC386779CC5782509bD682E853b854eDF7",
        mintGatewayAddress: "0xf19970b7cF852F5d96B8B95A0d9828Ad1E84d749",
      },
      [Asset.BADGER]: {
        tokenAddress: "0xC47C76D33fc7Bb57D6d2845E3B82558752cA5Fbe",
        mintGatewayAddress: "0x465a0b226a175F1392F324bcdaE046987b3ffcB9",
      },
      [Asset.KNC]: {
        tokenAddress: "0x8759CD7B4b926AdF4Da4dBeee76c97C05C071B46",
        mintGatewayAddress: "0xA32DB7c8b405c66457d7f11e17b2c270E44961a4",
      },
      [Asset.ETH]: {
        tokenAddress: "0xf72cDECe7eA0821F4789002701db1A662d399342",
        mintGatewayAddress: "0xc39ccf0E1644844358C657B9bF9B6e0D636Ae6Cc",
      },
      [Asset.BNB]: {
        tokenAddress: "0xf600DF44E1330b30Fab580BC4aEFCF031520a94A",
        mintGatewayAddress: "0x0E88eD2220519f60341e19bDdC37E76923ca41D3",
      },
      [Asset.FTM]: {
        tokenAddress: "0x6446E04f4829FcbAD012C933d2FB65B01CE62EA2",
        mintGatewayAddress: "0xa9d345a20fD38Da52173198C3FB7276a8F0Fb36E",
      },
      [Asset.MATIC]: {
        tokenAddress: "0x0F323557938489Ffe83cf7DC951e879fCF8C48d8",
        mintGatewayAddress: "0x1243A19866718aB4B8bb69dA9B68e83841d0Fd68",
      },
      [Asset.ArbETH]: {
        tokenAddress: "0x0f709956660FBc0DA83Efd32b213606Ea75F0e69",
        mintGatewayAddress: "0xaa2DC89fD6C1d82bd0AE3D979588906227Bf9BE1",
      },
      [Asset.AVAX]: {
        tokenAddress: "0xa1ba3fD170833BaB86761780070D069b1F0033eB",
        mintGatewayAddress: "0x826EEC9eAe16720Db6C5E59DE8bfee030ce13a3a",
      },
      [Asset.gETH]: {
        tokenAddress: "0x238282B65EfeA1f80a3A1B23b85B78Ff743da9c6",
        mintGatewayAddress: "0xc90ff883a2D4E5F46731766ff92aEcB1AdDc9770",
      },
      [Asset.GLMR]: {
        tokenAddress: "0xffA5d332DA402682f15dab9528213baf37352F44",
        mintGatewayAddress: "0x866724cE6C167d9517b8229c4B70ef9A0026839e",
      },
      [Asset.KAVA]: {
        tokenAddress: "0xCFA0859D44D64daEB000b9eD7a14772459da42cA",
        mintGatewayAddress: "0xf8eD1f5433e7BE58332FB124D56c6d67e990DF91",
      },
      ["REN_Goerli"]: {
        tokenAddress: "0xf147382E2e18D252EA57C4cb79C8BB3794739e53",
        mintGatewayAddress: "0x7260871a5F92d9f9B9d2b914B2eF932A6d8689A9",
      },
      ["DAI_Goerli"]: {
        tokenAddress: "0xd80FD06C79B21763329488EB4B96551Cd5ECD08f",
        mintGatewayAddress: "0xf8cF76E32Fe3063d79Ff9D75701d2Bb89311fE03",
      },
      ["USDC_Goerli"]: {
        tokenAddress: "0x2b8435cAe98a18EaF080dDC4f72392A94b5c4556",
        mintGatewayAddress: "0xcA24bC8A2f203f8aC6a2A5BBCaAB4d905047Db75",
      },
      ["USDT_Goerli"]: {
        tokenAddress: "0xF0dbeB58522b96cdCdB790BCaD9Fd8Da7D7fa35c",
        mintGatewayAddress: "0xda07AD211799496A8473cdeBAA91Df03db156644",
      },
    },
  },
  [Polygon.chain]: {
    bridgeAddress: BridgeDeployments[Polygon.chain]!,
    multicallContract: "0x442576f76F190FEbbCd83C3f4A879aC27675C923",
    chain: Chain.Polygon,
    assets: {
      [Asset.BTC]: {
        tokenAddress: "0x880Ad65DC5B3F33123382416351Eef98B4aAd7F1",
        mintGatewayAddress: "0x29Aa535b65b9C9A08bEdEbA8F9398aAf4832F98b",
      },
      [Asset.ZEC]: {
        tokenAddress: "0xEF685D1D44EA983927D9F8D67F77894fAEC92FCF",
        mintGatewayAddress: "0xF9fAE250B8dda539B9AFfEb606C8e2631976413E",
      },
      [Asset.BCH]: {
        tokenAddress: "0x6662449d05312Afe0Ca147Db6Eb155641077883F",
        mintGatewayAddress: "0x42c72B4090Ed0627c85ED878f699B2dB254beECa",
      },
      [Asset.DOGE]: {
        tokenAddress: "0x799709491B1A26B867450bc68aC0d10979884aae",
        mintGatewayAddress: "0x6268002A734EDcDe6c2111ae339E0D92B1ED2Bfa",
      },
      [Asset.DGB]: {
        tokenAddress: "0xc96884276D70a1176b2fe102469348d224B0A1fa",
        mintGatewayAddress: "0x7352e7244899b7Cb5d803CC02741c8910d3B75de",
      },
      [Asset.FIL]: {
        tokenAddress: "0x9485Fd224a4B0075a47d26d49d0A6c5bd3dEfFD9",
        mintGatewayAddress: "0x3ce3266Ab11b6C23ea50dF8a777198d6dedAd85f",
      },
      [Asset.LUNA]: {
        tokenAddress: "0xF5DC123b4622b17511cCf3251Dc00d8adC620A6D",
        mintGatewayAddress: "0xb98E6dA48F27e86D32dc9ab8721ce19c95E206b8",
      },
      [Asset.ETH]: {
        tokenAddress: "0xf72cDECe7eA0821F4789002701db1A662d399342",
        mintGatewayAddress: "0xc39ccf0E1644844358C657B9bF9B6e0D636Ae6Cc",
      },
      [Asset.DAI]: {
        tokenAddress: "0x5E5f602c982C196141D4eE0d1d05DAf3a9ABE5c9",
        mintGatewayAddress: "0xF61E124cA54EACF86507D0d7d927Fe38EeF8C100",
      },
      [Asset.REN]: {
        tokenAddress: "0x20aA737F98e93aD5092EF2024E5d3a2c8E18edA4",
        mintGatewayAddress: "0x0522d5e6108Dc6F6A9B2f6BC233416FA040618ad",
      },
      [Asset.USDC]: {
        tokenAddress: "0x7bCeCc655AEB8eb5a15f854490f643Bd34448508",
        mintGatewayAddress: "0x5f6d1b16246A3ba21D9036ceCcdB495ff65b09ED",
      },
      [Asset.USDT]: {
        tokenAddress: "0x3ab7632A1cbEAbC1422F8fE24750C1ea66e169BC",
        mintGatewayAddress: "0x3657a1F93E3d55FED214bFA8039fA1D814a5fE3f",
      },
      [Asset.EURT]: {
        tokenAddress: "0xe2d8C484411D8fCD5Af35C081d71591bAFDceF5B",
        mintGatewayAddress: "0xb92D83260ecB1B2b30645f3C0c88a26E2747e329",
      },
      [Asset.BUSD]: {
        tokenAddress: "0x79E28f786E6Ba3C7fa755D99191fe2e9b3d33d77",
        mintGatewayAddress: "0x3d7194D9e5812AAD72d0090485eFf721B76F2B39",
      },
      [Asset.MIM]: {
        tokenAddress: "0x38B31b1Ee77AAd541808D3c6052c4C64ca61Da72",
        mintGatewayAddress: "0x4f4DFF8e4985AA26d68A451920a0dCC4eAaB367f",
      },
      [Asset.CRV]: {
        tokenAddress: "0x0C3C180D731E7d0826f92F8f312456752b800b24",
        mintGatewayAddress: "0x5EBb45521B925A11B53C06A0495B6A227eC3AdcF",
      },
      [Asset.LINK]: {
        tokenAddress: "0xd1590209769BC9eb645ee523A355CB7dB6BDAf33",
        mintGatewayAddress: "0x15dff465d7Bd75DFbd107924D9d674dA156328AD",
      },
      [Asset.UNI]: {
        tokenAddress: "0x8648d79572Eec4dEd03dE40C747564BD6ddB9091",
        mintGatewayAddress: "0x2d8E10901399586A3a8e04ec25f3a5548F51E91B",
      },
      [Asset.SUSHI]: {
        tokenAddress: "0xa901047Cb7F93d0D9d72334Bad1871082AFB4F0e",
        mintGatewayAddress: "0x9994aABFcAF8590095DbFaE44a6662E5D2013740",
      },
      [Asset.FTT]: {
        tokenAddress: "0x429940e4c699b9114C7fBf1c52d81704f7746Fd1",
        mintGatewayAddress: "0x63b8060Ad5317BA35F1b3c4dd8339294D0F580ee",
      },
      [Asset.ROOK]: {
        tokenAddress: "0x83E374aC386779CC5782509bD682E853b854eDF7",
        mintGatewayAddress: "0xf19970b7cF852F5d96B8B95A0d9828Ad1E84d749",
      },
      [Asset.BADGER]: {
        tokenAddress: "0xC47C76D33fc7Bb57D6d2845E3B82558752cA5Fbe",
        mintGatewayAddress: "0x465a0b226a175F1392F324bcdaE046987b3ffcB9",
      },
      [Asset.KNC]: {
        tokenAddress: "0x8759CD7B4b926AdF4Da4dBeee76c97C05C071B46",
        mintGatewayAddress: "0xA32DB7c8b405c66457d7f11e17b2c270E44961a4",
      },
      [Asset.ArbETH]: {
        tokenAddress: "0x0f709956660FBc0DA83Efd32b213606Ea75F0e69",
        mintGatewayAddress: "0xaa2DC89fD6C1d82bd0AE3D979588906227Bf9BE1",
      },
      [Asset.AVAX]: {
        tokenAddress: "0xa1ba3fD170833BaB86761780070D069b1F0033eB",
        mintGatewayAddress: "0x826EEC9eAe16720Db6C5E59DE8bfee030ce13a3a",
      },
      [Asset.BNB]: {
        tokenAddress: "0xf600DF44E1330b30Fab580BC4aEFCF031520a94A",
        mintGatewayAddress: "0x0E88eD2220519f60341e19bDdC37E76923ca41D3",
      },
      [Asset.FTM]: {
        tokenAddress: "0x6446E04f4829FcbAD012C933d2FB65B01CE62EA2",
        mintGatewayAddress: "0xa9d345a20fD38Da52173198C3FB7276a8F0Fb36E",
      },
      [Asset.gETH]: {
        tokenAddress: "0x238282B65EfeA1f80a3A1B23b85B78Ff743da9c6",
        mintGatewayAddress: "0xc90ff883a2D4E5F46731766ff92aEcB1AdDc9770",
      },
      [Asset.GLMR]: {
        tokenAddress: "0xffA5d332DA402682f15dab9528213baf37352F44",
        mintGatewayAddress: "0x866724cE6C167d9517b8229c4B70ef9A0026839e",
      },
      [Asset.KAVA]: {
        tokenAddress: "0xCFA0859D44D64daEB000b9eD7a14772459da42cA",
        mintGatewayAddress: "0xf8eD1f5433e7BE58332FB124D56c6d67e990DF91",
      },
      ["ibBTC"]: {
        tokenAddress: "0x1d3FfDd58f17bfD204B770CBA6d67A6c048A5Ab7",
        mintGatewayAddress: "0x1a4F5BE3cce35D5e3302c0F3b993a32eFFe8817a",
      },
      [Asset.oETH]: {
        tokenAddress: "0x6A70A587451Eae2117693926863BcdCa244Db61A",
        mintGatewayAddress: "0xfb6c3F4467496AEa90956d8CD1873D790659E94D",
      },
      ["REN_Goerli"]: {
        tokenAddress: "0xf147382E2e18D252EA57C4cb79C8BB3794739e53",
        mintGatewayAddress: "0x7260871a5F92d9f9B9d2b914B2eF932A6d8689A9",
      },
      ["DAI_Goerli"]: {
        tokenAddress: "0xd80FD06C79B21763329488EB4B96551Cd5ECD08f",
        mintGatewayAddress: "0xf8cF76E32Fe3063d79Ff9D75701d2Bb89311fE03",
      },
      ["USDC_Goerli"]: {
        tokenAddress: "0x2b8435cAe98a18EaF080dDC4f72392A94b5c4556",
        mintGatewayAddress: "0xcA24bC8A2f203f8aC6a2A5BBCaAB4d905047Db75",
      },
      ["USDT_Goerli"]: {
        tokenAddress: "0xF0dbeB58522b96cdCdB790BCaD9Fd8Da7D7fa35c",
        mintGatewayAddress: "0xda07AD211799496A8473cdeBAA91Df03db156644",
      },
    },
  },
};
