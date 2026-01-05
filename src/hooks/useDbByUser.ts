import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSupabase } from "./useSupabase";

export function useDbByUser(userId: string | undefined | null) {
  const queryClient = useQueryClient();
  const getSupabase = useSupabase();

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

  return {
    getUserProfile,
    createUserProfile,
    updateDisplayName,
    updateLastLogin,
  };
}
