import { guideProseTight } from "@/lib/guide-typography";
import { REQUIREMENTS_NAMING_STRIP_STRINGS } from "@/lib/requirements-naming-strip-strings";
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
 *
 * The prose lives in src/lib/requirements-naming-strip-strings.ts so the French
 * build can swap it; only the layout and the official/unofficial flag are here.
 */

const STEPS = [
  {
    ...REQUIREMENTS_NAMING_STRIP_STRINGS.conceptCase,
    official: true,
  },
  {
    ...REQUIREMENTS_NAMING_STRIP_STRINGS.requirements,
    official: false,
  },
  {
    ...REQUIREMENTS_NAMING_STRIP_STRINGS.statementOfWork,
    official: true,
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
