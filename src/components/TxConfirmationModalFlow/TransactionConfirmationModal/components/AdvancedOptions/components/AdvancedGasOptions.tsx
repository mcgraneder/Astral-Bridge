import { useState, useEffect, useCallback } from "react";
import { WalletInput, WalletInputWrapper } from "../GasOptionsModal";
import BigNumber from "bignumber.js";
import TitleRow from "../../Title";
import { EMessageType } from "./GasLimitInput";
import {
  AdvancedGasOverride,
  customGP,
  GP,
  shiftBN,
} from "../../../../../../context/useGasPriceState";

type ADError = {
  maxFeeError: boolean;
  priorityFeeError: boolean;
};

type Message = {
  title: string;
  message: string;
};
type ADErrorMessage = {
  maxFeeError: Message;
  priorityFeeError: Message;
};

interface IAdvancedOptions {
  advancedGasOverride: customGP;
  updateAdvancedGasOverride: (
    newEntry: Partial<GP> | Partial<AdvancedGasOverride>,
    type: string
  ) => void;
  setButtonError: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdvancedOptions = ({
  advancedGasOverride,
  updateAdvancedGasOverride,
  setButtonError,
}: IAdvancedOptions) => {
  const [maxPriorityErrorMessage, setMaxPriorityErrorMessage] =
    useState<EMessageType>();
  const [maxFeeErrorMessage, setMaxFeeErrorMessage] = useState<EMessageType>();
  const [maxPriorityerror, setMaxPriorityError] = useState<boolean>(false);
  const [maxFeeerror, setMaxFeeError] = useState<boolean>(false);

  const checkMaxPriorityFeeValidity = useCallback((): boolean => {
    let isError: boolean = false;
    if (Number(shiftBN(advancedGasOverride.maxPriorityFee!, -9)) < 1) {
      setMaxPriorityError(true);
      setMaxPriorityErrorMessage({
        title: "Priority Fee too low",
        message:
          "setting the max priority fee below 1 may cause your transaction to fail",
      });
      setButtonError(true);
      isError = true;
    } else if (Number(shiftBN(advancedGasOverride.maxPriorityFee!, -9)) > 3) {
      setMaxPriorityError(true);
      setMaxPriorityErrorMessage({
        title: "Priority Fee unesecarily high",
        message:
          "setting the max priority above 3 is generally too high and  not nessecary",
      });
      setButtonError(true);
      isError = true;
    }
    return isError;
  }, [advancedGasOverride.maxPriorityFee, setButtonError]);

  const checkMaxFeeValidity = useCallback((): boolean => {
    let isError: boolean = false;
    if (
      Number(shiftBN(advancedGasOverride.maxFee!, -9)) <
      Number(shiftBN(advancedGasOverride.baseFee!, -9))
    ) {
      setMaxFeeError(true);
      setMaxFeeErrorMessage({
        title: "Max fee too low",
        message:
          "Setting the max fee below the current base fee may cause your transaction to fail",
      });
      setButtonError(true);
      isError = true;
    } else if (
      Number(shiftBN(advancedGasOverride.maxFee!, -9)) >
      3 * Number(shiftBN(advancedGasOverride.baseFee!, -9))
    ) {
      setMaxFeeError(true);
      setMaxFeeErrorMessage({
        title: "Max Fee unesecarily high",
        message:
          "setting the max fee this high is generally too high based off the current base fee and is not nessecary",
      });
      setButtonError(true);
    }
    return isError;
  }, [advancedGasOverride.maxFee, advancedGasOverride.baseFee, setButtonError]);

  useEffect(() => {
    if (!checkMaxFeeValidity() && !checkMaxPriorityFeeValidity()) {
      setMaxFeeError(false);
      setMaxPriorityError(false);
      setButtonError(false);
    }
  }, [checkMaxFeeValidity, checkMaxPriorityFeeValidity, setButtonError]);

  const onChangePriority = useCallback(
    (e: any) => {
      const gasLimit = advancedGasOverride.gasLimit;
      const baseFee = advancedGasOverride.baseFee;
      const priorityFee = advancedGasOverride.maxPriorityFee;

      const networkFee = new BigNumber(gasLimit!).multipliedBy(
        Number(baseFee!) * Number(priorityFee)
      );
    
      updateAdvancedGasOverride(
        {
          maxPriorityFee: new BigNumber(e.target.value).shiftedBy(9),
          networkFee: networkFee.shiftedBy(-9),
        },
        "Advanced"
      );
    },
    [advancedGasOverride, updateAdvancedGasOverride]
  );

  const onChangeMaxFee = useCallback(
    (e: any) => {
      updateAdvancedGasOverride(
        {
          maxFee: new BigNumber(e.target.value).shiftedBy(9),
        },
        "Advanced"
      );
    },
    [updateAdvancedGasOverride]
  );
  return (
    <div className="broder mx-[6px] mb-3 flex flex-col gap-2 rounded-2xl border-tertiary px-1 text-[20px]">
      <TitleRow heading="Base Fee" errorMessage={""} error={false} />
      <WalletInputWrapper>
        <WalletInput
          type={"number"}
          value={shiftBN(advancedGasOverride.baseFee!, -9)}
          placeholder={"Amount"}
          disabled={true}
        ></WalletInput>
      </WalletInputWrapper>
      <TitleRow
        heading="Priority Fee"
        errorMessage={maxPriorityErrorMessage?.title}
        error={maxPriorityerror}
      />
      <WalletInputWrapper error={maxPriorityerror}>
        <WalletInput
          type={"number"}
          value={shiftBN(advancedGasOverride.maxPriorityFee!, -9)}
          placeholder={"Amount"}
          onChange={onChangePriority}
          error={maxPriorityerror}
        ></WalletInput>
      </WalletInputWrapper>
      <TitleRow
        heading="Max Fee"
        errorMessage={maxFeeErrorMessage?.title}
        error={maxFeeerror}
      />
      <WalletInputWrapper error={maxFeeerror}>
        <WalletInput
          type={"number"}
          value={shiftBN(advancedGasOverride.maxFee!, -9)}
          onChange={onChangeMaxFee}
          error={maxFeeerror}
        ></WalletInput>
      </WalletInputWrapper>
    </div>
  );
};

export default AdvancedOptions;
