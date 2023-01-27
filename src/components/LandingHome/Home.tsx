import React from "react";
import { StyledTitle, StyledSubTitle } from "../CSS/HomePage.styles";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import Logo from "../../../public/svgs/assets/renBTCHome.svg"
import AssetRotator from "../AssetRotator/AssetRotator";

const Home = () => {
    return (
        <div className="backdrop-blur-lg">
            <div className='my-0 mx-auto mb-8 mt-20 flex items-center justify-center'>
                <AssetRotator/>
            </div>
            <div>
                <StyledTitle size={65} margin={0} weight={800} align={"center"}>
                    Trade and Bridge crypto assets seamlessly.
                </StyledTitle>

                <StyledSubTitle size={20}>
                    <span className='text-gray-400'>Buy, sell, and explore your favourite assets</span>
                </StyledSubTitle>
                <div className='mt-8 mb-2 flex items-center justify-center'>
                    <PrimaryButton className={"w-full max-w-[250px] justify-center rounded-lg bg-gradient-to-r from-blue-500 to-blue-300 py-4 text-center"} onClick={() => {}}>
                        Try again
                    </PrimaryButton>
                </div>
            </div>
        </div>
    );
};

export default Home;
