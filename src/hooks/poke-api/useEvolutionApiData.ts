import { useQuery } from "@tanstack/react-query";
import { Pokedex } from "pokeapi-js-wrapper";

export const useEvolutionData = () => {
  const getByName = (evoChainId: number | undefined) => {
    const queryFn = async () => {
      const pokedex = new Pokedex();
      if (!evoChainId) return null;
      return await pokedex.getEvolutionChainById(evoChainId);
    };

    return useQuery({
      queryKey: ["searchEvolutionChain", evoChainId],
      queryFn: queryFn,
      retry: false,
    });
  };

  return { getByName };
};
