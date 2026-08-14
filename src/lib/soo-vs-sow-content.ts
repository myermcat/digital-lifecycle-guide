import type { CaseStudySide } from "@/components/CaseStudyBlock";

export const SOO_VS_SOW = {
  title: "Statement of requirement vs statement of work",
  summary: [
    "Every contract needs a written description of the work being bought, and it is built up in three steps. Each one is developed from the one before it, and Canada writes all three.",
  ],
  afterVisual: [
    "The statement of work is the one that counts in the end. It goes into the solicitation, so suppliers bid against it, and it is annexed to the contract, which makes it the thing the supplier is held to.",
    "What you decide is how much detail to put in it. Write it at the level of what the service has to achieve, and when testing later shows that a screen is wrong, fixing that screen is part of the job the supplier was already hired to do. Write it as a set of screen designs agreed before anyone tested them, and the supplier will build those designs; changing one then means amending the contract, priced by the only supplier in the room.",
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
