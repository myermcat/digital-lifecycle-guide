import type { CaseStudySide } from "@/components/CaseStudyBlock";
import {
  CONTRACTING_SUBPAGE_SLUGS,
  type ContractingSubPageSlug,
} from "./contracting-subpage-slugs";
import { SOO_VS_SOW_PATH } from "./reference-paths";

export { CONTRACTING_SUBPAGE_SLUGS, type ContractingSubPageSlug };

export type ContractingBullet = {
  lead: string;
  body: string;
  bodyLines?: string[];
};

export type ContractingParagraphLink = {
  index: number;
  phrase: string;
  to: string;
};

export type ContractingSection = {
  id: string;
  title: string;
  paragraphs?: string[];
  paragraphLinks?: ContractingParagraphLink[];
  paragraphsAfterBullets?: string[];
  bullets?: ContractingBullet[];
  /** How lead/body bullet lists are rendered. */
  bulletsVariant?: "inline" | "qa";
  caseStudy?: {
    intro: string;
    risky: CaseStudySide;
    safer: CaseStudySide;
  };
  editorialNote?: {
    label?: string;
    body: string;
  };
};

export type ContractingSubPage = {
  slug: string;
  title: string;
  stub?: boolean;
  intro?: string[];
  sections: ContractingSection[];
  trailingEditorialNote?: {
    label?: string;
    body: string;
  };
};

export const CONTRACTING_SUBPAGES: Record<ContractingSubPageSlug, ContractingSubPage> = {
  "the-contract-carries-the-practices": {
    slug: "the-contract-carries-the-practices",
    title: "The contract carries the practices",
    intro: [
      "The rest of this playbook tells you how to run a service well. This page is about what happens to that advice when a supplier is the one doing the work.",
      "It still has to happen. The contract is how you make sure it does.",
    ],
    sections: [
      {
        id: "cannot-outsource-responsibility",
        title: "You cannot outsource the responsibility",
        paragraphs: [
          "User research, accessibility, security, keeping the service usable and safe: none of these stop being your job because a supplier is at the keyboard. If the service is not accessible, your department is the one that has shut people out, no matter who wrote the code.",
          "So when you buy the work, the practices do not go away. They move into the contract, and into the things you check the supplier on.",
        ],
      },
      {
        id: "playbook-becomes-spec",
        title: "The playbook becomes the spec",
        paragraphs: [
          "This is the useful part. Every practice in this guide is something you can ask for in a contract, and the contract is where you say what the supplier has to deliver. So the playbook turns into the checklist you build that contract from.",
          "For each practice that matters, there are two moves:",
        ],
        bullets: [
          {
            lead: "Name it.",
            body: "Put it in the contract as a real deliverable.",
            bodyLines: [
              'Good clause: "The supplier will run usability testing in each phase with at least five participants from the service\'s real user groups, including people who use assistive technology, and give the findings to the department."',
              'Bad clause: "The supplier will do user research with real users."',
            ],
          },
          {
            lead: "Govern it.",
            body: "Decide how you will see it being done. If you cannot check a practice, you cannot govern it. Ask for the proof: the research write-ups, the accessibility audit, the test results.",
          },
        ],
        paragraphsAfterBullets: [
          "Where you can, write the measure into the contract, and make it specific. “Pages load in under three seconds for almost everyone” is checkable. “The service will be fast” is not. It is the same idea as a good dashboard: the number has to be measured, not guessed. Those measures are what you hold the supplier to, and what you pay against.",
        ],
      },
      {
        id: "what-department-does",
        title: "What the department actually does",
        paragraphs: [
          "When you build it yourself, you do the work. When you buy it, your job is to make sure the supplier does it, and does it well. That is its own kind of work, and it takes real time and attention. People sometimes treat buying as the lighter option. It usually isn't.",
          "It also means you cannot govern what you do not understand. To know whether the supplier's research was any good, someone on your side has to know what good research looks like. To know whether the security work is real, someone has to be able to read the answer. These are the same skills the rest of the playbook teaches. You are using them to govern a supplier instead of to do the work, but they are the same skills.",
        ],
      },
    ],
    trailingEditorialNote: {
      label: "Editorial note",
      body: "Drafted from open sources. How to name and govern a practice inside a real Government of Canada contract still needs a contracting officer's check before this goes out as advice.",
    },
  },
  "you-bought-small-in-pieces": {
    slug: "you-bought-small-in-pieces",
    title: "You bought small, in pieces",
    intro: [
      "The most useful thing you can do when buying a service is to not buy all of it at once.",
    ],
    sections: [
      {
        id: "build-the-way-you-code",
        title: "Build it the way you would code it",
        paragraphs: [
          "If you were building the service yourself, you would not write the whole thing in one sitting. You would work out the shape of it, build a piece, check that it works, then build the next piece on top. Small steps you can test. You fix your course as you learn.",
          "Buying in pieces is the same habit applied to contracts. Instead of one big contract for the whole job, you write several smaller ones, each for a real piece of work. The architecture is a piece. Moving the data is a piece. Each part of the service is a piece. You buy them in an order where each one teaches you something before the next begins.",
          "This helps because building a service is full of things you cannot know up front. Whether the technology fits. Whether it clashes with what you already run. Whether the problem turns out harder than it looked. A single big contract bets that you got all of that right before you started. You almost never do. Small contracts let you find out cheaply and change course.",
        ],
      },
      {
        id: "modular-not-split",
        title: "Modular, not split: the line you cannot cross",
        paragraphs: [
          "There is a legal line here, and the fear of crossing it is one reason people avoid buying in pieces. So it is worth being clear about.",
          "Contract splitting is illegal. It means taking one job and cutting it into fake slices to get around a control, usually to keep each slice under the dollar limit that would force a competition. The pieces are not really separate. It is one job dressed up as several, to dodge a rule.",
          "Modular contracting is legal, and the Directive actually leans toward it: it favours contracts structured to allow future competition wherever possible. It means splitting a programme into pieces that are genuinely different work, each able to stand or fall on its own, often going to different suppliers, because that produces a better result. Nothing is hidden. Each piece is competed in the open at its real size.",
          "The test is simple. Would these pieces exist as separate work even if there were no dollar limit to dodge? If they would, because they are genuinely different deliverables, it is modular. If the only reason they are split is to duck under a number, it is splitting. One has real seams. The other has fake ones.",
        ],
      },
      {
        id: "write-objectives",
        title: "Write objectives, not a fixed list",
        paragraphs: [
          "How you write what the supplier must do decides whether buying in pieces is even workable.",
          "The usual way is a statement of work: a fixed list of exactly what gets built and how, written as if you already know everything. It reads like “the supplier shall build these screens, in this order, by this date.” That suits things that do not change. It suits digital work badly, because you do not know everything up front, and every time you learn something new you have to reopen the contract to change the list.",
          "A statement of objectives works better for digital. You write down the goals, and bring in people who can work out what to build to meet them. It reads like “here is what this service has to achieve, and who it is for.” The details can shift as you learn, because the contract is tied to the goal, not to a frozen list. That is what lets a piece of work change without a new contract every time, and it is what makes buying in pieces practical instead of painful.",
        ],
        paragraphLinks: [
          { index: 2, phrase: "statement of objectives", to: SOO_VS_SOW_PATH },
        ],
      },
      {
        id: "worked-example",
        title: "A worked example",
        caseStudy: {
          intro: "The work does not change. The shape of the buying does.",
          risky: {
            heading: "Where this goes wrong",
            items: [
              "Gather all the requirements up front, before anything is built.",
              "Write one large statement of work against them.",
              "Award one big contract to a single prime supplier, who may sub-contract underneath.",
              "Set a long stretch before any working software is due.",
              "Find out at the end whether it works. If it doesn't, the money is gone.",
            ],
          },
          safer: {
            heading: "What this protects",
            items: [
              "Accept that the whole thing is complex and not fully knowable yet.",
              "Name the real pieces: the architecture, the data move, each part of the service.",
              "Buy each piece as its own smaller contract, often to different suppliers.",
              "Each piece is due soon, so value shows up early and so do problems.",
              "If one supplier underperforms, replace that piece, not the whole programme.",
            ],
          },
        },
        editorialNote: {
          label: "Editorial note: anonymised on purpose",
          body: "This example does not name a real programme. Real Government of Canada programmes have failed in the way the left column describes, and naming one here would turn a teaching example into a claim about another department. The pattern is the point, not the name. A named version can be talked through with Dan before anything is published.",
        },
      },
      {
        id: "honest-cost",
        title: "The honest cost of buying in pieces",
        paragraphs: [
          "Buying in pieces is not free. It asks more of you, not less. There are more contracts to run, more suppliers to coordinate, and you need someone holding the whole picture so the pieces fit. This is real work, and it is why people reach for one big contract instead.",
          "What you get for the effort is this: the big contract feels easier, right up to the point where it fails, and then it fails all at once with the money already spent. Buying in pieces costs you more attention along the way and far less when something goes wrong. You are spending coordination now to avoid a much bigger bill later.",
        ],
      },
      {
        id: "common-worries",
        title: "But won't this be a hard sell? Common worries, answered",
        paragraphs: [
          "Most of the reasons people sign one big contract are not rules. They are fears and habits. Here are the ones you will run into, and what to do about each.",
        ],
        bulletsVariant: "qa",
        bullets: [
          {
            lead: "“A smaller contract will look less controlled, and won't get approved.”",
            body: "This is the real one, and there is a true instinct behind it: one big plan looks tidy to an approver, and a set of pieces looks messy. The move is to show that the pieces are actually more controlled. Point to where the big-contract approach has already failed. Show that a short contract you can stop is safer than a long one you cannot. The evidence backs you up: research on government IT contracts in Canada finds the large, long ones are the most likely to fail. Bring that into the room, and the messy-looking option starts to look like the careful one.",
          },
          {
            lead: "“Running many competitions is more work.”",
            body: "It can be, but you do not start each piece from scratch. Government already has buying tools, standing offers and pre-qualified supplier lists, that let you place smaller pieces of work without a full competition every time. Use them. The aim is to make each small buy cheap to run, so that small does not turn into slow.",
          },
          {
            lead: "“The budget comes as one big project, so the contract has to be big too.”",
            body: "This is the most common mix-up, and clearing it up is the key. The money and the contract are two different things. One funded programme can hold many small contracts under it. You do not need a separate budget approval for each piece. You need one funded programme and the freedom to buy it in pieces. The envelope is big. The contracts inside it do not have to be.",
          },
          {
            lead: "“If the work isn't fixed up front, what are we actually paying for?”",
            body: "You are paying for progress against agreed goals, checked as you go, instead of for a fixed list of features promised before anyone really understood the problem. The commitments are real: the measures you wrote into the contract, the working software delivered each short stretch, the goals met. Often this is easier to defend than the big fixed list, because you can watch value arrive and stop paying if it doesn't. You are buying a run of delivered, checkable steps.",
          },
          {
            lead: "“Won't this look like splitting?”",
            body: "Only if you are doing it to dodge a limit. If your pieces are real, different deliverables competed in the open, you are on the right side of the line. Use the test from earlier and keep your reasoning written down. Modular done openly is the opposite of splitting done quietly.",
          },
        ],
      },
    ],
    trailingEditorialNote: {
      label: "Editorial note",
      body: "Which buying tools to use, and how to frame a modular plan for a Government of Canada approver, are the parts that need a contracting officer's eye before publishing. The principle is open and sound; the exact manoeuvres should be checked.",
    },
  },
  "you-did-not-over-customise": {
    slug: "you-did-not-over-customise",
    title: "You did not over-customise",
    intro: ["When you buy software that already exists, the strongest thing you can do is leave it alone."],
    sections: [
      {
        id: "table-with-hole",
        title: "The table with a hole in it",
        paragraphs: [
          "Say you buy a good, standard table. Then you cut a hole in it to fit one particular machine you own. Now the table only works for that machine. You cannot use it for anything else, and you cannot sell it on. You have traded a thing that fit many needs for a thing that fits one.",
          "Customising bought software does the same. You bend it to fit the one way you happen to work today, and in doing that you make it yours alone, good for nothing but the job you bent it toward.",
        ],
      },
      {
        id: "why-customising-hurts",
        title: "Why customising hurts later",
        paragraphs: [
          "The real cost shows up at upgrade time. The supplier ships a new version, with improvements you would have got for free. But your copy is full of your own changes. Before you can take the new version, you have to redo every one of those changes on top of it. So you either fall behind on an old version, or you pay, again and again, to carry your changes forward. Every upgrade becomes a project. Customise far enough and the thing can no longer be patched at all, and then a security fix you need is one you cannot take.",
        ],
      },
      {
        id: "bend-process",
        title: "Bend the process, not the software",
        paragraphs: [
          "When you buy, change your process to fit the software, not the other way round. Your way of working can flex. You can change a form, a step, a habit. The bought thing should stay as close to standard as you can keep it, because standard is what stays cheap to run, easy to patch, and safe to upgrade.",
          "Sometimes a small change really is needed. When it is, make the smallest one you can, and write down why, so the next person knows what it cost. The goal is not zero changes at any price. It is to treat every change as a debt you will pay back at every upgrade, and to take on as little of it as the work allows.",
        ],
      },
    ],
  },
  "you-can-leave-when-you-need-to": {
    slug: "you-can-leave-when-you-need-to",
    title: "You can leave when you need to",
    intro: [
      "A supplier you cannot leave is a supplier who sets the price. Owning your exit is what keeps the relationship honest while it lasts.",
    ],
    sections: [
      {
        id: "how-stuck-happens",
        title: "How being stuck happens",
        paragraphs: [
          "Lock-in is when leaving a supplier is painful enough that you effectively can't, so they hold the power at every renewal. It rarely arrives as one big decision. It builds up quietly, in a few ordinary ways:",
        ],
        bullets: [
          {
            lead: "They own the work.",
            body: "The supplier owns the code, so you cannot hand it to anyone else or maintain it yourself. Every change runs through them, at their price.",
          },
          {
            lead: "They hold the data.",
            body: "Your data sits in a format only their software reads, so moving it out means a slow, risky conversion you keep putting off.",
          },
          {
            lead: "No one else knows it.",
            body: "The thing was built just for you, so no other supplier knows it. Re-tendering means paying someone new to learn or rebuild it, and the current supplier wins by default.",
          },
          {
            lead: "The knowledge is theirs.",
            body: "Only the supplier's people understand how it works. They walk, you are blind. This one needs no contract clause at all.",
          },
        ],
      },
      {
        id: "staying-free",
        title: "Staying free is a bundle, not one clause",
        paragraphs: [
          "No single term keeps you free. Staying able to leave is a set of habits, each one shutting a different door:",
        ],
        bullets: [
          {
            lead: "Own the intellectual property.",
            body: "Then you can hand it to another supplier or maintain it yourself. Go further than owning it on paper: make the supplier keep the code in a repository your department controls, from day one, not on their own machines. Code you hold and can read is code no supplier can sit on.",
          },
          {
            lead: "Use open standards and open formats.",
            body: "So your data and your service stay portable, and more than one supplier can work on them.",
          },
          {
            lead: "Avoid bespoke where something off-the-shelf will do.",
            body: "Standard things have a market of suppliers who know them. Bespoke things have a market of one.",
          },
          {
            lead: "Keep contracts short.",
            body: "Short contracts bring the switching point around often, so being stuck cannot quietly deepen.",
          },
          {
            lead: "Require off-boarding.",
            body: "Make the contract require the supplier to hand back your data in a usable, standard form and help you move, rather than holding it hostage. The UK builds this right into its buying: a supplier has to let you off-board to a competitor.",
          },
          {
            lead: "Keep enough knowledge in-house.",
            body: "Even with every clause in place, you can only leave if someone on your side understands the service well enough to run the move.",
          },
        ],
      },
      {
        id: "after-you-bought",
        title: "What changes once you have bought it",
        paragraphs: [
          "Buying is the start, not the finish. Once the service is live, most cycles are about keeping the lights on: patching, watching, making careful small changes. You are not adding big new features. The contracting job in this stretch is quieter, but it does not stop.",
          "You hold the supplier to what was agreed, and you watch for drift, the slow way a supplier's direction and your needs pull apart over renewals. And you keep half an eye on the exit you planned for at the start, because the day comes when a part of the service, or the supplier, or the whole thing reaches its end. Planning the exit early is what makes it calm when it arrives.",
        ],
      },
    ],
    trailingEditorialNote: {
      label: "Editorial note",
      body: "Where this thread meets the end of a service or a bought component, it joins the End-of-life thread. That join gets written when the End-of-life thread is built. For now this page points forward to it.",
    },
  },
  "you-kept-enough-in-house": {
    slug: "you-kept-enough-in-house",
    title: "You kept enough in-house",
    stub: true,
    sections: [],
  },
};

export function isContractingSubPageSlug(slug: string): slug is ContractingSubPageSlug {
  return CONTRACTING_SUBPAGE_SLUGS.includes(slug as ContractingSubPageSlug);
}
