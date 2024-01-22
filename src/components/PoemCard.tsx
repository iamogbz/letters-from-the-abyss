import React from "react";
import { usePoemDetails } from "./hooks/usePoemDetails";
import "./PoemCard.css";
import Doodle from "./Doodle";

export const PoemImage = React.forwardRef<
  HTMLDivElement,
  {
    /** Poem unique title */
    title: string;
  }
>(({ title }, ref) => {
  return (
    <div ref={ref}>
      <div
        className={cls`photo`}
        style={{ backgroundImage: cardBg(title) }}
      ></div>
    </div>
  );
});

export const PoemDetails = React.forwardRef<
  HTMLDivElement,
  { date: string; title: string; open: boolean }
>(({ date, title, open }, ref) => {
  const { data } = usePoemDetails({ title });
  const lines = React.useMemo(
    () =>
      data
        ?.trim()
        .split("\n")
        .map((line, i) => <p key={i}>{line}</p>),
    [data]
  );
  return (
    <div id={title} ref={ref} className={open ? "" : " collapsed"}>
      <div className={cls`content`}>
        <a className={cls`title`} href={`#${title}`}>
          {formatTitle(title)}
        </a>
        <div className={cls`text`}>{lines}</div>
        <div className={cls`timestamp`}>{formatDate(date)}</div>
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
    </div>
  );
});

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
