import { createFileRoute } from "@tanstack/react-router";

type CreatePartySearch = {
  sessionId: string;
};

export const Route = createFileRoute("/party/create")({
  component: RouteComponent,
  validateSearch: (search): CreatePartySearch => {
    return {
      sessionId: String(search.sessionId),
    };
  },
});

function RouteComponent() {
  const { sessionId } = Route.useSearch();

  return <div>{sessionId}</div>;
}
