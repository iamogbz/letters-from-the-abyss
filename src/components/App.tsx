import { Suspense } from "react";
import Logo from "./Logo";
import withAppWrapper from "./hocs/withAppWrapper";
import ErrorResetBoundary from "./ErrorResetBoundary";
import PoemList from "./PoemList";
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
@grid: 50x1 / 100%;

@place: center;
@size: calc(100vmax / @I * @i);

transform: rotate(calc(@i * 5deg));

border-radius: 30%;
border: 1px solid hsla(
calc(10 + 4 * @i), 70%, 68%, @r.8
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
          <PoemList />
        </Suspense>
      </ErrorResetBoundary>
      <div className={cls`spacer`}>&nbsp;</div>
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
