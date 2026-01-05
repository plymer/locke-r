import type { PokemonType } from "@/lib/types";
import { PokemonTypeIcon } from "../icons/types/PokemonTypeIcon";
import { cn } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  type: PokemonType;
  showName?: boolean;
}

export const PokemonTypeBanner = ({ type, showName = false, ...props }: Props) => {
  const typeName = type.charAt(0).toUpperCase() + type.slice(1);

  let bgColour = "";
  switch (type) {
    case "normal":
      bgColour = "bg-[#A8A77A]";
      break;
    case "fire":
      bgColour = "bg-[#EE8130]";
      break;
    case "water":
      bgColour = "bg-[#6390F0]";
      break;
    case "electric":
      bgColour = "bg-[#F7D02C]";
      break;
    case "grass":
      bgColour = "bg-[#7AC74C]";
      break;
    case "ice":
      bgColour = "bg-[#96D9D6]";
      break;
    case "fighting":
      bgColour = "bg-[#C22E28]";
      break;
    case "poison":
      bgColour = "bg-[#A33EA1]";
      break;
    case "ground":
      bgColour = "bg-[#E2BF65]";
      break;
    case "flying":
      bgColour = "bg-[#A98FF3]";
      break;
    case "psychic":
      bgColour = "bg-[#F95587]";
      break;
    case "bug":
      bgColour = "bg-[#A6B91A]";
      break;
    case "rock":
      bgColour = "bg-[#B6A136]";
      break;
    case "ghost":
      bgColour = "bg-[#735797]";
      break;
    case "dragon":
      bgColour = "bg-[#6F35FC]";
      break;
    case "dark":
      bgColour = "bg-[#705746]";
      break;
    case "steel":
      bgColour = "bg-[#B7B7CE]";
      break;
    case "fairy":
      bgColour = "bg-[#D685AD]";
      break;
    default:
      bgColour = "bg-gray-200";
  }

  return (
    <div
      {...props}
      className={cn(`${bgColour} flex gap-2 p-2 text-white ${showName ? "" : "rounded-full"}`, props.className)}
    >
      <PokemonTypeIcon type={type} />
      {showName && <span className="italic font-bold">{typeName}</span>}
    </div>
  );
};
