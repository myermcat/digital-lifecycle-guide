import { GUIDE_ASSUMPTIONS_TEXT } from "@/lib/guide-strings";
import { externalLinkUrl } from "@/lib/external-links";

export { GUIDE_ASSUMPTIONS_TEXT };

const DIGITAL_STANDARDS_PHRASE = "Government of Canada Digital Standards";

const assumptionsMutedLink =
  "underline underline-offset-[3px] decoration-muted-foreground/25 text-muted-foreground/48 hover:text-muted-foreground/55 hover:decoration-muted-foreground/35 transition-colors";

function AssumptionsBody() {
  const start = GUIDE_ASSUMPTIONS_TEXT.indexOf(DIGITAL_STANDARDS_PHRASE);
  if (start === -1) {
    return GUIDE_ASSUMPTIONS_TEXT;
  }

  return (
    <>
      {GUIDE_ASSUMPTIONS_TEXT.slice(0, start)}
      <a
        href={externalLinkUrl("digital-standards")}
        className={assumptionsMutedLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        {DIGITAL_STANDARDS_PHRASE}
      </a>
      {GUIDE_ASSUMPTIONS_TEXT.slice(start + DIGITAL_STANDARDS_PHRASE.length)}
    </>
  );
}

export function GuideAssumptions({ className }: { className?: string }) {
  return (
    <div className={`space-y-2 text-sm leading-[1.7] text-muted-foreground/50 ${className ?? ""}`}>
      <p className="text-xs uppercase tracking-[0.18em] font-normal text-muted-foreground/35">
        Assumptions this page makes
      </p>
      <p className="text-muted-foreground/40">
        <AssumptionsBody />
      </p>
    </div>
  );
}
