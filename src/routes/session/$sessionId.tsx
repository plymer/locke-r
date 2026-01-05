import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/session/$sessionId")({
  component: RouteComponent,
  beforeLoad: async ({ context, params }) => {
    // this route will only be accessible if the user is already authenticated,
    // so we don't need to check auth here

    // we do need to make sure that they have access to the requested sessionId
    // if they do not have permission, they will be redirected to the root

    const { sessionId } = params;

    if (context.sessionIds === undefined) {
      throw redirect({ to: "/" });
    }

    const hasAccess = !!context.sessionIds?.includes(sessionId);

    if (hasAccess) {
      // user has access to this session
      return;
    }
  },
  loader: async ({ params, context }) => {
    const { sessionId } = params;

    // Use plain fetching functions from context (not hooks!)
    const sessionData = await context.sessionDataFetchers.fetchSingleSession(sessionId);
    const sessionParties = await context.sessionDataFetchers.fetchSessionParties(sessionId);

    return { sessionData, sessionParties };
  },
});

function RouteComponent() {
  const router = useRouter();
  const loaderData = Route.useLoaderData();
  if (!loaderData) return;

  const { sessionData, sessionParties } = loaderData;

  if (!sessionData?.data) return <div>Session not found.</div>;

  if (!sessionParties?.data || sessionParties.data.length === 0) {
    router.navigate({ to: `/party/create?sessionId=${sessionData.data.id}` });
    return;
  }

  return (
    <div className="flex flex-col gap-2 rounded-b-lg">
      <h1>{sessionData.data.instanceName}</h1>
      {/* <p>Session ID: {sessionId}</p> */}
      <div>
        <h2>Parties:</h2>
        <ul>
          {sessionParties.data.map((party) => (
            <li key={party.id}>
              {party.owner} - Created at:{" "}
              {new Date(party.createdAt).toLocaleDateString("en-CA", { dateStyle: "short", timeStyle: "short" })}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
