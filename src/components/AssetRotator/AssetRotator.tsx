import React, { useState, useEffect, FunctionComponent } from "react";
import { Asset } from "@renproject/chains";
import { Icon } from "../Icons/AssetLogs/Icon";
import { Fade } from "@material-ui/core"



type ChainAssetRotatorProps = {
    className?: string;
};

export const supportedAssets =
     [
              Asset.BTC,
              Asset.BCH,
              Asset.DGB,
              Asset.DOGE,
              Asset.FIL,
              Asset.LUNA,
              Asset.ZEC,
              Asset.ETH,
              Asset.BNB,
              Asset.AVAX,
              Asset.FTM,
              Asset.ArbETH,
              Asset.MATIC,
             
             
              Asset.SOL, 
              Asset.REN,
              Asset.DAI,
              Asset.USDC,
              Asset.USDT,
              Asset.EURT,
              Asset.BUSD,
              Asset.MIM,
              Asset.CRV,
              Asset.LINK,
              Asset.UNI,
              Asset.SUSHI,
              Asset.FTT,
              Asset.ROOK,
              Asset.BADGER,
              Asset.KNC,
          ]
        


export const AssetRotator: FunctionComponent<ChainAssetRotatorProps> = ({ className, children }) => {
    const timeout = 3000;
    const offset = timeout / 3;
    const [ai, setAi] = useState(0);
    const [show, setShow] = useState(false);
    const [hover, setHover] = useState<boolean>(false)
    const assetsCount = supportedAssets.length;

    const toggleRotaator = () => setHover(!hover)

    useEffect(() => {
        if (hover) return
        setShow(true);
        const hideTick = setTimeout(() => {
            setShow(false);
        }, timeout - offset);

        const switchAiTick = setTimeout(() => {
            setAi(ai === assetsCount - 1 ? 0 : ai + 1);
        }, timeout);

        //  console.log(ai);
        return () => {
            clearTimeout(switchAiTick);
            clearTimeout(hideTick);
        };
       
    }, [assetsCount, ai, hover]);

    const asset = supportedAssets[ai];
    return (
        <div className={className}>
            <Fade in={show} timeout={{ enter: 500, exit: 100 }}>
                { asset && <Icon chainName={asset} className={"h-[200px] w-[200px] hover:h-[200px] hover:w-[200px] hover:cursor-pointer"} onMouseEnter={toggleRotaator} onMouseLeave={toggleRotaator} /> }
            </Fade>
            {children}
        </div>
    );
};

export default AssetRotator