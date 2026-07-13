import { createFileRoute } from "@tanstack/react-router";
import { SunsetLandingPage } from "@/components/SunsetLandingPage";
import { PHASES } from "@/lib/guide-strings";
import { phasePageDocumentTitle } from "@/lib/lifecycle-navigation";

export const Route = createFileRoute("/sunset")({
  head: () => ({
    meta: [
      { title: phasePageDocumentTitle(PHASES.sunset.pageHeading) },
      { name: "description", content: PHASES.sunset.subtitle },
    ],
  }),
  component: SunsetLandingPage,
});
