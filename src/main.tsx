import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { ClerkWrapper, useClerkAuth } from "./auth/clerk";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { useSessionData } from "./hooks/useSessionData";
import { createSessionDataFetchers } from "./lib/sessionData";
import { useSupabase } from "./hooks/useSupabase";
import Loading from "./components/icons/Loading";

// Create a new router instance
const router = createRouter({
  routeTree,
  context: { auth: undefined, sessionIds: undefined, sessionDataFetchers: undefined! },
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function InnerApp() {
  const auth = useClerkAuth();
  const getSupabase = useSupabase();
  const sessionData = useSessionData();
  const sessionIds = sessionData.getUserSessions.data?.data?.map((s) => s.id) || [];

  // Create plain fetching functions for use in loaders
  const sessionDataFetchers = createSessionDataFetchers(getSupabase);

  if (auth.isLoading) {
    return (
      <div className="flex place-items-center gap-2 justify-center min-h-screen">
        <Loading className="animate-spin" />
        Loading...
      </div>
    );
  }

  return <RouterProvider router={router} context={{ auth, sessionIds, sessionDataFetchers }} />;
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
