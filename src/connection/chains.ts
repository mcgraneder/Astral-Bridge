
import EthereumChainLogo from "../../public/svgs/chains/ethereum.svg"
import PolygonChainLogo from "../../public/svgs/chains/polygon.svg"
import ArbitrumChainLogo from "../../public/svgs/chains/arbitrum.svg"
import OptimismChainLogo from "../../public/svgs/chains/optimism.svg"

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
        id: 421611,
        rpcUrls: ["https://rinkeby.arbitrum.io/rpc"],
        symbol: "tArbETH",
        currency: "tArb Ether",
        explorerLink: "https://arbiscan.io/"   
    },
    [SupportedChainId.OPTIMISM]: {
        chainName: "Optimism",
        logo: OptimismChainLogo,
        isTestnet: true,
        id: 10,
        rpcUrls: ["https://mainnet.optimism.io"],
        symbol: "oETH",
        currency: "o Ether",
        explorerLink: "https://optimistic.etherscan.io/"   
    },
    [SupportedChainId.OPTIMISM_GOERLI]: {
        chainName: "Optimism",
        logo: OptimismChainLogo,
        isTestnet: false,
        id: 420,
        rpcUrls: ["https://goerli.optimism.io"],
        symbol: "toETH",
        currency: "to Ether",
        explorerLink: "https://optimistic.etherscan.io/"   
    }
  };