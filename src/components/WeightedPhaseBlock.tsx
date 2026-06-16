import { PHASES, type LifecyclePhaseId } from "@/lib/guide-strings";
import { guideProse, guideProseSpace } from "@/lib/guide-typography";

export type WeightedPhaseNote = {
  lifecyclePhase: LifecyclePhaseId;
  body: string;
  weight: "heavy" | "medium" | "light";
};

/** @deprecated Use WeightedPhaseNote */
export type WeightedRegionNote = WeightedPhaseNote;

const weightStyles: Record<
  WeightedPhaseNote["weight"],
  { box: string; title: string; body: string }
> = {
  heavy: {
    box: "rounded-xl border border-primary/30 px-5 py-5 md:px-6 md:py-6",
    title: "font-serif text-xl md:text-2xl font-semibold text-primary tracking-tight",
    body: guideProse,
  },
  medium: {
    box: "rounded-lg border border-border/80 px-4 py-4 md:px-5 md:py-5",
    title: "font-serif text-lg font-semibold text-primary/85 tracking-tight",
    body: `${guideProse} text-foreground/80`,
  },
  light: {
    box: "rounded-lg border border-border/60 px-4 py-3.5 md:px-5 md:py-4",
    title: "font-serif text-base font-semibold text-primary/75 tracking-tight",
    body: `${guideProse} text-foreground/70`,
  },
};

export function WeightedPhaseBlock({ phases }: { phases: WeightedPhaseNote[] }) {
  return (
    <div className={`${guideProseSpace} mt-4`}>
      {phases.map((note) => {
        const styles = weightStyles[note.weight];
        return (
          <div
            key={note.lifecyclePhase}
            className={styles.box}
            style={{ backgroundColor: "var(--phase-group)" }}
          >
            <h3 className={styles.title}>{PHASES[note.lifecyclePhase].title}.</h3>
            <p className={`mt-2 ${styles.body}`}>{note.body}</p>
          </div>
        );
      })}
    </div>
  );
}

/** @deprecated Use WeightedPhaseBlock */
export function WeightedRegionBlock({
  regions,
}: {
  regions: Array<WeightedPhaseNote & { region?: LifecyclePhaseId }>;
}) {
  return (
    <WeightedPhaseBlock
      phases={regions.map((note) => ({
        lifecyclePhase: note.lifecyclePhase ?? note.region!,
        body: note.body,
        weight: note.weight,
      }))}
    />
  );
}
