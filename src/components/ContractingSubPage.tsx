import { Link } from "@tanstack/react-router";
import { ContentTodo } from "@/components/ContentTodo";
import { OptionsLadder } from "@/components/OptionsLadder";
import { CaseStudyBlock } from "@/components/CaseStudyBlock";
import { ContractingSectionNav } from "@/components/ContractingSectionNav";
import {
  ThreadArticleLeadList,
  ThreadArticleQaList,
  ThreadArticleSection,
} from "@/components/ThreadArticleSection";
import { ThreadArticleLayout } from "@/components/ThreadArticleLayout";
import { proseWithExternalLinks, proseWithMixedLinks } from "@/components/ProseWithExternalLinks";
import type {
  ContractingSubPage as ContractingSubPageContent,
  ContractingBullet,
  ContractingParagraph,
} from "@/lib/contracting-subpages";
import { contractingParagraphPlainText } from "@/lib/contracting-subpages";
import {
  guideArticleCalloutLift,
  guideAsideNote,
  guideArticleProse,
} from "@/lib/guide-article";
import { guideLink, guideProse, guideListIndent } from "@/lib/guide-typography";

function renderParagraph(
  paragraph: string,
  paragraphIndex: number,
  section: ContractingSubPageContent["sections"][number],
) {
  const internalLink = section.paragraphLinks?.find(
    (item) => item.index === paragraphIndex,
  );
  if (internalLink) {
    return paragraphWithLink(paragraph, internalLink);
  }

  const externalLinks =
    section.externalParagraphLinks?.filter(
      (item) => item.index === paragraphIndex,
    ) ?? [];
  if (externalLinks.length > 0) {
    return proseWithExternalLinks(paragraph, externalLinks);
  }

  const placeholderLinks =
    section.placeholderParagraphLinks?.filter(
      (item) => item.index === paragraphIndex,
    ) ?? [];
  if (placeholderLinks.length > 0) {
    return proseWithMixedLinks(paragraph, { placeholder: placeholderLinks });
  }

  return paragraph;
}

function paragraphWithLink(
  paragraph: string,
  link?: { phrase: string; to: string },
) {
  if (!link) {
    return paragraph;
  }

  const start = paragraph.indexOf(link.phrase);
  if (start === -1) {
    return paragraph;
  }

  return (
    <>
      {paragraph.slice(0, start)}
      <Link to={link.to} className={guideLink}>
        {link.phrase}
      </Link>
      {paragraph.slice(start + link.phrase.length)}
    </>
  );
}

function renderContractingParagraph(paragraph: ContractingParagraph) {
  if (typeof paragraph === "string") {
    return paragraph;
  }

  return proseWithMixedLinks(paragraph.text, {
    external: paragraph.externalLinks,
    bold: paragraph.bold,
  });
}

function renderBulletBody(bullet: ContractingBullet) {
  if (bullet.paragraphLink) {
    return paragraphWithLink(bullet.body, bullet.paragraphLink);
  }

  if (bullet.externalLink) {
    return proseWithExternalLinks(bullet.body, [
      { phrase: bullet.externalLink.phrase, linkKey: bullet.externalLink.linkKey },
    ]);
  }

  return bullet.body;
}

export function ContractingSubPage({ page }: { page: ContractingSubPageContent }) {
  const sectionNav = <ContractingSectionNav slug={page.slug} />;

  if (page.stub) {
    return (
      <ThreadArticleLayout
        id={`procurement-${page.slug}`}
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
      id={`procurement-${page.slug}`}
      title={page.title}
      sources={page.sources}
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
          {section.paragraphs?.map((paragraph, paragraphIndex) => (
            <p key={paragraph}>
              {renderParagraph(paragraph, paragraphIndex, section)}
            </p>
          ))}
          {section.bulletLead ? (
            <p className="font-semibold text-foreground/90">{section.bulletLead}</p>
          ) : null}
          {section.continuationBullets ? (
            <ul className={`list-disc space-y-1 ${guideListIndent} ${guideProse}`}>
              {section.continuationBullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
          {section.bullets && section.bulletsVariant === "qa" ? (
            <ThreadArticleQaList items={section.bullets} />
          ) : section.bullets && section.bulletsVariant === "ladder" ? (
            <OptionsLadder items={section.bullets} />
          ) : section.bullets ? (
            <ThreadArticleLeadList
              items={section.bullets.map((bullet) => ({
                ...bullet,
                body: renderBulletBody(bullet),
              }))}
            />
          ) : null}
          {section.highlightedNote ? (
            <p className={guideAsideNote}>
              <strong className="font-semibold text-foreground/60">
                {section.highlightedNote.lead}
              </strong>{" "}
              {section.highlightedNote.body}
            </p>
          ) : null}
          {section.paragraphsAfterBullets?.map((paragraph) => (
            <p
              key={contractingParagraphPlainText(paragraph)}
              className={
                section.paragraphsAfterBulletsVariant === "note" ? guideAsideNote : undefined
              }
            >
              {renderContractingParagraph(paragraph)}
            </p>
          ))}
          {section.paragraphsAfterNote?.map((paragraph) => (
            <p key={paragraph} className={guideAsideNote}>
              {paragraph}
            </p>
          ))}
          {section.contentTodo ? (
            <ContentTodo
              title={section.contentTodo.title}
              items={section.contentTodo.items}
              note={section.contentTodo.note}
            />
          ) : null}
          {section.caseStudy ? (
            <CaseStudyBlock
              className={guideArticleCalloutLift}
              title="The same programme, bought two ways"
              intro={section.caseStudy.intro}
              actual={section.caseStudy.risky}
              alternative={section.caseStudy.safer}
            />
          ) : null}
        </ThreadArticleSection>
      ))}
    </ThreadArticleLayout>
  );
}
