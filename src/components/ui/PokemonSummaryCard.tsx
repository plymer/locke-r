import type { PokemonData, PokemonType } from "@/lib/types";
import { PokemonTypeIcon } from "../icons/types/PokemonTypeIcon";
import { usePokemonData } from "@/hooks/poke-api/usePokemonApiData";
import { POKEMON_TYPE_COLORS } from "@/lib/pokemonDefinitions";
import GenderMale from "../icons/GenderMale";
import GenderFemale from "../icons/GenderFemale";
import { Button } from "./Button";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";
import Pokeball from "../icons/Pokeball";
import { ArrowRightLeft, Computer } from "lucide-react";
import { useUserId } from "@/state-store/user";
import { cn } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  data: PokemonData;
  partyCount: number;
  showActions?: boolean;
}

export const PokemonSummaryCard = ({ data, partyCount, showActions = false, ...props }: Props) => {
  const { nickname, speciesId, level, gender, owner } = data;
  const userId = useUserId();

  const { getByNumber } = usePokemonData();

  const { data: pokemonInfo } = getByNumber(speciesId);

  if (!pokemonInfo) return;

  const pokemonType1 = pokemonInfo.types[0].type.name as PokemonType;
  const pokemonType2 = pokemonInfo.types[1] ? (pokemonInfo.types[1].type.name as PokemonType) : undefined;

  return (
    <div
      {...props}
      className={cn(
        "flex flex-col shrink-0 bg-secondary text-white p-4 rounded-lg place-items-center justify-start shadow-md border border-neutral-800 group",
        props.className
      )}
    >
      <img
        className={`size-32 ${showActions ? "group-hover:scale-105 transition-all" : ""}`}
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${speciesId}.png`}
        alt={nickname}
      />
      <Popover>
        <PopoverTrigger asChild>
          <button
            className={`rounded-full px-2 flex gap-2 py-1 place-items-center ${
              showActions ? "cursor-pointer group-hover:scale-105 transition-all" : ""
            } `}
            style={{
              backgroundImage: `linear-gradient(60deg, ${POKEMON_TYPE_COLORS[pokemonType1]}, ${
                pokemonType2 ? POKEMON_TYPE_COLORS[pokemonType2] : POKEMON_TYPE_COLORS[pokemonType1]
              })`,
            }}
          >
            <div className="flex gap-2">
              <PokemonTypeIcon type={pokemonType1} />
              {pokemonType2 && <PokemonTypeIcon type={pokemonType2} />}
            </div>
            <p className="text-lg font-bold">{nickname}</p>{" "}
            {gender && <p>{gender === "male" ? <GenderMale className="rotate-45" /> : <GenderFemale />} </p>}
            <p className="text-sm">Lv {level}</p>
          </button>
        </PopoverTrigger>
        {showActions && (
          <PopoverContent className="bg-secondary-foreground w-fit" sideOffset={-64}>
            <div className="flex gap-2">
              {userId === owner && (
                <Button disabled={partyCount <= 1}>
                  <Computer />
                  Store
                </Button>
              )}
              <Button>
                <Pokeball />
                View
              </Button>
              {userId === owner && (
                <Button>
                  <ArrowRightLeft />
                  Swap
                </Button>
              )}
            </div>
          </PopoverContent>
        )}
      </Popover>
    </div>
  );
};
