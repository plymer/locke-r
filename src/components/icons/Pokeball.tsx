import { createLucideIcon, type IconNode } from "lucide-react";

const __iconNode: IconNode = [
  [
    "path",
    {
      d: "M3 12a9 9 0 1 0 18 0 9 9 0 1 0 -18 0",
      key: "pokeball0",
    },
  ],
  [
    "path",
    {
      d: "M9 12a3 3 0 1 0 6 0 3 3 0 1 0 -6 0",
      key: "pokeball1",
    },
  ],
  [
    "path",
    {
      d: "M3 12h6",
      key: "pokeball2",
    },
  ],
  [
    "path",
    {
      d: "M15 12h6",
      key: "pokeball3",
    },
  ],
];
const Pokeball = createLucideIcon("Pokeball", __iconNode);

export { __iconNode, Pokeball as default };
