import { useState, useEffect } from "react";
import { WalletInput, WalletInputWrapper } from "../GasOptionsModal";
import { customGP } from "../../../../../../hooks/useMarketGasData";
import TitleRow from '../../Title';

export type EMessageType = {
  title: string;
  message: string;
};

interface IGasLimitInput {
  gasOverride: customGP;
  minGasLimit: string;
  onChange: (e: any) => void;
  setButtonError: React.Dispatch<React.SetStateAction<boolean>>;
}

const GasLimitInput = ({
  gasOverride,
  minGasLimit,
  onChange,
  setButtonError
}: IGasLimitInput) => {
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<EMessageType>();

  useEffect(() => {
    if (Number(gasOverride.gasLimit) < Number(minGasLimit)) {
      setError(true);
      setErrorMessage({
        title: "Gas Limit set too low",
        message: `Setting the gas limit below ${minGasLimit} may cause this transaction to fail`,
      });
      setButtonError(true)
    } else if (Number(gasOverride.gasLimit) > Number(minGasLimit) * 101) {
      setError(true);
      setErrorMessage({
        title: "Gas Limit unessecarily high",
        message:
          "setting the gas limit this high is unnessecary and will cost you a lot more",
      });
      setButtonError(true)
    } else {
      setError(false);
      setButtonError(false)
    }
  }, [gasOverride.gasLimit, minGasLimit, setButtonError]);

  return (
    <>
      <TitleRow
        heading="Gas Limit"
        errorMessage={errorMessage?.title}
        error={error}
        className={"mt-2 p-2"}
      />
      <div className="broder mx-[6px] mb-3 flex flex-col gap-2 rounded-2xl border-tertiary px-1 text-[20px]">
        <WalletInputWrapper>
          <WalletInput
            type={"number"}
            value={gasOverride.gasLimit}
            placeholder={minGasLimit}
            onChange={onChange}
            error={error}
          ></WalletInput>
        </WalletInputWrapper>
      </div>
      <div
        className={` mb-4 w-full break-words px-5 text-left text-[14px] ${
          error ? "text-red-500" : "text-gray-400"
        }`}
      >
        <span>
          {error
            ? errorMessage?.message
            : "Chainging the GasLimit may have unintened effects. Only change this if you know what your doing"}
        </span>
      </div>
    </>
  );
};

export default GasLimitInput;
