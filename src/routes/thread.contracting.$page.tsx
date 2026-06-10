import { createFileRoute, notFound } from "@tanstack/react-router";
import { ContractingSubPage } from "@/components/ContractingSubPage";
import { CONTRACTING_SUBPAGES, isContractingSubPageSlug } from "@/lib/contracting-subpages";

export const Route = createFileRoute("/thread/contracting/$page")({
  head: ({ params }) => {
    const content = isContractingSubPageSlug(params.page)
      ? CONTRACTING_SUBPAGES[params.page]
      : undefined;
    return {
      meta: content
        ? [
            { title: `${content.title} — Contracting — The Digital Lifecycle Guide` },
            {
              name: "description",
              content: content.stub
                ? "This page is still to come."
                : (content.intro?.[0] ?? content.title),
            },
          ]
        : [{ title: "Not found — The Digital Lifecycle Guide" }],
    };
  },
  component: ContractingSubRoutePage,
});

function ContractingSubRoutePage() {
  const { page } = Route.useParams();
  if (!isContractingSubPageSlug(page)) throw notFound();

  return <ContractingSubPage page={CONTRACTING_SUBPAGES[page]} />;
}
