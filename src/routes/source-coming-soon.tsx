import { createFileRoute } from "@tanstack/react-router";
import { SourceComingSoonPage } from "@/components/SourceComingSoonPage";

type SourceComingSoonSearch = {
  source?: string;
  part?: string;
};

export const Route = createFileRoute("/source-coming-soon")({
  validateSearch: (search: Record<string, unknown>): SourceComingSoonSearch => ({
    source: typeof search.source === "string" ? search.source : undefined,
    part: typeof search.part === "string" ? search.part : undefined,
  }),
  head: ({ search }) => {
    const name = search.source?.trim() || "Source";
    return {
      meta: [
        { title: `${name} — coming soon — The Digital Lifecycle Guide` },
        {
          name: "description",
          content: `${name} is still being written. We will add the link when it goes live.`,
        },
      ],
    };
  },
  component: SourceComingSoonRoute,
});

function SourceComingSoonRoute() {
  const { source, part } = Route.useSearch();
  return <SourceComingSoonPage source={source ?? ""} part={part} />;
}
