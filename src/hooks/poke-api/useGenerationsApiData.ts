import { useQuery } from "@tanstack/react-query";
import { Pokedex } from "pokeapi-js-wrapper";

export const useGenerations = (gen: string | number) => {
  const queryFn = async () => {
    const pokedex = new Pokedex();
    return await pokedex.getGenerationByName(gen);
  };

  return useQuery({
    queryKey: ["generations", gen],
    queryFn: queryFn,
    retry: false,
  });
};
