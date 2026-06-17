import type { ReactNode } from "react";
import { ArrowLeadList } from "@/lib/guide-lists";
import { QaToggleBlock } from "@/components/QaToggleBlock";
import { cn } from "@/lib/utils";
import {
  guideArticleFirstSectionGap,
  guideArticleProse,
  guideArticleSectionGap,
  guideArticleSectionTitle,
} from "@/lib/guide-article";

export function ThreadArticleSection({
  title,
  sectionId,
  isFirst = false,
  children,
  className,
}: {
  title: string;
  sectionId?: string;
  isFirst?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={sectionId}
      className={cn(
        "scroll-mt-24",
        isFirst ? guideArticleFirstSectionGap : guideArticleSectionGap,
        className,
      )}
    >
      <h2 className={guideArticleSectionTitle}>{title}</h2>
      <div className={guideArticleProse}>{children}</div>
    </section>
  );
}

export type LeadBullet = {
  lead: string;
  body: ReactNode;
  bodyLines?: string[];
};

export function ThreadArticleLeadList({ items }: { items: LeadBullet[] }) {
  return (
    <ArrowLeadList
      items={items.map(({ lead, body, bodyLines }) => ({ lead, body, bodyLines }))}
    />
  );
}

export function ThreadArticleQaList({ items }: { items: LeadBullet[] }) {
  return (
    <QaToggleBlock
      items={items.map(({ lead, body }) => ({ question: lead, answer: body }))}
    />
  );
}
