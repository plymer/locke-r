import type { UserProfileData } from "@/lib/types";
import { cn } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  sessionOwner: string;
  users: Pick<UserProfileData, "id" | "displayName">[] | undefined | null;
  orientation?: "horizontal" | "vertical";
}

export const SessionUserList = ({ sessionOwner, users, orientation = "vertical", ...props }: Props) => {
  return (
    <div {...props} className={cn("flex gap-2", props.className)}>
      <h1>Players:</h1>
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
    </div>
  );
};
