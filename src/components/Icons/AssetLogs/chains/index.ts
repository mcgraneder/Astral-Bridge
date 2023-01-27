import {
  Arbitrum,
  Avalanche,
  BinanceSmartChain,
  Bitcoin,
  BitcoinCash,
  Catalog,
  DigiByte,
  Dogecoin,
  Ethereum,
  Fantom,
  Filecoin,
  Goerli,
  Kava,
  Moonbeam,
  Optimism,
  Polygon,
  Solana,
  Terra,
  Zcash,
} from "@renproject/chains";

import ArbitrumIcon from "../../../../../public/svgs/chains/arbitrum.svg";
import AvalancheIcon from "../../../../../public/svgs/chains/avalanche.svg";
import BinanceSmartChainIcon from "../../../../../public/svgs/chains/binancesmartchain.svg";
import BitcoinIcon from "../../../../../public/svgs/chains/bitcoin.svg";
import BitcoinCashIcon from "../../../../../public/svgs/chains/bitcoincash.svg";
import CatalogIcon from "../../../../../public/svgs/chains/catalog.svg";
import DigiByteIcon from "../../../../../public/svgs/chains/digibyte.svg";
import DogecoinIcon from "../../../../../public/svgs/chains/dogecoin.svg";
import EthereumIcon from "../../../../../public/svgs/chains/ethereum.svg";
import FantomIcon from "../../../../../public/svgs/chains/fantom.svg";
import FilecoinIcon from "../../../../../public/svgs/chains/filecoin.svg";
import KavaIcon from "../../../../../public/svgs/chains/kava.svg";
import MoonbeamIcon from "../../../../../public/svgs/chains/moonbeam.svg";
import OptimismIcon from "../../../../../public/svgs/chains/optimism.svg";
import PolygonIcon from "../../../../../public/svgs/chains/polygon.svg";
import RenVMIcon from "../../../../../public/svgs/chains/renvm.svg";
import SolanaIcon from "../../../../../public/svgs/chains/solana.svg";
import TerraIcon from "../../../../../public/svgs/chains/terra.svg";
import ZcashIcon from "../../../../../public/svgs/chains/zcash.svg";

export const Icons: {
  [key: string]: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
} = {
  [Arbitrum.chain]: ArbitrumIcon,
  [Avalanche.chain]: AvalancheIcon,
  [BinanceSmartChain.chain]: BinanceSmartChainIcon,
  [Bitcoin.chain]: BitcoinIcon,
  [BitcoinCash.chain]: BitcoinCashIcon,
  [Catalog.chain]: CatalogIcon,
  [DigiByte.chain]: DigiByteIcon,
  [Dogecoin.chain]: DogecoinIcon,
  [Ethereum.chain]: EthereumIcon,
  [Fantom.chain]: FantomIcon,
  [Filecoin.chain]: FilecoinIcon,
  [Goerli.chain]: EthereumIcon,
  [Kava.chain]: KavaIcon,
  [Moonbeam.chain]: MoonbeamIcon,
  [Optimism.chain]: OptimismIcon,
  [Polygon.chain]: PolygonIcon,
  [Solana.chain]: SolanaIcon,
  [Terra.chain]: TerraIcon,
  [Zcash.chain]: ZcashIcon,
  RenVM: RenVMIcon,
};
