import { createFileRoute } from "@tanstack/react-router";
import { LiveMaturityPage } from "@/components/LiveMaturityPage";
import {
  SUBPHASE_META,
  subphasePageDocumentTitle,
} from "@/lib/lifecycle-navigation";

export const Route = createFileRoute("/live-maturity")({
  head: () => ({
    meta: [
      { title: subphasePageDocumentTitle(SUBPHASE_META.maturity.pageHeading, "Live") },
      {
        name: "description",
        content:
          "How the Maturity sub-phase works: the health cycle, the yearly filings, the renewals, and the signals that point to Sunset.",
      },
    ],
  }),
  component: LiveMaturityPage,
});
