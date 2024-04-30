import React from "react";

/**
 * Hook to use javascript native `setInterval` methods.
 * Clears any set interval on destruction.
 * @param args set interval arguments
 */
export function useInterval(...args: Parameters<typeof setInterval>) {
  React.useEffect(() => {
    const intervalId = setInterval(...args);
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...args]);
}
