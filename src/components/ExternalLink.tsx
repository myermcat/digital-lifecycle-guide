import type { ReactNode } from "react";
import { guideLink, guideLinkGcNetwork, guideLinkInstrument } from "@/lib/guide-typography";
import {
  externalLinkUrl,
  isGcNetworkOnly,
  type ExternalLinkKey,
} from "@/lib/external-links";
import { cn } from "@/lib/utils";

/**
 * Is this link's text the title of an official instrument?
 *
 * Instrument titles follow a small number of shapes, and there are enough of
 * them in the guide that at full link weight they crowd out the prose that
 * explains what each one does. Matching on the shape avoids having to flag
 * every entry in the registry by hand.
 */
const INSTRUMENT_TITLE = new RegExp(
  [
    // Starts with the instrument kind: "Directive on…", "Policy on…"
    "^(the )?(directive|polic(y|ies)|standards?|guidelines?|guide|frameworks?|mandatory procedures|direction)\\b",
    // Or ends with it: "Accessible Canada Regulations", "GC Enterprise Architecture Framework"
    "\\b(act|regulations?|standards?|framework|polic(y|ies)|directive|guidelines?|procedures)$",
  ].join("|"),
  "i",
);

function isInstrumentName(children: ReactNode) {
  return typeof children === "string" && INSTRUMENT_TITLE.test(children.trim());
}

export function ExternalLink({
  linkKey,
  children,
  className,
}: {
  linkKey: ExternalLinkKey;
  children: ReactNode;
  className?: string;
}) {
  const gcNetworkOnly = isGcNetworkOnly(linkKey);

  return (
    <a
      href={externalLinkUrl(linkKey)}
      className={
        gcNetworkOnly
          ? guideLinkGcNetwork
          : isInstrumentName(children)
            // Instrument styling goes last so it survives the default guideLink
            // that ProseWithExternalLinks passes down for every link in prose.
            ? cn(className, guideLinkInstrument)
            : cn(guideLink, className)
      }
      title={gcNetworkOnly ? "Only available on the Government of Canada network." : undefined}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
