import { InfoContainer } from "../bridgeModal";
import { UilPump } from "@iconscout/react-unicons";
import { Icon } from "../../Icons/AssetLogs/Icon";
import { toFixed } from "../../../utils/misc";
import { CHAINS } from "../../../connection/chains";
import { useWeb3React } from "@web3-react/core";
import { customGP, shiftBN } from '../../../context/useGasPriceState';

interface IFeeData {
  text: string;
  defaultGasPrice: customGP | undefined;
  asset: any;
}
const FeeData = ({
  text,
  defaultGasPrice,
  asset,
}: IFeeData) => {
  const { chainId } = useWeb3React();
  return (
    <InfoContainer visible={text !== ""}>
      <div
        className={`flex flex-col items-start justify-center gap-2 text-[15px] ${
          text === "" ? "opacity-0" : "opacity-100"
        } mx-5 my-4`}
      >
        <div className="flex items-center justify-center gap-2">
          <UilPump className={"h-[18px] w-[18px] text-blue-500"} />
          <div>Estimated network fee: </div>
          <span className="text-gray-400">
            {defaultGasPrice && toFixed(shiftBN(defaultGasPrice.networkFee!, -18), 6)}{" "}{" "}
            <span className="text-grey-600">{CHAINS[chainId!]?.symbol!}</span>
          </span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Icon className={"h-[18px] w-[18px]"} chainName={asset.Icon} />
          <div>Estimated Bridge fee: </div>
          <span className="text-gray-400">
            {"0.00"} <span className="text-grey-600">{asset.Icon}</span>
          </span>
        </div>
      </div>
    </InfoContainer>
  );
};

export default FeeData
