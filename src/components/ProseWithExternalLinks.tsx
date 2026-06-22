import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ExternalLink } from "@/components/ExternalLink";
import type { ExternalLinkKey } from "@/lib/external-links";
import type { PlaceholderPhraseLink } from "@/lib/placeholder-sources";
import { PlaceholderGcNetworkLink } from "@/components/PlaceholderGcNetworkLink";
import { guideLink } from "@/lib/guide-typography";

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
  }: {
    external?: ExternalPhraseLink[];
    internal?: InternalPhraseLink[];
    anchor?: AnchorPhraseLink[];
    placeholder?: PlaceholderPhraseLink[];
    placeholderGcNetwork?: PlaceholderGcNetworkPhraseLink[];
    mailto?: MailtoPhraseLink[];
    bold?: BoldPhrase[];
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
    return text;
  }

  const sorted = [...links].sort((a, b) => text.indexOf(a.phrase) - text.indexOf(b.phrase));
  const parts: ReactNode[] = [];
  let cursor = 0;

  for (const link of sorted) {
    const start = text.indexOf(link.phrase, cursor);
    if (start === -1) {
      continue;
    }

    if (start > cursor) {
      parts.push(text.slice(cursor, start));
    }

    parts.push(
      link.kind === "external" ? (
        <ExternalLink key={`${link.linkKey}-${start}`} linkKey={link.linkKey}>
          {link.phrase}
        </ExternalLink>
      ) : link.kind === "internal" ? (
        <Link key={`${link.to}-${start}`} to={link.to} className={guideLink}>
          {link.phrase}
        </Link>
      ) : link.kind === "placeholder" ? (
        <Link
          key={`${link.source}-${link.part ?? ""}-${start}`}
          to="/source-coming-soon"
          search={{ source: link.source, part: link.part }}
          className={guideLink}
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
        <a key={`mailto-${start}`} href={link.href} className={guideLink}>
          {link.phrase}
        </a>
      ) : link.kind === "bold" ? (
        <strong key={`bold-${link.phrase}-${start}`} className="font-semibold text-foreground/90">
          {link.phrase}
        </strong>
      ) : (
        <a key={`${link.hash}-${start}`} href={`#${link.hash}`} className={guideLink}>
          {link.phrase}
        </a>
      ),
    );
    cursor = start + link.phrase.length;
  }

  if (cursor < text.length) {
    parts.push(text.slice(cursor));
  }

  return parts.length === 1 ? parts[0] : <>{parts}</>;
}

export function proseWithExternalLinks(
  text: string,
  links: ExternalPhraseLink[],
): ReactNode {
  return proseWithMixedLinks(text, { external: links });
}
