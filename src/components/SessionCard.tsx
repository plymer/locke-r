import { useDisplayNames } from "@/hooks/useDisplayNames";
import type { SessionData } from "@/lib/types";

import { useUserId } from "@/stateStore/user";
import { GameGenCard } from "./ui/GameGenCard";
import { SessionUserList } from "./SessionUserList";
import { Button } from "./ui/Button";
import { Play, Trash } from "lucide-react";

interface Props {
  sessionData: SessionData;
}

export const SessionCard = ({ sessionData }: Props) => {
  const userId = useUserId();
  const { createdAt, gameGen, instanceName, lastPlayed, pkmnGameName, owner, playerTwo, playerThree } = sessionData;

  const displayNameList = useDisplayNames([owner, playerTwo, playerThree].filter(Boolean) as string[]);

  const userIsOwner = owner === userId;

  return (
    <div className="bg-secondary text-black rounded-lg border-neutral-400 border flex flex-col">
      <div className="flex gap-2 p-2">
        <GameGenCard name={pkmnGameName} generation={gameGen} />
        <div className="grow flex flex-col justify-between gap-2 px-2">
          <div className="border-b border-neutral-400 pb-2 ">
            <h1 className="text-lg font-bold text-center">{instanceName}</h1>
            <h3 className="text-center text-sm text-neutral-500">
              (Started {new Date(createdAt).toLocaleDateString("en-CA", { dateStyle: "short" })})
            </h3>
          </div>
          <p className="text-sm">
            Last played:{" "}
            {new Date(lastPlayed).toLocaleString("en-CA", {
              dateStyle: "short",
              timeStyle: "short",
            })}
          </p>

          <SessionUserList sessionOwner={owner} users={displayNameList?.data?.data} />
          <div className="mx-auto flex gap-2">
            <Button>
              <Play /> Play
            </Button>
            {userIsOwner && (
              <Button variant="destructive">
                <Trash /> Delete
              </Button>
            )}
          </div>
        </div>
      </div>
      {userIsOwner && (
        <p className="text-center text-xs text-neutral-800 bg-neutral-400 border-b border-neutral-400 rounded-b-lg">
          You are the owner of this session.
        </p>
      )}
    </div>
  );
};
