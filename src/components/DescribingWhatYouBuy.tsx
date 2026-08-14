import { CaseStudyBlock } from "@/components/CaseStudyBlock";
import requirementToSow from "@/assets/requirement_to_statement_of_work.svg?url";
import { SOO_VS_SOW } from "@/lib/soo-vs-sow-content";
import { guideProse, guideProseSpace, guideSectionTitle } from "@/lib/guide-typography";

/**
 * How the work gets described in writing.
 *
 * This was a full comparison of the statement of requirement against the
 * statement of work. It is down to a paragraph because a department does not
 * choose between them: it writes one, and the supplier answers with the other.
 */
export function DescribingWhatYouBuy() {
  return (
    <section className="mt-10 md:mt-12 scroll-mt-24" id="describing-what-you-buy">
      <h2 className={`${guideSectionTitle} mb-3`}>Describing what you buy</h2>

      <div className={guideProseSpace}>
        {SOO_VS_SOW.summary.map((paragraph) => (
          <p key={paragraph} className={guideProse}>
            {paragraph}
          </p>
        ))}
      </div>

      <img
        src={requirementToSow}
        alt="Three boxes in a row. Challenge statement, the problem and who has it with no solution named, leads to Requirements, what the service has to achieve and how well, which leads to Statement of work, the work being bought, written from the two before it. A dashed line from the statement of work reads: goes into the solicitation, then annexed to the contract. A caption says Canada writes all three."
        className="mx-auto mt-6 w-full max-w-3xl"
      />

      <div className={`${guideProseSpace} mt-6`}>
        {SOO_VS_SOW.afterVisual.map((paragraph) => (
          <p key={paragraph} className={guideProse}>
            {paragraph}
          </p>
        ))}
      </div>

      <CaseStudyBlock
        className="mt-6"
        actual={SOO_VS_SOW.comparison.sow}
        alternative={SOO_VS_SOW.comparison.soo}
        actualLabel={SOO_VS_SOW.comparison.actualLabel}
        alternativeLabel={SOO_VS_SOW.comparison.alternativeLabel}
      />
    </section>
  );
}
