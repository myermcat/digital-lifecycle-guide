import { createFileRoute } from "@tanstack/react-router";
import { LiveGrowthPage } from "@/components/LiveGrowthPage";
import { LIFECYCLE_PHASE_META, SUBPHASE_META, subphasePageDocumentTitle } from "@/lib/lifecycle-navigation";

export const Route = createFileRoute("/live-growth")({
  head: () => ({
    meta: [
      {
        title: subphasePageDocumentTitle(
          SUBPHASE_META.growth.pageHeading,
          LIFECYCLE_PHASE_META.live.title,
        ),
      },
      { name: "description", content: SUBPHASE_META.growth.subtitle },
    ],
  }),
  component: LiveGrowthPage,
});
