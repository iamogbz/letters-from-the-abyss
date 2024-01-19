import React from "react";
import ReactList from "react-list";
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
  const poemEntries = React.useMemo(() => {
    // sort poems by date
    return Object.entries(stories.data.published).sort((a, b) => {
      return a[1].localeCompare(b[1]);
    });
  }, []);
  const renderItem = React.useCallback<ReactListX.ItemRenderer>(
    (i, k) => {
      const [title, date] = poemEntries[i];
      return (
        <PoemCard
          key={k}
          title={title}
          date={date}
          open={true || pageHash.endsWith(title)}
        />
      );
    },
    [pageHash, poemEntries]
  );
  const getItemSize = React.useCallback<ReactListX.ItemSizeGetter>(
    (i) => {
      const [title] = poemEntries[i];
      return document.getElementById(title)?.getClientRects()[0]?.height ?? 100;
    },
    [poemEntries]
  );
  return (
    <div className="poem-list" style={PoemList.wrapperStyles}>
      <ReactList
        itemRenderer={renderItem}
        itemSizeGetter={getItemSize}
        length={poemEntries.length}
        threshold={2000}
        minSize={200}
        type="variable"
        useTranslate3d={true}
      />
    </div>
  );
}

PoemList.wrapperStyles = {
  // display: "flex",
  // flexDirection: "column",
  // alignItems: "center",
  // justifyContent: "center",
  get padding() {
    return this.gap;
  },
  // position: "relative",
  zIndex: 1,
} as React.CSSProperties;

export default PoemList;
