import { createFileRoute } from "@tanstack/react-router";
import { LiveMaturityPage } from "@/components/LiveMaturityPage";
import { LIFECYCLE_PHASE_META, SUBPHASE_META, subphasePageDocumentTitle } from "@/lib/lifecycle-navigation";

export const Route = createFileRoute("/live-maturity")({
  head: () => ({
    meta: [
      {
        title: subphasePageDocumentTitle(
          SUBPHASE_META.maturity.pageHeading,
          LIFECYCLE_PHASE_META.live.title,
        ),
      },
      { name: "description", content: SUBPHASE_META.maturity.subtitle },
    ],
  }),
  component: LiveMaturityPage,
});
