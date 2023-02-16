import { useState } from "react"
import { UilArrowLeft, UilCopy, UilSpinner } from "@iconscout/react-unicons";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import React from "react";
import { QRCode } from "react-qrcode-logo";
import Card from "../Card/Card";
import PrimaryButton from "../catalog/PrimaryButton";
import CopyHelper from "../Icons/Copy";

interface ModalProps {
  onClose: () => void;
}

interface ListItemProps {
  text: string;
  textClassName: string;
  Icon: React.ReactNode;
}

function ListItem({ text, Icon, textClassName }: ListItemProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex gap-2">
        <span className="flex w-max items-center">{Icon}</span>
        <p
          className={`text-grey-400 self-center break-words pr-3 font-semibold tracking-wide ${textClassName}`}
        >
          {text}
        </p>
      </span>
      <span className="self-start">
        <CopyHelper toCopy={text}/>
      </span>
    </div>
  );
}

export default function DepositTokenQRModal({ onClose }: ModalProps) {
  const [listenGatewayTx, setListenGatewayTx] = useState<boolean>(false)  
  const { t } = useTranslation();

  const handleOnClose = () => {
    setListenGatewayTx(false);
    onClose();
  };

  const handleBuyWithFiat = () => {
    const BanxaUrl = `https://catalog.banxa.com/?coinType=BTC&fiatType=USD&coinAmount=${tokenAmount}&blockchain=BTC&walletAddress=${gateway?.gatewayAddress}`;
    window.open(BanxaUrl, "_blank");
  };

  return (
    <Card
      dialog={false}
      onExitIconClick={handleOnClose}
      ExitIcon={UilArrowLeft}
    >
      <div className="flex items-center gap-4">
        <Card.Title small>
          {t("headings.depositX", { name: token!.symbol })}
        </Card.Title>
        {/* <StepIndicator curr={3} total={3} /> */}
      </div>
      <Card.Description>
        {t("actionDescriptors.depositDesc", {
          symbol: token!.symbol,
          accountName: `${catId}.cat`,
        })}
      </Card.Description>
      <Card.Separator className="my-6 md:my-8" />
      <div className="flex flex-col">
        <div className="mb-[26px] flex flex-col items-center gap-2">
          <div className="flex-shrink-0 overflow-hidden rounded-2xl">
            <QRCode
              size={192}
              logoImage="/svgs/logo-for-qr.svg"
              logoHeight={45}
              logoWidth={45}
              value={gateway?.gatewayAddress}
            />
          </div>
          <span className="pb-1"> </span>
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-center gap-1">
              <div className="text-grey-500 flex items-center justify-center text-sm font-semibold tracking-wide">
                {t("others.watchingForDeposits")}
              </div>
              <LoadingIndicator className="text-grey-500" />
            </div>
            <div className="text-grey-400 text-center text-sm font-semibold md:text-left">
              {t("actionDescriptors.doNotRefresh")}
            </div>
          </div>
          <span className="p-1"> </span>
          <div className="bg-black-800 md:bg-black-900 flex w-full flex-1 flex-col rounded-2xl pb-1 pl-1 pr-1">
            <span className="text-grey-500 px-2 py-1 text-left text-sm font-semibold capitalize tracking-wide">
              {t("others.sendBTCto")}
            </span>
            <div className="bg-black-900 md:bg-black-800 flex flex-1 flex-col gap-4 rounded-xl p-4">
              <ListItem
                text={gateway?.gatewayAddress ?? ""}
                Icon={
                  <Image
                    alt={token?.symbol}
                    src={token!.image}
                    width={24}
                    height={24}
                  />
                }
                textClassName={"break-all text-sm xs:text-base"}
              />
            </div>
          </div>
        </div>
        <div className="flex w-full flex-row items-center">
          <hr className="border-black-600 mr-4 inline w-full" />
          <div className="text-grey-500 flex items-center justify-center text-xs font-bold uppercase tracking-wide">
            {t("others.or")}
          </div>
          <hr className="border-black-600 ml-4 inline w-full" />
        </div>
        <PrimaryButton
          onClick={handleBuyWithFiat}
          className="mt-8 w-fit self-center bg-secondary"
        >
          <span className="mx-4 text-lg font-bold tracking-wide">
            {t("buttons.buyXWithUSD", { name: token!.symbol })}
          </span>
        </PrimaryButton>
      </div>
    </Card>
  );
}
