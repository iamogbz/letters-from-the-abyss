import React from "react";
export function useScript({ url }: { url: string }) {
  React.useMemo(() => {
    const existingScriptEl = document.getElementById(url);
    if (!existingScriptEl) {
      const scriptEl = document.createElement("script");
      scriptEl.setAttribute("id", url);
      scriptEl.src = url;
      document.body.appendChild(scriptEl);
    }
  }, [url]);
}
