import { useState } from "react";
import { useGenerations } from "./hooks/useGenerations";
import { Button } from "./components/ui/Button";
import { ButtonGroup } from "./components/ui/ButtonGroup";
import { useRoutes } from "./hooks/useRoutes";

function App() {
  // we're going to use PokeAPI as the source of our data
  // we will have a backend server that will handle the fetching of PokeAPI data
  // and our custom teams (pokemon names, status, links, etc)

  const [gen, setGen] = useState(1);

  const generations = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const { data: genData, fetchStatus, error } = useGenerations(gen);
  const {
    data: routeData,
    fetchStatus: routeFetchStatus,
    error: routeError,
  } = useRoutes(genData?.main_region.name);

  const formattedRegionName = genData?.main_region.name
    ? genData.main_region.name.charAt(0).toUpperCase() +
      genData.main_region.name.slice(1)
    : "No Region Name Found";

  return (
    <div>
      <h1 className="text-3xl">locke-r</h1>
      <ButtonGroup orientation="horizontal">
        {generations.map((generation) => (
          <Button
            key={generation}
            onClick={() => setGen(generation)}
            variant={gen !== generation ? "default" : "defaultSelected"}
          >
            Gen {generation}
          </Button>
        ))}
      </ButtonGroup>
      {fetchStatus === "fetching" && <p>Loading generations...</p>}
      {error && <p>Error loading generations: {error.stack}</p>}
      {genData && (
        <div>
          <h2>{formattedRegionName}</h2>
        </div>
      )}
      {routeFetchStatus === "fetching" && <p>Loading route data...</p>}
      {routeError && <p>Error loading routes: {routeError.stack}</p>}
      {routeData && (
        <>
          {routeData.map((l, idx) => (
            <div key={idx}>
              <p>{l.name}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default App;
