import PrimaryButton from '../../../PrimaryButton/PrimaryButton';

interface IFeeSummary {
  gasPrice: number;
  text: string;
  asset: any;
  toggleAdvancedOptions: () => void;
}

interface IFeeSummaryItem {
  title: string;
  titleValue: JSX.Element | string;
  subTitle: string;
  subTitleValue: JSX.Element | string;
}

const FeeSummaryItem = ({
  title,
  titleValue,
  subTitle,
  subTitleValue,
}: IFeeSummaryItem) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-between">
        <span className="text-gray-400">{title}</span>
        <span className="">{titleValue}</span>
      </div>
      <div className="flex flex-row items-center justify-between">
        <span className="text-gray-400">{subTitle}</span>
        <span className="">
          <span>{subTitleValue}</span> Gwei
        </span>
      </div>
    </div>
  );
};

const FeeSummary = ({
  gasPrice,
  text,
  asset,
  toggleAdvancedOptions,
}: IFeeSummary) => {
  return (
    <div className="my-1 mb-2 flex flex-col rounded-xl border border-gray-600 bg-secondary px-4 py-2 text-[14px]">
      <FeeSummaryItem
        title={"Expected Output"}
        titleValue={text}
        subTitle={"Network Fee"}
        subTitleValue={gasPrice.toString()}
      />
      <div className="my-2 h-[1.2px] w-full bg-gray-600" />
      <FeeSummaryItem
        title={"Expected bridge tx fee"}
        titleValue={<span>{`0.00 ${asset.Icon}`}</span>}
        subTitle={"0.00%"}
        subTitleValue={asset.Icon}
      />
      <div className="mt-3 mb-[3px]">
        <PrimaryButton
          className={
            "w-full justify-center rounded-lg border border-blue-500 bg-secondaryButtonColor py-[6px] text-center text-blue-400 hover:text-white hover:bg-blue-500"
          }
          onClick={toggleAdvancedOptions}
        >
          Advanced Gas Settings
        </PrimaryButton>
      </div>
    </div>
  );
};

export default FeeSummary
