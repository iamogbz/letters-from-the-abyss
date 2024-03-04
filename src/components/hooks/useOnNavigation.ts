import React from "react";

export function useOnNavigation({
  callback,
}: {
  callback: (...params: unknown[]) => void;
}) {
  React.useEffect(() => {
    window.addEventListener("pageshow", callback);
    window.addEventListener("popstate", callback);
    return () => {
      window.removeEventListener("pageshow", callback);
      window.removeEventListener("popstate", callback);
    };
  }, [callback]);
}
