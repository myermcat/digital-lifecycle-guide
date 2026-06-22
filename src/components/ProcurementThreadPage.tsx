import { Link } from "@tanstack/react-router";
import { GuideLayout } from "@/components/GuideLayout";
import { GuideAssumptions } from "@/components/GuideAssumptions";
import { HeldOpenBlock } from "@/components/HeldOpenBlock";
import { PageFoot } from "@/components/PageFoot";
import { proseWithExternalLinks, type ExternalPhraseLink } from "@/components/ProseWithExternalLinks";
import { PROCUREMENT_HELD_OPEN } from "@/lib/contracting-landing";
import { PROCUREMENT_CONTRACTING_SOURCES } from "@/lib/procurement-sources";
import { THREADS } from "@/lib/guide-strings";
import { guidePageTitle } from "@/lib/guide-typography";

export function ProcurementThreadPage() {
  const title = THREADS.procurement.title;

  return (
    <GuideLayout id="thread-procurement">
      <header className="mb-8 md:mb-10">
        <nav aria-label="Breadcrumb" className="text-xs tracking-wide text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span aria-hidden="true" className="mx-1.5 text-muted-foreground/70">
            ›
          </span>
          <span className="text-foreground/80">{title}</span>
        </nav>
        <h1 className={`mt-4 ${guidePageTitle}`}>
          {title}
        </h1>
        <div className="mt-4 h-px w-16 bg-border" />
      </header>

      <HeldOpenBlock
        linkTo={PROCUREMENT_HELD_OPEN.linkTo}
        linkLabel={PROCUREMENT_HELD_OPEN.linkLabel}
      >
        {(PROCUREMENT_HELD_OPEN.paragraphs as ReadonlyArray<
          string | { text: string; externalLinks?: ExternalPhraseLink[] }
        >).map((paragraph) => {
          if (typeof paragraph === "string") {
            return <p key={paragraph}>{paragraph}</p>;
          }

          return (
            <p key={paragraph.text}>
              {proseWithExternalLinks(paragraph.text, paragraph.externalLinks ?? [])}
            </p>
          );
        })}
      </HeldOpenBlock>

      <PageFoot support="procurement" sources={PROCUREMENT_CONTRACTING_SOURCES} />

      <GuideAssumptions className="mt-14 md:mt-16 max-w-xl" />
    </GuideLayout>
  );
}
