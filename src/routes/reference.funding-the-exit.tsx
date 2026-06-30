import { createFileRoute, redirect } from "@tanstack/react-router";
import { FUNDING_THE_EXIT_PATH } from "@/lib/reference-paths";

export const Route = createFileRoute("/reference/funding-the-exit")({
  beforeLoad: () => {
    throw redirect({ to: FUNDING_THE_EXIT_PATH });
  },
});
