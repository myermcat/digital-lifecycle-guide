import { CaseStudyBlock } from "@/components/CaseStudyBlock";
import { ContractingSectionNav } from "@/components/ContractingSectionNav";
import { EditorialNote } from "@/components/EditorialNote";
import { PhaseSection } from "@/components/PhaseSection";
import { ThreadArticleLayout } from "@/components/ThreadArticleLayout";
import type { ContractingSubPage as ContractingSubPageContent } from "@/lib/contracting-subpages";
import { guideProse, guideProseSpace } from "@/lib/guide-typography";

export function ContractingSubPage({ page }: { page: ContractingSubPageContent }) {
  const sectionNav = <ContractingSectionNav slug={page.slug} />;

  if (page.stub) {
    return (
      <ThreadArticleLayout
        id={`contracting-${page.slug}`}
        title={page.title}
        afterAssumptions={sectionNav}
      >
        <p className={guideProse}>
          This page is still to come. It will cover what it means to hold on to enough
          understanding to govern the work and to handle an exit.
        </p>
      </ThreadArticleLayout>
    );
  }

  return (
    <ThreadArticleLayout
      id={`contracting-${page.slug}`}
      title={page.title}
      afterAssumptions={sectionNav}
    >
      {page.intro ? (
        <section className={guideProseSpace}>
          {page.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>
      ) : null}

      {page.sections.map((section) => (
        <PhaseSection key={section.id} title={section.title} sectionId={section.id}>
          {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {section.bullets ? (
            <ul className="space-y-3 list-none pl-0">
              {section.bullets.map((bullet) => (
                <li key={bullet.lead} className={guideProse}>
                  <span className="font-semibold text-foreground/90">{bullet.lead}</span>{" "}
                  {bullet.body}
                </li>
              ))}
            </ul>
          ) : null}
          {section.paragraphsAfterBullets?.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {section.caseStudy ? (
            <CaseStudyBlock
              className="mt-6"
              title="The same programme, bought two ways"
              intro={section.caseStudy.intro}
              actual={section.caseStudy.risky}
              alternative={section.caseStudy.safer}
            />
          ) : null}
          {section.editorialNote ? (
            <EditorialNote label={section.editorialNote.label}>
              {section.editorialNote.body}
            </EditorialNote>
          ) : null}
        </PhaseSection>
      ))}

      {page.trailingEditorialNote ? (
        <EditorialNote
          label={page.trailingEditorialNote.label}
          className="mt-10 md:mt-12"
        >
          {page.trailingEditorialNote.body}
        </EditorialNote>
      ) : null}
    </ThreadArticleLayout>
  );
}
