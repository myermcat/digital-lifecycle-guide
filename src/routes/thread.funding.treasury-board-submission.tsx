import { createFileRoute, redirect } from "@tanstack/react-router";

/** Former Funding sub-page; Treasury Board path now lives on the gate map. */
export const Route = createFileRoute("/thread/funding/treasury-board-submission")({
  beforeLoad: () => {
    throw redirect({ to: "/gate-map" });
  },
});
