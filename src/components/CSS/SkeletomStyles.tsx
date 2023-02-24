import styled, { css, keyframes } from "styled-components";

export const loadingAnimation = keyframes`
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;



export const LoadingBubble = styled.div`
  border-radius: 12px;
  height: 24px;
  width: 50%;
  animation: ${loadingAnimation} 1.5s infinite;
  animation-fill-mode: both;
  background: linear-gradient(
    to left,
    rgb(15, 25, 55) 25%,
    rgb(7, 13, 31) 50%,
    rgb(15, 25, 55) 75%
  );
  will-change: background-position;
  background-size: 400%;
`;

export const GlowingText = styled.span`
  font-size: 35px;
  animation-fill-mode: both;
  background: ${(props: any) =>
    props.loading
      ? `linear-gradient(
    to left,
    rgb(98, 107, 128) 25%,
    rgb(255, 255, 255) 50%,
    rgb(98, 107, 128) 75%
  )`
      : "white"};
  will-change: background-position;
  background-size: 400%;
  -webkit-background-clip: text;
  color: transparent;

  ${(props: any) =>
    props.loading &&
    css`
      animation: ${loadingAnimation} 1s infinite;
    `}
`;
