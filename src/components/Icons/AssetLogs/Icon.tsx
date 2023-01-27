import React from "react";
import { Icons as AssetIcons } from "./assets/index";
import { Icons as ChainIcons } from "./chains/index";

interface Props {
  chainName: string;
  white?: boolean;
}

export const Icon: React.FC<
  Props &
    (React.SVGProps<SVGSVGElement> &
      React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>)
> = ({ chainName, white, className, ...props }) => {
  const Icon = ChainIcons[chainName] || AssetIcons[chainName];
  return <>{Icon && <Icon className={className} {...props} />}</>
};
