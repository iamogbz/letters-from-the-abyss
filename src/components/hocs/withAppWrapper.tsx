import { QueryClientProvider } from "react-query";
import queryClient from "../../utils/queryClient";
import React from "react";

function withAppWrapper(Component: React.ComponentType) {
  return () => (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Component />
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default withAppWrapper
