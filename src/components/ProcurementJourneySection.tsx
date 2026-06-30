import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { proseWithMixedLinks } from "@/components/ProseWithExternalLinks";
import type { ProcurementJourneyStep } from "@/lib/procurement-landing";
import { guideProse, guideProseTight, guideSectionTitle } from "@/lib/guide-typography";

function JourneyStepNumber({ n }: { n: number }) {
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 font-sans text-xs font-semibold text-primary">
      {n}
    </span>
  );
}

export function ProcurementJourneySection({
  sectionId = "how-a-procurement-goes",
  heading = "How a procurement goes",
  intro,
  steps,
}: {
  sectionId?: string;
  heading?: string;
  intro: string;
  steps: ProcurementJourneyStep[];
}) {
  return (
    <section className="mt-10 md:mt-12 scroll-mt-24" id={sectionId}>
      <h2 className={`${guideSectionTitle} mb-4`}>{heading}</h2>

      <div className="mb-6 overflow-x-auto pb-1">
        <ol className="flex min-w-max gap-2 list-none pl-0">
          {steps.map((step, index) => (
            <li
              key={step.label}
              className="flex flex-col items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2.5 min-w-[4.5rem]"
            >
              <JourneyStepNumber n={index + 1} />
              <span className="font-sans text-[11px] font-medium uppercase tracking-wide text-foreground/70">
                {step.label}
              </span>
            </li>
          ))}
        </ol>
      </div>

      {intro ? <p className={`${guideProse} mb-5`}>{intro}</p> : null}

      <Accordion type="single" collapsible className="rounded-lg border border-border bg-card">
        {steps.map((step, index) => (
          <AccordionItem key={step.label} value={step.label}>
            <AccordionTrigger className="gap-3 px-5 py-4 text-left hover:no-underline">
              <span className="flex min-w-0 flex-1 items-center gap-3">
                <JourneyStepNumber n={index + 1} />
                <span className="font-serif text-base font-semibold text-primary">{step.title}</span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-5 pb-4 space-y-3">
              <p className={`${guideProseTight} font-medium text-foreground/85`}>
                {proseWithMixedLinks(step.leadIn, {
                  external: step.externalLinks,
                  internal: step.internalLinks,
                  anchor: step.anchorLinks,
                  placeholder: step.placeholderLinks,
                })}
              </p>
              {step.body ? (
                <p className={guideProseTight}>
                  {proseWithMixedLinks(step.body, {
                    external: step.externalLinks,
                    internal: step.internalLinks,
                    anchor: step.anchorLinks,
                    placeholder: step.placeholderLinks,
                  })}
                </p>
              ) : null}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
