import React, { Suspense } from "react";
import { usePoemDetails } from "./hooks/usePoemDetails";
import Logo from "./Logo";
import ErrorResetBoundary from "./ErrorResetBoundary";
import "./PoemCard.css";
import Doodle from "./Doodle";

function PoemCard({
  title,
  date,
  open,
}: {
  /** Poem unique title */
  title: string;
  /** Poem publish date in YYYY-MM-DD format */
  date: string;
  open: boolean;
}) {
  return (
    <div
      className={cls`wrapper`}
      id={title}
      onClick={() => (document.location.hash = title)}
    >
      <a className={cls`title`} href={`#${title}`}>
        {formatTitle(title)}
      </a>
      <div className={cls`details` + (open ? "" : " collapsed")}>
        <ErrorResetBoundary>
          <Suspense fallback={<Spinner />}>
            <PoemDetails title={title} open={open} />
          </Suspense>
        </ErrorResetBoundary>
        <div
          className={cls`photo` + (open ? "" : " collapsed")}
          style={{ backgroundImage: cardBg(title) }}
        ></div>
      </div>
      <div className={cls`timestamp`}>{formatDate(date)}</div>
    </div>
  );
}

function PoemDetails({ title, open }: { title: string; open: boolean }) {
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
  return (
    <div className={cls`content` + (open ? "" : " collapsed")}>
      {lines}
      <div className={cls`paper`}>
        <svg width="0">
          <filter id="filter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency=".01"
              numOctaves="10"
            />
            <feDisplacementMap in="SourceGraphic" scale="240" />
          </filter>
        </svg>
        <Doodle>{`
        :doodle {
          @size: 1px;
          transform: translate(-100%, -100%);
          border-radius: 50%;
          filter: url(#filter);
          box-shadow: @m100(
            @r(100vw) @r(100vh) @r(20vmin, 40vmin) @r(20vmin)
            @pd(#11cbd7, #c6f1e7, #f0fff3, #fa4659)
          );
        }
        `}</Doodle>
      </div>
    </div>
  );
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
