import { CompactExitList } from "@/components/CompactLinkedList";
import { LookingAhead } from "@/components/LookingAhead";
import { PhaseSection } from "@/components/PhaseSection";
import {
  LOOKING_AHEAD_INTRO,
  type PhaseLeavingContent,
} from "@/lib/phase-leaving-content";

/**
 * Paired "When you need to leave [phase]" block and "Looking ahead" callout.
 * Callout sits directly under the heading; leave-phase prose and exits follow.
 */
export function PhaseLeavingSection({ content }: { content: PhaseLeavingContent }) {
  return (
    <PhaseSection
      title={`When you need to leave ${content.phaseName}`}
      sectionId={content.sectionId}
    >
      <LookingAhead title="" intro={LOOKING_AHEAD_INTRO} pills={content.pills} />
      <p>{content.intro}</p>
      <CompactExitList items={content.exits} />
    </PhaseSection>
  );
}
