import React from "react";
import stories from "../utils/stories.json";
import PoemCard from "./PoemCard";

function useInterval(...args: Parameters<typeof setInterval>) {
  React.useEffect(() => {
    const intervalId = setInterval(...args);
    const cleanup = () => clearInterval(intervalId);
    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...args]);
}

function useValue<T>(query: () => T): T {
  const [v, setV] = React.useState<T>(query);
  useInterval(() => setV(query()));
  return v;
}

function PoemList() {
  const pageHash = useValue(() => document.location.hash);
  const poemsEls = React.useMemo(() => {
    // sort poems by date
    const poemEntries = Object.entries(stories.data.published).sort((a, b) => {
      return a[1].localeCompare(b[1]);
    });
    return poemEntries.map(([title, date]) => {
      return (
        <PoemCard
          key={title}
          title={title}
          date={date}
          open={pageHash.endsWith(title)}
        />
      );
    });
  }, [pageHash]);
  return (
    <div className="poem-list" style={PoemList.wrapperStyles}>
      {poemsEls}
    </div>
  );
}

PoemList.wrapperStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "min(10vw, 10vh)",
  get padding() {
    return this.gap;
  },
  position: "relative",
  zIndex: 1,
} as React.CSSProperties;

export default PoemList;
