import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  guideArticleQaAnswer,
  guideArticleQaCard,
  guideArticleQaList,
  guideArticleQaQuestion,
} from "@/lib/guide-article";
import { cn } from "@/lib/utils";

export type QaToggleItem = {
  question: string;
  answer: string;
};

/**
 * Reusable Q&A block: each question is a card toggle; the answer opens on tap.
 */
export function QaToggleBlock({
  items,
  className,
}: {
  items: QaToggleItem[];
  className?: string;
}) {
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(() => new Set());
  const groupId = useId();

  const toggle = (index: number) => {
    setOpenIndexes((current) => {
      const next = new Set(current);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <ul className={cn(guideArticleQaList, className)}>
      {items.map((item, index) => {
        const open = openIndexes.has(index);
        const panelId = `${groupId}-panel-${index}`;

        return (
          <li key={item.question} className={guideArticleQaCard}>
            <button
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => toggle(index)}
              className="group flex w-full items-start gap-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              <ChevronDown
                className={cn(
                  "mt-[0.45rem] size-4 shrink-0 text-primary/40 transition-transform duration-200",
                  open && "rotate-180",
                )}
                strokeWidth={1.75}
                aria-hidden
              />
              <span className={`${guideArticleQaQuestion} flex-1`}>{item.question}</span>
            </button>
            {open ? (
              <p id={panelId} className={guideArticleQaAnswer}>
                {item.answer}
              </p>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
