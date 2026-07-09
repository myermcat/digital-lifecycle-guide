import { proseWithMixedLinks } from "@/components/ProseWithExternalLinks";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { CreateSpineStage } from "@/lib/create-phase-content";
import { guideProse, guideProseTight, guideSectionTitle } from "@/lib/guide-typography";

function SpineStepNumber({ n }: { n: number }) {
  return (
    <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-primary/25 bg-background font-sans text-xs font-semibold text-primary">
      {n}
    </span>
  );
}

export function CreateSpineSection({
  id,
  title,
  intro,
  stages,
}: {
  id: string;
  title: string;
  intro?: string;
  stages: readonly CreateSpineStage[];
}) {
  return (
    <section className="mt-10 md:mt-12 scroll-mt-24" id={id}>
      <h2 className={`${guideSectionTitle} mb-4`}>{title}</h2>
      {intro ? <p className={`${guideProse} mb-6`}>{intro}</p> : null}

      <Accordion type="single" collapsible className="mt-4 rounded-lg border border-border bg-card">
        {stages.map((stage, index) => (
            <AccordionItem key={stage.title} value={stage.title}>
              <AccordionTrigger className="gap-3 px-5 py-4 text-left hover:no-underline">
                <span className="flex min-w-0 flex-1 items-center gap-3">
                  <SpineStepNumber n={index + 1} />
                  <span className="min-w-0 font-serif text-base font-semibold text-primary">
                    {stage.title}
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-4">
                <p className={guideProseTight}>
                  {proseWithMixedLinks(stage.text, {
                    external: stage.externalLinks,
                    internal: stage.internalLinks,
                    placeholder: stage.placeholderLinks,
                    placeholderGcNetwork: stage.placeholderGcNetworkLinks,
                    bold: stage.bold,
                  })}
                </p>
              </AccordionContent>
            </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
