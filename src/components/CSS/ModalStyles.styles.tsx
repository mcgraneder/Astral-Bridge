import styles from "styled-components";

export const Backdrop = styled.div`
    position: fixed;
    height: 100vh;
    width: 100vw;
    opacity: 0;
    pointer-events: none;
    backdrop-filter: blur(5px);
    z-index: 1000;
    pointer-events: none;
    transition: opacity 0.15s ease-in-out !important;
    position: relative;
    ${(props: any) =>
        props.visible &&
        css`
            opacity: 1;
            pointer-events: all;
        `}
`;

export const FormWrapper = styled.div`
    position: fixed;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -50%);
    width: 430px;
    background-color: rgb(15, 25, 55);
    text-align: right;
    padding: 30px 15px;
    padding-bottom: 20px;
    border: 1.5px solid rgb(48, 63, 88);
    border-radius: 15px;
    display: block;
    z-index: 10000000000;
`;

export const ChainSelectWrapper = styled.div`
    position: fixed;
    left: 73.5%;
    top: 18.5%;
    transform: translate(-50%, -50%);
    width: 300px;
    background-color: rgb(15, 25, 55);
    text-align: right;
    padding: 10px;
    padding-bottom: 20px;
    border: 1.5px solid rgb(48, 63, 88);
    border-radius: 15px;
    display: block;
    z-index: 10000000000;
`;
