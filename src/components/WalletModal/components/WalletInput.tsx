import React, { ReactEventHandler } from "react";
import { UilWallet } from "@iconscout/react-unicons"
import { FromContainer, WalletInputWrapper, WalletInput, MaxOption, ForumIcon, ForumImg } from "../../CSS/WalletModalStyles";
import { MapPin } from "react-feather";

interface IWalletInput {
    setText: any;
    text: string
}
const WalletInputForm = ({ setText, text }: IWalletInput) => {
    const preventMinus = (e): void => {
        if (e.code === "Minus") e.preventDefault();
    };

    return (
        <FromContainer>
            <WalletInputWrapper>
                <WalletInput onKeyPress={preventMinus} type={"number"} value={text} onChange={(e) => setText(e.target.value)} placeholder={"Amount"}></WalletInput>
                <ForumIcon><UilWallet/></ForumIcon>
                {<MaxOption onClick={() => {}}>max</MaxOption>}
            </WalletInputWrapper>
        </FromContainer>
    );
};

export default WalletInputForm;
