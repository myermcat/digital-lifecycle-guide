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
      className={cn(gcNetworkOnly ? guideLinkGcNetwork : guideLink, className)}
      title={gcNetworkOnly ? "GC network only" : undefined}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
