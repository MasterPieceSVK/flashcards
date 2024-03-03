"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
export default function Provider({ children }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      {children}
      <Toaster className="bg-primary" />
    </QueryClientProvider>
  );
}
