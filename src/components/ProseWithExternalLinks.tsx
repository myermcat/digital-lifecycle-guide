import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ExternalLink } from "@/components/ExternalLink";
import type { ExternalLinkKey } from "@/lib/external-links";
import { guideLink } from "@/lib/guide-typography";

export type ExternalPhraseLink = {
  phrase: string;
  linkKey: ExternalLinkKey;
};

export type InternalPhraseLink = {
  phrase: string;
  to: string;
};

type MixedPhraseLink =
  | ({ kind: "external" } & ExternalPhraseLink)
  | ({ kind: "internal" } & InternalPhraseLink);

export function proseWithMixedLinks(
  text: string,
  {
    external = [],
    internal = [],
  }: {
    external?: ExternalPhraseLink[];
    internal?: InternalPhraseLink[];
  },
): ReactNode {
  const links: MixedPhraseLink[] = [
    ...external.map((link) => ({ kind: "external" as const, ...link })),
    ...internal.map((link) => ({ kind: "internal" as const, ...link })),
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
      ) : (
        <Link key={`${link.to}-${start}`} to={link.to} className={guideLink}>
          {link.phrase}
        </Link>
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
