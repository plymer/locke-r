import type { Database } from "@/lib/supabase";
import { useAuth } from "@clerk/clerk-react";
import { createClient } from "@supabase/supabase-js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

function createAuthedSupabaseClient(accessToken: string | null) {
  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  });
}

export function useDb(userId: string) {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  const getSupabase = async () => {
    const accessToken = await getToken({ template: "supabase" });
    if (!accessToken) {
      throw new Error(
        "Missing Supabase access token. Create a Clerk JWT template named 'supabase' that uses your Supabase JWT secret."
      );
    }

    return createAuthedSupabaseClient(accessToken);
  };

  const userProfileQuery = useQuery({
    queryKey: ["userProfile", userId],
    enabled: Boolean(userId),
    queryFn: async () => {
      const supabase = await getSupabase();
      const response = await supabase.from("users").select().eq("id", userId).single();
      return response;
    },
  });

  const createUserProfile = useMutation({
    mutationFn: async (displayName: string) => {
      const supabase = await getSupabase();
      const { error } = await supabase
        .from("users")
        .insert({ id: userId, displayName, createdAt: new Date().toISOString() });

      return error;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["userProfile", userId] });
    },
  });

  return {
    userProfileQuery,
    createUserProfile,
  };
}
