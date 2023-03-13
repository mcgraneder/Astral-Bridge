import React, { useState } from 'react';
import Image from 'next/image';
import SwapImg from "../../../public/images/swapCard.png"
import Button from '../../../public/svgs/button.svg';
import WaveA from '../../../public/svgs/astronaut-wave-A.svg';
import WaveB from '../../../public/svgs/astronaut-wave-B.svg';
import Battery from '../../../public/svgs/battery.svg';
import LearnMoreButton from '../Buttons/LearnMoreButton';
import ReactCardFlip from 'react-card-flip';
import { HiOutlineXCircle } from 'react-icons/hi';
import { BridgeDeployments } from '../../constants/deployments';
import styled from 'styled-components';
import { Breakpoints } from '../../constants/Breakpoints';
import meshSrc from '../../../public/images/Mesh.png';
import GreenDot from '../Icons/GreenDot';
import { fadeIn } from '../../utils/fadeIn.';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { StyledTitle } from '../CSS/HomePage.styles';

const DARK_MODE_GRADIENT =
    'radial-gradient(101.8% 4091.31% at 0% 0%, #63166d 0%, #5a2bb6 100%)';

const Banner = styled.div<{ isDarkMode: boolean }>`
    border-radius: 25px;

    position: relative;

    display: flex;
    flex-direction: row;
    align-items: left;
    justify-content: space-between;
    padding: 10px 15px;
    width: 100%;
    height: 140px;


    margin-top: 50px;

    box-shadow: 0px 10px 24px rgba(51, 53, 72, 0.04);

    background: url(${meshSrc}), ${DARK_MODE_GRADIENT};

   
`;

const ProtocolBanner = () => {
    return (
        <Banner>
            <Image alt="" src={meshSrc} className="absolute h-[130px] w-full -z-50" />
            <div className="flex max-w-[75%] flex-col px-4 gap-2">
                <div className="items-left my-1 flex text-3xl pt-1">
                    <span>Powered By the Astral Protocol</span>
                </div>
                <div className="items-left my-1 flex">
                    <span>
                        Astral Bridge is powered by the core solidity smart
                        contracts that enable the secure and verified transfer
                        of crypto assets between EVM chains through ECDSA
                        signature verification.
                    </span>
                </div>
            </div>
            <a
                href={""}
                className={`z-50 mr-4 flex items-center hover:bg-primary my-8 w-fit rounded-full border-2 border-white px-8 text-white transition duration-200 ease-in-out hover:border-blue-300 hover:text-blue-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 `}
            >
                <span className={`text-base`}>Learn More</span>
            </a>
        </Banner>
    );
};


interface CrossButtonProps {
    onClick: () => void;
}

interface Props {
    children: React.ReactNode;
    className?: String;
}

export const Container = ({ children, className = '', ...rest }: Props) => {
    return (
        <div
            className={`relative w-[343px] overflow-hidden rounded-2xl bg-bg-[rgb(15,18,44)] drop-shadow-2xl lg:w-auto ${className}`}
            {...rest}
        >
            {children}
        </div>
    );
};

export const Title = ({ children, className = '', ...rest }: Props) => {
    return (
        <h3 className={`font-semibold tracking-wide ${className}`} {...rest}>
            {children}
        </h3>
    );
};

export const Description = ({
    children,
    className = '',
    ...rest
}: Props & { left?: boolean }) => {
    return (
        <p
            className={`text-base font-normal tracking-wide ${className}`}
            {...rest}
        >
            {children}
        </p>
    );
};


const CrossButton = ({ onClick }: CrossButtonProps) => {
    return (
        <span
            className="absolute top-3 right-4 cursor-pointer"
            onClick={onClick}
        >
            <HiOutlineXCircle className="text-blue-500 h-8 w-8" />
        </span>
    );
};

const Cards = {
    tradeFreely: 'trade_freely',
    ownMoney: 'ownMoney',
    freeTransfer: 'freeTransfer',
    ultraSecure: 'ultraSecure',
    atomic: 'atomic'
};

function Section2() {
    const [flipped, setFlipped] = useState({
        [Cards.freeTransfer]: false,
        [Cards.ownMoney]: false,
        [Cards.tradeFreely]: false,
        [Cards.ultraSecure]: false,
        [Cards.atomic]: false
    });

    const flip = (key: string, value: boolean) =>{
        console.log("flipping")
        setFlipped((f) => ({ ...f, [key]: value }));
    }

    return (
        //  <>
        <motion.div
            variants={fadeIn('up', 0.01)}
            initial="hidden"
            whileInView={'show'}
            viewport={{ once: true, amount: 0.3 }}
            id="features"
            className="z-50 flex flex-col items-center px-12 pt-20"
        >
            <StyledTitle size={50} margin={0} weight={800} align={'center'}>
                Why Use Astral
            </StyledTitle>
            <div className="flex w-full items-center justify-between gap-8 mt-12">
                <ReactCardFlip
                    containerClassName="h-[250px] w-full"
                    isFlipped={flipped.ownMoney}
                    flipDirection="horizontal"
                >
                    <Container className=" h-[250px] w-full border border-tertiary bg-[rgb(15,18,44)] ">
                        <Image
                            alt=""
                            src={SwapImg}
                            className="absolute right-0 h-[320px] w-[320px]"
                        />
                        {/* <Image alt="" src={SwapImg} className="absolute"/> */}
                        <div className=" mt-10 flex flex-col items-center justify-between lg:ml-16 lg:items-start">
                            <Title className="text-center text-3xl lg:w-[370px] lg:text-left">
                                Bridge Crypto Assets
                            </Title>
                            <LearnMoreButton
                                onClick={() => flip(Cards.ownMoney, true)}
                            />

                            <Description
                                className={
                                    'mt-2 max-w-[60%] text-left text-gray-300'
                                }
                            >
                                Bridge your favourite crypto assets across 9 EVM
                                chains so that you can take your coins anywhere
                            </Description>
                        </div>
                    </Container>
                    <Container className="flex h-[250px] items-center justify-center border border-tertiary bg-[rgb(15,18,44)] ">
                        <CrossButton
                            onClick={() => flip(Cards.ownMoney, false)}
                        />
                        <Image
                            alt=""
                            src={SwapImg}
                            className="absolute right-0 -z-50 h-[320px] w-[320px]"
                        />
                        <div className="ml-16 flex flex-col items-start gap-4">
                            <Title className="w-full text-center text-2xl lg:text-left">
                                Bridging Assets With Astral
                            </Title>
                            <Description className="max-w-[80%] text-center text-[14px] text-gray-300 lg:text-left">
                                Bridging an asset involves locking up the
                                original and minting a new synthetic astral
                                version of that asset on the destination chain
                                with a 1:1 peg.
                                <br />
                                <br />
                                When you want to reclaim your inital asset it is
                                released and the sythetic version is burned.
                            </Description>
                        </div>
                    </Container>
                </ReactCardFlip>
                <ReactCardFlip
                    containerClassName="h-[250px] w-full"
                    isFlipped={flipped.freeTransfer}
                    flipDirection="horizontal"
                >
                    <Container className="bg-bg-[rgb(15,18,44)] relative h-[250px] w-full border border-tertiary bg-[rgb(15,18,44)] ">
                        <div className="absolute -z-50 h-full w-full translate-y-4 bg-[url('/svgs/coins.svg')] bg-contain bg-bottom bg-no-repeat lg:translate-x-9 lg:bg-right" />
                        <div className=" mt-10 flex flex-col items-center justify-between lg:ml-16 lg:items-start">
                            <Title className="text-center text-3xl lg:w-[370px] lg:text-left">
                                Trade Tokens
                            </Title>
                            <LearnMoreButton
                                onClick={() => flip(Cards.freeTransfer, true)}
                            />

                            <Description
                                className={
                                    'mt-2 max-w-[60%] text-left text-gray-300'
                                }
                            >
                                Astral has a built in AMM and DEX that leverages
                                the core astral Bridge to enable cross chain
                                trading.
                            </Description>
                        </div>
                    </Container>
                    <Container className="flex h-[250px] items-center justify-center border border-tertiary bg-section4-part3-web p-8  lg:h-[250px] lg:p-16">
                        <CrossButton
                            onClick={() => flip(Cards.freeTransfer, false)}
                        />
                        {/* <WaveB
                            className={'absolute right-[20px] top-10 -z-50 h-36 w-36'}
                        /> */}

                        <div className="flex flex-col items-start gap-4">
                            <Title className="w-full text-center text-2xl lg:text-left">
                                Trading With Astral
                            </Title>
                            <Description className="max-w-[80%] text-center text-gray-300  lg:text-left">
                                Unlike Uniswap All liquidity pools on astral use
                                the same base token (USDT). This makes it easier
                                to concentrate liquidity across multiple pools
                                <br />
                                <br />
                                For cross-chain trades the source asset is
                                swapped to USDT, USDT is then Bridge to the
                                destination chain and swapped there for the
                                desired asset
                            </Description>
                        </div>
                    </Container>
                </ReactCardFlip>
            </div>
            <div className="mt-8 flex w-full items-center justify-between gap-8">
                <ReactCardFlip
                    containerClassName="h-[250px] w-full"
                    isFlipped={flipped.ownMoney}
                    flipDirection="horizontal"
                >
                    <Container className="bg-bg-[rgb(15,18,44)] relative h-[250px] w-full border border-tertiary bg-[rgb(15,18,44)] ">
                        <div className="absolute h-full w-full translate-y-4 bg-[url('/svgs/coins.svg')] bg-contain bg-bottom bg-no-repeat lg:translate-x-9 lg:bg-right" />
                        <div className="absolute mt-10 flex flex-col items-center lg:ml-16 lg:items-start">
                            <Title className="text-center text-2xl lg:w-80 lg:text-left">
                                Developments in Crosschain Defi
                            </Title>
                            <LearnMoreButton
                                onClick={() => flip(Cards.ownMoney, true)}
                            />
                        </div>
                    </Container>
                    <Container className="flex h-[250px] items-center justify-center border border-tertiary p-8 lg:h-[250px] lg:p-16">
                        <CrossButton
                            onClick={() => flip(Cards.ownMoney, false)}
                        />
                        <div className="flex flex-col items-start gap-4">
                            <Title className="w-full text-center text-3xl lg:text-left">
                                New Developments in Cross-chain
                            </Title>
                            <Description className="text-center text-gray-300  lg:text-left">
                                One conecpt I have been exploring is the a
                                development in crosschain Defi where users can
                                execute trades or smart contract calls on one
                                blockchain from an entirely different one
                                <br />
                                <br />
                                This is enabled through the concept of
                                cryptographic hashing and digital signatures. By
                                extracting any contract call into its raw
                                bytecode we can sign this data through the use
                                of Eliptic curve cryptography. In order to be
                                able to execute blockchain agnostic trades we
                                can compare this encode into this signature the
                                chain it is to be executed on (domain seperator)
                                Then on the destination chain we verify the
                                signature by comparing hashes.
                                <br />
                                <br />
                                This revolution allows for example, a user to
                                execute a smart contract call on Ethereum from
                                Polygon. See example on my githib here
                            </Description>
                        </div>
                    </Container>
                </ReactCardFlip>
                <ReactCardFlip
                    containerClassName="h-[250px] w-full"
                    isFlipped={flipped.ownMoney}
                    flipDirection="horizontal"
                >
                    <Container className="bg-bg-[rgb(15,18,44)] relative h-[250px] w-full border border-tertiary bg-[rgb(15,18,44)]">
                        <div className="absolute h-full w-full translate-y-4 bg-[url('/svgs/coins.svg')] bg-contain bg-bottom bg-no-repeat lg:translate-x-9 lg:bg-right" />
                        <div className="absolute mt-10 flex flex-col items-center lg:ml-16 lg:items-start">
                            <Title className="text-center text-4xl lg:w-80 lg:text-left">
                                Developments in Crosschain Defi
                            </Title>
                            <LearnMoreButton
                                onClick={() => flip(Cards.ownMoney, true)}
                            />
                        </div>
                    </Container>
                    <Container className="flex h-[250px] items-center justify-center border border-tertiary bg-[rgb(15,18,44)] p-8 lg:h-[250px] lg:p-16">
                        <CrossButton
                            onClick={() => flip(Cards.ownMoney, false)}
                        />
                        <div className="flex flex-col items-start gap-4">
                            <Title className="w-full text-center text-3xl lg:text-left">
                                New Developments in Cross-chain
                            </Title>
                            <Description className="text-center lg:text-left">
                                One conecpt I have been exploring is the a
                                development in crosschain Defi where users can
                                execute trades or smart contract calls on one
                                blockchain from an entirely different one
                                <br />
                                <br />
                                This is enabled through the concept of
                                cryptographic hashing and digital signatures. By
                                extracting any contract call into its raw
                                bytecode we can sign this data through the use
                                of Eliptic curve cryptography. In order to be
                                able to execute blockchain agnostic trades we
                                can compare this encode into this signature the
                                chain it is to be executed on (domain seperator)
                                Then on the destination chain we verify the
                                signature by comparing hashes.
                                <br />
                                <br />
                                This revolution allows for example, a user to
                                execute a smart contract call on Ethereum from
                                Polygon. See example on my githib here
                            </Description>
                        </div>
                    </Container>
                </ReactCardFlip>
                <ReactCardFlip
                    containerClassName="h-[250px] w-full"
                    isFlipped={flipped.ownMoney}
                    flipDirection="horizontal"
                >
                    <Container className="bg-bg-[rgb(15,18,44)] relative h-[250px] w-full border border-tertiary bg-[rgb(15,18,44)]">
                        <div className="absolute h-full w-full translate-y-4 bg-[url('/svgs/coins.svg')] bg-contain bg-bottom bg-no-repeat lg:translate-x-9 lg:bg-right" />
                        <div className="absolute mt-10 flex flex-col items-center lg:ml-16 lg:items-start">
                            <Title className="text-center text-4xl lg:w-80 lg:text-left">
                                Developments in Crosschain Defi
                            </Title>
                            <LearnMoreButton
                                onClick={() => flip(Cards.ownMoney, true)}
                            />
                        </div>
                    </Container>
                    <Container className="flex h-[250px] items-center justify-center border border-tertiary bg-[rgb(15,18,44)] p-8 lg:h-[250px] lg:p-16">
                        <CrossButton
                            onClick={() => flip(Cards.ownMoney, false)}
                        />
                        <div className="flex flex-col items-start gap-4">
                            <Title className="w-full text-center text-3xl lg:text-left">
                                New Developments in Cross-chain
                            </Title>
                            <Description className="text-center lg:text-left">
                                One conecpt I have been exploring is the a
                                development in crosschain Defi where users can
                                execute trades or smart contract calls on one
                                blockchain from an entirely different one
                                <br />
                                <br />
                                This is enabled through the concept of
                                cryptographic hashing and digital signatures. By
                                extracting any contract call into its raw
                                bytecode we can sign this data through the use
                                of Eliptic curve cryptography. In order to be
                                able to execute blockchain agnostic trades we
                                can compare this encode into this signature the
                                chain it is to be executed on (domain seperator)
                                Then on the destination chain we verify the
                                signature by comparing hashes.
                                <br />
                                <br />
                                This revolution allows for example, a user to
                                execute a smart contract call on Ethereum from
                                Polygon. See example on my githib here
                            </Description>
                        </div>
                    </Container>
                </ReactCardFlip>
            </div>
            <ProtocolBanner />
            {/* </> */}
            {/* <div className="my-12 grid w-full items-center justify-center gap-6 md:grid-cols-2 lg:my-16  lg:grid-cols-[308px_300px_300px_300px]"> */}
            {/* One click, zero gas trades */}

            {/* Own your coins */}
            {/* <ReactCardFlip
                    containerClassName="lg:col-span-2 lg:row-span-2 md:row-span-2 md:order-4 lg:order-none "
                    isFlipped={flipped.ownMoney}
                    flipDirection="horizontal"
                >
                    <Container className="border border-tertiary relative h-[250px] bg-bg-[rgb(15,18,44)] lg:h-[250px]">
                        <div className="absolute h-full w-full translate-y-4 bg-[url('/svgs/coins.svg')] bg-contain bg-bottom bg-no-repeat lg:translate-x-9 lg:bg-right" />
                        <div className="absolute mt-10 flex flex-col items-center lg:ml-16 lg:items-start">
                            <Title className="text-center text-4xl lg:w-80 lg:text-left">
                                Developments in Crosschain Defi
                            </Title>
                            <LearnMoreButton
                                onClick={() => flip(Cards.ownMoney, true)}
                            />
                        </div>
                    </Container>
                    <Container className="border border-tertiary flex h-[250px] items-center justify-center p-8 lg:h-[250px] lg:p-16">
                        <CrossButton
                            onClick={() => flip(Cards.ownMoney, false)}
                        />
                        <div className="flex flex-col items-start gap-4">
                            <Title className="w-full text-center text-3xl lg:text-left">
                                New Developments in Cross-chain
                            </Title>
                            <Description className="text-center lg:text-left">
                                One conecpt I have been exploring is the a
                                development in crosschain Defi where users can
                                execute trades or smart contract calls on one
                                blockchain from an entirely different one
                                <br />
                                <br />
                                This is enabled through the concept of
                                cryptographic hashing and digital signatures. By
                                extracting any contract call into its raw
                                bytecode we can sign this data through the use
                                of Eliptic curve cryptography. In order to be
                                able to execute blockchain agnostic trades we
                                can compare this encode into this signature the
                                chain it is to be executed on (domain seperator)
                                Then on the destination chain we verify the
                                signature by comparing hashes.
                                <br />
                                <br />
                                This revolution allows for example, a user to
                                execute a smart contract call on Ethereum from
                                Polygon. See example on my githib here
                            </Description>
                        </div>
                    </Container>
                </ReactCardFlip>

                <ReactCardFlip
                    containerClassName="lg:col-span-2 lg:row-span-2 md:row-span-2 md:order-4 lg:order-none"
                    isFlipped={flipped.ownMoney}
                    flipDirection="horizontal"
                >
                    <Container className="border border-tertiary relative h-[250px] lg:h-[250px]">
                        <div className="absolute h-full w-full translate-y-4 bg-[url('/svgs/coins.svg')] bg-contain bg-bottom bg-no-repeat lg:translate-x-9 lg:bg-right" />
                        <div className="absolute mt-10 flex flex-col items-center lg:ml-16 lg:items-start">
                            <Title className="text-center text-4xl lg:w-80 lg:text-left">
                                Developments in Crosschain Defi
                            </Title>
                            <LearnMoreButton
                                onClick={() => flip(Cards.ownMoney, true)}
                            />
                        </div>
                    </Container>
                    <Container className="border border-tertiary flex h-[250px] items-center justify-center p-8 lg:h-[250px] lg:p-16">
                        <CrossButton
                            onClick={() => flip(Cards.ownMoney, false)}
                        />
                        <div className="flex flex-col items-start gap-4">
                            <Title className="w-full text-center text-3xl lg:text-left">
                                New Developments in Cross-chain
                            </Title>
                            <Description className="text-center lg:text-left">
                                One conecpt I have been exploring is the a
                                development in crosschain Defi where users can
                                execute trades or smart contract calls on one
                                blockchain from an entirely different one
                                <br />
                                <br />
                                This is enabled through the concept of
                                cryptographic hashing and digital signatures. By
                                extracting any contract call into its raw
                                bytecode we can sign this data through the use
                                of Eliptic curve cryptography. In order to be
                                able to execute blockchain agnostic trades we
                                can compare this encode into this signature the
                                chain it is to be executed on (domain seperator)
                                Then on the destination chain we verify the
                                signature by comparing hashes.
                                <br />
                                <br />
                                This revolution allows for example, a user to
                                execute a smart contract call on Ethereum from
                                Polygon. See example on my githib here
                            </Description>
                        </div>
                    </Container>
                </ReactCardFlip> */}

            {/* </div> */}
        </motion.div>
    );
}

// export default AppWrap(MotionWrap(Section2), 'research', 'bg-secondary');
export default Section2
