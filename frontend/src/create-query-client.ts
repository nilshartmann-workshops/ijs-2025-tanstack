import { QueryClient } from "@tanstack/react-query";

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        // refetchOnMount: false,
        refetchIntervalInBackground: false,
        refetchOnWindowFocus: false,
      },
    },
  });
}
