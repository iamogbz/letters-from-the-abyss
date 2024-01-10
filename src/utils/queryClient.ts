import { QueryClient } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 10,
      suspense: true,
    },
  },
});

export default queryClient;
