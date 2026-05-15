"use client"
import { QueryClient } from "@tanstack/react-query";
import { setQueryClient } from "./apiClient";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      gcTime: 5 * 60_000,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

setQueryClient(queryClient);