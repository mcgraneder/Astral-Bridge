import styled from "styled-components";

export const MintFormmWrapper = styled.div`
    // height: 100%;
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
    font-family: "SuisseIntl", "Helvetica", "Arial", sans-serif;

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
    margin-bottom: 25px;
    background: rgb(15, 25, 55);
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
    font-size: 18px;
    font-weight: bold;
    // font-family: 'Open Sans', sans-serif;
    border: 1px solid ${(props: any) =>
        props.active ? 'rgb(75,135,220)' : 'rgb(36,39,54)'};
    // border-bottom: 1.5px solid rgb(75,135,220);
    color: ${(props: any) => (props.active ? 'rgb(75,135,220)' : 'White')};
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
        !props.active ? 'rgb(13, 17, 28)' : 'rgb(36,39,54)'};
    font-size: 18px;
    font-weight: bold;
    font-family: 'Open Sans', sans-serif;
    border: 1px solid ${(props: any) =>
        !props.active ? 'rgb(75,135,220)' : 'rgb(36,39,54)'};
    // border-bottom: 1.5px solid rgb(75,135,220);
    color: ${(props: any) => (!props.active ? 'rgb(75,135,220)' : 'White')};

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
    font-family: "SuisseIntl", "Helvetica", "Arial", sans-serif;
    font-size: 17px;
    padding-left: 10px;
`;

export const FromContainer = styled.form`
    margin-left: 20px;
    margin-right: 20px;
    // padding: 3px;
    height: 50px;
    // width: 100%;
    background: rgb(13, 17, 28);
    border: 1px solid rgb(60, 65, 80);
    border-radius: 10px;
    -webkit-appearance: none;
    input[type='number']::-webkit-inner-spin-button,
    input[type='number']::-webkit-outer-spin-button {
        -webkit-appearance: none;
    }
`;

export const WalletInputWrapper = styled.div`
    height: 100%;
    // width: 100%;
    line-height: 50px;
    display: flex;
    /* align-items: center;
    justify-content: center; */
    border: none;
    -webkit-appearance: none;
    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
    }

    // border: 3px solid rgb(34,43,68);

    // padding-left: 50px;
    // padding-right: 15px;
`;

export const WalletInput = styled.input`
    width: 100%;
    background: transparent;
    border: none;
    color: white;
    padding-left: 20px;
    border-radius: 10px;
    padding-left: 60px;
    padding-right: 60px;
    font-size: 14px;
    font-family: "SuisseIntl", "Helvetica", "Arial", sans-serif;
    // border: 3px solid: blue;
    -webkit-appearance: none;
    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
    }

    &:focus {
        border: 1px solid rgb(59, 130, 246);
    }
`;

export const Dropdown = styled.div`
    position: absolute;
    top: ${(props: any) => props.height};
    left: 4%;
    border-radius: 10px;
    width: 455px;
    background: rgb(13, 17, 28);
    border: 1px solid rgb(75, 135, 220);
`;

export const SpinnerWrapper = styled.div`
    // height: 140px;
    // width: 100%;

    margin-bottom: 20px;
    margin-left: 30px;
    margin-right: 30px;
    // padding: 3px;
    // height: 50px;
    // width: 100%;
    background: rgb(13, 17, 28);
    border: 3px solid rgb(34, 43, 68);
    border-radius: 10px;
    // padding: 15px;
    padding-left: 15px;
    padding-right: 15px;
    padding-bottom: 15px;
    padding-top: 5px;
    transition: height 0.3s ease-in-out;
`;

export const StatusTextWrapper = styled.div`
    width: 100%;
    height: 20px;
    display: flex;
    // align-items: left;
    // justify-content: center;
    // background: White;
    margin-top: 10px;
    margin-bottom: ${(props: any) => props.marginB};
    padding-left: 10px;
`;

export const StatustTextIcon = styled.img`
    width: 20px;
    height: 20px;
    display: flex;
`;

export const StatusText = styled.div`
    font-family: "SuisseIntl", "Helvetica", "Arial", sans-serif;
    height: 20px;
    display: flex;
    font-size: 15px;
    color: White;
    line-height: 20px;
    padding-left: 20px;
    // font-weight: bold;
    // padding-right: 100px;
`;

export const CompletionTextWrapper = styled.div`
    width: 100%;
    height: 20px;
    background: White;
`;

export const CompletionTextContainer = styled.div`
    font-family: "SuisseIntl", "Helvetica", "Arial", sans-serif;
    display: flex;
    // height: 100%;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    height: 20px;
    padding-top: 25px;
    color: White;
    font-size: 17px;
    // font-weight: bold;
`;

export const LoaderContainer = styled.div`
    position: absolute;
    width: 20px;
    height: 20px;
    right: 15%;

    // display: flex;
`;

export const MaxOption = styled.div`
    position: absolute;
    font-family: "SuisseIntl", "Helvetica", "Arial", sans-serif;
    height: 30px;
    width: 50px;
    left: 77%;
    background: transparent;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 10px;
    color: rgb(75, 135, 220);
    font-size: 15px;
    font-weight: bold;

    &:hover {
        cursor: pointer;
        font-size: 15.5px;
        color: rgb(95, 155, 240);
    }
`;

export const ForumIcon = styled.div`
    position: absolute;
    font-family: "SuisseIntl", "Helvetica", "Arial", sans-serif;

    margin-top: 3px;
    // padding-bottom: 10px;
    width: 25px;
    left: 15%;
    // left: 78%;
    // background: White;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 8px;
    color: rgb(75, 135, 220);
    font-size: 15px;
    font-weight: bold;
`;

export const ForumImg = styled.img`
    width: 28px;
    height: 28px;
`;
