import React, { useState } from "react";
import { useScript } from "./hooks/useScript";

function Doodle({ children, ...props }: React.HTMLProps<HTMLDivElement>) {
  useScript({
    url: "https://cdnjs.cloudflare.com/ajax/libs/css-doodle/0.38.3/css-doodle.min.js",
  });
  const [opacity, setOpacity] = useState(0)

  const el = React.useMemo(
    () => React.createElement("css-doodle", {...props, style: {...props.style, opacity, transition: 'opacity 0s ease-in-out 0s' }}, `${children}`, children),
    [children, opacity, props]
  );
  setTimeout(() => setOpacity(1))
  return el;
}

export default Doodle;
