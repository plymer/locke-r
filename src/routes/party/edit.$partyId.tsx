import { PokemonSummaryCard } from "@/components/ui/PokemonSummaryCard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/party/edit/$partyId")({
  component: RouteComponent,
  loader: async ({ params, context }) => {
    const { partyId } = params;
    const { getPartyById } = context.partyFns;
    const { getPokemonList } = context.pkmnFns;

    // Here you can fetch the party data using the partyId if needed
    // For example:
    const partyData = await getPartyById(partyId);

    // look up all of the pokemon IDs in this session's parties
    const partyPokemonIds =
      [
        partyData.data?.slotOne,
        partyData.data?.slotTwo,
        partyData.data?.slotThree,
        partyData.data?.slotFour,
        partyData.data?.slotFive,
        partyData.data?.slotSix,
      ].filter((id): id is number => !!id) || [];

    // get all of the pokemon data for this session's parties
    const partyPokemon = await getPokemonList(partyPokemonIds);

    return { partyData, partyPokemon };
  },
});

function RouteComponent() {
  const loaderData = Route.useLoaderData();
  if (!loaderData || !loaderData.partyData?.data || !loaderData.partyPokemon?.data) return;

  const { partyName } = loaderData.partyData.data;
  const { data: pokemon } = loaderData.partyPokemon;

  return (
    <div>
      <div className="flex place-items-center justify-around bg-neutral-800 text-white rounded-full px-4 py-2 font-bold">
        <p>Party Name: {partyName}</p>
      </div>
      <div className="flex justify-center gap-2">
        {pokemon?.map((p) => (
          <PokemonSummaryCard key={p.id} data={p} partyCount={pokemon?.length} />
        ))}
      </div>
    </div>
  );
}
