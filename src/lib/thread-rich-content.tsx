import type { ReactNode } from "react";
import type {
  BoldPhrase,
  ExternalPhraseLink,
  InternalPhraseLink,
  PlaceholderGcNetworkPhraseLink,
} from "@/components/ProseWithExternalLinks";
import type { PlaceholderPhraseLink } from "@/lib/placeholder-sources";
import { proseWithMixedLinks } from "@/components/ProseWithExternalLinks";
import { EditorialNote } from "@/components/EditorialNote";
import { ThreadWhoseJobIconList } from "@/components/ThreadWhoseJobIconList";
import { guideListIndent, guideProse, guideProseSpace, guideProseTight, guideFormulaLine } from "@/lib/guide-typography";

/** Body enumerations with fewer than four items stay inline prose; four or more become a list. */
export const guideListMinCount = 4;

export type ThreadLinkedProse = {
  text: string;
  externalLinks?: ExternalPhraseLink[];
  internalLinks?: InternalPhraseLink[];
  placeholderLinks?: PlaceholderPhraseLink[];
  placeholderGcNetworkLinks?: PlaceholderGcNetworkPhraseLink[];
  bold?: BoldPhrase[];
};

export type ThreadPlainBoldListItem = {
  bold: string;
  text: string;
};

export type ThreadOrderedListItem =
  | string
  | ThreadPlainBoldListItem
  | ThreadLinkedProse;

export type ThreadOrderedListSection = {
  type: "orderedList";
  items: readonly ThreadOrderedListItem[];
};

export type ThreadUnorderedListSection = {
  type: "unorderedList";
  items: readonly ThreadOrderedListItem[];
};

export type ThreadEditorialNoteSection = {
  type: "editorialNote";
  label?: string;
  paragraphs: readonly ThreadLinkedProse[];
};

export type ThreadFormulaSection = {
  type: "formula";
  text: string;
};

export type ThreadContentSection =
  | ThreadLinkedProse
  | ThreadOrderedListSection
  | ThreadUnorderedListSection
  | ThreadEditorialNoteSection
  | ThreadFormulaSection;

export type ThreadCloserLookBlock = {
  title: string;
  sections: readonly ThreadContentSection[];
};

export type ThreadToggleBlock = ThreadCloserLookBlock;

export type ThreadPhasePreviewBlock = {
  title: string;
  preview: string;
  /** Renders above popup body as a small bold heading, on its own line. */
  popupHeading?: string;
  popup: readonly ThreadContentSection[];
};

export type ThreadLeadSection = {
  opening: ThreadLinkedProse;
  bullets?: readonly string[];
  closing?: ThreadLinkedProse;
};

export type ThreadRoleBullet = ThreadLinkedProse & {
  role: string;
};

export type ThreadWhoseJobSection = {
  intro: string;
  roles: readonly ThreadRoleBullet[];
  closing?: ThreadLinkedProse | string;
};

export type ThreadWhyItMattersPitch = {
  lead: string;
  failureIntro: string;
  failureModes: readonly ThreadLinkedProse[];
  closing: ThreadLinkedProse;
};

function isPlainBoldListItem(item: ThreadOrderedListItem): item is ThreadPlainBoldListItem {
  return typeof item === "object" && "bold" in item && typeof item.bold === "string";
}

function orderedListItemPlainText(item: ThreadOrderedListItem): string {
  if (typeof item === "string") {
    return item;
  }
  if (isPlainBoldListItem(item)) {
    return `${item.bold}${item.text}`;
  }
  return item.text;
}

export type ThreadLead = string | ThreadLinkedProse | ThreadLeadSection;

function isThreadLeadSection(lead: ThreadLead): lead is ThreadLeadSection {
  return typeof lead !== "string" && "opening" in lead;
}

function isThreadLinkedProse(lead: ThreadLead): lead is ThreadLinkedProse {
  return typeof lead !== "string" && "text" in lead && !("opening" in lead);
}

function proseFromLeadBullets(bullets: readonly string[]): string {
  if (bullets.length === 0) {
    return "";
  }
  if (bullets.length === 1) {
    return bullets[0];
  }
  if (bullets.length === 2) {
    return `${bullets[0]} and ${bullets[1]}`;
  }
  return `${bullets.slice(0, -1).join(", ")}, and ${bullets[bullets.length - 1]}`;
}

export function threadLeadPlainText(lead: ThreadLead): string {
  if (typeof lead === "string") {
    return lead;
  }
  if (isThreadLinkedProse(lead)) {
    return lead.text;
  }

  const { opening, bullets, closing } = lead;
  const inlineBullets =
    bullets && bullets.length > 0 ? proseFromLeadBullets(bullets) : "";

  return [opening.text, inlineBullets, closing?.text]
    .filter((part) => part.length > 0)
    .join(" ");
}

export function threadWhoseJobPlainText({ intro, roles, closing }: ThreadWhoseJobSection): string {
  const closingText = typeof closing === "string" ? closing : closing?.text;
  return [intro, ...roles.map((role) => `${role.role} ${role.text}`), closingText]
    .filter((part): part is string => Boolean(part))
    .join(" ");
}

export function threadWhyItMattersPitchPlainText({
  lead,
  failureIntro,
  failureModes,
  closing,
}: ThreadWhyItMattersPitch): string {
  return [lead, failureIntro, ...failureModes.map((item) => item.text), closing.text]
    .filter(Boolean)
    .join(" ");
}

export function threadSectionsPlainText(sections: readonly ThreadContentSection[]): string {
  return sections
    .map((section) =>
      "type" in section && (section.type === "orderedList" || section.type === "unorderedList")
        ? section.items.map(orderedListItemPlainText).join(" ")
        : "type" in section && section.type === "editorialNote"
          ? section.paragraphs.map((paragraph) => paragraph.text).join(" ")
          : "type" in section && section.type === "formula"
            ? section.text
            : section.text,
    )
    .join(" ");
}

function isFormula(section: ThreadContentSection): section is ThreadFormulaSection {
  return "type" in section && section.type === "formula";
}

function isEditorialNote(section: ThreadContentSection): section is ThreadEditorialNoteSection {
  return "type" in section && section.type === "editorialNote";
}

function isUnorderedList(
  section: ThreadContentSection,
): section is ThreadUnorderedListSection {
  return "type" in section && section.type === "unorderedList";
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
  placeholderLinks,
  placeholderGcNetworkLinks,
  bold,
}: ThreadLinkedProse): ReactNode {
  return proseWithMixedLinks(text, {
    external: externalLinks,
    internal: internalLinks,
    placeholder: placeholderLinks,
    placeholderGcNetwork: placeholderGcNetworkLinks,
    bold,
  });
}

function renderOrderedListItem(item: ThreadOrderedListItem) {
  if (typeof item === "string") {
    return item;
  }
  if (isPlainBoldListItem(item)) {
    return (
      <>
        <strong>{item.bold}</strong>
        {item.text}
      </>
    );
  }
  return renderLinkedProse(item);
}

export function renderThreadLead(lead: ThreadLead): ReactNode {
  if (typeof lead === "string") {
    return <p className={guideProse}>{lead}</p>;
  }
  if (isThreadLinkedProse(lead)) {
    return <p className={guideProse}>{renderLinkedProse(lead)}</p>;
  }

  const { opening, bullets, closing } = lead;
  const inlineBullets =
    bullets && bullets.length > 0 ? proseFromLeadBullets(bullets) : null;

  return (
    <div className={guideProse}>
      <p>
        {renderLinkedProse(opening)}
        {inlineBullets ? <> {inlineBullets}.</> : null}
      </p>
      {closing ? <p className={inlineBullets ? "mt-3" : undefined}>{renderLinkedProse(closing)}</p> : null}
    </div>
  );
}

export function renderThreadWhoseJob(section: ThreadWhoseJobSection): ReactNode {
  return <ThreadWhoseJobIconList {...section} />;
}

export function renderThreadWhyItMattersPitch(section: ThreadWhyItMattersPitch): ReactNode {
  return (
    <div className={guideProseSpace}>
      <p className={guideProse}>{section.lead}</p>
      <p className={guideProse}>{section.failureIntro}</p>
      <ul className={`list-disc space-y-1 ${guideListIndent}`}>
        {section.failureModes.map((item) => (
          <li key={item.text} className={guideProse}>
            {renderLinkedProse(item)}
          </li>
        ))}
      </ul>
      <p className={guideProse}>{renderLinkedProse(section.closing)}</p>
    </div>
  );
}

export function renderThreadSections(sections: readonly ThreadContentSection[]): ReactNode {
  return (
    <div className={`${guideProseTight} space-y-3`}>
      {sections.map((section, index) =>
        isOrderedList(section) ? (
          <ol key={index} className={`list-decimal space-y-1 ${guideListIndent}`}>
            {section.items.map((item) => (
              <li key={orderedListItemPlainText(item)}>{renderOrderedListItem(item)}</li>
            ))}
          </ol>
        ) : isUnorderedList(section) ? (
          <ul key={index} className={`list-disc space-y-1 ${guideListIndent}`}>
            {section.items.map((item) => (
              <li key={orderedListItemPlainText(item)}>{renderOrderedListItem(item)}</li>
            ))}
          </ul>
        ) : isFormula(section) ? (
          <p
            key={index}
            className={`rounded-md border border-border/80 bg-muted/35 px-3 py-1.5 ${guideFormulaLine}`}
          >
            {section.text}
          </p>
        ) : isEditorialNote(section) ? (
          <EditorialNote key={index} label={section.label ?? "Example"}>
            <div className="space-y-2">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.text}>{renderLinkedProse(paragraph)}</p>
              ))}
            </div>
          </EditorialNote>
        ) : (
          <p key={index}>{renderLinkedProse(section)}</p>
        ),
      )}
    </div>
  );
}
