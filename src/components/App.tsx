import { Suspense } from "react";
import Logo from "./Logo";
import ErrorResetBoundary from "./ErrorResetBoundary";
import PoemList from "./PoemList";

import "./App.css";


function App() {
  return (
    <div className="App">
      <ErrorResetBoundary>
        <Suspense fallback={<Spinner />}>
          <PoemList />
        </Suspense>
      </ErrorResetBoundary>
    </div>
  );
}

function Spinner() {
  return <Logo size={128} className="App-logo" />;
}

export default App;
