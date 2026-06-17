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
  sourceItem("directive-procurement", "Governing instrument"),
  sourceItem("policy-planning-investments", "Supporting reference"),
  gccaseComingSoonSourceItem(),
];
