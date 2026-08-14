import { CaseStudyBlock } from "@/components/CaseStudyBlock";
import { EditorialNote } from "@/components/EditorialNote";
import { SOO_VS_SOW } from "@/lib/soo-vs-sow-content";
import { guideProse, guideProseSpace, guideSectionTitle } from "@/lib/guide-typography";

/**
 * The statement of requirement against the statement of work.
 *
 * This was a standalone reference page. It is one distinction, and it belongs
 * beside the rest of the contract material rather than a click away from it, so
 * it now renders here. The old URL redirects to this section.
 */
export function DescribingWhatYouBuy() {
  const { comparison } = SOO_VS_SOW;

  return (
    <section className="mt-10 md:mt-12 scroll-mt-24" id="describing-what-you-buy">
      <h2 className={`${guideSectionTitle} mb-3`}>Describing what you buy</h2>

      <div className={guideProseSpace}>
        <p>{SOO_VS_SOW.opening}</p>
        <p>{SOO_VS_SOW.whatEachOneIs.body}</p>
      </div>

      <CaseStudyBlock
        className="mt-6"
        actual={comparison.sow}
        alternative={comparison.soo}
        actualLabel={comparison.actualLabel}
        alternativeLabel={comparison.alternativeLabel}
      />

      <div className={`${guideProseSpace} mt-6`}>
        <p>{SOO_VS_SOW.workTogether.body}</p>
      </div>

      <div className="mt-6">
        <h3 className={`${guideProse} mb-2 font-semibold text-foreground`}>
          {SOO_VS_SOW.workedExample.title}
        </h3>
        <div className={guideProseSpace}>
          {SOO_VS_SOW.workedExample.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>

      <EditorialNote className="mt-6">
        <p>{SOO_VS_SOW.termNote.text}</p>
      </EditorialNote>
    </section>
  );
}
