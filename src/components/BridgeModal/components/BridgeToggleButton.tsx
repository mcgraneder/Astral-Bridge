import { Tab } from "../bridgeModal";
import { MintFormText2 } from "../../CSS/WalletModalStyles";
import styled from "styled-components";
import { assetsBaseConfig } from '../../../utils/assetsConfig';

export const MinFormToggleButtonContainer = styled.div`
  height: 40px;
  display: flex;
  margin-bottom: 25px;
  background: rgb(15, 25, 55);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;

  &:hover {
    background: rgb(34, 43, 68);
  }
`;

export const MintToggleButton = styled.div`

   
    width: 50%;
    height: 100%;
    border-top-${(props: any) => props.side}-radius: 20px;
    background: ${(props: any) =>
      props.active ? "rgb(15, 25, 55)" : "rgb(34, 53, 83)"};
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: none;
    color: ${(props: any) => (props.active ? "rgb(75,135,220)" : "gray")};
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
  setAsset: any;
}
const ToggleButton = ({ side, text, active, onClick }: IToggleButton) => {
  return (
    <MintToggleButton side={side} active={active} onClick={onClick}>
      <MintFormText2>{text}</MintFormText2>
    </MintToggleButton>
  );
};
const BridgeToggleButton = ({
  activeButton,
  tabs,
  setActiveButton,
  setAsset
}: IToggleContainer) => {

  const tabSelect = (index: number): void => {
    if (index == 1) setAsset(assetsBaseConfig.DAI_Goerli)
    else setAsset(assetsBaseConfig.BTC)
    setActiveButton(tabs[index] as Tab);
  }

  return (
    <MinFormToggleButtonContainer>
      {tabs.map((tab: Tab, index: number) => {
        return (
          <ToggleButton
            key={index}
            side={tab.side}
            text={tab.tabName}
            active={activeButton.tabNumber == index}
            onClick={() => tabSelect(index)}
          />
        );
      })}
    </MinFormToggleButtonContainer>
  );
};

export default BridgeToggleButton;
