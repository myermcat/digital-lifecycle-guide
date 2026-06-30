import { createFileRoute, redirect } from "@tanstack/react-router";
import { TREASURY_BOARD_SUBMISSION_PATH } from "@/lib/reference-paths";

export const Route = createFileRoute("/reference/treasury-board-submission")({
  beforeLoad: () => {
    throw redirect({ to: TREASURY_BOARD_SUBMISSION_PATH });
  },
});
