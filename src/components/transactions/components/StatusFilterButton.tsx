import React, { useState, useEffect, useRef } from "react";
import { UilAngleDown } from "@iconscout/react-unicons";
import styled from "styled-components";
import { CHAINS, ChainType } from "../../../connection/chains";
import { useWeb3React } from "@web3-react/core";
import { Breakpoints } from "../../../constants/Breakpoints";
import { useViewport } from "../../../hooks/useViewport";
import BottomSheetOptions from "../../BottomSheet/BottomSheetOptions";
import GreenDot from "../../Icons/GreenDot";

export const FormWrapper = styled.div`
  position: absolute;
  left: 20%;
  top: 49%;
  transform: translate(-50%, -50%);
  width: 300px;
  background-color: rgb(15, 25, 55);
  text-align: right;
  padding: 10px;
  padding-bottom: 20px;
  border: 1.5px solid rgb(48, 63, 88);
  border-radius: 15px;
  display: block;
  z-index: 10000000000;
  box-shadow: 14px 19px 5px 0px rgba(0, 0, 0, 0.85);
`;

const getChainOptions = () => {
  return Object.values(CHAINS);
};

const TRANSACTION_STATUSES = ["Completed", "Pending", "Failed", "All Statuses"];

const StatusFilterButtons = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { chainId } = useWeb3React();
  const { width } = useViewport();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkIfClickedOutside = (e: Event) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node | null)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* <div className="flex gap-2"> */}
      <div
        className="flex items-center gap-2 rounded-xl border-tertiary bg-blue-600 py-2 px-4 text-white"
        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          e.stopPropagation();
          setIsMenuOpen((o: boolean) => !o);
        }}
        ref={ref}
      >
        <span>pending</span>
        <UilAngleDown />
      </div>

      {isMenuOpen &&
        (width > 0 && width >= Breakpoints.sm1 ? (
          <FormWrapper>
            {TRANSACTION_STATUSES.map((status: string, index: number) => {
              return <TxStatusSelector key={index} status={status} />;
            })}
          </FormWrapper>
        ) : (
          <BottomSheetOptions
            hideCloseIcon
            open={true}
            setOpen={() => null}
            title={"Chain selection"}
          >
            {TRANSACTION_STATUSES.map((status: string, index: number) => {
              return <TxStatusSelector key={index} status={status} />;
            })}
          </BottomSheetOptions>
        ))}
      {/* </div> */}
    </>
  );
};

const TxStatusSelector = ({ status }: { status: string }) => {
  return (
    <div
      className=" flex flex-row items-center gap-3 rounded-lg px-2 py-2 hover:cursor-pointer hover:bg-tertiary"
      onClick={() => {}}
    >
      {/* <div className="flex h-full">
        <chain.logo className={"h-5 w-5"} />
      </div> */}
      <span className="text-[15px] text-white">{status}</span>
      {/* {currentChain && currentChain == chain.id && <GreenDot />} */}
    </div>
  );
};

export default StatusFilterButtons;
