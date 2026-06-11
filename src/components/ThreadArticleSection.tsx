import type { ReactNode } from "react";
import { ArrowLeadList } from "@/components/CompactLinkedList";
import { cn } from "@/lib/utils";
import {
  guideArticleFirstSectionGap,
  guideArticleProse,
  guideArticleSectionGap,
  guideArticleSectionTitle,
} from "@/lib/guide-article";
import { guideProse } from "@/lib/guide-typography";

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
  body: string;
};

export function ThreadArticleLeadList({ items }: { items: LeadBullet[] }) {
  return (
    <ArrowLeadList
      items={items.map(({ lead, body }) => ({ lead, body }))}
    />
  );
}

export function ThreadArticleQaList({ items }: { items: LeadBullet[] }) {
  return (
    <ul className="space-y-4 list-none pl-0">
      {items.map((item) => (
        <li
          key={item.lead}
          className="rounded-md border border-l-4 border-border border-l-muted-foreground/60 bg-muted/40 px-4 py-3.5 md:px-5 md:py-4"
        >
          <p className={`${guideProse} font-semibold text-foreground/90 mb-2`}>{item.lead}</p>
          <p className={guideProse}>{item.body}</p>
        </li>
      ))}
    </ul>
  );
}
