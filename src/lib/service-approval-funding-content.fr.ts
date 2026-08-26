import type { ExternalPhraseLink } from "@/components/ProseWithExternalLinks";
import { THREADS } from "@/lib/guide-strings";
import { OPTIONS_ANALYSIS_PATH } from "@/lib/reference-paths";
import type { ThreadLinkedProse } from "@/lib/thread-rich-content";

export type CreateSpineStage = ThreadLinkedProse & {
  title: string;
};

export const SERVICE_APPROVAL_FUNDING_STAGES = [
  {
    title: "Faire valoir le dossier.",
    text: "Un service part d’un problème clair : qui le vit, et à quoi ressemblerait un bon résultat. Avant que la moindre solution soit nommée, on pèse le choix entre réutiliser ce qui existe déjà, acheter ou construire. Le problème, les options et le raisonnement se rejoignent dans une analyse de rentabilisation, le document qui justifie le service et alimente les demandes de financement ultérieures. L’analyse des options explique comment comparer ces choix, et l’approvisionnement couvre l’étape du regard avant l’achat.",
    bold: [{ phrase: "analyse de rentabilisation" }],
    internalLinks: [
      { phrase: "analyse des options", to: OPTIONS_ANALYSIS_PATH },
      { phrase: "approvisionnement", to: THREADS.procurement.path },
    ],
  },
  {
    title: "Trouver l’argent.",
    text: "Un ministère ne détient pas une seule cagnotte : un service fonctionne sur le budget que le ministère a déjà, sur de nouveaux fonds réservés dans un budget fédéral, ou sur des fonds déplacés d’une autre priorité. Une demande de dépense ne peut pas avancer tant que la source des fonds n’est pas confirmée. Le Financement explique d’où vient l’argent et comment un ministère en demande davantage.",
    bold: [{ phrase: "source des fonds" }],
    internalLinks: [{ phrase: "Financement", to: THREADS.funding.path }],
  },
  {
    title: "Le CEAI GC, l’examen de l’architecture.",
    text: "Pour un service numérique, la conception est examinée tôt, avant qu’une solution ou un fournisseur soit choisi, pour qu’elle puisse encore changer. Le comité d’examen de l’architecture du ministère la voit en premier, puis le Comité d’examen de l’architecture intégrée du GC (CEAI GC) vérifie que la conception est solide et cadre avec les normes pangouvernementales.",
    bold: [{ phrase: "tôt, avant qu’une solution ou un fournisseur soit choisi" }],
    externalLinks: [
      {
        phrase: "Comité d’examen de l’architecture intégrée du GC (CEAI GC)",
        linkKey: "guideline-service-digital",
      },
    ] satisfies ExternalPhraseLink[],
  },
  {
    title: "En établir le coût.",
    text: "Une estimation des coûts est établie pour toute la vie du service : sa mise en place (construit ou acheté), son exploitation, son soutien et son retrait à la fin. L’équipe des finances produit les chiffres, et une estimation précoce a le droit d’être approximative pourvu qu’elle dise à quel point. Le Financement couvre l’établissement des coûts.",
    bold: [{ phrase: "Une estimation des coûts" }],
    internalLinks: [{ phrase: "Financement", to: THREADS.funding.path }],
  },
  {
    title: "Obtenir le pouvoir : une présentation au Conseil du Trésor.",
    text: "Si le service exige de nouveaux fonds, un nouveau pouvoir comme un nouveau programme de subventions, ou une approbation au-delà de la limite du ministère, il va au Conseil du Trésor avec une présentation. Un service qui fonctionne sur un budget et un pouvoir existants saute cette étape. Le Financement couvre les cas où une présentation est nécessaire et ce qu’il faut préparer.",
    bold: [{ phrase: "submission" }],
    internalLinks: [{ phrase: "Financement", to: THREADS.funding.path }],
  },
  {
    title: "Obtenir l’approbation du projet.",
    text: "Le projet lui-même a besoin d’une approbation de projet pour aller de l’avant, avec le pouvoir de dépenser correspondant, énoncé dans la Directive sur la gestion des projets et des programmes.",
    bold: [{ phrase: "une approbation de projet" }],
    externalLinks: [
      {
        phrase: "Directive sur la gestion des projets et des programmes",
        linkKey: "tbs-directive-management-projects-programmes",
      },
    ] satisfies ExternalPhraseLink[],
  },
  {
    title: "Les fonds sont débloqués.",
    text: "Les fonds approuvés parviennent au ministère par les plans de dépenses annuels du gouvernement, le Budget des dépenses, que le Parlement vote. Comme l’argent est débloqué selon ce cycle annuel, une demande qui commence tard retarde le travail.",
    bold: [{ phrase: "le Parlement vote" }],
    externalLinks: [
      { phrase: "Budget des dépenses", linkKey: "lop-funding-new-government-initiatives" },
    ] satisfies ExternalPhraseLink[],
  },
  {
    title: "Acheter et construire.",
    text: "Une fois l’argent et les approbations en place, le ministère mène l’approvisionnement, et la livraison commence. La construction ou la configuration elle-même se déroule au fil des trois sous-phases ci-dessous. Tout cela relève encore de la Création : un service n’est pas en Exploitation avant son lancement, quelle que soit la part déjà construite.",
    bold: [{ phrase: "procurement" }],
    internalLinks: [{ phrase: "approvisionnement", to: THREADS.procurement.path }],
  },
] satisfies CreateSpineStage[];

export const SERVICE_APPROVAL_FUNDING_NOT_EVERY_STAGE =
  "Un petit changement payé à même des fonds qu’un ministère détient déjà saute la présentation au Conseil du Trésor. Un service sans construction numérique saute l’examen du CEAI GC. Un projet à l’intérieur de la limite du ministère saute l’approbation centrale du projet.";

export const createSpinePlainText = (stages: readonly CreateSpineStage[]) =>
  stages.map((stage) => `${stage.title} ${stage.text}`).join(" ");
