import React from "react";
import { StyledTitle, StyledSubTitle, colours } from '../CSS/HomePage.styles';
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
import Section2 from './MiddleSection';

const LearnMoreArrow = styled(ArrowDownCircle)`
    margin-left: 14px;
    size: 20px;
    color: rgb(116, 132, 224);
    &:hover {
        color: rgb(95, 111, 201);
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
            top: 820,
            behavior: "smooth"
        })

    }
    return (
        <div className="text-bold overflow-y-hidden px-0 text-white backdrop-blur-lg md:px-10 ">
            <div className="my-auto mx-0 flex min-h-screen flex-col  items-center justify-center ">
                <motion.div
                    variants={fadeIn('down', 0.01)}
                    initial="hidden"
                    whileInView={'show'}
                    viewport={{ once: true, amount: 0.3 }}
                    // transition={{ duration: 0.2}}
                    className="my-0 mx-auto mb-8 flex flex-col items-center justify-center gap-12"
                >
                    <AssetRotator />
                </motion.div>
                <div>
                    <motion.div
                        variants={fadeIn('up', 0.01)}
                        initial="hidden"
                        whileInView={'show'}
                        viewport={{ once: true, amount: 0.3 }}
                        // transition={{ duration: 0.2}}
                        className="my-0 mx-auto mb-8 mt-4 flex flex-col items-center justify-center"
                    >
                        <StyledTitle
                            size={55}
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

                        <div className="mt-4 flex flex-col gap-2">
                            <Link
                                href={'/about'}
                                passHref
                                className="focus-visible:ring-primary my-4 flex w-[260px] items-center justify-center rounded-2xl bg-[rgb(116,132,224)] py-[14px] px-4 text-white hover:bg-[rgb(95,111,201)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                            >
                                <span>Learn More</span>
                            </Link>
                        </div>
                        <LearnMoreArrow onClick={scrollPosition} />
                    </motion.div>
                </div>
            </div>

            <Section2 />
            <div className=" mb-8 mt-20 flex flex-col gap-6">
                <motion.div
                    variants={fadeIn('left', 0.01)}
                    initial="hidden"
                    whileInView={'show'}
                    viewport={{ once: true, amount: "all" }}
                    // transition={{ duration: 0.2}}
                    className="my-0 mx-auto mb-8 mt-4 flex flex-col items-center justify-center"
                >
                    <StyledTitle
                        size={50}
                        margin={0}
                        weight={800}
                        align={'center'}
                    >
                        We Support Many Assets Across Many Chains
                    </StyledTitle>
                </motion.div>

                <SupportedAssets type={'LEGACY'} />
            </div>
        </div>
    );
};

export default Home;
