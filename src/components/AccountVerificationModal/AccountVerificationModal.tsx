import { useState } from "react"
import { Backdrop } from "../WalletConnectModal/WalletConnectModal";
import { UilTimes, UilArrowLeft, UilSpinnerAlt } from "@iconscout/react-unicons";
import MetamaskIcon from "../../../public/svgs/metamask-fox.svg";
import styled from "styled-components";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import { get, post } from "../../services/axios";
import axios from "axios";
import { useAuth } from "../../context/useWalletAuth";
import { useWeb3React } from '@web3-react/core';
import API from "../../constants/Api";
import { useRouter } from 'next/router';

export const FormWrapper = styled.div`
    position: fixed;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -50%);
    width: 370px;
    background-color: rgb(15, 25, 55);
    text-align: right;
    padding: 30px 15px;
    padding-bottom: 20px;
    border: 1.5px solid rgb(48, 63, 88);
    border-radius: 15px;
    display: block;
    z-index: 10000000000;
`;

const TopRowNavigation = ({ close }: { close: any}) => {
    return (
        <div className={`mb-2 flex items-center justify-between px-2`}>
            <div className='flex items-center gap-2'>
                <MetamaskIcon className={" hover:cursor-pointer"} />
                <span className='text-[18px] font-semibold'>Link your wallet</span>
            </div>
            <div onClick={close}>
                <UilTimes className={" hover:cursor-pointer"} />
            </div>
        </div>
    );
}

const AccountVerificationModal = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const { library, account } = useWeb3React()
    const { pathname, push } = useRouter()
    const { hasSigned, setHasSigned, disconnect, connecting } = useAuth();

    const close = () => {
        setHasSigned(true)
        disconnect()
    }

    const signatureVerifier = async(): Promise<void> => {
        const nonce: number = Math.floor(Math.random() * 10000);
        let signature: string | null 
        try {
            setLoading(true)
            signature = await library.getSigner().signMessage(`Alpha-Bridge Onboarding unique one-time nonce: ${nonce} by signimg this you are verifying your ownership of this wallet`);
            const data: any = await axios.post(
                API.ren.verify, { signature, nonce, publicAddress: account }
            )

            localStorage.setItem("authToken", data.data.token)
            if (pathname === "/home") push("/wallet");
            
            setHasSigned(true)
            setLoading(false)
        } catch(error: any) {
            console.log(error)
            setLoading(false)
        }
    }

    return (
        <>
            {!hasSigned && !connecting && (
                <Backdrop visible={!hasSigned && !connecting}>
                    <FormWrapper>
                        <TopRowNavigation close={close}/>
                        <div className='text-overflow block break-words px-2 text-left text-gray-500'>You need to verify your ownership of this ENS. please sign the prompted message to continue</div>
                        <div className='my-2 flex items-center justify-center gap-5  p-2'>
                            <div className='flex items-center '>
                                <div className='flex h-[50px] w-[50px] items-center justify-center rounded-full bg-gray-600 text-center text-3xl font-bold text-gray-500'>{!loading ? <span>1</span> : <UilSpinnerAlt className={" h-8 w-8 animate-spin text-blue-600"} />}</div>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <div className='text-left text-[17px] font-semibold'>Verify Ownership</div>
                                <div className='text-left text-gray-500'>Confirm you are the owner of this wallet </div>
                            </div>
                        </div>
                        <div className='my-2 mb-2 flex items-center justify-center'>
                            <PrimaryButton className={"w-full justify-center rounded-lg bg-blue-500 py-4 text-center"} onClick={signatureVerifier}>
                                Verify
                            </PrimaryButton>
                        </div>
                    </FormWrapper>
                </Backdrop>
            )}
        </>
    );
};

export default AccountVerificationModal;
