import styled from "styled-components";
import { BREAKPOINTS } from "../../../theme";
import meshSrc from "../../../../../public/images/Mesh.png";
import Image from "next/image";
import GreenDot from "../../../Icons/GreenDot";

const DARK_MODE_GRADIENT =
  "radial-gradient(101.8% 4091.31% at 0% 0%, #42e081 0%, #9646FA 100%)";

const Banner = styled.div<{ isDarkMode: boolean }>`
  border-radius: 10px;
  margin-top: 15px;
  margin-bottom: 10px;
  margin-left: 3px;
  margin-right: 3px;
  position: relative;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;

  box-shadow: 0px 10px 24px rgba(51, 53, 72, 0.04);

  background: url(${meshSrc}), ${DARK_MODE_GRADIENT};

  /* @media screen and (min-width: ${BREAKPOINTS.lg}px) {
    height: 140px;
    flex-direction: row;
  } */
`;

const ProtocolBanner = ({ type }: { type: string }) => {
  return (
    <Banner>
      <Image alt="" src={meshSrc} className="absolute" />
      <div className="flex items-center">
        <span>Gas Setting</span>
      </div>
      <div className="flex items-center justify-center gap-2">
        <GreenDot/>
        <span>{type}</span>
      </div>
    </Banner>
  );
};

export default ProtocolBanner;
