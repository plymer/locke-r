import { PokemonMoveComboBox } from "@/components/ui/PokemonMoveComboBox";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { PokemonSummaryCard } from "@/components/ui/PokemonSummaryCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { usePokemonData } from "@/hooks/poke-api/usePokemonApiData";
import { POKEMON_NATURES } from "@/lib/pokemonDefinitions";
import type { PokemonData } from "@/lib/types";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useSessionData } from "@/hooks/useSessionData";

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

  const { partyName } = loaderData.partyData.data ?? {};
  const { data: pokemon } = loaderData.partyPokemon;

  const { getPartyPokemonByNumbers } = usePokemonData();
  const { getSingleSession } = useSessionData();

  const { data: teamPokemonApiData } = getPartyPokemonByNumbers(pokemon?.map((p) => p.speciesId) || []);

  const [partyNameInput, setPartyNameInput] = useState(partyName);
  const [pokemonData, setPokemonData] = useState(pokemon);

  const { data: sessionData } = getSingleSession(loaderData.partyData.data?.gameInstance || "");

  const pkmnGameName = sessionData?.data?.pkmnGameName;

  const handlePokemonUpdate = <K extends keyof PokemonData>(pokemonId: number, column: K, data: PokemonData[K]) => {
    setPokemonData((prev) => {
      if (!prev) return prev;
      return prev.map((pkmn) =>
        pkmn.id === pokemonId
          ? {
              ...pkmn,
              [column]: data,
            }
          : pkmn
      );
    });
  };

  return (
    <div className="bg-secondary rounded-lg shadow-md p-4 flex flex-col gap-4">
      <div className="flex place-items-center justify-around bg-neutral-800 text-white rounded-full px-6 py-2 font-bold gap-4">
        <Label htmlFor="partyName" className="cursor-pointer min-w-fit">
          Party Name:
        </Label>
        <Input
          id="partyName"
          value={partyNameInput}
          onChange={(e) => setPartyNameInput(e.target.value)}
          maxLength={40}
        />
      </div>
      <div className="flex justify-center gap-2">
        {pokemonData?.map((p) => {
          // filter the moves to only those available in the current game
          const moveSet =
            teamPokemonApiData
              ?.find((tp) => tp.id === p.speciesId)
              ?.moves.filter((m) =>
                m.version_group_details.find((vgd) =>
                  pkmnGameName ? vgd.version_group.name.includes(pkmnGameName) : true
                )
              )
              .map((move) => ({
                label: move.move.name.charAt(0).toUpperCase() + move.move.name.slice(1),
                value: move.move.name,
              })) || [];

          // filter non-hidden abilities
          const abilities = teamPokemonApiData
            ?.find((tp) => tp.id === p.speciesId)
            ?.abilities.filter((a) => !a.is_hidden);

          return (
            <div key={p.id} className="flex gap-2">
              <PokemonSummaryCard data={p} partyCount={pokemonData?.length} className="border-none shadow-none" />
              <div className="text-black grid gap-2 grid-cols-3">
                <div>
                  <Label htmlFor={`pkmn-${p.id}-nickname`}>Nickname:</Label>
                  <Input
                    id={`pkmn-${p.id}-nickname`}
                    type="text"
                    defaultValue={p.nickname}
                    onChange={(e) => handlePokemonUpdate(p.id, "nickname", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`pkmn-${p.id}-nature`} className="cursor-pointer">
                    Nature:
                  </Label>
                  <Select value={p.nature || ""} onValueChange={(value) => handlePokemonUpdate(p.id, "nature", value)}>
                    <SelectTrigger id={`pkmn-${p.id}-nature`}>
                      <SelectValue placeholder="Select a nature" />
                    </SelectTrigger>
                    <SelectContent>
                      {POKEMON_NATURES?.map((nature, idx) => (
                        <SelectItem key={`${nature}-${idx}`} value={nature}>
                          {nature.charAt(0).toUpperCase() + nature.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor={`pkmn-${p.id}-ability`}>Ability:</Label>
                  <Select
                    value={p.ability || ""}
                    onValueChange={(value) => handlePokemonUpdate(p.id, "ability", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an ability" />
                    </SelectTrigger>
                    <SelectContent>
                      {abilities?.map((ability, idx) => (
                        <SelectItem key={`${ability.ability.name}-${idx}`} value={ability.ability.name}>
                          {ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor={`pkmn-${p.id}-date-caught`}>Date Caught:</Label>
                  <Input
                    id={`pkmn-${p.id}-date-caught`}
                    type="date"
                    defaultValue={new Date(p.dateCaught).toISOString().split("T")[0]}
                    onChange={(e) => handlePokemonUpdate(p.id, "dateCaught", new Date(e.target.value).toISOString())}
                  />
                </div>
                <div>
                  <Label htmlFor={`pkmn-${p.id}-level`}>Level:</Label>
                  <Input
                    id={`pkmn-${p.id}-level`}
                    type="number"
                    min={1}
                    max={100}
                    defaultValue={p.level}
                    onChange={(e) => handlePokemonUpdate(p.id, "level", Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor={`pkmn-${p.id}-gender`}>Gender:</Label>
                  <Select value={p.gender || ""} onValueChange={(value) => handlePokemonUpdate(p.id, "gender", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex place-items-center col-span-3 gap-4">
                  <h1>Moves</h1>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="w-fit">
                      <Label htmlFor={`pkmn-${p.id}-move1`}>Move 1:</Label>
                      <PokemonMoveComboBox
                        pkmnId={p.id}
                        column="moveOne"
                        value={p.moveOne}
                        onValueChange={handlePokemonUpdate}
                        moves={moveSet}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`pkmn-${p.id}-move2`}>Move 2:</Label>
                      <PokemonMoveComboBox
                        pkmnId={p.id}
                        column="moveTwo"
                        value={p.moveTwo ?? undefined}
                        onValueChange={handlePokemonUpdate}
                        moves={moveSet}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`pkmn-${p.id}-move3`}>Move 3:</Label>
                      <PokemonMoveComboBox
                        pkmnId={p.id}
                        column="moveThree"
                        value={p.moveThree || undefined}
                        onValueChange={handlePokemonUpdate}
                        moves={moveSet}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`pkmn-${p.id}-move4`}>Move 4:</Label>
                      <PokemonMoveComboBox
                        pkmnId={p.id}
                        column="moveFour"
                        value={p.moveFour || undefined}
                        onValueChange={handlePokemonUpdate}
                        moves={moveSet}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <pre className="text-black">{JSON.stringify(pokemonData, null, 2)}</pre>
      <pre className="text-black">{JSON.stringify(teamPokemonApiData, null, 2)}</pre>
    </div>
  );
}
