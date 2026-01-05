import type { PokemonGame, PokemonType } from "./types";

export const STARTERS_BY_GEN: Record<
  number,
  { name: string; number: number; type1: PokemonType; type2?: PokemonType }[]
> = {
  1: [
    { name: "Bulbasaur", number: 1, type1: "grass", type2: "poison" },
    { name: "Charmander", number: 4, type1: "fire" },
    { name: "Squirtle", number: 7, type1: "water" },
  ],
  2: [
    { name: "Chikorita", number: 152, type1: "grass" },
    { name: "Cyndaquil", number: 155, type1: "fire" },
    { name: "Totodile", number: 158, type1: "water" },
  ],
  3: [
    { name: "Treecko", number: 252, type1: "grass" },
    { name: "Torchic", number: 255, type1: "fire" },
    { name: "Mudkip", number: 258, type1: "water" },
  ],
  4: [
    { name: "Turtwig", number: 387, type1: "grass" },
    { name: "Chimchar", number: 390, type1: "fire" },
    { name: "Piplup", number: 393, type1: "water" },
  ],
  5: [
    { name: "Snivy", number: 495, type1: "grass" },
    { name: "Tepig", number: 498, type1: "fire" },
    { name: "Oshawott", number: 501, type1: "water" },
  ],
  6: [
    { name: "Chespin", number: 650, type1: "grass" },
    { name: "Fennekin", number: 653, type1: "fire" },
    { name: "Froakie", number: 656, type1: "water" },
  ],
  7: [
    { name: "Rowlet", number: 722, type1: "grass", type2: "flying" },
    { name: "Litten", number: 725, type1: "fire" },
    { name: "Popplio", number: 728, type1: "water" },
  ],
  8: [
    { name: "Grookey", number: 810, type1: "grass" },
    { name: "Scorbunny", number: 813, type1: "fire" },
    { name: "Sobble", number: 816, type1: "water" },
  ],
  9: [
    { name: "Sprigatito", number: 906, type1: "grass" },
    { name: "Fuecoco", number: 909, type1: "fire" },
    { name: "Quaxly", number: 912, type1: "water" },
  ],
} as const;

export const STARTERS_BY_GAME: Record<
  PokemonGame,
  { name: string; number: number; type1: PokemonType; type2?: PokemonType }[]
> = {
  Red: STARTERS_BY_GEN[1],
  Blue: STARTERS_BY_GEN[1],
  Yellow: [{ name: "Pikachu", number: 25, type1: "electric" }],
  Gold: STARTERS_BY_GEN[2],
  Silver: STARTERS_BY_GEN[2],
  Crystal: STARTERS_BY_GEN[2],
  Ruby: STARTERS_BY_GEN[3],
  Sapphire: STARTERS_BY_GEN[3],
  Emerald: STARTERS_BY_GEN[3],
  FireRed: STARTERS_BY_GEN[1],
  LeafGreen: STARTERS_BY_GEN[1],
  Diamond: STARTERS_BY_GEN[4],
  Pearl: STARTERS_BY_GEN[4],
  Platinum: STARTERS_BY_GEN[4],
  HeartGold: STARTERS_BY_GEN[2],
  SoulSilver: STARTERS_BY_GEN[2],
  Black: STARTERS_BY_GEN[5],
  White: STARTERS_BY_GEN[5],
  "Black 2": STARTERS_BY_GEN[5],
  "White 2": STARTERS_BY_GEN[5],
  X: STARTERS_BY_GEN[6],
  Y: STARTERS_BY_GEN[6],
  "Omega Ruby": STARTERS_BY_GEN[3],
  "Alpha Sapphire": STARTERS_BY_GEN[3],
  Sun: STARTERS_BY_GEN[7],
  Moon: STARTERS_BY_GEN[7],
  "Ultra Sun": STARTERS_BY_GEN[7],
  "Ultra Moon": STARTERS_BY_GEN[7],
  Sword: STARTERS_BY_GEN[8],
  Shield: STARTERS_BY_GEN[8],
  "Brilliant Diamond": STARTERS_BY_GEN[4],
  "Shining Pearl": STARTERS_BY_GEN[4],
  Scarlet: STARTERS_BY_GEN[9],
  Violet: STARTERS_BY_GEN[9],
} as const;

export const ALL_STARTERS = Object.values(STARTERS_BY_GEN).flat();
