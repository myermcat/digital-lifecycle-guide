import { createFileRoute } from "@tanstack/react-router";
import { LiveStabilizationPage } from "@/components/LiveStabilizationPage";
import { LIFECYCLE_PHASE_META, SUBPHASE_META, subphasePageDocumentTitle } from "@/lib/lifecycle-navigation";

export const Route = createFileRoute("/live-stabilization")({
  head: () => ({
    meta: [
      {
        title: subphasePageDocumentTitle(
          SUBPHASE_META.stabilization.pageHeading,
          LIFECYCLE_PHASE_META.live.title,
        ),
      },
      { name: "description", content: SUBPHASE_META.stabilization.subtitle },
    ],
  }),
  component: LiveStabilizationPage,
});
