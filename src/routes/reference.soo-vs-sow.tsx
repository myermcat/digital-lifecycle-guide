import { createFileRoute, redirect } from "@tanstack/react-router";
import { THREADS } from "@/lib/guide-strings";

/**
 * Was a standalone reference page. Folded into the Procurement thread, because one
 * distinction does not need a page of its own. The URL stays alive because it is
 * linked from documents already on GCXchange.
 */
export const Route = createFileRoute("/reference/soo-vs-sow")({
  beforeLoad: () => {
    throw redirect({
      to: THREADS.procurement.path,
      hash: "describing-what-you-buy",
    });
  },
});
