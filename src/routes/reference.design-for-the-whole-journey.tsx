import { createFileRoute } from "@tanstack/react-router";
import { DesignForWholeJourneyPage } from "@/components/DesignForWholeJourneyPage";
import { DESIGN_FOR_WHOLE_JOURNEY } from "@/lib/design-for-whole-journey-content";

export const Route = createFileRoute("/reference/design-for-the-whole-journey")({
  head: () => ({
    meta: [
      { title: `${DESIGN_FOR_WHOLE_JOURNEY.title} — The Digital Lifecycle Guide` },
      {
        name: "description",
        content: DESIGN_FOR_WHOLE_JOURNEY.mostPeopleDoNotWant.paragraphs[0],
      },
    ],
  }),
  component: DesignForWholeJourneyPage,
});
