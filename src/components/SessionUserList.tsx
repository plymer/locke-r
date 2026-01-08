import type { UserProfileData } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "./ui/Button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/Popover";
import { Input } from "./ui/Input";
import { Copy } from "lucide-react";
import { useState } from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  sessionOwner: string;
  users: Pick<UserProfileData, "id" | "displayName">[] | undefined | null;
  orientation?: "horizontal" | "vertical";
  inviteCode?: string;
  // isStarted: boolean;
}

export const SessionUserList = ({ sessionOwner, users, orientation = "vertical", inviteCode, ...props }: Props) => {
  const [inviteIsOpen, setInviteIsOpen] = useState(false);

  const handleCopyInvite = () => {
    if (inviteCode) {
      navigator.clipboard.writeText(inviteCode);
    }
    setInviteIsOpen(false);
  };

  return (
    <div {...props} className={cn("flex gap-2 place-items-center max-md:flex-col ", props.className)}>
      <h1>Players ({users?.length}/3):</h1>
      <div className={orientation === "horizontal" ? "flex gap-2" : ""}>
        {users?.map((user) => {
          const isOwner = sessionOwner === user.id;
          return (
            <p key={user.id} className="flex items-center gap-1">
              <img src={isOwner ? "/owner.png" : "/member.png"} className="size-4" />
              <span className={isOwner ? "font-bold" : ""}>{user.displayName}</span>
            </p>
          );
        })}
      </div>
      {inviteCode && users && users.length < 3 && (
        <Popover open={inviteIsOpen} onOpenChange={() => setInviteIsOpen(!inviteIsOpen)}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="bg-transparent">
              Invite Players
            </Button>
          </PopoverTrigger>
          <PopoverContent className="bg-secondary-foreground w-fit">
            <div className="flex gap-2 max-md:flex-col place-items-center">
              <Input
                disabled
                className="bg-white text-black text-center disabled:opacity-100 text-sm"
                value={inviteCode}
              />
              <Button onClick={handleCopyInvite}>
                <Copy />
                Copy Code
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};
