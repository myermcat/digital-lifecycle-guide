import type { CaseStudySide } from "@/components/CaseStudyBlock";

export const SOO_VS_SOW = {
  title: "Statement of requirement vs statement of work",
  summary: [
    "Every contract needs a written description of the work being bought, and in Canadian practice two documents do that job. A statement of requirement says what the service has to achieve, who it is for, and how well it has to perform. A statement of work describes the work itself, and it is annexed to the contract, which makes it the thing the supplier is actually held to.",
    "Both are Canada's documents; you are not choosing between them. What you are choosing is how much of the how you write down. Keep the statement of work high-level and outcome-based, avoid detailed specifications, and refine it with supplier feedback before the solicitation goes out. That is what leaves room for the work to change as people learn, because the supplier is held to what the service must achieve rather than to a screen design agreed before anyone tested it.",
  ],
  comparison: {
    actualLabel: "Written tightly",
    alternativeLabel: "Written to the outcome",
    sow: {
      heading: "Written tightly",
      items: [
        "Lists the exact things to build, in order, with set dates.",
        "Assumes the requirements are known and will not change.",
        "Reads like \"the supplier shall build these screens, in this order, by this date.\"",
        "Fits work that is well understood and stable.",
        "When you learn something new, you reopen the contract to change the list.",
      ],
    } satisfies CaseStudySide,
    soo: {
      heading: "Written to the outcome",
      items: [
        "States the goals and who the service is for, not the steps.",
        "Assumes you will learn as you go, and leaves room for it.",
        "Reads like \"here is what this service has to achieve, and who it is for.\"",
        "Fits digital work, where the problem is not fully known up front.",
        "The work can change without a new contract, because it is tied to the goal.",
      ],
    } satisfies CaseStudySide,
  },
} as const;
