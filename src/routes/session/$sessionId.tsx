import { useDbByUser } from "@/hooks/useDbByUser";
import { useUserId } from "@/stateStore/user";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/session/$sessionId")({
  component: RouteComponent,
  beforeLoad: async ({ params }) => {
    // this route will only be accessible if the user is already authenticated,
    // so we don't need to check auth here

    // we do need to make sure that they have access to the requested sessionId
    // if they do not have permission, they will be redirected to the root

    const { sessionId } = params;
    const userId = useUserId();
    const { getUserSessions } = useDbByUser(userId);
    const userSessionData = getUserSessions.data?.data;

    if (userSessionData && userSessionData.find((s) => s.id === sessionId)) {
      // user has access to this session
      return;
    }
  },
  loader: async ({ params }) => {
    const { sessionId } = params;
    return { sessionId };
  },
});

function RouteComponent() {
  const { sessionId: loaderData } = Route.useLoaderData();
  const { sessionId } = Route.useParams();

  return (
    <div className="bg-accent px-4 pt-2 pb-4 flex flex-col gap-2 rounded-b-lg">
      Hello {`/session/${sessionId}`}! This is loaderData: {loaderData}
    </div>
  );
}
