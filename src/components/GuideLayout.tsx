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
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* left edge — denser cluster */}
        <BgAnimal src={bear} className="w-40 md:w-52 -top-3 -left-6" rotate={-12} />
        <BgAnimal src={owl} className="w-28 md:w-36 top-[10%] -left-2" rotate={9} />
        <BgAnimal src={beaver} className="w-36 md:w-48 top-[22%] -left-8" rotate={-7} />
        <BgAnimal src={rabbit} className="w-28 md:w-36 top-[34%] -left-3" rotate={5} />
        <BgAnimal src={fox} className="w-40 md:w-52 top-[46%] -left-9" rotate={-4} />
        <BgAnimal src={bear} className="w-32 md:w-40 top-[58%] -left-5" rotate={11} />
        <BgAnimal src={beaver} className="w-32 md:w-40 top-[70%] -left-7" rotate={-9} />
        <BgAnimal src={fox} className="w-36 md:w-44 top-[82%] -left-4" rotate={6} />
        <BgAnimal src={rabbit} className="w-32 md:w-40 bottom-1 -left-5" rotate={-6} />
        {/* right edge — denser cluster */}
        <BgAnimal src={moose} className="w-44 md:w-60 top-[4%] -right-7" rotate={8} />
        <BgAnimal src={fox} className="w-28 md:w-36 top-[16%] -right-2" rotate={-11} />
        <BgAnimal src={owl} className="w-36 md:w-48 top-[28%] -right-8" rotate={4} />
        <BgAnimal src={rabbit} className="w-32 md:w-40 top-[40%] -right-4" rotate={-8} />
        <BgAnimal src={moose} className="w-32 md:w-40 top-[52%] -right-6" rotate={10} />
        <BgAnimal src={owl} className="w-40 md:w-52 top-[64%] -right-9" rotate={-5} />
        <BgAnimal src={fox} className="w-36 md:w-44 top-[76%] -right-3" rotate={7} />
        <BgAnimal src={rabbit} className="w-40 md:w-48 bottom-2 right-2 md:right-6" rotate={-8} />
        <BgAnimal src={moose} className="w-36 md:w-44 bottom-[12%] -right-5" rotate={-4} />
      </div>
      <div className="relative z-10 mx-auto max-w-2xl px-6 py-20 md:py-28 pointer-events-auto">
        {children}
      </div>
    </main>
  );
}
