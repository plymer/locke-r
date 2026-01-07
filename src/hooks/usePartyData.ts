import { useSupabase } from "./useSupabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { PokemonInsertData } from "@/lib/types";
import { useRouter } from "@tanstack/react-router";

export const usePartyData = () => {
  const router = useRouter();
  const getSupabase = useSupabase();
  const queryClient = useQueryClient();

  const handlePokemonMovementSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["sessionParties", "userParty"] });
  };

  // set up our crud operations

  const getUserParty = (sessionId: string, userId: string) => {
    const queryFn = async () => {
      const supabase = await getSupabase();
      const response = await supabase
        .from("parties")
        .select()
        .eq("gameInstance", sessionId)
        .eq("owner", userId)
        .single();
      return response;
    };

    return useQuery({
      queryKey: ["userParty"],
      queryFn,
    });
  };

  /**
   * A hook to get all parties for a given session. Uses the same queryKey as the `getSessionParties` function in the `useSessionData` hook for caching consistency.
   * @param sessionId the uuid of the current session
   * @returns Party data for all parties in the session
   */
  const getAllSessionParties = (sessionId: string) => {
    const queryFn = async () => {
      const supabase = await getSupabase();
      const response = await supabase.from("parties").select().eq("gameInstance", sessionId);
      return response;
    };

    return useQuery({
      queryKey: ["sessionParties", sessionId],
      queryFn,
    });
  };

  /**
   * Creates a new (fresh) party and initializes one Pokemon into the monsters table. If there are other parties in the session, links will be made to those parties' starters in the monsterLinks table.
   */
  const createNewParty = useMutation({
    mutationFn: async (variables: {
      userId: string;
      sessionId: string;
      partyName: string;
      starterPokemon: PokemonInsertData;
    }) => {
      const { userId, sessionId, partyName, starterPokemon } = variables;

      const supabase = await getSupabase();

      if (!userId) throw new Error("User ID is required to create user session");

      // create our starter pokemon first
      const { data: monsterData, error: monsterError } = await supabase
        .from("monsters")
        .insert({
          ...starterPokemon,
          owner: userId,
          dateCaught: new Date().toISOString(),
          gameInstance: sessionId,
        })
        .select()
        .single();

      if (monsterError || !monsterData) {
        throw new Error(monsterError?.stack || "Failed to create starter Pokemon");
      }

      const monsterId = monsterData.id;

      const { data: partyData, error: partyError } = await supabase
        .from("parties")
        .insert({
          owner: userId,
          gameInstance: sessionId,
          slotOne: monsterId,
          partyName,
          createdAt: new Date().toISOString(),
          modifiedAt: new Date().toISOString(),
        })
        .select()
        .single();

      if (partyError || !partyData) {
        throw new Error(partyError?.message || "Failed to create party");
      }

      // now check to see if there are other parties in this session already, so we can make links between the starters
      const { data: existingPartiesData, error: existingPartiesError } = await supabase
        .from("parties")
        .select()
        .eq("gameInstance", sessionId)
        .neq("id", partyData.id); // exclude the party we just created

      if (existingPartiesError) {
        throw new Error(existingPartiesError.message || "Failed to fetch existing parties for linking");
      }

      // get any links that already exist in our session
      const { data: existingLinksData, error: existingLinksError } = await supabase
        .from("monsterLinks")
        .select()
        .eq("gameInstance", sessionId);

      if (existingLinksError) {
        throw new Error(existingLinksError.message || "Failed to fetch existing monster links");
      }

      let alreadyLinked = false;

      if (!existingPartiesData || existingPartiesData.length === 0) return;

      // for each existing party, create a link between the new party's starter and the existing party's starter

      for (const existingParty of existingPartiesData) {
        if (existingLinksData && existingLinksData.length > 0) {
          for (const link of existingLinksData) {
            if (link.slotOne === monsterId || link.slotTwo === monsterId || link.slotThree === monsterId) {
              alreadyLinked = true;
            }
          }
        }

        if (alreadyLinked) continue; // skip to the next existing party

        // get the link entry that has the existing party's starter in it
        const matchToPopulate = existingLinksData.find(
          (link) =>
            link.slotOne === existingParty.slotOne ||
            link.slotTwo === existingParty.slotOne ||
            link.slotThree === existingParty.slotOne
        );

        if (!matchToPopulate) {
          throw new Error("No matching monster link found for existing party starter");
        }

        // default to the second slot, but check if it's already filled
        let columnToUse: "slotTwo" | "slotThree" = "slotTwo";

        if (matchToPopulate?.slotTwo && !matchToPopulate?.slotThree) {
          columnToUse = "slotThree";
        }

        // create the link from our new monster to the existing party's starter
        const { error: linkError } = await supabase
          .from("monsterLinks")
          .update({ [columnToUse]: monsterId })
          .eq("id", matchToPopulate.id);

        if (linkError) {
          throw new Error(linkError.message || "Failed to create monster link");
        }
      }

      return;
    },
    onSuccess: async (_data, { sessionId }) => {
      // Invalidate first
      queryClient.invalidateQueries({ queryKey: ["userParty"] });
      queryClient.invalidateQueries({ queryKey: ["sessionParties", sessionId] });

      router.clearCache();

      // Now navigate with the fresh data in cache
      router.navigate({ to: "/session/$sessionId", params: { sessionId } });
    },
    onError: (error) => {
      console.error("Error creating party:", error);
    },
  });

  const addPokemonToParty = useMutation({
    mutationFn: async (variables: { partyId: string; monsterId: number }) => {
      const { partyId, monsterId } = variables;

      const supabase = await getSupabase();

      const { data: partyData, error: partyError } = await supabase.from("parties").select().eq("id", partyId).single();

      if (partyError || !partyData) {
        throw new Error(partyError?.message || "Failed to fetch party data");
      }

      const availableColumns = partyData
        ? ["slotOne", "slotTwo", "slotThree", "slotFour", "slotFive", "slotSix"].filter(
            (col) =>
              partyData[col as "slotOne" | "slotTwo" | "slotThree" | "slotFour" | "slotFive" | "slotSix"] === null
          )
        : [];

      const columnToUse = availableColumns[0];

      if (availableColumns.length === 0) {
        throw new Error("Party is already full");
      }

      const { error } = await supabase
        .from("parties")
        .update({ [columnToUse]: monsterId, modifiedAt: new Date().toISOString() })
        .eq("id", partyId);

      if (error) {
        throw new Error(error.message || "Failed to add Pokemon to party");
      }

      return;
    },
    onSuccess: handlePokemonMovementSuccess,
  });

  const removePokemonFromParty = useMutation({
    mutationFn: async (variables: { partyId: string; monsterId: number }) => {
      const { partyId, monsterId } = variables;

      const supabase = await getSupabase();

      const { data: partyData, error: partyError } = await supabase.from("parties").select().eq("id", partyId).single();

      if (partyError || !partyData) {
        throw new Error(partyError?.message || "Failed to fetch party data");
      }

      const columnToClear = ["slotOne", "slotTwo", "slotThree", "slotFour", "slotFive", "slotSix"].find(
        (col) =>
          partyData[col as "slotOne" | "slotTwo" | "slotThree" | "slotFour" | "slotFive" | "slotSix"] === monsterId
      );

      if (!columnToClear) {
        throw new Error("Monster not found in party");
      }

      const { error } = await supabase
        .from("parties")
        .update({ [columnToClear]: null, modifiedAt: new Date().toISOString() })
        .eq("id", partyId);

      if (error) {
        throw new Error(error.message || "Failed to remove Pokemon from party");
      }

      return;
    },
    onSuccess: handlePokemonMovementSuccess,
  });

  const swapPokemonBetweenPartyAndBox = useMutation({
    mutationFn: async (variables: { partyId: string; monsterIdInParty: number; monsterIdInBox: number }) => {
      const { partyId, monsterIdInParty, monsterIdInBox } = variables;

      const supabase = await getSupabase();

      const { data: partyData, error: partyError } = await supabase.from("parties").select().eq("id", partyId).single();

      if (partyError || !partyData) {
        throw new Error(partyError?.message || "Failed to fetch party data");
      }

      const columnToSwapOut = ["slotOne", "slotTwo", "slotThree", "slotFour", "slotFive", "slotSix"].find(
        (col) =>
          partyData[col as "slotOne" | "slotTwo" | "slotThree" | "slotFour" | "slotFive" | "slotSix"] ===
          monsterIdInParty
      );

      if (!columnToSwapOut) {
        throw new Error("Monster to swap out not found in party");
      }

      const { error } = await supabase
        .from("parties")
        .update({ [columnToSwapOut]: monsterIdInBox, modifiedAt: new Date().toISOString() })
        .eq("id", partyId);

      if (error) {
        throw new Error(error.message || "Failed to swap Pokemon between party and box");
      }

      return;
    },
    onSuccess: handlePokemonMovementSuccess,
  });

  return {
    getUserParty,
    getAllSessionParties,
    createNewParty,
    addPokemonToParty,
    removePokemonFromParty,
    swapPokemonBetweenPartyAndBox,
  };
};
