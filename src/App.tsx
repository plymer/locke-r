import "./App.css";
import { useGenerations } from "./hooks/useGenerations";

function App() {
  // we're going to use PokeAPI as the source of our data
  // we will have a backend server that will handle the fetching of PokeAPI data
  // and our custom teams (pokemon names, status, links, etc)

  const { data, fetchStatus, error } = useGenerations();

  return (
    <div>
      <h1>locke-r</h1>
      {fetchStatus === "fetching" && <p>Loading generations...</p>}
      {error && <p>Error loading generations: {error.stack}</p>}
      {data && (
        <ul>
          {data.results.map((generation) => (
            <li key={generation.name}>{generation.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
