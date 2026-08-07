import { cn } from "@/lib/utils";
import { CompactExitList } from "@/components/CompactLinkedList";
import { OnRampChecklist } from "@/components/OnRampChecklist";
import { PhaseSection } from "@/components/PhaseSection";
import {
  renderLinkedProse,
  type ThreadLinkedProse,
} from "@/lib/thread-rich-content";
import {
  guideBodySubheading,
  guideLead,
  guideProse,
  guideBlockTitle,
} from "@/lib/guide-typography";

/**
 * How a sub-phase ends.
 *
 * The section answers four different questions, and they are not equally
 * important. Running them together as one column of identical paragraphs made
 * the section unreadable: a reader could not tell a task they owe from a word
 * they will hear a colleague use. So the levels are now built in.
 *
 *   1. The test. One lead paragraph, set larger than the rest, saying what has
 *      to be true for the sub-phase to be over.
 *   2. What has to be done first. Named blocks, each with its own heading and,
 *      where the block does not apply to everyone, the condition on the heading
 *      line so a reader can skip it without reading the body.
 *   3. Vocabulary and context. Demoted into an aside, because knowing what a
 *      thing is called is not work the reader owes anyone.
 *   4. The checklist and the exits, unchanged.
 *
 * A block is only worth its heading if a reader who read nothing else would
 * still know what they had to do.
 */

/** One thing that has to be true before the sub-phase can close. */
export type FinishBlock = {
  heading: string;
  /**
   * Shown beside the heading when the block is conditional, so a reader can
   * skip the whole block. Leave it out when the block applies normally; that is
   * the default and saying so is noise.
   */
  onlyIf?: string;
  paragraphs: readonly ThreadLinkedProse[];
};

/** Background the reader may want and owes nobody. Set apart and quieter. */
export type FinishAside = {
  heading: string;
  paragraphs: readonly ThreadLinkedProse[];
};

export function SubphaseFinishSection({
  title,
  sectionId,
  intro,
  followUp,
  blocks,
  aside,
  exits,
  offRamp,
}: {
  title: string;
  sectionId: string;
  intro: ThreadLinkedProse;
  /** Plain paragraphs straight after the lead. Keep this short. */
  followUp?: ThreadLinkedProse | readonly ThreadLinkedProse[];
  blocks?: readonly FinishBlock[];
  aside?: FinishAside;
  exits: { lead: string; rest: ThreadLinkedProse; href?: string }[];
  offRamp: {
    intro: ThreadLinkedProse;
    items: readonly (ThreadLinkedProse & {
      subItems?: readonly ThreadLinkedProse[];
    })[];
  };
}) {
  const followUpParagraphs = followUp
    ? Array.isArray(followUp)
      ? followUp
      : [followUp]
    : [];

  return (
    <PhaseSection title={title} sectionId={sectionId}>
      {/* The test. Set a step above the body so the answer to the section's
          own question is the first thing the eye reaches. */}
      <p className={cn(guideLead, "text-[1.1rem] md:text-[1.2rem] leading-[1.5] font-medium")}>
        {renderLinkedProse(intro)}
      </p>

      {followUpParagraphs.length > 0 ? (
        <div className="mt-4 space-y-3">
          {followUpParagraphs.map((paragraph) => (
            <p key={paragraph.text}>{renderLinkedProse(paragraph)}</p>
          ))}
        </div>
      ) : null}

      {blocks && blocks.length > 0 ? (
        <div className="mt-7 space-y-6">
          {blocks.map((block) => (
            <div
              key={block.heading}
              className="border-l-2 border-primary/25 pl-4 md:pl-5"
            >
              <div className="mb-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className={cn(guideBlockTitle, "text-[1.15rem] md:text-[1.25rem]")}>{block.heading}</h3>
                {block.onlyIf ? (
                  <span className="rounded-full border border-amber-300 bg-amber-100 px-2 py-[0.1rem] text-[0.68rem] font-semibold uppercase tracking-wide text-amber-900 dark:border-amber-800/70 dark:bg-amber-950 dark:text-amber-200">
                    {block.onlyIf}
                  </span>
                ) : null}
              </div>
              <div className={`${guideProse} space-y-3`}>
                {block.paragraphs.map((paragraph) => (
                  <p key={paragraph.text}>{renderLinkedProse(paragraph)}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {aside ? (
        <aside className="mt-7 rounded-lg border border-border bg-muted/40 px-4 py-4 md:px-5">
          <p
            className={`${guideBodySubheading} mb-2 text-muted-foreground uppercase tracking-[0.09em] text-[0.7rem]`}
          >
            {aside.heading}
          </p>
          <div className="space-y-2.5 font-serif text-[0.95rem] leading-[1.45] text-muted-foreground">
            {aside.paragraphs.map((paragraph) => (
              <p key={paragraph.text}>{renderLinkedProse(paragraph)}</p>
            ))}
          </div>
        </aside>
      ) : null}

      <CompactExitList
        items={exits.map((item) => ({
          lead: item.lead,
          rest: renderLinkedProse(item.rest),
          href: item.href,
        }))}
      />
      <OnRampChecklist
        embedded
        intro={
          <p className={guideBodySubheading}>{renderLinkedProse(offRamp.intro)}</p>
        }
        items={offRamp.items.map((item) =>
          "subItems" in item && item.subItems
            ? {
                content: renderLinkedProse(item),
                subItems: item.subItems.map((sub) => renderLinkedProse(sub)),
              }
            : renderLinkedProse(item),
        )}
        className="mt-6"
      />
    </PhaseSection>
  );
}
