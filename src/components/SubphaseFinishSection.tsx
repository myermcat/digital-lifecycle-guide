import { CompactExitList } from "@/components/CompactLinkedList";
import { PhaseSection } from "@/components/PhaseSection";
import { renderLinkedProse, type ThreadLinkedProse } from "@/lib/thread-rich-content";
import { guideListIndent, guideProse } from "@/lib/guide-typography";

export function SubphaseFinishSection({
  title,
  sectionId,
  intro,
  exits,
  readyIntro,
  readyItems,
}: {
  title: string;
  sectionId: string;
  intro: ThreadLinkedProse;
  exits: { lead: string; rest: string; href?: string }[];
  readyIntro: string;
  readyItems: readonly string[];
}) {
  return (
    <PhaseSection title={title} sectionId={sectionId}>
      <p>{renderLinkedProse(intro)}</p>
      <CompactExitList items={exits} />
      <p className="mt-4">{readyIntro}</p>
      <ul className={`${guideProse} mt-2 list-disc space-y-1.5 ${guideListIndent}`}>
        {readyItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </PhaseSection>
  );
}
