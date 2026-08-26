import { guideProseTight } from "@/lib/guide-typography";
import { UI } from "@/lib/ui-strings";

/**
 * What the requirements are called, before and after.
 *
 * The point is a gap, and a gap is easier to see than to read. The requirements
 * are mandatory and every buying document descends from them, yet they are the
 * one thing in the row with no template and no form. The dashed card carries
 * that: required, and unshaped.
 *
 * Each entry says who it is mandatory for, because that is the question a reader
 * actually has when they meet one of these names in a meeting.
 */

const STEPS = [
  {
    when: "Before, back in Discovery",
    name: "Concept case",
    official: true,
    what: "A Discovery artifact, written before Alpha begins. It sets out the problem, the rough size of the investment, and the direction being considered, and stops short of choosing a solution.",
    who: "Mandatory for digitally enabled projects at $2.5M with no approved capacity class or class 1, rising to $25M at class 4.",
    alsoUseful: "Below the threshold nobody asks for one, and the template is still worth using.",
  },
  {
    when: "In between",
    name: "The requirements",
    official: false,
    what: "What the service has to do, what the organization needs, and how the service has to behave.",
    who: "The business owner, for every purchase, with no dollar floor.",
    alsoUseful: "Just as necessary when nobody is buying anything, since it is how the team knows what to build.",
  },
  {
    when: "After",
    name: "Statement of work",
    official: true,
    what: "The description of the work being bought, written from the requirements.",
    who: "Required only when the department is buying, because it belongs to the contract.",
    alsoUseful: "An in-house team is welcome to write one anyway. It comes with a template, and a template is easier to start from than a blank page.",
  },
];

export function RequirementsNamingStrip() {
  return (
    <div className="mt-5">
      <p className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        {UI.whatEachOneIsCalledAndWhoHasToProduceI}
      </p>
      <ol className="grid list-none grid-cols-1 gap-3 p-0 m-0 sm:grid-cols-3">
        {STEPS.map((step) => (
          <li
            key={step.name}
            className={
              step.official
                ? "rounded-lg border border-border bg-card px-4 py-3.5"
                : "rounded-lg border border-dashed border-primary/50 bg-primary/5 px-4 py-3.5"
            }
          >
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {step.when}
            </p>
            <p
              className={
                step.official
                  ? "mt-1 font-serif text-[1.02rem] font-semibold leading-tight text-foreground"
                  : "mt-1 font-serif text-[1.02rem] font-semibold leading-tight text-primary"
              }
            >
              {step.name}
            </p>
            <p className={`${guideProseTight} mt-2 text-foreground/80`}>{step.what}</p>
            <p className="mt-2 text-[0.78rem] leading-snug text-muted-foreground">
              {step.who}
            </p>
            {step.alsoUseful ? (
              <p className="mt-1.5 text-[0.78rem] italic leading-snug text-muted-foreground/70">
                {step.alsoUseful}
              </p>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
