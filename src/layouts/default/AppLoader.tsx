import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReactTyped from "../../components/Typewriter/Typewriter";

export const Backdrop = styled.div`
  position: fixed;
  height: 100vh;
  width: 100%;
  opacity: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  backdrop-filter: blur(5px);
  z-index: 10000000000;
  pointer-events: none;
  /* background: rgba(2, 8, 26); */
`;

const AppLoader = () => {
  return (
    <Backdrop>
      <div className="flex flex-col items-center justify-center gap-2">
        <ReactTyped
          className=" text-[55px] font-bold text-white"
          strings={["Astral Bridge."]}
          typingSpeed={100}
          backSpeed={100}
          loop
        />
        <div id="root">
          <div className="loader">
            <div className="lds-ellipsis">
              <div />
              <div />
              <div />
              <div />
              <div />
            </div>
          </div>
        </div>
      </div>
    </Backdrop>
  );
};

export default AppLoader;
