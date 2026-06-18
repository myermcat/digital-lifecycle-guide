import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { ReactNode } from "react";
import { proseWithMixedLinks } from "@/components/ProseWithExternalLinks";
import type { SunsetJourneyStep, SunsetPath } from "@/lib/sunset-landing";
import type { SunsetJourneyStepExample } from "@/lib/sunset-strings";
import sunsetReplaceOverlap from "@/assets/sunset_replace_overlap.svg?url";
import {
  guideBlockTitle,
  guideCalloutLabel,
  guideProse,
  guideProseTight,
  guideSectionTitle,
} from "@/lib/guide-typography";

function JourneyStepNumber({ n }: { n: number }) {
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 font-sans text-xs font-semibold text-primary">
      {n}
    </span>
  );
}

function SunsetJourneyStepExample({ example }: { example: SunsetJourneyStepExample }) {
  return (
    <div className="mt-4 rounded-lg border border-border bg-card shadow-sm overflow-hidden">
      <div className="px-4 py-4 md:px-5 md:py-5 space-y-4">
        <div>
          <p className={guideCalloutLabel}>Example</p>
          <h4 className={`${guideBlockTitle} mt-1.5 text-lg md:text-xl`}>{example.title}</h4>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-md border border-primary/25 bg-primary/5 px-4 py-3.5">
            <p className="font-serif text-sm font-semibold text-primary tracking-tight mb-1.5">
              {example.left.heading}
            </p>
            <p className={guideProseTight}>{example.left.body}</p>
          </div>
          <div className="rounded-md border border-destructive/25 bg-destructive/5 px-4 py-3.5">
            <p className="font-serif text-sm font-semibold text-destructive/90 tracking-tight mb-1.5">
              {example.right.heading}
            </p>
            <p className={guideProseTight}>{example.right.body}</p>
          </div>
        </div>
        <p className={guideProseTight}>{example.caption}</p>
      </div>
    </div>
  );
}

const SUNSET_REPLACE_OVERLAP_ALT =
  "The new service's Create overlaps the old service's Sunset from Decide onward. A bottom timeline shows the old service moving through five Sunset steps: Assess, Decide, Plan, Acquire, Migrate. A top timeline shows the new service's Create starting above Decide as discover and decide, becoming build and deliver above Acquire and Migrate, then continuing into Live. Decide through Migrate are shaded as the overlap, and at Migrate an arrow shows users and data moving up to the new service.";

const SUNSET_REPLACE_OVERLAP_CAPTION =
  "The new service's Create starts while the old one is still in Sunset. They overlap from Decide on, and at Migrate the data and users move across.";

export function SunsetJourneySection({
  intro,
  footer,
  steps,
  embedded = false,
  fork,
  path,
}: {
  intro: string;
  footer: string;
  steps: SunsetJourneyStep[];
  embedded?: boolean;
  fork?: ReactNode;
  path: SunsetPath;
}) {
  return (
    <section
      className={embedded ? "scroll-mt-24" : "mt-10 md:mt-12 scroll-mt-24"}
      id="how-a-sunset-goes"
    >
      <h2 className={`${guideSectionTitle} mb-4`}>How a sunset goes</h2>

      {fork}

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

      <p className={`${guideProse} mb-5`}>{intro}</p>

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
              <p className={`${guideProseTight} font-medium text-foreground/85`}>{step.leadIn}</p>
              <p className={guideProseTight}>
                {proseWithMixedLinks(step.body, {
                  external: step.externalLinks,
                  internal: step.internalLinks,
                  placeholder: step.placeholderLinks,
                  bold: step.boldPhrases,
                })}
              </p>
              {step.example ? <SunsetJourneyStepExample example={step.example} /> : null}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {path === "replace" ? (
        <figure className="mt-5">
          <img
            src={sunsetReplaceOverlap}
            alt={SUNSET_REPLACE_OVERLAP_ALT}
            className="w-full h-auto"
            width={800}
            height={250}
          />
          <figcaption className="mt-1.5">
            <p className="font-sans text-[10px] leading-[1.35] text-muted-foreground/40">
              {SUNSET_REPLACE_OVERLAP_CAPTION}
            </p>
          </figcaption>
        </figure>
      ) : null}

      <p className={`${guideProse} mt-5`}>{footer}</p>
    </section>
  );
}
