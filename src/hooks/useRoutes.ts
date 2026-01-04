import { useQuery } from "@tanstack/react-query";
import { Pokedex } from "pokeapi-js-wrapper";

export const useRoutes = (regionName: string | undefined) => {
  const queryFn = async () => {
    if (!regionName) return null;

    const pokedex = new Pokedex();

    const regionData = await pokedex.getRegionByName(regionName);

    const regionLocations = regionData.locations.map((l) => l.name);

    const locationList = await Promise.all(
      regionLocations.map(async (locationName) => {
        return await pokedex.getLocationByName(locationName);
      })
    ).then((locations) => {
      return locations.map((location) => {
        const name = location.name
          .replace(regionName + "-", "")
          .split("-")
          .map((word) =>
            word === "ss" || word === "hq" || word === "gts"
              ? word.toUpperCase()
              : word.charAt(0).toUpperCase() + word.slice(1)
          )
          .join(" ");

        const areas = location.areas.map((area) => area.name);

        return { name, areas };
      });
    });

    return locationList;
  };

  return useQuery({
    queryKey: ["routes", regionName],
    queryFn: queryFn,
    retry: false,
  });
};
