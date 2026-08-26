import { InlineArrowLeadList } from "@/lib/guide-lists";
import type { PlaceholderPhraseLink } from "@/lib/placeholder-sources";
import { guideProse, guideSectionTitle } from "@/lib/guide-typography";
import { UI } from "@/lib/ui-strings";

type Item = {
  lead: string;
  body: string;
  placeholderLinks?: PlaceholderPhraseLink[];
};

export function WhatStaysYoursBlock({
  heading = UI.whatWorkStaysYours,
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
      <InlineArrowLeadList items={items} />
      <p className={`${guideProse} mt-4`}>{close}</p>
    </section>
  );
}
