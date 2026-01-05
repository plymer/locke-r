import type { UserProfileData } from "@/lib/types";

interface Props {
  sessionOwner: string;
  users: Pick<UserProfileData, "id" | "displayName">[] | undefined | null;
}

export const SessionUserList = ({ sessionOwner, users }: Props) => {
  return (
    <div className="flex gap-2">
      <h1 className="col-span-2">Players:</h1>
      <div>
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
