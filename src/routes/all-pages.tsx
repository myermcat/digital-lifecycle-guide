import { createFileRoute } from "@tanstack/react-router";
import { GuideContentsPage } from "@/components/GuideContentsPage";
import { GuideLayout } from "@/components/GuideLayout";
import { PageFoot } from "@/components/PageFoot";
import { GUIDE_CONTENTS } from "@/lib/guide-contents";

export const Route = createFileRoute("/all-pages")({
  head: () => ({
    meta: [
      { title: `${GUIDE_CONTENTS.title} — The Digital Lifecycle Guide` },
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
