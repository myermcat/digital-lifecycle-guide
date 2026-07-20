import { createFileRoute } from "@tanstack/react-router";
import { GuideLayout } from "@/components/GuideLayout";
import { PageFoot } from "@/components/PageFoot";
import { guidePageTitle, guideProse, guideProseSpace } from "@/lib/guide-typography";

export const Route = createFileRoute("/gate-map")({
  head: () => ({
    meta: [
      {
        title: "Who signs off on a new digital service, and when — The Digital Lifecycle Guide",
      },
      {
        name: "description",
        content:
          "The whole journey of official approvals, reviews, and sign-offs a digital service passes through.",
      },
    ],
  }),
  component: GateMapStubPage,
});

function GateMapStubPage() {
  return (
    <GuideLayout>
      <header className="mb-8 md:mb-10">
        <p className="text-[10px] uppercase tracking-[0.22em] text-primary/80 font-sans">
          See the whole path
        </p>
        <h1 className={`${guidePageTitle} mt-2`}>
          Who signs off on a new digital service, and when
        </h1>
        <div className="mt-5 h-px w-16 bg-border" />
      </header>

      <section className={guideProseSpace}>
        <p className={guideProse}>
          This page is still being written. It will show every official approval, review, and
          sign-off a service passes through, from the first problem to retiring or replacing it,
          who owns each one, and roughly how long it takes.
        </p>
      </section>

      <PageFoot className="mt-10 md:mt-12" />
    </GuideLayout>
  );
}
