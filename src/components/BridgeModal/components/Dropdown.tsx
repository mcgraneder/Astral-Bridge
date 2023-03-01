import { UilAngleDown } from "@iconscout/react-unicons";
import { Icon as AssetIcon } from "../../Icons/AssetLogs/Icon";
import styled from "styled-components"

export const DropDownContainer = styled.div`
  margin: ${(props: any) => (props.isVisible ? "8px 0px" : "0px")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 6px;
  border: ${(props: any) => (props.isVisible ? "1px solid rgb(75 85 99);" : "none")};
  background-color: rgb(34 53 83);
  padding: 0px 12px;
  height: ${(props: any) => (props.isVisible ? "38px" : "0px")};
  transition: height 0.2s ease;

  &:hover {
    cursor: pointer;
  }
`;
interface IDropdown {
  text: string;
  dropDownType: string;
  Icon: React.SVGProps<SVGSVGElement>;
  type: string;
  setType: any;
  setShowTokenModal: any;
  setChainType: any;
  isVisible: boolean;
}
const Dropdown = ({
  text,
  dropDownType,
  Icon,
  type,
  setType,
  setShowTokenModal,
  setChainType,
  isVisible
}: IDropdown) => {
  // console.log("iconnnnnn", Icon);
  const on = () => {
    
    setType(dropDownType);
    setShowTokenModal(true);
    setChainType()
  };
  return (
    <DropDownContainer isVisible={isVisible} onClick={on}>
      <div
        className={`flex items-center justify-center gap-2 ${
          !isVisible && "hidden"
        }`}
      >
        <div className="h-6 w-6">
          <AssetIcon chainName={Icon as string} className="h-6 w-6" />
        </div>
        {dropDownType === "currency" ? (
          <span className="text-[15px]">Move {text}</span>
        ) : type === "FromChain" ? (
          <span className="text-[15px]">From {text}</span>
        ) : (
          <span className="text-[15px]">To {text}</span>
        )}
      </div>
      <div className={`h-6 w-6 ${!isVisible && "hidden"}`}>
        <UilAngleDown className="h-6 w-6 font-bold text-blue-600" />
      </div>
    </DropDownContainer>
  );
};

export default Dropdown;
