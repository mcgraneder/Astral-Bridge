import { useState, useEffect, useCallback } from "react";
import { useWeb3React } from '@web3-react/core';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Update debounced value after delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cancel the timeout if value changes (also on delay change or unmount)
    // This is how we prevent debounced value from updating if value is changed ...
    // .. within the delay period. Timeout gets cleared and restarted.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

function useBlockNumber() {
  const { chainId, library: provider } = useWeb3React();
  const [state, setState] = useState<{ chainId?: number | null; block?: number }>({ chainId });

  const onBlock = useCallback(
    (block: number) => {
      setState((state) => {
        if (state.chainId === chainId) {
          if (typeof state.block !== "number") return { chainId, block };
          return { chainId, block: Math.max(block, state.block) };
        }
        return state;
      });
    },
    [chainId]
  );

  useEffect(() => {
    if (provider && chainId) {
      setState({ chainId });

      provider
        .getBlockNumber()
        .then(onBlock)
        .catch((error: any) => {
          console.error(`Failed to get block number for chainId ${chainId}`, error);
        });

      provider.on("block", onBlock);
      return () => {
        provider.removeListener("block", onBlock);
      };
    }
    return undefined;
  }, [chainId, provider, onBlock]);

  const debouncedBlock = useDebounce(state.block, 100);
  return state.block ? debouncedBlock : undefined;
}

export default useBlockNumber;
