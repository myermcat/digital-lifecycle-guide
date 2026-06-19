import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { ContractingSubPage } from "@/components/ContractingSubPage";
import { PROCUREMENT_SUBPAGES, isProcurementSubPageSlug } from "@/lib/contracting-subpages";
import { PROCUREMENT_SUBPAGE_REDIRECTS } from "@/lib/procurement-subpage-slugs";

export const Route = createFileRoute("/thread/procurement/$page")({
  beforeLoad: ({ params }) => {
    const target = PROCUREMENT_SUBPAGE_REDIRECTS[params.page];
    if (target) {
      throw redirect({ to: target });
    }
  },
  head: ({ params }) => {
    const content = isProcurementSubPageSlug(params.page)
      ? PROCUREMENT_SUBPAGES[params.page]
      : undefined;
    return {
      meta: content
        ? [
            { title: `${content.title} — Procurement — The Digital Lifecycle Guide` },
            {
              name: "description",
              content: content.intro?.[0] ?? content.title,
            },
          ]
        : [{ title: "Not found — The Digital Lifecycle Guide" }],
    };
  },
  component: ProcurementSubRoutePage,
});

function ProcurementSubRoutePage() {
  const { page } = Route.useParams();
  if (!isProcurementSubPageSlug(page)) throw notFound();

  return <ContractingSubPage page={PROCUREMENT_SUBPAGES[page]} />;
}
