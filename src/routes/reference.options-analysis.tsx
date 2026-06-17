import { createFileRoute } from "@tanstack/react-router";
import { OptionsAnalysisPage } from "@/components/OptionsAnalysisPage";
import { OPTIONS_ANALYSIS } from "@/lib/options-analysis-content";

export const Route = createFileRoute("/reference/options-analysis")({
  head: () => ({
    meta: [
      { title: `${OPTIONS_ANALYSIS.title} — The Digital Lifecycle Guide` },
      { name: "description", content: OPTIONS_ANALYSIS.intro[0] },
    ],
  }),
  component: OptionsAnalysisPage,
});
