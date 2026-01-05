import { supabase } from "@/lib/utils";
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";

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

    return supabase(accessToken);
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
