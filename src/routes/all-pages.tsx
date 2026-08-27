import { createFileRoute } from "@tanstack/react-router";
import { GuideContentsPage } from "@/components/GuideContentsPage";
import { GuideLayout } from "@/components/GuideLayout";
import { PageFoot } from "@/components/PageFoot";
import { GUIDE_CONTENTS } from "@/lib/guide-contents";
import { SITE_NAME } from "@/lib/site-meta";

export const Route = createFileRoute("/all-pages")({
  head: () => ({
    meta: [
      { title: `${GUIDE_CONTENTS.title} — ${SITE_NAME}` },
      {
        name: "description",
        content: GUIDE_CONTENTS.subtitle,
      },
    ],
  }),
  component: GuideIndexRoute,
});

function GuideIndexRoute() {
  return (
    <GuideLayout id="all-pages">
      <GuideContentsPage />
      <PageFoot showSupportCallout={false} />
    </GuideLayout>
  );
}
