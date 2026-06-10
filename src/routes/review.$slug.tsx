import { createFileRoute, notFound } from "@tanstack/react-router";
import { PracticeStubPage } from "@/components/PracticeStubPage";
import { REVIEW_STUBS } from "@/lib/practice-stubs";

export const Route = createFileRoute("/review/$slug")({
  head: ({ params }) => {
    const content = REVIEW_STUBS[params.slug];
    return {
      meta: content
        ? [
            { title: `${content.title} — The Digital Lifecycle Guide` },
            { name: "description", content: content.body },
          ]
        : [{ title: "Not found — The Digital Lifecycle Guide" }],
    };
  },
  component: ReviewRoutePage,
});

function ReviewRoutePage() {
  const { slug } = Route.useParams();
  const content = REVIEW_STUBS[slug];
  if (!content) throw notFound();

  return (
    <PracticeStubPage
      id={`review-${slug}`}
      title={content.title}
      body={content.body}
      backHref="/live-maturity"
      backLabel="Back to Maturity"
    />
  );
}
