import { UserButton } from "@clerk/clerk-react";
import { UserRound } from "lucide-react";

import { useModalsActions } from "@/stateStore/modals";

export const AvatarButton = () => {
  const { toggleDisplayNameModal } = useModalsActions();

  return (
    <UserButton>
      <UserButton.MenuItems>
        <UserButton.Action
          label="Change your display name"
          labelIcon={<UserRound className="size-4" />}
          onClick={toggleDisplayNameModal}
        />
      </UserButton.MenuItems>
    </UserButton>
  );
};
