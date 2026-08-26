import { GUIDE_ASSUMPTIONS_TEXT } from "@/lib/guide-strings";
import { externalLinkUrl } from "@/lib/external-links";
import { UI } from "@/lib/ui-strings";

export { GUIDE_ASSUMPTIONS_TEXT };


const assumptionsMutedLink =
  "underline underline-offset-[3px] decoration-muted-foreground/25 text-muted-foreground/48 hover:text-muted-foreground/55 hover:decoration-muted-foreground/35 transition-colors";

function AssumptionsBody() {
  const start = GUIDE_ASSUMPTIONS_TEXT.indexOf(UI.digitalStandardsPhrase);
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
        {UI.digitalStandardsPhrase}
      </a>
      {GUIDE_ASSUMPTIONS_TEXT.slice(start + UI.digitalStandardsPhrase.length)}
    </>
  );
}

export function GuideAssumptions({ className }: { className?: string }) {
  return (
    <div className={`space-y-2 text-sm leading-[1.7] text-muted-foreground/50 ${className ?? ""}`}>
      <p className="text-xs uppercase tracking-[0.18em] font-normal text-muted-foreground/35">
        {UI.assumptionsThisPageMakes}
      </p>
      <p className="text-muted-foreground/40">
        <AssumptionsBody />
      </p>
    </div>
  );
}
