import { SOURCING_KEY, SIZE_KEY } from "@/lib/guide-settings";

/**
 * The two "set the guide to your situation" toggles.
 *
 * These sat in the component, which the French build cannot swap, so the French page
 * stored the English option ("In-house") while guide-settings.fr.ts matched on the
 * French one ("À l'interne"). Nothing ever matched and the note below the toggles
 * came out empty. The option labels are the stored value, so they have to be the ones
 * the matching notes expect, which means they belong here with the rest of the words.
 */
export const SETUP_TOGGLE_SOURCING = {
  heading: "Buy vs build",
  prose:
    "The practices stay the same. What changes is who does the work — your team, a supplier, or both.",
  options: ["In-house", "Bought", "Mix"],
  storageKey: SOURCING_KEY,
} as const;

export const SETUP_TOGGLE_SIZE = {
  heading: "Size",
  prose: "The practices apply at any size. What changes is how heavy each one is.",
  options: ["Small", "Medium", "Large", "Enterprise"],
  storageKey: SIZE_KEY,
} as const;
