import React from "react";
// import ReactList from "react-list";
import HTMLFlipBook from "react-pageflip";
import stories from "../utils/stories.json";
import { PoemDetails, PoemImage } from "./PoemCard";
import "./PoemList.css";

function useInterval(...args: Parameters<typeof setInterval>) {
  React.useEffect(() => {
    const intervalId = setInterval(...args);
    return () => clearInterval(intervalId);
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

  const openPageNumber = React.useMemo(
    () =>
      Math.max(
        0,
        poemEntries.findIndex(([title]) => pageHash.endsWith(title)) * 2
      ),
    [pageHash, poemEntries]
  );

  const pages = React.useMemo(() => {
    return Array(poemEntries.length * 2)
      .fill(null)
      .map((_, i) => {
        const entryIndex = Math.floor(i / 2);
        const [title, date] = poemEntries[entryIndex];
        const entryProps = { date, key: `${title}-${i}`, title };
        if (i % 2) {
          return <PoemDetails open={true} {...entryProps} />;
        } else {
          return <PoemImage {...entryProps} />;
        }
      });
  }, [poemEntries]);

  const onFlip = React.useCallback(
    (flipEvent: { data: number }) => {
      document.location.hash = poemEntries[Math.floor(flipEvent.data / 2)][0];
    },
    [poemEntries]
  );

  const onChangeState = React.useCallback(
    (flipEvent: { data: "fold_corner" | "flipping" | "read" }) => {
      const clsSelector = ".poem-card-content";
      if (flipEvent.data === "flipping") {
        document
          .querySelectorAll(clsSelector)
          .forEach((el) => ((el as HTMLElement).style.opacity = "0"));
      } else if (flipEvent.data === "read") {
        (
          document
            .querySelector(`#${document.location.hash.replaceAll("#", "")}`)
            ?.querySelector(clsSelector) as HTMLElement | undefined
        )?.style.setProperty("opacity", "1");
      }
    },
    []
  );

  const bookRef = React.useRef<any>();

  React.useEffect(() => {
    bookRef.current?.pageFlip()?.turnToPage(openPageNumber);
    onChangeState({ data: "read" });
  }, [onChangeState, onFlip, openPageNumber]);

  const minPageSizePx = 300;

  return (
    // @ts-expect-error
    <HTMLFlipBook
      ref={bookRef}
      width={Math.max(minPageSizePx, window.screen.width / 4)}
      height={Math.max(minPageSizePx, window.screen.height / 2)}
      className="poem-list"
      style={PoemList.wrapperStyles}
      children={pages}
      startPage={openPageNumber}
      drawShadow={false}
      size={"fixed"}
      autoSize={true}
      onFlip={onFlip}
      onChangeState={onChangeState}
    ></HTMLFlipBook>
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
