import { createFileRoute, redirect } from "@tanstack/react-router";
import { DESIGN_FOR_WHOLE_JOURNEY_PATH } from "@/lib/reference-paths";

export const Route = createFileRoute("/create-design-for-the-whole-journey")({
  beforeLoad: () => {
    throw redirect({ to: DESIGN_FOR_WHOLE_JOURNEY_PATH });
  },
});
