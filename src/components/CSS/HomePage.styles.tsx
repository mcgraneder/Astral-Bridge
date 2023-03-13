import styled from "styled-components";
import { BREAKPOINTS } from '../theme/index';

export const colours = {
    primary: "#fff",
    theme: "#BE185D",
    light1: "#F3F4F6",
    light2: "#E5E7EB",
    dark1: "#1f2937",
    dark2: "#9CA3AF",
    red: "#DC2626",
};


export const StyledTitle = styled.div`
    font-size: ${(props: any) => props.size}px;
    text-align: ${(props: any) => props.align};

    padding: 5px;
    margin-bottom: ${(props: any) => props.margin}px;
    font-weight: ${(props: any) => props.weight};
    font-style: ${(props: any) => props.styleds};

    max-width: 800px;
    margin: 0 auto;
    background: rgb(109, 150, 254);
    background: linear-gradient(5deg, #7843b9 0%, rgb(130, 116, 242) 44%, rgba(236, 242, 255, 1) 100%);
    /* background-image: linear-gradient(43deg, #4158d0 0%, #c850c0 46%, #ffcc70 100%); */
    -webkit-background-clip: text;
    color: transparent;

    @media screen and (max-width: ${BREAKPOINTS.md}px) {
        font-size: 45px;
        max-width: 600px;
    }

    @media screen and (max-width: ${BREAKPOINTS.sm}px) {
        font-size: 28px;
        max-width: 600px;
    }
`;
export const StyledSubTitle = styled.div`
    font-size: ${(props: any) => props.size}px;
    text-align: center;
    color: ${(props: any) => (props.color ? props.color : colours.primary)};
    font-weight: ${(props: any) => props.weight};
    padding: 5px;
    margin-bottom: 20px;
    background-color: transparent;
    margin: 0 auto;

    @media screen and (max-width: ${BREAKPOINTS.md}px) {
        font-size: 19px;
    }

    @media screen and (max-width: ${BREAKPOINTS.sm}px) {
        font-size: 16px;
        max-width: 300px;
    }
`;
export const Wrapper = styled.div`

    //@ts-ignore
    /* height ${(props: any) => props.space}px; */
`;


export const StyledContainer = styled.div`
    margin: 0;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    background: transparent;
`;