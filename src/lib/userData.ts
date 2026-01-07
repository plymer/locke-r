import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./supabase";

/**
 * Plain data fetching functions (not hooks) that can be used in router loaders.
 * These should be passed through router context.
 */

export const userDataFetchers = (getSupabase: () => Promise<SupabaseClient<Database>>) => {
  return {
    getUserName: async (userId: string) => {
      const supabase = await getSupabase();
      const response = await supabase.from("users").select().eq("id", userId).single();
      return response;
    },

    getUserNameList: async (userIds: string[]) => {
      const supabase = await getSupabase();
      const response = await supabase.from("users").select().in("id", userIds);
      return response;
    },
  };
};

export type UserDataFetchers = ReturnType<typeof userDataFetchers>;
