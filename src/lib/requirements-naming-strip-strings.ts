/**
 * Prose for the requirements naming strip.
 *
 * These words used to live inside src/components/RequirementsNamingStrip.tsx.
 * The French build swaps modules under src/lib, never components, so anything
 * written in the component stayed English on the French site. Keeping the
 * strings here gives requirements-naming-strip-strings.fr.ts something to
 * replace.
 */

export type RequirementsNamingStripEntry = {
  /** Where this document sits relative to the requirements. */
  when: string;
  /** What the document is called. */
  name: string;
  /** What the document contains. */
  what: string;
  /** Who has to produce it, and from what point. */
  who: string;
  /** Why it is worth writing even when nobody demands it. */
  alsoUseful: string;
};

export const REQUIREMENTS_NAMING_STRIP_STRINGS: {
  conceptCase: RequirementsNamingStripEntry;
  requirements: RequirementsNamingStripEntry;
  statementOfWork: RequirementsNamingStripEntry;
} = {
  conceptCase: {
    when: "Before, back in Discovery",
    name: "Concept case",
    what: "A Discovery artifact, written before Alpha begins. It sets out the problem, the rough size of the investment, and the direction being considered, and stops short of choosing a solution.",
    who: "Mandatory for digitally enabled projects at $2.5M with no approved capacity class or class 1, rising to $25M at class 4.",
    alsoUseful: "Below the threshold nobody asks for one, and the template is still worth using.",
  },
  requirements: {
    when: "In between",
    name: "The requirements",
    what: "What the service has to do, what the organization needs, and how the service has to behave.",
    who: "The business owner, for every purchase, with no dollar floor.",
    alsoUseful: "Just as necessary when nobody is buying anything, since it is how the team knows what to build.",
  },
  statementOfWork: {
    when: "After",
    name: "Statement of work",
    what: "The description of the work being bought, written from the requirements.",
    who: "Required only when the department is buying, because it belongs to the contract.",
    alsoUseful: "An in-house team is welcome to write one anyway. It comes with a template, and a template is easier to start from than a blank page.",
  },
};
