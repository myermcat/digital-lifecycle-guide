/**
 * TRANSITORY WORKING MATERIAL. Not part of the guide's published structure.
 *
 * Every official Government of Canada instrument a digital service meets, mapped
 * to the sub-phase where something has to happen to it, with what has to be done,
 * who does it, who submits it, and whether it applies to every service.
 *
 * Sources: the research pass recorded in
 * `TBS (Claude Output)/Worklists/Official_Instruments_Research_2026-08-05.md`.
 * Facts here survived an adversarial verification round unless flagged otherwise.
 *
 * Placement of an instrument in a sub-phase is EDITORIAL. No Government of Canada
 * instrument uses Discovery / Alpha / Beta / Stabilization / Growth / Maturity /
 * Sunset. Each placement is anchored on a real deadline or trigger in the source,
 * and where it is judgement the note says so.
 *
 * CURRENCY RULES. Three instruments moved and must never be cited as current:
 *  - Standard on Web Accessibility: rescinded 2 March 2026, with the Guideline on
 *    Making Information Technology Usable by All. Cite the Accessible Canada
 *    Regulations and CAN/ASC-EN 301 549 instead.
 *  - Directive on the Management of Communications (2016) and the Procedures for
 *    Publishing (2013): replaced 27 March 2025 by the Directive on the Management
 *    of Communications and Federal Identity. Its Appendix D replaced the Mandatory
 *    Procedures for Social Media and Web Communications.
 *  - ITSG-33 Annexes 3A and 4A: superseded spring 2026 by ITSP.10.033 and
 *    ITSP.10.033-01. Annexes 1 and 2 remain valid.
 *
 * Also rescinded 9 October 2024: the stand-alone Directive on Privacy Impact
 * Assessment. The live instrument is Appendix C of the Directive on Privacy
 * Practices.
 *
 * And archived 28 June 2019: the stand-alone Standard on Identity and Credential
 * Assurance. The live version is Appendix A of the Directive on Identity
 * Management. Same pattern as the privacy one: the standard did not disappear, it
 * moved inside its directive, so cite the appendix.
 */

import type { LucideIcon } from "lucide-react";
import {
  Accessibility,
  Archive,
  BookOpen,
  Cloud,
  FileSignature,
  Globe,
  KeyRound,
  Landmark,
  Languages,
  Lock,
  ShieldCheck,
  Siren,
} from "lucide-react";
import type { ExternalLinkKey } from "@/lib/external-links";

export type MatrixSubPhase =
  | "discovery"
  | "alpha"
  | "beta"
  | "stabilization"
  | "growth"
  | "maturity"
  | "sunset";

/** What kind of thing an instrument is, so a reader knows what to expect of it. */
export type MatrixKind =
  | "assessment"
  | "authorization"
  | "review"
  | "submission"
  | "register"
  | "plan"
  | "duty"
  | "filing";

export const MATRIX_KINDS: Record<MatrixKind, { label: string; gloss: string }> = {
  assessment: {
    label: "Évaluation",
    gloss: "Un travail qui se termine par un jugement : quelle gravité, quelle probabilité, quelle criticité.",
  },
  authorization: {
    label: "Autorisation",
    gloss: "L’autorisation d’aller de l’avant, signée par une personne nommée qui accepte le risque.",
  },
  review: {
    label: "Examen",
    gloss: "Un comité ou un conseil examine le travail et décide.",
  },
  submission: {
    label: "Présentation",
    gloss: "Un document transmis vers le haut pour décision, habituellement au sujet de fonds ou de pouvoirs.",
  },
  register: {
    label: "Inscrire",
    gloss: "Un registre où le service est inscrit et tenu à jour.",
  },
  plan: {
    label: "Plan",
    gloss: "Des dispositions consignées d’avance et mises à l’essai.",
  },
  duty: {
    label: "Obligation permanente",
    gloss: "Une norme que le service doit respecter tant qu’il fonctionne.",
  },
  filing: {
    label: "Déclaration",
    gloss: "Quelque chose qui est transmis ou publié, selon un cycle ou déclenché par un événement.",
  },
};

export type MatrixAction = "check" | "gather" | "fill" | "sign" | "submit" | "keep" | "close";

export const MATRIX_ACTIONS: Record<
  MatrixAction,
  { label: string; gloss: string; className: string }
> = {
  check: {
    label: "Vérifier",
    gloss: "Déterminer si cela s’applique au service.",
    className:
      "bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-800/70",
  },
  gather: {
    label: "Rassembler",
    gloss:
      "Transmettre le jugement opérationnel que seule l’équipe du service détient. Quelqu’un d’autre le met par écrit.",
    className:
      "bg-teal-100 text-teal-900 border-teal-300 dark:bg-teal-950 dark:text-teal-200 dark:border-teal-800/70",
  },
  fill: {
    label: "Remplir",
    gloss: "La chose est réellement produite.",
    className:
      "bg-violet-100 text-violet-900 border-violet-300 dark:bg-violet-950 dark:text-violet-200 dark:border-violet-800/70",
  },
  sign: {
    label: "Signer ou accepter",
    gloss:
      "Une personne nommée y appose son nom, ou reçoit le résultat de quelqu’un d’autre et décide quoi en faire.",
    className:
      "bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950 dark:text-rose-200 dark:border-rose-800/70",
  },
  submit: {
    label: "Soumettre",
    gloss: "Transmis, déposé, inscrit ou publié là où la règle l’exige.",
    className:
      "bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-200 dark:border-emerald-800/70",
  },
  keep: {
    label: "Tenir à jour",
    gloss:
      "Le service a changé, ou l’échéance est arrivée. Le refaire, le retester, ou actualiser le dossier.",
    className:
      "bg-sky-100 text-sky-900 border-sky-300 dark:bg-sky-950 dark:text-sky-200 dark:border-sky-800/70",
  },
  close: {
    label: "Clore",
    gloss: "Officiellement terminé, éliminé, ou marqué comme retiré.",
    className:
      "bg-stone-200 text-stone-800 border-stone-400 dark:bg-stone-800 dark:text-stone-200 dark:border-stone-600",
  },
};

export const MATRIX_SUBPHASES: {
  key: MatrixSubPhase;
  label: string;
  /* An internal grouping key, never shown, so it stays in English as in the source. */
  phase: "Create" | "Live" | "Sunset";
}[] = [
  { key: "discovery", label: "Découverte", phase: "Create" },
  { key: "alpha", label: "Alpha", phase: "Create" },
  { key: "beta", label: "Bêta", phase: "Create" },
  { key: "stabilization", label: "Stabilisation", phase: "Live" },
  { key: "growth", label: "Croissance", phase: "Live" },
  { key: "maturity", label: "Maturité", phase: "Live" },
  { key: "sunset", label: "Retrait", phase: "Sunset" },
];

export type MatrixCell = {
  tags: MatrixAction[];
  note: string;
};

export type MatrixInstrument = {
  name: string;
  acronym?: string;
  /** Plain definition for someone who has never heard of it. */
  whatItIs: string;
  family: string;
  kind: MatrixKind;
  /** true when it applies to every service with no threshold. */
  everyService: boolean;
  /** What brings it into scope. For universal ones, the scope statement. */
  scope: string;
  /** What the business owner personally does, and where the input comes from. */
  ownerDoes: string;
  whoDoes: string;
  whereItEndsUp: string;
  linkKey?: ExternalLinkKey;
  /** Further official homes for this instrument, shown when the row is opened. */
  moreLinks?: readonly ExternalLinkKey[];
  /** Phrases in ownerDoes to bold, so the column can be skimmed for the verb. */
  ownerBold?: readonly string[];
  /** Phrases in whoDoes to bold, so the column can be skimmed for the actor. */
  whoBold?: readonly string[];
  /** Thread pages that own this instrument's subject. Never rendered in the table. */
  threads?: readonly string[];
  /**
   * Reader-facing caution about the instrument itself: it moved, it was replaced,
   * or something about it cannot be seen from outside the GC network.
   */
  caveat?: string;
  cells: Partial<Record<MatrixSubPhase, MatrixCell>>;
};

export const MATRIX_FAMILIES = [
  "Sécurité",
  "Continuité et incidents",
  "Vie privée et décisions automatisées",
  "Accessibilité",
  "Langues officielles",
  "Approbations et financement",
  "Contrats et fournisseurs",
  "Hébergement et infonuagique",
  "Identité et ouverture de session",
  "Publication sur canada.ca",
  "Registres et documents",
  "Accès à l’information et transparence",
] as const;

/**
 * One section per family, so each topic is its own table with its own anchor.
 *
 * The intro is the only place on this page that is allowed to say something the
 * table does not: the order the work runs in, the thing teams get wrong, the
 * cost of being late. Anything that belongs in a cell goes in the cell.
 */
export const MATRIX_FAMILY_SECTIONS: readonly {
  family: (typeof MATRIX_FAMILIES)[number];
  id: string;
  icon: LucideIcon;
  intro: string;
  /** A phrase in the intro that links to a thread page. */
  introLink?: { phrase: string; to: string };
}[] = [
  {
    family: "Sécurité",
    id: "topic-security",
    icon: ShieldCheck,
    intro:
      "Ces quatre éléments se suivent dans l’ordre, et chacun alimente le suivant. La catégorisation détermine l’ampleur de l’ensemble de contrôles de sécurité requis. L’évaluation de la menace et des risques examine ce qui pourrait encore mal tourner une fois ces contrôles en place. L’autorisation d’exploiter est la signature qui permet au service de fonctionner en production, et pour un service qui vit à l’intérieur d’un seul ministère, la personne qui la signe est habituellement le responsable opérationnel.",
  },
  {
    family: "Continuité et incidents",
    id: "topic-continuity",
    icon: Siren,
    intro:
      "Il s’agit ici de savoir combien de temps le service peut être indisponible avant que cela porte à conséquence, et qui est prévenu quand quelque chose tourne mal. La question mérite d’être posée pour chaque service, parce que la réponse détermine si le reste s’applique. L’exigence officielle d’une analyse des répercussions sur les activités est plus étroite : elle vise les services qui soutiennent quelque chose d’essentiel à la santé, à la sécurité ou au bien-être économique des Canadiens, ou au fonctionnement du gouvernement. Un plan de continuité ne suit que là où l’analyse marque le service comme essentiel. Les chiffres de rétablissement méritent d’être fixés tôt, parce qu’une limite de quatre heures et une limite de deux semaines mènent à des conceptions et à des coûts différents.",
  },
  {
    family: "Vie privée et décisions automatisées",
    id: "topic-privacy",
    icon: Lock,
    intro:
      "La liste de vérification vient d’abord, et elle vaut la peine d’être remplie même quand la réponse est qu’aucune évaluation n’est nécessaire, parce que l’avoir demandé fait partie de l’exigence. Le volet des décisions automatisées ne s’applique que si le service tranche quelque chose au sujet d’une personne sans que quelqu’un prenne la décision, y compris la cotation et le classement. Un service peut acquérir cette caractéristique plus tard, quand une fonctionnalité est ajoutée pour gagner du temps : il vaut donc la peine de revérifier chaque fois que le service change.",
  },
  {
    family: "Accessibilité",
    id: "topic-accessibility",
    icon: Accessibility,
    intro:
      "Deux obligations connexes. Le rapport de conformité d’un fournisseur n’existe que si vous achetez quelque chose, et il décrit une seule version de son produit. La conformité du ministère lui-même porte sur le service tel que les gens le rencontrent : un bon rapport de fournisseur est donc un point de départ et non l’arrivée. Deux échéances fixent le moment où le service lui-même doit être conforme : les pages Web créées ou mises à jour à compter du 5 décembre 2027, et les applications mobiles, les documents numériques et l’évaluation de conformité utilisée à l’achat à compter du 5 décembre 2028.",
  },
  {
    family: "Langues officielles",
    id: "topic-official-languages",
    icon: Languages,
    intro:
      "Ceci s’applique à chaque service que le public peut utiliser en ligne. Il n’y a ni formulaire, ni comité, ni rien à déposer, et c’est pourquoi on s’en aperçoit souvent tard. Deux choses aident : concevoir et tester dans les deux langues dès le premier prototype, et inscrire l’exigence au contrat lorsqu’un fournisseur est en cause, parce que le français ajouté après coup est facturé comme un changement.",
  },
  {
    family: "Approbations et financement",
    id: "topic-approvals",
    icon: Landmark,
    intro:
      "Ces éléments déterminent quelle part du reste de la liste vous concerne. Deux mesures différentes sont à l’œuvre et on les confond facilement. Le score de complexité du projet, comparé à la classe de capacité approuvée du ministère, détermine si le Conseil du Trésor doit l’approuver. Des seuils d’investissement distincts déterminent si une analyse de rentabilisation conceptuelle est nécessaire. La plupart des projets sont sous les deux et restent à l’intérieur du ministère.",
  },
  {
    family: "Contrats et fournisseurs",
    id: "topic-contracts",
    icon: FileSignature,
    intro:
      "Les trois ne s’appliquent que si vous achetez, et les trois suivent le calendrier d’approvisionnement, ce qui les rend plus précoces qu’il n’y paraît. La liste de vérification et le filtrage s’appliquent lorsqu’un fournisseur traitera de l’information sensible : la liste de vérification doit être réglée avant la parution de la demande de soumissions, parce que les clauses de sécurité de celle-ci en découlent, et l’obtention des attestations de sécurité du personnel d’un fournisseur peut prendre plus de temps que le concours lui-même. La cible de 5 % de contrats attribués à des entreprises autochtones revient au ministère, et le seul moment où un responsable opérationnel peut l’influencer est avant la rédaction de la demande de soumissions.",
  },
  {
    family: "Hébergement et infonuagique",
    id: "topic-hosting",
    icon: Cloud,
    intro:
      "L’endroit où le service fonctionne mérite d’être choisi délibérément, sans quoi il est déterminé par celui qui met en place le premier environnement. Il existe un ordre de préférence pangouvernemental à suivre, et choisir autre chose est permis à condition de le justifier. Une chose à surveiller : un service catégorisé Protégé B ou moins qui fonctionne ailleurs que dans un nuage public passe devant le comité d’architecture pangouvernemental, quelle que soit la dépense, puisque ce déclencheur n’a aucun seuil monétaire. Le travail de sécurité infonuagique de la deuxième rangée ne s’applique qu’à un service hébergé dans le nuage.",
  },
  {
    family: "Identité et ouverture de session",
    id: "topic-identity",
    icon: KeyRound,
    intro:
      "Ceci s’applique lorsque des personnes ou des entreprises ont des comptes, ouvrent une session, ou sont identifiées. Les deux rangées découlent de ce qui arriverait si le service se trompait sur l’identité de quelqu’un, et les deux façonnent la conception tôt. Les services d’ouverture de session communs du gouvernement sont la voie attendue, et construire le vôtre est le choix qui exige une justification. Adhérer à un service commun prend du temps : il vaut donc la peine de s’en informer tôt.",
  },
  {
    family: "Publication sur canada.ca",
    id: "topic-publishing",
    icon: Globe,
    intro:
      "Si le service est destiné au public, une bonne partie de son apparence est déterminée pour vous : les gabarits de page, l’architecture de l’information et le style du contenu sont tous établis centralement. Il est plus facile de composer avec eux que de les contourner : il est donc utile de faire intervenir l’équipe Web du ministère et les communications pendant que la conception peut encore changer, et non à la Bêta quand elle est déjà construite.",
  },
  {
    family: "Registres et documents",
    id: "topic-registries",
    icon: Archive,
    introLink: { phrase: "fil sur l’intendance des données", to: "/thread/data-stewardship" },
    intro:
      "Les registres sont la façon dont le service devient visible pour le reste du gouvernement, et les documents sont l’information qu’il conserve. Ni l’un ni l’autre n’est difficile, et les deux s’oublient facilement parce qu’ils arrivent après le lancement, quand l’équipe de projet est habituellement passée à autre chose. Deux choses à savoir. Un seul des deux registres permet de déclarer le service essentiel. Et rien ne peut être détruit sans le consentement écrit de Bibliothèque et Archives Canada : tout le reste dans ces tableaux peut se rattraper tard à un certain coût, mais un document détruit ne le peut pas, parce qu’il a disparu. La dernière rangée est celle à lire avant d’acheter quoi que ce soit, puisqu’elle dit ce que le système lui-même doit pouvoir faire avec les documents. La façon dont les données sont modélisées, décrites et gardées utilisables fait l’objet du fil sur l’intendance des données.",
  },
  {
    family: "Accès à l’information et transparence",
    id: "topic-openness",
    icon: BookOpen,
    intro:
      "N’importe qui peut demander à une institution fédérale ses documents, et l’institution doit alors les trouver et communiquer ce que la loi permet. Partez donc du principe que ce que ce service consigne pourrait un jour être lu par quelqu’un de l’extérieur. Une deuxième obligation suit un calendrier : les contrats de plus de 10 000 $, et les subventions et contributions de plus de 25 000 $, sont publiés chaque trimestre, que quelqu’un ait demandé à les voir ou non, et c’est au ministère de s’en souvenir, parce qu’aucune demande ne vient le rappeler. Les deux obligations changent ce que le service devrait consigner pendant son exploitation, et la rapidité avec laquelle un document peut être extrait parmi des milliers, ce que la construction doit prévoir.",
  },
];

export const INSTRUMENT_MATRIX: MatrixInstrument[] = [
  /* ------------------------------------------------------------------ */
  /* Security                                                            */
  /* ------------------------------------------------------------------ */
  {
    name: "Catégorisation de sécurité",
    family: "Sécurité",
    kind: "assessment",
    whatItIs:
      "Une cote indiquant l’ampleur du préjudice qui suivrait une fuite, une modification non souhaitée de l’information, ou une panne. Elle est établie sur quatre niveaux, de faible à très élevé, et le résultat détermine l’ampleur de l’ensemble de contrôles de sécurité que la construction doit respecter.",
    everyService: true,
    scope:
      "Chaque service. Trois exigences distinctes pointent vers la même norme : pour les biens, pour l’information, et pour les services et activités. Celle qui vise le service fait partie de l’exigence d’analyse des répercussions sur les activités.",
    ownerDoes:
      "Porte le jugement sur la gravité d’une fuite de cette information, d’une modification par quelqu’un, ou d’un arrêt du service, en jugeant les trois séparément.",
    whoDoes:
      "L’équipe de sécurité du ministère attribue la catégorie, idéalement avec les services juridiques et le bureau de l’accès à l’information et de la protection des renseignements personnels dans la salle.",
    whoBold: ["équipe de sécurité du ministère"],
    ownerBold: ["Porte le jugement", "en jugeant les trois séparément"],
    whereItEndsUp:
      "Conservée au sein du ministère. Rien à l’extérieur ne l’attend : le calendrier appartient donc au ministère. Le résultat alimente l’évaluation de sécurité et l’ensemble de contrôles.",
    linkKey: "standard-on-security-categorization",
    threads: ["security"],
    cells: {
      discovery: {
        tags: ["gather"],
        note: "Nommer l’information que le service détiendra et la gravité de chaque type de perte. Ancré sur la catégorisation située à l’étape du concept, avant les exigences et la conception.",
      },
      alpha: {
        tags: ["fill"],
        note: "La catégorie est attribuée. Elle détermine l’ampleur de l’ensemble de contrôles que le contrat devra ensuite acheter : un énoncé de préjudice vague laisse donc cette décision à l’estimation de quelqu’un d’autre.",
      },
      growth: {
        tags: ["keep"],
        note: "La seule croissance du volume peut relever la catégorie, parce qu’un million de documents peu sensibles réunis au même endroit ne restent pas automatiquement peu sensibles.",
      },
      maturity: {
        tags: ["keep"],
        note: "Réexaminer la catégorie des activités opérationnelles que le service soutient est la première activité de maintien de l’autorisation, selon le cycle du ministère.",
      },
    },
  },
  {
    name: "Évaluation de la menace et des risques",
    acronym: "TRA",
    family: "Sécurité",
    kind: "assessment",
    whatItIs:
      "L’exercice qui énumère ce qui pourrait mal tourner, classe chaque élément selon sa probabilité et l’ampleur du dommage, et énonce le risque qui subsiste une fois les mesures de protection en place. Il couvre autant les menaces délibérées qu’accidentelles et naturelles : il est donc plus large qu’un exercice de cybersécurité.",
    everyService: true,
    scope:
      "L’activité s’applique à tous les systèmes d’information qui soutiennent des programmes, services ou activités du ministère. Aucun seuil monétaire, aucun nombre d’utilisateurs, aucun score de risque. Un rapport autonome est autre chose : en produire un n’est ni recommandé ni exigé, et les résultats sont censés entrer dans les documents de conception ordinaires.",
    ownerDoes:
      "Approuve le plan de travail avant le début de l’évaluation, et énonce d’avance le niveau de risque résiduel acceptable. Fournit la valeur du service pour les activités et ce dont il dépend. Accepte ou refuse le risque résiduel à la fin.",
    whoDoes:
      "Un praticien de la sécurité travaille avec les concepteurs du système pendant la conception ; un évaluateur de sécurité, souvent un entrepreneur, évalue le système construit. Le responsable opérationnel siège à l’équipe d’évaluation à titre d’autorité du programme.",
    whoBold: ["praticien de la sécurité", "évaluateur de sécurité", "responsable opérationnel"],
    ownerBold: [
      "Approuve le plan de travail",
      "énonce d’avance le niveau de risque résiduel acceptable",
      "Accepte ou refuse le risque résiduel",
    ],
    whereItEndsUp:
      "Conservée au sein du ministère. Rien à l’extérieur ne l’attend : le calendrier appartient donc au ministère. Les résultats alimentent le dossier d’autorisation.",
    linkKey: "harmonized-tra-methodology",
    moreLinks: ["itsg-33"],
    threads: ["security"],
    cells: {
      alpha: {
        tags: ["gather", "fill"],
        note: "Premier passage, contre la conception, pendant qu’elle peut encore changer. L’équipe du service fournit la sécurité dont les activités ont réellement besoin et le niveau de risque que le ministère portera.",
      },
      beta: {
        tags: ["fill"],
        note: "Deuxième passage, contre le système réellement construit. Ses résultats entrent dans l’évaluation du risque résiduel sur laquelle repose l’autorisation.",
      },
      growth: {
        tags: ["keep"],
        note: "Un changement signifie que l’évaluation du risque résiduel est mise à jour ; un changement majeur retourne aussi à l’autorisateur.",
      },
      maturity: {
        tags: ["keep"],
        note: "Réévaluée à mesure que le portrait des menaces évolue, à une fréquence fixée dans le plan de sécurité du ministère.",
      },
    },
  },
  {
    name: "Évaluation de la sécurité matérielle et autorisation d’occuper des locaux",
    acronym: "ATOF",
    family: "Sécurité",
    kind: "authorization",
    whatItIs:
      "La deuxième filière de sécurité, menée en parallèle et couvrant les bâtiments, l’équipement et l’espace physique. Elle utilise la même méthode harmonisée que l’évaluation des systèmes, menée par d’autres personnes et se terminant par une signature différente.",
    everyService: false,
    scope:
      "Seulement si le service touche l’espace physique : nouveaux locaux, matériel entre les mains des gens, bornes, ou logiciel qui commande des portes, des barrières, l’éclairage ou le chauffage. Un service hébergé dans le nuage sans matériel y échappe habituellement.",
    ownerDoes:
      "Indique si le service touche l’espace physique, assez tôt pour que la réponse parvienne à la demande de soumissions.",
    whoDoes:
      "La sécurité matérielle du ministère, à l’aide du guide d’évaluation de la Gendarmerie royale du Canada (GRC).",
    whoBold: ["La sécurité matérielle du ministère"],
    ownerBold: ["Indique si le service touche l’espace physique"],
    whereItEndsUp:
      "Conservée au sein du ministère. Rien à l’extérieur ne l’attend : le calendrier appartient donc au ministère. Le dirigeant principal de la sécurité ou son délégué signe le rapport d’évaluation ; l’autorité déléguée approuve l’autorisation d’occuper des locaux.",
    threads: ["security"],
    cells: {
      alpha: {
        tags: ["check"],
        note: "Déterminer si le service touche l’espace physique. Positionnement éditorial : le calendrier propre au guide, choisi pour que la réponse arrive avant la demande de soumissions.",
      },
      beta: {
        tags: ["fill", "sign"],
        note: "Lorsqu’un logiciel commandera de l’équipement de bâtiment, l’évaluation et l’autorisation doivent être terminées avant la mise en œuvre, et la source recommande de commencer tôt.",
      },
    },
  },
  {
    name: "Évaluation et autorisation de sécurité, se terminant par l’autorisation d’exploiter",
    acronym: "EAS, AE",
    family: "Sécurité",
    kind: "authorization",
    whatItIs:
      "L’autorisation officielle permettant au service de fonctionner en production. Une personne investie du pouvoir lit ce que le travail de sécurité a révélé, accepte le risque qui subsiste, et signe. Pour un système ministériel, ce signataire est normalement le responsable opérationnel.",
    everyService: true,
    scope:
      "Chaque système d’information, avant le début de l’exploitation. Chaque ministère définit sa propre pratique documentée pour la façon de procéder, et c’est pourquoi des systèmes identiques sont traités différemment selon les ministères.",
    ownerDoes:
      "Obtient par écrit les conditions d’autorisation avant le début de la conception, à partir du plan de sécurité du ministère ou directement de l’autorisateur. Lit le dossier et décide : autoriser, autoriser sous conditions, ou refuser.",
    whoDoes:
      "L’équipe de sécurité de la technologie de l’information assemble le dossier ; un évaluateur de sécurité, souvent indépendant, réalise l’évaluation.",
    whoBold: ["équipe de sécurité de la technologie de l’information", "évaluateur de sécurité"],
    ownerBold: [
      "Obtient par écrit les conditions d’autorisation",
      "Lit le dossier et décide",
    ],
    whereItEndsUp:
      "Conservée au sein du ministère et signée là. L’autorisateur est la seule personne qui l’attend. Pour les systèmes communs ou intégrés, y compris les services de Services partagés Canada, l’autorisateur est plutôt le dirigeant principal de l’information du Canada. Lorsque deux organisations ou plus partagent un système, c’est le gestionnaire du programme ou du service.",
    linkKey: "directive-security-management",
    threads: ["security"],
    cells: {
      discovery: {
        tags: ["gather", "sign"],
        note: "Sortir les conditions permanentes d’autorisation du plan de sécurité du ministère, ou les obtenir directement de l’autorisateur, et les inscrire à la charte de projet. L’autorisateur signe la charte.",
      },
      alpha: {
        tags: ["sign"],
        note: "L’autorisateur approuve les exigences initiales d’assurance de la sécurité, l’ensemble de contrôles et la conception de haut niveau. Trois de ses sept points d’approbation.",
      },
      beta: {
        tags: ["sign"],
        note: "L’autorisateur approuve la conception détaillée, approuve l’installation en production dans les projets plus grands, puis signe l’autorisation d’exploiter avant le début de l’exploitation. Elle n’expire pas et ne se renouvelle pas selon un calendrier.",
      },
      growth: {
        tags: ["keep", "sign"],
        note: "Les changements majeurs exigent des demandes de changement approuvées par les autorités opérationnelles et par l’autorisateur.",
      },
      maturity: {
        tags: ["keep"],
        note: "L’autorisation est maintenue pendant toute la vie opérationnelle : rendement des contrôles examiné, environnement de menace réévalué.",
      },
      sunset: {
        tags: ["close"],
        note: "L’autorisation est officiellement terminée et le stockage démantelé est effacé de façon sécuritaire, plutôt que de laisser le système éteint et oublié.",
      },
    },
  },

  /* ------------------------------------------------------------------ */
  /* Continuity                                                          */
  /* ------------------------------------------------------------------ */
  {
    name: "Analyse des répercussions sur les activités",
    acronym: "BIA",
    family: "Continuité et incidents",
    kind: "assessment",
    whatItIs:
      "L’exercice qui détermine la criticité du service, et qui produit quatre chiffres : la durée maximale d’interruption admissible, le niveau de service minimal, l’objectif de temps de reprise et l’objectif de point de reprise.",
    everyService: true,
    scope:
      "Chaque service devrait répondre à la question, parce que la réponse détermine si quoi que ce soit d’autre est dû. L’exigence officielle de la directive est plus étroite. Elle ne vise que les services et activités qui soutiennent la disponibilité de ce qui est essentiel à la santé, à la sécurité ou au bien-être économique des Canadiens, ou au fonctionnement efficace du gouvernement. Les grands ministères sont évalués séparément sur le maintien d’une analyse à jour pour chaque service intégré externe et interne.",
    ownerDoes:
      "Porte le jugement sur qui subit un préjudice si le service s’arrête, sur la vitesse à laquelle ce préjudice s’aggrave, et sur ce dont le service dépend.",
    whoDoes:
      "Le spécialiste de la gestion de la continuité des activités du ministère, qui est aussi la personne chargée de déterminer quels services sont essentiels.",
    whoBold: ["spécialiste de la gestion de la continuité des activités"],
    ownerBold: ["Porte le jugement"],
    whereItEndsUp:
      "Le ministère déclare ses services essentiels au Secrétariat du Conseil du Trésor du Canada régulièrement ou sur demande. L’analyse elle-même reste au ministère.",
    threads: ["security"],
    cells: {
      alpha: {
        tags: ["gather"],
        note: "Déterminer combien de temps le service peut être hors service avant qu’un préjudice réel commence, et quelle quantité de données il peut se permettre de perdre. Ces deux chiffres changent l’architecture et la facture d’hébergement : ils précèdent donc l’achat de la construction.",
      },
      beta: {
        tags: ["gather"],
        note: "Transmettre la liste des dépendances : les systèmes, fournisseurs, employés, installations et services partenaires dont celui-ci dépend, y compris là où l’on compte sur une autre organisation.",
      },
      stabilization: {
        tags: ["keep"],
        note: "Mesuré pour la première fois contre de vrais incidents. Positionnement éditorial, justifié par ce que la sous-phase fait déjà.",
      },
      growth: {
        tags: ["keep"],
        note: "Une nouvelle capacité peut changer ce pour quoi le service est essentiel, et une croissance du volume peut changer le préjudice.",
      },
      maturity: {
        tags: ["keep"],
        note: "Actualisé selon le cycle du ministère. Sécurité publique Canada recommande une actualisation complète de l’analyse et du plan la première année, avec des examens la deuxième et la troisième année.",
      },
    },
  },
  {
    name: "Plan de continuité des activités",
    acronym: "BCP",
    family: "Continuité et incidents",
    kind: "plan",
    whatItIs:
      "Les dispositions écrites pour qu’un service essentiel continue d’être offert à un niveau minimal acceptable pendant une perturbation, et pour le rétablir ensuite. Il y a un seul plan pour le ministère, et ce service y a soit sa propre section, soit une couverture répartie sur plusieurs.",
    everyService: false,
    scope:
      "Seulement si l’analyse des répercussions sur les activités marque le service comme essentiel, c’est-à-dire qu’une perturbation causerait un préjudice élevé ou très élevé. Un ministère interprète cela comme devant se rétablir aux niveaux de service minimaux en 72 heures.",
    ownerDoes:
      "Fournit les étapes de rétablissement et les solutions de contournement, puis les met à l’essai. Demande au coordonnateur où ce service figure dans le plan ministériel, et avec quelle limite d’interruption.",
    whoDoes:
      "Le coordonnateur de la continuité des activités du ministère ou de la direction le rédige selon le gabarit ministériel.",
    whoBold: ["coordonnateur de la continuité des activités"],
    ownerBold: ["Fournit les étapes de rétablissement", "les met à l’essai", "Demande au coordonnateur"],
    whereItEndsUp:
      "Conservé au sein du ministère. Rien à l’extérieur ne l’attend : le calendrier appartient donc au ministère. Le cadre supérieur du secteur de programme l’approuve.",
    threads: ["security"],
    cells: {
      beta: {
        tags: ["gather"],
        note: "Avant le lancement, les étapes de rétablissement et les solutions de contournement du service vont au coordonnateur pour que le plan le couvre dès le premier jour. Positionnement éditorial : la directive ne fixe aucun point de contrôle au lancement.",
      },
      stabilization: {
        tags: ["keep"],
        note: "Un incident réel est un essai en direct de dispositions qui avaient été écrites sur papier.",
      },
      maturity: {
        tags: ["keep"],
        note: "Mis à l’essai. La directive ne fixe aucun intervalle obligatoire ; elle n’exige que des essais réguliers conformes aux pratiques ministérielles ; les grands ministères sont évalués sur une fenêtre d’essai de deux ans. L’obligation d’essai retombe en pratique sur les responsables de service.",
      },
    },
  },

  /* ------------------------------------------------------------------ */
  /* Privacy and automated decisions                                     */
  /* ------------------------------------------------------------------ */
  {
    name: "Liste de vérification et évaluation des facteurs relatifs à la vie privée",
    acronym: "PIA",
    family: "Vie privée et décisions automatisées",
    kind: "assessment",
    whatItIs:
      "Un examen structuré des renseignements personnels que le service recueille, du droit de les recueillir, de leur circulation, de leur durée de conservation, et de ce qui pourrait arriver aux personnes en cas de problème. Une liste de vérification obligatoire vient d’abord, et elle détermine si une évaluation complète, un protocole allégé, ou aucun des deux est nécessaire.",
    everyService: false,
    scope:
      "Les déclencheurs sont larges. Un programme nouveau ou substantiellement modifié qui crée, recueille, utilise, communique, conserve ou élimine des renseignements personnels entre dans la portée. De même pour leur utilisation à une fin administrative, l’impartition ou le transfert du programme, l’arrivée d’un tiers, un changement de la technologie qui les traite, ou l’automatisation d’une décision. Aucun seuil monétaire ni nombre d’utilisateurs.",
    ownerDoes:
      "Remplit la liste de vérification, même lorsque la réponse s’avère négative. Indique quels renseignements personnels le service utilisera et quelles décisions concernant des personnes seront prises à partir d’eux.",
    whoDoes:
      "Le secteur de programme la rédige selon le gabarit du Conseil du Trésor ; le bureau de l’accès à l’information et de la protection des renseignements personnels l’examine, l’itère et en est propriétaire.",
    whoBold: ["secteur de programme", "bureau de l’accès à l’information et de la protection des renseignements personnels"],
    ownerBold: ["Remplit la liste de vérification", "Indique quels renseignements personnels le service utilisera"],
    whereItEndsUp:
      "Le bureau de la protection de la vie privée transmet l’évaluation remplie au Secrétariat du Conseil du Trésor du Canada et au Commissariat à la protection de la vie privée en même temps, après approbation de l’administrateur général. Un résumé est publié sur le site Web de l’institution.",
    linkKey: "directive-privacy-practices",
    caveat:
      "La Directive sur l’évaluation des facteurs relatifs à la vie privée autonome a été abrogée le 9 octobre 2024. L’instrument en vigueur est l’annexe C de la Directive sur les pratiques relatives à la protection de la vie privée.",
    threads: ["privacy"],
    cells: {
      discovery: {
        tags: ["check"],
        note: "Remplir la liste de vérification sur la protection de la vie privée. C’est une étape documentée en soi, et la réponse peut être non.",
      },
      alpha: {
        tags: ["gather"],
        note: "Transmettre ce à partir de quoi l’évaluation est bâtie : quels renseignements personnels le service utilisera, et quelles décisions concernant des personnes seront prises à partir d’eux.",
      },
      beta: {
        tags: ["fill", "submit"],
        note: "Approuvée et déposée avant que de vrais renseignements personnels soient recueillis.",
      },
      growth: {
        tags: ["keep"],
        note: "Une fonctionnalité qui traite des renseignements personnels la rouvre.",
      },
      maturity: {
        tags: ["keep"],
        note: "Mise à jour à mesure que le service change, plutôt que laissée à vieillir.",
      },
    },
  },
  {
    name: "Évaluation de l’incidence algorithmique",
    acronym: "AIA",
    family: "Vie privée et décisions automatisées",
    kind: "assessment",
    whatItIs:
      "Un questionnaire coté sur l’ampleur de l’incidence qu’une décision automatisée pourrait avoir sur les droits, la santé ou les intérêts économiques d’une personne, ou sur la durabilité continue d’un écosystème. Le score fixe ce que le service doit ensuite en matière d’explication, d’intervention humaine, de mise à l’essai et de recours.",
    everyService: false,
    scope:
      "Seulement si le service prend ou soutient une décision automatisée concernant une personne : cotation, classement, recommandation ou approbation automatique. Une fonctionnalité d’efficience ajoutée plus tard peut la déclencher sans que personne s’en aperçoive.",
    ownerDoes:
      "Remplit le questionnaire, en répondant à partir du fonctionnement du programme et de ce que la décision fait aux personnes.",
    whoDoes:
      "Le ministère la remplit lui-même, normalement l’équipe de programme avec l’appui de la fonction des données ou du dirigeant principal de l’information.",
    whoBold: ["équipe de programme"],
    ownerBold: ["Remplit le questionnaire"],
    whereItEndsUp:
      "Les résultats sont publiés sur le Portail du gouvernement ouvert avant que le système entre en production, où quiconque à l’extérieur du ministère peut les voir. Le sous-ministre adjoint responsable du programme les remplit et les approuve, ou un autre cadre supérieur désigné par l’administrateur général.",
    linkKey: "algorithmic-impact-assessment",
    moreLinks: ["directive-automated-decision-making"],
    threads: ["ethics-and-bias", "privacy"],
    cells: {
      alpha: {
        tags: ["check"],
        note: "Décider si le service automatisera une décision. Trancher cela à la Bêta ne laisse aucun temps pour concevoir l’automatisation autrement, et la seule option restante est de consigner l’incidence plutôt que de la réduire.",
      },
      beta: {
        tags: ["fill", "submit"],
        note: "Remplie, approuvée et publiée avant la production. À partir du niveau d’incidence deux, un examen par les pairs est aussi exigé, et ses constats publiés avant le lancement.",
      },
      growth: {
        tags: ["keep"],
        note: "Réexaminée, approuvée et mise à jour chaque fois que la fonctionnalité ou la portée du système de décision automatisée change.",
      },
      maturity: {
        tags: ["keep"],
        note: "Mise à jour selon un calendrier établi.",
      },
    },
  },

  /* ------------------------------------------------------------------ */
  /* Accessibility                                                       */
  /* ------------------------------------------------------------------ */
  {
    name: "Rapport de conformité en matière d’accessibilité",
    acronym: "ACR",
    family: "Accessibilité",
    kind: "assessment",
    whatItIs:
      "La déclaration écrite d’un fournisseur indiquant dans quelle mesure son produit respecte la norme d’accessibilité, clause par clause, avec les écarts nommés. C’est une affirmation à vérifier.",
    everyService: false,
    scope:
      "Seulement à l’achat. Une construction interne n’a ni fournisseur ni rapport ; l’obligation équivalente est l’évaluation de conformité du ministère lui-même au regard de la norme.",
    ownerDoes:
      "Indique quelles clauses de la norme le service doit respecter, pour qu’elles entrent dans la demande de soumissions, puis lit le rapport du fournisseur et vérifie ses affirmations à l’égard du produit.",
    whoDoes: "Le fournisseur, par l’entremise d’un tiers ou d’un expert interne qualifié en accessibilité.",
    whoBold: ["supplier"],
    ownerBold: ["Indique quelles clauses", "lit le rapport du fournisseur"],
    whereItEndsUp:
      "Le fournisseur le fournit à l’adjudication du contrat. Le ministère le vérifie, teste de façon indépendante, et exige une feuille de route de correction pour chaque écart.",
    linkKey: "a11y-toolkit-procurement",
    moreLinks: ["a11y-ict-procurement-guide"],
    threads: ["accessibility", "procurement"],
    cells: {
      alpha: {
        tags: ["gather"],
        note: "Déterminer quelles clauses de la norme le service doit respecter, pour qu’elles entrent dans la demande de soumissions plutôt que d’être débattues plus tard.",
      },
      beta: {
        tags: ["sign"],
        note: "Fourni à l’adjudication du contrat et vérifié, non pris pour acquis. Une feuille de route de correction couvre ce qui n’est pas respecté.",
      },
      maturity: {
        tags: ["keep"],
        note: "Mis à jour après les mises à jour logicielles importantes, et au minimum une fois par année, les changements étant indiqués.",
      },
    },
  },
  {
    name: "Conformité en matière d’accessibilité et déclaration d’accessibilité",
    family: "Accessibilité",
    kind: "duty",
    whatItIs:
      "La conformité du service lui-même à la norme canadienne d’accessibilité pour les technologies de l’information et des communications, plus une déclaration publiée qui nomme ce qui n’est pas conforme, quelles sont les solutions de rechange, et quand les écarts seront comblés.",
    everyService: true,
    scope:
      "D’ici le 5 décembre 2027, chaque page Web, destinée au public comme au personnel, créée ou mise à jour à compter de cette date, plus la déclaration publiée. Les applications mobiles, les documents numériques et l’évaluation de conformité utilisée en approvisionnement suivent le 5 décembre 2028. Juridiquement, l’obligation repose sur le ministère par l’entremise de son administrateur général.",
    ownerDoes:
      "Inclut les personnes les plus susceptibles d’être exclues dans la recherche, réserve les tests tôt, et finance les corrections.",
    whoDoes:
      "L’équipe du service, en testant avec des personnes handicapées. Les vérificateurs automatisés ne détectent qu’une fraction des obstacles.",
    whoBold: ["équipe du service"],
    ownerBold: [
      "Inclut les personnes les plus susceptibles d’être exclues",
      "réserve les tests tôt",
      "finance les corrections",
    ],
    whereItEndsUp:
      "Le ministère publie la déclaration, accessible depuis un endroit bien en vue de chaque page qu’elle couvre.",
    linkKey: "en-301-549",
    threads: ["accessibility"],
    cells: {
      alpha: {
        tags: ["gather"],
        note: "Réserver les tests, et budgéter les corrections qu’ils révéleront.",
      },
      beta: {
        tags: ["fill", "submit"],
        note: "Testé au regard de la norme, constats corrigés, et déclaration publiée au plus tard le jour où l’obligation s’applique pour la première fois.",
      },
      growth: {
        tags: ["keep"],
        note: "L’obligation se rattache de nouveau à toute page créée ou mise à jour après la date : les nouvelles fonctionnalités la portent donc.",
      },
      maturity: {
        tags: ["keep"],
        note: "Déclaration actualisée tous les 12 mois et conservée sous forme électronique pendant quatre ans.",
      },
    },
  },

  /* ------------------------------------------------------------------ */
  /* Approvals and money                                                 */
  /* ------------------------------------------------------------------ */
  {
    name: "Analyse de rentabilisation conceptuelle",
    family: "Approbations et financement",
    kind: "submission",
    whatItIs:
      "Un court exposé initial du problème et de l’ordre de grandeur de l’investissement, produit avant une analyse de rentabilisation et avant qu’une solution soit choisie.",
    everyService: false,
    scope:
      "Obligatoire pour les projets habilités par le numérique lorsque le ministère est prêt à investir au moins : 2,5 millions de dollars sans classe de capacité approuvée ou en classe 1 ; 5 millions en classe 2 ; 10 millions en classe 3 ; 15 millions pour la Défense nationale ; 25 millions en classe 4.",
    ownerDoes:
      "Rédige le problème et l’ordre de grandeur à partir des preuves de la Découverte, puis la porte en approbation.",
    whoDoes: "Le ministère, avec approbation au niveau du sous-ministre adjoint ou plus haut.",
    whoBold: ["niveau du sous-ministre adjoint"],
    ownerBold: ["Rédige le problème et l’ordre de grandeur", "la porte en approbation"],
    whereItEndsUp:
      "Le ministère la transmet au Secrétariat du Conseil du Trésor du Canada pour examen par le dirigeant principal de l’information du Canada.",
    linkKey: "concept-case-procedures",
    moreLinks: ["policy-planning-investments"],
    threads: ["funding"],
    cells: {
      discovery: {
        tags: ["check", "fill", "submit"],
        note: "Déterminer si le seuil est franchi, la rédiger, obtenir l’approbation du sous-ministre adjoint, et la transmettre. Elle précède la présentation au comité d’examen de l’architecture et toute présentation au Conseil du Trésor.",
      },
    },
  },
  {
    name: "Évaluation de la complexité et des risques des projets",
    acronym: "PCRA",
    family: "Approbations et financement",
    kind: "assessment",
    whatItIs:
      "Un outil de cotation de 64 questions qui classe un projet du niveau 1, maintien, au niveau 4, transformationnel. Le score détermine qui a le droit d’approuver le projet : le ministre, ou le Conseil du Trésor.",
    everyService: false,
    scope:
      "Exigée à : 2,5 millions de dollars sans classe de capacité approuvée ou en classe 0 ; 5 millions en classe 1 ; 10 millions en classe 2 ; 25 millions en classe 3 ; 50 millions en classe 4, taxes comprises. À noter que cette échelle diffère de celle du comité d’examen de l’architecture telle qu’elle est rédigée.",
    ownerDoes:
      "Répond aux questions sur les risques opérationnels, y compris le degré de préparation réel de l’organisation à adopter la chose.",
    whoDoes:
      "Le bureau de gestion de projet du ministère la rédige ; le parrain du projet est chargé de veiller à ce qu’elle soit remplie ; l’administrateur général répond de son exactitude.",
    whoBold: ["bureau de gestion de projet", "parrain du projet", "administrateur général"],
    ownerBold: ["Répond aux questions sur les risques opérationnels"],
    whereItEndsUp:
      "Elle reste au ministère, et va au Secrétariat du Conseil du Trésor du Canada avec une présentation lorsqu’il en faut une.",
    linkKey: "pcra-tool",
    threads: ["funding"],
    cells: {
      discovery: {
        tags: ["check", "gather", "fill"],
        note: "La section sur les risques opérationnels vient du client ou du parrain du projet, y compris le degré de préparation de l’organisation à adopter la chose.",
      },
      growth: {
        tags: ["keep"],
        note: "Un ajout important peut recoter le projet et changer qui a le droit de l’approuver.",
      },
    },
  },
  {
    name: "Comité d’examen de l’architecture du ministère",
    acronym: "DARB",
    family: "Approbations et financement",
    kind: "review",
    whatItIs:
      "Le comité propre au ministère, qui examine la conception d’une initiative numérique au regard du cadre d’architecture pangouvernemental : chercher ce qui existe déjà avant d’acheter ou de construire, normes ouvertes, données, sécurité et protection de la vie privée.",
    everyService: true,
    scope:
      "Toutes les initiatives numériques ministérielles. Deux exclusions : les petits ministères et organismes, c’est-à-dire dont les niveaux de référence sont inférieurs à 300 millions de dollars par année ou qui sont désignés comme tels, sont exemptés ; les agents du Parlement le sont aussi.",
    ownerDoes: "Présente la direction retenue, en apportant le balayage de réutilisation produit par la Découverte.",
    whoDoes:
      "Le comité examine. L’équipe d’architecture du dirigeant principal de l’information réserve la plage et prépare la documentation.",
    whoBold: ["Le comité examine", "équipe d’architecture"],
    ownerBold: ["Présente la direction retenue", "en apportant le balayage de réutilisation"],
    whereItEndsUp:
      "Conservé au sein du ministère, à moins que l’initiative ne poursuive vers le comité pangouvernemental.",
    linkKey: "gc-enterprise-architecture-framework",
    threads: ["dependencies-and-standards"],
    cells: {
      alpha: {
        tags: ["submit", "sign"],
        note: "La direction retenue est évaluée. Arriver avec le balayage de réutilisation de la Découverte en main accélère les choses.",
      },
      growth: {
        tags: ["keep"],
        note: "Les changements architecturaux majeurs retournent au comité.",
      },
    },
  },
  {
    name: "Comité d’examen de l’architecture intégrée du gouvernement du Canada",
    acronym: "CEAI GC",
    family: "Approbations et financement",
    kind: "review",
    whatItIs:
      "Le comité d’architecture pangouvernemental, coprésidé par le dirigeant principal de la technologie du Canada et le dirigeant principal de la technologie de Services partagés Canada. Six déclencheurs distincts peuvent y envoyer une initiative, et l’ampleur de l’investissement n’en est qu’un.",
    everyService: false,
    scope:
      "L’un ou l’autre de ces éléments suffit. Le ministère est prêt à investir 2,5 millions de dollars sans classe ou en classe 1, 5 millions en classe 2, 10 millions en classe 3, 15 millions pour la Défense nationale, 25 millions en classe 4. Ou l’initiative fait appel à des technologies émergentes. Ou elle exige une exception au titre de la directive. Ou elle est catégorisée Protégé B ou moins et utilise un modèle de déploiement autre que le nuage public. Ou elle prolonge ou crée un soutien sur mesure pour empêcher qu’une technologie cesse d’être soutenue. Ou le dirigeant principal de l’information du Canada l’ordonne.",
    ownerDoes:
      "Vérifie les six déclencheurs, puisqu’une petite initiative peut être visée par les seules technologies émergentes ou l’hébergement, puis fournit la documentation pour la présentation du dirigeant principal de l’information du ministère.",
    whoDoes:
      "Le dirigeant principal de l’information du ministère présente ; l’équipe de projet y assiste habituellement.",
    whoBold: ["dirigeant principal de l’information du ministère"],
    ownerBold: ["Vérifie les six déclencheurs", "fournit la documentation"],
    whereItEndsUp:
      "C’est le ministère qui présente, non la personne. Cela vient après l’examen par le comité du ministère, après l’examen de l’analyse de rentabilisation conceptuelle, et avant une présentation au Conseil du Trésor ou une analyse de rentabilisation ministérielle.",
    linkKey: "gc-enterprise-architecture-framework",
    threads: ["dependencies-and-standards"],
    cells: {
      alpha: {
        tags: ["check", "submit"],
        note: "Vérifiez chacun des six déclencheurs, pas seulement celui du montant. Les déclencheurs non monétaires visent de petites initiatives qui se croient trop petites pour être visées.",
      },
    },
  },
  {
    name: "Présentation au Conseil du Trésor",
    family: "Approbations et financement",
    kind: "submission",
    whatItIs:
      "La demande officielle au Conseil du Trésor visant à obtenir un pouvoir et des fonds lorsque le projet dépasse ce que le ministre peut approuver seul. Elle engage le ministère à des avantages précis.",
    everyService: false,
    scope:
      "Lorsque le niveau de complexité du projet dépasse la classe de capacité approuvée du ministère, ou que le ministère n’a pas de classe et que le projet dépasse 2,5 millions de dollars. Plus tous les programmes. Plus l’approvisionnement ou les biens immobiliers au-delà de leurs propres limites d’approbation.",
    ownerDoes:
      "Fournit la raison d’être du service, ce qu’il coûtera, et les avantages qu’il promet. Ces promesses font l’objet d’un suivi après l’approbation.",
    whoDoes: "Le ministère la rédige ; le dirigeant principal des finances atteste.",
    whoBold: ["Le ministère la rédige", "le dirigeant principal des finances atteste"],
    ownerBold: ["Fournit la raison d’être du service", "les avantages qu’il promet"],
    whereItEndsUp: "Le ministre signe et elle est transmise au Conseil du Trésor.",
    linkKey: "tbs-tb-submissions",
    threads: ["funding"],
    cells: {
      discovery: {
        tags: ["check"],
        note: "La nécessité d’en produire une découle du niveau de complexité et de la classe de capacité du ministère : elle est donc connaissable tôt.",
      },
      alpha: {
        tags: ["fill", "submit"],
        note: "Rédigée et transmise. Cela prend des mois, et une analyse comparative entre les sexes plus est exigée avec elle.",
      },
    },
  },
  {
    name: "Plan de réalisation des avantages et rapport de clôture de projet",
    family: "Approbations et financement",
    kind: "submission",
    whatItIs:
      "L’énoncé écrit du bien que ce projet est censé produire, et le rapport ultérieur confirmant ce qui a réellement été livré et si les avantages promis sont arrivés.",
    everyService: false,
    scope:
      "Universel pour tout ce qui constitue un projet au sens de la directive sur les projets et programmes, sans seuil monétaire. La déclaration de référence au Bureau du contrôleur général commence à 25 millions de dollars.",
    ownerDoes:
      "Nomme les avantages au moment où les fonds sont demandés, puis fournit le relevé de livraison à la clôture.",
    whoDoes: "Le parrain du projet et le bureau de projet du ministère.",
    whoBold: ["parrain du projet", "bureau de projet du ministère"],
    ownerBold: ["Nomme les avantages", "fournit le relevé de livraison"],
    whereItEndsUp:
      "Déposé par la gouvernance de projet du ministère. Les projets de 25 millions de dollars ou plus font aussi rapport au Bureau du contrôleur général à l’approbation, à l’autorisation de dépenser, à chaque modification, et à la clôture.",
    linkKey: "directive-projects-programmes",
    threads: ["funding", "monitoring-and-instrumentation"],
    cells: {
      discovery: {
        tags: ["fill"],
        note: "Les avantages sont nommés au moment où le financement est demandé, non après.",
      },
      stabilization: {
        tags: ["submit"],
        note: "Le projet financé se termine par une clôture : ce qui a été livré, ce qu’il reste du budget, et le relevé de livraison.",
      },
      maturity: {
        tags: ["keep"],
        note: "L’arrivée effective des avantages promis fait l’objet d’un suivi après la fin du projet.",
      },
    },
  },

  /* ------------------------------------------------------------------ */
  /* Registries and records                                              */
  /* ------------------------------------------------------------------ */
  {
    name: "Répertoire des services du GC",
    family: "Registres et documents",
    kind: "register",
    whatItIs:
      "Le registre pangouvernemental des services qui existent, des personnes qu’ils servent, de leur degré de numérisation, et du volume qu’ils traitent. Ses 70 champs publiés ne comportent rien sur la criticité, le rétablissement ou la continuité.",
    everyService: true,
    scope:
      "Chaque service externe et chaque service intégré interne, c’est-à-dire un ministère qui sert d’autres ministères à l’échelle du gouvernement. Les services purement internes d’un ministère sont hors de la portée. Un ministère sans service dépose une déclaration du sous-ministre.",
    ownerDoes:
      "Nomme le service dans des mots que ses clients reconnaîtraient, et fournit les détails de l’entrée au registre.",
    whoDoes: "Le cadre désigné pour les services l’inscrit.",
    whoBold: ["cadre désigné pour les services"],
    ownerBold: ["Nomme le service", "fournit les détails"],
    whereItEndsUp:
      "Le ministère publie par le portail du gouvernement ouvert ; l’administrateur général approuve le répertoire et ses mises à jour annuelles.",
    linkKey: "gc-service-inventory",
    moreLinks: ["policy-on-service-and-digital"],
    threads: ["data-stewardship"],
    cells: {
      stabilization: {
        tags: ["submit"],
        note: "Inscrit une fois le service en fonction. Facile à oublier, parce que personne ne vient le réclamer.",
      },
      maturity: {
        tags: ["keep"],
        note: "Mis à jour chaque année, chaque élément de données étant réexaminé, habituellement recueilli au cours de l’été pour l’exercice précédent.",
      },
      sunset: {
        tags: ["close"],
        note: "Mis à jour pour indiquer que le service est retiré.",
      },
    },
  },
  {
    name: "Gestion du portefeuille d’applications",
    acronym: "APM",
    family: "Registres et documents",
    kind: "register",
    whatItIs:
      "Le registre des applications derrière les services, cotées selon la valeur opérationnelle, l’état technique, le coût de soutien et la criticité, et classées en tolérer, innover, atténuer ou éliminer. C’est ici que la criticité est réellement consignée, puisque le répertoire des services n’a pas de champ pour cela.",
    everyService: true,
    scope:
      "Chaque application opérationnelle derrière un service. Aucun seuil monétaire, même si le système est en pratique utilisé par un sous-ensemble de ministères.",
    ownerDoes:
      "Cote la criticité, la valeur opérationnelle et l’état de l’application. Laissé vide, aucun registre pangouvernemental ne présente le service comme essentiel.",
    whoDoes: "Un délégué du portefeuille du ministère tient l’inventaire et coordonne la saisie.",
    whoBold: ["délégué du portefeuille"],
    ownerBold: ["Cote la criticité"],
    whereItEndsUp:
      "Le ministère transmet au Secrétariat du Conseil du Trésor du Canada chaque année ; le jeu de données public est actualisé deux fois par année.",
    threads: ["data-stewardship", "dependencies-and-standards"],
    cells: {
      stabilization: {
        tags: ["submit"],
        note: "Cotée une fois en fonction, y compris sa criticité.",
      },
      maturity: {
        tags: ["keep"],
        note: "Mise à jour au cours de l’année. Quand les responsables ne sont pas mobilisés, les données restent incomplètes et les coûts de soutien ne sont pas suivis.",
      },
      sunset: {
        tags: ["close"],
        note: "Marquée comme retirée.",
      },
    },
  },
  {
    name: "Autorisation de conservation et de disposition des documents",
    family: "Registres et documents",
    kind: "register",
    whatItIs:
      "Le consentement écrit de Bibliothèque et Archives Canada sans lequel aucun document gouvernemental ne peut être détruit. L’autorisation est une permission de disposer. Elle n’ordonne à personne de disposer, et elle ne fixe pas les périodes de conservation ; c’est le calendrier propre au ministère qui le fait.",
    everyService: true,
    scope:
      "Toute l’information et toutes les données. Bibliothèque et Archives Canada délivre soit une autorisation propre à une institution, soit une autorisation pluri-institutionnelle ; le ministère confirme laquelle couvre ses documents et fixe lui-même les périodes de conservation.",
    ownerDoes:
      "Indique au bureau de la gestion de l’information quels documents et données le service créera et détiendra, et fixe la durée de conservation de chaque type.",
    whoDoes:
      "La fonction de gestion de l’information relevant du dirigeant principal de l’information du ministère.",
    whoBold: ["fonction de gestion de l’information"],
    ownerBold: ["Indique au bureau de la gestion de l’information", "fixe la durée de conservation de chaque type"],
    whereItEndsUp:
      "Le ministère demande une nouvelle autorisation à Bibliothèque et Archives Canada lorsqu’aucune ne couvre les documents.",
    linkKey: "lac-information-disposition-hub",
    moreLinks: ["laca"],
    threads: ["data-stewardship", "privacy"],
    cells: {
      alpha: {
        tags: ["gather"],
        note: "Indiquer au bureau de la gestion de l’information quels documents et données le service créera et détiendra, pour qu’il puisse les rattacher à une autorisation existante ou en demander une nouvelle.",
      },
      beta: {
        tags: ["fill"],
        note: "Le calendrier de conservation et de disposition est fixé. Toute lacune est signalée avant le lancement plutôt que découverte au moment du retrait.",
      },
      maturity: {
        tags: ["keep"],
        note: "La disposition se fait régulièrement pendant toute la vie du service, non seulement à la fin.",
      },
      sunset: {
        tags: ["close"],
        note: "Confirmer que l’autorisation est en place et qu’aucune obligation de conservation en cas de litige, demande d’accès ou autre obligation légale n’empêche la destruction. Les documents à valeur archivistique sont transférés à Bibliothèque et Archives Canada.",
      },
    },
  },

  /* ------------------------------------------------------------------ */
  /* Continuity and incidents, second batch                              */
  /* ------------------------------------------------------------------ */
  {
    name: "Systèmes qui gèrent l’information et les données",
    family: "Registres et documents",
    kind: "duty",
    whatItIs:
      "Un ensemble de choses que tout système détenant de l’information gouvernementale doit pouvoir faire : appliquer les règles de conservation et de disposition d’une façon vérifiable, porter des métadonnées, prendre en charge les structures de classification du ministère, fonctionner avec d’autres systèmes, et exporter en bloc dans des formats ouverts.",
    everyService: true,
    scope:
      "Tous les systèmes, en vigueur depuis le 4 mai 2022. Tout ce qui a été construit ou acheté avant cette date disposait de 24 mois pour faire la transition, et tout ce qui était traité comme patrimonial disposait de 24 mois pour produire un plan. Les capacités peuvent être assurées par un seul système ou par plusieurs utilisés ensemble.",
    ownerDoes:
      "Inscrit ces éléments dans les exigences avant tout achat, avant tout l’exportation en bloc dans des formats ouverts et la capacité d’appliquer une règle de conservation. Un produit incapable de ces deux choses ne pourra pas y être amené plus tard sans être remplacé.",
    ownerBold: ["Inscrit ces éléments aux exigences avant tout achat"],
    whoDoes:
      "La fonction de gestion de l’information dit ce qui est nécessaire ; l’équipe du service ou le fournisseur le construit.",
    whoBold: ["fonction de gestion de l’information"],
    whereItEndsUp:
      "Conservé au sein du ministère. Rien n’est déposé. Cela se traduit par des clauses dans la demande de soumissions et par des points à vérifier à l’acceptation.",
    linkKey: "standard-systems-manage-information",
    moreLinks: ["standard-managing-metadata"],
    threads: ["data-stewardship"],
    cells: {
      alpha: {
        tags: ["gather"],
        note: "Ces éléments deviennent des exigences ici, pendant que la demande de soumissions se rédige encore.",
      },
      beta: {
        tags: ["check"],
        note: "Confirmez que le système construit ou acheté fait réellement ces choses. L’exportation en bloc est celle qui manque le plus souvent et la plus coûteuse à découvrir tard.",
      },
      sunset: {
        tags: ["close"],
        note: "L’exportation en bloc dans des formats ouverts est ce qui rend une migration possible quand le service est remplacé.",
      },
    },
  },
  {
    name: "Gestion de la continuité de la technologie de l’information",
    family: "Continuité et incidents",
    kind: "plan",
    whatItIs:
      "Les dispositions de rétablissement propres à l’équipe du service : comment ce système se relève, dans quel ordre ses composants sont restaurés, et la preuve par les essais que la restauration fonctionne. Le plan de continuité des activités du ministère appartient au ministère ; ceci est la partie dont l’équipe est responsable.",
    everyService: true,
    scope:
      "Tous les systèmes d’information. Les stratégies de rétablissement sont établies conformément aux exigences de continuité des activités du ministère : les cibles de rétablissement descendent donc de l’analyse des répercussions sur les activités, et c’est ici qu’elles sont atteintes.",
    ownerDoes:
      "Confirme que la restauration a été mise à l’essai au moins une fois avant le lancement, et que la construction atteint la cible de rétablissement fixée par l’analyse des répercussions sur les activités.",
    whoDoes:
      "L’équipe qui exploite le service, avec les opérations de la technologie de l’information et le fournisseur d’hébergement.",
    whoBold: ["L’équipe qui exploite le service"],
    ownerBold: ["Confirme que la restauration a été mise à l’essai", "atteint la cible de rétablissement"],
    whereItEndsUp:
      "Conservé au sein du ministère. Rien à l’extérieur ne l’attend : le calendrier appartient donc au ministère. La preuve est la restauration mise à l’essai, détenue par l’équipe.",
    linkKey: "directive-security-management",
    threads: ["security", "releasing-changes"],
    cells: {
      beta: {
        tags: ["fill"],
        note: "Les sauvegardes, la procédure de restauration et les priorités de restauration existent et ont été mises à l’essai au moins une fois avant le lancement, plutôt que d’être présumées.",
      },
      stabilization: {
        tags: ["keep"],
        note: "Les premiers incidents réels vérifient si la restauration fonctionne sous pression et si la cible de rétablissement est atteignable.",
      },
      maturity: {
        tags: ["keep"],
        note: "Remise à l’essai selon le cycle du ministère. Une sauvegarde non éprouvée n’a pas démontré qu’elle fonctionne.",
      },
    },
  },
  {
    name: "Intervention et signalement en cas d’événement de cybersécurité",
    family: "Continuité et incidents",
    kind: "plan",
    whatItIs:
      "L’obligation de disposer d’un moyen de repérer, de contenir et de signaler un incident de cybersécurité avant qu’il survienne, et de le signaler dans la chaîne pangouvernementale quand il survient. Le plan pangouvernemental établit qui est prévenu, dans quel ordre, et comment un événement s’escalade en intervention coordonnée.",
    everyService: true,
    scope:
      "Chaque service. Les plans et procédures d’intervention du ministère en cas d’événement de cybersécurité doivent fonctionner conformément au Plan de gestion des événements de cybersécurité du gouvernement du Canada, et les événements de sécurité sont signalés selon la norme sur le signalement des événements de sécurité.",
    ownerDoes:
      "Sait avant le lancement qui appeler et à quelle vitesse, et leur transmet un incident dès que l’équipe en repère un.",
    whoDoes:
      "La fonction des opérations de sécurité du ministère établit la voie d’escalade, avec le fonctionnaire désigné pour la cybersécurité. L’équipe du service détecte, contient et fournit les faits.",
    whoBold: ["fonction des opérations de sécurité", "équipe du service"],
    ownerBold: ["Sait avant le lancement qui appeler", "leur transmet un incident"],
    whereItEndsUp:
      "Le ministère fait rapport au Centre canadien pour la cybersécurité et au Secrétariat du Conseil du Trésor du Canada par les voies établies dans le plan pangouvernemental. Le responsable opérationnel ne fait pas lui-même rapport à l’échelle du gouvernement.",
    linkKey: "directive-on-service-and-digital",
    threads: ["security", "monitoring-and-instrumentation"],
    cells: {
      beta: {
        tags: ["fill"],
        note: "Savoir avant le lancement qui appeler à 2 h du matin, comment le service est surveillé, et quelle est la voie d’escalade. Positionnement éditorial : l’obligation est permanente plutôt que liée au lancement.",
      },
      stabilization: {
        tags: ["keep"],
        note: "C’est le moment où cela sert. Les incidents sont signalés par la voie ministérielle, non gardés pour soi.",
      },
      growth: {
        tags: ["keep"],
        note: "Un nouveau composant ou une nouvelle intégration change ce qu’il faut surveiller.",
      },
      maturity: {
        tags: ["keep"],
        note: "Les dispositions d’intervention sont mises en pratique et tenues à jour avec le service.",
      },
    },
  },
  {
    name: "Rapport d’atteinte substantielle à la vie privée",
    family: "Continuité et incidents",
    kind: "filing",
    whatItIs:
      "Le rapport qu’un ministère doit produire lorsque des renseignements personnels sont perdus, consultés ou communiqués d’une façon dont on pourrait raisonnablement s’attendre à ce qu’elle cause un préjudice grave. Il est transmis au Commissariat à la protection de la vie privée du Canada et au Secrétariat du Conseil du Trésor du Canada, et les personnes touchées sont avisées.",
    everyService: false,
    scope:
      "Seulement lorsqu’une atteinte visant des renseignements personnels est jugée substantielle, d’après la sensibilité de l’information, le nombre de personnes touchées, et le caractère systémique ou non du problème. Un incident de cybersécurité touchant des renseignements personnels peut déclencher à la fois celui-ci et la voie de signalement en cybersécurité.",
    ownerDoes:
      "Informe immédiatement le bureau de la protection de la vie privée de ce qui s’est passé et des renseignements en cause.",
    whoDoes:
      "Le bureau de l’accès à l’information et de la protection des renseignements personnels évalue le caractère substantiel et prépare le rapport.",
    whoBold: ["bureau de l’accès à l’information et de la protection des renseignements personnels"],
    ownerBold: ["Informe immédiatement le bureau de la protection de la vie privée"],
    whereItEndsUp:
      "L’institution fait rapport au Commissariat à la protection de la vie privée et au Secrétariat du Conseil du Trésor du Canada, et avise les personnes touchées.",
    threads: ["privacy", "security"],
    cells: {
      beta: {
        tags: ["check"],
        note: "Savoir, avant le lancement, qui au ministère tranche le caractère substantiel et à quelle vitesse cette personne doit être informée par l’équipe.",
      },
      stabilization: {
        tags: ["submit"],
        note: "Si cela se produit, c’est signalé. Positionnement éditorial : l’obligation est déclenchée par l’événement, non par une phase.",
      },
      growth: {
        tags: ["keep"],
        note: "De nouveaux renseignements personnels dans le service élargissent ce qu’une atteinte couvrirait.",
      },
    },
  },

  /* ------------------------------------------------------------------ */
  /* Official languages                                                  */
  /* ------------------------------------------------------------------ */
  {
    name: "Service dans les deux langues officielles",
    family: "Langues officielles",
    kind: "duty",
    whatItIs:
      "L’obligation d’offrir et de fournir le service en français et en anglais en même temps et selon la même norme. Pour un service numérique, cela couvre l’interface, le contenu, les avis, les messages d’erreur, et le soutien humain derrière : une traduction ajoutée après coup n’y répond donc pas.",
    everyService: true,
    scope:
      "Chaque service que le public peut utiliser en ligne. Le déclencheur est le fait d’être un système automatisé accessible au public, en vertu de l’alinéa 11b) du Règlement sur les langues officielles, avec l’alinéa 24(1)b) de la Loi sur les langues officielles comme fondement habilitant. La portée géographique est un critère différent qui vise la correspondance et le téléphone : un service n’est donc pas exempté parce qu’il sert une seule région. La façon dont le contenu Web bilingue est publié est fixée par le paragraphe 6.6.4.1 de la Directive sur les langues officielles pour les communications et services.",
    ownerDoes:
      "Finance et planifie les deux langues dès le premier prototype, et teste avec des utilisateurs francophones.",
    whoDoes:
      "L’équipe du service le construit bilingue ; le champion ou conseiller des langues officielles du ministère établit les obligations ; les communications sont responsables des normes de contenu.",
    whoBold: ["équipe du service", "champion ou conseiller des langues officielles"],
    ownerBold: ["Finance et planifie les deux langues", "teste avec des utilisateurs francophones"],
    whereItEndsUp:
      "Rien de courant n’est déposé. Un seul artefact est réel : toute initiative qui va au Conseil du Trésor porte une annexe sur les langues officielles remplie, la filtrant au regard des parties IV, V, VI et VII, plus une analyse d’incidence si une réponse est affirmative.",
    caveat:
      "Le projet de loi C-13 a modifié les obligations relatives à la langue de travail à compter du 20 juin 2025 : tout ce qui a été rédigé avant cette date peut donc être désuet du côté du travail.",
    threads: ["joined-up-delivery", "change-management"],
    cells: {
      discovery: {
        tags: ["check"],
        note: "Confirmer que le service sera accessible au public en ligne, ce qui le rend bilingue par règle. Ne desservir qu’une région ne l’exempte pas.",
      },
      alpha: {
        tags: ["gather"],
        note: "Concevoir et tester dans les deux langues dès le premier prototype. C’est du rattrapage du français dans une interface construite autour de l’anglais que naît le coût.",
      },
      beta: {
        tags: ["fill", "submit"],
        note: "Les deux langues sont lancées ensemble. Lorsqu’une présentation au Conseil du Trésor est en cause, l’annexe sur les langues officielles l’accompagne.",
      },
      growth: {
        tags: ["keep"],
        note: "Chaque nouvelle fonctionnalité et chaque nouvel avis sortent dans les deux langues, en même temps.",
      },
      maturity: {
        tags: ["keep"],
        note: "Repris dans l’examen annuel des langues officielles du ministère, et de nouveau au renouvellement du financement.",
      },
    },
  },
  {
    name: "Les langues officielles dans ce que vous achetez",
    family: "Langues officielles",
    kind: "duty",
    whatItIs:
      "L’obligation d’inscrire les exigences relatives aux langues officielles au contrat, pour que le fournisseur soit contractuellement tenu de livrer les deux langues.",
    everyService: false,
    scope:
      "Chaque fois qu’un fournisseur livre, héberge ou soutient une partie d’un service destiné au public, ou produit du contenu au nom du ministère. Les orientations sont établies par un avis sur la politique des marchés.",
    ownerDoes:
      "Énonce l’exigence bilingue dans l’énoncé des travaux avant la parution de la demande de soumissions. Omise, le français devient plus tard une modification de contrat facturée.",
    whoDoes: "L’autorité contractante inscrit les clauses dans la demande de soumissions et dans le contrat.",
    whoBold: ["autorité contractante"],
    ownerBold: ["Énonce l’exigence bilingue"],
    whereItEndsUp:
      "Conservé au sein du ministère. Cela figure dans la demande de soumissions et dans le contrat signé.",
    threads: ["procurement", "accessibility"],
    cells: {
      alpha: {
        tags: ["gather"],
        note: "L’exigence entre dans la demande de soumissions, à côté des clauses d’accessibilité, avant toute soumission.",
      },
      beta: {
        tags: ["sign"],
        note: "Les clauses figurent au contrat signé et les livrables sont vérifiés à leur égard.",
      },
      maturity: {
        tags: ["keep"],
        note: "Les renouvellements et les modifications reconduisent les clauses.",
      },
    },
  },

  /* ------------------------------------------------------------------ */
  /* Contracts and suppliers                                             */
  /* ------------------------------------------------------------------ */
  {
    name: "Liste de vérification des exigences relatives à la sécurité",
    acronym: "LVERS, formulaire TBS/SCT 350-103",
    family: "Contrats et fournisseurs",
    kind: "submission",
    whatItIs:
      "Un court formulaire qui énonce, pour un contrat donné, exactement quelle sécurité le fournisseur et son personnel exigent : quel niveau d’information ils toucheront, quel filtrage chaque rôle exige, et si l’entreprise peut détenir de l’information gouvernementale dans ses propres bureaux.",
    everyService: false,
    scope:
      "Seulement lorsque le fournisseur ou son personnel aura accès à de l’information ou à des biens Protégés ou Classifiés, entrera dans des sites d’accès restreint, ou se connectera électroniquement aux systèmes du ministère, ce qui comprend tout accès aux renseignements personnels que le ministère détient. En l’absence d’exigences de sécurité, aucune liste de vérification n’est produite et le ministère l’atteste à la place.",
    ownerDoes:
      "Rédige la liste de vérification à partir de l’énoncé des travaux, en indiquant ce que le fournisseur fera et touchera, et signe le bloc de l’autorité de projet. Une description vague produit des clauses qui bloquent le travail.",
    whoDoes:
      "L’agent de sécurité du ministère conseille sur les niveaux. Le Programme de sécurité des contrats de Services publics et Approvisionnement Canada l’examine et en dérive les clauses.",
    whoBold: ["agent de sécurité du ministère", "Programme de sécurité des contrats"],
    ownerBold: ["Rédige la liste de vérification", "signe le bloc de l’autorité de projet"],
    whereItEndsUp:
      "L’autorité contractante la fait circuler avec la demande d’achat. Elle doit être réglée avant la parution de la demande de soumissions ou l’adjudication du contrat, et la liste approuvée est annexée aux deux. L’autorité de projet en signe un bloc.",
    linkKey: "pspc-security-requirements-contracting",
    threads: ["procurement", "security"],
    cells: {
      discovery: {
        tags: ["check"],
        note: "Déterminer si un fournisseur sera en cause, et s’il aurait accès à de l’information protégée. Positionnement éditorial.",
      },
      alpha: {
        tags: ["fill"],
        note: "Rédigée pendant la préparation de l’achat, parce que les clauses qu’elle produit doivent figurer dans la demande de soumissions.",
      },
      beta: {
        tags: ["sign", "submit"],
        note: "L’autorité de projet signe son bloc ; l’agent de sécurité signe le sien. L’attestation est confirmée avant l’adjudication, et le filtrage du fournisseur peut prendre des mois : un départ tardif retarde donc le contrat, non la paperasse.",
      },
      growth: {
        tags: ["keep"],
        note: "Chaque nouvelle exigence ou demande d’achat qui touche de l’information nouvelle exige sa propre liste de vérification, avec de nouvelles signatures.",
      },
      maturity: {
        tags: ["keep"],
        note: "Les renouvellements, les remises en concurrence et les modifications comportant une exigence de sécurité en exigent chacun une.",
      },
      sunset: {
        tags: ["keep"],
        note: "Le contrat de démantèlement ou de migration est lui-même une nouvelle exigence : un fournisseur qui fait le travail de retrait en a donc besoin d’une aussi.",
      },
    },
  },
  {
    name: "Filtrage de sécurité de l’organisation et du personnel du fournisseur",
    family: "Contrats et fournisseurs",
    kind: "authorization",
    whatItIs:
      "Les attestations qu’une entreprise et ses employés doivent détenir avant de toucher à du travail gouvernemental sensible. Un ministère ne peut pas les délivrer lui-même, et le travail ne peut pas être adjugé tant que l’attestation n’est pas confirmée par écrit.",
    everyService: false,
    scope:
      "Chaque approvisionnement dont la Liste de vérification des exigences relatives à la sécurité recense une exigence de sécurité, et il en va de même pour les sous-traitants à tous les niveaux. Le filtrage de l’organisation couvre Protégé A, B et C ; une attestation d’installation vise le Classifié.",
    ownerDoes:
      "Détermine tôt quel niveau d’attestation le travail exige. Le filtrage dure souvent plus longtemps que l’approvisionnement.",
    whoDoes:
      "Le Programme de sécurité des contrats effectue le filtrage. Le fournisseur nomme un agent de sécurité d’entreprise. Les employés font leur demande par l’entremise de leur employeur.",
    whoBold: ["Programme de sécurité des contrats", "agent de sécurité d’entreprise"],
    ownerBold: ["Détermine tôt quel niveau d’attestation"],
    whereItEndsUp:
      "Les soumissionnaires présentent une demande d’inscription avec leur soumission, que l’acheteur transmet au programme. Le programme confirme par écrit, avant l’adjudication, que le soumissionnaire retenu satisfait aux exigences.",
    linkKey: "pspc-security-requirements-contracting",
    moreLinks: ["directive-procurement"],
    threads: ["procurement", "security"],
    cells: {
      alpha: {
        tags: ["check"],
        note: "Déterminer quel niveau d’attestation le travail exige, parce que c’est ce qui fixe l’échéancier plus que l’approvisionnement lui-même.",
      },
      beta: {
        tags: ["gather", "sign"],
        note: "Confirmé avant l’adjudication. Le filtrage individuel peut prendre des mois, et le nouveau personnel qui se joint en cours de contrat en a besoin aussi.",
      },
      growth: {
        tags: ["keep"],
        note: "Le nouveau personnel du fournisseur et les nouveaux sous-traitants sont filtrés avant d’obtenir l’accès.",
      },
      maturity: {
        tags: ["keep"],
        note: "Les attestations expirent et sont renouvelées. Le travail ne peut pas se poursuivre avec un filtrage échu.",
      },
    },
  },

  /* ------------------------------------------------------------------ */
  /* Hosting and cloud                                                   */
  /* ------------------------------------------------------------------ */
  {
    name: "Contrats attribués à des entreprises autochtones",
    acronym: "la cible de 5 %",
    family: "Contrats et fournisseurs",
    kind: "duty",
    whatItIs:
      "Un engagement pangouvernemental voulant qu’au moins 5 % de la valeur totale des contrats aille à des entreprises autochtones chaque année. Les ministères le planifient, en rendent compte, et l’atteignent ou le manquent un approvisionnement à la fois.",
    everyService: false,
    scope:
      "Seulement à l’achat. La cible appartient au ministère et non à un contrat en particulier : aucun approvisionnement n’a donc à être réservé. Chaque approvisionnement est l’endroit où la cible est atteinte ou manquée, et c’est pourquoi les ministères la planifient d’avance. La qualification d’un fournisseur est vérifiée par Services aux Autochtones Canada.",
    ownerDoes:
      "Indique tôt si l’exigence pourrait être comblée par une entreprise autochtone, et le dit avant la rédaction de la demande de soumissions, quand la voie est encore ouverte.",
    ownerBold: ["Indique tôt si l’exigence pourrait être comblée par une entreprise autochtone"],
    whoDoes:
      "L’autorité contractante choisit la voie et la mène. La fonction d’approvisionnement du ministère planifie en fonction de la cible et déclare les résultats.",
    whoBold: ["autorité contractante", "fonction d’approvisionnement"],
    whereItEndsUp:
      "Public. Les contrats attribués à des entreprises autochtones sont divulgués, et les ministères rendent compte de leur planification et de leur rendement au regard de la cible.",
    linkKey: "directive-procurement-indigenous-appendix-e",
    threads: ["procurement"],
    cells: {
      discovery: {
        tags: ["check"],
        note: "Demander à l’autorité contractante quelle est la position du ministère sur la cible cette année, parce que cela façonne la voie d’achat plus que l’exigence elle-même.",
      },
      alpha: {
        tags: ["gather"],
        note: "Indiquer si le travail pourrait être fait par une entreprise autochtone pendant que la demande de soumissions se rédige encore. Une fois publiée, la voie est fixée.",
      },
    },
  },
  {
    name: "Décision d’hébergement de l’application, et le nuage public par défaut",
    family: "Hébergement et infonuagique",
    kind: "review",
    whatItIs:
      "La décision sur l’endroit où le service fonctionne, prise au regard d’un ordre de préférence pangouvernemental : logiciel-service avant plateforme avant infrastructure, et nuage public avant hybride avant privé avant hors nuage. S’écarter de cet ordre exige une justification.",
    everyService: true,
    scope:
      "Chaque service doit prendre la décision. Le déclencheur est précis : une initiative catégorisée Protégé B ou moins qui utilise un modèle de déploiement autre que le nuage public pour l’hébergement, le déploiement ou le développement doit aller au Comité d’examen de l’architecture intégrée du gouvernement du Canada. Ce déclencheur n’a aucun seuil monétaire.",
    ownerDoes:
      "Énonce ce dont le service a besoin de son hébergement, et justifie tout choix autre que le nuage public.",
    whoDoes:
      "Les fonctions d’architecture et d’hébergement du ministère décident. L’approbation du comité d’examen de l’architecture du ministère est obligatoire pour les initiatives d’hébergement d’applications.",
    whoBold: ["fonctions d’architecture et d’hébergement"],
    ownerBold: ["Énonce ce dont le service a besoin", "justifie"],
    whereItEndsUp:
      "Les demandes d’hébergement vont à Services partagés Canada par son portail des services d’hébergement. Lorsque le déclencheur est atteint, le dirigeant principal de l’information du ministère présente au comité pangouvernemental.",
    linkKey: "directive-on-service-and-digital",
    threads: ["dependencies-and-standards"],
    cells: {
      alpha: {
        tags: ["check", "submit"],
        note: "Décider du modèle d’hébergement pendant que la conception peut encore absorber la réponse, et le porter au comité du ministère. Tout choix autre que le nuage public à Protégé B ou moins va aussi au comité pangouvernemental.",
      },
      beta: {
        tags: ["sign"],
        note: "L’entente d’hébergement est en place et la décision est consignée.",
      },
      maturity: {
        tags: ["keep"],
        note: "Réexaminée à mesure que la technologie vieillit, et de nouveau lorsqu’un soutien sur mesure doit être prolongé pour maintenir quelque chose soutenu.",
      },
    },
  },
  {
    name: "Profil de sécurité infonuagique, garde-fous, et autorisation infonuagique",
    family: "Hébergement et infonuagique",
    kind: "authorization",
    whatItIs:
      "Le travail de sécurité supplémentaire que porte un service hébergé dans le nuage : un profil de contrôles prêt à l’emploi sur lequel construire, des garde-fous qui doivent être en place dans les premiers jours d’un nouvel environnement infonuagique, et une évaluation de sécurité qui tient compte du partage entre ce que fait le fournisseur et ce que fait le ministère.",
    everyService: false,
    scope:
      "Seulement pour les services hébergés dans le nuage. Le profil de contrôles Protégé B est le point de départ habituel. Le Centre pour la cybersécurité évalue séparément les fournisseurs de services infonuagiques : un ministère hérite donc de cette évaluation plutôt que de la refaire, et n’évalue que sa propre configuration et son propre usage.",
    ownerDoes: "Indique ce que le service détient, pour que le bon profil de contrôles soit choisi.",
    whoDoes:
      "L’équipe de sécurité du ministère, avec l’équipe infonuagique, établit le partage des responsabilités avec le fournisseur ; l’évaluation propre au fournisseur est héritée.",
    whoBold: ["équipe de sécurité du ministère"],
    ownerBold: ["Indique ce que le service détient"],
    linkKey: "gc-cloud-security-control-profile",
    whereItEndsUp:
      "Conservé au sein du ministère au-delà de la filière d’hébergement. L’autorisation y est signée, comme pour tout autre service.",
    threads: ["dependencies-and-standards", "security"],
    cells: {
      alpha: {
        tags: ["check", "gather"],
        note: "Établir quel profil de contrôles s’applique et ce que couvre le fournisseur, parce que cela change l’ampleur de ce que le ministère doit construire et acheter.",
      },
      beta: {
        tags: ["fill", "sign"],
        note: "Garde-fous en place dans le nouvel environnement, évaluation de sécurité faite au regard du partage des responsabilités, et autorisation signée avant le début de l’exploitation.",
      },
      growth: {
        tags: ["keep"],
        note: "Les nouveaux services infonuagiques ajoutés à l’environnement viennent avec leur propre travail d’évaluation.",
      },
      maturity: {
        tags: ["keep"],
        note: "La configuration dérive. Les garde-fous et l’évaluation sont revérifiés.",
      },
    },
  },

  /* ------------------------------------------------------------------ */
  /* Identity and sign-in                                                */
  /* ------------------------------------------------------------------ */
  {
    name: "Niveaux d’assurance de l’identité et des justificatifs",
    family: "Identité et ouverture de session",
    kind: "assessment",
    whatItIs:
      "Deux cotes, de un à quatre, indiquant à quel point le service doit être certain de l’identité d’une personne et quelle doit être la robustesse de l’ouverture de session. Elles contraignent la conception dès le départ, parce qu’elles déterminent ce que l’ouverture de session doit faire avant que quiconque la construise.",
    everyService: false,
    scope:
      "Tout service où des personnes ou des entreprises ont des comptes, ouvrent une session, ou sont identifiées. Il y a quatre niveaux, de un à quatre, allant d’une confiance faible requise à une confiance très élevée requise. Une feuille de travail de la Ligne directrice sur la définition des exigences en matière d’authentification produit le niveau applicable à un service donné.",
    ownerDoes: "Porte le jugement sur le préjudice qui résulte d’une erreur sur l’identité de quelqu’un.",
    whoDoes:
      "La fonction de gestion de l’identité du ministère fixe le niveau, avec l’équipe de la sécurité.",
    whoBold: ["fonction de gestion de l’identité"],
    linkKey: "directive-identity-management",
    moreLinks: ["guideline-authentication-requirements"],
    caveat:
      "La Norme sur l’assurance de l’identité et des justificatifs autonome a été archivée le 28 juin 2019. La version en vigueur est l’annexe A de la Directive sur la gestion de l’identité.",
    ownerBold: ["Porte le jugement sur le préjudice qui résulte"],
    whereItEndsUp:
      "Conservé au sein du ministère. Rien à l’extérieur ne l’attend : le calendrier appartient donc au ministère.",
    threads: ["security", "user-research"],
    cells: {
      discovery: {
        tags: ["check"],
        note: "Établir si le service identifie des personnes.",
      },
      alpha: {
        tags: ["gather", "fill"],
        note: "Le niveau est fixé. Il détermine si le service peut utiliser une ouverture de session simple ou s’il exige une authentification forte et une vérification d’identité, ce qui n’est pas un changement de dernière étape.",
      },
      growth: {
        tags: ["keep"],
        note: "Une nouvelle transaction aux conséquences plus lourdes peut relever le niveau.",
      },
    },
  },
  {
    name: "Services de justificatifs et d’ouverture de session du gouvernement du Canada",
    family: "Identité et ouverture de session",
    kind: "duty",
    whatItIs:
      "Les services d’ouverture de session communs qu’un ministère peut utiliser plutôt que de construire les siens : le service de justificatifs à marque gouvernementale, l’option commerciale fondée sur les banques, et la plateforme d’ouverture de session fédérée plus récente. Utiliser l’un d’eux est la valeur par défaut, et une ouverture de session construite à partir de zéro est ce qui exige une justification.",
    everyService: false,
    scope:
      "Tout service destiné au public où les clients ouvrent une session. L’adhésion à une plateforme commune suppose des vérifications de conformité et des essais avant la mise en service, et c’est l’équipe de la plateforme qui les établit.",
    ownerDoes:
      "Choisit la voie des justificatifs avant que le prototype code en dur sa propre ouverture de session, et prévoit le temps d’intégration à l’échéancier.",
    whoDoes:
      "Les équipes d’identité et d’intégration du ministère, avec l’équipe d’intégration de la plateforme.",
    whoBold: ["équipes d’identité et d’intégration"],
    ownerBold: ["Choisit la voie des justificatifs", "prévoit le temps d’intégration"],
    whereItEndsUp:
      "Le ministère s’intègre par le processus de la plateforme, y compris une attestation.",
    threads: ["dependencies-and-standards"],
    cells: {
      alpha: {
        tags: ["check"],
        note: "Choisir la voie des justificatifs avant que le prototype code en dur sa propre ouverture de session.",
      },
      beta: {
        tags: ["fill", "submit"],
        note: "L’intégration, l’attestation et les essais dans l’environnement d’acceptation prennent du temps réel au calendrier et constituent un retard de lancement courant.",
      },
      maturity: {
        tags: ["keep"],
        note: "Les changements de plateforme et les migrations de justificatifs retombent sur le service.",
      },
    },
  },

  /* ------------------------------------------------------------------ */
  /* Publishing on canada.ca                                             */
  /* ------------------------------------------------------------------ */
  {
    name: "Publier sous la marque canada.ca",
    family: "Publication sur canada.ca",
    kind: "duty",
    whatItIs:
      "Les règles pour tout ce que le public voit : le domaine, l’en-tête et le pied de page globaux, la signature et le mot-symbole du gouvernement du Canada, les gabarits de page obligatoires, l’architecture de l’information, et le guide de style du contenu. Ils sont obligatoires, et ils limitent l’apparence possible d’un service et l’endroit où il peut résider.",
    everyService: false,
    scope:
      "Chaque site Web et chaque application Web destinés au public. À l’intérieur du ministère, le chef des communications répond des sites Web destinés au public et des applications mobiles, et la directive les assujettit tous deux à son annexe D, la Norme sur les sites Web et les applications mobiles destinés au public. La même directive exige l’outil officiel d’analytique Web administré par Service Canada.",
    ownerDoes:
      "Fait intervenir l’équipe Web du ministère et le chef des communications avant le premier prototype, et règle l’adresse Web avec eux avant de promettre une date de lancement.",
    whoDoes:
      "L’équipe Web du ministère et les concepteurs de contenu, sous l’organisation des communications. Le gestionnaire de compte Web du ministère dépose la demande de domaine.",
    whoBold: ["équipe Web et concepteurs de contenu", "gestionnaire de compte Web"],
    ownerBold: ["Fait intervenir l’équipe Web du ministère", "règle l’adresse Web"],
    linkKey: "directive-communications-federal-identity",
    whereItEndsUp:
      "L’adresse Web se règle à l’extérieur de l’équipe du service, par l’équipe Web du ministère. Pour une application mobile téléchargeable, l’entité de publication désignée la teste, la publie et la retire ensuite de façon indépendante : le ministère ne contrôle donc pas sa propre présence dans les magasins d’applications.",
    caveat:
      "L’instrument directeur a changé le 27 mars 2025 : la Directive sur la gestion des communications et de l’image de marque a remplacé la directive sur les communications de 2016, et son annexe D a remplacé les anciennes procédures obligatoires pour les médias sociaux et les communications Web. Tout ce qui cite l’instrument antérieur cite un instrument archivé.",
    threads: ["accessibility", "change-management"],
    cells: {
      alpha: {
        tags: ["check", "gather"],
        note: "Faire intervenir l’équipe Web du ministère et le chef des communications avant le premier prototype. Les gabarits et l’architecture de l’information se découvrent habituellement à la Bêta, quand un prototype à conception sur mesure rencontre l’équipe Web pour la première fois.",
      },
      beta: {
        tags: ["submit", "sign"],
        note: "L’adresse Web est réglée et l’outil officiel d’analytique Web est en place. Amorcez cela avec l’équipe Web du ministère avant de promettre une date de lancement aux intervenants.",
      },
      growth: {
        tags: ["keep"],
        note: "Les nouvelles pages utilisent les gabarits obligatoires.",
      },
      maturity: {
        tags: ["keep"],
        note: "L’optimisation fondée sur l’analytique est une obligation continue, non une tâche de lancement.",
      },
      sunset: {
        tags: ["close"],
        note: "Les pages sont retirées par l’équipe Web ; une application téléchargeable est retirée de façon centralisée plutôt que par le ministère.",
      },
    },
  },
  {
    name: "Web adaptatif, ou application mobile native",
    family: "Publication sur canada.ca",
    kind: "duty",
    whatItIs:
      "La règle voulant qu’un service destiné au public fonctionne correctement sur un téléphone, et que le choix d’une application téléchargeable plutôt que d’une page Web adaptative soit justifié. Une application téléchargeable ajoute aussi une étape de publication centrale que le ministère ne contrôle pas.",
    everyService: false,
    scope: "Chaque site Web et chaque application Web destinés au public.",
    ownerDoes:
      "Tranche entre le Web adaptatif et une application téléchargeable, à partir des preuves issues de la recherche sur les utilisateurs.",
    whoDoes: "L’équipe du service et l’équipe Web du ministère.",
    whoBold: ["équipe du service", "équipe Web du ministère"],
    ownerBold: [
      "Tranche entre le Web adaptatif et une application téléchargeable",
      "preuves issues de la recherche sur les utilisateurs",
    ],
    whereItEndsUp:
      "Rien pour un service adaptatif. Une application téléchargeable est remise à l’entité de publication désignée, qui la teste, la publie et la retire.",
    threads: ["accessibility"],
    cells: {
      alpha: {
        tags: ["check"],
        note: "Trancher entre le Web adaptatif et l’application native pendant le prototypage, à partir des preuves issues de la recherche sur les utilisateurs, non après la construction.",
      },
      beta: {
        tags: ["fill"],
        note: "Testé sur de vrais appareils avant le lancement. Une application native passe en plus par le processus de publication central.",
      },
      maturity: {
        tags: ["keep"],
        note: "Retesté à mesure que les appareils, les navigateurs et les systèmes d’exploitation changent.",
      },
      sunset: {
        tags: ["submit"],
        note: "Le retrait d’une application se fait de façon centralisée, ce qui constitue une dépendance au retrait comme au lancement.",
      },
    },
  },

  /* ------------------------------------------------------------------ */
  /* Access to information and openness                                  */
  /* ------------------------------------------------------------------ */
  {
    name: "Préparation à l’accès à l’information, et l’obligation de documenter",
    family: "Accès à l’information et transparence",
    kind: "duty",
    whatItIs:
      "Tout ce que le service consigne peut être demandé par une demande d’accès, et les décisions ayant une valeur opérationnelle doivent d’abord être documentées. Cela façonne ce qui est consigné, ce que le système conserve, et la possibilité de retrouver et de communiquer les documents quand quelqu’un le demande.",
    everyService: true,
    scope:
      "Tous les documents relevant du ministère. Les systèmes qui gèrent l’information et les données ont leur propre norme, qui établit ce qu’un système doit pouvoir faire avec les documents.",
    ownerDoes: "Indique quelles décisions le service prend et quelles preuves devraient être conservées.",
    whoDoes:
      "L’équipe du service construit les documents pour qu’ils puissent être retrouvés et communiqués ; le bureau de l’accès à l’information et de la protection des renseignements personnels traite les demandes.",
    whoBold: ["équipe du service", "bureau de l’accès à l’information et de la protection des renseignements personnels"],
    ownerBold: ["Indique quelles décisions le service prend", "quelles preuves devraient être conservées"],
    whereItEndsUp:
      "Le ministère répond aux demandes, et publie des résumés des demandes traitées sur le portail du gouvernement ouvert.",
    threads: ["data-stewardship"],
    cells: {
      alpha: {
        tags: ["gather"],
        note: "Indiquer quelles décisions le service prendra et quelles preuves il devrait conserver, pour que le système soit construit de façon à produire un document repérable.",
      },
      beta: {
        tags: ["fill"],
        note: "Les documents sont structurés et repérables, non éparpillés dans des systèmes que personne ne peut fouiller.",
      },
      maturity: {
        tags: ["keep"],
        note: "Des résumés des demandes traitées sont publiés chaque mois par le ministère.",
      },
    },
  },
  {
    name: "Publication proactive",
    family: "Accès à l’information et transparence",
    kind: "filing",
    whatItIs:
      "Une publication qui se fait sans que personne le demande, en vertu d’une obligation légale. Pour un service numérique acquis, celles qui s’appliquent sont les contrats de plus de 10 000 $, les subventions et contributions de plus de 25 000 $, et les titres des documents d’information.",
    everyService: false,
    scope:
      "Déclenchée par ce que fait le service plutôt que par sa taille. Tout contrat de plus de 10 000 $ déclenche la publication des contrats ; un programme de subventions ou de contributions déclenche l’autre.",
    ownerDoes: "Indique à l’autorité contractante quels contrats et quelles subventions franchissent les seuils.",
    whoDoes:
      "La fonction de publication proactive du ministère publie ; l’autorité contractante fournit les données du contrat.",
    whoBold: ["fonction de publication proactive", "autorité contractante"],
    ownerBold: ["Indique à l’autorité contractante"],
    whereItEndsUp:
      "Le ministère publie sur le portail du gouvernement ouvert, selon un cycle trimestriel pour les contrats.",
    threads: ["data-stewardship"],
    cells: {
      beta: {
        tags: ["submit"],
        note: "Le contrat qui achète la construction est publié une fois adjugé.",
      },
      maturity: {
        tags: ["keep"],
        note: "Les modifications et les renouvellements sont publiés selon le même cycle.",
      },
    },
  },
  {
    name: "Données ouvertes et information ouverte",
    family: "Accès à l’information et transparence",
    kind: "filing",
    whatItIs:
      "L’attente voulant que les données et l’information ayant une valeur opérationnelle soient diffusées ouvertement par défaut, dans des formats réutilisables, à moins que quelque chose de précis l’empêche. Info Source décrit séparément l’information que détient l’institution.",
    everyService: true,
    scope:
      "S’applique par défaut. Ce qui est réellement diffusé dépend des restrictions liées à la vie privée, à la sécurité et au droit : le travail consiste donc à déterminer ce qui peut être ouvert plutôt que si l’obligation existe.",
    ownerDoes: "Indique ce que le service détiendra qui pourrait être diffusé, et ce qui l’en empêche.",
    whoDoes: "Les fonctions de gouvernement ouvert et de gestion de l’information du ministère.",
    whoBold: ["fonctions de gouvernement ouvert et de gestion de l’information"],
    ownerBold: ["Indique ce que le service détiendra", "ce qui l’en empêche"],
    whereItEndsUp: "Le ministère publie sur le portail du gouvernement ouvert.",
    threads: ["data-stewardship"],
    cells: {
      alpha: {
        tags: ["check"],
        note: "Déterminer ce que le service détiendra qui pourrait être diffusé, et ce qui l’en empêche. Positionnement éditorial.",
      },
      maturity: {
        tags: ["keep"],
        note: "Les diffusions et la description de l’information de l’institution sont tenues à jour.",
      },
    },
  },
];
