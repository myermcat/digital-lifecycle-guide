import { createFileRoute, redirect, notFound } from "@tanstack/react-router";
import { CrossCuttingThreadPage } from "@/components/CrossCuttingThreadPage";
import { THREAD_CONTENT } from "@/lib/thread-content";
import type { ThreadSlug } from "@/lib/guide-strings";
import { PROCUREMENT_LANDING } from "@/lib/procurement-landing";

export const Route = createFileRoute("/thread/$slug")({
  head: ({ params }) => {
    if (params.slug === "procurement") {
      return {
        meta: [
          { title: `${PROCUREMENT_LANDING.title} — The Digital Lifecycle Guide` },
          { name: "description", content: PROCUREMENT_LANDING.intro[0] },
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
  beforeLoad: ({ params }) => {
    if (params.slug === "procurement") {
      throw redirect({ to: "/thread/procurement" });
    }
    if (params.slug === "contracting") {
      throw redirect({ to: "/thread/procurement" });
    }
  },
  component: ThreadRoutePage,
});

function ThreadRoutePage() {
  const { slug } = Route.useParams();

  const content = THREAD_CONTENT[slug as ThreadSlug];
  if (!content) throw notFound();

  return <CrossCuttingThreadPage content={content} />;
}
