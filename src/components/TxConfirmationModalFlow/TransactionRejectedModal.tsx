import React from "react";
import { useWeb3React } from "@web3-react/core";
import { useViewport } from "../../hooks/useViewport";
import { FormWrapper } from "../WalletConnectModal/WalletConnectModal";
import { TopRowNavigation } from "../WalletConnectModal/WalletConnectModal";
import { Breakpoints } from "../../constants/Breakpoints";
import BottomSheetOptions from "../BottomSheet/BottomSheetOptions";
import { UilSpinner, UilExclamationTriangle } from '@iconscout/react-unicons';
import PrimaryButton from '../PrimaryButton/PrimaryButton';

interface PendingTransactionModalProps {
  close: () => void;
  open: boolean;
}

interface IconProps {
  active: boolean;
}

const TransactionRejectedInner = ({
  active,
  close,
}: {
  active: boolean;
  close: () => void;
}) => {
  return (
    <>
      <TopRowNavigation isRightDisplay={true} isLeftDisplay={true} title={"Error"} close={close} />
      <div className="my-4 flex flex-col items-center justify-center  px-2">
        <UilExclamationTriangle className={"h-24 w-24 text-red-500"} />
      </div>
      <div className="my-2 flex flex-col items-center gap-2">
        <span className=" text-[18px] font-semibold">Transaction Rejected</span>
      </div>
      <div className="mt-8 mb-2 flex items-center justify-center">
        <PrimaryButton
          className={
            "w-full justify-center rounded-2xl bg-blue-500 py-[15.5px] text-center font-semibold text-[17px]"
          }
          onClick={close}
        >
          Close
        </PrimaryButton>
      </div>
    </>
  );
};

function TransactionRejectedModal({ close, open }: PendingTransactionModalProps) {
  const { active } = useWeb3React();
  const { width } = useViewport();

  return (
    <>
      {width > 0 && width >= Breakpoints.sm1 ? (
        <FormWrapper>
          <TransactionRejectedInner active={active} close={close} />
        </FormWrapper>
      ) : (
        <BottomSheetOptions
          hideCloseIcon
          open={open}
          setOpen={() => null}
          title={"Pending"}
        >
          <TransactionRejectedInner active={active} close={close} />
        </BottomSheetOptions>
      )}
    </>
  );
}

export default TransactionRejectedModal;
