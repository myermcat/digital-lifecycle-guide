import { CaseStudyBlock } from "@/components/CaseStudyBlock";
import { GuideCallout } from "@/components/GuideCallout";
import { TraditionalAgileComparison } from "@/components/TraditionalAgileComparison";
import { GuideArrowBullet } from "@/lib/guide-lists";
import { PROCUREMENT_LANDING } from "@/lib/procurement-landing";
import { PROCUREMENT_STRINGS } from "@/lib/procurement-strings";
import { renderLinkedProse } from "@/lib/thread-rich-content";
import {
  guideArrowList,
  guideCalloutLabel,
  guideListIndent,
  guideProse,
  guideProseSpace,
  guideSectionTitle,
  guideSubsectionTitle,
} from "@/lib/guide-typography";

/**
 * Agile procurement, kept off the main flow.
 *
 * It is a separate subject: a way of running a purchase, not one of the routes
 * a department chooses between. Everywhere else on the page points here rather
 * than explaining it again, so this is the only place it is set out.
 */
export function AgileProcurementAppendix() {
  const appendix = PROCUREMENT_STRINGS.agileAppendix;

  return (
    <section className="mt-14 md:mt-20 scroll-mt-24" id={appendix.id}>
      <div className="border-t border-border pt-8 md:pt-10">
        <p className={guideCalloutLabel}>{appendix.label}</p>
        <h2 className={`${guideSectionTitle} mt-1.5 mb-4`}>{appendix.heading}</h2>
      </div>

      <div className={guideProseSpace}>
        {appendix.intro.map((paragraph) => (
          <p key={paragraph.text}>{renderLinkedProse(paragraph)}</p>
        ))}
      </div>

      <h3 className={`${guideSubsectionTitle} mt-9 mb-3`}>{appendix.whatItIsHeading}</h3>
      <p className={`${guideProse} mb-4`}>{renderLinkedProse(appendix.whatItIs)}</p>
      <div className="rounded-lg border border-border bg-card px-6 py-6 shadow-sm md:px-8">
        <ul className={guideArrowList}>
          {appendix.pillars.map((pillar) => (
            <li key={pillar.lead} className="flex items-start gap-2.5">
              <GuideArrowBullet />
              <p className={guideProse}>
                <strong className="font-semibold text-foreground">{pillar.lead}</strong>{" "}
                {pillar.body}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <h3 className={`${guideSubsectionTitle} mt-10 mb-3`}>{appendix.exampleHeading}</h3>
      <p className={`${guideProse} mb-4`}>{renderLinkedProse(appendix.exampleIntro)}</p>
      <ol
        className={`${guideProse} rounded-lg border border-border/70 bg-muted/25 px-6 py-5 list-decimal space-y-2.5 md:px-8 ${guideListIndent}`}
      >
        {appendix.exampleSteps.map((step) => (
          <li key={step.bold}>
            <strong className="font-semibold text-foreground">{step.bold}</strong>
            {step.text}
          </li>
        ))}
      </ol>
      <p className={`${guideProse} mt-4`}>{renderLinkedProse(appendix.exampleClose)}</p>

      <h3 className={`${guideSubsectionTitle} mt-10 mb-3`}>{appendix.earlierHeading}</h3>
      <p className={`${guideProse} mb-3`}>{renderLinkedProse(appendix.earlierIntro)}</p>
      <ul className={`${guideProse} list-disc space-y-2 ${guideListIndent}`}>
        {appendix.earlierItems.map((item) => (
          <li key={item.lead}>
            <strong className="font-semibold text-foreground">{item.lead}</strong>{" "}
            {item.body}
          </li>
        ))}
      </ul>
      <GuideCallout compact className="mt-5" label="Who pays">
        <p>{renderLinkedProse(appendix.paysNote)}</p>
      </GuideCallout>

      <h3 className={`${guideSubsectionTitle} mt-10 mb-3`}>{appendix.comparisonHeading}</h3>
      <p className={`${guideProse}`}>{appendix.comparisonIntro}</p>
      <TraditionalAgileComparison
        rows={PROCUREMENT_LANDING.comparisonRows}
        caption={PROCUREMENT_LANDING.comparisonCaption}
      />
      <CaseStudyBlock
        className="mt-8"
        id="case-study"
        title={PROCUREMENT_LANDING.caseStudy.title}
        actual={PROCUREMENT_LANDING.caseStudy.risky}
        alternative={PROCUREMENT_LANDING.caseStudy.safer}
      />

      <h3 className={`${guideSubsectionTitle} mt-10 mb-3`}>{appendix.cautionsHeading}</h3>
      <ul className={`${guideProse} list-disc space-y-2 ${guideListIndent}`}>
        {appendix.cautions.map((caution) => (
          <li key={caution.lead}>
            <strong className="font-semibold text-foreground">{caution.lead}</strong>{" "}
            {caution.body}
          </li>
        ))}
      </ul>
      <p className={`${guideProse} mt-4`}>{renderLinkedProse(appendix.close)}</p>
    </section>
  );
}
