import { PracticePill } from "@/components/PracticePill";

export interface PracticeGroup {
  leadIn: string;
  practices: { label: string; href: string }[];
}

export function PracticeGroups({ groups }: { groups: PracticeGroup[] }) {
  return (
    <div
      className="rounded-3xl p-5 md:p-7 shadow-inner space-y-8"
      style={{ backgroundColor: "var(--phase-group)" }}
    >
      {groups.map((group, i) => (
        <div key={i} className={i > 0 ? "pt-2 border-t border-border/60" : undefined}>
          <p className="font-serif text-base md:text-[1.05rem] leading-[1.7] text-foreground/90">
            {group.leadIn}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {group.practices.map((p) => (
              <PracticePill key={p.href} href={p.href} label={p.label} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
