import { cn, makeRomanNumeral } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  generation: number;
}

export const GameGenCard = ({ name, generation, ...props }: Props) => {
  // the games like HeartGold and FireRed need to be formatted like heart-gold and fire-red for the image paths
  // so we need to check for capital letters and insert hyphens accordingly
  const formattedName = name.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

  return (
    <div
      {...props}
      className={cn(props.className, "border border-neutral-400 rounded-lg flex flex-col items-center shrink-0")}
    >
      <img src={`/games/${formattedName}.png`} alt={name} className="size-32" />
      <div className="p-2 bg-neutral-900 text-white rounded-b-lg border-t border-neutral-400 w-full text-center">
        <p className="font-bold">{name}</p>
        <p className="text-sm italic">(Gen {makeRomanNumeral(generation)})</p>
      </div>
    </div>
  );
};
