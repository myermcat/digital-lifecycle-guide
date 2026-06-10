import { createFileRoute, notFound } from "@tanstack/react-router";
import { CrossCuttingThreadPage } from "@/components/CrossCuttingThreadPage";
import { THREAD_CONTENT } from "@/lib/thread-content";

export const Route = createFileRoute("/thread/$slug")({
  head: ({ params }) => {
    const content = THREAD_CONTENT[params.slug];
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
  const content = THREAD_CONTENT[slug];
  if (!content) throw notFound();

  return <CrossCuttingThreadPage content={content} />;
}
