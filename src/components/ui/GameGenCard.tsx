import { cn, makeRomanNumeral } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  generation: number;
}

export const GameGenCard = ({ name, generation, ...props }: Props) => {
  return (
    <div
      className={cn("border border-neutral-400 rounded-lg flex flex-col items-center shrink-0", props.className)}
      {...props}
    >
      <img src={`/games/${name.toLowerCase()}.png`} alt={name} className="size-32" />
      <div className="p-2 bg-neutral-900 text-white rounded-b-lg border-t border-neutral-400 w-full text-center">
        <p className="font-bold">{name}</p>
        <p className="text-sm italic">(Gen {makeRomanNumeral(generation)})</p>
      </div>
    </div>
  );
};
