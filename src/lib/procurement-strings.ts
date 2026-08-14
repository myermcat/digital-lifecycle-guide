import type { LucideIcon } from "lucide-react";
import { Banknote, Coins, CreditCard, Hammer } from "lucide-react";
import type { CaseStudySide } from "@/components/CaseStudyBlock";
import type { ThreadByPhaseContent } from "@/components/ThreadByPhaseSection";
import type { ExternalPhraseLink } from "@/components/ProseWithExternalLinks";
import type { ChoosingWhatToBuyContent, CombiningRoutesParagraph } from "@/components/WhatYouAreBuyingBlock";
import { GOOD_CONTRACT_PATH, OPTIONS_ANALYSIS_PATH } from "@/lib/reference-paths";
import {
  GCCASE_MIGRATION_READINESS_GUIDE,
  type PlaceholderPhraseLink,
} from "@/lib/placeholder-sources";
import type { ThreadContentSection, ThreadLinkedProse } from "@/lib/thread-rich-content";

export type ProcurementJourneyBodyBlock =
  | {
      type: "p";
      text: string;
      bold?: { phrase: string }[];
    }
  | {
      type: "ul";
      items: readonly string[];
    }
  | {
      type: "subheading";
      text: string;
    }
  | {
      type: "table";
      columns: readonly string[];
      rows: readonly { term: string; cells: readonly string[] }[];
    };

export type ProcurementJourneyStepStrings = {
  label: string;
  title: string;
  /** Body under the accordion title: paragraphs and bullet lists. */
  blocks: ProcurementJourneyBodyBlock[];
  externalLinks?: ExternalPhraseLink[];
  internalLinks?: { phrase: string; to: string }[];
  anchorLinks?: { phrase: string; hash: string }[];
  placeholderLinks?: PlaceholderPhraseLink[];
  reviewNotice?: string;
};

export type WhatStaysYoursItemStrings = {
  lead: string;
  body: string;
  placeholderLinks?: PlaceholderPhraseLink[];
};

export type ComparisonRowStrings = {
  topic: string;
  traditional: string;
  agile: string;
};

export type LinkedProseStrings = {
  text: string;
  externalLinks?: ExternalPhraseLink[];
  placeholderLinks?: PlaceholderPhraseLink[];
};

/** @deprecated Prefer ChoosingWhatToBuyContent */
export type WhatYouAreBuyingRouteStrings = {
  lead: string;
  body: string;
  externalLinks?: ExternalPhraseLink[];
  boldPhrases?: { phrase: string }[];
};

/** @deprecated Prefer ChoosingWhatToBuyContent */
export type WhatYouAreBuyingStrings = ChoosingWhatToBuyContent;

type BuyingRouteDraft = {
  id: string;
  icon: LucideIcon;
  title: string;
  sections: readonly ThreadContentSection[];
  contractSigned: ThreadLinkedProse;
};


/** Procurement thread copy — organized by page section. */
export const PROCUREMENT_STRINGS = {
  title: "Procurement",

  intro: {
    paragraphs: [
      "Most existing government applications are bought rather than built. Sometimes the whole thing, more often a part. Procurement is that buying: the whole journey from working out what you need, through choosing a supplier, to living with the contract for as long as the service runs. The contract is one part of it.",
      "Think of this page as a guided tour. At each stop it tells you what happens, what only you can decide, and where to go for the binding detail.",
    ],
    keyPointsIntro: "If you read nothing else here, these are the five things the page is trying to get across:",
    keyPoints: [
      {
        lead: "The buy outlives the contract.",
        body: "What gets signed decides what the service costs to run, whether it can be changed, and whether the department can ever move off it. Those consequences last for as long as the service does.",
      },
      {
        lead: "You stay responsible for the result.",
        body: "A supplier can build the service and run it. When it does not work for somebody, it is still the department that answers for it, and that part cannot be contracted out.",
      },
      {
        lead: "The route decides when you are committed.",
        body: "Buying a team, buying a solution and buying a finished product each sign at a different point in Create. Before signature you have room to change your mind. After it, changes are negotiated with one supplier.",
      },
      {
        lead: "Small pieces are easier to recover from than one large contract.",
        body: "If a piece goes wrong you replace the piece. If a single large contract goes wrong, years of work and most of the money go with it.",
      },
      {
        lead: "Most of the difficulty is vocabulary, and that part is fixable.",
        body: "Solicitation, statement of work, option, task authorization: these are ordinary words in procurement and are rarely explained to the person whose service is being bought. The Procurement glossary further down has them all.",
      },
    ],
  },

  whatWorkStaysYours: {
    heading: "The parts you cannot hand to a supplier",
    intro:
      "Whoever else is involved, some of this work stays with you. Here is what usually does.",
    items: [
      {
        lead: "How long it takes.",
        body: "Procurement runs on its own clock, often many months from first idea to signed contract. Plan your timelines around it early, so it does not catch you short.",
      },
      {
        lead: "The decisions only you can make.",
        body: "What problem you are solving, what good outcomes look like, whether to reuse or buy, and how to break the work into pieces. No one can make these calls for you.",
      },
      {
        lead: "What you bring to each approval.",
        body: "Every checkpoint along the way expects something from you, a document, a number, a sign-off, and the work waits until it has it.",
      },
      {
        lead: "Answering for it.",
        body: "You can hand a supplier the work. You cannot hand over the answering. When the service stumbles, it is your department that explains why, and the question comes back to you.",
      },
      {
        lead: "What you sign today is still binding in ten years.",
        body: "The contract shapes the whole later life of the service: what it costs, whether you can change it, and whether you can ever move off it. None of that is easy to revisit once it is signed.",
      },
    ],
    close:
      "You do not need to be an expert. You need to stay in charge, and to ask when you are unsure.",
  },

  whatYouAreBuying: {
    heading: "Choosing what to buy",
    lead: [
      {
        text: "Buying is not one thing. There are several routes, and the department picks one back in Discovery, long before any money moves. Which route it picks decides when the contract is signed, who builds the prototypes, and how much room the department still has to change its mind at that point.",
        internalLinks: [{ phrase: "Discovery", to: "/create-discovery" }],
      },
      {
        text: "Below are some of the routes. They are the ones a digital service most often takes, and a department can end up somewhere else entirely and be right to.",
        bold: [{ phrase: "some of the routes" }],
      },
      {
        text: "One word is worth settling before the routes make sense. A solicitation is the package of documents Canada publishes to invite suppliers to compete; it is not the contract, which comes later and only for whoever wins. So when this page says the solicitation opens with the challenge statement, it means the competition document leads with the problem rather than with a specification of the answer. The rest of the vocabulary is in the Procurement glossary further down.",
        anchorLinks: [{ phrase: "Procurement glossary", hash: "the-words" }],
      },
    ] satisfies ThreadLinkedProse[],
    routesHeading: "What each route is, and how it runs",
    routes: [
      {
        id: "buy-a-team",
        icon: Banknote,
        title: "Buy a Team",
        sections: [
          {
            text: "The department contracts people rather than a product, through task-based professional services. The team works to the department's direction, and it prototypes and builds alongside it.",
            externalLinks: [
              {
                phrase: "task-based professional services",
                linkKey: "task-based-professional-services",
              },
            ],
          },
          {
            type: "unorderedList",
            items: [
              {
                text: "This is the usual answer for a department with no developers of its own, which is most departments.",
                bold: [
                  {
                    phrase:
                      "This is the usual answer for a department with no developers of its own,",
                  },
                ],
              },
              {
                text: "There is still a competition. It usually runs against an existing supply arrangement, which is a pre-competed list of approved suppliers, so it is faster than an open tender. It is not instant.",
                bold: [{ phrase: "There is still a competition." }],
              },
              {
                text: "The team is what does Alpha, so it has to be in place as Alpha opens. Nothing is bought in Discovery, so the competition runs there and the award waits on the decision to continue.",
                bold: [{ phrase: "The team is what does Alpha," }],
              },
              {
                text: "The timeline is the same shape as buying a Solution: a competition, then a contract, then work under it. What differs is what the contract is for, people rather than an outcome, and how much direction stays with the department.",
                bold: [{ phrase: "The timeline is the same shape as buying a Solution" }],
              },
            ],
          },
          {
            text: "Note that PSPC is moving toward outcomes-based contracting and narrowing task-based tools toward lower-value, routine work, so check what is currently open to you.",
          },
        ],
        contractSigned: {
          text: "as Alpha opens, once the decision to continue is made.",
        },
      },
      {
        id: "buy-a-solution",
        icon: Coins,
        title: "Buy a Solution",
        sections: [
          {
            text: "The department describes the problem and the outcome it needs, and suppliers propose how to solve it.",
          },
          {
            type: "subheading",
            text: "Three things to know before choosing this route",
          },
          {
            type: "unorderedList",
            items: [
              {
                text: 'This is the route most people picture when they hear "procurement".',
                bold: [
                  {
                    phrase:
                      'This is the route most people picture when they hear "procurement".',
                  },
                ],
              },
              {
                text: "More than one supplier can be paid to build something before one of them is chosen. That is agile and challenge-based procurement, and the next part sets out how it runs.",
                bold: [
                  {
                    phrase:
                      "more than one supplier is paid to build and demonstrate before one is chosen",
                  },
                ],
                externalLinks: [
                  {
                    phrase: "agile and challenge-based procurement",
                    linkKey: "agile-challenge-based-procurement",
                  },
                ],
              },
              {
                text: "The department has to show suppliers what it wants. The faster a supplier understands what is needed, the less back and forth there is, the fewer changes get paid for, and the sooner the thing gets built. A few days of prototyping can save millions.",
                bold: [{ phrase: "The department has to show suppliers what it wants." }],
              },
            ],
          },
          {
            type: "subheading",
            text: "The agile procurement model, which is the shape PSPC sets out",
          },
          {
            text: "This is the version of Buy a Solution that Canada has written down most fully, so it is worth following its shape closely. PSPC's agile procurement guide suggests running it in five steps:",
            bold: [{ phrase: "the version of Buy a Solution that Canada has written down most fully" }],
          },
          {
            type: "orderedList",
            items: [
              {
                bold: "One solicitation goes out.",
                text: " It carries the challenge statement, the outcomes, the criteria the prototypes will be judged against, and the terms for building the real thing afterwards. All of that has to be in it up front, because criteria applied after award have to be published before award.",
              },
              {
                bold: "Suppliers bid on paper.",
                text: " Written proposals, not prototypes. In the guide's worked example, nine bids came in.",
              },
              {
                bold: "Several contracts are awarded at once,",
                text: " to the top-ranked bidders. In the example, four of the nine.",
              },
              {
                bold: "Each supplier builds a prototype under its contract,",
                text: " and the prototypes are assessed against the criteria that were in the solicitation. This is the real competition, and it happens after signature.",
              },
              {
                bold: "The winner's contract is amended",
                text: " to exercise an option to build the production solution. There is no second competition and no second contract. The other contracts stay dormant as back-ups, which is how Canada pivoted to the runner-up when the first choice failed to deliver.",
              },
            ],
          },
          {
            type: "subheading",
            text: "Prototypes can also come earlier, before anyone is under contract",
          },
          {
            text: "That five-step sequence is the one PSPC works through in detail, and it is not the only shape the rules allow. A department can ask to see something built at two earlier points:",
          },
          {
            type: "unorderedList",
            items: [
              {
                text: "At pre-qualification, a supplier can be asked to demonstrate a potential solution, or part of one, to help work out which approaches conceptually meet the need before the solicitation goes out.",
                bold: [{ phrase: "At pre-qualification" }],
              },
              {
                text: "At solicitation, suppliers can be asked for demonstrations, proofs of concept, prototypes or samples alongside their written proposals, so the choice rests on something tangible rather than prose alone.",
                bold: [{ phrase: "At solicitation" }],
              },
            ],
          },
          {
            type: "subheading",
            text: "Who pays for the prototype depends on when it happens",
          },
          {
            text: "A prototype built after award is paid work under a contract. A demonstration asked for during a competition is not, and building one is a real cost to every supplier who takes part, including the ones who will lose. That is worth weighing before asking for it.",
            bold: [{ phrase: "A prototype built after award is paid work under a contract." }],
          },
          {
            type: "subheading",
            text: "It is not a faster way to buy",
          },
          {
            text: "PSPC says so itself: agile procurement is not always faster, the extra engagement with suppliers takes time, and the iterative strategy may lengthen the overall procurement process. What it does argue is that problems surface sooner, which avoids the failures that cause the worst delays. Plan the schedule on the basis that it will be no quicker.",
            bold: [{ phrase: "agile procurement is not always faster" }],
          },
        ],
        contractSigned: {
          text: "depends on which shape you run. In the familiar shape the department prototypes first and signs as Beta opens, once it can say what it wants. In the agile procurement shape above, the one PSPC sets out, the contracts are signed a sub-phase earlier, as Alpha opens, because the prototypes are built under them, and the build is an option inside the winner's contract.",
          internalLinks: [{ phrase: "Alpha", to: "/create-alpha" }],
        },
      },
      {
        id: "buy-a-finished-product",
        icon: CreditCard,
        title: "Buy a Finished Product",
        sections: [
          {
            text: "An existing tool, bought off a standing offer or a supply arrangement, which are pre-competed lists of approved suppliers and products.",
          },
          {
            type: "unorderedList",
            items: [
              {
                text: "Nobody prototypes a product that already exists. The evaluation of real products runs during Alpha, compressed, against a standing offer or supply arrangement, and the contract is signed at the start of Beta. The department evaluates real products against what Discovery and Alpha found.",
                bold: [{ phrase: "Nobody prototypes a product that already exists." }],
              },
              {
                text: "It is the fastest route and the least flexible. The risk moves from building the wrong thing to configuring it into something the department can never leave.",
                bold: [{ phrase: "It is the fastest route and the least flexible." }],
              },
            ],
          },
        ],
        contractSigned: {
          text: "at the start of Beta, before configuration begins.",
        },
      },
      {
        id: "build-in-house-or-reuse",
        icon: Hammer,
        title: "Build in-house, or reuse what the Government of Canada already runs",
        sections: [
          {
            text: "There is no build contract at all.",
          },
          {
            type: "unorderedList",
            items: [
              {
                text: "This is rarer than it sounds. Building with the department's own staff needs capability most departments do not have.",
                bold: [{ phrase: "This is rarer than it sounds." }],
              },
              {
                text: "A build delivered by a contracted team is Buy a Team. This route is only for a build done by the department's own staff.",
                bold: [
                  {
                    phrase: "A build delivered by a contracted team is Buy a Team.",
                  },
                ],
              },
              {
                text: "Reuse means a platform the Government of Canada already runs, so there is no build contract. Something is still bought: hosting, licences and tooling for an in-house build, and usually a team to configure either one. Reusing another department\u2019s platform is normally set up through an interdepartmental service agreement.",
                bold: [
                  {
                    phrase: "Reuse means a platform the Government of Canada already runs",
                  },
                ],
              },
            ],
          },
        ],
        contractSigned: {
          text: "never. There is no build contract.",
        },
      },
    ] satisfies BuyingRouteDraft[],
    combiningRoutes: {
      heading: "Most services combine more than one route",
      intro: "",
      paragraphs: [
        {
          lead: "A common shape is a Finished Product plus a Team.",
          pillPhrase: "Finished Product plus a Team",
          body: {
            text: "The department buys the product for the core of the service, and buys a team to configure it, integrate it with what the department already runs, and keep it working. Reuse behaves the same way: a Government of Canada platform costs nothing to reuse and still needs someone to configure it.",
          },
        },
        {
          lead: "Each contract keeps its own timing.",
          body: {
            text: "A department buying a Team and a Finished Product signs twice: once at the end of Discovery for the team, and once at the start of Beta for the product.",
          },
        },
      ] satisfies CombiningRoutesParagraph[],
    },
    takeaway: {
      text: "The route decides when the department signs, and the signature is the moment that matters. Up to it, nothing is committed and the department can still ask for what it needs. After it, everything is a negotiation with one supplier.",
      bold: [
        {
          phrase:
            "The route decides when the department signs, and the signature is the moment that matters.",
        },
      ],
    } satisfies ThreadLinkedProse,
    closingNote: {
      heading: "The competition runs in the sub-phase before the signature",
      body: {
        text: "That is why the two columns in the table move together, one sub-phase apart. It also means the route a department chooses in Discovery decides when it is committed, so the choice is worth making deliberately. It is easy to inherit whatever was done last time without noticing that a decision was made. Build in-house or Reuse signs no build contract at all, and most of the steps below fall away.",
      },
    },
    closingNoteSecond: {
      text: "Otherwise the steps below run in all of these routes. In Buy a Finished Product they run compressed, against an existing standing offer or supply arrangement rather than an open tender.",
    },
  } satisfies ChoosingWhatToBuyContent,

  workedExamples: {
    id: "which-side-are-you-on",
    heading: "Two services, and the test that separates them",
    intro:
      "The honest question is not how big the budget is. It is what the thing you make has to survive. Here are two services at opposite ends, and what each one can get away with.",
    cases: [
      {
        label: "Small enough to make yourself",
        title: "An internal form for booking a specialised meeting room",
        facts: [
          "Serves a few hundred public servants inside one department.",
          "Holds a name, a date and a room number. No personal information beyond what a calendar already holds.",
          "If it fails, people go back to email for a week and somebody is mildly annoyed.",
        ],
        verdict:
          "Sketch it, build a clickable prototype in an afternoon, show six colleagues, and build the real one in-house. A competition would cost more than the service.",
      },
      {
        label: "Too large to make yourself",
        title: "An application system for a grants programme",
        facts: [
          "Serves the public, at volume, at a deadline everyone hits in the same week.",
          "Holds financial and personal information, and has to reach the department's system of record.",
          "If it fails, applications are lost, money does not reach people who need it, and the failure is a matter of public record.",
        ],
        verdict:
          "Mock it up yourself, absolutely. But the thing that answers can it hold at volume, can it integrate, can it meet Protected B, is real software built by people who do that for a living.",
      },
    ],
    testIntro:
      "The test is three questions, and none of them is about money or about how many people use it:",
    test: [
      {
        term: "What duties attach to it?",
        text: "A service the public can reach owes both official languages, the accessibility standard, and an authority to operate. An internal tool owes fewer of those. This question is about obligations, not importance.",
      },
      {
        term: "What does it hold?",
        text: "Nothing sensitive, or personal and financial information. The second answer brings a privacy assessment, a security categorisation, and rules about where the data may live.",
      },
      {
        term: "What happens when it fails?",
        text: "Inconvenience, or harm. This is the same question the threat and continuity exercise asks in Alpha, and the answer decides how much engineering has to sit underneath the service.",
      },
    ],
    close:
      "Three cheap answers, and you can probably make the thing yourself. One expensive answer, and no budget will make a drawing answer it for you.",
    caution: {
      lead: "An internal service has fewer duties, not fewer consequences.",
      paragraphs: [
        "Serving colleagues instead of the public changes which duties attach. It does not switch them off, and it says nothing about how serious the service is.",
        "What genuinely falls away is narrow. A booking tool for one branch is not published under canada.ca, so the publishing rules and the domain approval do not reach it, and the particular language rule that catches anything the public can reach is not the one that applies.",
        "What still applies is most of it. Official languages reach an internal service through the rules covering language of work and services to employees, and security, privacy and accessibility apply as they would anywhere else.",
        "Phoenix is the case worth remembering. It served public servants, not the public, and its answer to what happens when it fails was as bad as any service in this guide.",
      ],
    },
  },

  glossary: {
    id: "the-words",
    heading: "Procurement glossary",
    intro:
      "Procurement has its own vocabulary, and most of it is never explained to the person whose service is being bought. These are the words a business owner runs into, in the order they tend to turn up.",
    columns: ["Word", "When it turns up", "What it means"],
    terms: [
      {
        term: "Request for Information",
        when: "Before the competition",
        short: "RFI",
        text: "A question to the market with no contract at the end of it. You describe what you are trying to do and ask suppliers what is possible. Nobody is paid, and nobody is committed.",
      },
      {
        term: "Review and Refine Requirements",
        when: "Before the competition",
        short: "RRR",
        text: "The same idea, one step further on: you share your draft requirements and ask suppliers to tell you where they are unclear or unbuildable, before the competition opens.",
      },
      {
        term: "Invitation to Qualify",
        when: "Opening the competition",
        short: "ITQ",
        text: "A first round that shortlists who may bid, on things like security clearance, capacity and relevant experience. It is not the competition itself.",
      },
      {
        term: "Solicitation",
        when: "The competition itself",
        text: "The package of documents Canada publishes to invite suppliers to compete. It carries the request for proposals, the instructions to bidders, the statement of work, the evaluation criteria, and the terms the eventual contract will hold. People often say \"the solicitation\" when they mean the competition itself.",
      },
      {
        term: "Request for Proposals",
        when: "Inside the solicitation",
        short: "RFP",
        text: "The document inside the solicitation that sets out the problem and asks suppliers to propose how they would solve it.",
      },
      {
        term: "Bid",
        when: "What comes back",
        text: "A proposal a supplier sends back in answer to the solicitation. Most bids lose.",
      },
      {
        term: "Statement of work",
        when: "Written before award, annexed to the contract",
        short: "SOW",
        text: "The description of the work being bought, written from your requirements. It is an annex to the contract, which makes it the thing the supplier is actually held to.",
      },
      {
        term: "Option",
        when: "Agreed at signature, called on later",
        text: "Work described and priced in the contract at signature, which Canada may or may not call on later. The build that follows a prototype is often an option, which is why exercising it needs no new competition.",
      },
      {
        term: "Amendment",
        when: "Any time after signature",
        text: "A formal change to a signed contract, agreed by both sides. Exercising an option is done by amendment. So is anything you failed to ask for at the start, which is why an amendment is usually priced by the only supplier in the room.",
      },
      {
        term: "Task authorization",
        when: "While the contract runs",
        short: "TA",
        text: "A way of releasing work in pieces under a contract that is already signed. Each piece is authorized on its own, so the department can stop issuing them without terminating anything.",
      },
      {
        term: "Off-ramp",
        when: "Any point where work can stop",
        text: "Any point where Canada can decide the work goes no further: declining to exercise an option, stopping task authorizations, or holding work at a gate.",
      },
    ],
    close:
      "None of these describe a special agile process. They are the ordinary machinery of federal buying, and knowing the names is most of what it takes to follow a conversation about your own service.",
  },

  journey: {
    intro:
      "You might not run all of it yourself, but you should recognise every step.",
    steps: [
      {
        label: "Look",
        title: "Look before you buy.",
        blocks: [
          {
            type: "p",
            text: "Before reaching for a contract, work out what the real problem is and whether buying is the answer to it. Two questions settle most of that:",
          },
          {
            type: "ul",
            items: [
              "Do you already own something that solves it?",
              "Could you reuse, adapt, or build instead?",
            ],
          },
          {
            type: "p",
            text: "This step is not in PSPC's guidance, which starts after the decision to buy, so it sits with the Policy on the Planning and Management of Investments.",
          },
        ],
        externalLinks: [
          {
            phrase: "Policy on the Planning and Management of Investments",
            linkKey: "policy-planning-investments",
          },
        ],
        internalLinks: [
          { phrase: "reuse, adapt, or build", to: OPTIONS_ANALYSIS_PATH },
        ],
      },
      {
        label: "People",
        title: "Assemble the people who will run the buy.",
        blocks: [
          {
            type: "p",
            text: "This is not the same as buying a Team. These are the people inside government who run the purchase:",
          },
          {
            type: "ul",
            items: ["you", "the contracting authority", "users", "subject-matter experts"],
          },
          {
            type: "p",
            text: "Buying a Team means contracting a supplier to deliver the work, which is a route, not a step. A good procurement keeps this cross-functional team in the room the whole way, rather than handing the buy off.",
          },
        ],
      },
      {
        label: "Ask",
        title: "Say the problem, not the solution.",
        blocks: [
          {
            type: "p",
            text: "Write a challenge statement. It says what the problem is, who has it, when and where it shows up, and why it matters, and it stops short of naming the answer. Then set out two more things:",
          },
          {
            type: "ul",
            items: ["your desired outcomes", "the least you must have"],
          },
          {
            type: "p",
            text: "Suppliers who are told the objective can offer answers better than the one you would have written yourself. Suppliers who are handed a specification will build the specification, including the parts of it that turn out to be wrong.",
          },
          {
            type: "subheading",
            text: "Three kinds of requirement, and why the difference costs money",
          },
          {
            type: "p",
            text: "The challenge statement says what you want. The requirements say what it has to do, and they come in three kinds. Which kind a requirement is decides where it goes, and where it goes decides what changing it later costs. Change one that is still in a prototype and somebody redraws it in an afternoon. Change one written into a signed contract and it becomes an amendment, priced by the only supplier in the room.",
          },
          {
            type: "table",
            columns: ["Kind", "What it covers", "Where it goes"],
            rows: [
              {
                term: "Business",
                cells: [
                  "What the service has to achieve, and why.",
                  "In the contract, as the objective and background of the statement of work.",
                ],
              },
              {
                term: "Non-functional",
                cells: [
                  "How well it has to perform, how available it has to be, how secure.",
                  "In the contract, as the service levels. This is also what the bids are scored against.",
                ],
              },
              {
                term: "Functional",
                cells: [
                  "How a particular screen or step should work.",
                  "Out of the contract. The prototype and the design carry these, and they change once somebody tests them.",
                ],
              },
            ],
          },
          {
            type: "p",
            text: "A supplier held to the business need and the service levels can be told partway through that a page is wrong, and fixing it is part of the job. A supplier held to a page design agreed before anyone tested it will build that design, and every change to it costs an amendment.",
          },
          {
            type: "p",
            text: "This is not only a buyer's problem. A department building the service itself needs the same three kinds in front of it, because that is how anyone knows what to build. What buying adds is a mandated shape and a signature.",
          },
        ],
      },
      {
        label: "Strategy",
        title: "Choose the strategy.",
        blocks: [
          {
            type: "p",
            text: 'This is where the route is chosen. Whether the department is buying a Team, a Solution, or a Finished Product, or building in-house, it is settled here, and it settles everything downstream (see "Choosing what to buy" above).',
          },
          {
            type: "p",
            text: "The other decision made here is the shape of the buy: one large contract, or several smaller pieces that build on each other. For digital work the smaller pieces are the recommended default, and there are two well-worn ways to do it:",
          },
          {
            type: "ul",
            items: [
              "phased deliveries with go and no-go decision points, or",
              "contracts with task authorizations",
            ],
          },
          {
            type: "p",
            text: "Traditional and agile sets out what changes between the two shapes, and the case study just below shows the same programme bought each way.",
          },
          {
            type: "p",
            text: "One thing to be clear about: this is not contract splitting. Splitting is slicing the same work to slip under a threshold or dodge an approval, and it is against the rules. Buying in genuine increments is allowed and encouraged.",
          },
        ],
        anchorLinks: [
          { phrase: "Choosing what to buy", hash: "choosing-what-to-buy" },
          { phrase: "Traditional and agile", hash: "traditional-vs-agile" },
          { phrase: "case study just below", hash: "case-study" },
        ],
      },
      {
        label: "Approve",
        title: "Get the approval level right, and check in at the right moment.",
        blocks: [
          {
            type: "p",
            text: "Most services are approved and funded inside the department, and roughly 95% of projects never go higher than that.",
          },
          {
            type: "p",
            text: "Two things decide which path a project takes: the department's approved project-management capacity class, and the project's score on the Project Complexity and Risk Assessment. If the project scores within the department's capacity, the department's own governance approves it. A concept case and the departmental architecture review board come first either way.",
          },
          {
            type: "p",
            text: "Only the largest or most complex projects climb higher, to the Government of Canada Enterprise Architecture Review Board and a Treasury Board submission. If that is you, start the conversation at the strategy stage, while there is still room to change the plan. The Funding page sets out which path a given project takes, so most readers will not need the detail here.",
          },
        ],
        internalLinks: [
          { phrase: "Treasury Board submission", to: "/thread/funding" },
          { phrase: "Funding", to: "/thread/funding" },
        ],
      },
      {
        label: "Engage",
        title: "Engage industry early, under clear rules.",
        blocks: [
          {
            type: "p",
            text: "Talking to suppliers early makes your requirement sharper and your market clearer. Do it with the ground rules written down first, so it stays fair to everyone.",
          },
          {
            type: "subheading",
            text: "Two ways to ask industry a question without buying anything",
          },
          {
            type: "p",
            text: "If you want to know whether something is even feasible before committing to buy, there are two named ways to ask:",
          },
          {
            type: "ul",
            items: [
              "A Request for Information, which is defined in the Supply Manual.",
              "A Review and Refine Requirements process, which is not formally defined anywhere but is widely used. Canada shares drafts of its requirements and asks suppliers for feedback to sharpen them before the solicitation.",
            ],
          },
          {
            type: "p",
            text: "Neither ends in a contract, and you can run several of each. PSPC describes them as waves, each one narrower than the last:",
          },
          {
            type: "ul",
            items: [
              "brainstorm the challenge statement and the outcomes",
              "take market feedback on the minimum you must have",
              "then on the draft statement of work and evaluation grid",
              "then on the draft pricing and the solicitation itself",
            ],
          },
          {
            type: "p",
            text: "Engagement is optional everywhere except the formal pre-qualification and solicitation steps.",
          },
          {
            type: "subheading",
            text: "It is free for you and not free for them",
          },
          {
            type: "p",
            text: "Nobody is paid for any of this, so it costs the department time rather than money. Responding takes real effort from suppliers, though, and PSPC's own advice is to make taking part worthwhile and not to burn goodwill you will need later. Run as many rounds as the requirement genuinely needs, and no more.",
          },
          {
            type: "subheading",
            text: "If the feedback changes your draft, go back to everyone",
          },
          {
            type: "p",
            text: "If supplier feedback makes you change draft requirements or draft evaluation criteria, return to all of the suppliers before you do, so nobody ends up looking advantaged.",
          },
        ],
      },
      {
        label: "Award",
        title: "Solicit, evaluate, and award.",
        blocks: [
          {
            type: "p",
            text: "Publish the solicitation, assess what comes back, and choose. What agile procurement adds here is that you can judge real things, prototypes, demonstrations, tested increments, rather than a written promise alone.",
          },
        ],
      },
      {
        label: "Manage",
        title: "Manage the contract.",
        blocks: [
          {
            type: "p",
            text: "The signature is the starting line, not the finish. Holding the supplier to what the contract promised runs for as long as the service does, and what that looks like lives in the Live and Sunset phases.",
          },
        ],
        internalLinks: [
          { phrase: "Live", to: "/live" },
          { phrase: "Sunset", to: "/sunset" },
        ],
      },
    ] satisfies ProcurementJourneyStepStrings[],
  },

  comparison: {
    rows: [
      {
        topic: "Requirements",
        traditional: "Fixed up front, then sent to market",
        agile: "Start from a challenge and your minimum needs, refine with suppliers",
      },
      {
        topic: "Shape of the buy",
        traditional: "One or two large contracts",
        agile: "Several smaller contracts, in series or in parallel",
      },
      {
        topic: "Talking to industry",
        traditional: "Through formal documents",
        agile: "Early and often, in workshops and working sessions",
      },
      {
        topic: "Handling change",
        traditional: "Strategy mostly frozen once approved",
        agile: "Strategy evolves as you learn",
      },
      {
        topic: "When planning happens",
        traditional: "Mostly at the start",
        agile: "All the way through",
      },
      {
        topic: "When you know it worked",
        traditional: "After award and delivery",
        agile: "At each increment along the way",
      },
    ] satisfies ComparisonRowStrings[],
    caption:
      "Agile is not always faster. What it buys is confidence: the problems surface early, while they are still cheap to fix, and because the work arrives in smaller pieces, so does its value. Note that traditional and agile describe the shape of a buy, which is a different question from what is being bought. A department can buy a team in a traditional shape, or a product in an agile one.",
  },

  caseStudy: {
    title: "The same programme, bought two ways",
    risky: {
      heading: "The risky way",
      framing:
        "Buy the whole programme as a single contract, awarded to a single supplier, delivered over years. This is how most government buying has been done.",
      good: [
        {
          lead: "Simple to set up and run.",
          body: "One competition, one contract, one supplier, one relationship. For a small team with little procurement capacity, that simplicity is worth a lot.",
        },
        {
          lead: "Accountability is in one place.",
          body: "When something goes wrong, there is a single supplier to answer for it and a single contract to hold them to.",
        },
        {
          lead: "Less to coordinate.",
          body: "You are not stitching together the work of several suppliers or making sure the pieces fit at the seams.",
        },
      ],
      bad: [
        {
          lead: "The risk all arrives at the end.",
          body: "You spend months, often years, before you see anything working, and only then learn whether it meets the need. By that point the money is largely spent.",
        },
        {
          lead: "You get locked in.",
          body: "Once the supplier is deep in the build, moving away is slow and costly, so departments keep paying even when the work is going badly.",
        },
        {
          lead: "Change is expensive.",
          body: "The contract is written around the original plan. When the need shifts, every adjustment becomes a negotiation.",
        },
        {
          lead: "One failure can sink the whole programme.",
          body: "Everything rides on a single supplier and a single delivery, so a single bad call puts all of it at risk.",
        },
      ],
    } satisfies CaseStudySide,
    safer: {
      heading: "The safe way",
      framing:
        "Break the programme into smaller, tightly scoped contracts that build on each other, often across several suppliers. This is the agile default.",
      good: [
        {
          lead: "Value shows up early.",
          body: "Each piece delivers something usable in weeks or months, so the service starts helping people sooner and you learn from real use as you go.",
        },
        {
          lead: "You can course-correct.",
          body: "A weak supplier or a wrong turn costs you one small piece you can replace, rather than the whole programme.",
        },
        {
          lead: "Change is cheaper.",
          body: "The next piece absorbs the new need, so the work bends with reality.",
        },
        {
          lead: "Risk is spread.",
          body: "No single delivery or supplier can take the whole thing down.",
        },
        {
          lead: "More suppliers can compete.",
          body: "Smaller pieces let smaller and more specialised firms bid, which widens the field and can lower cost.",
        },
      ],
      bad: [
        {
          lead: "More coordination falls on you.",
          body: "Several contracts and suppliers mean more relationships to manage and more seams to keep aligned.",
        },
        {
          lead: "Keeping pieces small takes discipline.",
          body: "A \"small\" piece drifts back into a monolith if no one holds the line.",
        },
        {
          lead: "It needs more procurement attention up front.",
          body: "Designing the pieces and how they fit is real work, and in-house capacity for it is often thin.",
        },
        {
          lead: "Integration becomes your problem.",
          body: "When different suppliers build different parts, making them work together lands on your side.",
        },
      ],
    } satisfies CaseStudySide,
  },

  goodLooksIntro:
    "A handful of things, all of which you can check. Each one has its own page.",

  whyItMatters: [
    "The contract decides the future of your service. What it costs over its life. Whether you can change it. Whether you can ever move off it. Most of that is settled the day you sign, and undoing it later is slow and expensive.",
    "A good buy leaves your options open. A bad one closes them over time, for as long as the service runs, often without anyone noticing until it is too late.",
    "Buying the agile way lowers the worst risk of all, the two-year effort that ends in \"start over.\" When you can correct course along the way, you are never far from solid ground.",
  ],

  whoseJob: {
    text: "Your department's. You can give the building to a supplier, but the responsibility stays with you, and if the service lets somebody down, \"the contractor did it\" is not an answer anyone will accept. The Treasury Board Directive on the Management of Procurement puts the same thing in policy terms.",
    externalLinks: [
      {
        phrase: "Treasury Board Directive on the Management of Procurement",
        linkKey: "directive-procurement",
      },
    ],
  } satisfies LinkedProseStrings,

  whoseJobSplit: {
    intro: "Four parties, and the split between them holds for the whole buy:",
    roles: [
      {
        who: "Your department",
        does: "The business owner. Accountable for the decision and for the outcomes, from the first idea to the last day the service runs.",
      },
      {
        who: "The contracting authority",
        does: "A procurement specialist who runs the buying itself: the solicitation, the evaluation, the award, and the amendments afterwards.",
      },
      {
        who: "TBS",
        does: "Sets enterprise direction and standards, and reviews the architecture through the enterprise architecture review board.",
      },
      {
        who: "PSPC",
        does: "Runs the common procurement services and the enterprise tools departments buy through.",
      },
    ],
    // PLACEHOLDER SOURCE: GCcase Migration Readiness Guide — Roles and Responsibilities — REPLACE WITH REAL LINK (AND ANCHOR IF AVAILABLE) WHEN PUBLISHED
    close: "TBS's GCcase migration guidance sets out the same split.",
    placeholderLinks: [
      {
        phrase: "TBS's GCcase migration guidance",
        source: GCCASE_MIGRATION_READINESS_GUIDE,
        part: "Roles and Responsibilities",
      },
    ],
  },

  goodContractCallout: {
    label: "A GOOD CONTRACT",
    title: "What a good contract looks like",
    paragraphs: [
      "When a supplier builds or runs your service, the contract is where every promise lives: what they must deliver, how you will see it being done, and whether you can ever leave.",
      "We have written out a short, real-looking sample contract for the grant portal, with each clause the rest of the playbook tells you to put in.",
    ],
    linkLabel: "See what a good contract looks like →",
    href: GOOD_CONTRACT_PATH,
  },

  byPhase: {
    id: "by-phase",
    title: "What Procurement looks like in each phase",
    intro:
      "Procurement runs through the whole life of a service, but it weighs more at some stages than others.",
    blocks: [
      {
        title: "Create.",
        preview: "This is where procurement weighs the most.",
        popup: [
          {
            text: "This is where procurement weighs the most.",
            bold: [{ phrase: "This is where procurement weighs the most." }],
          },
          {
            text:
              "You work out the real problem, choose whether to reuse or buy, set the strategy, go to market, and award the contract.",
          },
          {
            text:
              "Almost every decision that will bind the service for years is made here, so it is worth slowing down to get right.",
          },
        ],
      },
      {
        title: "Live.",
        preview: "The buying has stopped, but the work has not.",
        popup: [
          {
            text: "The buying has stopped, but the work has not.",
            bold: [{ phrase: "The buying has stopped, but the work has not." }],
          },
          {
            text:
              "You hold the supplier to what the contract promised, and watch the service levels and the relationship for drift.",
          },
          {
            text:
              "Keep the service improving too, so it does not age into a forced replacement, and start lining up the next contract well before this one ends.",
          },
        ],
      },
      {
        title: "Sunset.",
        preview: "Leaving takes longer than people expect.",
        popup: [
          {
            text: "Leaving takes longer than people expect.",
            bold: [{ phrase: "Leaving takes longer than people expect." }],
          },
          {
            text:
              "Plan the re-compete or the retirement well before the contract ends, because the move itself takes real time.",
          },
          {
            text:
              "Data has to move, knowledge has to transfer, and what you bought is retired or replaced.",
          },
        ],
      },
    ],
  } satisfies ThreadByPhaseContent,

  furtherReading: {
    text: "This thread comes under the Treasury Board Directive on the Management of Procurement, which takes an outcomes-based, lifecycle view of buying. Its closest internal companion is the PSPC Agile Procurement Guide, on the GC network, which this thread leans on for the agile patterns. It also draws on the Boots and Clarke guide to reforming IT procurement in Canada, the UK Service Manual, and Skylight's open agile procurement playbook, all translated to Canadian rules.",
    externalLinks: [
      {
        phrase: "Treasury Board Directive on the Management of Procurement",
        linkKey: "directive-procurement",
      },
      {
        phrase: "PSPC Agile Procurement Guide",
        linkKey: "agile-procurement-guide",
      },
    ],
  } satisfies LinkedProseStrings,
};
