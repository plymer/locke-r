import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./supabase";

/**
 * Plain data fetching functions (not hooks) that can be used in router loaders.
 * These should be passed through router context.
 */

export const createSessionDataFetchers = (getSupabase: () => Promise<SupabaseClient<Database>>) => {
  return {
    fetchSingleSession: async (sessionId: string) => {
      const supabase = await getSupabase();
      const response = await supabase.from("gameInstances").select().eq("id", sessionId).single();
      return response;
    },

    fetchSessionParties: async (sessionId: string) => {
      const supabase = await getSupabase();
      const response = await supabase.from("parties").select().eq("sessionId", sessionId);
      return response;
    },

    fetchUserSessions: async (userId: string) => {
      const supabase = await getSupabase();
      const response = await supabase
        .from("gameInstances")
        .select()
        .or(`owner.eq.${userId},playerTwo.eq.${userId},playerThree.eq.${userId}`);
      return response;
    },
  };
};

export type SessionDataFetchers = ReturnType<typeof createSessionDataFetchers>;
