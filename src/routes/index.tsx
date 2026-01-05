import { createFileRoute } from "@tanstack/react-router";

import { useDbByUser } from "@/hooks/useDbByUser";
import { useClerkAuth } from "@/auth/clerk";

import { Loader2, Sparkles } from "lucide-react";
import { SetDisplayName } from "@/components/SetDisplayName";
import { useShowDisplayNameModal } from "@/stateStore/modals";
import { Button } from "@/components/ui/Button";
import { SessionCard } from "@/components/SessionCard";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useClerkAuth();
  const { getUserProfile, getUserSessions, createUserSession } = useDbByUser(user?.id);
  const showDisplayNameModal = useShowDisplayNameModal();

  const profileData = getUserProfile.data;
  const profileFetching = getUserProfile.isFetching;

  const noProfile = profileData?.error && profileData.error.code === "PGRST116";

  const sessionsData = getUserSessions.data;
  const sessionsFetching = getUserSessions.isFetching;

  if (noProfile || showDisplayNameModal) return <SetDisplayName />;

  if (profileFetching)
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-2 items-center justify-center text-center">
        <Loader2 className="animate-spin" /> Getting your data...
      </div>
    );

  const handleNewSessionClick = () => {
    createUserSession.mutate({ gameGen: 4, instanceName: "Test HG", pkmnGameName: "Heart-Gold" });
  };

  return (
    <div className="bg-accent px-4 pt-2 pb-4 flex flex-col gap-2 rounded-b-lg">
      <h1 className="text-2xl max-md:text-center">Welcome back, {profileData?.data?.displayName}!</h1>

      <Button variant="secondary" onClick={handleNewSessionClick}>
        <Sparkles />
        Start New Session
      </Button>

      <div className="grid max-md:grid-cols-1 md:grid-cols-2 gap-4">
        {sessionsFetching && (
          <div className="flex gap-2 items-center justify-center text-center col-span-2">
            <Loader2 className="animate-spin" /> Getting your sessions...
          </div>
        )}
        {!sessionsFetching && sessionsData?.data?.length === 0 && <p>No active sessions found.</p>}
        {!sessionsFetching &&
          sessionsData?.data?.length! > 0 &&
          sessionsData?.data?.map((session) => <SessionCard key={session.id} sessionData={session} />)}
      </div>
    </div>
  );
}
