import { GuideArrowBullet } from "@/lib/guide-lists";
import { guideProse, guideProseTight, guideSectionTitle } from "@/lib/guide-typography";

const ICONS = ["map", "decide", "checkpoint", "shield", "shadow"] as const;

function StripIcon({ kind }: { kind: (typeof ICONS)[number] }) {
  const paths: Record<(typeof ICONS)[number], string> = {
    map: "M3 6l6-3 6 3v12l-6 3-6-3V6z",
    decide: "M12 3v18M3 12h18",
    checkpoint: "M5 12l4 4L19 6",
    shield: "M12 3l8 4v6c0 5-3.5 8-8 8s-8-3-8-8V7l8-4z",
    shadow: "M4 18h16M6 14h12M8 10h8",
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-primary">
      <path
        d={paths[kind]}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type Item = { lead: string; body: string };

export function WhatStaysYoursBlock({
  intro,
  items,
  close,
}: {
  intro: string;
  items: Item[];
  close: string;
}) {
  return (
    <section className="mt-10 md:mt-12 scroll-mt-24" id="what-stays-yours">
      <h2 className={`${guideSectionTitle} mb-4`}>What stays yours</h2>

      <div className="mb-6 flex flex-wrap gap-3">
        {items.map((item, index) => (
          <div
            key={item.lead}
            className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5"
          >
            <StripIcon kind={ICONS[index] ?? "map"} />
            <span className="font-sans text-xs font-medium text-foreground/80">
              {item.lead.replace(/\.$/, "")}
            </span>
          </div>
        ))}
      </div>

      <p className={`${guideProse} mb-4`}>{intro}</p>
      <ul className={`${guideProseTight} space-y-3 list-none pl-0`}>
        {items.map((item) => (
          <li key={item.lead} className="flex gap-2.5">
            <GuideArrowBullet />
            <span>
              <span className="font-semibold text-foreground/90">{item.lead}</span> {item.body}
            </span>
          </li>
        ))}
      </ul>
      <p className={`${guideProse} mt-4`}>{close}</p>
    </section>
  );
}
