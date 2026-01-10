import { useGameInfoByName } from "@/hooks/poke-api/useGameApiData";
import type { PokemonGame } from "@/lib/types";
import { cn, makeRomanNumeral } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  name: PokemonGame;
  generation: number;
  orientation?: "horizontal" | "vertical";
}

export const GameGenCard = ({ name, generation, orientation = "vertical", ...props }: Props) => {
  const { data: apiGameName } = useGameInfoByName(name);

  return (
    <div
      {...props}
      className={cn(
        props.className,
        `flex ${
          orientation === "vertical" ? "border border-neutral-400 flex-col rounded-lg md:shrink-0" : "md:gap-2"
        } max-md:flex-col items-center`
      )}
    >
      <img src={`/games/${name}.png`} alt={apiGameName} className="size-32" />
      {orientation === "vertical" && (
        <div className="p-2 bg-neutral-900 text-white rounded-b-lg border-t border-neutral-400 w-full text-center h-full">
          <p className="font-bold">{apiGameName}</p>
          <p className="text-sm italic">(Gen {makeRomanNumeral(generation)})</p>
          {props.children}
        </div>
      )}
      {orientation === "horizontal" && (
        <div className="p-2 bg-neutral-900 flex max-md:flex-col place-items-center md:gap-4 w-full text-white h-full ">
          <div className="text-center max-md:flex max-md:gap-2 max-md:place-items-center">
            <p className="font-bold">{apiGameName}</p>
            <p className="text-sm italic">(Gen {makeRomanNumeral(generation)})</p>
          </div>
          <div>{props.children}</div>
        </div>
      )}
    </div>
  );
};
