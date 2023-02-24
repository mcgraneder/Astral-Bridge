import React, { ReactEventHandler, useCallback } from "react";
import { UilWallet } from "@iconscout/react-unicons";
import {
  FromContainer,
  WalletInputWrapper,
  WalletInput,
  MaxOption,
  ForumIcon,
  ForumImg,
} from "../../CSS/WalletModalStyles";
import { MapPin } from "react-feather";

const maxDecimals = 6;

interface IWalletInput {
  setAmount: any;
  amount: string;
  isMax: boolean;
  setIsMax: any;
  walletBalance: any;
  buttonState: string;
}
const WalletInputForm = ({
  setAmount,
  amount,
  isMax,
  setIsMax,
  walletBalance,
  buttonState,
}: IWalletInput) => {
  const preventMinus = (e: any): void => {
    if (e.code === "Minus") e.preventDefault();
  };

  const onChange = useCallback(
    (v: string, _isMax = false) => {
      let tokenValue: number | string = v;
      if (isMax !== _isMax) setIsMax(_isMax);
      setAmount(String(tokenValue));
    },
    [isMax, setIsMax, setAmount]
  );

  const onMaxClick = useCallback(
    (value: string) => {
      onChange(value, true);
    },
    [onChange]
  );

  const handleChange = (e: any) => {
    e.preventDefault();
    const value: string = e.target.value;
    if (value.length > 11) {
      const pointIndex = value.indexOf(".");
      if (
        pointIndex === -1 ||
        (pointIndex >= 0 && value.substring(0, pointIndex).length > 11)
      ) {
        e.preventDefault();
        return;
      }
    }

    if (maxDecimals) {
      const pointIndex = value.indexOf(".");
      if (
        pointIndex >= 0 &&
        value.substring(pointIndex + 1).length > maxDecimals
      ) {
        e.preventDefault();
        return;
      }
    }

    onChange(value);
  };

  const isValidNumber = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow only a digit or a dot/point
    if (/[0-9]/.test(e.key) || e.key === ".") {
      // Check for proper number or decimal
      if (!/^\d*\.?\d*$/.test(Number(amount) + e.key)) {
        e.preventDefault();
        return true;
      }
    } else {
      e.preventDefault();
      return true;
    }

    return true;
  };

  const handleFocus = () => amount === "0" && onChange("");
  const handleBlur = () => amount === "" && onChange("0");
  const handlePaste = (e: any) => e.preventDefault();

  return (
    <FromContainer>
      <WalletInputWrapper>
        <WalletInput
          //   onKeyPress={preventMinus}
          type={"number"}
          value={amount}
          placeholder={"Amount"}
          onChange={handleChange}
          onKeyPress={isValidNumber}
          onPaste={handlePaste}
          onFocus={handleFocus}
        ></WalletInput>
        <ForumIcon>
          <UilWallet />
        </ForumIcon>
        {
          <MaxOption
            onClick={() => onMaxClick(walletBalance)}
          >
            max
          </MaxOption>
        }
      </WalletInputWrapper>
    </FromContainer>
  );
};

export default WalletInputForm;
