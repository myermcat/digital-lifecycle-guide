import type { CaseStudySide } from "@/components/CaseStudyBlock";
import type { SourceItem } from "@/components/SourcesBlock";

export const SOO_VS_SOW = {
  title: "Statement of objectives vs statement of work",
  opening:
    "Every contract needs a description of the work being bought. It is usually written one of two ways, and the choice shapes whether the work can change as you learn.",
  whatEachOneIs: {
    id: "what-each-one-is",
    title: "What each one is",
    body: "A statement of work spells out exactly what gets built and how, written as if all the requirements are known up front and will not change. A statement of objectives describes what the service has to achieve and who it is for, and leaves the supplier room to work out how. One fixes the steps. The other fixes the goal.",
  },
  comparison: {
    actualLabel: "Statement of work",
    alternativeLabel: "Statement of objectives",
    sow: {
      heading: "Statement of work",
      items: [
        "Lists the exact things to build, in order, with set dates.",
        "Assumes the requirements are known and will not change.",
        "Reads like \"the supplier shall build these screens, in this order, by this date.\"",
        "Fits work that is well understood and stable.",
        "When you learn something new, you reopen the contract to change the list.",
      ],
    } satisfies CaseStudySide,
    soo: {
      heading: "Statement of objectives",
      items: [
        "States the goals and who the service is for, not the steps.",
        "Assumes you will learn as you go, and leaves room for it.",
        "Reads like \"here is what this service has to achieve, and who it is for.\"",
        "Fits digital work, where the problem is not fully known up front.",
        "The work can change without a new contract, because it is tied to the goal.",
      ],
    } satisfies CaseStudySide,
  },
  workTogether: {
    id: "they-work-together",
    title: "They work together",
    body: "The two are not enemies. A common pattern is that the department writes the statement of objectives, and suppliers respond with their own statement of work that turns those objectives into concrete tasks. So you are not throwing the detail away. You are deciding who writes it, and when. The department sets the goal. The supplier proposes how to meet it.",
  },
  workedExample: {
    id: "a-worked-example",
    title: "A worked example",
    paragraphs: [
      "Say a department needs an online way for people to apply for a benefit.",
      "A statement of work would list it out: build these eight screens, in this order, with these fields, connected to this system, delivered by this date.",
      "A statement of objectives would say: people who are eligible should be able to apply online, on their own, without help, in under fifteen minutes, including people who use assistive technology. How that gets built is for the supplier to propose and for the work to settle as it goes.",
      "The first locks the answer before anyone has tested it. The second fixes what matters and lets the answer be found.",
    ],
  },
  editorialNote:
    "Drafted from open sources. The exact wording of a statement of objectives, and when it is the right tool, should be checked with a Government of Canada contracting officer before use.",
  sources: [
    {
      label: "Used for inspiration",
      description: "Skylight Agile Procurement Playbook",
      href: "https://skylight.digital/work/toolkits/agile-procurement-playbook/",
    },
  ] satisfies SourceItem[],
};
