import { guideCalloutLabel, guideProseTight } from "@/lib/guide-typography";

export function ProcurementScopeCallout({ text }: { text: string }) {
  return (
    <aside className="mt-8 rounded-lg border border-primary/30 bg-primary/5 px-6 py-5 md:px-7 md:py-6">
      <p className={guideCalloutLabel}>Scope</p>
      <p className={`${guideProseTight} mt-2`}>{text}</p>
    </aside>
  );
}
