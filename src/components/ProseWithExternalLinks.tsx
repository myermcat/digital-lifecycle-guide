import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ExternalLink } from "@/components/ExternalLink";
import type { ExternalLinkKey } from "@/lib/external-links";
import type { PlaceholderPhraseLink } from "@/lib/placeholder-sources";
import { PlaceholderGcNetworkLink } from "@/components/PlaceholderGcNetworkLink";
import { guideInstrumentName, guideLink } from "@/lib/guide-typography";

/**
 * Titles of official instruments, wherever they appear in prose.
 *
 * A page can name half a dozen directives and standards in a paragraph, and at
 * full body weight the titles crowd out the sentence explaining what each one
 * does. They are set paler so the eye passes over them and lands on the point.
 * Instrument titles that are also links get the same treatment in ExternalLink.
 *
 * Matched on the shapes a Government of Canada instrument title actually takes,
 * so nothing has to be tagged by hand in the content files.
 */
const INSTRUMENT_IN_PROSE = new RegExp(
  [
    "\\b(?:Directive|Policy|Standard|Guideline|Guide|Direction|Mandatory Procedures)\\s+(?:on|for)\\s+(?:the\\s+)?[A-Z][\\w'’-]*(?:\\s+(?:and|of|for|on|the|to|in)\\s+[A-Z][\\w'’-]*|\\s+[A-Z][\\w'’-]*)*",
    "\\b[A-Z][\\w'’-]*(?:\\s+[A-Z][\\w'’-]*)*\\s+(?:Act|Regulations)\\b",
  ].join("|"),
  "g",
);

function withMutedInstrumentNames(text: string, keyPrefix = "") {
  if (!INSTRUMENT_IN_PROSE.test(text)) {
    INSTRUMENT_IN_PROSE.lastIndex = 0;
    return text;
  }
  INSTRUMENT_IN_PROSE.lastIndex = 0;

  const out: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = INSTRUMENT_IN_PROSE.exec(text)) !== null) {
    if (match.index > last) out.push(text.slice(last, match.index));
    out.push(
      <span key={`${keyPrefix}-instrument-${match.index}`} className={guideInstrumentName}>
        {match[0]}
      </span>,
    );
    last = match.index + match[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}

export type { PlaceholderPhraseLink };

export type PlaceholderGcNetworkPhraseLink = {
  phrase: string;
  source: string;
  part?: string;
};

export type ExternalPhraseLink = {
  phrase: string;
  linkKey: ExternalLinkKey;
};

export type InternalPhraseLink = {
  phrase: string;
  to: string;
};

export type AnchorPhraseLink = {
  phrase: string;
  hash: string;
};

export type BoldPhrase = {
  phrase: string;
};

export type MailtoPhraseLink = {
  phrase: string;
  href: string;
};

type MixedPhraseLink =
  | ({ kind: "external" } & ExternalPhraseLink)
  | ({ kind: "internal" } & InternalPhraseLink)
  | ({ kind: "anchor" } & AnchorPhraseLink)
  | ({ kind: "placeholder" } & PlaceholderPhraseLink)
  | ({ kind: "placeholderGcNetwork" } & PlaceholderGcNetworkPhraseLink)
  | ({ kind: "mailto" } & MailtoPhraseLink)
  | ({ kind: "bold" } & BoldPhrase);

export function proseWithMixedLinks(
  text: string,
  {
    external = [],
    internal = [],
    anchor = [],
    placeholder = [],
    placeholderGcNetwork = [],
    mailto = [],
    bold = [],
    linkClassName = guideLink,
  }: {
    external?: ExternalPhraseLink[];
    internal?: InternalPhraseLink[];
    anchor?: AnchorPhraseLink[];
    placeholder?: PlaceholderPhraseLink[];
    placeholderGcNetwork?: PlaceholderGcNetworkPhraseLink[];
    mailto?: MailtoPhraseLink[];
    bold?: BoldPhrase[];
    linkClassName?: string;
  },
): ReactNode {
  const links: MixedPhraseLink[] = [
    ...external.map((link) => ({ kind: "external" as const, ...link })),
    ...internal.map((link) => ({ kind: "internal" as const, ...link })),
    ...anchor.map((link) => ({ kind: "anchor" as const, ...link })),
    ...placeholder.map((link) => ({ kind: "placeholder" as const, ...link })),
    ...placeholderGcNetwork.map((link) => ({
      kind: "placeholderGcNetwork" as const,
      ...link,
    })),
    ...mailto.map((link) => ({ kind: "mailto" as const, ...link })),
    ...bold.map((link) => ({ kind: "bold" as const, ...link })),
  ];

  if (links.length === 0) {
    return withMutedInstrumentNames(text);
  }

  const sorted = [...links].sort((a, b) => text.indexOf(a.phrase) - text.indexOf(b.phrase));
  const parts: ReactNode[] = [];
  let cursor = 0;

  for (const link of sorted) {
    const start = text.indexOf(link.phrase, cursor);
    if (start === -1) {
      // A phrase that does not appear in its own text is silently dropped, so a
      // link or a bold simply never renders and nothing says so. Surfaced in
      // development because it is invisible in review otherwise.
      //
      // Expect noise: several blocks share one link array across their
      // paragraphs, so a phrase legitimately absent here may render in a
      // sibling. Check whether it renders anywhere on the page before fixing.
      if (import.meta.env.DEV) {
        console.warn(
          `[guide] phrase not in this text — "${link.phrase}" — check it renders somewhere on the page. Text: ${text.slice(0, 80)}…`,
        );
      }
      continue;
    }

    if (start > cursor) {
      parts.push(withMutedInstrumentNames(text.slice(cursor, start), `gap-${start}`));
    }

    parts.push(
      link.kind === "external" ? (
        <ExternalLink
          key={`${link.linkKey}-${start}`}
          linkKey={link.linkKey}
          className={linkClassName}
        >
          {link.phrase}
        </ExternalLink>
      ) : link.kind === "internal" ? (
        <Link key={`${link.to}-${start}`} to={link.to} className={linkClassName}>
          {link.phrase}
        </Link>
      ) : link.kind === "placeholder" ? (
        <Link
          key={`${link.source}-${link.part ?? ""}-${start}`}
          to="/source-coming-soon"
          search={{ source: link.source, part: link.part }}
          className={linkClassName}
        >
          {link.phrase}
        </Link>
      ) : link.kind === "placeholderGcNetwork" ? (
        <PlaceholderGcNetworkLink
          key={`gc-${link.source}-${link.part ?? ""}-${start}`}
          source={link.source}
          part={link.part}
        >
          {link.phrase}
        </PlaceholderGcNetworkLink>
      ) : link.kind === "mailto" ? (
        <a key={`mailto-${start}`} href={link.href} className={linkClassName}>
          {link.phrase}
        </a>
      ) : link.kind === "bold" ? (
        <strong key={`bold-${link.phrase}-${start}`} className="font-semibold text-foreground/90">
          {link.phrase}
        </strong>
      ) : (
        <a key={`${link.hash}-${start}`} href={`#${link.hash}`} className={linkClassName}>
          {link.phrase}
        </a>
      ),
    );
    cursor = start + link.phrase.length;
  }

  if (cursor < text.length) {
    parts.push(withMutedInstrumentNames(text.slice(cursor), "tail"));
  }

  return parts.length === 1 ? parts[0] : <>{parts}</>;
}

export function proseWithExternalLinks(
  text: string,
  links: ExternalPhraseLink[],
): ReactNode {
  return proseWithMixedLinks(text, { external: links });
}
