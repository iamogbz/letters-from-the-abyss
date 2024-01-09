import { QueryErrorResetBoundary } from "react-query";
import { ErrorBoundary } from "react-error-boundary";
import Retry from "./Retry";

function ErrorResetBoundary({ children }: React.PropsWithChildren<unknown>) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={() => reset()}
          fallbackRender={({ resetErrorBoundary }) => {
            return <Retry onClick={() => resetErrorBoundary()} />;
          }}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}

export default ErrorResetBoundary;
