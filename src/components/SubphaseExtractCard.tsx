import { Sparkles } from "lucide-react";
import { renderLinkedProse } from "@/lib/thread-rich-content";
import type { ThreadLinkedProse } from "@/lib/thread-rich-content";
import { guideBodySubheading, guideListIndent, guideProse } from "@/lib/guide-typography";

export type SubphaseExtract = {
  /** The one-line "what this sub-phase exists to do", rendered as the card's heading. */
  spine: string;
  opening: ThreadLinkedProse;
  workOutItems: readonly string[];
  scoped?: ThreadLinkedProse;
  /** The repeatable "New since <previous>" element: small-caps label + plain sentence. */
  whatsNew?: { label: string; text: string };
  /** The card's single bold line, last. */
  takeaway: ThreadLinkedProse;
};

/** The dashed extract card's inner content, shared by the sub-phase pages. */
export function SubphaseExtractCard({ extract }: { extract: SubphaseExtract }) {
  return (
    <div className={`${guideProse} space-y-3`}>
      <p className={guideBodySubheading}>{extract.spine}</p>
      <p>{renderLinkedProse(extract.opening)}</p>
      <ul className={`list-disc space-y-1 ${guideListIndent}`}>
        {extract.workOutItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {extract.scoped ? <p>{renderLinkedProse(extract.scoped)}</p> : null}
      {extract.whatsNew ? (
        <p>
          <Sparkles
            className="mr-1.5 inline h-4 w-4 -translate-y-px text-primary/70"
            aria-hidden
          />
          <span className="mr-2 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            {extract.whatsNew.label}
          </span>
          {extract.whatsNew.text}
        </p>
      ) : null}
      <p>{renderLinkedProse(extract.takeaway)}</p>
    </div>
  );
}
