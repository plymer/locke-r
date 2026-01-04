import { Button } from "@/components/ui/Button";
import { ButtonGroup } from "@/components/ui/ButtonGroup";
import { createFileRoute } from "@tanstack/react-router";

import { useDb } from "@/hooks/useDb";
import { useClerkAuth } from "@/auth/clerk";
import { useState } from "react";
import { Loader2, Save } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useClerkAuth();
  if (!user) throw new Error("User not found");

  const { userProfileQuery, createUserProfile } = useDb(user.id);

  const [displayName, setDisplayName] = useState("");

  const profileData = userProfileQuery.data;

  const noProfile = profileData?.error && profileData.error.code === "PGRST116";

  const handleDisplayNameClick = () => {
    if (displayName.trim().length === 0) {
      return;
    }
    if (displayName.length > 12) {
      return;
    }

    createUserProfile.mutate(displayName);
  };

  if (noProfile)
    return (
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 grid grid-cols-1 gap-4 items-center justify-center text-center border border-neutral-600 bg-neutral-700 p-8 rounded-lg">
        <h1>No Profile found</h1>
        <Label>Please enter a display name to continue:</Label>
        <Input className="bg-white text-black" onChange={(e) => setDisplayName(e.target.value)} />
        <Button onClick={handleDisplayNameClick}>
          {createUserProfile.isPending ? <Loader2 className="animate-spin" /> : <Save />}
          Save Display Name
        </Button>
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
