import type { POKEMON_GAMES, POKEMON_TYPES } from "./pokemonData";
import type { Database } from "./supabase";

export type SessionData = Database["public"]["Tables"]["gameInstances"]["Row"];
export type PokemonData = Database["public"]["Tables"]["monsters"]["Row"];
export type PartyData = Database["public"]["Tables"]["parties"]["Row"];
export type UserProfileData = Database["public"]["Tables"]["users"]["Row"];

export type PokemonType = (typeof POKEMON_TYPES)[number];
export type PokemonGame = (typeof POKEMON_GAMES)[number];
