import React from "react";
import { useScript } from "./hooks/useScript";

function Doodle({ children, ...props }: React.HTMLProps<HTMLDivElement>) {
  useScript({
    url: "https://cdnjs.cloudflare.com/ajax/libs/css-doodle/0.38.3/css-doodle.min.js",
  });
  const el = React.useMemo(
    () => React.createElement("css-doodle", props, children),
    [children, props]
  );
  return el;
}

export default Doodle;
