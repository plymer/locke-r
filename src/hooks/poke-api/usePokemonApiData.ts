import { useQuery } from "@tanstack/react-query";
import { Pokedex } from "pokeapi-js-wrapper";

export const usePokemonData = () => {
  const getByName = (name: string | undefined) => {
    const searchName = name?.toLowerCase();

    const queryFn = async () => {
      const pokedex = new Pokedex();
      if (!searchName) return null;
      return await pokedex.getPokemonByName(searchName);
    };

    return useQuery({
      queryKey: ["searchPokemonByName", searchName],
      queryFn: queryFn,
      retry: false,
    });
  };

  const getByNumber = (number: number | undefined) => {
    const queryFn = async () => {
      const pokedex = new Pokedex();
      if (!number) return null;
      return await pokedex.getPokemonByName(number);
    };

    return useQuery({
      queryKey: ["searchPokemonByNumber", number],
      queryFn: queryFn,
      retry: false,
    });
  };

  const getPartyPokemonByNumbers = (pkmnSpeciesIds: number[]) => {
    const queryFn = async () => {
      const pokedex = new Pokedex();
      const pokemonData = await Promise.all(
        pkmnSpeciesIds.map(async (id) => {
          return await pokedex.getPokemonByName(id);
        })
      );
      return pokemonData;
    };

    return useQuery({
      queryKey: ["partyPokemonList", pkmnSpeciesIds],
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
      queryKey: ["fullPokemonList"],
      queryFn: queryFn,
      retry: false,
    });
  };

  return { getByName, getByNumber, listAll, getPartyPokemonByNumbers };
};
