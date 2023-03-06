import { useEffect, useRef, useState } from "react";
import { getRefValue } from "../hooks/useGetRefValue";
import { StyledTokenRow } from '../components/transactions/components/TransactionBlockInfo';
import Tooltip from "../components/Tooltip/Tooltip";
import CopyIcon from "../components/Icons/CopyIcon";
import { UilQuestionCircle, UilAngleDown, UilPump, UilLockAlt, UilSpinnerAlt } from '@iconscout/react-unicons';
import BigNumber from "bignumber.js";
import { loadingAnimation } from '../components/CSS/SkeletomStyles';
import styled, { css } from "styled-components"
import { Chain } from '@renproject/chains';
import { chainsBaseConfig } from '../utils/chainsConfig';
import { CHAINS } from "../connection/chains";

export const GlowingText = styled.span`
  font-size: 16px;
  animation-fill-mode: both;
  background: ${(props: any) =>
    props.loading
      ? `linear-gradient(
    to left,
    rgb(98, 107, 128) 25%,
    rgb(255, 255, 255) 50%,
    rgb(98, 107, 128) 75%
  )`
      : "white"};
  will-change: background-position;
  background-size: 400%;
  -webkit-background-clip: text;
  color: transparent;

  ${(props: any) =>
    props.loading &&
    css`
      animation: ${loadingAnimation} 1.6s infinite;
    `}
`;

function AccordionItem({
  transaction,
  isOpen,
  btnOnClick,
}: {
  transaction: any;
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

  const effectiveGP = new BigNumber(transaction.gasPrice).shiftedBy(-9)
  const maxBaseFee = new BigNumber(transaction.maxFeePerGas).shiftedBy(-9);
  const maxPriorityFee = new BigNumber(transaction.maxPriorityFeePerGas).shiftedBy(-9);

const explorerLink =
  CHAINS[chainsBaseConfig[transaction.chain! as Chain]!.testnetChainId!]?.explorerLink;
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
        className={`accordion-item-container mb-5 rounded-[10px] border-b border-tertiary`}
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
            {transaction.blockHash ? (
              <div className="flex items-center gap-2 text-blue-600">
                <Tooltip content={"View on Etherscan"}>
                  <a
                    href={`${explorerLink}/block/${transaction.blockNumber}`}
                    rel="noreferrer noopener"
                    target="_blank"
                  >
                    {transaction.blockHash}
                  </a>
                </Tooltip>

                <Tooltip content={"Copy Address"}>
                  <div className="flex h-[26px] w-[26px] justify-center rounded-full bg-tertiary">
                    <CopyIcon text={transaction.blockHash} />
                  </div>
                </Tooltip>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <GlowingText loading={true}>
                  waiting for transaction to complete...
                </GlowingText>
                <UilSpinnerAlt
                  className={" h-6 w-6 animate-spin text-gray-500"}
                />
              </div>
            )}
          </StyledTokenRow>
          <StyledTokenRow>
            <div className="flex items-center gap-2">
              <Tooltip content={"info"}>
                <UilQuestionCircle className="h-5 w-5 text-gray-400" />
              </Tooltip>
              <span>{"Block Number:"}</span>
            </div>
            {transaction.blockNumber ? (
              <div className="flex items-center gap-2 text-gray-300">
                <span>{transaction.blockNumber}</span>
                <UilLockAlt className="h-5 w-5 text-gray-400" />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <GlowingText loading={true}>
                  waiting for transaction to complete...
                </GlowingText>
                <UilSpinnerAlt
                  className={" h-6 w-6 animate-spin text-gray-500"}
                />
              </div>
            )}
          </StyledTokenRow>
          <StyledTokenRow>
            <div className="flex items-center gap-2">
              <Tooltip content={"info"}>
                <UilQuestionCircle className="h-5 w-5 text-gray-400" />
              </Tooltip>
              <span>{"ChainId:"}</span>
            </div>
            <div className="text-gray-300">
              <span>{transaction.chainId}</span>
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
                <a
                  href={`${explorerLink}/address/${transaction.from}`}
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  {transaction.from}
                </a>
              </Tooltip>

              <Tooltip content={"Copy Address"}>
                <div className="flex h-[26px] w-[26px] justify-center rounded-full bg-tertiary">
                  <CopyIcon text={transaction.from} />
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
                <a
                  href={`${explorerLink}/address/${transaction.to}`}
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  {transaction.to}
                </a>
              </Tooltip>

              <Tooltip content={"Copy Address"}>
                <div className="flex h-[26px] w-[26px] justify-center rounded-full bg-tertiary">
                  <CopyIcon text={transaction.to} />
                </div>
              </Tooltip>
            </div>
          </StyledTokenRow>
          <StyledTokenRow>
            <div className="flex items-center gap-2">
              <Tooltip content={"info"}>
                <UilQuestionCircle className="h-5 w-5 text-gray-400" />
              </Tooltip>
              <span>{"Gas Used:"}</span>
            </div>
            {transaction.gasLimit !== "NaN" ? (
              <div className="text-gray-300">
                <span>{transaction.gasLimit}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <GlowingText loading={true}>
                  waiting for transaction to complete...
                </GlowingText>
                <UilSpinnerAlt
                  className={" h-6 w-6 animate-spin text-gray-500"}
                />
              </div>
            )}
          </StyledTokenRow>
          <StyledTokenRow>
            <div className="flex items-center gap-2">
              <Tooltip content={"info"}>
                <UilQuestionCircle className="h-5 w-5 text-gray-400" />
              </Tooltip>
              <span>{"Effective GasPrice:"}</span>
            </div>
            {transaction.gasPrice !== "NaN" ? (
              <div className="flex items-center gap-2 text-gray-300">
                <span>{`${effectiveGP} Gwei`}</span>
                <UilPump className="h-5 w-5 text-gray-400" />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <GlowingText loading={true}>
                  waiting for transaction to complete...
                </GlowingText>
                <UilSpinnerAlt
                  className={" h-6 w-6 animate-spin text-gray-500"}
                />
              </div>
            )}
          </StyledTokenRow>
          <StyledTokenRow>
            <div className="flex items-center gap-2">
              <Tooltip content={"info"}>
                <UilQuestionCircle className="h-5 w-5 text-gray-400" />
              </Tooltip>
              <span>{"MaxFee Per Gas:"}</span>
            </div>
            <div className="text-gray-300">
              <span>{`${maxBaseFee} Gwei`}</span>
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
              <span>{`${maxPriorityFee} Gwei`}</span>
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
              <span>{transaction.nonce}</span>
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
