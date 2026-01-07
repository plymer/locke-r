import { createClient } from "@supabase/supabase-js";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Database } from "./supabase";
import type { PokemonType } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function supabase(accessToken: string | null) {
  return createClient<Database>(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
    {
      global: {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    }
  );
}

export function makeRomanNumeral(num: number): string {
  const romanNumerals: { [key: number]: string } = {
    1: "I",
    2: "II",
    3: "III",
    4: "IV",
    5: "V",
    6: "VI",
    7: "VII",
    8: "VIII",
    9: "IX",
    10: "X",
  };

  return romanNumerals[num] || "";
}

export function getTypeColour(type: PokemonType) {
  switch (type) {
    case "normal":
      return "bg-[#A8A77A]";
    case "fire":
      return "bg-[#EE8130]";
    case "water":
      return "bg-[#6390F0]";
    case "electric":
      return "bg-[#F7D02C]";
    case "grass":
      return "bg-[#7AC74C]";
    case "ice":
      return "bg-[#96D9D6]";
    case "fighting":
      return "bg-[#C22E28]";
    case "poison":
      return "bg-[#A33EA1]";
    case "ground":
      return "bg-[#E2BF65]";
    case "flying":
      return "bg-[#A98FF3]";
    case "psychic":
      return "bg-[#F95587]";
    case "bug":
      return "bg-[#A6B91A]";
    case "rock":
      return "bg-[#B6A136]";
    case "ghost":
      return "bg-[#735797]";
    case "dragon":
      return "bg-[#6F35FC]";
    case "dark":
      return "bg-[#705746]";
    case "steel":
      return "bg-[#B7B7CE]";
    case "fairy":
      return "bg-[#D685AD]";
    default:
      return "bg-gray-200";
  }
}
