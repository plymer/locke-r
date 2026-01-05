import type { Database } from "./supabase";

export type SessionData = Database["public"]["Tables"]["gameInstances"]["Row"];
export type PokemonData = Database["public"]["Tables"]["monsters"]["Row"];
export type PartyData = Database["public"]["Tables"]["parties"]["Row"];
export type UserProfileData = Database["public"]["Tables"]["users"]["Row"];
