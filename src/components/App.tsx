import { Suspense } from "react";
import Logo from "./Logo";
import withAppWrapper from "./hocs/withAppWrapper";
import ErrorResetBoundary from "./ErrorResetBoundary";
import PoemList from "./PoemList";
import Doodle from "./Doodle";
import "./App.css";

function App() {
  return (
    <div className={cls``}>
      <div className={cls`text`}>
        <div className={cls`title`}>Letters from the Abyss</div>
        <div className={cls`owner`}>
          Ogbizi &copy; {new Date().getFullYear()}
        </div>
      </div>
      <ErrorResetBoundary>
        <Suspense fallback={<Spinner />}>
          <PoemList />
        </Suspense>
      </ErrorResetBoundary>
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
