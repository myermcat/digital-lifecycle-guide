import { Map } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { PillarCallout } from "@/components/PillarCallout";
import { GATE_MAP_PATH } from "@/lib/reference-paths";
import { guideLink } from "@/lib/guide-typography";

const gateMapCalloutClassName =
  "scroll-mt-24 mt-6 md:mt-8 rounded-lg border border-primary/40 bg-[var(--phase-group)] shadow-sm overflow-hidden";

type GateMapPhasePointer = {
  text: string;
  hash: string;
  linkLabel: string;
};

/** Compact cream callout pointing at a gate-map phase section. */
export function GateMapPhaseCallout({ text, hash, linkLabel }: GateMapPhasePointer) {
  return (
    <PillarCallout
      compact
      className={gateMapCalloutClassName}
      label="THE OFFICIAL GATES"
      icon={Map}
      href={GATE_MAP_PATH}
      hash={hash}
      linkLabel={linkLabel}
    >
      <p>{text}</p>
    </PillarCallout>
  );
}

/** Single-line see-also link for sub-phase pages. */
export function GateMapSeeAlsoLink({
  phaseLabel,
  hash,
}: {
  phaseLabel: string;
  hash: string;
}) {
  return (
    <p className="mt-4 md:mt-5 text-sm">
      <Link to={GATE_MAP_PATH} hash={hash} className={guideLink}>
        See where {phaseLabel}&apos;s official gates sit in the whole path →
      </Link>
    </p>
  );
}
