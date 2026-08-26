import { SITE_NAME } from "@/lib/site-meta";

/**
 * The navigation module's own words.
 *
 * lifecycle-navigation.tsx is .tsx and mixes prose with layout and a set of
 * deprecated aliases, so a whole French twin would duplicate its logic to translate
 * about twenty strings. Only the words live here, where the build can swap them.
 *
 * The document-title suffix reads SITE_NAME rather than repeating it, so it follows
 * the language on its own; the English value is unchanged.
 */
export const NAV_STRINGS = {
  howThePhaseWorks: (phaseName: string) => `Comment fonctionne la phase ${phaseName}`,
  howTheSubphaseWorks: (subphaseName: string) =>
    `Comment fonctionne la sous-phase ${subphaseName}`,

  documentTitleSuffix: SITE_NAME,

  subphase: {
    discovery: "Découverte",
    alpha: "Alpha",
    beta: "Bêta",
    stabilization: "Stabilisation",
    growth: "Croissance",
    maturity: "Maturité",
  },

  subtitle: {
    discovery:
      "Avant que quoi que ce soit soit conçu ou construit, il y a une période d’écoute structurée. L’équipe parle aux personnes qui vivent aujourd’hui avec le problème, les demandeurs, les agents, les gens pris entre les deux, et cartographie ce qui se passe réellement, non ce que le document de processus dit qui devrait se passer. Le but est de comprendre le problème assez clairement pour que la bonne solution devienne évidente. Le résultat est un énoncé du problème sur lequel toute l’équipe s’entend, et assez de preuves pour justifier de dépenser des fonds publics pour un nouveau service.",
    alpha:
      "Avec un vrai problème à résoudre, l’équipe se met à fabriquer des choses à peu de frais et rapidement, délibérément. Des esquisses grossières, des maquettes des écrans et des prototypes cliquables sont mis devant des gens pour éprouver si les hypothèses de l’équipe sont justes. La plupart ne le seront pas. Chaque ronde de tests remplace une supposition par un fait, et le concept s’affine. L’équipe peut essayer plusieurs approches complètement différentes avant que l’une d’elles inspire assez de confiance pour être construite pour de vrai. Rien de ce qui est fabriqué dans cette sous-phase n’est censé durer. C’est censé enseigner.",
    beta:
      "La première version construite pour durer ne fait que l’essentiel, et entre en fonction pour un public limité ou pour un cas d’usage étroit. Le but est de remplacer les conditions d’essai par de vraies conditions : de vrais utilisateurs, de vraies données, de vrais modes de défaillance. L’équipe observe ce qui se passe, le mesure, et se sert de ce qu’elle apprend pour décider quoi construire ensuite. Une version qui enseigne à l’équipe ce dont les utilisateurs ont réellement besoin fait exactement ce qu’elle est censée faire.",
    stabilization: "Stabiliser le service juste après sa mise en service.",
    growth: "Ajouter des capacités à mesure que les utilisateurs arrivent.",
    maturity:
      "La vie mature d’un service numérique dans la phase Exploitation — exploiter et améliorer un service existant.",
  },

  navLabel: {
    livePhase: "Phase Exploitation",
    sunsetPhase: "Phase Retrait",
    stabilizationSubphase: "Sous-phase Stabilisation",
    growthSubphase: "Sous-phase Croissance",
    maturitySubphase: "Sous-phase Maturité",
  },
} as const;
