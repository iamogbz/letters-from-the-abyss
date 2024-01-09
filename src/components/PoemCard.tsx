import { Suspense } from "react";
import { usePoemDetails } from "./hooks/usePoemDetails";
import Logo from "./Logo";
import ErrorResetBoundary from "./ErrorResetBoundary";

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
    <div>
      <div>
        {title} [{date}]
      </div>
      <ErrorResetBoundary>
        <Suspense fallback={<Spinner />}>
          <PoemDetails title={title} />
        </Suspense>
      </ErrorResetBoundary>
    </div>
  );
}

function PoemDetails({ title }: { title: string }) {
  const { data } = usePoemDetails({ title });
  return <div>{`${data}`}</div>;
}

function Spinner() {
  return <Logo size={32} />;
}

export default PoemCard;
