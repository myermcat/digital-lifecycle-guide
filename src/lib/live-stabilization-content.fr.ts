import type { LucideIcon } from "lucide-react";
import {
  Archive,
  Briefcase,
  Code2,
  Coins,
  Eye,
  Flag,
  LifeBuoy,
  Server,
  Wrench,
} from "lucide-react";
import type { SourceItem } from "@/components/SourcesBlock";
import type { SubphaseExtract } from "@/components/SubphaseExtractCard";
import type { SubphaseTeamRole } from "@/components/SubphaseTeamRoles";
import type { ThreadContentSection, ThreadLinkedProse } from "@/lib/thread-rich-content";
import type { FinishBlock } from "@/components/SubphaseFinishSection";
import { LIFECYCLE_VISUALS, type LifecycleVisualAsset } from "@/lib/lifecycle-visuals";

export const STABILIZATION_EXTRACT: SubphaseExtract = {
  spine: "La Stabilisation sert à stabiliser le service sous une charge réelle et complète.",
  opening: {
    text: "La Stabilisation est la première sous-phase de l’Exploitation. Elle commence le jour du lancement, et l’équipe :",
    internalLinks: [{ phrase: "Exploitation", to: "/live" }],
  },
  workOutItems: [
    "surveille tout le service chaque jour, et pas seulement le logiciel : si les demandes sont réellement traitées, et si les personnes qui le font arrivent à suivre",
    "corrige ce qui casse en quelques jours, avec les personnes qui l’ont construit encore de garde",
    "règle les restes du lancement : inscrire le service, et clore le transfert de l’équipe de construction",
  ],
  scoped: {
    text: "La Stabilisation est courte : de quelques semaines à quelques mois. Elle survient une fois par lancement, puis brièvement de nouveau après une relance majeure.",
  },
  whatsNew: {
    label: "Nouveau depuis la Bêta",
    text: "La liste d’invitation a disparu. Toutes les personnes visées par le service peuvent l’utiliser maintenant, et chaque défaillance atteint de vraies personnes à plein volume.",
  },
  takeaway: {
    text: "La Stabilisation est terminée quand le service est devenu ennuyeux.",
    bold: [{ phrase: "La Stabilisation est terminée quand le service est devenu ennuyeux." }],
  },
};

export const STABILIZATION_LEAD: ThreadLinkedProse = {
  text: "Les premières semaines sont de la lutte contre les incendies. La Stabilisation, c’est le travail qui mène au jour où il ne reste plus d’incendie à éteindre.",
  bold: [{ phrase: "il ne reste plus d’incendie à éteindre" }],
};

/** The two things that change at launch, as a labelled pair rather than a paragraph. */
export const STABILIZATION_WHAT_CHANGED = {
  heading: "Deux choses changent le jour du lancement",
  items: [
    {
      lead: "Le volume est réel.",
      body: "Toutes les personnes visées par le service peuvent l’atteindre : ce qui arrive est donc ce que le monde réel envoie, non ce qu’une séance de recherche avait organisé.",
    },
    {
      lead: "Ce que les gens font compte désormais.",
      body: "Pendant la Création, quelqu’un remplissait un formulaire et rien ne se passait ensuite, parce que rien n’était censé se passer. Maintenant, une demande doit être reçue, évaluée par une personne, tranchée, consignée là où on peut la retrouver, et une réponse doit être donnée. Si une subvention a été promise, l’argent doit parvenir au compte de quelqu’un.",
    },
  ],
};

/** What Live tests that Create could not: the service, not the software. */
export const STABILIZATION_WHOLE_SERVICE: ThreadLinkedProse = {
  text: "C’est donc la première fois que quiconque découvre si le service entier tient, et pas seulement le logiciel : si l’équipe qui traite les demandes est assez nombreuse pour le volume qui arrive, et si quelqu’un a été complètement oublié dans le dispositif.",
  bold: [{ phrase: "le service entier tient, et pas seulement le logiciel" }],
};

export const STABILIZATION_ON_RAMP = {
  title: "Avant de commencer la Stabilisation",
  intro:
    "Ayez ceci prêt le jour du lancement :",
  items: [
    {
      text: "Le tableau de bord en fonction, avec un responsable nommé, construit en Bêta.",
      bold: [{ phrase: "Le tableau de bord en fonction," }],
      internalLinks: [{ phrase: "Bêta", to: "/create-beta" }],
    },
    {
      text: "Le modèle de soutien doté, joignable, et guidé à travers le service avant le jour du lancement.",
      bold: [{ phrase: "Le modèle de soutien doté," }],
    },
    {
      text: "L’équipe d’exploitation nommée, avec assez de personnes à l’interne pour gouverner le travail.",
      bold: [{ phrase: "L’équipe d’exploitation nommée," }],
    },
    {
      text: "Les personnes qui l’ont construit joignables. Pour une construction par un fournisseur, la garantie, c’est-à-dire la période après le lancement pendant laquelle le fournisseur corrige les défauts sans frais additionnels, précisée au contrat avec ses délais de réponse ; pour une construction interne, les développeurs encore affectés.",
      bold: [{ phrase: "Les personnes qui l’ont construit joignables." }],
    },
    {
      text: "Le critère de sortie convenu : à quoi ressemblera la stabilité, en chiffres, décidé avant le lancement.",
      bold: [{ phrase: "Le critère de sortie convenu :" }],
    },
    {
      text: "Si le service en remplace un existant, l’ancienne façon encore en marche, et un plan pour la retirer pendant la Croissance. Si le service est nouveau, ceci ne s’applique pas.",
      bold: [{ phrase: "l’ancienne façon encore en marche," }],
    },
  ] satisfies readonly ThreadLinkedProse[],
};

export const STABILIZATION_PILLAR = {
  label: "LA QUESTION DÉCISIVE",
  title: "Convenir de la fin de la Stabilisation avant qu’elle commence",
  body: {
    text: "Un soutien renforcé donne un sentiment de sécurité, et c’est là son danger : une fenêtre sans critère de sortie ne se referme jamais, et les correctifs constants masquent les faiblesses qu’ils devraient corriger. Avant le jour du lancement, convenez de ce à quoi ressemblera la stabilité en chiffres, de qui décide que la fenêtre est close, et de ce qu’il advient de ce qui reste ouvert à sa fermeture. La décision revient au responsable opérationnel de l’application, prise à partir des preuves du tableau de bord.",
    bold: [{ phrase: "convenez de ce à quoi ressemblera la stabilité en chiffres" }],
  } satisfies ThreadLinkedProse,
  href: "/thread/monitoring-and-instrumentation",
  linkLabel: "Voir comment choisir les chiffres →",
  icon: Flag,
};

export type StabilizationAccordionStage = {
  id: string;
  icon: LucideIcon;
  title: string;
  headerVisual?: LifecycleVisualAsset;
  sections: readonly ThreadContentSection[];
};

export const STABILIZATION_ACCORDION = {
  id: "running-your-service",
  title: "Exploiter votre service pendant la Stabilisation",
} as const;

export const STABILIZATION_ACCORDION_STAGES: readonly StabilizationAccordionStage[] = [
  {
    id: "watch-it-every-day",
    icon: Eye,
    title: "Le surveiller chaque jour.",
    headerVisual: LIFECYCLE_VISUALS.serviceDashboard,
    sections: [
      {
        text: "Le tableau de bord construit en Bêta est lu chaque jour désormais, parce que les premières semaines sous pleine charge font ressortir les défauts que les tests ne pouvaient pas révéler. Le fil Surveillance et instrumentation couvre à quoi sert un tableau de bord et comment en construire un.",
        bold: [{ phrase: "lu chaque jour" }],
        internalLinks: [
          { phrase: "Surveillance et instrumentation", to: "/thread/monitoring-and-instrumentation" },
        ],
      },
      {
        type: "subheading",
        text: "Le soutien vous dit des choses que le tableau de bord ne peut pas dire",
      },
      {
        text: "Le soutien est aussi un signal. Ce pour quoi les gens téléphonent, et là où ils abandonnent, indique la prochaine correction avant que le tableau de bord ne la montre.",
        bold: [{ phrase: "Le soutien est aussi un signal." }],
      },
      {
        type: "subheading",
        text: "Les cibles de rétablissement cessent d’être une supposition",
      },
      {
        text: "Les premiers incidents réels sont aussi le premier test des cibles de rétablissement fixées en Alpha. Combien de temps le service peut être hors service et quelle quantité de données il peut se permettre de perdre relevaient alors du jugement. Ce sont maintenant des mesures, et si la restauration prend deux fois plus de temps que promis, il vaut mieux le savoir avant que quiconque dépende du chiffre.",
        bold: [{ phrase: "le premier test des cibles de rétablissement fixées en Alpha" }],
      },
      {
        text: "Si le service perçoit des frais, un premier trimestre difficile a une facture prévue par la loi : en vertu de la Loi sur les frais de service, une norme de rendement non atteinte signifie remettre une partie des frais l’année suivante.",
        bold: [{ phrase: "Si le service perçoit des frais," }],
        externalLinks: [{ phrase: "Loi sur les frais de service", linkKey: "service-fees-act" }],
      },
    ],
  },
  {
    id: "fix-fast",
    icon: Wrench,
    title: "Corriger vite, en petites mises en production.",
    sections: [
      {
        text: "Sachez avant le premier incident qui appeler, et à quelle vitesse. Un événement de cybersécurité est un problème organisationnel autant que technique : les plans et procédures d’intervention du ministère doivent fonctionner au diapason du Plan de gestion des événements de cybersécurité pangouvernemental, et les événements sont signalés vers le haut par le ministère plutôt que directement par l’équipe. La voie d’escalade vient des opérations de sécurité du ministère, et elle devrait être établie avant un incident.",
        bold: [{ phrase: "Sachez avant le premier incident qui appeler, et à quelle vitesse." }],
      },
      {
        type: "subheading",
        text: "Si des renseignements personnels sont en cause, une deuxième voie s’ouvre",
      },
      {
        text: "Si des renseignements personnels sont en cause, une deuxième voie s’ouvre. Le bureau de la protection de la vie privée détermine si l’atteinte est substantielle, et une atteinte substantielle est signalée au Commissariat à la protection de la vie privée du Canada et au Secrétariat du Conseil du Trésor du Canada, les personnes touchées étant avisées. Cette décision leur revient : dites-leur donc immédiatement ce qui s’est passé, même avant que le portrait technique soit complet.",
        internalLinks: [{ phrase: "Le bureau de la protection de la vie privée", to: "/thread/privacy" }],
      },
      {
        type: "subheading",
        text: "Les correctifs sortent en petits lots et souvent",
      },
      {
        text: "La chaîne de mise en production construite en Bêta fonctionne dès le premier jour : de petits changements, mis en production souvent, chacun facile à annuler. La mise en production des changements couvre la pratique.",
        bold: [{ phrase: "de petits changements, mis en production souvent" }],
        internalLinks: [{ phrase: "mise en production des changements", to: "/thread/releasing-changes" }],
      },
      {
        type: "subheading",
        text: "Certains problèmes précoces ne sont pas du tout dans le logiciel",
      },
      {
        text: "Tous les problèmes précoces ne sont pas du code. Beaucoup sont des gens qui cherchent leur chemin : une étape déroutante, une lettre envoyée aux demandeurs qui se lit comme s’ils avaient fait quelque chose de mal, un processus qui a besoin d’un ajustement. Ces corrections figurent sur la même liste et avancent tout aussi vite.",
        bold: [{ phrase: "Tous les problèmes précoces ne sont pas du code." }],
      },
    ],
  },
  {
    id: "keep-support-close",
    icon: LifeBuoy,
    title: "Garder le soutien près de vous.",
    sections: [
      {
        text: "Le soutien répond du service avant que l’équipe n’entende quoi que ce soit : gardez donc les deux proches. Ce que le soutien entend le lundi devrait parvenir à l’équipe la même semaine.",
        bold: [{ phrase: "gardez donc les deux proches" }],
      },
      {
        text: "Observez qui a de la difficulté. Les premières semaines montrent quelles personnes le service écarte dans les faits, et l’aide destinée aux personnes qui ne peuvent pas l’utiliser seules sert vraiment maintenant.",
        bold: [{ phrase: "Observez qui a de la difficulté." }],
      },
    ],
  },
  {
    id: "taper-the-builder",
    icon: Code2,
    title: "Effectuer le transfert de l’équipe de construction graduellement, et consigner ce qu’elle sait.",
    sections: [
      {
        text: "Le retrait progressif consiste à libérer les personnes qui ont construit le service quelques-unes à la fois, plutôt que toutes le même jour, pour que l’équipe qui l’exploite ne se retrouve jamais sans quelqu’un qui comprend son fonctionnement. La plupart des services existants ont été achetés : l’équipe de construction est donc habituellement un fournisseur, qui reste joignable pendant la garantie, et le retrait progressif est convenu au contrat. Un service construit à l’interne se retire plutôt par affectation, les développeurs restant partiellement affectés jusqu’à ce que l’équipe d’exploitation tienne seule.",
        bold: [{ phrase: "warranty" }],
      },
      {
        text: "La fin de la garantie change qui paie les corrections de défauts. Le soutien se poursuit selon les modalités de soutien du contrat, et le même fournisseur revient souvent pendant la Croissance, construisant de nouvelles capacités comme travaux nouveaux et payés.",
        bold: [{ phrase: "La fin de la garantie change qui paie les corrections de défauts." }],
      },
      {
        text: "La connaissance est la seule chose qu’il vaut la peine de retenir. Les guides d’exploitation, les erreurs connues et les contournements sont consignés à mesure qu’ils sont appris, pour que l’équipe d’exploitation garde ce que savent les constructeurs. Un test utile : si l’équipe de construction disparaissait demain, l’équipe d’exploitation s’en tirerait. L’équipe du service couvre le maintien de cette capacité.",
        bold: [{ phrase: "La connaissance est la seule chose qu’il vaut la peine de retenir." }],
        internalLinks: [{ phrase: "L’équipe du service", to: "/thread/team-capability" }],
      },
    ],
  },
  {
    id: "clear-the-leftovers",
    icon: Archive,
    title: "Régler les restes du lancement.",
    sections: [
      {
        text: "Quelques obligations ponctuelles suivent le lancement, et elles sont faciles à oublier :",
      },
      {
        type: "unorderedList",
        items: [
          {
            bold: "Inscrire le service.",
            text: " Dans le Répertoire des services du GC à la prochaine mise à jour annuelle, et l’application cotée dans la gestion du portefeuille d’applications. L’équipe fournit les détails ; le bureau du DPI procède à l’inscription.",
          },
          {
            bold: "Garder l’ancienne façon en marche.",
            text: " Si le service en a remplacé un, ce n’est pas le moment de l’éteindre. Rien avant le lancement n’a éprouvé le volume réel, et la Stabilisation est le moment où l’on découvre si le nouveau service peut le porter. Pendant que vous éteignez encore des incendies, l’ancien service est la voie de retour, et une voie de retour vaut le coût d’exploiter deux choses pendant quelques semaines. Il est retiré pendant la Croissance, une fois que le nouveau service est ennuyeux depuis un moment. Si le service est nouveau, rien de tout cela ne s’applique.",
          },
          {
            bold: "Clore le transfert.",
            text: " Formation terminée, documentation à jour, et un responsable nommé pour chaque correction encore ouverte, y compris qui la paie.",
          },
        ],
      },
      {
        text: "Les deux inscriptions découlent de la Directive sur les services et le numérique.",
        externalLinks: [
          {
            phrase: "Directive sur les services et le numérique",
            linkKey: "directive-on-service-and-digital",
          },
        ],
      },
    ],
  },
  {
    id: "watch-the-money",
    icon: Coins,
    title: "Surveiller l’argent, et l’horloge.",
    sections: [
      {
        text: "Les premiers mois produisent les premiers chiffres réels de ce que le service coûte à exploiter. Les coûts liés à l’usage ne se stabilisent que sous une charge réelle : comparez-les tôt aux estimations et signalez les surprises au financement avant qu’elles s’aggravent.",
        bold: [{ phrase: "les premiers chiffres réels" }],
        internalLinks: [{ phrase: "funding", to: "/thread/funding" }],
      },
      {
        text: "L’horloge du contrat tourne déjà. Sachez dès maintenant la date de fin et le délai de renouvellement, parce que les renouvellements arrivent plus vite qu’ils n’en ont l’air.",
        bold: [{ phrase: "L’horloge du contrat tourne déjà." }],
      },
    ],
  },
];

export const STABILIZATION_TEAM = {
  title: "L’équipe qu’il vous faut",
  intro: {
    text: "L’équipe de la Bêta rétrécit pour prendre la forme d’exploitation. Les rôles minimaux (une personne peut en cumuler plusieurs) :",
    bold: [{ phrase: "Les rôles minimaux" }],
  } satisfies ThreadLinkedProse,
  roles: [
    {
      role: "Exploitation",
      icon: Server,
      body: { text: "garde le service en fonction et à jour, et met en production les correctifs." },
    },
    {
      role: "Responsable du soutien",
      icon: LifeBuoy,
      body: { text: "aide les gens à s’en sortir, et rapporte ce que disent les appels." },
    },
    {
      role: "Développeurs du fournisseur ou de l’interne",
      icon: Code2,
      body: { text: "corrigent les défauts tant que dure la garantie ou l’affectation, et transmettent la connaissance." },
    },
    {
      role: "Responsable opérationnel de l’application",
      icon: Briefcase,
      body: { text: "assume la décision que la Stabilisation est terminée." },
    },
  ] satisfies readonly SubphaseTeamRole[],
  closing: {
    text: "Gardez la connaissance à mesure que les personnes changent : guides d’exploitation, erreurs connues et décisions consignés au fur et à mesure. La Stabilisation est courte : de quelques semaines à quelques mois est typique.",
    bold: [{ phrase: "de quelques semaines à quelques mois" }],
  } satisfies ThreadLinkedProse,
};

export const STABILIZATION_CAUTION = {
  title: "Quand la Stabilisation tourne mal",
  items: [
    "Le lancement a été traité comme la ligne d’arrivée : personne n’est responsable du service en exploitation.",
    "L’ancienne façon est éteinte pendant que le nouveau service surprend encore les gens : il n’y a donc plus de voie de retour.",
    "Le soutien est débordé, et ce qu’il entend ne parvient jamais à l’équipe.",
    "Les personnes qui l’ont construit étaient parties le jour du lancement : aucune garantie, aucun transfert.",
    "Le soutien renforcé ne se termine jamais, et les correctifs constants masquent les faiblesses qu’ils devraient corriger.",
  ],
};

export const STABILIZATION_FINISH = {
  title: "Comment savoir que la Stabilisation est terminée",
  sectionId: "how-you-know-stabilization-is-finished",
  intro: {
    text: "La Stabilisation est terminée quand le critère de sortie convenu avant le lancement est atteint et que le service est devenu ennuyeux : les incidents sont rares et courants, le volume de soutien s’est stabilisé pendant que l’utilisation continue de croître, le rendement tient sous pleine charge, et l’équipe d’exploitation règle et escalade sans les personnes qui l’ont construit.",
    bold: [{ phrase: "le critère de sortie convenu avant le lancement est atteint" }],
  } satisfies ThreadLinkedProse,
  blocks: [
    {
      heading: "Ce qui reste cassé est assumé et accepté",
      paragraphs: [
        {
          text: "Ennuyeux ne veut pas dire parfait. Le critère de sortie tolère des défauts ouverts, pourvu que chacun soit diagnostiqué, ait un responsable nommé, et reste ouvert parce que quelqu’un a décidé qu’il pouvait l’être.",
        },
        {
          text: "La règle applicable à la liste ouverte a été convenue avant le lancement, dans le cadre du critère de sortie. Appliquez-la à la clôture : ce qui est accepté passe à la liste des erreurs connues de l’équipe d’exploitation, et l’on nomme qui paiera sa correction éventuelle.",
        },
      ],
    },
    {
      heading: "L’équipe de construction est libérée, et la connaissance est conservée",
      paragraphs: [
        {
          text: "Pour une construction par un fournisseur, accepter la liste ouverte clôt la garantie, c’est-à-dire la période après le lancement pendant laquelle le fournisseur corrige les défauts sans frais additionnels. Chaque défaut restant est soit corrigé sous celle-ci, soit accepté avec un responsable nommé. La clore règle qui paie à partir de ce moment : les corrections gratuites cessent et les modalités de soutien prennent le relais.",
        },
        {
          text: "Un service construit à l’interne n’a pas de garantie à clore. L’affectation des développeurs se termine une fois que l’équipe d’exploitation gère les incidents sans eux.",
        },
        {
          text: "La connaissance reste avec l’équipe d’exploitation. Le guide d’exploitation et la liste des erreurs connues lui appartiennent à la clôture, et les incidents récents en sont la preuve : réglés sans un appel aux personnes qui l’ont construit.",
        },
      ],
    },
  ] satisfies FinishBlock[],
  aside: {
    heading: "Les deux registres de la liste de clôture",
    paragraphs: [
        {
          text: "Ni l’un ni l’autre registre n’appartient à l’équipe : voici donc ce qu’est chacun et qui le dépose.",
        },
        {
          text: "Le Répertoire des services du GC consigne quels services existent et quel volume ils traitent. Le cadre désigné pour les services le dépose ; le responsable opérationnel fournit les détails. Il est actualisé une fois par année et personne ne le relance entre-temps, et c’est pourquoi c’est l’inscription qu’on oublie.",
        },
        {
          text: "La gestion du portefeuille d’applications consigne les applications derrière ces services, cotées selon la valeur opérationnelle, l’état, le coût et la criticité. C’est le seul registre qui saisit la criticité : une entrée vide signifie donc que rien à l’échelle du gouvernement ne présente le service comme essentiel. Un délégué du portefeuille le tient ; les cotes viennent du responsable opérationnel.",
        },
    ],
  },
  exits: [
    {
      lead: "En avant vers la Croissance,",
      rest: {
        text: "quand il y a de vraies nouvelles capacités à construire.",
      },
      href: "/live-growth",
    },
    {
      lead: "Ou vers la Maturité,",
      rest: {
        text: "quand le service a déjà la portée dont il a besoin. Tous les services ne croissent pas, et passer directement au long régime stable est un parcours normal.",
      },
      href: "/live-maturity",
    },
    {
      lead: "Retour vers une reconstruction,",
      rest: {
        text: "quand des semaines de correction n’arrivent pas à stabiliser le service et que le défaut est plus profond que des correctifs. C’est rare, et c’est une décision de l’ampleur d’une Création.",
        internalLinks: [{ phrase: "Création", to: "/create" }],
      },
    },
  ],
  offRamp: {
    intro: {
      text: "La fenêtre se referme sur des preuves. Avant de passer à la suite, ayez ceci prêt :",
      bold: [{ phrase: "La fenêtre se referme sur des preuves." }],
    } satisfies ThreadLinkedProse,
    items: [
      {
        text: "Le critère de sortie atteint, avec les chiffres qui le démontrent.",
        bold: [{ phrase: "Le critère de sortie atteint," }],
      },
      {
        text: "Le guide d’exploitation et la liste des erreurs connues, appartenant à l’équipe d’exploitation.",
        bold: [{ phrase: "Le guide d’exploitation et la liste des erreurs connues," }],
      },
      {
        text: "La garantie close, pour une construction par un fournisseur : défauts ouverts corrigés ou consciemment acceptés, chacun avec un responsable nommé. La clore règle qui paie les corrections ; les modalités de soutien du contrat se poursuivent.",
        bold: [{ phrase: "La garantie close," }],
      },
      {
        text: "Les inscriptions faites : le service dans le Répertoire des services du GC, l’application cotée dans la gestion du portefeuille d’applications.",
        bold: [{ phrase: "Les inscriptions faites :" }],
      },
      {
        text: "L’ancienne façon encore en marche, s’il y en avait une. Elle est retirée au début de la Croissance, pas ici, pour qu’une voie de retour existe tant que le nouveau service surprend encore les gens.",
        bold: [{ phrase: "L’ancienne façon encore en marche," }],
      },
      {
        text: "Un tableau de bord auquel l’équipe se fie, montrant les chiffres selon lesquels elle exploite réellement le service.",
        bold: [{ phrase: "Un tableau de bord auquel l’équipe se fie," }],
      },
    ] satisfies readonly ThreadLinkedProse[],
  },
};

// Sources de la page Stabilisation. Ce tableau vit ici, et non dans
// LiveStabilizationPage.tsx, parce que la version française permute les modules par chemin
// source (x.ts -> x.fr.ts) et ne permute jamais rien sous src/components : un tableau
// laissé dans le composant s’afficherait en anglais sur le site français.
export const STABILIZATION_SOURCES: SourceItem[] = [
  {
    label: "Modèles et outils",
    linkKey: "gc-service-inventory",
    description:
      "Répertoire des services du GC (Gouvernement ouvert) : le jeu de données où le nouveau service doit être inscrit.",
  },
  {
    label: "Modèles et outils",
    linkKey: "apm-dataset",
    description:
      "Détails du portefeuille d’applications du GC (Gouvernement ouvert) : le jeu de données qu’alimente le dossier d’application du ministère.",
  },
  {
    label: "Instrument directeur",
    linkKey: "directive-on-service-and-digital",
    description:
      "Directive sur les services et le numérique (SCT).",
  },
  {
    label: "Instrument directeur",
    linkKey: "guideline-service-digital",
    description:
      "Ligne directrice sur les services et le numérique (SCT).",
  },
  {
    label: "Instrument directeur",
    linkKey: "service-fees-act",
    description:
      "Loi sur les frais de service.",
  },
  {
    label: "Instrument directeur",
    linkKey: "charging-directive",
    description:
      "Directive sur l’imputation et les autorisations financières spéciales (SCT) : les règles derrière la remise des frais.",
  },
  {
    label: "Référence complémentaire",
    linkKey: "apm-gcwiki",
    description:
      "Carrefour d’orientation sur la gestion du portefeuille d’applications (wiki GCcollab).",
  },
  {
    label: "Référence complémentaire",
    linkKey: "oag-phoenix-build",
    description:
      "Rapports du printemps 2018 du BVG, rapport 1 : Construction et mise en œuvre du système de paye Phoenix.",
  },
  {
    label: "Collectivités",
    description:
      "Collectivité de la gestion du portefeuille d’applications : sur GCXchange, cherchez le nom.",
  },
];
