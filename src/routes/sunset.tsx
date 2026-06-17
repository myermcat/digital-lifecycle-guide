import { createFileRoute } from "@tanstack/react-router";
import { SunsetLandingPage } from "@/components/SunsetLandingPage";
import { PHASES } from "@/lib/guide-strings";

export const Route = createFileRoute("/sunset")({
  head: () => ({
    meta: [
      { title: `${PHASES.sunset.title} — The Digital Lifecycle Guide` },
      { name: "description", content: PHASES.sunset.subtitle },
    ],
  }),
  component: SunsetLandingPage,
});
