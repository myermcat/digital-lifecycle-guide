import { createFileRoute, Link } from "@tanstack/react-router";
import { AllPagesPage } from "@/components/AllPagesPage";
import { GuideLayout } from "@/components/GuideLayout";
import { GuideAssumptions } from "@/components/GuideAssumptions";
import { PageFoot } from "@/components/PageFoot";
import { ALL_PAGES_PATH } from "@/lib/all-pages-path";
import { BUILD_STATUS_PATH } from "@/lib/build-status-path";
import { guideLink, guideProseTight } from "@/lib/guide-typography";
import { UI } from "@/lib/ui-strings";
import { SITE_NAME } from "@/lib/site-meta";

export const Route = createFileRoute("/build-status")({
  head: () => ({
    meta: [
      { title: `Build status — ${SITE_NAME}` },
      {
        name: "description",
        content:
          UI.buildStatusMetaDescription,
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: BuildStatusRoute,
});

function BuildStatusRoute() {
  return (
    <GuideLayout id="build-status">
      <AllPagesPage />
      <PageFoot showSupportCallout={false} />
      <GuideAssumptions className="mt-14 md:mt-16 max-w-xl" />
      <p className={`${guideProseTight} mt-6 text-muted-foreground`}>
        Internal tracker at {BUILD_STATUS_PATH}. The public index is{" "}
        <Link to={ALL_PAGES_PATH} className={guideLink}>
          {UI.index}
        </Link>
        .
      </p>
    </GuideLayout>
  );
}
