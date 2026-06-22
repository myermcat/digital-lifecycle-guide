import { createFileRoute } from "@tanstack/react-router";
import { AllPagesPage } from "@/components/AllPagesPage";
import { GuideLayout } from "@/components/GuideLayout";
import { GuideAssumptions } from "@/components/GuideAssumptions";
import { PageFoot } from "@/components/PageFoot";

export const Route = createFileRoute("/all-pages")({
  head: () => ({
    meta: [
      { title: "All pages — The Digital Lifecycle Guide" },
      {
        name: "description",
        content: "A complete index of every page in the Digital Lifecycle Guide and its build status.",
      },
    ],
  }),
  component: AllPagesRoute,
});

function AllPagesRoute() {
  return (
    <GuideLayout id="all-pages">
      <AllPagesPage />
      <PageFoot />
      <GuideAssumptions className="mt-14 md:mt-16 max-w-xl" />
    </GuideLayout>
  );
}
