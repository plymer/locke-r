import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./supabase";

/**
 * Plain data fetching functions (not hooks) that can be used in router loaders.
 * These should be passed through router context.
 */

export const partyDataFetchers = (getSupabase: () => Promise<SupabaseClient<Database>>) => {
  return {
    getUserParty: async (sessionId: string, userId: string) => {
      const supabase = await getSupabase();
      const response = await supabase
        .from("parties")
        .select()
        .eq("gameInstance", sessionId)
        .eq("owner", userId)
        .single();
      return response;
    },

    getSessionParties: async (sessionId: string) => {
      const supabase = await getSupabase();
      const response = await supabase.from("parties").select().eq("gameInstance", sessionId);
      return response;
    },

    getPartyById: async (partyId: string) => {
      const supabase = await getSupabase();
      const response = await supabase.from("parties").select().eq("id", partyId).single();
      return response;
    },
  };
};

export type PartyDataFetchers = ReturnType<typeof partyDataFetchers>;
