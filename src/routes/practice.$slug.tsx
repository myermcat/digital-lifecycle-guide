import { createFileRoute, notFound } from "@tanstack/react-router";
import { PracticeStubPage } from "@/components/PracticeStubPage";
import { PRACTICE_STUBS } from "@/lib/practice-stubs";

export const Route = createFileRoute("/practice/$slug")({
  head: ({ params }) => {
    const content = PRACTICE_STUBS[params.slug];
    return {
      meta: content
        ? [
            { title: `${content.title} — The Digital Lifecycle Guide` },
            { name: "description", content: content.body },
          ]
        : [{ title: "Not found — The Digital Lifecycle Guide" }],
    };
  },
  component: PracticeRoutePage,
});

function PracticeRoutePage() {
  const { slug } = Route.useParams();
  const content = PRACTICE_STUBS[slug];
  if (!content) throw notFound();

  return (
    <PracticeStubPage id={`practice-${slug}`} title={content.title} body={content.body} />
  );
}
