import { CaseStudyBlock } from "@/components/CaseStudyBlock";
import { ContractingSectionNav } from "@/components/ContractingSectionNav";
import { EditorialNote } from "@/components/EditorialNote";
import {
  ThreadArticleLeadList,
  ThreadArticleQaList,
  ThreadArticleSection,
} from "@/components/ThreadArticleSection";
import { ThreadArticleLayout } from "@/components/ThreadArticleLayout";
import type { ContractingSubPage as ContractingSubPageContent } from "@/lib/contracting-subpages";
import {
  guideArticleCalloutLift,
  guideArticleProse,
  guideArticleSectionGap,
} from "@/lib/guide-article";
import { guideProse } from "@/lib/guide-typography";

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
        <section className={guideArticleProse}>
          {page.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>
      ) : null}

      {page.sections.map((section, index) => (
        <ThreadArticleSection
          key={section.id}
          title={section.title}
          sectionId={section.id}
          isFirst={index === 0 && !page.intro}
        >
          {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {section.bullets && section.bulletsVariant === "qa" ? (
            <ThreadArticleQaList items={section.bullets} />
          ) : section.bullets ? (
            <ThreadArticleLeadList items={section.bullets} />
          ) : null}
          {section.paragraphsAfterBullets?.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {section.caseStudy ? (
            <CaseStudyBlock
              className={guideArticleCalloutLift}
              title="The same programme, bought two ways"
              intro={section.caseStudy.intro}
              actual={section.caseStudy.risky}
              alternative={section.caseStudy.safer}
            />
          ) : null}
          {section.editorialNote ? (
            <EditorialNote
              label={section.editorialNote.label}
              className={guideArticleCalloutLift}
            >
              {section.editorialNote.body}
            </EditorialNote>
          ) : null}
        </ThreadArticleSection>
      ))}

      {page.trailingEditorialNote ? (
        <EditorialNote
          label={page.trailingEditorialNote.label}
          className={guideArticleSectionGap}
        >
          {page.trailingEditorialNote.body}
        </EditorialNote>
      ) : null}
    </ThreadArticleLayout>
  );
}
