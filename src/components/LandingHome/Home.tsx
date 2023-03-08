import React from "react";
import { StyledTitle, StyledSubTitle } from "../CSS/HomePage.styles";
import PrimaryButton from "../PrimaryButton/PrimaryButton";

import AssetRotator from "../AssetRotator/AssetRotator";

import styled from "styled-components";
import { BREAKPOINTS } from "../theme";
import meshSrc from "../../../public/images/Mesh.png";
import Image from "next/image";
import GreenDot from "../Icons/GreenDot";
import SupportedAssets from "./SupportedAsset";
import Link from "next/link";
import { motion } from 'framer-motion';
import { fadeIn } from '../../utils/fadeIn.';
import { UilAngleDown } from '@iconscout/react-unicons';
import { ArrowDownCircle } from "react-feather";
const LearnMoreArrow = styled(ArrowDownCircle)`
    margin-left: 14px;
    size: 20px;
    color: rgb(70, 115, 250);
    &:hover {
        color: rgb(49, 92, 221);
        cursor: pointer;
    }
`;

const DARK_MODE_GRADIENT =
    'radial-gradient(101.8% 4091.31% at 0% 0%, #4673FA 0%, #9646FA 100%)';

const Banner = styled.div<{ isDarkMode: boolean }>`
    border-radius: 35px;
    margin-top: 15px;
    margin-bottom: 10px;
    margin-left: 3px;
    margin-right: 3px;
    position: relative;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px 15px;

    box-shadow: 0px 10px 24px rgba(51, 53, 72, 0.04);

    background: url(${meshSrc}), ${DARK_MODE_GRADIENT};

    /* @media screen and (min-width: ${BREAKPOINTS.lg}px) {
		height: 140px;
		flex-direction: row;
	} */
`;

const ProtocolBanner = () => {
    return (
        <Banner>
            <Image alt="" src={meshSrc} />
            <div className="flex items-center">
                <span>Gas Setting</span>
            </div>
            <div className="flex items-center justify-center gap-2">
                <GreenDot />
                <span>Learn More</span>
            </div>
        </Banner>
    );
};

const Home = () => {
    const scrollPosition = () => {
        if (typeof window === "undefined") return
        window.scrollTo({
            top: 900,
            behavior: "smooth"
        })

    }
    return (
        <div className="text-bold mt-16 overflow-y-hidden text-white backdrop-blur-lg">
            <motion.div
                variants={fadeIn('down', 0.01)}
                initial="hidden"
                whileInView={'show'}
                viewport={{ once: true, amount: 0.3 }}
                className="my-0 mx-auto mb-8 mt-4 flex items-center justify-center"
            >
                <AssetRotator />
            </motion.div>
            <div>
                <motion.div
                    variants={fadeIn('up', 0.01)}
                    initial="hidden"
                    whileInView={'show'}
                    viewport={{ once: true, amount: 0.9 }}
                    className="my-0 mx-auto mb-8 mt-4 flex flex-col items-center justify-center"
                >
                    <StyledTitle
                        size={65}
                        margin={0}
                        weight={800}
                        align={'center'}
                    >
                        Trade and Bridge crypto assets seamlessly.
                    </StyledTitle>

                    <StyledSubTitle size={20}>
                        <span className="text-gray-400">
                            Buy, sell, and explore your favourite assets
                        </span>
                    </StyledSubTitle>

                    <div className="flex flex-col gap-2 ">
                        <Link
                            href={'/about'}
                            passHref
                            className="focus-visible:ring-primary my-4 flex w-[290px] items-center justify-center rounded-2xl bg-blue-500 py-4 px-5 text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                        >
                            <span>Learn More</span>
                        </Link>
                    </div>
                    <LearnMoreArrow onClick={scrollPosition} />
                </motion.div>
            </div>
            <div className="flex h-48"></div>
            <div className=" mb-8 mt-12 flex flex-col gap-6">
                {/* <ProtocolBanner/> */}
                {/* <div className="bg-darkBackground w-[1200px] h-full absolute"/> */}
                <SupportedAssets type={'LEGACY'} />
                <SupportedAssets type={'EVM'} />
            </div>
        </div>
    );
};

export default Home;
