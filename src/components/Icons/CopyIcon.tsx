import { UilCheckCircle, UilClipboardNotes } from "@iconscout/react-unicons";
import React, { useEffect, useState } from "react";
import { Copy } from "react-feather"

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

    async function handleCopy(e: any): Promise<void> {
        e.stopPropagation();
        e.preventDefault();

        try {
            await navigator.clipboard.writeText(text);
            onCopy?.(text);
            setCopied(true);
        } catch (e) {}
    }

    return (
        <button className='bg-black-600 rounded-full p-[5px]' onClick={handleCopy}>
            {!copied && <Copy className='text-gray-400 h-4 w-4 ' />}
            {copied && <UilCheckCircle className='text-green-500 h-4 w-4 ' />}
        </button>
    );
}

export default CopyIcon;
