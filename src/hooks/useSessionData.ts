import { useUserId } from "@/state-store/user";
import { useSupabase } from "./useSupabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useSessionData = () => {
  const userId = useUserId();
  const getSupabase = useSupabase();
  const queryClient = useQueryClient();

  // set up our crud operations

  const getSingleSession = (sessionId: string) => {
    const queryFn = async () => {
      const supabase = await getSupabase();
      const response = await supabase.from("gameInstances").select().eq("id", sessionId).single();
      return response;
    };

    return useQuery({
      queryKey: ["singleSession"],
      queryFn,
    });
  };

  const getSessionParties = (sessionId: string) => {
    const queryFn = async () => {
      const supabase = await getSupabase();
      const response = await supabase.from("parties").select().eq("sessionId", sessionId);
      return response;
    };

    return useQuery({
      queryKey: ["sessionParties", sessionId],
      queryFn,
    });
  };

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

  return { getSingleSession, getSessionParties, getUserSessions, createUserSession };
};
