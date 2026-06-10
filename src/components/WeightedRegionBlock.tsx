import { REGIONS, type RegionId } from "@/lib/guide-strings";
import { guideProse, guideProseSpace } from "@/lib/guide-typography";

export type WeightedRegionNote = {
  region: RegionId;
  body: string;
  weight: "heavy" | "medium" | "light";
};

const weightStyles: Record<
  WeightedRegionNote["weight"],
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

export function WeightedRegionBlock({ regions }: { regions: WeightedRegionNote[] }) {
  return (
    <div className={`${guideProseSpace} mt-4`}>
      {regions.map((note) => {
        const styles = weightStyles[note.weight];
        return (
          <div
            key={note.region}
            className={styles.box}
            style={{ backgroundColor: "var(--region-group)" }}
          >
            <h3 className={styles.title}>{REGIONS[note.region].title}.</h3>
            <p className={`mt-2 ${styles.body}`}>{note.body}</p>
          </div>
        );
      })}
    </div>
  );
}
