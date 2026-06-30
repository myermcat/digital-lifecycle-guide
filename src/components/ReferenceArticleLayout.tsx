import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { GuideLayout } from "@/components/GuideLayout";
import { GuideAssumptions } from "@/components/GuideAssumptions";
import { PageFoot } from "@/components/PageFoot";
import type { SourceItem } from "@/components/SourcesBlock";
import type { SupportCalloutVariant } from "@/lib/support-callout";
import { guideArticleMeasure } from "@/lib/guide-article";
import { guidePageTitle } from "@/lib/guide-typography";

export type ReferenceBreadcrumbParent = {
  title: string;
  href: string;
};

export function ReferenceArticleLayout({
  id,
  title,
  breadcrumbParent,
  children,
  support = "generic",
  furtherReading,
  sources,
}: {
  id: string;
  title: string;
  breadcrumbParent?: ReferenceBreadcrumbParent;
  children: ReactNode;
  support?: SupportCalloutVariant;
  furtherReading?: ReactNode;
  sources?: SourceItem[];
}) {
  return (
    <GuideLayout id={id}>
      <header className="mb-8 md:mb-10">
        <nav aria-label="Breadcrumb" className="text-xs tracking-wide text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          {breadcrumbParent ? (
            <>
              <span aria-hidden="true" className="mx-1.5 text-muted-foreground/70">
                ›
              </span>
              <Link to={breadcrumbParent.href} className="hover:text-foreground transition-colors">
                {breadcrumbParent.title}
              </Link>
            </>
          ) : null}
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
      <div className={guideArticleMeasure}>{children}</div>
      <PageFoot support={support} furtherReading={furtherReading} sources={sources} />
      <GuideAssumptions className="mt-14 md:mt-16 max-w-xl" />
    </GuideLayout>
  );
}
