import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./supabase";

/**
 * Plain data fetching functions (not hooks) that can be used in router loaders.
 * These should be passed through router context.
 */

export const pokemonDataFetchers = (getSupabase: () => Promise<SupabaseClient<Database>>) => {
  return {
    getSinglePokemon: async (monsterId: number) => {
      const supabase = await getSupabase();
      const response = await supabase.from("monsters").select().eq("id", monsterId).single();
      return response;
    },

    getPokemonList: async (monsterIds: number[]) => {
      const supabase = await getSupabase();
      const response = await supabase.from("monsters").select().in("id", monsterIds);
      return response;
    },
  };
};

export type PokemonDataFetchers = ReturnType<typeof pokemonDataFetchers>;
