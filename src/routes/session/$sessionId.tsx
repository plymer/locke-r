import { createFileRoute, redirect } from "@tanstack/react-router";

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
    const sessionData = context.sessionData?.getSingleSession(params.sessionId);
    const sessionParties = context.sessionData?.getSessionParties(params.sessionId);

    return { sessionData, sessionParties };

    // const { sessionId } = params;
    // const { getSingleSession, getSessionParties } = useSessionData();

    // const sessionData = getSingleSession(sessionId);
    // const sessionParties = getSessionParties(sessionId);

    // return { sessionData, sessionParties };
  },
});

function RouteComponent() {
  const loaderData = Route.useLoaderData();
  if (!loaderData) return;

  const { sessionData, sessionParties } = loaderData;

  if (!sessionData) return <div>Session not found.</div>;

  if (!sessionParties) return <div>We need to set up at least one party</div>;

  return (
    <div className="bg-accent px-4 pt-2 pb-4 flex flex-col gap-2 rounded-b-lg">
      <h1>{sessionData.data?.data?.instanceName}</h1>
      {/* <p>Session ID: {sessionId}</p> */}
      <div>
        <h2>Parties:</h2>
        <ul>
          {sessionParties.data?.data?.map((party) => (
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
