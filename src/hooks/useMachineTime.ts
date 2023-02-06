import { useEffect, useRef, useState } from "react";

export function useInterval(callback: () => void, delay: null | number, leading = true) {
  const savedCallback = useRef<() => void>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      const { current } = savedCallback;
      current && current();
    }

    if (delay !== null) {
      if (leading) tick();
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
    return;
  }, [delay, leading]);
}

const useMachineTimeMs = (updateInterval: number): number => {
  const [now, setNow] = useState(Date.now());

  useInterval(() => {
    setNow(Date.now());
  }, updateInterval);
  return now;
};

export default useMachineTimeMs;
