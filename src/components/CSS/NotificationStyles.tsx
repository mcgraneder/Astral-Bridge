import styled, { keyframes } from "styled-components";

const opneRight = keyframes` 
    0% {
        right: -150%;
    }
    100% {
        right: 0%;
    }
`;
const openLeft = keyframes` 
    0% {
        right: 0%;
    }
    100% {
        right: -150%;
    }
`;

const NotificationContainerStyled = styled.div`
  position: fixed;
  z-index: 30;
  right: 0;
  top: 75px;
`;

const IconWrapperStyled = styled.div`
  align-items: center;
  border-radius: 100%;
  display: flex;
  height: 70px;
  justify-content: center;
  align-items: center;
  width: 60px;
`;

const TextContentStyled = styled.div`
  display: flex;
  margin-left: 10px;
  width: 100%;
  flex-wrap: wrap;
`;

const SpanStyled = styled.span`
  color: grey;
  display: inline-block;
  word-break: break-word;
  font-size: 15px;
  color: rgb(23, 104, 219);
`;

const TitleStyled = styled.h5`
  display: inline-block;
  font-weight: bold;
  // line-height: 24px;
  color: White;
  font-size: 15px;
  margin: 0;
  word-break: break-word;
  padding-bottom: 5px;
`;

const CloseWrapperStyled = styled.div`
  cursor: pointer;
  position: absolute;
  right: 16px;
  top: 16px;
`;

const BarStyled = styled.div`
  background-color: ${(props) => props.colour};
  bottom: 0;
  height: 3.5px;
  left: 0;
  position: absolute;
  width: 280px;
`;

const NotificationStyled = styled.div`
  font-family: "Open Sans", sans-serif;

  animation-fill-mode: forwards;
  background-color: rgb(7, 10, 29);
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(48, 71, 105, 0.1);
  color: grey;
  display: flex;
  margin: 18px;
  padding: 16px 48px 16px 6px;
  position: relative;
  width: 280px;
  overflow: hidden;
  z-index: 9999;

  animation: ${(props) => (!props.isClosing ? opneRight : openLeft)} 1s;
`;

const NotificationStyles = {
  CloseWrapperStyled,
  IconWrapperStyled,
  NotificationStyled,
  SpanStyled,
  TextContentStyled,
  TitleStyled,
  NotificationContainerStyled,
  BarStyled,
};

export default NotificationStyles;
