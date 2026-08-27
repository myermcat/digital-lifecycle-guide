import { createFileRoute } from "@tanstack/react-router";
import { OptionsAnalysisPage } from "@/components/OptionsAnalysisPage";
import { OPTIONS_ANALYSIS } from "@/lib/options-analysis-content";
import { SITE_NAME } from "@/lib/site-meta";

export const Route = createFileRoute("/reference/options-analysis")({
  head: () => ({
    meta: [
      { title: `${OPTIONS_ANALYSIS.title} — ${SITE_NAME}` },
      { name: "description", content: OPTIONS_ANALYSIS.intro[0] },
    ],
  }),
  component: OptionsAnalysisPage,
});
