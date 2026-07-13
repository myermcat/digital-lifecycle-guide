import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { guideProseTight, guideSectionTitle } from "@/lib/guide-typography";

export type IconAccordionStage = {
  id: string;
  icon: LucideIcon;
  title: string;
  headerContent?: ReactNode;
  children: ReactNode;
};

export function IconAccordionSection({
  id,
  title,
  stages,
}: {
  id: string;
  title: string;
  stages: readonly IconAccordionStage[];
}) {
  return (
    <section className="mt-10 md:mt-12 scroll-mt-24" id={id}>
      <h2 className={`${guideSectionTitle} mb-4`}>{title}</h2>

      <Accordion type="single" collapsible className="mt-4 rounded-lg border border-border bg-card">
        {stages.map((stage) => {
          const Icon = stage.icon;
          return (
            <AccordionItem key={stage.id} value={stage.id}>
              <AccordionTrigger className="gap-3 px-5 py-4 text-left hover:no-underline">
                <span className="flex min-w-0 flex-1 items-center gap-3 md:gap-3.5">
                  <Icon
                    className="size-6 shrink-0 text-primary/70 md:size-7"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <span className="min-w-0 font-serif text-base font-semibold text-primary">
                    {stage.title}
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-4">
                {stage.headerContent ? (
                  <div className="mb-4">{stage.headerContent}</div>
                ) : null}
                <div className={guideProseTight}>{stage.children}</div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </section>
  );
}
