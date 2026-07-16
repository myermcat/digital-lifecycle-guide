import type { LucideIcon } from "lucide-react";
import type { ComponentType, ReactNode, SVGProps } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { guideCalloutLabel, guideProseTight, guideSectionTitle } from "@/lib/guide-typography";
import { cn } from "@/lib/utils";

type AccordionIcon = LucideIcon | ComponentType<SVGProps<SVGSVGElement>>;

export type IconAccordionStage = {
  id: string;
  icon?: AccordionIcon;
  title: string;
  /** Small-caps eyebrow above the title (e.g. EXAMPLE), same style as PillarCallout. */
  eyebrow?: string;
  /** Override the default `text-base` serif title size. */
  titleClassName?: string;
  /** Small note under the title in the trigger (visible when closed). */
  triggerNote?: ReactNode;
  headerContent?: ReactNode;
  children: ReactNode;
};

export function IconAccordionSection({
  id,
  title,
  stages,
  embedded = false,
}: {
  id?: string;
  title?: string;
  stages: readonly IconAccordionStage[];
  /** Accordion only — no outer section or h2. For nesting under an existing block. */
  embedded?: boolean;
}) {
  const accordion = (
    <Accordion
      type="single"
      collapsible
      className={embedded ? "rounded-lg border border-border bg-card" : "mt-4 rounded-lg border border-border bg-card"}
    >
      {stages.map((stage) => {
        const Icon = stage.icon;
        const alignStart = Boolean(stage.triggerNote || stage.eyebrow);
        return (
          <AccordionItem key={stage.id} value={stage.id}>
            <AccordionTrigger className="gap-3 px-5 py-4 text-left hover:no-underline">
              <span
                className={cn(
                  "flex min-w-0 flex-1 gap-3 md:gap-3.5",
                  alignStart ? "items-start" : "items-center",
                )}
              >
                {Icon ? (
                  <Icon
                    className={cn(
                      "size-6 shrink-0 text-primary/70 md:size-7",
                      alignStart ? "mt-0.5" : undefined,
                    )}
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                ) : null}
                <span className="min-w-0">
                  {stage.eyebrow ? (
                    <span className={`mb-1 block ${guideCalloutLabel}`}>
                      {stage.eyebrow}
                    </span>
                  ) : null}
                  <span
                    className={cn(
                      "block font-serif font-semibold text-primary",
                      stage.titleClassName ?? "text-base",
                    )}
                  >
                    {stage.title}
                  </span>
                  {stage.triggerNote ? (
                    <span className="mt-1 block font-sans text-sm font-normal leading-snug text-muted-foreground">
                      {stage.triggerNote}
                    </span>
                  ) : null}
                </span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-5 pb-4">
              {stage.headerContent ? (
                <div className="mb-4">{stage.headerContent}</div>
              ) : null}
              <div className={`${guideProseTight} text-[0.8125rem] leading-[1.4]`}>
                {stage.children}
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );

  if (embedded) {
    return accordion;
  }

  return (
    <section className="mt-10 md:mt-12 scroll-mt-24" id={id}>
      {title ? <h2 className={`${guideSectionTitle} mb-4`}>{title}</h2> : null}
      {accordion}
    </section>
  );
}
