import type { ReactNode } from "react";
import { guideLink } from "@/lib/guide-typography";
import {
  externalLinkUrl,
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
  return (
    <a
      href={externalLinkUrl(linkKey)}
      className={cn(guideLink, className)}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
