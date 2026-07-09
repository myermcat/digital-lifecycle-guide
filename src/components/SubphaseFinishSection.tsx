import { CompactExitList } from "@/components/CompactLinkedList";
import { OnRampChecklist } from "@/components/OnRampChecklist";
import { PhaseSection } from "@/components/PhaseSection";
import {
  renderLinkedProse,
  type ThreadLinkedProse,
} from "@/lib/thread-rich-content";
import { guideBodySubheading } from "@/lib/guide-typography";

export function SubphaseFinishSection({
  title,
  sectionId,
  intro,
  exits,
  offRamp,
}: {
  title: string;
  sectionId: string;
  intro: ThreadLinkedProse;
  exits: { lead: string; rest: ThreadLinkedProse; href?: string }[];
  offRamp: {
    intro: ThreadLinkedProse;
    items: readonly ThreadLinkedProse[];
  };
}) {
  return (
    <PhaseSection title={title} sectionId={sectionId}>
      <p>{renderLinkedProse(intro)}</p>
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
        items={offRamp.items.map((item) => renderLinkedProse(item))}
        className="mt-6"
      />
    </PhaseSection>
  );
}
