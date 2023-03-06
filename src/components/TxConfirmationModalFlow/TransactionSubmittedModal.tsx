import React, { useCallback} from "react";
import { useWeb3React } from "@web3-react/core";
import { useViewport } from "../../hooks/useViewport";
import { FormWrapper } from "../WalletConnectModal/WalletConnectModal";
import { TopRowNavigation } from "../WalletConnectModal/WalletConnectModal";
import { Breakpoints } from "../../constants/Breakpoints";
import BottomSheetOptions from "../BottomSheet/BottomSheetOptions";
import { UilSpinner, UilExclamationTriangle, UilCheckCircle } from '@iconscout/react-unicons';
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import { WALLETS, PROVIDERS } from '../../connection/wallets';
import Link from "next/link";
import { chainAdresses } from '../../constants/Addresses';
import { useGlobalState } from "../../context/useGlobalState";

interface TxSubmittedProps {
  close: () => void;
  open: boolean;
  asset: any;
  chain: any;
}

interface IconProps {
  active: boolean;
}

const TxSubmittedInner = ({
  active,
  close,
  addAsset,
}: {
  active: boolean;
  close: () => void;
  addAsset: () => Promise<void>;
}) => {
  const Icon = WALLETS[PROVIDERS.INJECTED!]!.icon;
  const { filteredTransaction } = useGlobalState()

  return (
    <>
      <TopRowNavigation
        isRightDisplay={true}
        isLeftDisplay={true}
        title={"Success"}
        close={close}
      />
      <div className="my-4 flex flex-col items-center justify-center  px-2">
        <UilCheckCircle className={"h-24 w-24 text-blue-500"} />
      </div>
      <div className="my-2 flex flex-col items-center gap-2">
        <span className=" text-[18px] font-semibold">
          Transaction Submitted
        </span>
      </div>
      <div
        className="mx-auto my-0 mt-4 flex w-fit items-center justify-center gap-3 rounded-full bg-tertiary px-4 py-2 text-gray-400 hover:cursor-pointer hover:bg-lightTertiary"
        onClick={addAsset}
      >
        <span>Add Token to Metamask</span>
        <Icon />
      </div>
      <div className="mt-6 mb-2 flex items-center justify-center">
        <Link
          href={`/transactions/${filteredTransaction}`}
          passHref
          className={
            "w-full justify-center rounded-2xl bg-blue-500 py-[15.5px] text-center text-[17px] font-semibold"
          }
          onClick={close}
        >
          view transaction
        </Link>
      </div>
    </>
  );
};

function TransactionSubmittedModal({
  close,
  open,
  asset,
  chain
}: TxSubmittedProps) {
  const { active } = useWeb3React();
  const { width } = useViewport();

    const AddAsset = useCallback(async(): Promise<void> => {
      const tokenAddress = chainAdresses[chain.fullName]!.assets[asset.Icon]?.tokenAddress
      const symbol = `testRen${asset.Icon}`
      //@ts-ignore
      const { ethereum } = window;
      try {
        await ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20", 
          options: {
            address: tokenAddress,
            symbol: symbol, 
            decimals: asset.decimals,
          },
        },
      });
      } catch(error: any) {
        console.log(error)
      }
    }, [asset, chain])

  return (
    <>
      {width > 0 && width >= Breakpoints.sm1 ? (
        <FormWrapper>
          <TxSubmittedInner active={active} close={close} addAsset={AddAsset}  />
        </FormWrapper>
      ) : (
        <BottomSheetOptions
          hideCloseIcon
          open={open}
          setOpen={() => null}
          title={"Pending"}
        >
          <TxSubmittedInner active={active} close={close} addAsset={AddAsset} />
        </BottomSheetOptions>
      )}
    </>
  );
}

export default TransactionSubmittedModal;
