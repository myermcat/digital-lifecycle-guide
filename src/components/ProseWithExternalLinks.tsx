import type { ReactNode } from "react";
import { ExternalLink } from "@/components/ExternalLink";
import type { ExternalLinkKey } from "@/lib/external-links";

export type ExternalPhraseLink = {
  phrase: string;
  linkKey: ExternalLinkKey;
};

export function proseWithExternalLinks(
  text: string,
  links: ExternalPhraseLink[],
): ReactNode {
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
      <ExternalLink key={`${link.linkKey}-${start}`} linkKey={link.linkKey}>
        {link.phrase}
      </ExternalLink>,
    );
    cursor = start + link.phrase.length;
  }

  if (cursor < text.length) {
    parts.push(text.slice(cursor));
  }

  return parts.length === 1 ? parts[0] : <>{parts}</>;
}
