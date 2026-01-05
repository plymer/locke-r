import { supabase } from "@/lib/utils";
import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useDbByUser(userId: string | undefined | null) {
  const queryClient = useQueryClient();
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

  const getUserProfile = useQuery({
    queryKey: ["userProfile", userId],
    enabled: Boolean(userId),
    queryFn: async () => {
      if (!userId) throw new Error("User ID is required to fetch user profile");

      const supabase = await getSupabase();
      const response = await supabase.from("users").select().eq("id", userId).single();
      return response;
    },
  });

  const createUserProfile = useMutation({
    mutationFn: async (displayName: string) => {
      if (!userId) throw new Error("User ID is required to modify user profile");

      const supabase = await getSupabase();
      const { error } = await supabase.from("users").insert({
        id: userId,
        displayName,
        createdAt: new Date().toISOString(),
        lastLoggedIn: new Date().toISOString(),
      });

      return error;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["userProfile", userId] });
    },
  });

  const updateDisplayName = useMutation({
    mutationFn: async (displayName: string) => {
      if (!userId) throw new Error("User ID is required to modify user profile");

      const supabase = await getSupabase();
      const { error } = await supabase.from("users").update({ displayName }).eq("id", userId);

      return { error };
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["userProfile", userId] });
    },
  });

  const updateLastLogin = useMutation({
    mutationFn: async () => {
      if (!userId) throw new Error("User ID is required to modify user profile");

      const supabase = await getSupabase();
      const { error } = await supabase
        .from("users")
        .update({ lastLoggedIn: new Date().toISOString() })
        .eq("id", userId);

      return { error };
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["userProfile", userId] });
    },
  });

  const getUserSessions = useQuery({
    queryKey: ["userSessions", userId],
    enabled: Boolean(userId),
    queryFn: async () => {
      if (!userId) throw new Error("User ID is required to fetch user sessions");

      const supabase = await getSupabase();
      const response = await supabase
        .from("gameInstances")
        .select()
        .or(`owner.eq.${userId},playerTwo.eq.${userId},playerThree.eq.${userId}`);
      return response;
    },
  });

  const createUserSession = useMutation({
    mutationFn: async (variables: { instanceName: string; gameGen: number; pkmnGameName: string }) => {
      const { instanceName, gameGen, pkmnGameName } = variables;

      if (!userId) throw new Error("User ID is required to create user session");

      const supabase = await getSupabase();
      const { error } = await supabase.from("gameInstances").insert({
        owner: userId,
        instanceName,
        gameGen,
        pkmnGameName,
        createdAt: new Date().toISOString(),
        lastPlayed: new Date().toISOString(),
      });

      return error;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["userSessions", userId] });
    },
  });

  return {
    getUserProfile,
    createUserProfile,
    updateDisplayName,
    updateLastLogin,
    getUserSessions,
    createUserSession,
  };
}
