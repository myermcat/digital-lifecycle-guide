import { guideProseTight } from "@/lib/guide-typography";

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
    when: "Before",
    name: "Concept case",
    official: true,
    what: "The problem, the rough size of the investment, and the direction being considered. Stops short of choosing a solution.",
    who: "Mandatory for digitally enabled projects at $2.5M with no approved capacity class or class 1, rising to $25M at class 4.",
    alsoUseful: "Below the threshold nobody asks for one, and the template is still worth using.",
  },
  {
    when: "In between",
    name: "The requirements",
    official: false,
    what: "What the service has to do, what the organization needs, and how the service has to behave.",
    who: "Mandatory for every purchase. The procurement directive puts defining them on the business owner, with no dollar floor. What does not exist is a template: no instrument says what they have to look like, which is why this page explains how to write them.",
    alsoUseful: "The statement of work is written from them. Above $40,000 of professional services, the contracting authority gets a written statement of work before award, with a signed confirmation. Below that, the buying is lighter and the contract is still written from them.",
  },
  {
    when: "After",
    name: "Statement of work",
    official: true,
    what: "The description of the work being bought, written from the requirements.",
    who: "Only if the department is buying. It belongs to the contract, so an in-house build never writes one.",
    alsoUseful: "",
  },
];

export function RequirementsNamingStrip() {
  return (
    <div className="mt-5">
      <p className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        What each one is called, and who has to produce it
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
