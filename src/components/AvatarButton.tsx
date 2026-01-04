import { UserButton } from "@clerk/clerk-react";
import { FileQuestion } from "lucide-react";

export const AvatarButton = () => {
  return (
    <UserButton>
      <UserButton.MenuItems>
        <UserButton.Action label="Test" labelIcon={<FileQuestion />} onClick={() => alert("test")} />
      </UserButton.MenuItems>
    </UserButton>
  );
};
