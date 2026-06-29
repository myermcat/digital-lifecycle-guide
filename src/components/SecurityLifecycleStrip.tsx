import securityLifecycleCircle from "@/assets/security_lifecycle_circle.svg?url";
import type { SecurityLifecycleContent } from "@/lib/security-thread-content";
import { threadCoreStripAltText } from "@/lib/thread-core-strip";
import { renderLinkedProse } from "@/lib/thread-rich-content";
import { guideProse } from "@/lib/guide-typography";
import { cn } from "@/lib/utils";

export function SecurityLifecycleStrip({
  content,
  className,
}: {
  content: SecurityLifecycleContent;
  className?: string;
}) {
  return (
    <section
      className={cn("mt-4 md:mt-5 scroll-mt-24", className)}
      id="the-security-lifecycle"
      aria-labelledby="security-lifecycle-heading"
    >
      <figure className="mx-auto max-w-lg cursor-default pointer-events-none select-none not-prose">
        <img
          id="security-lifecycle-heading"
          src={securityLifecycleCircle}
          alt={threadCoreStripAltText({ heading: content.heading, tiles: content.tiles })}
          className="w-full h-auto"
          width={600}
          height={520}
        />
      </figure>
      <p className={`${guideProse} mt-4`}>{renderLinkedProse(content.framing)}</p>
    </section>
  );
}
