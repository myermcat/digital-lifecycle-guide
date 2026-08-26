import { createFileRoute } from "@tanstack/react-router";
import { SourceComingSoonPage } from "@/components/SourceComingSoonPage";
import { SOURCE_COMING_SOON_STRINGS } from "@/lib/source-coming-soon-strings";

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
    const name =
      search.source?.trim() || SOURCE_COMING_SOON_STRINGS.metaFallbackSourceName;
    const { metaTitle, metaDescription } = SOURCE_COMING_SOON_STRINGS;
    return {
      meta: [
        { title: `${metaTitle.before}${name}${metaTitle.after}` },
        {
          name: "description",
          content: `${metaDescription.before}${name}${metaDescription.after}`,
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
