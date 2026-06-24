import type { ReactNode } from "react";
import { guideLink, guideLinkGcNetwork } from "@/lib/guide-typography";
import {
  externalLinkUrl,
  isGcNetworkOnly,
  type ExternalLinkKey,
} from "@/lib/external-links";
import { cn } from "@/lib/utils";

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
        gcNetworkOnly ? guideLinkGcNetwork : cn(guideLink, className)
      }
      title={gcNetworkOnly ? "Only available on the Government of Canada network." : undefined}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
