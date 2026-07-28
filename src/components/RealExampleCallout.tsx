import { History } from "lucide-react";
import { StandoutIconCallout } from "@/components/StandoutIconCallout";
import type { RealExample } from "@/lib/real-examples";
import { renderLinkedProse } from "@/lib/thread-rich-content";

/**
 * A documented Government of Canada failure story, placed after the caution
 * block on a sub-phase page to make the consequences of skipping the rules
 * concrete. Content lives in `@/lib/real-examples`.
 */
export function RealExampleCallout({
  example,
  className,
}: {
  example: RealExample;
  className?: string;
}) {
  return (
    <StandoutIconCallout
      id={example.id}
      className={className}
      icon={History}
      label="A REAL EXAMPLE"
      title={example.title}
    >
      {example.paragraphs.map((paragraph) => (
        <p key={paragraph.text.slice(0, 40)}>{renderLinkedProse(paragraph)}</p>
      ))}
    </StandoutIconCallout>
  );
}
