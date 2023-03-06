import { useEffect, useRef, useState } from "react";
import { getRefValue } from "../hooks/useGetRefValue";
import { DataRow, NavLink, StyledTokenRow } from '../components/transactions/components/TransactionBlockInfo';
import Tooltip from "../components/Tooltip/Tooltip";
import CopyIcon from "../components/Icons/CopyIcon";
import { UilQuestionCircle, UilCheck, UilAngleDown, UilPump, UilLockAlt } from '@iconscout/react-unicons';
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
        
      setHeight(contentEl.scrollHeight - 155);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <li className={` ${isOpen ? "active" : ""}`}>
      <div className="my-2 flex items-center justify-start">
        <div
          className={
            "flex  items-center justify-center py-[2px] text-center text-gray-400 hover:cursor-pointer hover:text-gray-300"
          }
          onClick={btnOnClick}
        >
          <UilAngleDown />
          <span>Expand to view more info.</span>
        </div>
      </div>
      <div
        className={`accordion-item-container mb-5 border-b border-tertiary rounded-[10px]`}
        style={{ height }}
      >
        <div
          ref={contentRef}
          className="accordion-item-content overflow-y-auto"
          style={{ height }}
        >
          <StyledTokenRow>
            <div className="flex items-center gap-2">
              <Tooltip content={"info"}>
                <UilQuestionCircle className="h-5 w-5 text-gray-400" />
              </Tooltip>
              <span>{"Block Hash:"}</span>
            </div>
            <div className="flex items-center gap-2 text-blue-600">
              <Tooltip content={"View on Etherscan"}>
                <span>
                  {
                    "0xc5cd6b1b037663eea31b6ed5777cdbdf0d8ce299f69e00510cb4d836c21c9c2f"
                  }
                </span>
              </Tooltip>

              <Tooltip content={"Copy Address"}>
                <div className="flex h-[26px] w-[26px] justify-center rounded-full bg-tertiary">
                  <CopyIcon text={"0z123456"} />
                </div>
              </Tooltip>
            </div>
          </StyledTokenRow>
          <StyledTokenRow>
            <div className="flex items-center gap-2">
              <Tooltip content={"info"}>
                <UilQuestionCircle className="h-5 w-5 text-gray-400" />
              </Tooltip>
              <span>{"Block Number:"}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <span>{"36363726"}</span>
              <UilLockAlt className="h-5 w-5 text-gray-400" />
            </div>
          </StyledTokenRow>
          <StyledTokenRow>
            <div className="flex items-center gap-2">
              <Tooltip content={"info"}>
                <UilQuestionCircle className="h-5 w-5 text-gray-400" />
              </Tooltip>
              <span>{"ChainId:"}</span>
            </div>
            <div className="text-gray-300">
              <span>{"5 Goerli"}</span>
            </div>
          </StyledTokenRow>
          <StyledTokenRow>
            <div className="flex items-center gap-2">
              <Tooltip content={"info"}>
                <UilQuestionCircle className="h-5 w-5 text-gray-400" />
              </Tooltip>
              <span>{"From Address:"}</span>
            </div>
            <div className="flex items-center gap-2 text-blue-600">
              <Tooltip content={"View on Etherscan"}>
                <span>{"0x4e32377bc7d7451af6e4d59e6ad5348e2589c9de"}</span>
              </Tooltip>

              <Tooltip content={"Copy Address"}>
                <div className="flex h-[26px] w-[26px] justify-center rounded-full bg-tertiary">
                  <CopyIcon text={"0z123456"} />
                </div>
              </Tooltip>
            </div>
          </StyledTokenRow>
          <StyledTokenRow>
            <div className="flex items-center gap-2">
              <Tooltip content={"info"}>
                <UilQuestionCircle className="h-5 w-5 text-gray-400" />
              </Tooltip>
              <span>{"To Address:"}</span>
            </div>
            <div className="flex items-center gap-2 text-blue-600">
              <Tooltip content={"View on Etherscan"}>
                <span>{"0x4e32377bc7d7451af6e4d59e6ad5348e2589c9de"}</span>
              </Tooltip>

              <Tooltip content={"Copy Address"}>
                <div className="flex h-[26px] w-[26px] justify-center rounded-full bg-tertiary">
                  <CopyIcon text={"0z123456"} />
                </div>
              </Tooltip>
            </div>
          </StyledTokenRow>
          <StyledTokenRow>
            <div className="flex items-center gap-2">
              <Tooltip content={"info"}>
                <UilQuestionCircle className="h-5 w-5 text-gray-400" />
              </Tooltip>
              <span>{"Gas Limit:"}</span>
            </div>
            <div className="text-gray-300">
              <span>{"210000"}</span>
            </div>
          </StyledTokenRow>
          <StyledTokenRow>
            <div className="flex items-center gap-2">
              <Tooltip content={"info"}>
                <UilQuestionCircle className="h-5 w-5 text-gray-400" />
              </Tooltip>
              <span>{"GasPrice:"}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <span>{"37.59 Gwei"}</span>
              <UilPump className="h-5 w-5 text-gray-400" />
            </div>
          </StyledTokenRow>
          <StyledTokenRow>
            <div className="flex items-center gap-2">
              <Tooltip content={"info"}>
                <UilQuestionCircle className="h-5 w-5 text-gray-400" />
              </Tooltip>
              <span>{"MaxFee Per Gas:"}</span>
            </div>
            <div className="text-gray-300">
              <span>{"1.5"}</span>
            </div>
          </StyledTokenRow>
          <StyledTokenRow>
            <div className="flex items-center gap-2">
              <Tooltip content={"info"}>
                <UilQuestionCircle className="h-5 w-5 text-gray-400" />
              </Tooltip>
              <span>{"MaxPriorityFee Per Gas:"}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <span>{"80.59 Gwei"}</span>
              <UilPump className="h-5 w-5 text-gray-400" />
            </div>
          </StyledTokenRow>
          <StyledTokenRow>
            <div className="flex items-center gap-2">
              <Tooltip content={"info"}>
                <UilQuestionCircle className="h-5 w-5 text-gray-400" />
              </Tooltip>
              <span>{"Nonce:"}</span>
            </div>
            <div className="text-gray-300">
              <span>{"288"}</span>
            </div>
          </StyledTokenRow>
          <StyledTokenRow>
            <div className="flex items-center gap-2">
              <Tooltip content={"info"}>
                <UilQuestionCircle className="h-5 w-5 text-gray-400" />
              </Tooltip>
              <span>{"Value:"}</span>
            </div>
            <div className="text-gray-300">
              <span>{"0.00 Ether"}</span>
            </div>
          </StyledTokenRow>
        </div>
      </div>
    </li>
  );
}

export default AccordionItem;
