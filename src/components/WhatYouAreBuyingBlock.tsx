import type { LucideIcon } from "lucide-react";
import { EditorialNote } from "@/components/EditorialNote";
import { IconAccordionSection } from "@/components/IconAccordionSection";
import {
  renderLinkedProse,
  renderThreadSections,
  type ThreadContentSection,
  type ThreadLinkedProse,
} from "@/lib/thread-rich-content";
import { guideProse, guideSectionTitle, guideSubsectionTitle } from "@/lib/guide-typography";
import whereContractSignedVisual from "@/assets/where_contract_signed.svg?url";

export type BuyingRouteContent = {
  id: string;
  icon: LucideIcon;
  title: string;
  sections: readonly ThreadContentSection[];
  contractSigned: ThreadLinkedProse;
};

export type ChoosingWhatToBuyContent = {
  heading: string;
  lead: readonly ThreadLinkedProse[];
  routes: readonly BuyingRouteContent[];
  combiningRoutes: {
    heading: string;
    intro: string;
    paragraphs: readonly ThreadLinkedProse[];
  };
  takeaway: ThreadLinkedProse;
  closingNote: ThreadLinkedProse;
};

function ContractSignedSignpost({ when }: { when: ThreadLinkedProse }) {
  return (
    <p className="mt-4 rounded-md border border-border/70 border-l-4 border-l-primary/35 bg-muted/35 px-3 py-2 font-sans text-[0.8125rem] leading-snug text-foreground/90">
      <strong className="font-semibold text-foreground">Contract signed:</strong>{" "}
      {renderLinkedProse(when)}
    </p>
  );
}

export function WhatYouAreBuyingBlock({
  heading,
  lead,
  routes,
  combiningRoutes,
  takeaway,
  closingNote,
}: ChoosingWhatToBuyContent) {
  return (
    <section className="mt-10 md:mt-12 scroll-mt-24" id="choosing-what-to-buy">
      <h2 className={`${guideSectionTitle} mb-3`}>{heading}</h2>

      <div className={`${guideProse} space-y-3 mb-4`}>
        {lead.map((paragraph) => (
          <p key={paragraph.text}>{renderLinkedProse(paragraph)}</p>
        ))}
      </div>

      <img
        src={whereContractSignedVisual}
        alt="Where the contract is signed across Discovery, Alpha and Beta. Team points at the end of Discovery. Solution and Finished Product point at the start of Beta."
        className="mx-auto mb-3 mt-1 w-full max-w-3xl"
      />

      <IconAccordionSection
        embedded
        stages={routes.map((route) => ({
          id: route.id,
          icon: route.icon,
          title: route.title,
          children: (
            <>
              {renderThreadSections(route.sections)}
              <ContractSignedSignpost when={route.contractSigned} />
            </>
          ),
        }))}
      />

      <div className={`${guideProse} mt-8 space-y-3`} id="most-services-combine-routes">
        <h3 className={`${guideSubsectionTitle} mb-1`}>
          {combiningRoutes.heading}
        </h3>
        <p>{combiningRoutes.intro}</p>
        {combiningRoutes.paragraphs.map((paragraph) => (
          <p key={paragraph.text}>{renderLinkedProse(paragraph)}</p>
        ))}
      </div>

      <p className={`${guideProse} mt-6`}>
        {renderLinkedProse(takeaway)}
      </p>

      <EditorialNote className="mt-5" label="Note">
        <p>{renderLinkedProse(closingNote)}</p>
      </EditorialNote>
    </section>
  );
}
