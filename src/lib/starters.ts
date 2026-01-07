import type { PokemonGame, StarterPokemon } from "./types";

export const STARTERS_BY_GEN: Record<number, StarterPokemon[]> = {
  1: [
    { name: "Bulbasaur", number: 1, type1: "grass", type2: "poison", startingMoveset: ["tackle", "growl"] },
    { name: "Charmander", number: 4, type1: "fire", startingMoveset: ["scratch", "growl"] },
    { name: "Squirtle", number: 7, type1: "water", startingMoveset: ["tackle", "tail-whip"] },
  ],
  2: [
    { name: "Chikorita", number: 152, type1: "grass", startingMoveset: ["tackle", "growl"] },
    { name: "Cyndaquil", number: 155, type1: "fire", startingMoveset: ["leer", "tackle"] },
    { name: "Totodile", number: 158, type1: "water", startingMoveset: ["scratch", "leer"] },
  ],
  3: [
    { name: "Treecko", number: 252, type1: "grass", startingMoveset: ["pound", "leer"] },
    { name: "Torchic", number: 255, type1: "fire", startingMoveset: ["scratch", "growl"] },
    { name: "Mudkip", number: 258, type1: "water", startingMoveset: ["tackle", "growl"] },
  ],
  4: [
    { name: "Turtwig", number: 387, type1: "grass", startingMoveset: ["tackle", "withdraw"] },
    { name: "Chimchar", number: 390, type1: "fire", startingMoveset: ["leer", "scratch"] },
    { name: "Piplup", number: 393, type1: "water", startingMoveset: ["pound", "growl"] },
  ],
  5: [
    { name: "Snivy", number: 495, type1: "grass", startingMoveset: ["tackle", "leer"] },
    { name: "Tepig", number: 498, type1: "fire", startingMoveset: ["tackle", "tail-whip"] },
    { name: "Oshawott", number: 501, type1: "water", startingMoveset: ["tackle", "tail-whip"] },
  ],
  6: [
    { name: "Chespin", number: 650, type1: "grass", startingMoveset: ["tackle", "growl"] },
    { name: "Fennekin", number: 653, type1: "fire", startingMoveset: ["scratch", "tail-whip"] },
    { name: "Froakie", number: 656, type1: "water", startingMoveset: ["pound", "growl"] },
  ],
  7: [
    { name: "Rowlet", number: 722, type1: "grass", type2: "flying", startingMoveset: ["leafage", "tackle", "growl"] },
    { name: "Litten", number: 725, type1: "fire", startingMoveset: ["scratch", "ember", "growl"] },
    { name: "Popplio", number: 728, type1: "water", startingMoveset: ["pound", "water gun", "growl"] },
  ],
  8: [
    { name: "Grookey", number: 810, type1: "grass", startingMoveset: ["scratch", "growl"] },
    { name: "Scorbunny", number: 813, type1: "fire", startingMoveset: ["tackle", "growl"] },
    { name: "Sobble", number: 816, type1: "water", startingMoveset: ["growl", "pound"] },
  ],
  9: [
    { name: "Sprigatito", number: 906, type1: "grass", startingMoveset: ["leafage", "scratch", "tail-whip"] },
    { name: "Fuecoco", number: 909, type1: "fire", startingMoveset: ["ember", "tackle", "leer"] },
    { name: "Quaxly", number: 912, type1: "water", startingMoveset: ["water gun", "pound", "growl"] },
  ],
} as const;

export const STARTERS_BY_GAME: Record<PokemonGame, StarterPokemon[]> = {
  red: STARTERS_BY_GEN[1],
  blue: STARTERS_BY_GEN[1],
  yellow: [{ name: "Pikachu", number: 25, type1: "electric", startingMoveset: ["thunder-shock", "growl"] }],
  gold: STARTERS_BY_GEN[2],
  silver: STARTERS_BY_GEN[2],
  crystal: STARTERS_BY_GEN[2],
  ruby: STARTERS_BY_GEN[3],
  sapphire: STARTERS_BY_GEN[3],
  emerald: STARTERS_BY_GEN[3],
  firered: STARTERS_BY_GEN[1],
  leafgreen: STARTERS_BY_GEN[1],
  diamond: STARTERS_BY_GEN[4],
  pearl: STARTERS_BY_GEN[4],
  platinum: STARTERS_BY_GEN[4],
  heartgold: STARTERS_BY_GEN[2],
  soulsilver: STARTERS_BY_GEN[2],
  black: STARTERS_BY_GEN[5],
  white: STARTERS_BY_GEN[5],
  "black-2": STARTERS_BY_GEN[5],
  "white-2": STARTERS_BY_GEN[5],
  x: STARTERS_BY_GEN[6],
  y: STARTERS_BY_GEN[6],
  "omega-ruby": STARTERS_BY_GEN[3],
  "alpha-sapphire": STARTERS_BY_GEN[3],
  sun: STARTERS_BY_GEN[7],
  moon: STARTERS_BY_GEN[7],
  "ultra-sun": STARTERS_BY_GEN[7],
  "ultra-moon": STARTERS_BY_GEN[7],
  sword: STARTERS_BY_GEN[8],
  shield: STARTERS_BY_GEN[8],
  "brilliant-diamond": STARTERS_BY_GEN[4],
  "shining-pearl": STARTERS_BY_GEN[4],
  scarlet: STARTERS_BY_GEN[9],
  violet: STARTERS_BY_GEN[9],
} as const;

export const ALL_STARTERS = Object.values(STARTERS_BY_GEN).flat();
