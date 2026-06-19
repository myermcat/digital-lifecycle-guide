import { createFileRoute, redirect } from "@tanstack/react-router";
import { PhasePlaceholderPage } from "@/components/PhasePlaceholderPage";
import {
  DESIGN_FOR_WHOLE_JOURNEY_LEGACY_PATH,
  DESIGN_FOR_WHOLE_JOURNEY_PATH,
} from "@/lib/create-paths";
import {
  LIFECYCLE_PHASE_META,
  whereThisFitsForCreateSubphase,
} from "@/lib/lifecycle-navigation";

const meta = LIFECYCLE_PHASE_META.create;

export const Route = createFileRoute("/create")({
  beforeLoad: ({ location }) => {
    if (location.pathname.endsWith(DESIGN_FOR_WHOLE_JOURNEY_LEGACY_PATH)) {
      throw redirect({ to: DESIGN_FOR_WHOLE_JOURNEY_PATH });
    }
  },
  head: () => ({
    meta: [
      {
        title: `${meta.title} — The Digital Lifecycle Guide`,
      },
      { name: "description", content: meta.subtitle },
    ],
  }),
  component: () => (
    <PhasePlaceholderPage
      id="create"
      lifecyclePhase={meta.title}
      lifecyclePhaseHref={meta.href}
      intro={meta.subtitle}
      whereThisFits={whereThisFitsForCreateSubphase(null)}
    />
  ),
});
