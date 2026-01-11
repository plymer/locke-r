import { useQuery } from "@tanstack/react-query";
import { Pokedex } from "pokeapi-js-wrapper";

export const useItemData = () => {
  const getHoldableItemListByGeneration = (gen: string | undefined) => {
    const queryFn = async () => {
      const pokedex = new Pokedex();

      const holdableItemList = await pokedex.getItemAttributeByName("holdable-active");

      // look up all of the items and then filter by generation

      const itemsInGeneration = [];

      for (const item of holdableItemList.items) {
        const itemData = await pokedex.getItemByName(item.name);

        const includeItem = itemData.game_indices.some((index) => index.generation.name === gen);

        if (includeItem) itemsInGeneration.push(itemData);
      }

      return itemsInGeneration;
    };
    return useQuery({
      queryKey: ["holdableItemList", gen],
      queryFn: queryFn,
      retry: false,
    });
  };

  return { getHoldableItemListByGeneration };
};
