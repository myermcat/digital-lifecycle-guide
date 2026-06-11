import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { GuideLayout } from "@/components/GuideLayout";
import { GuideAssumptions } from "@/components/GuideAssumptions";
import { CONTRACTING_LANDING_PATH } from "@/lib/contracting-landing";
import { guideArticleMeasure } from "@/lib/guide-article";

export function ThreadArticleLayout({
  id,
  title,
  children,
  afterAssumptions,
}: {
  id: string;
  title: string;
  children: ReactNode;
  afterAssumptions?: ReactNode;
}) {
  return (
    <GuideLayout id={id}>
      <header className="mb-8 md:mb-10">
        <nav aria-label="Breadcrumb" className="text-xs tracking-wide text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span aria-hidden="true" className="mx-1.5 text-muted-foreground/70">
            ›
          </span>
          <Link to={CONTRACTING_LANDING_PATH} className="hover:text-foreground transition-colors">
            Contracting
          </Link>
          <span aria-hidden="true" className="mx-1.5 text-muted-foreground/70">
            ›
          </span>
          <span className="text-foreground/80">{title}</span>
        </nav>
        <h1 className="mt-4 font-serif text-3xl md:text-4xl font-semibold tracking-tight text-foreground leading-[1.1]">
          {title}
        </h1>
        <div className="mt-4 h-px w-16 bg-border" />
      </header>
      <div className={guideArticleMeasure}>{children}</div>
      <GuideAssumptions className="mt-14 md:mt-16 max-w-xl" />
      {afterAssumptions}
      <div className="h-16" />
    </GuideLayout>
  );
}
