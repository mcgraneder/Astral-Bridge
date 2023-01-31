import { UilAngleDown } from '@iconscout/react-unicons';
import BtcIcon from "../../../../public/svgs/assets/renBTC.svg"

interface IDropdown {
    text: string;
    Icon: React.SVGProps<SVGSVGElement>;
    type: string
}
const Dropdown = ({ text, Icon, type }: IDropdown) => {
    return (
        <div className='my-2 flex w-full justify-between gap-2 rounded-md border border-gray-600 bg-secondary px-3 py-[6px] hover: cursor-pointer'>
            <div className='flex items-center justify-center gap-2'>
                <div className='h-6 w-6'>
                    <Icon className='h-6 w-6' />
                </div>
                { type === "Deposit" ? <span className='text-[15px]'>To {text}</span> : <span className='text-[15px]'>From {text}</span>}
            </div>
            <div className='h-6 w-6'>
                <UilAngleDown className='h-6 w-6 font-bold text-blue-600' />
            </div>
        </div>
    );
}

export default Dropdown