import { Map } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { PillarCallout } from "@/components/PillarCallout";
import { CHECKPOINT_MAP_PATH } from "@/lib/reference-paths";
import { guideLink } from "@/lib/guide-typography";

const checkpointMapCalloutClassName =
  "scroll-mt-24 mt-6 md:mt-8 rounded-lg border border-primary/40 bg-[var(--phase-group)] shadow-sm overflow-hidden";

type CheckpointMapPhasePointer = {
  text: string;
  hash: string;
  linkLabel: string;
};

/** Compact cream callout pointing at a checkpoint map phase section. */
export function CheckpointMapPhaseCallout({ text, hash, linkLabel }: CheckpointMapPhasePointer) {
  return (
    <PillarCallout
      compact
      className={checkpointMapCalloutClassName}
      label="THE OFFICIAL CHECKPOINTS"
      icon={Map}
      href={CHECKPOINT_MAP_PATH}
      hash={hash}
      linkLabel={linkLabel}
    >
      <p>{text}</p>
    </PillarCallout>
  );
}

/** Prose sentence pointing sub-phase readers at the lifecycle page. */
export function CheckpointMapSeeAlsoLink({
  phaseLabel,
  hash,
}: {
  phaseLabel: string;
  hash: string;
}) {
  return (
    <p className="mt-4 md:mt-5 text-[15px] leading-relaxed text-foreground/85">
      <Link to={CHECKPOINT_MAP_PATH} hash={hash} className={guideLink}>
        The lifecycle of a digital service
      </Link>{" "}
      shows where {phaseLabel} comes in the whole journey, checkpoint by checkpoint.
    </p>
  );
}
