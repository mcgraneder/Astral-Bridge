
import EthereumChainLogo from "../../public/svgs/chains/ethereum.svg"
import PolygonChainLogo from "../../public/svgs/chains/polygon.svg"
import ArbitrumChainLogo from "../../public/svgs/chains/arbitrum.svg"
import OptimismChainLogo from "../../public/svgs/chains/optimism.svg"
import FantomLogo from "../../public/svgs/chains/fantom.svg"
import Kava from "../../public/svgs/chains/kava.svg"
import Moonbeam from "../../public/svgs/chains/moonbeam.svg"
import Binance from "../../public/svgs/chains/binancesmartchain.svg"
import { Chain } from '@renproject/chains';





export interface ChainType {
    chainName: string;
    logo: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
    isTestnet: boolean;
    id: number;
    rpcUrls: string[];
    symbol: string;
    currency: string;
    explorerLink: string
}

export enum SupportedChainId {
    MAINNET = 1,
    GOERLI = 5,
    ARBITRUM_ONE = 42161,
    ARBITRUM_RINKEBY = 421611,
    OPTIMISM = 10,
    OPTIMISM_GOERLI = 420,
    POLYGON = 137,
    POLYGON_MUMBAI = 80001,
    FANTOM_OPERA = 250,
    FANTOM_TESTNET = 4002,
    KAVA = 2222,
    KAVA_TESTNET = 2221,
    BINANCE_SMART_CHAIN = 56,
    BINANCE_SMART_CHAIN_TESTNET = 97,
    MOONBEAM = 1284,
    MOONBEAM_TESTNET = 1287 

}

export const ChainIdToRenChain: { [chainId: number]: Chain} = {
    [SupportedChainId.MAINNET]: Chain.Ethereum,
    [SupportedChainId.GOERLI]: Chain.Ethereum,
    [SupportedChainId.POLYGON]: Chain.Polygon,
    [SupportedChainId.POLYGON_MUMBAI]: Chain.Polygon,
    [SupportedChainId.POLYGON_MUMBAI]: Chain.Polygon,
    [SupportedChainId.ARBITRUM_ONE]: Chain.Arbitrum,
    [SupportedChainId.ARBITRUM_RINKEBY]: Chain.Arbitrum,
    [SupportedChainId.OPTIMISM]: Chain.Optimism,
    [SupportedChainId.OPTIMISM_GOERLI]: Chain.Optimism,
    [SupportedChainId.FANTOM_OPERA]: Chain.Fantom,
    [SupportedChainId.FANTOM_TESTNET]: Chain.Fantom,
    [SupportedChainId.BINANCE_SMART_CHAIN]: Chain.BinanceSmartChain,
    [SupportedChainId.BINANCE_SMART_CHAIN_TESTNET]: Chain.BinanceSmartChain,
    [SupportedChainId.KAVA]: Chain.Kava,
    [SupportedChainId.KAVA_TESTNET]: Chain.Kava,
    [SupportedChainId.MOONBEAM]: Chain.Moonbeam,
    [SupportedChainId.MOONBEAM_TESTNET]: Chain.Moonbeam,
}

export const CHAINS: { [key: number]: ChainType } = {
    [SupportedChainId.MAINNET]: {
      chainName: "Ethereum",
      logo: EthereumChainLogo,
      isTestnet: true,
      id: 1,
      rpcUrls: [""],
      symbol: "ETH",
        currency: "Ether",
        explorerLink: "https://etherscan.io/" 
    },
    [SupportedChainId.GOERLI]: {
        chainName: "Goerli",
        logo: EthereumChainLogo,
        isTestnet: false,
        id: 5  ,
        rpcUrls: [""],
        symbol: "gETH",
        currency: "Goerli Ether",
        explorerLink: "https://goerli.etherscan.io/" 
    },
    [SupportedChainId.POLYGON]: {
        chainName: "Polygon",
        logo: PolygonChainLogo,
        isTestnet: true,
        id: 137,
        rpcUrls: ["https://polygon-rpc.com/"],
        symbol: "MATIC",
        currency: "MATIC",
        explorerLink: "https://polygonscan.com/"   
    },
    [SupportedChainId.POLYGON_MUMBAI]: {
        chainName: "Polygon Testnet",
        logo: PolygonChainLogo,
        isTestnet: false,
        id: 80001,
        rpcUrls: ["https://matic-mumbai.maticvigil.com/"],
        symbol: "tMATIC",
        currency: "tMATIC",
        explorerLink: "https://polygonscan.com/"  
    },
    [SupportedChainId.ARBITRUM_ONE]: {
        chainName: "Arbitrum",
        logo: ArbitrumChainLogo,
        isTestnet: true,
        id: 42161,
        rpcUrls: ["https://arb1.arbitrum.io/rpc"],
        symbol: "ArbETH",
        currency: "Arb Ether",
        explorerLink: "https://arbiscan.io/"   
    },
    [SupportedChainId.ARBITRUM_RINKEBY]: {
        chainName: "Arbitrum Testnet",
        logo: ArbitrumChainLogo,
        isTestnet: false,
        id: 421613,
        rpcUrls: ["https://goerli-rollup.arbitrum.io/rpc"],
        symbol: "tArbETH",
        currency: "tArb Ether",
        explorerLink: "https://arbiscan.io/"   
    },
    [SupportedChainId.OPTIMISM]: {
        chainName: "Optimism",
        logo: OptimismChainLogo,
        isTestnet: false,
        id: 10,
        rpcUrls: ["https://mainnet.optimism.io"],
        symbol: "oETH",
        currency: "o Ether",
        explorerLink: "https://optimistic.etherscan.io/"   
    },
    [SupportedChainId.OPTIMISM_GOERLI]: {
        chainName: "Optimism",
        logo: OptimismChainLogo,
        isTestnet: true,
        id: 420,
        rpcUrls: ["https://goerli.optimism.io"],
        symbol: "toETH",
        currency: "to Ether",
        explorerLink: "https://optimistic.etherscan.io/"   
    },
    [SupportedChainId.FANTOM_OPERA]: {
        chainName: "Fantom",
        logo: FantomLogo,
        isTestnet: false,
        id: 250,
        rpcUrls: ["https://rpc.ankr.com/fantom/"],
        symbol: "FTM",
        currency: "Fantom",
        explorerLink: "https://ftmscan.com/"   
    },
     [SupportedChainId.FANTOM_TESTNET]: {
        chainName: "Fantom",
        logo: FantomLogo,
        isTestnet: true,
        id: 4002,
        rpcUrls: ["https://rpc.testnet.fantom.network/"],
        symbol: "FTM",
        currency: "Fantom",
        explorerLink: "https://ftmscan.com/"   
    },
     [SupportedChainId.KAVA]: {
        chainName: "Kava",
        logo: Kava,
        isTestnet: false,
        id: 2222,
        rpcUrls: ["https://evm.kava.io"],
        symbol: "KAVA",
        currency: "Kava",
        explorerLink: "https://explorer.kava.io"   
    },
    [SupportedChainId.KAVA_TESTNET]: {
        chainName: "Kava",
        logo: Kava,
        isTestnet: true,
        id: 2221,
        rpcUrls: ["https://evm.testnet.kava.io"],
        symbol: "tKAVA",
        currency: "testnet Kava",
        explorerLink: "https://explorer.kava.io"   
    },
     [SupportedChainId.BINANCE_SMART_CHAIN]: {
        chainName: "Binance",
        logo: Binance,
        isTestnet: false,
        id: 56,
        rpcUrls: ["https://bsc-dataseed.binance.org/"],
        symbol: "BNB",
        currency: "BNB",
        explorerLink: "https://bscscan.com"   
    },
    [SupportedChainId.BINANCE_SMART_CHAIN_TESTNET]: {
        chainName: "Binance",
        logo: Binance,
        isTestnet: true,
        id: 97,
        rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
        symbol: "tBNB",
        currency: "tBNB",
        explorerLink: "https://testnet.bscscan.com"   
    },
    [SupportedChainId.MOONBEAM]: {
        chainName: "Moonbeam",
        logo: Moonbeam,
        isTestnet: false,
        id: 1284,
        rpcUrls: ["https://rpc.api.moonbeam.network"],
        symbol: "GLMR",
        currency: "GLMR",
        explorerLink: "https://moonscan.io"   
    },
    [SupportedChainId.MOONBEAM_TESTNET]: {
        chainName: "Moonbeamt Testnet",
        logo: Moonbeam,
        isTestnet: true,
        id: 1287,
        rpcUrls: ["https://rpc.api.moonbase.moonbeam.network"],
        symbol: "tGLMR",
        currency: "tGLMR",
        explorerLink: "https://moonscan.io"   
    },
    [SupportedChainId.MOONBEAM_TESTNET]: {
        chainName: "Avalanche Testnet",
        logo: Moonbeam,
        isTestnet: true,
        id: 43113,
        rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
        symbol: "tAVAX",
        currency: "tAVAX",
        explorerLink: "https://testnet.snowtrace.io/"   
    }, 
  };