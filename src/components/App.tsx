import { Suspense } from "react";
import Logo from "./Logo";
import withAppWrapper from "./hocs/withAppWrapper";
import ErrorResetBoundary from "./ErrorResetBoundary";
import PoemCollection from "./PoemCollection";
import PoemSearch from "./PoemSearch";
import Doodle from "./Doodle";
import "./App.css";
import { logPageVisit } from "../utils/hitCounter";
import { useOnNavigation } from "./hooks/useOnNavigation";

function App() {
  useOnNavigation({ callback: logPageVisit });

  return (
    <div className={cls``}>
      <div className={cls`doodle`}>
        <Doodle>{`
@grid: 1/100%;

@content: @svg(
  viewBox: 0 0 16 16 p 1;
  stroke: var(--color-bh);
  stroke-width: .1;
  stroke-linecap: round;
  line*16x16 {
    draw: @r(2s);
    x1, y1, x2, y2: @p(
      @nx(-1) @ny(-1) @nx @ny,
      @nx @ny(-1) @nx(-1) @ny,
      @nx @ny(-1) @nx @ny
    );
  }
);
        `}</Doodle>
      </div>
      <div className={cls`text`}>
        <a className={cls`title`} href="#root">
          Letters from the Abyss
        </a>
        <a
          className={cls`owner`}
          href="https://ogbizi.com"
          target="_blank"
          rel="noreferrer"
        >
          Ogbizi &copy; {new Date().getFullYear()}
        </a>
      </div>
      <ErrorResetBoundary>
        <Suspense fallback={<Spinner />}>
          <PoemCollection />
        </Suspense>
      </ErrorResetBoundary>
      <div className={cls`spacer`}>&nbsp;</div>
      <PoemSearch />
    </div>
  );
}

function Spinner() {
  return <Logo size={128} className={cls`logo`} />;
}

function cls(s?: string | TemplateStringsArray) {
  return [`App`, s?.toString()].filter(Boolean).join("-");
}

export const AppRoot = withAppWrapper(App);

export default App;
