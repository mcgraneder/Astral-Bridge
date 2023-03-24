import styled from "styled-components";

export const FormWrapper = styled.div`
    position: fixed;
    top: 20%;
    width: 420px;
    height: 530px;
    background: rgb(13, 17, 28);
    text-align: right;
    // padding: 10px 35px;
    border-radius: 20px;
`;

export const BridgeModalContainer = styled.div`
    max-width: 490px;
    color: White;
    background: rgb(13, 17, 28);
    text-align: right;
    border: 1px solid rgb(60, 65, 80);
    border-radius: 20px;
    box-shadow: 0px 10px 150px 5px rgba(75, 135, 220, 0.03);
    margin: 30px auto 0;
    position: relative;
    margin-top: 30px;
    // max-width: 400px;
    transition: height 3s ease-out;
`;
export const BridgeModalWrapper = styled.div`
  // width: 100%;
  height: 100%;
  padding: 10px 10px;
  // border: 1px solid  rgb(37, 46, 63);
  border-top: none;
  // border-radius: 10px;
`;

export const ChainSelector = styled.div`
  margin-top: 10px;
  margin-bottom: ${(props: any) => props.marginbottom};
  margin-left: 10px;
  margin-right: 10px;
  // padding: 3px;
  height: 40px;
  // width: 100%;
  background: rgb(36,39,54);
  border: 2px solid rgb(34, 43, 68);
  border-radius: 10px;

  // font-family: 'Open Sans', sans-serif;

  &:hover {
    background: rgb(34, 43, 68);
    // border: 0.5px solid rgb(13,94,209);
    cursor: pointer;
  }
`;

export const ChainSelectorWrapper = styled.div`
  // height: 100%;
  // width: 100%;
  display: flex;
  padding-left: 5px;
  padding-right: 5px;
`;

export const ChainSelectorIconWrapper = styled.div`
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ChainSelectorIcon = styled.img`
  display: flex;
  justify-content: left;
  align-items: center;
  width: ${(props: any) => props.width};
  height: ${(props: any) => props.width};
  line-height: 20px;
  border-radius: 50%;

  // float: left;
`;
export const ChainSelectorTextWrapper = styled.div`
  display: flex;
  height: 40px;
  // text-align: center;
  justify-content: left;
  align-items: center;
  line-height: 20px;
`;

export const ChainSelectorText = styled.div`
  font-size: 15px;
  padding-left: 10px;
`;

export const DropdownContainer = styled.div`
  display: flex;
  height: 40px;
  width: 40px;
  position: absolute;
  right: 5%;
  align-items: center;
  justify-content: center;
`;
export const BalanceContainer = styled.div`

    margin-top: 10px;
    margin-bottom: 30px;
    margin-left: 10px;
    margin-right: 10px;
    // padding: 3px;
    // height: 60px;
    // width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transaprent;
    border: 1px solid rgb(34,43,68);
    border-radius: 10px;
`;

export const MintFormWrapper = styled.div`
  height: 100%;
  width: 100%;
  padding-top: 10px;
  padding-bottom: ${(props: any) => props.paddingBottom};
  // display: inline;
  // display: flex;
  // margin-left: 5px;
  // margin-right: 5px;
`;

export const MintFormContainer = styled.div`
  margin-top: 20px;
  padding-bottom: 20px;
  margin-bottom: 20px;
  margin-left: 10px;
  margin-right: 10px;
  // padding: 3px;
  height: 100%;
  // width: 100%;
  background: rgb(36,39,54);
  border: 1px solid rgb(34, 43, 68);
  border-radius: 10px;
`;

export const BalanceWrapper = styled.div`
  // height: 100%;
  // width: 100%;
  line-height: 45px;
  text-align: center;
  // display: flex;
  // padding-left: 25px;
  // padding-right: 5px;
  padding-top: 25px;
  padding-bottom: 10px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  // padding-left: 20px;
  // padding-right: 20px;
  width: ${(props: any) => props.width};
`;

export const MintFormmWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  padding-left: 5px;
  padding-right: 5px;
`;

export const MintFormIconWrapper = styled.div`
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MintFormIcon = styled.img`
  display: flex;
  justify-content: left;
  align-items: center;
  width: ${(props: any) => props.width};
  height: ${(props: any) => props.width};
  line-height: 30px;

  // float: left;
`;
export const MintFormTextWrapper = styled.div`
  display: flex;
  height: 50px;
  // text-align: center;
  justify-content: left;
  align-items: center;
  line-height: 50px;
`;

export const MintFormText = styled.div`
  // font-family: 'Open Sans', sans-serif;

  font-size: 15px;
  padding-left: 10px;
`;

export const StyledContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  // background: rgb(0,47,65);
  // background: radial-gradient(circle, rgba(0,47,65,1) 0%, rgba(10,28,61,1) 46%, rgba(0,7,31,1) 89%);
`;

export const MinFormToggleButtonContainer = styled.div`
  height: 40px;
  // width: 100%;
  display: flex;
  margin-bottom: ${(props: any) => props.marginB};
  background: rgb(36,39,54);
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
      props.active ? "rgb(13, 17, 28)" : "rgb(36,39,54)"};
    font-size: 18px;
    font-weight: bold;
    // font-family: 'Open Sans', sans-serif;
    border: 1px solid ${(props: any) =>
      props.active ? "rgb(75,135,220)" : "rgb(36,39,54)"};
    // border-bottom: 1.5px solid rgb(75,135,220);
    color: ${(props: any) => (props.active ? "rgb(75,135,220)" : "rgb(77,82,102)")};
    &:hover {

        cursor: pointer
    }

`;
export const ReleaseToggleButton = styled.div`

   
    width: 50%;
    height: 100%;
    border-top-${(props: any) => props.side}-radius: 10px;
    border-right: 1.5px solid rgb(13, 17, 28);
    background: ${(props: any) =>
      !props.active ? "rgb(13, 17, 28)" : "rgb(36,39,54)"};
    font-size: 18px;
    font-weight: bold;
    font-family: 'Open Sans', sans-serif;
    border: 1px solid ${(props: any) =>
      !props.active ? "rgb(75,135,220)" : "rgb(36,39,54)"};
    // border-bottom: 1.5px solid rgb(75,135,220);
    color: ${(props: any) => (!props.active ? "rgb(75,135,220)" : "rgb(77,82,102)")};

    &:hover {

        cursor: pointer
    }

`;

export const MintFormTextWrapper2 = styled.div`
  display: flex;
  height: 100%;
  // text-align: center;
  justify-content: center;
  align-items: center;
`;

export const MintFormText2 = styled.div`
  font-size: 17px;
  padding-left: 10px;
`;
export const DropdownContainer2 = styled.div`
  display: flex;
  height: 50px;
  width: 40px;
  position: absolute;
  right: 9%;
  align-items: center;
  justify-content: center;
`;

export const ArrowContainer = styled.div`
  width: 100%;
  height: 100%;
  // padding: 5px;
`;
export const ArrowLogoContainer = styled.div`
  width: 25px;
  height: 100%;
  // padding: 5px;
  margin: 0 auto;
  background: rgb(36,39,54);
  border-radius: 10px;
  line-height: 15px;
  // border: 0.2px solid rgb(75,135,220);
`;

export const ArrowLogo = styled.img`
  // display: flex;
  // justify-content: center;
  // align-items: center;

  text-align: center;
  display: inline;
  width: 25px;
  height: 25px;

  // float: left;
`;

export const ArrowContainer12 = styled.div`
  position: absolute;
  top: 10.5%;
  left: 0;
  width: 100%;
  height: 25px;

  // padding: 5px;
`;
export const ArrowLogoContainer12 = styled.div`
  width: 25px;
  margin: 0 auto;
  background: rgb(36,39,54);
  border-radius: 10px;
  border-left: 2px solid rgb(34, 43, 68);
  border-right: 2px solid rgb(34, 43, 68);
  // border: 0.2px solid rgb(75,135,220);
`;

export const ArrowLogo12 = styled.img`
  display: inline;
  width: 25px;
  height: 25px;

  // float: left;
`;

export const Balancetext = styled.div`
  font-family: "SuisseIntl", "Helvetica", "Arial", sans-serif;
  font-size: ${(props: any) => props.size};
  text-align: center;
  font-weight: 100;
  color: ${(props: any) => props.colour};
`;
