import { createFileRoute, notFound } from "@tanstack/react-router";
import { CrossCuttingThreadPage } from "@/components/CrossCuttingThreadPage";
import { THREAD_CONTENT } from "@/lib/thread-content";
import type { ThreadSlug } from "@/lib/guide-strings";
import { EditorialNote } from "@/components/EditorialNote";
import { CaseStudyBlock } from "@/components/CaseStudyBlock";

export const Route = createFileRoute("/thread/$slug")({
  head: ({ params }) => {
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
  const content = THREAD_CONTENT[slug as ThreadSlug];
  if (!content) throw notFound();

  return (
    <CrossCuttingThreadPage content={content}>
      {slug === "procurement" ? <ProcurementExtras /> : null}
    </CrossCuttingThreadPage>
  );
}

function ProcurementExtras() {
  return (
    <section className="mt-10 md:mt-12 space-y-6 scroll-mt-24" id="examples">
      <EditorialNote label="Note">
        Contracts shape what your team can change later. A clause written in a
        hurry can quietly remove your ability to fix a problem you do not yet
        know about.
      </EditorialNote>

      <EditorialNote tone="caution" label="Watch out">
        Avoid contracts that hand off the source code, data, or deployment
        keys to a supplier without a written exit path. Without one, ending the
        relationship can mean ending the service.
      </EditorialNote>

      <CaseStudyBlock
        title="A payments integration, two contracts"
        intro="A small team needed to add online payments. The shape of the contract decided what the next two years looked like."
        actual={{
          heading: "What happened",
          items: [
            "Fixed-scope, fixed-price contract signed before discovery finished.",
            "Source code and deployment owned by the supplier.",
            "Change requests took 6–8 weeks and a separate purchase order.",
            "When a regulator changed the rules, the team could not respond in time.",
          ],
        }}
        alternative={{
          heading: "A better way",
          items: [
            "Time-and-materials contract with a clear statement of outcomes.",
            "Source code in a repository the department controls from day one.",
            "Joint backlog reviewed every two weeks; changes are routine, not events.",
            "A written exit plan rehearsed once a year.",
          ],
        }}
      />
    </section>
  );
}
