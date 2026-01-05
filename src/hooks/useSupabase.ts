import { supabase } from "@/lib/utils";
import { useAuth } from "@clerk/clerk-react";

/**
 * A custom hook to create an authenticated Supabase client using Clerk JWTs.
 * @returns A function used to create an authenticated Supabase connection
 */
export const useSupabase = () => {
  const { getToken } = useAuth(); // get the clerk JWT

  const getSupabase = async () => {
    const accessToken = await getToken({ template: "supabase" });
    if (!accessToken) {
      throw new Error(
        "Missing Supabase access token. Create a Clerk JWT template named 'supabase' that uses your Supabase JWT secret."
      );
    }

    return supabase(accessToken);
  };

  return getSupabase;
};
