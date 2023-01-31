import { useState, useEffect } from "react"
import { useWeb3React } from '@web3-react/core';
import { ethers } from "ethers";
import { toFixed } from "../../utils/misc";

const BalanceDisplay = () => {
    const [balance, setBalance] = useState<string | undefined>(undefined)
    const { library, account } = useWeb3React();

    useEffect(() => {
        if (!library || !account) return
        library.getBalance(account).then((balance: string): void => setBalance(
            toFixed(
                Number(ethers.utils.formatUnits(balance)), 
                4).toString()
            ));

        const balanceInteral: NodeJS.Timer = setInterval((): void => {
            library.getBalance(account).then((balance: string): void => setBalance(
                toFixed(
                    Number(ethers.utils.formatUnits(balance)), 
                    4).toString()
                ));
        }, 60000);
        return (): void => clearInterval(balanceInteral)
    }, [balance, library, account])

    return (
        <div className='my-5 flex flex-col items-center rounded-lg border border-tertiary p-2 text-center'>
            <span className=' text-[17px]'>ETH Balance</span>
            <span className='text-[35px]'>{balance ? balance : "0.00"}<span>ETH</span></span>
            <span className=' text-[17px] text-gray-500'>$ 10.67</span>
        </div>
    );
}

export default BalanceDisplay