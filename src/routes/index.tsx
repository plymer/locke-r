import { Button } from "@/components/ui/Button";
import { ButtonGroup } from "@/components/ui/ButtonGroup";
import { createFileRoute } from "@tanstack/react-router";

import { useDb } from "@/hooks/useDb";
import { useClerkAuth } from "@/auth/clerk";

import { Loader2 } from "lucide-react";
import { SetDisplayName } from "@/components/SetDisplayName";
import { useShowDisplayNameModal } from "@/stateStore/modals";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useClerkAuth();
  const { getUserProfile } = useDb(user?.id);
  const showDisplayNameModal = useShowDisplayNameModal();

  const profileData = getUserProfile.data;
  const profileFetching = getUserProfile.isFetching;

  const noProfile = profileData?.error && profileData.error.code === "PGRST116";

  if (noProfile || showDisplayNameModal) return <SetDisplayName />;

  if (profileFetching)
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-2 items-center justify-center text-center">
        <Loader2 className="animate-spin" /> Getting your data...
      </div>
    );

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid grid-cols-1 gap-4 items-center justify-center text-center">
      <h1>{profileData?.data?.displayName}</h1>
      <ButtonGroup orientation="vertical">
        <Button variant="default">New Game</Button>
        <Button variant="default">Load Game</Button>
        <Button variant="default">Settings</Button>
      </ButtonGroup>
    </div>
  );
}
