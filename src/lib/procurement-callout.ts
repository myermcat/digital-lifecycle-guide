import { CONTRACTING_LANDING_PATH } from "@/lib/contracting-landing";

/** Phase pages that can host the procurement callout block. */
export type ProcurementCalloutPhaseId =
  | "create-discovery"
  | "create-alpha"
  | "create-mvp"
  | "live-stabilization"
  | "live-growth"
  | "live-maturity"
  | "sunset-shutdown"
  | "sunset-transition";

export const PROCUREMENT_CALLOUT_LABEL = "Procurement & contracting";

export const PROCUREMENT_CALLOUT_HEADING = "Procurement and contracting";

/** Shared framing — same on every phase page. */
export const PROCUREMENT_CALLOUT_FRAMING =
  "Most government services are bought, in whole or in part. When a supplier builds or runs your service, contracting runs through all of the work above. It decides what you can change, what you can measure, and whether you can ever leave.";

export const PROCUREMENT_CALLOUT_LINK_LABEL = "Go to the Contracting thread →";

export const PROCUREMENT_CALLOUT_LINK = CONTRACTING_LANDING_PATH;

/** What procurement and contracting mean at each phase. */
export const PROCUREMENT_CALLOUT_AT_PHASE: Record<ProcurementCalloutPhaseId, string> = {
  "create-discovery":
    "At this phase it means deciding what to buy, how to buy it in pieces, and what the contract must carry before you sign.",
  "create-alpha":
    "At this phase it means shaping the agreement so it names the practices, stays modular, and leaves you able to leave.",
  "create-mvp":
    "At this phase it means contracting for the first version that will go live — with measures you can check and an exit you have planned.",
  "live-stabilization":
    "At this phase it means holding a new supplier to what was agreed while the service settles, before lock-in quietly deepens.",
  "live-growth":
    "At this phase it means keeping contracts short enough to change course, and watching that growth does not bind you to one vendor.",
  "live-maturity":
    "At this phase it means holding the supplier to the contract, watching for lock-in, and planning the exit before you are forced into one.",
  "sunset-shutdown":
    "At this phase it means exercising the exit you planned for — moving data, code, and knowledge off the supplier on your terms.",
  "sunset-transition":
    "At this phase it means off-boarding cleanly: the contract ends, what you bought is retired or replaced, and users are not stranded.",
};
