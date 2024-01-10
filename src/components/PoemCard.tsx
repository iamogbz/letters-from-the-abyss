import React, { Suspense } from "react";
import { usePoemDetails } from "./hooks/usePoemDetails";
import Logo from "./Logo";
import ErrorResetBoundary from "./ErrorResetBoundary";
import "./PoemCard.css";

function PoemCard({
  title,
  date,
}: {
  /** Poem unique title */
  title: string;
  /** Poem publish date in YYYY-MM-DD format */
  date: string;
}) {
  return (
    <div className={cls`wrapper`}>
      <div className={cls`title`}>{formatTitle(title)}</div>
      <div className={cls`details`}>
        <ErrorResetBoundary>
          <Suspense fallback={<Spinner />}>
            <PoemDetails title={title} />
          </Suspense>
        </ErrorResetBoundary>
        <div
          className={cls`photo`}
          style={{ backgroundImage: cardBg(title) }}
        ></div>
      </div>
      <div className={cls`timestamp`}>{formatDate(date)}</div>
    </div>
  );
}

function PoemDetails({ title }: { title: string }) {
  const { data } = usePoemDetails({ title });
  const lines = React.useMemo(
    () =>
      data
        ?.trim()
        .split("\n")
        .filter(Boolean)
        .map((line, i) => <p key={i}>{line}</p>),
    [data]
  );
  return <div className={cls`content`}>{lines}</div>;
}

function Spinner() {
  return <Logo size={32} style={{ position: "absolute" }} />;
}

function cls(suffix: string | TemplateStringsArray) {
  return `poem-card-${suffix}`;
}

function cardBg(title: string) {
  return `url('stories/${title}.png')`;
}

function formatTitle(title: string) {
  return title.replaceAll("-", " ");
}

function formatDate(date: string) {
  return `${new Date(date).toDateString()}`;
}

export default PoemCard;
