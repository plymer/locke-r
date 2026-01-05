import type { PokemonType } from "@/lib/types";
import RockType from "./RockType";
import WaterType from "./WaterType";
import FireType from "./FireType";
import GrassType from "./GrassType";
import GhostType from "./GhostType";
import ElectricType from "./ElectricType";
import BugType from "./BugType";
import DarkType from "./DarkType";
import DragonType from "./DragonType";
import FairyType from "./FairyType";
import FightingType from "./FightingType";
import FlyingType from "./FlyingType";
import GroundType from "./GroundType";
import IceType from "./IceType";
import NormalType from "./NormalType";
import PoisonType from "./PoisonType";
import PsychicType from "./PsychicType";
import SteelType from "./SteelType";

interface Props {
  type: PokemonType;
}

export const PokemonTypeIcon = ({ type }: Props) => {
  switch (type) {
    case "rock":
      return <RockType />;
    case "water":
      return <WaterType />;
    case "fire":
      return <FireType />;
    case "grass":
      return <GrassType />;
    case "ghost":
      return <GhostType />;
    case "electric":
      return <ElectricType />;
    case "bug":
      return <BugType />;
    case "dark":
      return <DarkType />;
    case "dragon":
      return <DragonType />;
    case "fairy":
      return <FairyType />;
    case "fighting":
      return <FightingType />;
    case "flying":
      return <FlyingType />;
    case "ground":
      return <GroundType />;
    case "ice":
      return <IceType />;
    case "normal":
      return <NormalType />;
    case "poison":
      return <PoisonType />;
    case "psychic":
      return <PsychicType />;
    case "steel":
      return <SteelType />;
  }
};
