// Character sticker pack — one import per pose.
// Add a new import + array entry here when you add a PNG to this folder.
import paintbrush from "./Paintbrush.png";
import space from "./space.png";
import bug from "./bug.png";
import energy from "./energy.png";
import headLight from "./head-light.png";
import headDark from "./head-dark.png";
import pirate from "./pirate.png";
import sixtySeven from "./67.png";
import flowers from "./flowers.png";
import zen from "./zen.png";
import dj from "./dj.png";
import pencil from "./pencil.png";
import buff from "./buff.png";
import bob from "./bob.png";
import sleep from "./sleep.png";
import surf from "./surf.png";
import gentube from "./gentube.png";
import pirategt from "./pirate-gt.png";

export interface CharacterSticker {
  title: string;
  src: string;
  // Optional one-line explanation shown in the lightbox caption.
  note?: string;
}
export { headDark };

export const CHARACTERS: CharacterSticker[] = [
  { title: "Paintbrush", src: paintbrush },
  { title: "Astronaut", src: space },
  { title: "Bug Hunter", src: bug },
  { title: "Energy Booster", src: energy },
  { title: "Head (Light)", src: headLight },
  { title: "Head (Dark)", src: headDark },
  { title: "Pirate", src: pirate },
  { title: "Peg-leg", src: pirategt },
  { title: "Six Seven", src: sixtySeven },
  { title: "Flowers", src: flowers },
  { title: "Zen", src: zen },
  { title: "DJ", src: dj },
  { title: "Pencil", src: pencil },
  { title: "Buff", src: buff },
  { title: "Painter", src: bob },
  { title: "Sleep", src: sleep },
  { title: "Surf", src: surf },
  { title: "GenTube Gallery", src: gentube },
];
