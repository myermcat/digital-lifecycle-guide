import type { SourceItem } from "@/components/SourcesBlock";
import type { ExternalLinkKey } from "@/lib/external-links";
import { EXTERNAL_LINKS } from "@/lib/external-links";
import { gccaseComingSoonSourceItem } from "@/lib/placeholder-sources";

type RegistrySourceRef = {
  label: string;
  linkKey: ExternalLinkKey;
};

const PROCUREMENT_SOURCE_REFS = {
  governing: [
    { label: "Instrument directeur", linkKey: "directive-procurement" },
    { label: "Instrument directeur", linkKey: "policy-planning-investments" },
  ],
  supporting: [
    { label: "Modèles et outils", linkKey: "a11y-toolkit-procurement" },
    { label: "Référence complémentaire", linkKey: "task-authorizations" },
    { label: "Référence complémentaire", linkKey: "modify-contract" },
    { label: "Référence complémentaire", linkKey: "supply-manual-chapter-6" },
    { label: "Référence complémentaire", linkKey: "contract-approval-authorities" },
    { label: "Référence complémentaire", linkKey: "buyers-portal" },
    { label: "Référence complémentaire", linkKey: "procurement-policies" },
    { label: "Référence complémentaire", linkKey: "procura-chatbot" },
    { label: "Référence complémentaire", linkKey: "professional-services-policy" },
    { label: "Référence complémentaire", linkKey: "task-based-professional-services" },
    { label: "Référence complémentaire", linkKey: "agile-challenge-based-procurement" },
    { label: "Référence complémentaire", linkKey: "agile-procurement-guide" },
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
  gccaseComingSoonSourceItem(),
  ...PROCUREMENT_SOURCE_REFS.governing.map(sourceItemFromRef),
  ...PROCUREMENT_SOURCE_REFS.supporting.map(sourceItemFromRef),
];

/** @deprecated Use PROCUREMENT_SOURCES */
export const PROCUREMENT_CONTRACTING_SOURCES = PROCUREMENT_SOURCES;
