import Pokeball from "@/components/icons/Pokeball";
import { SessionUserList } from "@/components/SessionUserList";
import { Button } from "@/components/ui/Button";
import { GameGenCard } from "@/components/ui/GameGenCard";
import { PokemonSummaryCard } from "@/components/ui/PokemonSummaryCard";
import type { PokemonGame } from "@/lib/types";
import { useUserId } from "@/state-store/user";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { Edit } from "lucide-react";

export const Route = createFileRoute("/session/$sessionId")({
  component: RouteComponent,
  beforeLoad: async ({ context, params }) => {
    // this route will only be accessible if the user is already authenticated,
    // so we don't need to check auth here

    const { sessionId } = params;
    const { fetchSessionParties } = context.sessionFns;

    // if there are no sessionIds in context, something is wrong - redirect to root
    if (context.sessionIds === undefined) throw redirect({ to: "/" });

    const hasAccess = !!context.sessionIds?.includes(sessionId);

    // if the user has somehow navigated to a session they do not have access to, redirect them to root
    if (!hasAccess) throw redirect({ to: "/" });

    // set up our redirect if the user does not have a party in this session
    const partiesResponse = await fetchSessionParties(sessionId);
    const userParty = partiesResponse.data?.find((party) => party.owner === context.userId);

    // if the user has no party in this session, redirect them to create one
    if (!userParty) throw redirect({ to: "/party/create", search: { sessionId } });
  },
  loader: async ({ params, context }) => {
    // get our sessionId from the path params
    const { sessionId } = params;

    // retrieve our data loaders from our router context
    const { fetchSessionParties, fetchSingleSession } = context.sessionFns;
    const { getUserNameList } = context.userFns;
    const { getPokemonList } = context.pkmnFns;

    // get our session-specific data
    const sessionData = await fetchSingleSession(sessionId);
    const sessionParties = await fetchSessionParties(sessionId);

    // use the session data to extract the user IDs we need to look up
    const sessionUsersList = [
      sessionData.data?.owner,
      sessionData.data?.playerTwo,
      sessionData.data?.playerThree,
    ].filter((userId): userId is string => !!userId);

    // fetch the user data for those IDs
    const sessionUsers = await getUserNameList(sessionUsersList);

    // look up all of the pokemon IDs in this session's parties
    const sessionPokemonIds =
      sessionParties.data
        ?.map((party) => [party.slotOne, party.slotTwo, party.slotThree, party.slotFour, party.slotFive, party.slotSix])
        .flat()
        .filter((id): id is number => !!id) || [];

    // get all of the pokemon data for this session's parties
    const sessionPokemon = await getPokemonList(sessionPokemonIds);

    // return all of our loader data
    return { sessionData, sessionParties, sessionUsers, sessionPokemon };
  },
});

function RouteComponent() {
  const loaderData = Route.useLoaderData();

  const userId = useUserId();

  const { sessionData, sessionParties, sessionUsers, sessionPokemon } = loaderData;

  if (!sessionData?.data) return <div>Session not found.</div>;

  return (
    <div className="flex flex-col gap-2 rounded-b-lg">
      <div className="flex gap-2 bg-secondary rounded-lg overflow-clip">
        <GameGenCard
          generation={sessionData.data.gameGen}
          name={sessionData.data.pkmnGameName as PokemonGame}
          orientation="horizontal"
          className="bg-secondary w-full ps-2"
        >
          <h1 className="text-3xl font-bold">{sessionData.data.instanceName}</h1>
          <p className="text-sm text-neutral-300">
            Created at:{" "}
            {new Date(sessionData.data.createdAt).toLocaleString("en-CA", {
              dateStyle: "short",
              timeStyle: "short",
            })}
          </p>
          <p className="text-sm text-neutral-300">
            Last played:{" "}
            {new Date(sessionData.data.lastPlayed).toLocaleString("en-CA", {
              dateStyle: "short",
              timeStyle: "short",
            })}
          </p>
          <SessionUserList
            sessionOwner={sessionData.data.owner}
            users={sessionUsers.data}
            orientation="horizontal"
            className="border-t border-neutral-300 mt-2 pt-2"
          />
        </GameGenCard>
      </div>
      <div className="flex flex-col gap-2 bg-secondary text-black rounded-lg p-4">
        <div className="flex gap-2 justify-center place-items-center text-3xl font-bold">
          <Pokeball className="opacity-10" />
          <Pokeball className="opacity-30" />
          <Pokeball className="opacity-60" />
          <Pokeball />
          Parties
          <Pokeball />
          <Pokeball className="opacity-60" />
          <Pokeball className="opacity-30" />
          <Pokeball className="opacity-10" />
        </div>
        <ul>
          {sessionParties?.data?.map((party) => {
            const { partyName, slotOne, slotTwo, slotThree, slotFour, slotFive, slotSix } = party;

            const user = sessionUsers.data?.find((u) => u.id === party.owner);

            const pokemonIds = [slotOne, slotTwo, slotThree, slotFour, slotFive, slotSix].filter((p) => p !== null);

            const pokemon = sessionPokemon?.data?.filter((p) => pokemonIds.includes(p.id));

            return (
              <li key={party.id} className="flex flex-col gap-4 border-2 border-black rounded-lg p-4">
                <div className="flex place-items-center justify-around bg-neutral-800 text-white rounded-full px-4 py-2 font-bold">
                  <p>Player: {user?.displayName}</p>
                  <p>Party Name: {partyName}</p>
                  <p>
                    Last Played:{" "}
                    {user?.lastLoggedIn
                      ? new Date(user.lastLoggedIn).toLocaleString("en-CA", { dateStyle: "short", timeStyle: "short" })
                      : "Unknown"}
                  </p>
                  <Button variant="secondary" disabled={userId !== user?.id}>
                    <Edit />
                  </Button>
                </div>
                <div className="flex justify-center gap-2">
                  {pokemon?.map((p) => (
                    <PokemonSummaryCard key={p.id} data={p} />
                  ))}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
