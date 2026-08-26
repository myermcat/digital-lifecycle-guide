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
  heading: "Acheter ou construire",
  prose:
    "Les pratiques restent les mêmes. Ce qui change, c’est qui fait le travail : votre équipe, un fournisseur, ou les deux.",
  options: ["À l’interne", "Acheté", "Mixte"],
  storageKey: SOURCING_KEY,
} as const;

export const SETUP_TOGGLE_SIZE = {
  heading: "Taille",
  prose: "Les pratiques s’appliquent à toute taille. Ce qui change, c’est le poids de chacune.",
  options: ["Petite", "Moyenne", "Grande", "Entreprise"],
  storageKey: SIZE_KEY,
} as const;
