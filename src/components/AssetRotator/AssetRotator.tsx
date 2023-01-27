import React, { useState, useEffect } from "react";
import EthereumIcon from "../../../public/svgs/assets/renETHHome.svg";
import BitcoinIcon from "../../../public/svgs/assets/renBTCHome.svg";
import DogeIcon from "../../../public/svgs/assets/renDOGEHome.svg";
import ZecIcon from "../../../public/svgs/assets/renZECHome.svg";
import SolIcon from "../../../public/svgs/assets/renSOLHome.svg";
import BNBIcon from "../../../public/svgs/assets/renBNBHome.svg";
import BCHIcon from "../../../public/svgs/assets/renBCHHome.svg";



type ChainAssetRotatorProps = {
    className?: string;
    children: any;
};

const timeout = 3000;
const offset = timeout / 3;
const ASSETS = [EthereumIcon, BitcoinIcon, DogeIcon, ZecIcon, SolIcon, BCHIcon, BNBIcon]
let Icon = EthereumIcon;

const ChainAssetRotator = () => {

    // const [ci, setCi] = useState(0);
    const [Ai, setAi] = useState<SVGElement>(EthereumIcon);
    const [show, setShow] = useState(false);
    // const chainsCount = supportedContractChains.length;
 
    useEffect(() => {
        setShow(true);
        // const switchCiTick = setInterval(() => {
        //   setCi((i) => (i === chainsCount - 1 ? 0 : i + 1));
        // }, timeout);

        const hideTick = setTimeout(() => {
            setShow(false);
            Icon = ASSETS[Math.floor(Math.random() * 3) + 1]
        }, timeout - offset);

        const switchAiTick = setTimeout(() => {
            console.log(Math.round(Math.random()))
            setAi(ASSETS[Math.floor(Math.random() * 4) + 1]);
        }, timeout);

        // const showTick = setTimeout(() => {
        //   setShow(true);
        // }, timeout * chainsCount + offset);

        return () => {
            // clearInterval(switchCiTick);
            clearTimeout(switchAiTick);
            clearTimeout(hideTick);
            // clearTimeout(showTick);
        };
    }, [Ai]);

    return (
        <div className='mx-auto my-12 flex h-[150px] w-[150px] items-center justify-center'>
            <div className="transition-opacity ease-in duration-700 opacity-100">
                <Icon className={"h-[150px] w-[150px]"} />
            </div>
        </div>
    );
};

export default ChainAssetRotator