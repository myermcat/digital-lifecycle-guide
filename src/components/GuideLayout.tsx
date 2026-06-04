import type { ReactNode } from "react";
import bear from "@/assets/animal-bear.png";
import moose from "@/assets/animal-moose.png";
import beaver from "@/assets/animal-beaver.png";
import fox from "@/assets/animal-fox.png";
import owl from "@/assets/animal-owl.png";
import rabbit from "@/assets/animal-rabbit.png";
import { BgAnimal } from "@/components/BgAnimal";

export function GuideLayout({
  children,
  id,
}: {
  children: ReactNode;
  id?: string;
}) {
  return (
    <main
      id={id}
      className="relative isolate min-h-screen bg-background"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <BgAnimal src={bear} className="w-40 md:w-56 -top-6 -left-8" rotate={-12} />
        <BgAnimal src={moose} className="w-44 md:w-64 top-[18%] -right-10" rotate={8} />
        <BgAnimal src={beaver} className="w-36 md:w-48 top-[45%] -left-10" rotate={-6} />
        <BgAnimal src={owl} className="w-36 md:w-52 top-[62%] -right-6" rotate={6} />
        <BgAnimal src={fox} className="w-40 md:w-56 bottom-[8%] -left-6" rotate={4} />
        <BgAnimal src={rabbit} className="w-32 md:w-44 bottom-2 right-4 md:right-16" rotate={-8} />
      </div>
      <div className="relative z-10 mx-auto max-w-2xl px-6 py-20 md:py-28 pointer-events-auto">
        {children}
      </div>
    </main>
  );
}
