import type { ReactNode } from "react";
import type { BoldPhrase, ExternalPhraseLink, InternalPhraseLink } from "@/components/ProseWithExternalLinks";
import { proseWithMixedLinks } from "@/components/ProseWithExternalLinks";
import { InlineArrowLeadList } from "@/lib/guide-lists";
import { guideListIndent, guideProse, guideProseTight } from "@/lib/guide-typography";

/** Body enumerations with fewer than four items stay inline prose; four or more become a list. */
export const guideListMinCount = 4;

export type ThreadLinkedProse = {
  text: string;
  externalLinks?: ExternalPhraseLink[];
  internalLinks?: InternalPhraseLink[];
  bold?: BoldPhrase[];
};

export type ThreadOrderedListItem =
  | string
  | {
      bold: string;
      text: string;
    };

export type ThreadOrderedListSection = {
  type: "orderedList";
  items: readonly ThreadOrderedListItem[];
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
};

function orderedListItemPlainText(item: ThreadOrderedListItem): string {
  return typeof item === "string" ? item : `${item.bold}${item.text}`;
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

export function threadWhoseJobPlainText({ intro, roles }: ThreadWhoseJobSection): string {
  return [intro, ...roles.map((role) => `${role.role} ${role.text}`)].join(" ");
}

export function threadSectionsPlainText(sections: readonly ThreadContentSection[]): string {
  return sections
    .map((section) =>
      "type" in section && section.type === "orderedList"
        ? section.items.map(orderedListItemPlainText).join(" ")
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

function renderOrderedListItem(item: ThreadOrderedListItem) {
  if (typeof item === "string") {
    return item;
  }
  return (
    <>
      <strong>{item.bold}</strong>
      {item.text}
    </>
  );
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

export function renderThreadWhoseJob({ intro, roles }: ThreadWhoseJobSection): ReactNode {
  return (
    <div className={guideProse}>
      <p>{intro}</p>
      <InlineArrowLeadList
        className="mt-3"
        items={roles.map((role) => ({
          lead: role.role,
          body: renderLinkedProse({
            text: role.text,
            externalLinks: role.externalLinks,
            internalLinks: role.internalLinks,
            bold: role.bold,
          }),
        }))}
      />
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
        ) : (
          <p key={index}>{renderLinkedProse(section)}</p>
        ),
      )}
    </div>
  );
}
