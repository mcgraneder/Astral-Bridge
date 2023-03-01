import {
  gasPriceData,
  AdvancedGasOverride,
  customGP,
  GP,
  shiftBN,
} from "../../../../../../hooks/useMarketGasData";
import styled, { css } from "styled-components";
import BigNumber from "bignumber.js";
import { toFixed } from "../../../../../../utils/misc";

const RadioButton = styled.div`
  height: 22px;
  width: 22px;
  border-radius: 50%;
  transition: background-color 0.35s ease, border 0.35s ease;
  border: ${(props: any) =>
    props.active ? "1px solid white" : "1px solid gray"};
  background-color: ${(props: any) =>
    props.active ? "rgb(59,130,246)" : "transparent"};

  ${(props: any) =>
    props.active &&
    css`
      box-shadow: 0px 0px 1.2px 1.2px #fff;
    `}

  &:hover {
    cursor: pointer;
  }
`;

interface IBasicOptions {
  networkGasData: gasPriceData | undefined;
  updateGasOverride: (
    newEntry: Partial<GP> | Partial<AdvancedGasOverride>,
    type: string
  ) => void;
  basicGasOverride: customGP;
}

const GASPRICES = ["slow", "standard", "fast", "rapid"];

const BasicOptions = ({
  networkGasData,
  updateGasOverride,
  basicGasOverride,
}: IBasicOptions) => {
  return (
    <>
      <div className="mx-[6px] flex items-center justify-start gap-2 p-2">
        <span className="text-[14px] text-gray-300">GasPrice</span>
      </div>
      <div className="mx-[6px] mb-3 flex flex-col gap-2 rounded-xl border-gray-400 bg-secondary px-2 py-2">
        {networkGasData?.fees &&
          GASPRICES.map((type: string, index: number) => {
            const gasPriceFeeTypes: BigNumber[] = Object.values(
              networkGasData.fees
            );
            const customType = basicGasOverride.type;
            const networkFee = basicGasOverride?.gasLimit!.multipliedBy(
              gasPriceFeeTypes![index]!
            );

            const textStyle = `${
              customType === type ? "white" : "text-gray-500"
            }`;
            return (
              <div
                key={type}
                className="flex justify-between rounded-lg py-1 px-2 "
              >
                <div className="flex items-center justify-center gap-2">
                  <RadioButton
                    active={customType === type}
                    onClick={() => {
                      updateGasOverride(
                        {
                          type: type,
                          gasPrice: gasPriceFeeTypes[index],
                          gasLimit: basicGasOverride.gasLimit,
                          networkFee: networkFee,
                        },
                        "Basic"
                      );
                    }}
                  />

                  <span className={textStyle}>{type}</span>
                </div>
                <span className={textStyle}>
                  {toFixed(shiftBN(gasPriceFeeTypes[index]!, -9), 3)} Gwei
                </span>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default BasicOptions;
