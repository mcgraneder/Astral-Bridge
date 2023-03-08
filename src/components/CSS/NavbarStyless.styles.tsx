import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
    -webkit-box-pack: justify;
    justify-content: space-between;
    position: fixed;
    top: 0px;
    z-index: 1000;
    /* background: black; */
`;

export const Nav = styled.nav`
    padding: 20px 12px;
    width: 100%;
    height: 72px;
    z-index: 2;
    box-sizing: border-box;
    display: block;
`;

export const Box = styled.div`
    box-sizing: border-box;
    vertical-align: initial;
    -webkit-tap-highlight-color: transparent;
    display: flex;
    flex-wrap: nowrap;
    height: 100%;
`;

export const BoxItemContainer = styled.div`
    box-sizing: border-box;
    vertical-align: initial;
    -webkit-tap-highlight-color: transparent;
    justify-content: ${(props: any) => props.allignment};
    display: flex;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0;
    width: 100%;
    align-items: center;
`;
