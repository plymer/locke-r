import { useQuery } from "@tanstack/react-query";

import { Pokedex } from "pokeapi-js-wrapper";

export const useGenerations = () => {
  const queryFn = async () => {
    const pokedex = new Pokedex();
    return await pokedex.getGenerationsList();
  };

  return useQuery({
    queryKey: ["generations"],
    queryFn: queryFn,
    retry: false,
  });
};
