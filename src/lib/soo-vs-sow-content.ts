import type { SourceItem } from "@/components/SourcesBlock";

export const SOO_VS_SOW = {
  title: "Statement of requirement vs statement of work",
  summary: [
    "Every contract needs a written description of the work being bought, and in practice two documents do that job. You write a statement of requirement: what the service has to achieve, who it is for, and how well it has to perform, without specifying how it should be built. Suppliers answer with their own statement of work, which turns those requirements into concrete tasks and deliverables, and the winning one is annexed to the contract.",
    "So you are not choosing between them. The detail still gets written down; you are deciding who writes it and when. Keeping the how out of your side is what leaves room for the work to change as people learn, because the supplier is held to what the service must achieve rather than to a screen design agreed before anyone tested it.",
  ],
  sources: [] satisfies SourceItem[],
} as const;
