import type { PokemonType } from "@/lib/types";
import type { LucideProps } from "lucide-react";
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

interface Props extends LucideProps {
  type: PokemonType;
}

export const PokemonTypeIcon = ({ type, ...props }: Props) => {
  switch (type) {
    case "rock":
      return <RockType {...props} />;
    case "water":
      return <WaterType {...props} />;
    case "fire":
      return <FireType {...props} />;
    case "grass":
      return <GrassType {...props} />;
    case "ghost":
      return <GhostType {...props} />;
    case "electric":
      return <ElectricType {...props} />;
    case "bug":
      return <BugType {...props} />;
    case "dark":
      return <DarkType {...props} />;
    case "dragon":
      return <DragonType {...props} />;
    case "fairy":
      return <FairyType {...props} />;
    case "fighting":
      return <FightingType {...props} />;
    case "flying":
      return <FlyingType {...props} />;
    case "ground":
      return <GroundType {...props} />;
    case "ice":
      return <IceType {...props} />;
    case "normal":
      return <NormalType {...props} />;
    case "poison":
      return <PoisonType {...props} />;
    case "psychic":
      return <PsychicType {...props} />;
    case "steel":
      return <SteelType {...props} />;
  }
};
