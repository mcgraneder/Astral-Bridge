import { MinFormToggleButtonContainer, MintToggleButton, Tab } from '../WalletModal';
import { MintFormText2 } from '../../CSS/WalletModalStyles';

interface IToggleButton {
    side: string;
    text: string;
    active: boolean;
    onClick: (index: number) => void;
}

interface IToggleContainer {
    activeButton: Tab;
    tabs: Tab[];
    setActiveButton: React.Dispatch<React.SetStateAction<Tab>>;
}
const ToggleButton = ({ side, text, active, onClick }: IToggleButton) => {
    return (
        <MintToggleButton side={side} active={active} onClick={onClick}>
            <MintFormText2>{text}</MintFormText2>
        </MintToggleButton>
    );
}
const ToggleButtonContainer = ({ activeButton, tabs, setActiveButton }: IToggleContainer) => {
    const tabSelect = (index: number): void => setActiveButton(tabs[index] as Tab)

    return (
        <MinFormToggleButtonContainer>
            {tabs.map((tab: Tab, index: number) => {
                return <ToggleButton side={tab.side} text={tab.tabName} active={activeButton.tabNumber == index} onClick={() => tabSelect(index)} />;
            })}
        </MinFormToggleButtonContainer>
    );
};

export default ToggleButtonContainer