import { Link } from "@tanstack/react-router";
import { GuideLayout } from "@/components/GuideLayout";
import { PageFoot } from "@/components/PageFoot";
import { GuideAssumptions } from "@/components/GuideAssumptions";
import { proseWithMixedLinks } from "@/components/ProseWithExternalLinks";
import type { SupportLinkedBullet } from "@/lib/support-content";
import { SUPPORT_PAGE } from "@/lib/support-content";
import { GuideArrowBullet } from "@/lib/guide-lists";
import {
  guideArrowList,
  guidePageTitle,
  guideProse,
  guideProseSpace,
  guideSectionTitle,
} from "@/lib/guide-typography";

function renderBullet(bullet: SupportLinkedBullet) {
  return proseWithMixedLinks(bullet.text, {
    external: bullet.externalLinks,
    mailto: bullet.mailtoLinks,
    bold: bullet.bold,
  });
}

export function SupportCommunitiesPage() {
  const { title, lead, acrossLifecycle, byTopic, furtherReading, sources } = SUPPORT_PAGE;

  return (
    <GuideLayout id={SUPPORT_PAGE.id}>
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
        <h1 className={`mt-4 ${guidePageTitle}`}>{title}</h1>
        <div className="mt-4 h-px w-16 bg-border" />
      </header>

      <section className={guideProseSpace}>
        <p>{lead}</p>
      </section>

      <section className="mt-10 md:mt-12 scroll-mt-24" id={acrossLifecycle.id}>
        <h2 className={`${guideSectionTitle} mb-3`}>{acrossLifecycle.title}</h2>
        <ul className={guideArrowList}>
          {acrossLifecycle.bullets.map((bullet) => (
            <li key={bullet.text} className="flex items-start gap-2.5">
              <GuideArrowBullet />
              <p className={guideProse}>{renderBullet(bullet)}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 md:mt-12 scroll-mt-24" id={byTopic.id}>
        <h2 className={`${guideSectionTitle} mb-3`}>{byTopic.title}</h2>
        <ul className={guideArrowList}>
          {byTopic.bullets.map((bullet) => (
            <li key={bullet.text} className="flex items-start gap-2.5">
              <GuideArrowBullet />
              <p className={guideProse}>{renderBullet(bullet)}</p>
            </li>
          ))}
        </ul>
        <p className={`${guideProse} mt-4`}>{renderBullet(byTopic.closing)}</p>
      </section>

      <PageFoot
        showSupportCallout={false}
        furtherReading={proseWithMixedLinks(furtherReading.text, {
          external: furtherReading.externalLinks,
        })}
        sources={sources}
      />

      <GuideAssumptions className="mt-14 md:mt-16 max-w-xl" />
    </GuideLayout>
  );
}
