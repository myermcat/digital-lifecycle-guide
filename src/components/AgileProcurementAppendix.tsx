import { PROCUREMENT_STRINGS } from "@/lib/procurement-strings";
import { renderLinkedProse } from "@/lib/thread-rich-content";
import {
  guideBlockSubheading,
  guideCalloutLabel,
  guideListIndent,
  guideProse,
  guideProseSpace,
  guideSectionTitle,
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
    <section className="mt-12 md:mt-16 scroll-mt-24" id={appendix.id}>
      <p className={guideCalloutLabel}>{appendix.label}</p>
      <h2 className={`${guideSectionTitle} mt-1.5 mb-3`}>{appendix.heading}</h2>

      <div className={guideProseSpace}>
        {appendix.intro.map((paragraph) => (
          <p key={paragraph.text}>{renderLinkedProse(paragraph)}</p>
        ))}

        <p className={guideBlockSubheading}>{appendix.whatItIsHeading}</p>
        <p>{renderLinkedProse(appendix.whatItIs)}</p>
        <ul className={`list-disc space-y-1.5 ${guideListIndent}`}>
          {appendix.pillars.map((pillar) => (
            <li key={pillar.lead}>
              <strong className="font-semibold text-foreground">{pillar.lead}</strong>{" "}
              {pillar.body}
            </li>
          ))}
        </ul>

        <p className={guideBlockSubheading}>{appendix.exampleHeading}</p>
        <p>{renderLinkedProse(appendix.exampleIntro)}</p>
        <ol className={`list-decimal space-y-1.5 ${guideListIndent}`}>
          {appendix.exampleSteps.map((step) => (
            <li key={step.bold}>
              <strong className="font-semibold text-foreground">{step.bold}</strong>
              {step.text}
            </li>
          ))}
        </ol>
        <p>{renderLinkedProse(appendix.exampleClose)}</p>

        <p className={guideBlockSubheading}>{appendix.earlierHeading}</p>
        <p>{renderLinkedProse(appendix.earlierIntro)}</p>
        <ul className={`list-disc space-y-1.5 ${guideListIndent}`}>
          {appendix.earlierItems.map((item) => (
            <li key={item.lead}>
              <strong className="font-semibold text-foreground">{item.lead}</strong>{" "}
              {item.body}
            </li>
          ))}
        </ul>
        <p>{renderLinkedProse(appendix.paysNote)}</p>

        <p className={guideBlockSubheading}>{appendix.cautionsHeading}</p>
        <ul className={`list-disc space-y-1.5 ${guideListIndent}`}>
          {appendix.cautions.map((caution) => (
            <li key={caution.lead}>
              <strong className="font-semibold text-foreground">{caution.lead}</strong>{" "}
              {caution.body}
            </li>
          ))}
        </ul>
        <p className={guideProse}>{renderLinkedProse(appendix.close)}</p>
      </div>
    </section>
  );
}
