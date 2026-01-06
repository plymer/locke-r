import { useDbByUser } from "@/hooks/useDbByUser";
import { useEffect, useState } from "react";
import { Label } from "./ui/Label";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { Loader2, Save, X } from "lucide-react";
import { createPortal } from "react-dom";
import { useUserId } from "@/state-store/user";
import { useModalsActions } from "@/state-store/modals";

export const SetDisplayName = () => {
  const userId = useUserId();
  const { getUserProfile, createUserProfile, updateDisplayName } = useDbByUser(userId);
  const { toggleDisplayNameModal } = useModalsActions();

  const [displayName, setDisplayName] = useState(getUserProfile.data?.data?.displayName || "");

  useEffect(() => {
    if (createUserProfile.isSuccess || updateDisplayName.isSuccess) {
      toggleDisplayNameModal();
    }
  }, [createUserProfile.isSuccess, updateDisplayName.isSuccess]);

  const hasDisplayName = getUserProfile.data?.data?.displayName;

  const handleDisplayNameClick = () => {
    if (displayName.trim().length === 0) {
      return;
    }
    if (displayName.length > 12) {
      return;
    }

    if (hasDisplayName) {
      updateDisplayName.mutate(displayName);
    } else {
      createUserProfile.mutate(displayName);
    }
  };

  return createPortal(
    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 grid grid-cols-1 gap-4 items-center justify-center text-center border border-neutral-600 bg-neutral-700 p-8 rounded-lg">
      <h1>{hasDisplayName ? "Update your profile" : "No Profile found"}</h1>
      <Label>Please enter a display name to continue:</Label>
      <Input autoFocus className="bg-white text-black" onChange={(e) => setDisplayName(e.target.value)} />
      {!hasDisplayName && (
        <Button onClick={handleDisplayNameClick} disabled={createUserProfile.isPending}>
          {createUserProfile.isPending ? <Loader2 className="animate-spin" /> : <Save />}
          Save Display Name
        </Button>
      )}
      {hasDisplayName && (
        <div className="flex gap-2 justify-center">
          <Button onClick={handleDisplayNameClick} disabled={updateDisplayName.isPending}>
            {updateDisplayName.isPending ? <Loader2 className="animate-spin" /> : <Save />}
            Save Changes
          </Button>
          <Button variant="secondary" onClick={toggleDisplayNameModal} disabled={updateDisplayName.isPending}>
            <X />
            Cancel
          </Button>
        </div>
      )}
    </div>,
    document.body
  );
};
