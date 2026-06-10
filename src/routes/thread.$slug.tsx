import { createFileRoute, notFound } from "@tanstack/react-router";
import { CrossCuttingThreadPage } from "@/components/CrossCuttingThreadPage";
import { ProcurementThreadPage } from "@/components/ProcurementThreadPage";
import { THREAD_CONTENT } from "@/lib/thread-content";
import type { ThreadSlug } from "@/lib/guide-strings";

export const Route = createFileRoute("/thread/$slug")({
  head: ({ params }) => {
    if (params.slug === "procurement") {
      return {
        meta: [
          { title: "Procurement — The Digital Lifecycle Guide" },
          {
            name: "description",
            content:
              "Procurement is the process of buying. This guide's depth on agreements and lifecycle management lives in the Contracting thread.",
          },
        ],
      };
    }

    const content = THREAD_CONTENT[params.slug as ThreadSlug];
    return {
      meta: content
        ? [
            { title: `${content.title} — The Digital Lifecycle Guide` },
            { name: "description", content: content.stakes },
          ]
        : [{ title: "Not found — The Digital Lifecycle Guide" }],
    };
  },
  component: ThreadRoutePage,
});

function ThreadRoutePage() {
  const { slug } = Route.useParams();

  if (slug === "contracting") throw notFound();

  if (slug === "procurement") {
    return <ProcurementThreadPage />;
  }

  const content = THREAD_CONTENT[slug as ThreadSlug];
  if (!content) throw notFound();

  return <CrossCuttingThreadPage content={content} />;
}
