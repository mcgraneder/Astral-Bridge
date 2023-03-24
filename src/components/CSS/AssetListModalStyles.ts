import styled, { CSS } from "styled-components"

export const FormWrapper = styled.div`
    position: fixed;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -50%);
    width: 430px;
    background-color: rgb(13, 17, 28);
    text-align: right;
    /* padding: 30px 25px; */
    /* padding-bottom: 20px; */
    border: 1.5px solid rgb(60, 65, 80);
    border-radius: 15px;
    display: block;
    z-index: 10000000000;
    color: white;
    box-shadow: 14px 19px 5px 0px rgba(0, 0, 0, 0.85);
`;

export const TokenInputContainer = styled.div`

    width: 100%;
    display: flex;
    padding: 0px;
    padding-top: 10px;
    padding-bottom: 10px;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: start;
    justify-content: flex-start;
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
`

export const TokenInput = styled.input`

    position: relative;
    display: flex;
    padding: 8px 25px;
    -webkit-box-align: center;
    align-items: center;
    width: 100%;
    white-space: nowrap;
    background: transparent; //rgb(17, 25, 42);
    outline: none;
    border-radius: 12px;
    color: rgb(255, 255, 255);
    border: 1px solid rgb(64, 68, 79);
    appearance: none;
    font-size: 18px;
    transition: border 100ms ease 0s;
    

    &:focus {

        border: 1px solid rgb(89,115,254);
    }

`