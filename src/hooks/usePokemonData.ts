import { useQuery } from "@tanstack/react-query";
import { Pokedex } from "pokeapi-js-wrapper";

export const usePokemonData = () => {
  const getByName = (name: string) => {
    const searchName = name.toLowerCase();

    const queryFn = async () => {
      const pokedex = new Pokedex();
      return await pokedex.getPokemonByName(searchName);
    };

    return useQuery({
      queryKey: ["searchByName", searchName],
      queryFn: queryFn,
      retry: false,
    });
  };

  const listAll = () => {
    const queryFn = async () => {
      const pokedex = new Pokedex();
      return await pokedex.getPokemonsList();
    };

    return useQuery({
      queryKey: ["fullList"],
      queryFn: queryFn,
      retry: false,
    });
  };

  return { getByName, listAll };
};
