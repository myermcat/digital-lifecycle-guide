import { Link } from "@tanstack/react-router";
import { ScrollText } from "lucide-react";
import { StandoutIconCallout } from "@/components/StandoutIconCallout";
import { PROCUREMENT_LANDING } from "@/lib/procurement-landing";
import { guideLink } from "@/lib/guide-typography";

/**
 * Standalone good-contract callout on the Procurement thread — same visual weight
 * as {@link ProcurementCallout} on subphase pages.
 */
export function GoodContractCallout({
  id = "good-contract",
  className,
}: {
  id?: string;
  className?: string;
}) {
  const callout = PROCUREMENT_LANDING.goodContractCallout;

  return (
    <StandoutIconCallout
      id={id}
      className={className ?? "mt-10 md:mt-12"}
      icon={ScrollText}
      label={callout.label}
      title={callout.title}
      footer={
        <Link to={callout.href} className={`text-sm ${guideLink}`}>
          {callout.linkLabel}
        </Link>
      }
    >
      {callout.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </StandoutIconCallout>
  );
}
