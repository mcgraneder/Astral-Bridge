import styled, { keyframes } from "styled-components"

const fadein = keyframes `
    0% {
    // margin-top: 2000px;
    opacity:0;
    }
    100% {
    // margin-top: 0;
    opacity:1;
    }
`

const fadeout = keyframes `
    0% {
    // margin-top: 1500px;
    }
    100% {
    // margin-bottom: 0;
    }
`

export const LoginStyledContainer = styled.div`

    padding-top: 75px;
    padding-bottom: 100px;
    

`

export const TopeSectionWrapper = styled.div`
    animation: ${fadein} 1.25s; 
    
    
`
export const BottomSectionWrapper = styled.div`
    animation:  ${fadeout} 2.2s; ; 
`