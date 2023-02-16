import { UilCheckCircle, UilCopy } from "@iconscout/react-unicons";
import React from "react";

import useCopy from "../../hooks/useCopy";

export default function CopyHelper(props: {
  toCopy: string;
  children?: React.ReactNode;
}) {
  const [isCopied, setCopied] = useCopy();

  return (
    <div
      className="  mr-2 flex items-center justify-center gap-1 hover:cursor-pointer hover:text-white"
      onClick={() => setCopied(props.toCopy)}
    >
      {isCopied ? (
        <div className="flex gap-1">
          <UilCheckCircle color={"#a3a3a3"} size={"20"} />
          <div>
            <div className="text-grey-400">{"Copied"}</div>
          </div>
        </div>
      ) : (
        <div className="">
          <UilCopy color={"#a3a3a3"} size={"20"} />
        </div>
      )}
      {isCopied ? "" : props.children}
    </div>
  );
}
