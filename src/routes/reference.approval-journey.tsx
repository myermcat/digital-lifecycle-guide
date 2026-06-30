import { createFileRoute, redirect } from "@tanstack/react-router";
import { PHASES } from "@/lib/guide-strings";

export const Route = createFileRoute("/reference/approval-journey")({
  beforeLoad: () => {
    throw redirect({ to: PHASES.create.href });
  },
  head: () => ({
    meta: [{ title: `Create — The Digital Lifecycle Guide` }],
  }),
});
