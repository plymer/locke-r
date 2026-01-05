import type { Database } from "@/lib/supabase";
import { useAuth } from "@clerk/clerk-react";
import { createClient } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

function createAuthedSupabaseClient(accessToken: string | null) {
  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  });
}

export function useDisplayNames(userIds: string[] | undefined | null) {
  const { getToken } = useAuth(); // get the clerk JWT

  if (!userIds || userIds.length === 0) return null;

  const getSupabase = async () => {
    const accessToken = await getToken({ template: "supabase" });
    if (!accessToken) {
      throw new Error(
        "Missing Supabase access token. Create a Clerk JWT template named 'supabase' that uses your Supabase JWT secret."
      );
    }

    return createAuthedSupabaseClient(accessToken);
  };

  const getDisplayNames = useQuery({
    queryKey: ["displayNames", userIds],
    queryFn: async () => {
      const supabase = await getSupabase();
      const response = await supabase.from("users").select("id, displayName").in("id", userIds);

      return response;
    },
  });

  return getDisplayNames;
}
