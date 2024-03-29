import { useQuery } from "react-query";

export function usePoemDetails(params: { title: string }) {
  const input = `stories/${params.title}.txt`;
  return useQuery({
    suspense: true,
    queryKey: input,
    queryFn: async () => {
      const response = await fetch(input);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    },
  });
}
