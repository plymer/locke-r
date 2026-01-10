import { createFileRoute } from "@tanstack/react-router";

import { useDbByUser } from "@/hooks/useDbByUser";
import { useClerkAuth } from "@/auth/clerk";

import { Sparkles } from "lucide-react";
import { SetDisplayName } from "@/components/SetDisplayName";
import { useShowDisplayNameModal } from "@/state-store/modals";
import { Button } from "@/components/ui/Button";
import { SessionCard } from "@/components/SessionCard";
import { useSessionData } from "@/hooks/useSessionData";
import Loading from "@/components/icons/Loading";
import Pokeball from "@/components/icons/Pokeball";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useClerkAuth();
  const { getUserProfile } = useDbByUser(user?.id);
  const { joinSession, createUserSession, getUserSessions } = useSessionData();
  const showDisplayNameModal = useShowDisplayNameModal();

  const [inviteCodeDialogOpen, setInviteCodeDialogOpen] = useState(false);
  const [inviteCode, setInviteCode] = useState("");

  const profileData = getUserProfile.data;
  const profileFetching = getUserProfile.isFetching;

  const noProfile = profileData?.error && profileData.error.code === "PGRST116";

  const sessionsData = getUserSessions.data;
  const sessionsFetching = getUserSessions.isFetching;

  if (noProfile || showDisplayNameModal) return <SetDisplayName />;

  if (profileFetching)
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-2 items-center justify-center text-center">
        <Loading className="animate-spin" /> Getting your data...
      </div>
    );

  const handleNewSessionClick = () => {
    createUserSession.mutate({
      gameGen: 4,
      instanceName: "Test HG",
      pkmnGameName: "heartgold",
      inviteCode: "bulbasaur-charmander-squirtle",
    });
  };

  const handleJoinSessionClick = () => {
    joinSession.mutate({ inviteCode, userId: user?.id! });
    setInviteCodeDialogOpen(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="md:text-2xl max-md:text-center">Welcome back, {profileData?.data?.displayName}!</h1>

      <div className="grid grid-cols-2 gap-4">
        <Button variant="secondary" onClick={handleNewSessionClick}>
          <Sparkles />
          New Session
        </Button>
        <Dialog open={inviteCodeDialogOpen} onOpenChange={setInviteCodeDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="secondary">
              <Pokeball />
              Join Session
            </Button>
          </DialogTrigger>
          <DialogContent className="text-black">
            <div className="flex flex-col gap-4">
              <DialogTitle className="text-xl font-bold">Join a Session</DialogTitle>
              <p>Enter the invite code provided by the session owner to join their session.</p>

              <Input
                type="text"
                placeholder="Invite Code"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
              />
              <Button onClick={handleJoinSessionClick}>Join</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {sessionsFetching && (
        <div className="flex gap-2 items-center justify-center text-center col-span-2">
          <Loading className="animate-spin" /> Getting your sessions...
        </div>
      )}
      {!sessionsFetching && sessionsData?.data?.length === 0 && <p>No active sessions found.</p>}
      <div className="grid max-md:grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-linear-120 from-neutral-600 to-neutral-800 rounded-lg">
        <h1 className="md:text-3xl max-md:text-lg text-center font-bold md:col-span-2 border-b pb-2 shadow-md">
          Your Sessions ({sessionsData?.data?.length})
        </h1>
        {!sessionsFetching &&
          sessionsData?.data?.length! > 0 &&
          sessionsData?.data?.map((session) => <SessionCard key={session.id} sessionData={session} />)}
      </div>
    </div>
  );
}
