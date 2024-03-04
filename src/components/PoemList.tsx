import React from "react";
// import ReactList from "react-list";
import HTMLFlipBook from "react-pageflip";
import stories from "../utils/stories.json";
import { PoemCard, PoemDetails, PoemImage } from "./PoemCard";
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

function Button(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} type="button" />;
}

function CoverPage() {
  return (
    <div>
      <p>Traveller.</p>
      <p>How you got here only you, and your stalkers, know.</p>
      <p>
        But while you are here, indulge me a moment and flip through my letters,
        written to myself, from a dark place with hope for a brighter future.
      </p>
      <p>If you like any of them do not hesitate to share.</p>
      <p>See you all again at the finale ❤️</p>
    </div>
  );
}
CoverPage.title = "welcome";

function CreditsPage() {
  return (
    <div>
      <p>Well that was... something.</p>
      <p>And look at us, here, at the end of this little book.</p>
      <p>
        If you want more ravings then shoot me message at{" "}
        <a href="mailto:iamogbz+letters@gmail.com?subject=Letter to the Abyss">here</a>
      </p>
      <p>Thanks for reading</p>
    </div>
  );
}
CreditsPage.title = "credits";

function PoemList() {
  const pageHash = useValue(() => document.location.hash);

  const poemEntries = React.useMemo(() => {
    // sort poems by date
    return Object.entries(stories.data.published).sort((a, b) => {
      return a[1].localeCompare(b[1]);
    });
  }, []);

  const pages = React.useMemo(() => {
    return [
      <div
        id={CoverPage.title}
        title={CoverPage.title}
        key={`${CoverPage.title}-0`}
      >
        <PoemCard title={CoverPage.title} lines={<CoverPage />} />
      </div>,
      ...Array(poemEntries.length * 2)
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
        }),
      <div
        id={CreditsPage.title}
        title={CreditsPage.title}
        key={`${CreditsPage.title}-0`}
      >
        <PoemCard title={CreditsPage.title} lines={<CreditsPage />} />
      </div>,
    ];
  }, [poemEntries]);

  const openPageNumber = React.useMemo(
    () =>
      Math.max(
        0,
        pages.findIndex((el) => pageHash.endsWith(el.props.title))
      ),
    [pageHash, pages]
  );

  const isOnFirstPage = openPageNumber === 0;
  const isOnLastPage = openPageNumber === pages.length - 1;

  const onFlip = React.useCallback(
    (flipEvent: { data: number }) => {
      document.location.hash = pages[flipEvent.data].props.title;
    },
    [pages]
  );

  const onChangeState = React.useCallback(
    (flipEvent: { data: "fold_corner" | "flipping" | "read" }) => {
      const clsSelector = ".poem-card-content";
      if (flipEvent.data === "flipping") {
        document
          .querySelectorAll(clsSelector)
          .forEach((el) => ((el as HTMLElement).style.opacity = "0"));
      } else if (flipEvent.data === "read") {
        const poemTitle = document.location.hash.replaceAll("#", "");
        if (!poemTitle) return;
        (
          document
            .querySelector(`#${poemTitle}`)
            ?.querySelector(clsSelector) as HTMLElement | undefined
        )?.style.setProperty("opacity", "1");
      }
    },
    []
  );

  const bookRef = React.useRef<any>();

  React.useEffect(() => {
    bookRef.current?.pageFlip()?.flip(openPageNumber);
    // onChangeState({ data: "read" });
  }, [onChangeState, onFlip, openPageNumber]);

  const goToNextPage = React.useCallback(
    () => bookRef.current?.pageFlip().flipNext(),
    []
  );
  const goToPrevPage = React.useCallback(
    () => bookRef.current?.pageFlip().flipPrev(),
    []
  );

  const minPageSizePx = 300;

  return (
    <>
      {
        // @ts-expect-error
        <HTMLFlipBook
          autoSize
          children={pages}
          drawShadow={false}
          height={Math.max(minPageSizePx, window.screen.height / 2)}
          onChangeState={onChangeState}
          onFlip={onFlip}
          ref={bookRef}
          showCover
          size={"fixed"}
          startPage={openPageNumber}
          style={PoemList.wrapperStyles}
          useMouseEvents={false}
          width={Math.max(minPageSizePx, window.screen.width / 4)}
        ></HTMLFlipBook>
      }
      <Button
        id="prev-btn"
        disabled={isOnFirstPage}
        value="Go back"
        onClick={goToPrevPage}
      />
      <Button
        id="next-btn"
        disabled={isOnLastPage}
        value="Next page"
        onClick={goToNextPage}
      />
    </>
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
