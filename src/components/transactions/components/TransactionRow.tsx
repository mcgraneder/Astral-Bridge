import { Icon } from "../../Icons/AssetLogs/Icon";
import Identicon from "../../Identicon/Identicon";
import { StyledTokenRow } from "./HeaderRow";
import { UilExclamationTriangle, UilSpinnerAlt, UilCheckCircle } from '@iconscout/react-unicons';

const Spinner = () => {
    return <UilSpinnerAlt className={" h-5 w-5 animate-spin text-gray-400"} />;
}
export interface RowData {
    account: string;
    Id: string;
    date: string;
    type: string;
    chain: string;
    status: string;
    currency: string;
    amount: string;
}

const TransactionRow = (data: any) => {
 
    const getColour = (status: string): string => {
        if (status === "pending") return "text-gray-400"
        else if (status === "completed") return "text-green-500"
        else return "text-red-500"
    }
    const getIcon = (status: string) => {
      if (status === "pending") return <Spinner />;
      else if (status === "completed") return <UilCheckCircle className={"h-5 w-5 text-green-500"}/>
      else return <UilExclamationTriangle className={"h-5 w-5 text-red-500"}/>;
    };
    const statusColour = getColour(data[0].status)
    const StatusIcon = getIcon(data[0].status)
  return (
    <StyledTokenRow>
      <div className="">
        <span>{data[0].Id}</span>
      </div>
      <div className="flex items-center gap-2 text-blue-600">
        <Identicon size={18} />
        <span>{data[0].account.substring(0, 18)}</span>
      </div>
      <div className="">
        <span>{data[0].date}</span>
      </div>
      <div className="">
        <span>{data[0].type}</span>
      </div>
      <div className="flex items-center gap-2">
        <Icon chainName={data[0].chain} className="h-5 w-5" />
        <span>
          {data[0].chain === "BinanceSmartChain" ? "Binance" : data[0].chain}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span>{data[0].amount}</span>
        <Icon chainName={data[0].currency} className="h-5 w-5" />
      </div>
      <div className="flex items-center gap-2">
        {getIcon(data[0].status)}
        <span className={`${statusColour}`}>{data[0].status}</span>
      </div>
    </StyledTokenRow>
  );
};

export default TransactionRow;
