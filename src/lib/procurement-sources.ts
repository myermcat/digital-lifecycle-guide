import type { SourceItem } from "@/components/SourcesBlock";
import type { ExternalLinkKey } from "@/lib/external-links";
import { EXTERNAL_LINKS } from "@/lib/external-links";
import {
  comingSoonSourceItem,
  GCCASE_MIGRATION_READINESS_GUIDE,
} from "@/lib/placeholder-sources";

type RegistrySourceRef = {
  label: string;
  linkKey: ExternalLinkKey;
};

const PROCUREMENT_SOURCE_REFS = {
  governing: [
    { label: "Governing instrument", linkKey: "directive-procurement" },
    { label: "Governing instrument", linkKey: "policy-planning-investments" },
  ],
  supporting: [
    { label: "Supporting reference", linkKey: "supply-manual-chapter-6" },
    { label: "Supporting reference", linkKey: "contract-approval-authorities" },
    { label: "Supporting reference", linkKey: "buyers-portal" },
    { label: "Supporting reference", linkKey: "procurement-policies" },
    { label: "Supporting reference", linkKey: "procura-chatbot" },
    { label: "Supporting reference", linkKey: "professional-services-policy" },
    { label: "Supporting reference", linkKey: "agile-procurement-guide" },
  ],
} as const satisfies {
  governing: readonly RegistrySourceRef[];
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

export const PROCUREMENT_SOURCES: SourceItem[] = [
  comingSoonSourceItem(GCCASE_MIGRATION_READINESS_GUIDE),
  ...PROCUREMENT_SOURCE_REFS.governing.map(sourceItemFromRef),
  ...PROCUREMENT_SOURCE_REFS.supporting.map(sourceItemFromRef),
];

/** @deprecated Use PROCUREMENT_SOURCES */
export const PROCUREMENT_CONTRACTING_SOURCES = PROCUREMENT_SOURCES;
