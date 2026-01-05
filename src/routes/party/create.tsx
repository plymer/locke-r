import Loading from "@/components/icons/Loading";
import { useSessionData } from "@/hooks/useSessionData";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { GameGenCard } from "@/components/ui/GameGenCard";
import { STARTERS_BY_GAME, STARTERS_BY_GEN } from "@/lib/starters";
import { usePokemonData } from "@/hooks/usePokemonData";
import { PokemonTypeBanner } from "@/components/ui/PokemonTypeBanner";
import Pokeball from "@/components/icons/Pokeball";

type CreatePartySearch = {
  sessionId: string;
};

export const Route = createFileRoute("/party/create")({
  component: RouteComponent,
  validateSearch: (search): CreatePartySearch => {
    return {
      sessionId: String(search.sessionId),
    };
  },
});

type PartyFormData = {
  name: string;
  starter: string;
};

function RouteComponent() {
  const { sessionId } = Route.useSearch();
  const { getSingleSession } = useSessionData();
  const { data, error, fetchStatus } = getSingleSession(sessionId);
  const { data: pokemonList } = usePokemonData().listAll();

  const { register, handleSubmit, reset } = useForm<PartyFormData>({
    defaultValues: {
      name: "",
      starter: "",
    },
  });

  if (fetchStatus === "fetching") {
    return (
      <div className="flex place-items-center gap-2">
        <Loading className="animate-spin" />
        Loading session data...
      </div>
    );
  }

  if (error || !data?.data) {
    return <div>Error loading session data.</div>;
  }

  const { gameGen, pkmnGameName, instanceName } = data.data;

  const starters = STARTERS_BY_GAME[pkmnGameName as keyof typeof STARTERS_BY_GAME] || STARTERS_BY_GEN[gameGen];

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold">Create a Party for '{instanceName}'</h1>
      <div className="flex bg-secondary text-black rounded-lg p-4 place-items-center gap-2">
        <GameGenCard generation={gameGen} name={pkmnGameName} />

        <form className="bg-secondary text-black p-2 rounded-lg space-y-4 max-w-md grow">
          <div className="space-y-2">
            <Label htmlFor="name">Party Name</Label>
            <Input id="name" type="text" {...register("name")} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="starter">Starter</Label>
            <Input id="starter" type="text" {...register("starter")} />
            <p className="text-sm text-muted-foreground">
              Available starters: {starters.map((s) => s.name).join(", ")}
            </p>
            {starters.map((starter) => (
              <div className="flex gap-2 place-items-center">
                <div className="relative pl-8">
                  <img
                    className="size-24 "
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${starter.number}.png`}
                  />
                  <PokemonTypeBanner
                    type={starter.type1}
                    className="absolute bottom-1 left-1 drop-shadow-2xl opacity-50"
                  />

                  {starter.type2 && (
                    <PokemonTypeBanner
                      type={starter.type2}
                      className="absolute top-1 left-1 drop-shadow-2xl opacity-50"
                    />
                  )}
                </div>
                <p>{starter.name}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Button type="submit">
              <Pokeball className="animate-spin" />
              Start!
            </Button>
            <Button type="button" onClick={() => reset()}>
              Reset
            </Button>
            <Button type="button" variant="destructive">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
