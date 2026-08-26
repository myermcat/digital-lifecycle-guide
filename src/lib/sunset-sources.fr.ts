import type { SourceItem } from "@/components/SourcesBlock";
import type { ExternalLinkKey } from "@/lib/external-links";
import { EXTERNAL_LINKS } from "@/lib/external-links";
import { gccaseComingSoonSourceItem } from "@/lib/placeholder-sources";

function sourceItem(linkKey: ExternalLinkKey, label: string): SourceItem {
  return {
    label,
    linkKey,
    description: EXTERNAL_LINKS[linkKey].description,
  };
}

export const SUNSET_SOURCES: SourceItem[] = [
  sourceItem("directive-procurement", "Instrument directeur"),
  sourceItem("policy-planning-investments", "Référence complémentaire"),
  {
    label: "Référence complémentaire",
    linkKey: "lac-information-disposition-hub",
    description:
      "Bibliothèque et Archives Canada, disposition de l’information : ce qui doit arriver aux documents avant la fermeture.",
  },
  gccaseComingSoonSourceItem(),
];
