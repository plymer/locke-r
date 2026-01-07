import type { PokemonGame } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { Pokedex } from "pokeapi-js-wrapper";

export const useGameInfoByName = (name: PokemonGame) => {
  const queryFn = async () => {
    const pokedex = new Pokedex();
    const generationData = await pokedex.getVersionByName(name);

    return generationData.names.find((n) => n.language.name === "en")?.name || name;
  };

  return useQuery({
    queryKey: ["gameInfo", name],
    queryFn: queryFn,
    retry: false,
  });
};
