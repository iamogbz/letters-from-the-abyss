import React from "react";
import stories from "../utils/stories.json";
import PoemCard from "./PoemCard";

function PoemList() {
  const poemsEls = React.useMemo(() => {
    const poemEntries = Object.entries(stories.data.published);
    return poemEntries.map(([title, date]) => {
      return <PoemCard key={title} title={title} date={date} />;
    });
  }, []);
  return (
    <div className="poem-list" style={PoemList.wrapperStyles}>
      {poemsEls}
    </div>
  );
}

PoemList.wrapperStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: 'center',
  justifyContent: 'center',
  gap: "min(10vw, 10vh)",
  get padding() {
    return this.gap;
  },
  zIndex: 1,
} as React.CSSProperties;

export default PoemList;
