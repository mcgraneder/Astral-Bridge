import { useCallback, useEffect, useState } from "react";

import { copyText } from "../utils/misc";

export default function useCopy(
  timeout = 500
): [boolean, (toCopy: string) => void] {
  const [isCopied, setIsCopied] = useState(false);

  const staticCopy = useCallback((text: string) => {
    copyText(text);
    setIsCopied(true);
  }, []);

  useEffect(() => {
    if (isCopied) {
      const hide = setTimeout(() => {
        setIsCopied(false);
      }, timeout);

      return () => {
        clearTimeout(hide);
      };
    }
    return undefined;
  }, [isCopied, setIsCopied, timeout]);

  return [isCopied, staticCopy];
}
