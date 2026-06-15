import { GuideArrowBullet } from "@/lib/guide-lists";
import { guideProse, guideProseTight, guideSectionTitle } from "@/lib/guide-typography";

type Item = { lead: string; body: string };

export function WhatStaysYoursBlock({
  heading = "What work stays yours",
  intro,
  items,
  close,
}: {
  heading?: string;
  intro: string;
  items: Item[];
  close: string;
}) {
  return (
    <section className="mt-10 md:mt-12 scroll-mt-24" id="what-work-stays-yours">
      <h2 className={`${guideSectionTitle} mb-4`}>{heading}</h2>

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
