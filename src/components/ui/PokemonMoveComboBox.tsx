import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/Command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";
import type { PokemonData } from "@/lib/types";

interface PokemonMoveComboBoxProps extends React.ComponentProps<typeof PopoverTrigger> {
  pkmnId: number;
  moves: { label: string; value: string }[];
  placeholder?: string;
  column: keyof PokemonData;
  value: string | undefined;
  onValueChange: <K extends keyof PokemonData>(pokemonId: number, column: K, data: PokemonData[K]) => void;
}

export const PokemonMoveComboBox = ({
  pkmnId,
  moves,
  placeholder,
  column,
  value,
  onValueChange,
  ...props
}: PokemonMoveComboBoxProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger id={props.id} asChild>
        <Button
          variant="outlineNoHover"
          role="combobox"
          aria-expanded={open}
          className="w-50 justify-between cursor-default"
        >
          {value ? moves?.find((move) => move.value === value)?.label : "Select move..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-50 p-0">
        <Command>
          <CommandInput placeholder={placeholder} className="h-9" />
          <CommandList>
            <CommandEmpty>No move found.</CommandEmpty>
            <CommandGroup>
              {moves?.map((move) => (
                <CommandItem
                  key={move.value}
                  value={move.value}
                  onSelect={() => {
                    onValueChange(pkmnId, column, move.value as PokemonData[typeof column]);
                    setOpen(false);
                  }}
                >
                  {move.label
                    .split("-")
                    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
                    .join(" ")}
                  <Check
                    className={cn("ml-auto group-[]:text-white", value === move.value ? "opacity-100" : "opacity-0")}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
