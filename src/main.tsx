import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { ClerkWrapper, useClerkAuth } from "./auth/clerk";
import { Loader2 } from "lucide-react";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function InnerApp() {
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key");
  }
  const auth = useClerkAuth();

  if (auth.isLoading) {
    return (
      <div className="flex place-items-center gap-2 justify-center min-h-screen">
        <Loader2 className="animate-spin" />
        Loading...
      </div>
    );
  }

  return <RouterProvider router={router} context={{ auth }} />;
}

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ClerkWrapper>
        <InnerApp />
      </ClerkWrapper>
    </QueryClientProvider>
  </StrictMode>
);
