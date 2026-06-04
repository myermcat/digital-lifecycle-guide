import bear from "@/assets/animal-bear.png";
import moose from "@/assets/animal-moose.png";
import beaver from "@/assets/animal-beaver.png";
import fox from "@/assets/animal-fox.png";
import owl from "@/assets/animal-owl.png";
import rabbit from "@/assets/animal-rabbit.png";
import { BgAnimal } from "@/components/BgAnimal";

/** Vertical gap between animals along the same edge (px). */
export const ANIMAL_SPACING = 560;
const TOP_INSET = 72;
const BOTTOM_INSET = 96;
/** Right column starts half a spacing lower so the two sides do not line up. */
const RIGHT_STAGGER = ANIMAL_SPACING / 2;

type AnimalPreset = {
  src: string;
  className: string;
  rotate: number;
};

const LEFT_PRESETS: AnimalPreset[] = [
  { src: bear, className: "w-40 md:w-52 -left-6", rotate: -12 },
  { src: owl, className: "w-28 md:w-36 -left-2", rotate: 9 },
  { src: beaver, className: "w-36 md:w-48 -left-8", rotate: -7 },
  { src: rabbit, className: "w-28 md:w-36 -left-3", rotate: 5 },
  { src: fox, className: "w-40 md:w-52 -left-9", rotate: -4 },
  { src: bear, className: "w-32 md:w-40 -left-5", rotate: 11 },
  { src: beaver, className: "w-32 md:w-40 -left-7", rotate: -9 },
  { src: fox, className: "w-36 md:w-44 -left-4", rotate: 6 },
  { src: rabbit, className: "w-32 md:w-40 -left-5", rotate: -6 },
];

const RIGHT_PRESETS: AnimalPreset[] = [
  { src: moose, className: "w-44 md:w-60 -right-7", rotate: 8 },
  { src: fox, className: "w-28 md:w-36 -right-2", rotate: -11 },
  { src: owl, className: "w-36 md:w-48 -right-8", rotate: 4 },
  { src: rabbit, className: "w-32 md:w-40 -right-4", rotate: -8 },
  { src: moose, className: "w-32 md:w-40 -right-6", rotate: 10 },
  { src: owl, className: "w-40 md:w-52 -right-9", rotate: -5 },
  { src: fox, className: "w-36 md:w-44 -right-3", rotate: 7 },
  { src: rabbit, className: "w-40 md:w-48 right-2 md:right-6", rotate: -8 },
  { src: moose, className: "w-36 md:w-44 -right-5", rotate: -4 },
];

function positionsAlongEdge(height: number, start: number): number[] {
  const maxY = height - BOTTOM_INSET;
  const ys: number[] = [];
  for (let y = start; y < maxY; y += ANIMAL_SPACING) {
    ys.push(y);
  }
  return ys;
}

export function BgAnimalField({ pageHeight }: { pageHeight: number }) {
  const leftYs = positionsAlongEdge(pageHeight, TOP_INSET);
  const rightYs = positionsAlongEdge(pageHeight, TOP_INSET + RIGHT_STAGGER);

  return (
    <>
      {leftYs.map((top, i) => {
        const preset = LEFT_PRESETS[i % LEFT_PRESETS.length];
        return (
          <BgAnimal
            key={`l-${top}`}
            src={preset.src}
            className={preset.className}
            rotate={preset.rotate}
            top={top}
          />
        );
      })}
      {rightYs.map((top, i) => {
        const preset = RIGHT_PRESETS[i % RIGHT_PRESETS.length];
        return (
          <BgAnimal
            key={`r-${top}`}
            src={preset.src}
            className={preset.className}
            rotate={preset.rotate}
            top={top}
          />
        );
      })}
    </>
  );
}
