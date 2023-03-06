import { useEffect, useRef, useState } from "react";
import { getRefValue } from "../hooks/useGetRefValue";
import { DataRow, NavLink, StyledTokenRow } from '../components/transactions/components/TransactionBlockInfo';
import Tooltip from "../components/Tooltip/Tooltip";
import CopyIcon from "../components/Icons/CopyIconAlt";
import { UilQuestionCircle, UilCheck, UilAngleDown } from '@iconscout/react-unicons';
import PrimaryButton from '../components/PrimaryButton/PrimaryButton';

function AccordionItem({
  data,
  isOpen,
  btnOnClick,
}: {
  data: any;
  isOpen: boolean;
  btnOnClick: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (isOpen) {
      const contentEl = getRefValue(contentRef);

      setHeight(contentEl.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <li className={` ${isOpen ? "active" : ""}`}>
      <div className="my-2 flex items-center justify-start">
        <div
          className={
            "flex  items-center justify-center text-gray-400 py-[2px] text-center hover:text-gray-300 hover:cursor-pointer"
          }
          onClick={btnOnClick}
        >
          <UilAngleDown />
          <span>Expand to view more info.</span>
        </div>
      </div>
      <div className="accordion-item-container mb-6" style={{ height }}>
        <div ref={contentRef} className="accordion-item-content">
          <StyledTokenRow>
            <div className="flex items-center gap-2">
              <Tooltip content={"info"}>
                <UilQuestionCircle className="text-grey-400 h-5 w-5" />
              </Tooltip>
              <span>{"Hash:"}</span>
            </div>
            <div className="">
              <span>{"0x4e32377bc7d7451af6e4d59e6ad5348e2589c9de"}</span>
            </div>
          </StyledTokenRow>
          <StyledTokenRow>
            <div className="flex items-center gap-2">
              <Tooltip content={"info"}>
                <UilQuestionCircle className="text-grey-400 h-5 w-5" />
              </Tooltip>
              <span>{"Hash:"}</span>
            </div>
            <div className="">
              <span>{"0x4e32377bc7d7451af6e4d59e6ad5348e2589c9de"}</span>
            </div>
          </StyledTokenRow>
          <StyledTokenRow>
            <div className="flex items-center gap-2">
              <Tooltip content={"info"}>
                <UilQuestionCircle className="text-grey-400 h-5 w-5" />
              </Tooltip>
              <span>{"Hash:"}</span>
            </div>
            <div className="">
              <span>{"0x4e32377bc7d7451af6e4d59e6ad5348e2589c9de"}</span>
            </div>
          </StyledTokenRow>
          <StyledTokenRow>
            <div className="flex items-center gap-2">
              <Tooltip content={"info"}>
                <UilQuestionCircle className="text-grey-400 h-5 w-5" />
              </Tooltip>
              <span>{"Hash:"}</span>
            </div>
            <div className="">
              <span>{"0x4e32377bc7d7451af6e4d59e6ad5348e2589c9de"}</span>
            </div>
          </StyledTokenRow>
          <StyledTokenRow>
            <div className="flex items-center gap-2">
              <Tooltip content={"info"}>
                <UilQuestionCircle className="text-grey-400 h-5 w-5" />
              </Tooltip>
              <span>{"Hash:"}</span>
            </div>
            <div className="">
              <span>{"0x4e32377bc7d7451af6e4d59e6ad5348e2589c9de"}</span>
            </div>
          </StyledTokenRow>
          <StyledTokenRow>
            <div className="flex items-center gap-2">
              <Tooltip content={"info"}>
                <UilQuestionCircle className="text-grey-400 h-5 w-5" />
              </Tooltip>
              <span>{"Hash:"}</span>
            </div>
            <div className="">
              <span>{"0x4e32377bc7d7451af6e4d59e6ad5348e2589c9de"}</span>
            </div>
          </StyledTokenRow>
          <StyledTokenRow>
            <div className="flex items-center gap-2">
              <Tooltip content={"info"}>
                <UilQuestionCircle className="text-grey-400 h-5 w-5" />
              </Tooltip>
              <span>{"Hash:"}</span>
            </div>
            <div className="">
              <span>{"0x4e32377bc7d7451af6e4d59e6ad5348e2589c9de"}</span>
            </div>
          </StyledTokenRow>
          <StyledTokenRow>
            <div className="flex items-center gap-2">
              <Tooltip content={"info"}>
                <UilQuestionCircle className="text-grey-400 h-5 w-5" />
              </Tooltip>
              <span>{"Hash:"}</span>
            </div>
            <div className="">
              <span>{"0x4e32377bc7d7451af6e4d59e6ad5348e2589c9de"}</span>
            </div>
          </StyledTokenRow>
          <StyledTokenRow>
            <div className="flex items-center gap-2">
              <Tooltip content={"info"}>
                <UilQuestionCircle className="text-grey-400 h-5 w-5" />
              </Tooltip>
              <span>{"Hash:"}</span>
            </div>
            <div className="">
              <span>{"0x4e32377bc7d7451af6e4d59e6ad5348e2589c9de"}</span>
            </div>
          </StyledTokenRow>
        </div>
      </div>
    </li>
  );
}

export default AccordionItem;
