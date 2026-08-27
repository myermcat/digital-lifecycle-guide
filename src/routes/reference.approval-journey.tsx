import { createFileRoute, redirect } from "@tanstack/react-router";
import { PHASES } from "@/lib/guide-strings";
import { SITE_NAME } from "@/lib/site-meta";

export const Route = createFileRoute("/reference/approval-journey")({
  beforeLoad: () => {
    throw redirect({ to: PHASES.create.href });
  },
  head: () => ({
    meta: [{ title: `Create — ${SITE_NAME}` }],
  }),
});
