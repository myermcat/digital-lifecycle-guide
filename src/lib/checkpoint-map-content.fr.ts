import type { LucideIcon } from "lucide-react";
import {
  Accessibility,
  BarChart3,
  BookOpen,
  Bot,
  Briefcase,
  Building2,
  Layers,
  LayoutGrid,
  Lock,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import type { ExternalLinkKey } from "@/lib/external-links";
import { MATRIX_FAMILY_SECTIONS } from "@/lib/instrument-matrix";
import { CHECKPOINT_MAP_PATH } from "@/lib/reference-paths";

export type CheckpointMapWhoTag = "dept" | "central";

export type CheckpointMapBodyPart =
  | { type: "p"; text: string; bold?: readonly string[] }
  | { type: "ul"; items: readonly string[]; itemBold?: readonly string[] }
  | { type: "caution"; lead: string; text: string };

export type CheckpointMapCell = {
  /** Bold lead-in for the cell. */
  lead: string;
  body?: readonly CheckpointMapBodyPart[];
};

export type CheckpointMapResponse = CheckpointMapCell & {
  /** Empty for "Nothing yet." */
  tags: readonly CheckpointMapWhoTag[];
};

export type CheckpointMapStep = {
  n: number;
  action: CheckpointMapCell;
  response: CheckpointMapResponse;
};

export type CheckpointMapFork = {
  /** Bold opening phrase / title. */
  title: string;
  /** Rest of the fork body; may continue the title sentence. */
  text: string;
  bold?: readonly string[];
  /** Phrases rendered in the primary "checkpoint" weight. */
  checkpointPhrases?: readonly string[];
};

export type CheckpointMapPhaseBlock = {
  id: "discovery" | "alpha" | "beta" | "live" | "sunset";
  heading: string;
  /** Text inside the duration pill. */
  durationLabel: string;
  /** Rest of the phase note, after the pill. */
  phaseNote: string;
  /** Steps before any mid-phase fork. */
  steps: readonly CheckpointMapStep[];
  /** Fork that sits between steps (Discovery, after step 5). */
  forkAfter?: CheckpointMapFork;
  /** Steps after the mid-phase fork (Discovery 6-7). */
  stepsAfterFork?: readonly CheckpointMapStep[];
  /** Fork after all steps (Alpha bigger project, Beta automated decision). */
  forkEnd?: CheckpointMapFork;
  showLaunchAfter?: boolean;
};

export type CheckpointMapLink = {
  label: string;
  linkKey: ExternalLinkKey;
  icon: LucideIcon;
};

export type CheckpointMapGroup = {
  phaseLabel: string;
  links: readonly CheckpointMapLink[];
  entries: readonly { term: string; def: string }[];
};

export type CheckpointMapWhoEntry = { term: string; def: string };

/* ---------------------------------------------------------------------- */
/* Page-level constants                                                   */
/* ---------------------------------------------------------------------- */

export { CHECKPOINT_MAP_PATH };

export const CHECKPOINT_MAP_EYEBROW = "Voir le parcours complet";

export const CHECKPOINT_MAP_TITLE = "Les points de contrôle officiels d’un service numérique";

export const CHECKPOINT_MAP_SUBTITLE = {
  text: "Chaque point de contrôle officiel qu’un service numérique du gouvernement du Canada peut rencontrer, par sujet, avec ce qui l’amène dans la portée et ce que le responsable opérationnel doit personnellement faire à son égard. Une annexe énumère ce qui existe déjà et peut être réutilisé. Une deuxième suit un service fictif depuis le premier signe de difficulté jusqu’au jour où il est remplacé, rencontrant les points de contrôle dans l’ordre où ce service les a rencontrés.",
  bold: ["point de contrôle officiel"],
} as const;

export const CHECKPOINT_MAP_HOW_TO_USE = {
  heading: "Comment utiliser cette page",
  items: [
    {
      lead: "Pour savoir ce qui s’applique à votre service, lisez les tableaux.",
      body: "Il y a un tableau par sujet, et une rangée pour chaque instrument officiel qu’un service numérique du gouvernement du Canada peut rencontrer. Commencez par les sujets qui correspondent à ce que fait votre service, parcourez la colonne de la portée, et écartez ce qui ne vous concerne pas.",
    },
    {
      lead: "Pour saisir l’ordre et les personnes, lisez l’annexe B.",
      body: "Elle suit un service fictif depuis le premier signe de difficulté jusqu’au jour où il est remplacé, en montrant ce que sa directrice générale fait à chaque étape et qui répond. C’est un exemple travaillé d’un parcours à travers ces tableaux, et deux services n’empruntent jamais le même.",
    },
    {
      lead: "Pour bien comprendre un instrument en particulier, suivez-le jusqu’à sa page thématique.",
      body: "La sécurité, la protection de la vie privée, l’accessibilité et l’approvisionnement ont chacun leur propre page dans le guide, qui en explique le raisonnement. Cette page-ci est l’index; les pages thématiques portent l’explication.",
    },
  ],
} as const;

export const CHECKPOINT_MAP_VARIES = {
  heading: "Presque tout ici varie",
  paragraphs: [
    "Les points de contrôle eux-mêmes sont réels et sont énoncés dans des instruments du gouvernement du Canada. Presque tout ce qui les entoure, en revanche, n’est pas fixé. Ceux qui s’appliquent dépendent de ce que fait le service et de ce qui est dépensé. Qui préside un comité, quels sont les seuils d’un ministère, qui signe, et la façon dont chaque étape se déroule en pratique diffèrent d’un ministère à l’autre.",
    "Le calendrier est ce qui varie le plus. Rien ici ne dit combien de temps prend une étape, parce que cela dépend de la capacité du ministère, de la file devant vous, et de ce qui se passe d’autre cette année-là. Là où une durée est donnée, traitez-la comme l’expérience d’une seule équipe plutôt que comme un chiffre de planification, et confirmez-la auprès de votre propre ministère.",
    "L’ordre varie aussi. La séquence dans laquelle un service rencontre ces points de contrôle suit la voie qu’il emprunte : acheter un produit fini, mettre une équipe sous contrat, mener un approvisionnement agile et construire à l’interne les réarrangent tous, et certains disparaissent entièrement.",
  ],
} as const;

export const CHECKPOINT_MAP_JUMP = [
  { label: "Ce que couvre cette page", href: "#what-this-covers" },
  { label: "Comment utiliser cette page", href: "#how-to-use" },
  { label: "Presque tout ici varie", href: "#everything-varies" },
  { label: "Glossaire", href: "#thecheckpoints" },
  { label: "Chaque élément officiel", href: "#annex-instruments" },
  { label: "Annexe A : réutiliser d’abord", href: "#annex-reuse" },
  { label: "Annexe B : un exemple travaillé", href: "#annex-nadia" },
] as const;

/**
 * The section number for a heading, so the page and the rail agree.
 *
 * The rail is the only way to reach one topic on a page this long, and a rail
 * numbered 5.7 pointing at an unnumbered heading makes the reader count.
 */
export function checkpointMapSectionNumber(id: string): string {
  // The two appendices are named rather than numbered, on the page and in the
  // document, so the numbered run stops at the last ordinary section.
  if (id === "annex-reuse" || id === "annex-nadia") return "";
  const top = CHECKPOINT_MAP_JUMP.findIndex((item) => item.href === `#${id}`);
  if (top !== -1) return `${top + 1}.`;
  const sub = MATRIX_FAMILY_SECTIONS.findIndex((section) => section.id === id);
  if (sub === -1) return "";
  const parent = CHECKPOINT_MAP_JUMP.findIndex((item) => item.href === "#annex-instruments");
  return `${parent + 1}.${sub + 1}`;
}

/**
 * On-this-page rail items, with the twelve topic tables nested under the tables
 * section. The rail is the only way to reach one topic directly on a page this
 * long, so the nesting is worth the extra dozen lines.
 */
export const CHECKPOINT_MAP_ON_THIS_PAGE = CHECKPOINT_MAP_JUMP.flatMap((item) => {
  const id = item.href.slice(1);
  const number = checkpointMapSectionNumber(id);
  const parent = { id, label: number ? `${number} ${item.label}` : item.label };
  if (id !== "annex-instruments") return [parent];
  return [
    parent,
    ...MATRIX_FAMILY_SECTIONS.map((section) => ({
      id: section.id,
      label: `${checkpointMapSectionNumber(section.id)} ${section.family}`,
      depth: 1,
    })),
  ];
});

export const CHECKPOINT_MAP_TABLE_SECTION = {
  id: "annex-instruments",
  label: "LE TABLEAU",
  heading: "Chaque élément officiel qu’un service doit accomplir",
  intro:
    "Réparti en douze sujets pour qu’un lecteur puisse aller droit à ceux qui le concernent. Chaque sujet s’ouvre sur ce qui compte le plus à son égard, puis un tableau de ses instruments. Rien ici n’est propre à un ministère ou à un type de service.",
} as const;

export const CHECKPOINT_MAP_APPENDIX_REUSE = {
  id: "annex-reuse",
  label: "ANNEXE A",
  heading: "Réutiliser avant d’acheter ou de construire",
} as const;

export const CHECKPOINT_MAP_APPENDIX_PATH = {
  id: "annex-nadia",
  label: "ANNEXE B",
  heading: "Un exemple travaillé : le parcours d’un service, étape par étape",
  timelineNote:
    "C’est l’échéancier de Nadia, non un échéancier général. C’est ce qu’a vécu ce seul service fictif, et la Création en particulier peut être considérablement plus courte ou plus longue. Ne planifiez pas en fonction de lui.",
  intro:
    "Les tableaux ci-dessus disent ce qui existe. Cette annexe les met dans un ordre, en suivant un service fictif depuis le premier signe de difficulté jusqu’au jour où il est remplacé. Lisez-la pour la séquence, et pour savoir à qui Nadia doit parler à chaque point. Ce n’est pas une deuxième liste d’instruments.",
  pathNote:
    "Nadia a emprunté une voie, et les étapes ci-dessous sont dans l’ordre qu’a produit cette voie. Un ministère qui achète un produit fini, ou construit à l’interne, ou mène un approvisionnement agile, rencontre les mêmes points de contrôle dans un ordre différent. Même le moment de la signature du contrat se déplace d’une sous-phase entière selon la voie retenue : traitez donc les titres de sous-phase ici comme la séquence de ce service plutôt que comme la séquence.",
} as const;

export const CHECKPOINT_MAP_NADIA = {
  heading: "Voici Nadia, directrice générale",
  body: "Son programme de subventions a débordé de ses feuilles de calcul : elle achète donc un système de gestion des subventions. Son projet obtient une cote sous le seuil de son ministère : aucune présentation au Conseil du Trésor n’est donc nécessaire. Le CEAI GC est une question distincte : six déclencheurs y envoient un ministère et l’argent n’en est qu’un; son équipe vérifie donc les six pendant l’Alpha et aucun ne se déclenche. Les deux ensemble constituent le cas ordinaire, environ 95 % des projets. Là où un autre projet bifurquerait vers le haut est montré dans les encadrés ambrés.",
  bold: ["below", "six déclencheurs y envoient un ministère et l’argent n’en est qu’un"],
  amber: ["encadrés ambrés"],
} as const;

export const CHECKPOINT_MAP_WHY_GCS = {
  heading: "Pourquoi les S et C servent d’exemple",
  body: "Ce parcours est bâti autour d’un système de subventions et contributions parce que c’est un cas travaillé utile : il touche presque tous les points de contrôle à la fois — fonds publics, approvisionnement, autorisation de sécurité, renseignements personnels, documents, et une décision prise au sujet de personnes. Le guide dans son ensemble ne se limite pas aux S et C; n’importe quel service peut être cartographié selon le même parcours.",
} as const;

export const CHECKPOINT_MAP_WHY_CREATE = {
  heading: "Pourquoi la Création remplit l’essentiel de cette annexe",
  body: "Les points de contrôle officiels sont concentrés au début. Presque toutes les approbations, tous les examens et toutes les signatures officiels se produisent avant le lancement : la Création porte donc l’essentiel des étapes. L’Exploitation et le Retrait paraissent plus courts ici seulement parce que cette annexe suit les points de contrôle, et non parce qu’il y a moins de travail.",
} as const;

export const CHECKPOINT_MAP_WHAT_TABLE = {
  heading: "Ce que couvre cette page",
  body: "Les points de contrôle officiels seulement : les approbations, examens, signatures et obligations permanentes officiels qui découlent d’instruments du gouvernement du Canada. Chacun est accompagné de ce qu’il est, de ce qui l’amène dans la portée, et de ce que le responsable opérationnel doit personnellement faire. Il ne couvre pas comment faire le travail à l’intérieur de chaque étape, ce à quoi servent les pages de phase et de sous-phase. Lisez-le comme la liste à laquelle confronter votre propre service.",
  bold: ["les points de contrôle officiels seulement"],
} as const;

export const CHECKPOINT_MAP_COLKEY = {
  left: "À gauche, ce que fait Nadia.",
  right:
    "À droite, qui répond, et comment. L’étiquette de chaque réponse indique si le répondant relève de son ministère ou d’un organisme central.",
  rightTags: { dept: "son ministère", central: "organisme central" },
} as const;

export const CHECKPOINT_MAP_LAUNCH = {
  tag: "LANCEMENT",
  text: "Le service est mis en service ici. Tout ce qui précède relève de la Création (la construction); tout ce qui suit relève de l’Exploitation et du Retrait (l’exploiter, puis le retirer ou le remplacer).",
} as const;

export const CHECKPOINT_MAP_VARY_NOTE =
  "Les mécanismes et les échéanciers ministériels varient; confirmez auprès de votre propre ministère avant de traiter une étape comme fixe.";

export const CHECKPOINT_MAP_FOOTER_DISCLAIMER =
  "Nadia est fictive, et son programme aussi. Toute ressemblance avec des personnes ou des programmes réels est fortuite.";

/* ---------------------------------------------------------------------- */
/* Phase blocks (all 22 steps, forks, launch)                             */
/* ---------------------------------------------------------------------- */

export const CHECKPOINT_MAP_PHASES: readonly CheckpointMapPhaseBlock[] = [
  {
    id: "discovery",
    heading: "Création · Découverte — déterminer ce qui est nécessaire",
    durationLabel: "Typique : de quelques semaines à quelques mois · variable",
    phaseNote:
      "Financé à même le budget de fonctionnement existant du ministère. C’est ici que la voie se décide. Nadia a repéré un problème. La Découverte est le moment où elle détermine sa gravité, qui doit être mobilisé, et quelle voie le projet devrait emprunter.",
    steps: [
      {
        n: 1,
        action: {
          lead: "Remarque que le programme craque.",
          body: [
            {
              type: "p",
              text: "Les demandes ont doublé, son équipe n’arrive plus à suivre, les demandeurs ne peuvent rien suivre, et les vérificateurs ne peuvent pas valider les décisions. Elle décide que quelque chose doit changer.",
            },
          ],
        },
        response: {
          tags: [],
          lead: "Rien encore.",
          body: [
            {
              type: "p",
              text: "C’est à elle de soulever le problème. Ce que dit le guide : elle possède déjà un service numérique, qu’elle l’appelle ainsi ou non.",
            },
          ],
        },
      },
      {
        n: 2,
        action: {
          lead: "Appelle les services ministériels de son propre ministère.",
          body: [{ type: "p", text: 'Demande, simplement : « par où est-ce que je commence ? »' }],
        },
        response: {
          tags: ["dept"],
          lead: "Les services ministériels sont la porte d’entrée.",
          body: [
            {
              type: "p",
              text: "Les directions habilitantes la guident et l’orientent vers :",
            },
            {
              type: "ul",
              items: [
                "le bureau du DPI ou de la TI",
                "les finances",
                "l’approvisionnement",
                "la sécurité",
                "le bureau de la protection de la vie privée (AIPRP)",
                "la gestion des documents",
              ],
            },
            {
              type: "p",
              text: "Si quelque chose exige plus tard un organisme central, c’est son ministère qui l’y porte.",
            },
          ],
        },
      },
      {
        n: 3,
        action: {
          lead: "Réunit une petite équipe pour examiner la question.",
          body: [
            {
              type: "p",
              text: "Elle ne peut pas faire cela seule, et elle n’est pas censée le faire.",
            },
          ],
        },
        response: {
          tags: ["dept"],
          lead: "Quelques personnes, venues de deux endroits.",
          body: [
            {
              type: "p",
              text: "Certaines de son propre programme, qui connaissent le travail, et, par le bureau du DPI ou de la TI, un analyste opérationnel et souvent un gestionnaire de projet du bureau de gestion de projet du ministère. L’équipe est petite pendant la Découverte et grandit jusqu’à la Bêta à mesure que la construction et le personnel du fournisseur s’ajoutent. Nadia la parraine; elle ne fait pas elle-même le travail pratique.",
            },
          ],
        },
      },
      {
        n: 4,
        action: {
          lead: "Consigne le besoin et le fait inscrire au plan.",
          body: [
            {
              type: "p",
              text: "Un court exposé du problème et de ce qu’il faudrait à peu près, dans la forme que demande le processus d’admission des projets de son ministère.",
            },
          ],
        },
        response: {
          tags: ["dept"],
          lead: "Sa chaîne de gestion et l’équipe de planification du DPI.",
          body: [
            {
              type: "p",
              text: "Elles ajoutent l’initiative au plan ministériel et au plan d’investissement ministériel (approuvé par l’administrateur général). Elle y verse l’initiative; elle ne met pas ces plans à jour elle-même.",
              bold: ["plan ministériel", "plan d’investissement ministériel"],
            },
          ],
        },
      },
      {
        n: 5,
        action: {
          lead: "Fait dimensionner, coter en risque et chiffrer le projet.",
          body: [{ type: "p", text: "Quelle est vraiment son ampleur, et quel est son risque?" }],
        },
        response: {
          tags: ["dept"],
          lead: "Le bureau de gestion de projet ou d’investissement du ministère.",
          body: [
            {
              type: "p",
              text: "Il aide son équipe à remplir l’Évaluation de la complexité et des risques des projets (ECRP). L’organisation de cette démarche varie d’un ministère à l’autre.",
              bold: ["Évaluation de la complexité et des risques des projets (ECRP)"],
            },
            {
              type: "ul",
              items: [
                "l’administrateur général répond de l’exactitude de la cote",
                "cette cote est comparée à la classe de capacité de gestion de projet approuvée du ministère",
              ],
              itemBold: ["administrateur général", "classe de capacité de gestion de projet"],
            },
          ],
        },
      },
    ],
    forkAfter: {
      title: "Le choix qui décide de tout.",
      text: "Si le niveau de l’ECRP se situe à l’intérieur de la classe de capacité du ministère, le ministère approuve et finance le projet lui-même, ce qui est la voie de Nadia. S’il se situe au-dessus de la classe, ou si son coût dépasse la limite déléguée du ministère, le projet exige l’approbation du Conseil du Trésor, et cela signifie une présentation au Conseil du Trésor. C’est l’autre ~5 %, et cela peut ajouter de six à douze mois ou plus. Nadia est sous cette ligne. Un projet plus grand exigerait aussi une analyse de rentabilisation conceptuelle, un instrument distinct avec son propre seuil et ses propres examinateurs. Nadia est également sous ce plancher : l’exposé de l’étape 4 reste donc à l’intérieur du ministère et n’en est pas une. Le CEAI GC est encore une question distincte, une question d’architecture, et le bloc Alpha l’expose.",
      bold: ["within", "above"],
      checkpointPhrases: ["CEAI GC", "présentation au Conseil du Trésor"],
    },
    stepsAfterFork: [
      {
        n: 6,
        action: {
          lead: "Demande au bureau de la TI si quelque chose sur le rayon du GC fait déjà ce dont elle a besoin.",
          body: [
            {
              type: "p",
              text: "La réutilisation vient en premier dans la politique du GC. Ce n’est pas elle qui cherche; c’est elle qui décide.",
            },
          ],
        },
        response: {
          tags: ["dept", "central"],
          lead: "Le bureau du DPI ou de la TI fait la recherche.",
          body: [
            { type: "p", text: "Ils vérifient :" },
            {
              type: "ul",
              items: [
                "les architectures de référence du GC et le catalogue des solutions intégrées (sur le réseau du GC)",
                "la communauté de pratique de l’architecture intégrée",
                "Services partagés Canada",
              ],
              itemBold: [
                "architectures de référence du GC",
                "communauté de pratique de l’architecture intégrée",
              ],
            },
            {
              type: "p",
              text: "Si une option convient, Nadia l’adopte au lieu d’acheter.",
            },
          ],
        },
      },
      {
        n: 7,
        action: {
          lead: "Fait engager le budget de construction.",
          body: [
            {
              type: "p",
              text: "Un aperçu budgétaire. Il couvre le trajet d’ici au lancement.",
            },
          ],
        },
        response: {
          tags: ["dept"],
          lead: "Sa propre gouvernance, puisqu’elle est sous le seuil.",
          body: [
            {
              type: "p",
              text: "La gouvernance du ministère engage le budget pour aller de l’avant, à même les fonds existants et au titre de son pouvoir financier délégué. Aucune présentation au Conseil du Trésor. Cela couvre la Découverte, l’Alpha et la construction en Bêta.",
            },
            {
              type: "p",
              text: "Les fonds pour l’exploiter année après année (le budget de fonctionnement) sont autre chose : ils sont établis par le processus du Budget des dépenses une fois le service en Exploitation. Elle devrait signaler le coût de fonctionnement prévu dès maintenant, même si l’approbation officielle vient plus tard. Si le ministère n’a pas réfléchi au financement continu dès la Découverte, il est bien plus difficile de l’obtenir après le lancement.",
              bold: ["run"],
            },
            {
              type: "caution",
              lead: "Lacune courante :",
              text: "les équipes planifient soigneusement le coût de construction et traitent le budget de fonctionnement comme le problème de quelqu’un d’autre. Il ne l’est pas — si le financement d’exploitation n’est pas engagé en principe au début de la Bêta, le service risque d’être lancé sans plan pour la suite.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "alpha",
    heading: "Création · Alpha — éprouver l’idée, franchir l’examen d’architecture, et aller au marché",
    durationLabel: "Typique : de six à douze semaines · variable",
    phaseNote:
      "Un prototype n’exige aucun fournisseur : une esquisse sur papier ou dans Figma suffit à montrer aux fournisseurs ce qu’elle veut. L’achat commence ici aussi, parce qu’un concours s’étire sur des mois et que la Bêta s’ouvre avec la signature.",
    steps: [
      {
        n: 8,
        action: {
          lead: "Éprouve les hypothèses qui pourraient tuer le service, avant d’engager de l’argent réel.",
          body: [
            {
              type: "p",
              text: "Un prototype peu coûteux répond à un seul type de question : comment les gens se déplacent dans la conception. Les hypothèses les plus susceptibles de mettre fin au projet sont de l’autre type. Si la politique le permet, qui a le pouvoir légal de décider, si les données dont dépend le service existent, et si un autre ministère modifiera une étape dont il est responsable.",
            },
          ],
        },
        response: {
          tags: ["dept"],
          lead: "Un concepteur pour le prototype, et des gens de l’extérieur de l’équipe pour le reste.",
          body: [
            {
              type: "p",
              text: "Un concepteur (ou un collègue qui connaît Figma, ou un outil d’IA) construit avec elle un prototype cliquable, et cinq ou six personnes qui ressemblent à de vrais demandeurs l’essaient. Aucun contrat n’est nécessaire pour cela.",
            },
            {
              type: "p",
              text: "Les autres questions, elle ne peut pas y répondre de l’intérieur de son équipe. Elle porte la question du pouvoir à l’équipe des politiques de son secteur de programme et aux services juridiques du ministère, la question des données à qui possède le système d’où viendraient les données de subventions, et toute étape relevant d’un autre ministère à ce ministère. Aucune de ces démarches n’est un point de contrôle avec formulaire, et chacune peut mettre fin à l’idée.",
            },
          ],
        },
      },
      {
        n: 9,
        action: {
          lead: "Porte la conception à l’examen d’architecture.",
        },
        response: {
          tags: ["dept"],
          lead: "Le comité d’examen de l’architecture du ministère (CEAM).",
          body: [
            {
              type: "p",
              text: "Il examine la conception et confirme qu’elle cadre avec les normes d’architecture du GC. Son équipe vérifie aussi les déclencheurs du CEAI GC, et aucun ne la vise : elle est sous les seuils d’investissement et de capacité, elle n’utilise rien qui compte comme technologie émergente, elle n’a besoin d’aucune exception au titre de la directive, et le système fonctionnera sur un nuage public. L’examen d’architecture s’arrête ici.",
              bold: ["s’arrête ici"],
            },
            {
              type: "p",
              text: "La plupart des ministères ont leur propre comité et il n’existe aucune page nationale à ce sujet : l’équipe d’architecture du bureau du DPI est donc la porte d’entrée. Elle prépare la documentation et sait quand le comité siège.",
              bold: ["L’équipe d’architecture du bureau du DPI est la porte d’entrée"],
            },
          ],
        },
      },
      {
        n: 10,
        action: {
          lead: "Arrête les exigences et lance le concours.",
          body: [
            { type: "p", text: "Ce que le système doit faire :" },
            {
              type: "ul",
              items: [
                "un portail pour les demandeurs",
                "une file d’attente pour les évaluateurs",
                "une piste de vérification pour les finances",
                "des rapports pour le Parlement",
              ],
            },
            {
              type: "p",
              text: "Nadia rédige ou approuve les exigences, et la demande de soumissions est rédigée à partir d’elles : une ligne encore floue le jour de sa publication reste floue dans le contrat. Cela se déroule en parallèle du prototypage plutôt qu’après, parce que l’annonce, les soumissions et l’évaluation prennent des mois, et que la Bêta ne peut pas s’ouvrir tant que le contrat n’est pas prêt à signer.",
              bold: ["en parallèle du prototypage plutôt qu’après"],
            },
            {
              type: "p",
              text: "Deux des exigences relèvent de son jugement et sont les plus faciles à omettre : combien de temps le service de subventions peut être hors service avant qu’un préjudice réel commence, et quelle quantité de données il peut se permettre de perdre. Le spécialiste de la continuité des activités de son ministère les intègre à une analyse des répercussions sur les activités, qui détermine aussi si le service compte comme essentiel. Les deux chiffres changent l’architecture et la facture d’hébergement : ils appartiennent donc à la demande de soumissions et non à une conversation après l’achat de la construction.",
              bold: [
                "combien de temps le service de subventions peut être hors service",
                "quelle quantité de données il peut se permettre de perdre",
              ],
            },
          ],
        },
        response: {
          tags: ["dept"],
          lead: "L’autorité contractante mène les mécanismes.",
          body: [
            {
              type: "p",
              text: "Un agent d’approvisionnement de la direction des contrats du ministère (qui fait partie des services ministériels qu’elle a appelés à l’étape 2), ou Services publics et Approvisionnement Canada au-delà de la limite contractuelle du ministère. Ils :",
            },
            {
              type: "ul",
              items: [
                "conseillent sur le véhicule d’approvisionnement à utiliser (offre à commandes, arrangement en matière d’approvisionnement, appel d’offres ouvert)",
                "rédigent les documents de la demande de soumissions et publient le concours, avec les clauses d’accessibilité et les exigences de sécurité déjà réglées pour qu’elles y figurent dès le départ",
                "si le fournisseur traitera de l’information protégée, amorcent maintenant le filtrage du Programme de sécurité des contrats (SPAC), parce que les attestations du personnel et de l’organisation prennent souvent plus de temps que le concours lui-même",
              ],
              itemBold: ["Programme de sécurité des contrats"],
            },
          ],
        },
      },
    ],
    forkEnd: {
      title: "Si l’un des déclencheurs était atteint",
      text: ", le DPI du ministère le porterait au CEAI GC, le Comité d’examen de l’architecture intégrée du gouvernement du Canada. Six déclencheurs y envoient un ministère et un seul suffit; le tableau ci-dessus les énumère tous les six. Les cinq qui n’ont rien à voir avec l’argent sont ceux que les équipes manquent, parce qu’une petite initiative peut être visée par les seules technologies émergentes ou l’hébergement. C’est le ministère qui présente, et l’équipe d’architecture du DPI prépare la documentation, l’équipe de projet assistant habituellement pour la présenter.",
      bold: ["department"],
      checkpointPhrases: ["CEAI GC"],
    },
  },
  {
    id: "beta",
    heading: "Création · Bêta — l’acheter, le sécuriser, et le prouver",
    durationLabel: "Typique : plusieurs mois · variable",
    phaseNote:
      "La signature, l’autorisation de sécurité et l’évaluation de la protection de la vie privée tombent toutes ici. Le concours lui-même s’est déroulé pendant l’Alpha, parce qu’un appel d’offres concurrentiel complet prend souvent quelques mois et que la Bêta les passerait autrement à attendre.",
    steps: [
      {
        n: 11,
        action: {
          lead: "Aide à choisir le fournisseur, et le contrat est signé.",
          body: [
            {
              type: "p",
              text: "Le concours s’est déroulé pendant l’Alpha : ce qui aboutit ici en est la fin. Nadia siège au comité d’évaluation lorsque les soumissions sont cotées (souvent à titre de présidente) et entérine le choix final du fournisseur. Elle ne mène pas le concours et elle ne signe pas, mais elle est dans la salle quand le fournisseur est choisi.",
              bold: ["Le concours s’est déroulé pendant l’Alpha"],
            },
          ],
        },
        response: {
          tags: ["dept"],
          lead: "L’autorité contractante adjuge et signe.",
          body: [
            {
              type: "p",
              text: "Le même agent d’approvisionnement, ou Services publics et Approvisionnement Canada au-delà de la limite contractuelle du ministère. Ils :",
            },
            {
              type: "ul",
              items: [
                "gèrent le processus d’évaluation et adjugent le contrat au titre de la Directive sur la gestion de l’approvisionnement; c’est l’autorité contractante qui signe, non Nadia",
                "confirment avant l’adjudication que le soumissionnaire retenu détient les attestations du personnel et de l’organisation qu’exige le Programme de sécurité des contrats, et annexent au contrat la Liste de vérification des exigences relatives à la sécurité approuvée",
              ],
              itemBold: ["Directive sur la gestion de l’approvisionnement", "Programme de sécurité des contrats"],
            },
            {
              type: "p",
              text: "La signature est le moment où le ministère a le plus de marge de négociation, parce que rien n’est encore engagé. Les droits de sortie, la portabilité des données, la date de fin et les clauses d’accessibilité se gagnent ici ou pas du tout.",
            },
          ],
        },
      },
      {
        n: 12,
        action: {
          lead: "Exige un rapport d’accessibilité du fournisseur, et le vérifie.",
        },
        response: {
          tags: ["dept"],
          lead: "Le fournisseur fournit un rapport de conformité en matière d’accessibilité.",
          body: [
            {
              type: "p",
              text: "Il porte sur une version précise du produit, testée au regard de la norme EN 301 549, qui comprend le niveau AA des WCAG 2.1.",
              bold: ["version"],
            },
            {
              type: "caution",
              lead: "Mise en garde :",
              text: "dans l’histoire, le rapport portait sur une version antérieure, et la version réellement déployée n’a jamais été revérifiée.",
            },
          ],
        },
      },
      {
        n: 13,
        action: {
          lead: "Fait autoriser le système à fonctionner en production.",
        },
        response: {
          tags: ["dept"],
          lead: "L’équipe de sécurité de la TI, puis un cadre supérieur.",
          body: [
            {
              type: "p",
              text: "L’équipe de sécurité mène l’évaluation et autorisation de sécurité et transmet le risque résiduel de sécurité de la TI (cybersécurité) à l’autorité approbatrice du programme. Cette autorité approbatrice signe l’autorisation d’exploiter, acceptant le risque, au titre de la Politique sur la sécurité du gouvernement, de sa Directive sur la gestion de la sécurité, et de l’ITSG-33. Pour un service qui vit à l’intérieur d’un seul ministère, l’autorité approbatrice est normalement le responsable opérationnel : Nadia signe la sienne.",
              bold: [
                "évaluation et autorisation de sécurité",
                "autorisation d’exploiter",
                "Nadia signe la sienne",
              ],
            },
            {
              type: "p",
              text: "Ce qu’elle signe s’appuie sur l’Évaluation de la menace et des risques, et celle-ci ne commence pas ici. Des passages antérieurs se font contre la conception dès l’Alpha, pendant qu’elle peut encore changer, et le dernier passage se fait contre le système réellement construit. Aucun rapport autonome n’est exigé. Les résultats entrent dans les documents de conception puis dans l’évaluation du risque résiduel à l’intérieur du dossier d’autorisation : c’est donc ce dossier qu’elle lit. L’autorisation d’exploiter est ce qui impose le travail, parce que sans l’évaluation elle n’a rien à accepter.",
              bold: [
                "Évaluation de la menace et des risques",
                "Elle ne commence pas ici.",
                "Aucun rapport autonome n’est exigé.",
              ],
            },
          ],
        },
      },
      {
        n: 14,
        action: {
          lead: "Traite les renseignements personnels que le service détiendra.",
        },
        response: {
          tags: ["dept", "central"],
          lead: "Le secteur de programme, avec le bureau de l’AIPRP ou de la protection de la vie privée.",
          body: [
            {
              type: "p",
              text: "Comme le système de subventions traite des renseignements personnels, le programme remplit l’évaluation des facteurs relatifs à la vie privée, avec l’appui du bureau de l’AIPRP; elle est transmise au Commissariat à la protection de la vie privée et au SCT avant le lancement; le fichier de renseignements personnels est inscrit dans la liste Info Source du ministère.",
              bold: [
                "évaluation des facteurs relatifs à la vie privée",
                "Commissariat à la protection de la vie privée",
                "fichier de renseignements personnels",
              ],
            },
          ],
        },
      },
      {
        n: 15,
        action: {
          lead: "Le prouve avec de vrais utilisateurs, puis lance.",
        },
        response: {
          tags: ["dept"],
          lead: "Une bêta privée, puis une bêta publique.",
          body: [
            {
              type: "p",
              text: "Un petit groupe invité utilise d’abord le vrai service (bêta privée), puis il s’ouvre à tous (bêta publique), l’ancien processus continuant de fonctionner jusqu’à ce que le nouveau soit véritablement en service.",
            },
            {
              type: "caution",
              lead: "Avant le lancement, confirmer le budget de fonctionnement.",
              text: "Les fonds pour exploiter le service année après année (signalés dès la Découverte) doivent être engagés en principe à ce stade, par la gouvernance du ministère. Un service lancé sans cela peut entrer en service sans aucun plan pour le maintenir en fonction.",
            },
          ],
        },
      },
    ],
    forkEnd: {
      title: "Si le système automatisait une décision.",
      text: 'Les évaluateurs de Nadia décident à la main : ce point de contrôle ne s’applique donc pas à elle. Mais si le système de subventions notait, classait ou approuvait automatiquement les demandes, la Directive sur la prise de décisions automatisée s’appliquerait. L’évaluation de l’incidence algorithmique devrait alors être remplie, approuvée et publiée sur le Portail du gouvernement ouvert avant que le système entre en production, avec un avis aux demandeurs, une voie d’appel, et une supervision humaine proportionnée au niveau d’incidence. À partir du niveau d’incidence deux, un examen par les pairs est aussi exigé, et ses constats publiés avant le lancement. Bon à savoir, parce qu’une fonction d’« efficience » ajoutée plus tard peut déclencher tout cela sans que personne ne le remarque.',
      bold: ["Directive sur la prise de décisions automatisée"],
      checkpointPhrases: ["évaluation de l’incidence algorithmique"],
    },
    showLaunchAfter: true,
  },
  {
    id: "live",
    heading: "Exploitation — l’exploiter, et l’inscrire aux registres",
    durationLabel: "Continu, pendant des années · variable",
    phaseNote:
      "L’Exploitation est présentée ici comme une seule section parce qu’elle comporte très peu de points de contrôle officiels, bien moins que la Création. Elle a ses propres sous-phases dans le guide, et les étapes ci-dessous couvrent ce qu’elles exigent. Le dépôt le plus facile à oublier est l’inscription du service aux registres officiels. Ajouter une fonctionnalité importante peut aussi ramener des points de contrôle antérieurs.",
    steps: [
      {
        n: 16,
        action: {
          lead: "Clôt le projet, et rend compte de ce qu’il a livré.",
        },
        response: {
          tags: ["dept"],
          lead: "Le parrain du projet, par la gouvernance de projet du ministère.",
          body: [
            {
              type: "p",
              text: "Le projet financé se termine par une clôture : le ministère confirme ce qui a été livré, libère ce qu’il reste du budget, et fait le suivi de l’arrivée des avantages promis, la réalisation des avantages nommée au moment où le ministère a engagé le financement. La Directive sur la gestion des projets et des programmes établit l’obligation; Nadia fournit le relevé de livraison, et le bureau de projet le dépose.",
              bold: ["close-out", "réalisation des avantages"],
            },
          ],
        },
      },
      {
        n: 17,
        action: {
          lead: "Fait inscrire le service en fonction aux registres officiels.",
        },
        response: {
          tags: ["dept"],
          lead: "Le bureau de la gestion des services ou du DPI l’inscrit.",
          body: [
            {
              type: "p",
              text: "Elle fournit les détails; ils inscrivent le service au Répertoire des services du GC et cotent l’application dans la gestion du portefeuille d’applications. Elle verse l’information; c’est le bureau du DPI qui procède à l’inscription.",
              bold: ["Répertoire des services du GC", "gestion du portefeuille d’applications"],
            },
          ],
        },
      },
      {
        n: 18,
        action: {
          lead: "Le garde en fonction et l’améliore.",
          body: [
            { type: "p", text: "L’Exploitation comporte trois types de travail continu :" },
            {
              type: "ul",
              items: [
                "Stabiliser (juste après le lancement) : corriger les défauts, intervenir sur les incidents, ajuster le rendement",
                "Croître : ajouter des fonctionnalités et améliorer le service à mesure que les besoins des utilisateurs évoluent",
                "Maturité (récurrent) : le surveiller et le corriger; renouveler le financement avant son expiration; tenir à jour les tests d’accessibilité, qui alimentent la déclaration d’accessibilité du ministère (exigée à partir de décembre 2027); mettre à jour l’évaluation de la protection de la vie privée à mesure que le service change; gérer le fournisseur",
              ],
              itemBold: ["Stabiliser (juste après le lancement) :", "Grow:", "Maturité (récurrent) :"],
            },
          ],
        },
        response: {
          tags: ["dept"],
          lead: "L’équipe d’exploitation, la sécurité, l’AIPRP et les finances, selon un cycle récurrent.",
          body: [
            {
              type: "p",
              text: 'Chacun porte sa part aussi longtemps que le service est utilisé. L’argent pour l’exploiter vient du budget de fonctionnement du ministère lui-même (ses niveaux de référence), fixé chaque année par le Budget des dépenses. Si le financement d’origine était à durée limitée (une clause de « temporisation »), il doit être renouvelé par une nouvelle décision de financement avant son expiration, et ce délai est facile à sous-estimer.',
            },
            {
              type: "p",
              text: "Ajouter une fonctionnalité importante peut ramener des points de contrôle antérieurs : une fonctionnalité qui traite des renseignements personnels peut exiger une évaluation des facteurs relatifs à la vie privée mise à jour; automatiser une décision déclenche une évaluation de l’incidence algorithmique; les changements architecturaux majeurs retournent au CEAM; une capacité nouvelle ou élargie peut exiger une modification de contrat ou un nouvel approvisionnement.",
            },
            {
              type: "caution",
              lead: "Mise en garde :",
              text: "dans l’histoire, le lancement a été traité comme la ligne d’arrivée : personne n’était clairement responsable du service en exploitation et la fin du contrat n’a pas été planifiée. Quand le terme de trois ans est arrivé, aucun budget n’avait été mis de côté et il ne restait aucun délai pour remettre en concurrence ou renouveler.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "sunset",
    heading: "Retrait — le retirer ou le remplacer, et rendre compte des données",
    durationLabel: "Typique : des mois · variable",
    phaseNote:
      "Moins de points de contrôle que la Création, mais deux sont stricts : les documents ne peuvent pas être détruits sans le consentement écrit de Bibliothèque et Archives Canada, et l’autorisation de sécurité doit être close, non simplement éteinte.",
    steps: [
      {
        n: 19,
        action: {
          lead: "Décide que le service doit disparaître.",
          body: [
            {
              type: "p",
              text: "Un meilleur système le remplacera, ou le programme se termine. Planifie la sortie avant que l’argent et le contrat s’épuisent.",
            },
          ],
        },
        response: {
          tags: ["dept"],
          lead: "La même gouvernance ministérielle qui l’a approuvé, plus les finances.",
          body: [
            {
              type: "p",
              text: "Retirer ou remplacer un service est un projet en soi, avec son propre financement de sortie, non quelque chose qui arrive simplement quand le contrat expire.",
            },
          ],
        },
      },
      {
        n: 20,
        action: {
          lead: "Détermine ce qu’il advient des documents et des données.",
        },
        response: {
          tags: ["dept", "central"],
          lead: "Le bureau de la gestion de l’information confirme l’autorisation de disposition.",
          body: [
            {
              type: "p",
              text: "En vertu de la Loi sur la Bibliothèque et les Archives du Canada, aucun document gouvernemental ne peut être détruit sans le consentement écrit du bibliothécaire et archiviste. Chaque document est :",
              bold: ["Loi sur la Bibliothèque et les Archives du Canada", "bibliothécaire et archiviste"],
            },
            {
              type: "ul",
              items: [
                "conservé",
                "transféré à Bibliothèque et Archives Canada",
                "ou détruit selon le calendrier",
              ],
              itemBold: ["Bibliothèque et Archives Canada"],
            },
            { type: "p", text: "C’est le véritable point de contrôle du Retrait." },
          ],
        },
      },
      {
        n: 21,
        action: {
          lead: "Transfère ou élimine les données.",
        },
        response: {
          tags: ["dept"],
          lead: "Migrer si remplacé; éliminer si retiré.",
          body: [
            {
              type: "p",
              text: "Si le service est remplacé, les données sont nettoyées, migrées vers le nouveau système avec leur sens intact, et vérifiées avant que l’ancien système soit éteint. S’il est retiré, les renseignements personnels sont éliminés selon leur calendrier de conservation et le fichier de renseignements personnels est fermé dans Info Source.",
              bold: ["replaced", "retired", "fichier de renseignements personnels"],
            },
          ],
        },
      },
      {
        n: 22,
        action: {
          lead: "Éteint proprement l’ancien système.",
        },
        response: {
          tags: ["dept"],
          lead: "L’autorité approbatrice, la sécurité, les contrats et le bureau de la gestion des services closent chacun leur part.",
          body: [
            {
              type: "p",
              text: "L’autorité approbatrice qui a signé l’autorisation d’exploiter y met officiellement fin, et l’équipe de sécurité de la TI efface de façon sécuritaire le stockage démantelé; l’autorité contractante clôt le contrat; le bureau de la gestion des services met à jour le Répertoire des services du GC et la gestion du portefeuille d’applications pour indiquer que le service est retiré.",
              bold: [
                "autorisation d’exploiter",
                "Répertoire des services du GC",
                "gestion du portefeuille d’applications",
              ],
            },
          ],
        },
      },
    ],
  },
];

/* ---------------------------------------------------------------------- */
/* Who's who                                                              */
/* ---------------------------------------------------------------------- */

export const CHECKPOINT_MAP_WHO_TITLE = "Les personnes de ce parcours";

export const CHECKPOINT_MAP_WHO_CAPTION =
  "Celles auxquelles les étapes ci-dessous renvoient constamment. Une ligne chacune, parce que ce que l’une d’elles fait à l’égard d’un instrument donné se trouve dans la rangée de cet instrument.";

export const CHECKPOINT_MAP_WHO: readonly CheckpointMapWhoEntry[] = [
  {
    term: "Les utilisateurs",
    def: "Les personnes à qui le service est destiné, à l’intérieur ou à l’extérieur du gouvernement, présentes à chaque étape, de la recherche au soutien.",
  },
  {
    term: "Responsable opérationnel de l’application",
    def: "Comptable du service avant même son existence et jusqu’après son extinction, et rejoint tous les autres ici par les services ministériels.",
  },
  {
    term: "Services ministériels",
    def: "Les directions habilitantes du ministère : le bureau du DPI ou de la TI, les finances, l’approvisionnement, la sécurité, la protection de la vie privée, les documents. Le premier arrêt pour tout.",
  },
  {
    term: "Bureau de gestion de projet du ministère",
    def: "Aide à coter et à chiffrer le projet et à trouver un gestionnaire de projet. Son organisation varie; l’administrateur général répond de la cote.",
  },
  {
    term: "CEAM",
    def: "Comité d’examen de l’architecture du ministère. À l’intérieur du ministère, présidé par son DPI, et il examine la conception.",
  },
  {
    term: "CEAI GC",
    def: "Comité d’examen de l’architecture intégrée du gouvernement du Canada. Pangouvernemental, et réservé aux projets vastes ou complexes.",
  },
  {
    term: "Autorité contractante",
    def: "L’agent d’approvisionnement qui mène le concours et signe le contrat. Jamais le responsable opérationnel.",
  },
  {
    term: "Autorité approbatrice",
    def: "Le cadre supérieur qui signe l’autorisation d’exploiter et accepte le risque de sécurité qui subsiste.",
  },
  {
    term: "Bureau de l’AIPRP ou de la protection de la vie privée",
    def: "Appuie l’évaluation de la protection de la vie privée et les inscriptions qui la suivent. Le secteur de programme demeure propriétaire de l’évaluation.",
  },
  {
    term: "Fonction de gestion des services",
    def: "Quiconque est responsable du répertoire des services dans votre ministère, sous quelque nom que ce soit. Inscrit le service et le met à jour à son retrait.",
  },
  {
    term: "Bureau de la gestion de l’information",
    def: "Détient les autorisations de disposition. Les documents ne peuvent pas être détruits sans le consentement écrit de Bibliothèque et Archives Canada.",
  },
];

export const CHECKPOINT_MAP_TERMS_TITLE = "Glossaire";

export const CHECKPOINT_MAP_TERMS_CAPTION =
  "Quatre éléments que les tableaux nomment sans leur consacrer une rangée.";

export const CHECKPOINT_MAP_TERMS: readonly CheckpointMapWhoEntry[] = [
  {
    term: "Plan d’investissement ministériel",
    def: "La liste des investissements prévus du ministère, approuvée par l’administrateur général. Un projet doit y figurer avant de pouvoir aller de l’avant.",
  },
  {
    term: "Classe de capacité (ECOGP)",
    def: "La capacité de gestion de projet approuvée du ministère, établie par une Évaluation de la capacité organisationnelle de gestion de projet. Si le niveau de l’ECRP la dépasse, ou si la valeur du projet excède la limite déléguée du ministère, le projet exige l’approbation du Conseil du Trésor.",
  },
  {
    term: "Programme de sécurité des contrats",
    def: "Le filtrage par SPAC de l’organisation et du personnel du fournisseur lorsque le contrat porte sur de l’information protégée ou classifiée.",
  },
  {
    term: "Fichier de renseignements personnels",
    def: "La description inscrite des renseignements personnels que détient le service, publiée dans la liste Info Source du ministère. Créé en même temps que l’évaluation des facteurs relatifs à la vie privée.",
  },
];
