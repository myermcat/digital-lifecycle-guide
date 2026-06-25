import type { ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  guideArticleQaAnswer,
  guideArticleQaQuestion,
  guideArticleQaShell,
} from "@/lib/guide-article";
import { cn } from "@/lib/utils";

export type QaToggleItem = {
  question: string;
  answer: ReactNode;
};

function ToggleQuestionBadge() {
  return (
    <span
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary"
      aria-hidden
    >
      <span className="font-serif text-xl font-semibold leading-none">?</span>
    </span>
  );
}

/**
 * Reusable Q&A block — closer-look accordion structure, procurement Q&A colours.
 */
export function QaToggleBlock({
  items,
  className,
}: {
  items: QaToggleItem[];
  className?: string;
}) {
  return (
    <Accordion
      type="single"
      collapsible
      data-guide-block="qa-toggle"
      className={cn(guideArticleQaShell, className)}
    >
      {items.map((item) => (
        <AccordionItem key={item.question} value={item.question} className="border-border/50">
          <AccordionTrigger className="gap-3 px-4 py-3.5 text-left hover:no-underline md:px-5 md:py-4">
            <span className="flex min-w-0 flex-1 items-center gap-3">
              <ToggleQuestionBadge />
              <span className={`${guideArticleQaQuestion} flex-1`}>{item.question}</span>
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-3.5 md:px-5 md:pb-4">
            <div className={guideArticleQaAnswer}>{item.answer}</div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
