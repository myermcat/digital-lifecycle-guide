import type { SourceItem } from "@/components/SourcesBlock";
import type { ExternalLinkKey } from "@/lib/external-links";
import { EXTERNAL_LINKS } from "@/lib/external-links";

type RegistrySourceRef = {
  label: string;
  linkKey: ExternalLinkKey;
};

const PROCUREMENT_CONTRACTING_SOURCE_REFS = {
  governing: {
    label: "Governing instrument",
    linkKey: "directive-procurement",
  },
  supporting: [
    { label: "Supporting reference", linkKey: "buyers-portal" },
    { label: "Supporting reference", linkKey: "procurement-policies" },
    { label: "Supporting reference", linkKey: "procura-chatbot" },
    { label: "Supporting reference", linkKey: "professional-services-policy" },
    { label: "Supporting reference", linkKey: "agile-procurement-guide" },
  ],
} as const satisfies {
  governing: RegistrySourceRef;
  supporting: readonly RegistrySourceRef[];
};

function sourceItemFromRef({ label, linkKey }: RegistrySourceRef): SourceItem {
  const entry = EXTERNAL_LINKS[linkKey];
  return {
    label,
    linkKey,
    description: entry.description,
  };
}

/** Sources for procurement and contracting landing pages — resolved from the links registry. */
export const PROCUREMENT_CONTRACTING_SOURCES: SourceItem[] = [
  sourceItemFromRef(PROCUREMENT_CONTRACTING_SOURCE_REFS.governing),
  ...PROCUREMENT_CONTRACTING_SOURCE_REFS.supporting.map(sourceItemFromRef),
];
