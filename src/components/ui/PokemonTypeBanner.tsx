import type { PokemonType } from "@/lib/types";
import { PokemonTypeIcon } from "../icons/types/PokemonTypeIcon";
import { cn, getTypeColour } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  type: PokemonType;
  showName?: boolean;
}

export const PokemonTypeBanner = ({ type, showName = false, ...props }: Props) => {
  const typeName = type.charAt(0).toUpperCase() + type.slice(1);

  const bgColour = getTypeColour(type);

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
