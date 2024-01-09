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
  return <>{poemsEls}</>;
}

export default PoemList;
