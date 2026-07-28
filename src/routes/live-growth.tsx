import { createFileRoute } from "@tanstack/react-router";
import { LiveGrowthPage } from "@/components/LiveGrowthPage";
import {
  SUBPHASE_META,
  subphasePageDocumentTitle,
} from "@/lib/lifecycle-navigation";

export const Route = createFileRoute("/live-growth")({
  head: () => ({
    meta: [
      { title: subphasePageDocumentTitle(SUBPHASE_META.growth.pageHeading, "Live") },
      {
        name: "description",
        content:
          "How the Growth sub-phase works: each significant addition built through its own small lifecycle, bought well, adopted, scaled, and released without breaking the running service.",
      },
    ],
  }),
  component: LiveGrowthPage,
});
