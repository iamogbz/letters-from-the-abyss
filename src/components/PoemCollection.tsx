import React from "react";
// import ReactList from "react-list";
import stories from "../utils/stories.json";
import { PoemDetails, PoemImage } from "./PoemCard";
import "./PoemCollection.css";
import { useOnNavigation } from "./hooks/useOnNavigation";
import { isPageLocallyLiked, logPoemLike } from "../utils/hitCounter";
import { sharePoem } from "../utils/share";
import { useValue } from "./hooks/useValue";

function Button(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} type="button" />;
}

function PoemCollection() {
  const pageHash = useValue(() => document.location.hash);

  const poemEntries = React.useMemo(() => {
    // sort poems by date
    return Object.entries(stories.data.published).sort((a, b) => {
      return a[1].localeCompare(b[1]);
    });
  }, []);

  const [isCurrentPoemLiked, setIsCurrentPoemLiked] = React.useState(false);
  const likePoem = React.useCallback(async () => {
    await logPoemLike();
    setIsCurrentPoemLiked(isPageLocallyLiked());
    alert('Awesome, thank you for your feedback!');
  }, []);
  useOnNavigation({
    callback: () => setIsCurrentPoemLiked(isPageLocallyLiked()),
  });

  const pages = React.useMemo(() => {
    return Array(poemEntries.length)
      .fill(null)
      .map((_, i) => {
        const [title, date] = poemEntries[i];
        const entryProps = { date, key: `${title}-${i}`, title };
        return <PoemDetails open={true} {...entryProps} />;
      });
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

  const goToPage = React.useCallback(
    (pageNum: number) => {
      document.location.hash = poemEntries[pageNum][0];
    },
    [poemEntries]
  );

  const goToNextPage = React.useCallback(() => {
    goToPage(Math.min(openPageNumber + 1, poemEntries.length - 1));
  }, [goToPage, openPageNumber, poemEntries.length]);
  const goToPrevPage = React.useCallback(() => {
    goToPage(Math.max(openPageNumber - 1, 0));
  }, [goToPage, openPageNumber]);

  const [title, date] = poemEntries[openPageNumber];
  const entryProps = { date, title };

  React.useEffect(() => {
    const poemTitleTopPx = 160;
    window.scrollTo({ top: poemTitleTopPx, behavior: "smooth" });
  }, [title]);

  return (
    <>
      <Button
        id="prev-btn"
        disabled={isOnFirstPage}
        value="Back ⬅️"
        onClick={goToPrevPage}
      />
      <Button
        id="next-btn"
        disabled={isOnLastPage}
        value="➡️ Next"
        onClick={goToNextPage}
      />
      <Button
        id="like-btn"
        value={isCurrentPoemLiked ? "Liked ❤️" : "Like ❤️"}
        title="Like"
        onClick={likePoem}
        disabled={isCurrentPoemLiked}
      ></Button>
      <Button
        id="share-btn"
        value="🔗 Link"
        title="Share"
        onClick={sharePoem}
      ></Button>
      <PoemImage {...entryProps} />
      <PoemDetails {...entryProps} />
    </>
  );
}

PoemCollection.wrapperStyles = {
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

export default PoemCollection;
