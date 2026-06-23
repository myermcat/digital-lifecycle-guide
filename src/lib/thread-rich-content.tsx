import type { ReactNode } from "react";
import type { BoldPhrase, ExternalPhraseLink, InternalPhraseLink } from "@/components/ProseWithExternalLinks";
import { proseWithMixedLinks } from "@/components/ProseWithExternalLinks";
import { guideListIndent, guideProseTight } from "@/lib/guide-typography";

export type ThreadLinkedProse = {
  text: string;
  externalLinks?: ExternalPhraseLink[];
  internalLinks?: InternalPhraseLink[];
  bold?: BoldPhrase[];
};

export type ThreadOrderedListSection = {
  type: "orderedList";
  items: readonly string[];
};

export type ThreadContentSection = ThreadLinkedProse | ThreadOrderedListSection;

export type ThreadCloserLookBlock = {
  title: string;
  sections: readonly ThreadContentSection[];
};

export type ThreadPhasePreviewBlock = {
  title: string;
  preview: string;
  popup: readonly ThreadContentSection[];
};

export function threadSectionsPlainText(sections: readonly ThreadContentSection[]): string {
  return sections
    .map((section) =>
      "type" in section && section.type === "orderedList"
        ? section.items.join(" ")
        : section.text,
    )
    .join(" ");
}

function isOrderedList(
  section: ThreadContentSection,
): section is ThreadOrderedListSection {
  return "type" in section && section.type === "orderedList";
}

export function renderLinkedProse({
  text,
  externalLinks,
  internalLinks,
  bold,
}: ThreadLinkedProse): ReactNode {
  return proseWithMixedLinks(text, {
    external: externalLinks,
    internal: internalLinks,
    bold,
  });
}

export function renderThreadSections(sections: readonly ThreadContentSection[]): ReactNode {
  return (
    <div className={`${guideProseTight} space-y-3`}>
      {sections.map((section, index) =>
        isOrderedList(section) ? (
          <ol key={index} className={`list-decimal space-y-1 ${guideListIndent}`}>
            {section.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        ) : (
          <p key={index}>{renderLinkedProse(section)}</p>
        ),
      )}
    </div>
  );
}
