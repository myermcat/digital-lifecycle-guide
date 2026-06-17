import type { ReactNode } from "react";
import bear from "@/assets/animal-bear.png";
import fox from "@/assets/animal-fox.png";

const ANIMAL_META = {
  bear: { src: bear, rotate: -10 },
  fox: { src: fox, rotate: -5 },
} as const;

export function AnimalIllustrationPanel({
  animal,
  children,
}: {
  animal: keyof typeof ANIMAL_META;
  children: ReactNode;
}) {
  const { src, rotate } = ANIMAL_META[animal];

  return (
    <div className="flex flex-col items-center gap-10 py-8 md:flex-row md:items-center md:gap-14 lg:gap-20 md:py-12 lg:py-16">
      <figure className="order-1 shrink-0 w-full max-w-[11rem] sm:max-w-[13rem] md:order-none md:w-[42%] md:max-w-[15rem] lg:max-w-[17rem] flex justify-center md:justify-end">
        <img
          src={src}
          alt=""
          aria-hidden="true"
          width={512}
          height={512}
          className="w-full h-auto opacity-90"
          style={{ transform: `rotate(${rotate}deg)` }}
        />
      </figure>
      <div className="order-2 min-w-0 w-full max-w-md md:order-none md:flex-1 text-center md:text-left">
        {children}
      </div>
    </div>
  );
}
