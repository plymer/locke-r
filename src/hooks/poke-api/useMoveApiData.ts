import { useQuery } from "@tanstack/react-query";
import { Pokedex } from "pokeapi-js-wrapper";

export const useMoveData = () => {
  const getByName = (name: string | undefined) => {
    const searchName = name?.toLowerCase();

    const queryFn = async () => {
      const pokedex = new Pokedex();
      if (!searchName) return null;
      return await pokedex.getAbilityByName(searchName);
    };

    return useQuery({
      queryKey: ["searchMoveByName", searchName],
      queryFn: queryFn,
      retry: false,
    });
  };

  return { getByName };
};
