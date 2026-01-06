import { useUserId } from "@/state-store/user";
import { useSupabase } from "./useSupabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { PokemonData, PokemonInsertData } from "@/lib/types";
import { useSessionId } from "@/state-store/session";

export const usePokemonData = () => {
  const userId = useUserId();
  const sessionId = useSessionId();
  const getSupabase = useSupabase();
  const queryClient = useQueryClient();

  const handleMutationSuccess = (data?: number) => {
    queryClient.invalidateQueries({ queryKey: ["userPokemon", userId] });
    queryClient.invalidateQueries({ queryKey: ["sessionParties", sessionId] });

    return data;
  };

  // set up our crud operations

  const getUserPokemon = (userId: string) => {
    const queryFn = async () => {
      const supabase = await getSupabase();
      const response = await supabase.from("monsters").select().eq("ownwer", userId);
      return response;
    };

    return useQuery({
      queryKey: ["userPokemon", userId],
      queryFn,
    });
  };

  const getPokemonById = (pokemonId: number) => {
    const queryFn = async () => {
      const supabase = await getSupabase();
      const response = await supabase.from("monsters").select().eq("id", pokemonId).single();
      return response;
    };

    return useQuery({
      queryKey: ["pokemonById", pokemonId],
      queryFn,
    });
  };

  const getLinkedPokemon = (monsterId: number) => {
    const queryFn = async () => {
      const supabase = await getSupabase();
      const response = await supabase
        .from("monsterLinks")
        .select()
        .or(`slotOne.eq.${monsterId},slotTwo.eq.${monsterId},slotThree.eq.${monsterId}`);
      return response;
    };

    return useQuery({
      queryKey: ["linkedPokemon", monsterId],
      queryFn,
    });
  };

  const getPokemonByLocation = (location: string) => {
    const queryFn = async () => {
      const supabase = await getSupabase();
      const response = await supabase.from("monsters").select().eq("locationCaught", location);
      return response;
    };

    return useQuery({
      queryKey: ["pokemonByLocation", location],
      queryFn,
    });
  };

  const createPokemon = useMutation({
    mutationFn: async (variables: PokemonInsertData) => {
      if (!userId) {
        throw new Error("User ID is required to create Pokemon");
      }

      if (!sessionId) {
        throw new Error("Session ID is required to create Pokemon");
      }

      const supabase = await getSupabase();
      const { data, error } = await supabase
        .from("monsters")
        .insert({ ...variables, owner: userId, dateCaught: new Date().toISOString(), gameInstance: sessionId })
        .select()
        .single();

      if (error) {
        throw new Error(error.message || "Failed to create Pokemon");
      }

      return data.id;
    },
    onSuccess: (data) => handleMutationSuccess(data),
  });

  const updatePokemon = useMutation({
    mutationFn: async (variables: PokemonData) => {
      const supabase = await getSupabase();
      const { error } = await supabase
        .from("monsters")
        .update({ ...variables })
        .eq("id", variables.id);

      if (error) {
        throw new Error(error.message || "Failed to update Pokemon");
      }

      return;
    },
    onSuccess: () => handleMutationSuccess(),
  });

  return { getUserPokemon, getPokemonById, getLinkedPokemon, getPokemonByLocation, createPokemon, updatePokemon };
};
