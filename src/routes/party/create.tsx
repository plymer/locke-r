import Loading from "@/components/icons/Loading";
import { useSessionData } from "@/hooks/useSessionData";
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
  const { getSingleSession } = useSessionData();
  const { data, error, fetchStatus } = getSingleSession(sessionId);

  if (fetchStatus === "fetching") {
    return (
      <div className="flex place-items-center gap-2">
        <Loading className="animate-spin" />
        Loading session data...
      </div>
    );
  }

  if (error || !data?.data) {
    return <div>Error loading session data.</div>;
  }

  return (
    <div>
      <h1>Create a Party for {data?.data?.instanceName}</h1>
    </div>
  );
}
