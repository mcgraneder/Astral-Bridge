import React from "react";
import { useViewport } from "../../hooks/useViewport";
import { FormWrapper } from "../WalletConnectModal/WalletConnectModal";
import { TopRowNavigation } from "../WalletConnectModal/WalletConnectModal";
import { Breakpoints } from "../../constants/Breakpoints";
import BottomSheetOptions from "../BottomSheet/BottomSheetOptions";
import { UilSpinner } from "@iconscout/react-unicons";
import { useGlobalState } from "../../context/useGlobalState";

interface PendingTransactionModalProps {
  close: () => void;
  open: boolean;
  text: string;
  transactionType: string;
  asset: any;
}

interface IconProps {
  active: boolean;
}

const PendingModalInner = ({
  close,
  text,
  transactionType,
  chain,
  asset
}: {
  close: () => void;
  text: string;
  transactionType: string;
  chain: any;
  asset: any;
}) => {
  return (
    <>
      <TopRowNavigation isRightDisplay={true} close={close} />
      <div className="my-4 flex flex-col items-center justify-center  px-2">
        <UilSpinner className={"h-32 w-32 animate-spin text-blue-500"} />
      </div>
      <div className="my-2 flex flex-col items-center gap-[6px]">
        <span className=" text-[18px] font-semibold">
          Waiting For Confirmation
        </span>
        <span className="text-[17px]">{`${(transactionType).concat("ing")} ${text} ${asset.Icon} on ${chain.fullName}`}</span>
        <span className="text-[14px] text-gray-500">
          Confirm this transaction in your wallet
        </span>
      </div>
    </>
  );
};

function PendingTransactionModal({
  close,
  open,
  text,
  transactionType,
  asset
}: PendingTransactionModalProps) {
  const { width } = useViewport();
  const { fromChain: chain } = useGlobalState()

  console.log(asset)
  return (
    <>
      {width > 0 && width >= Breakpoints.sm1 ? (
        <FormWrapper>
          <PendingModalInner
            close={close}
            text={text}
            transactionType={transactionType}
            chain={chain}
            asset={asset}
          />
        </FormWrapper>
      ) : (
        <BottomSheetOptions
          hideCloseIcon
          open={open}
          setOpen={() => null}
          title={"Pending"}
        >
          <PendingModalInner
            close={close}
            text={text}
            transactionType={transactionType}
            chain={chain}
            asset={asset}
          />
        </BottomSheetOptions>
      )}
    </>
  );
}

export default PendingTransactionModal;
