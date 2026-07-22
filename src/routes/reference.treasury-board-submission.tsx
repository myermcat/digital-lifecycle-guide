import { createFileRoute, redirect } from "@tanstack/react-router";

/** Former /reference URL; Treasury Board path now lives on the gate map. */
export const Route = createFileRoute("/reference/treasury-board-submission")({
  beforeLoad: () => {
    throw redirect({ to: "/gate-map" });
  },
});
