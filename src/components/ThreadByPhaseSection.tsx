import type { ReactNode } from "react";
import { useId, useState } from "react";
import { GuideFolderTabs } from "@/components/GuideFolderTabs";
import {
  renderLinkedProse,
  renderThreadSections,
  type ThreadLinkedProse,
  type ThreadPhasePreviewBlock,
} from "@/lib/thread-rich-content";
import { guideProse, guideProseTight, guideSectionTitle } from "@/lib/guide-typography";

export type ThreadByPhaseBlock =
  | ThreadPhasePreviewBlock
  | {
      title: string;
      preview: string;
      popup: ThreadLinkedProse;
    };

export type ThreadByPhaseContent = {
  id: string;
  title: string;
  intro: string;
  blocks: readonly ThreadByPhaseBlock[];
};

function isThreadPhaseSectionsPopup(block: ThreadByPhaseBlock): block is ThreadPhasePreviewBlock {
  return Array.isArray(block.popup);
}

function renderPhasePopup(block: ThreadByPhaseBlock): ReactNode {
  if (isThreadPhaseSectionsPopup(block)) {
    return (
      <div className="space-y-3">
        {block.popupHeading ? (
          <p className={`${guideProseTight} font-semibold text-foreground/90`}>{block.popupHeading}</p>
        ) : null}
        {renderThreadSections(block.popup)}
      </div>
    );
  }
  return <p className={guideProse}>{renderLinkedProse(block.popup)}</p>;
}

/** Full “What X looks like in each phase” section with folder tabs. */
export function ThreadByPhaseSection({ byPhase }: { byPhase: ThreadByPhaseContent }) {
  if (byPhase.blocks.length === 0) {
    return null;
  }

  const phasePanelId = useId();
  const phaseTabOptions = byPhase.blocks.map((block) => ({
    value: block.title,
    label: block.title.replace(/\.$/, ""),
  }));
  type PhaseTab = (typeof phaseTabOptions)[number]["value"];
  const [activePhaseTab, setActivePhaseTab] = useState<PhaseTab>(phaseTabOptions[0].value);
  const activePhaseBlock =
    byPhase.blocks.find((block) => block.title === activePhaseTab) ?? byPhase.blocks[0];

  return (
    <section className="mt-10 md:mt-12 scroll-mt-24" id={byPhase.id}>
      <h2 className={`${guideSectionTitle} mb-3`}>{byPhase.title}</h2>
      <p className={`${guideProse} mb-4`}>{byPhase.intro}</p>
      <GuideFolderTabs
        options={phaseTabOptions}
        value={activePhaseTab}
        onChange={setActivePhaseTab}
        ariaLabel={byPhase.title}
        panelId={phasePanelId}
      >
        {renderPhasePopup(activePhaseBlock)}
      </GuideFolderTabs>
    </section>
  );
}
