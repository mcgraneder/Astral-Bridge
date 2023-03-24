import { Tab } from '../bridgeModal';
import { MintFormText2 } from '../../CSS/WalletModalStyles';
import styled from "styled-components"

export const MinFormToggleButtonContainer = styled.div`
  height: ${(props: any) => (props.isVisible ? "40px" : "0px")};
  transition: height 0.2s ease;
  display: flex;
  margin-bottom: 25px;
  background: rgb(13, 17, 28);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  &:hover {
    background: rgb(34, 43, 68);
  }
`;

export const MintToggleButton = styled.div`

   
    width: 50%;
    height: 100%;
    border-top-${(props: any) => props.side}-radius: 10px;
    border-right: 1.5px solid rgb(13, 17, 28);
    background: ${(props: any) =>
        props.active ? 'rgb(13, 17, 28)' : 'rgb(36,39,54)'};
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${(props: any) =>
        props.active ? 'rgb(75,135,220)' : 'rgb(36,39,54)'};
    color: ${(props: any) => (props.active ? 'rgb(75,135,220)' : 'White')};
    &:hover {
        cursor: pointer;
    }

`;

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
    isVisible: boolean
}
const ToggleButton = ({ side, text, active, onClick }: IToggleButton) => {
    return (
        <MintToggleButton side={side} active={active} onClick={onClick}>
            <MintFormText2>{text}</MintFormText2>
        </MintToggleButton>
    );
}
const ToggleButtonContainer = ({ activeButton, tabs, setActiveButton, isVisible }: IToggleContainer) => {
    const tabSelect = (index: number): void => setActiveButton(tabs[index] as Tab)

    return (
        <MinFormToggleButtonContainer isVisible={isVisible}>
            {isVisible && tabs.map((tab: Tab, index: number) => {
                return <ToggleButton key={index} side={tab.side} text={tab.tabName} active={activeButton.tabNumber == index} onClick={() => tabSelect(index)} />;
            })}
        </MinFormToggleButtonContainer>
    );
};

export default ToggleButtonContainer