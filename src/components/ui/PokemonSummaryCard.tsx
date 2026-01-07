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

interface Props {
  data: PokemonData;
}

export const PokemonSummaryCard = ({ data }: Props) => {
  const { nickname, speciesId, level, gender } = data;

  const { getByNumber } = usePokemonData();

  const { data: pokemonInfo } = getByNumber(speciesId);

  if (!pokemonInfo) return;

  const pokemonType1 = pokemonInfo.types[0].type.name as PokemonType;
  const pokemonType2 = pokemonInfo.types[1] ? (pokemonInfo.types[1].type.name as PokemonType) : undefined;

  return (
    <div className="flex flex-col bg-secondary text-white p-4 rounded-lg place-items-center justify-start drop-shadow-md border border-neutral-800 group">
      <img
        className="size-32 group-hover:scale-105 transition-all"
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${speciesId}.png`}
        alt={nickname}
      />
      <Popover>
        <PopoverTrigger asChild>
          <button
            className="rounded-full px-2 flex gap-2 py-1 place-items-center group-hover:scale-105 transition-all cursor-pointer"
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
            <span className="text-lg font-bold">{nickname}</span>{" "}
            {gender && <span>{gender === "male" ? <GenderMale className="rotate-45" /> : <GenderFemale />} </span>}
            <span className="text-sm">Lv {level}</span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="bg-secondary-foreground" sideOffset={-64}>
          <div className="flex gap-2">
            <Button>
              <Computer />
              Store
            </Button>
            <Button>
              <Pokeball />
              View
            </Button>
            <Button>
              <ArrowRightLeft />
              Swap
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
