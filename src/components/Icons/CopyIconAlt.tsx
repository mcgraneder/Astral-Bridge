import { UilCheckCircle, UilClipboardNotes } from "@iconscout/react-unicons";
import React, { useEffect, useState } from "react";

interface CopyIconProps {
  text: string;
  onCopy?: (text: string) => void;
}

function CopyIcon({ text, onCopy }: CopyIconProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (copied) timer = setTimeout(() => setCopied(false), 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [copied]);

  async function handleCopy(e: any) {
    e.stopPropagation();
    e.preventDefault();

    try {
      await navigator.clipboard.writeText(text);
      onCopy?.(text);
      setCopied(true);
    } catch (e) {}
  }

  return (
    <button className="bg-black-600 rounded-full p-[5px]" onClick={handleCopy}>
      {!copied && <UilClipboardNotes className="text-grey-400 h-3 w-3 " />}
      {copied && <UilCheckCircle className="text-primary h-3 w-3 " />}
    </button>
  );
}

export default CopyIcon;
