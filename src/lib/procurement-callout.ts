/** Subphase pages that can host the procurement callout block. */
export type ProcurementCalloutSubphaseId =
  | "create-discovery"
  | "create-alpha"
  | "create-beta"
  | "live-stabilization"
  | "live-growth"
  | "live-maturity";

/** @deprecated Use ProcurementCalloutSubphaseId */
export type ProcurementCalloutPhaseId = ProcurementCalloutSubphaseId;

export const PROCUREMENT_CALLOUT_LABEL = "Procurement & contracting";

export const PROCUREMENT_CALLOUT_HEADING = "Procurement and contracting";

/** Shared framing — same on every sub-phase page. */
export const PROCUREMENT_CALLOUT_FRAMING =
  "Most existing government services were bought, in whole or in part. When a supplier builds or runs your service, contracting runs through all of the work above. It decides what you can change, what you can measure, and whether you can ever leave.";

export const PROCUREMENT_CALLOUT_LINK_LABEL = "Go to the Procurement thread →";

export const PROCUREMENT_CALLOUT_LINK = "/thread/procurement";

/** What procurement and contracting mean at each sub-phase. */
export const PROCUREMENT_CALLOUT_AT_SUBPHASE: Record<ProcurementCalloutSubphaseId, string> = {
  "create-discovery":
    "At this sub-phase it means deciding what to buy, how to buy it in pieces, and what the contract must carry before you sign.",
  "create-alpha":
    "At this sub-phase it means shaping the agreement so it names the practices, stays modular, and leaves you able to leave.",
  "create-beta":
    "At this sub-phase it means contracting for the first version that will go live — with measures you can check and an exit you have planned.",
  "live-stabilization":
    "At this sub-phase it means holding a new supplier to what was agreed while the service settles, before lock-in deepens over time.",
  "live-growth":
    "At this sub-phase it means keeping contracts short enough to change course, and watching that growth does not bind you to one vendor.",
  "live-maturity":
    "At this sub-phase it means holding the supplier to the contract, watching for lock-in, and planning the exit before you are forced into one.",
};

/** @deprecated Use PROCUREMENT_CALLOUT_AT_SUBPHASE */
export const PROCUREMENT_CALLOUT_AT_PHASE = PROCUREMENT_CALLOUT_AT_SUBPHASE;
