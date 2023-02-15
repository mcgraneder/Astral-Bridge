import { TopRowNavigation } from '../../WalletConnectModal/WalletConnectModal';
import GasOptionsModal from './components/AdvancedOptions/GasOptionsModal';
import AssetSummary from './components/AssetSummary';
import { UilAngleDown } from '@iconscout/react-unicons';
import FeeSummary from './components/FeeSummary';
import ProtocolBanner from './components/GasOptionSummary';
import TransactionSummary from './components/TransactionSummary';
import PrimaryButton from '../../PrimaryButton/PrimaryButton';


const TxModalInner = ({
  advancedOptions,
  toggleAdvancedOptions,
  basicGasOverride,
  advancedGasOveride,
  gasMinLimit,
  updateGasOverride,
  asset,
  chain,
  exit,
  text,
  assetPrice,
  transactionType,
  customGasPrice,
  fee,
  executeTransaction
}) => {
  return (
    <>
      {advancedOptions ? (
        <GasOptionsModal
          setAdvancedOptions={toggleAdvancedOptions}
          basicGasOverride={basicGasOverride}
          updateGasOverride={updateGasOverride}
          advancedGasOverride={advancedGasOveride}
          minGasLimit={gasMinLimit}
        />
      ) : (
        <>
          <TopRowNavigation
            isRightDisplay={true}
            isLeftDisplay={true}
            close={exit}
            title={`Confirm Transaction`}
          />
          <div className="relative flex flex-col">
            <AssetSummary
              fullName={asset.fullName}
              shortName={text}
              icon={asset.Icon}
            />
            <AssetSummary
              fullName={chain.fullName}
              shortName={chain.shortName}
              icon={chain.Icon}
            />
            <div className="absolute top-[37%] right-[45%] flex h-9 w-9 items-center justify-center rounded-xl border border-gray-600 bg-darkBackground">
              <UilAngleDown className={""} />
            </div>
          </div>
          <div className="my-2 px-4 text-left">
            <span>{`1 ${asset.Icon} = ${assetPrice}`}</span>
          </div>
          <FeeSummary
            gasPrice={Number(fee)}
            asset={asset}
            text={text}
            toggleAdvancedOptions={toggleAdvancedOptions}
          />
          <ProtocolBanner
            type={customGasPrice ? customGasPrice.type! : "standard"}
          />
          <TransactionSummary fee={Number(fee)} asset={asset} text={text} />
          <PrimaryButton
            className={
              "w-full justify-center rounded-2xl bg-blue-500 py-[14px] text-center"
            }
            onClick={() =>
              executeTransaction(transactionType, text, chain, asset)
            }
          >
            Confirm {transactionType}
          </PrimaryButton>
        </>
      )}
    </>
  );
};
