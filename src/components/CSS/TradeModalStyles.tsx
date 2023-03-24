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
    position: absolute;
    top: 16%;
    width: 440px;
    // height: 260px;
    background: rgb(13, 17, 28);
    text-align: right;
    padding: 10px 10px;
    border: 1px solid rgb(60, 65, 80);
    border-radius: 25px;
    // -webkit-box-shadow: -2px -1px 15px 7px rgba(255,0,0,0.5);
    // -moz-box-shadow: -3px -2px 30px 14px rgba(255,0,0,0.425);
    // box-shadow: -4px -3px 45px 21px rgba(255,0,0,0.35);
    box-shadow: 0px 10px 150px 5px rgba(75, 135, 220, 0.03);
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
