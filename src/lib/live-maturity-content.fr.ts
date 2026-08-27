import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Briefcase,
  CalendarClock,
  ClipboardList,
  Code2,
  Coins,
  LifeBuoy,
  Server,
  ShieldCheck,
  Telescope,
  Users,
} from "lucide-react";
import type { SourceItem } from "@/components/SourcesBlock";
import type { SubphaseTeamRole } from "@/components/SubphaseTeamRoles";
import type { ThreadContentSection, ThreadLinkedProse } from "@/lib/thread-rich-content";
import type { FinishBlock } from "@/components/SubphaseFinishSection";
import { GOOD_CONTRACT_PATH } from "@/lib/reference-paths";
import { LIFECYCLE_VISUALS, type LifecycleVisualAsset } from "@/lib/lifecycle-visuals";

export const MATURITY_LEAD: ThreadLinkedProse = {
  text: "Un service mature fonctionne chaque jour parce qu’une équipe le maintient en fonction. Des composants cessent d’être soutenus, des personnes changent d’emploi, et le financement et le contrat avancent vers leurs dates de fin, et rien de tout cela ne s’arrête parce que le service semble aller bien. L’équipe garde une longueur d’avance grâce à un cycle : surveiller, corriger, chercher, déclarer, renouveler. L’essentiel de la vie d’un service se passe en Maturité, et l’essentiel de son travail aussi.",
};

export const MATURITY_ON_RAMP = {
  title: "Avant de commencer la Maturité",
  intro:
    "On entre en Maturité depuis la Stabilisation quand un service a déjà la portée dont il a besoin, ou depuis la Croissance quand la portée se stabilise. Ayez ceci prêt :",
  items: [
    {
      text: "Un service stable. Les incidents sont rares et courants, le rendement tient, et le volume de soutien s’est stabilisé.",
      bold: [{ phrase: "Un service stable." }],
    },
    {
      text: "L’équipe d’exploitation nommée, avec une tranche constante de temps de développeur pour les correctifs et les petites améliorations.",
      bold: [{ phrase: "L’équipe d’exploitation nommée," }],
    },
    {
      text: "Un tableau de bord auquel l’équipe se fie, lu à une cadence régulière, avec un responsable nommé, et un moyen d’entendre directement les utilisateurs.",
      bold: [{ phrase: "Un tableau de bord auquel l’équipe se fie," }],
    },
    {
      text: "Les dates de renouvellement consignées : quand le contrat se termine, quand l’enveloppe de financement se termine, et le délai que chaque renouvellement exige.",
      bold: [{ phrase: "Les dates de renouvellement consignées :" }],
    },
    {
      text: "La connaissance appartenant à l’équipe d’exploitation : guides d’exploitation, erreurs connues, et les décisions qui ont façonné le service.",
      bold: [{ phrase: "La connaissance appartenant à l’équipe d’exploitation :" }],
    },
  ] satisfies readonly ThreadLinkedProse[],
};

export const MATURITY_PILLAR = {
  label: "LA QUESTION DÉCISIVE",
  title: "Entamer chaque renouvellement avant qu’il paraisse urgent",
  body: {
    text: "Rien en Maturité n’échoue aussi prévisiblement qu’un renouvellement entamé tard. Les enveloppes de financement se terminent à une date. Les contrats se terminent à une date. Les deux exigent des mois de préavis, parce qu’une décision de financement avance au rythme des approbations et que remettre un contrat en concurrence prend encore plus de temps. Commencez tard et il ne vous reste qu’une option : prolonger avec le fournisseur actuel aux conditions actuelles. Chaque prolongation d’urgence aggrave le verrouillage. Inscrivez chaque date de fin à un calendrier que l’équipe consulte réellement, avec la date de mise en route à côté.",
    bold: [
      { phrase: "Inscrivez chaque date de fin à un calendrier que l’équipe consulte réellement" },
    ],
    internalLinks: [
      { phrase: "une décision de financement", to: "/thread/funding" },
    ],
  } satisfies ThreadLinkedProse,
  href: "/thread/procurement",
  linkLabel: "Voir comment se planifient les renouvellements de contrat →",
  icon: CalendarClock,
};

export type MaturityAccordionStage = {
  id: string;
  icon: LucideIcon;
  title: string;
  headerVisual?: LifecycleVisualAsset;
  sections: readonly ThreadContentSection[];
};

export const MATURITY_ACCORDION = {
  id: "running-your-service",
  title: "Exploiter votre service pendant la Maturité",
} as const;

export const MATURITY_ACCORDION_STAGES: readonly MaturityAccordionStage[] = [
  {
    id: "keep-it-working",
    icon: Activity,
    title: "Garder le service fonctionnel.",
    headerVisual: LIFECYCLE_VISUALS.serviceDashboard,
    sections: [
      {
        text: "Le cycle de santé des sous-phases antérieures continue de tourner, à un rythme plus régulier. Le tableau de bord est lu à une cadence, de petits changements sortent par la même chaîne, et les mises à jour sont appliquées à mesure qu’elles arrivent. Le fil Surveillance et instrumentation et le fil Mise en production des changements portent la pratique.",
        bold: [{ phrase: "Le cycle de santé" }],
        internalLinks: [
          { phrase: "Surveillance et instrumentation", to: "/thread/monitoring-and-instrumentation" },
          { phrase: "Mise en production des changements", to: "/thread/releasing-changes" },
        ],
      },
      {
        type: "subheading",
        text: "Des composants cessent d’être soutenus selon leur propre calendrier",
      },
      {
        text: "Les composants vieillissent selon leur propre calendrier. Les bibliothèques, plateformes et produits achetés sur lesquels repose le service ont chacun une date de fin de soutien, et un composant au-delà de cette date cesse de recevoir des correctifs de sécurité. Suivez les dates, et planifiez chaque remplacement avant la fin de son soutien. Les dépendances et normes couvrent cette veille.",
        bold: [{ phrase: "Les composants vieillissent selon leur propre calendrier." }],
        internalLinks: [
          { phrase: "dépendances et normes", to: "/thread/dependencies-and-standards" },
        ],
      },
      {
        type: "subheading",
        text: "Quelqu’un à l’extérieur de l’équipe surveille cela",
      },
      {
        text: "Le gouvernement du Canada en fait aussi le suivi : l’état de santé de chaque application est consigné dans l’outil de gestion du portefeuille d’applications du ministère, et exploiter une technologie non soutenue est interdit par la Norme sur la technologie de l’information à risque. Le bureau du DPI fait rapport; l’équipe tient à jour le dossier de son application.",
        bold: [{ phrase: "exploiter une technologie non soutenue est interdit" }],
        externalLinks: [
          { phrase: "Norme sur la technologie de l’information à risque", linkKey: "standard-at-risk-it" },
        ],
      },
    ],
  },
  {
    id: "keep-it-good-for-users",
    icon: Users,
    title: "Le garder bon pour les personnes qui l’utilisent.",
    sections: [
      {
        text: "Le tableau de bord montre où les gens ont de la difficulté; la recherche auprès des gens eux-mêmes montre pourquoi. Une ronde de recherche sur les utilisateurs une fois par année est un plancher courant, et les constats entrent dans le carnet de produit comme tout autre travail.",
        bold: [{ phrase: "la recherche auprès des gens eux-mêmes montre pourquoi" }],
        internalLinks: [
          { phrase: "recherche sur les utilisateurs", to: "/thread/user-research" },
          { phrase: "backlog", to: "/thread/backlog" },
        ],
      },
      {
        type: "subheading",
        text: "L’accessibilité recule si personne ne la teste de nouveau",
      },
      {
        text: "Les normes évoluent, les technologies d’assistance se mettent à jour, et de petites mises en production ajoutent de petits obstacles. Testez à une cadence régulière, avec des technologies d’assistance et avec les personnes les plus susceptibles d’être exclues, et corrigez ce que les tests révèlent. À partir de décembre 2027, les résultats de chaque service alimentent aussi la déclaration d’accessibilité du ministère. L’accessibilité couvre la façon dont les tests se font.",
        bold: [{ phrase: "de petites mises en production ajoutent de petits obstacles" }],
        internalLinks: [{ phrase: "L’accessibilité couvre la façon dont les tests se font", to: "/thread/accessibility" }],
      },
      {
        type: "subheading",
        text: "Les services de part et d’autre du vôtre continuent de changer",
      },
      {
        text: "Le service n’est qu’une étape d’un parcours plus long. À mesure qu’il change, gardez au diapason les services de part et d’autre et les autres canaux : scripts du centre d’appels mis à jour, personnel des opérations reformé, équipes partenaires informées. La prestation intégrée couvre ce métier.",
        bold: [{ phrase: "une étape d’un parcours plus long" }],
        internalLinks: [
          { phrase: "prestation intégrée", to: "/thread/joined-up-delivery" },
        ],
      },
    ],
  },
  {
    id: "keep-it-safe-and-lawful",
    icon: ShieldCheck,
    title: "Le garder sûr et conforme à la loi.",
    sections: [
      {
        text: "Aucun des travaux de protection ne s’arrête sous prétexte que rien n’a mal tourné :",
      },
      {
        type: "unorderedList",
        items: [
          {
            text: "Gardé sécurisé. Correctifs appliqués selon le calendrier, accès vérifiés, vulnérabilités testées, et plan d’intervention tenu à jour. La sécurité porte la pratique.",
            bold: [{ phrase: "Gardé sécurisé." }],
            internalLinks: [{ phrase: "sécurité", to: "/thread/security" }],
          },
          {
            text: "Gardé privé. L’évaluation de la protection de la vie privée correspond au service tel qu’il fonctionne aujourd’hui, et elle est mise à jour quand le service change les renseignements personnels qu’il utilise pour prendre des décisions concernant des personnes. La protection de la vie privée couvre la façon de faire.",
            bold: [{ phrase: "Gardé privé." }],
            internalLinks: [{ phrase: "protection de la vie privée", to: "/thread/privacy" }],
          },
          {
            text: "Gardé rétablissable. La criticité du service, et la vitesse à laquelle il doit revenir, sont redemandées selon le propre cycle du ministère, et la restauration est testée. Aucun intervalle n’est fixé centralement : demandez donc au coordonnateur de la continuité des activités du ministère à quelle fréquence cela revient. C’est cette réponse-là qui lie le service.",
            bold: [{ phrase: "Gardé rétablissable." }],
          },
          {
            text: "Les données bien gardées. Les périodes de conservation sont appliquées et la disposition se fait selon son calendrier : rien n’est détruit sans l’autorisation qui le couvre. L’intendance des données porte le portrait complet.",
            bold: [{ phrase: "Les données bien gardées." }],
            internalLinks: [
              { phrase: "intendance des données", to: "/thread/data-stewardship" },
            ],
          },
          {
            text: "Décisions automatisées retestées. Si le service en prend, les tests de biais reviennent et l’évaluation de l’incidence algorithmique est réexaminée à mesure que le service change. Le fil Éthique et biais couvre le calendrier.",
            bold: [{ phrase: "Décisions automatisées retestées." }],
            internalLinks: [
              { phrase: "Éthique et biais", to: "/thread/ethics-and-bias" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "make-the-yearly-filings",
    icon: ClipboardList,
    title: "Faire les déclarations annuelles.",
    sections: [
      {
        text: "Un service en fonction a des obligations de registre qui reviennent :",
      },
      {
        type: "unorderedList",
        items: [
          {
            bold: "Le Répertoire des services du GC,",
            text: " mis à jour chaque année par l’appel de données du ministère. L’équipe fournit les chiffres de son service; le cadre désigné les dépose.",
          },
          {
            bold: "Le dossier de gestion du portefeuille d’applications,",
            text: " tenu à jour, pour que le portrait des applications du ministère reste fidèle.",
          },
          {
            bold: "Les normes de service, réexaminées régulièrement.",
            text: " La directive exige un examen régulier; les réexaminer chaque année, au regard du rendement de l’année, est le conseil courant.",
          },
          {
            text: "Si le service perçoit des frais, la Loi sur les frais de service ajoute des obligations prévues par la loi : un rapport sur les frais déposé au Parlement chaque exercice, des frais rajustés annuellement selon l’inflation, et une partie des frais remise quand la norme de rendement n’a pas été atteinte.",
            bold: [{ phrase: "Si le service perçoit des frais," }],
            externalLinks: [
              { phrase: "Loi sur les frais de service", linkKey: "service-fees-act" },
            ],
          },
        ],
      },
      {
        text: "Les trois premières découlent de la Directive sur les services et le numérique.",
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
    id: "renew-before-it-runs-out",
    icon: Coins,
    title: "Renouveler avant que quoi que ce soit expire.",
    sections: [
      {
        text: "Deux horloges tournent pendant la Maturité, et chaque renouvellement a son propre délai :",
      },
      {
        type: "unorderedList",
        items: [
          {
            bold: "Le financement.",
            text: " Une enveloppe à durée limitée se termine à sa date et se renouvelle par une nouvelle décision de financement, et les approbations avancent en mois. L’argent de fonctionnement lui-même arrive par le Budget des dépenses chaque année.",
          },
          {
            bold: "Le contrat.",
            text: " Renouveler signifie choisir tôt : exercer les années d’option, remettre en concurrence, ou passer à autre chose. Chaque parcours exige un délai différent, et la remise en concurrence exige le plus long. La marge que le contrat a laissée pour de nouveaux travaux, ses options et son plafond d’autorisations de tâches, se consomme aussi au fil des ans : vérifiez donc ce qu’il en reste.",
          },
        ],
      },
      {
        text: "Entre les renouvellements, tenez le fournisseur au contrat : niveaux de service déclarés, obligations de sortie gardées réelles, verrouillage surveillé. « À quoi ressemble un bon contrat » montre les clauses sur lesquelles cela repose.",
        bold: [{ phrase: "tenez le fournisseur au contrat" }],
        internalLinks: [
          { phrase: "À quoi ressemble un bon contrat", to: GOOD_CONTRACT_PATH },
        ],
      },
    ],
  },
  {
    id: "watch-for-the-exit",
    icon: Telescope,
    title: "Guetter les signaux qui annoncent le Retrait.",
    sections: [
      {
        text: "Tout service se termine un jour, et guetter la fin fait partie d’une bonne exploitation. Le Canada intègre un point de contrôle : la Directive sur les services et le numérique exige que chaque service soit examiné avec ses clients, partenaires et intervenants au moins une fois tous les cinq ans, en examinant la refonte, l’adoption en ligne, l’efficience et les autres modes de prestation.",
        bold: [{ phrase: "au moins une fois tous les cinq ans" }],
      },
      {
        text: "Cinq ans est le plancher. Les équipes qui examinent plus souvent voient les signaux plus tôt, et un survol léger des mêmes questions une fois par année suffit souvent. Les signaux à surveiller :",
        bold: [{ phrase: "Cinq ans est le plancher." }],
      },
      {
        type: "unorderedList",
        items: [
          {
            bold: "Le besoin a disparu, ou il est servi ailleurs.",
            text: " La politique derrière le service change, ou un autre service absorbe ce que celui-ci faisait.",
          },
          {
            bold: "Les utilisateurs s’en vont.",
            text: " La base rétrécit jusqu’à ce que le coût d’exploitation du service ne corresponde plus au nombre de personnes qu’il sert.",
          },
          {
            bold: "La technologie perd son soutien.",
            text: " Une plateforme ou un produit sur lequel repose le service met fin à son soutien, et le remplacer coûterait autant que de repartir à neuf.",
          },
        ],
      },
      {
        text: "Quand les signaux tiennent, le passage vers le Retrait est planifié et payé pendant que l’argent actuel est encore là. Une sortie est un vrai travail — transférer les données, fonctionner en parallèle, clore les contrats proprement — et elle se mesure en mois : le premier chiffre à apprendre est donc combien de temps une sortie prendrait réellement. À partir de là, évitez les nouvelles personnalisations qui aggravent le verrouillage : elles ne font qu’allonger la sortie.",
        bold: [{ phrase: "planifié et payé pendant que l’argent actuel est encore là" }],
        internalLinks: [{ phrase: "Retrait", to: "/sunset" }],
      },
      {
        type: "subheading",
        text: "Si quelque chose doit remplacer ce service, commencez à compter à rebours dès maintenant",
      },
      {
        text: "C’est la partie qui prend les ministères au dépourvu, et elle vaut la peine d’être travaillée avec un calendrier. L’ancien service ne s’éteint pas au lancement du nouveau. Il reste disponible jusqu’à ce que le nouveau soit stable depuis un certain temps, c’est-à-dire au début de la Croissance du remplacement. Tout ce qui précède doit se produire d’abord : la Découverte du remplacement, son Alpha, un concours si quelque chose est acheté, sa Bêta, puis sa Stabilisation.",
        bold: [{ phrase: "L’ancien service ne s’éteint pas au lancement du nouveau." }],
      },
      {
        text: "Compté à rebours à partir du jour où vous aimeriez que ce service ait disparu, cela fait des années, non des mois. Et pendant l’essentiel de cette période, vous payez pour deux choses à la fois : ce service encore en fonction, qui a encore besoin de ses correctifs et de ses déclarations, et le remplacement financé, mis en concurrence et construit à côté.",
        bold: [{ phrase: "cela fait des années, non des mois" }],
      },
      {
        text: "L’argent et les personnes doivent donc être planifiés pour les deux, et l’équipe doit s’attendre à une période où elle met un service hors service et en met un autre en place dans les mêmes semaines. Ni l’un ni l’autre travail ne devient plus facile parce qu’on l’a commencé tard.",
      },
    ],
  },
];

export const MATURITY_TEAM = {
  title: "L’équipe qu’il vous faut",
  intro: {
    text: "Un service mature fonctionne avec une équipe plus petite qu’une construction, et cette forme tient pendant des années (une personne peut cumuler plusieurs rôles) :",
    bold: [{ phrase: "une équipe plus petite qu’une construction" }],
  } satisfies ThreadLinkedProse,
  roles: [
    {
      role: "Exploitation",
      icon: Server,
      body: { text: "garde le service en fonction, à jour et surveillé, et met en production les correctifs." },
    },
    {
      role: "Responsable du soutien",
      icon: LifeBuoy,
      body: { text: "aide les gens à s’en sortir, et rapporte ce que disent les appels." },
    },
    {
      role: "Développeurs, du fournisseur ou de l’interne",
      icon: Code2,
      body: {
        text: "une tranche constante de capacité pour les correctifs et les petites améliorations. La tranche peut être petite; un service qui cesse de s’améliorer vieillit vers un remplacement forcé.",
      },
    },
    {
      role: "Responsable opérationnel de l’application",
      icon: Briefcase,
      body: {
        text: "assume le calendrier de renouvellement, les déclarations annuelles, et la décision que la Maturité se termine.",
      },
    },
  ] satisfies readonly SubphaseTeamRole[],
  closing: {
    text: "La Maturité se mesure en années : toutes les personnes de cette liste finiront donc par partir. Ce qui traverse les changements, c’est ce qui a été consigné : les guides d’exploitation, les erreurs connues, et les raisons derrière les décisions. Traitez la rédaction comme faisant partie du travail. L’équipe du service couvre le maintien de la capacité.",
    bold: [{ phrase: "Ce qui traverse les changements, c’est ce qui a été consigné :" }],
    internalLinks: [{ phrase: "L’équipe du service", to: "/thread/team-capability" }],
  } satisfies ThreadLinkedProse,
};

export const MATURITY_CAUTION = {
  title: "Quand la Maturité tourne mal",
  items: [
    "L’amélioration s’arrête : le service est corrigé mais jamais amélioré, et il vieillit vers un remplacement forcé.",
    "Un renouvellement commence tard, et la seule option qui reste est une prolongation d’urgence aux conditions du fournisseur.",
    "Le cycle de santé tourne sur papier : les cases sont cochées, le tableau de bord est lu, et rien ne change en conséquence.",
    "Personne de l’extérieur ne regarde jamais le service : l’équipe cesse donc de voir ses propres lacunes.",
    "La connaissance part avec les gens : l’équipe peut encore exploiter le service mais ne le comprend plus.",
  ],
};

export const MATURITY_FINISH = {
  title: "Comment savoir que la Maturité est terminée",
  sectionId: "how-you-know-maturity-is-finished",
  intro: {
    text: "La Maturité n’a pas de ligne d’arrivée propre. Elle se termine quand quelque chose hors de la routine change : un nouveau mandat arrive, ou les signaux disent que le temps du service tire à sa fin. Dans les deux cas le passage est du travail, et il commence pendant que l’argent et l’équipe actuels sont encore là.",
    bold: [{ phrase: "La Maturité n’a pas de ligne d’arrivée propre." }],
  } satisfies ThreadLinkedProse,
  blocks: [
    {
      heading: "La décision de partir est prise sur des preuves et consignée",
      paragraphs: [
        {
          text: "Les preuves existent déjà : le tableau de bord, les coûts d’exploitation, et l’examen avec les clients et les partenaires qui revient au moins une fois tous les cinq ans. L’argumentaire du départ s’assemble à partir de relevés que l’équipe tient déjà.",
        },
        {
          text: "Le responsable opérationnel de l’application tranche et consigne le motif, avec les constats de l’examen, le tableau de bord et les coûts en pièces jointes. C’est ce relevé qui servira de base à la prochaine demande de financement, et c’est la première chose que lira celui qui héritera du service.",
        },
      ],
    },
    {
      heading: "L’argent de la suite est mis de côté avant la fin du financement actuel",
      paragraphs: [
        {
          text: "Le travail qui suit coûte de l’argent. Un retour à la Croissance exige une nouvelle décision de financement pour la construction; un retrait est en soi des mois de travail financé. Ni l’un ni l’autre ne peut être payé à même une enveloppe déjà terminée.",
        },
        {
          text: "Entamez la demande pendant que l’enveloppe actuelle paie encore le service. Une décision de financement avance au rythme des approbations, et les prolongations achetées entre-temps le sont aux conditions du fournisseur.",
        },
      ],
    },
    {
      heading: "La connaissance et les registres sont prêts à être transmis",
      paragraphs: [
        {
          text: "Celui qui suit hérite du service par ce qui a été consigné. Mettez à jour les guides d’exploitation, les erreurs connues, les décisions et les obligations de fin de contrat avant le passage, parce que les personnes qui détiennent la version non écrite partent avec elle.",
        },
        {
          text: "Les deux entrées de registre doivent correspondre à la réalité au moment du passage, parce que celui qui suit les fermera ou les transférera. La fermeture elle-même se fait au Retrait.",
        },
      ],
    },
  ] satisfies FinishBlock[],
  aside: {
    heading: "Pourquoi aucun point de contrôle ne clôt la Maturité",
    paragraphs: [
        {
          text: "Ceci existe pour répondre à une question que soulèvent les blocs ci-dessus : où est le point de contrôle qui clôt la Maturité? Il n’y en a pas, et la raison façonne toute la section.",
        },
        {
          text: "Chaque instrument qui atteint la Maturité y arrive comme une obligation d’entretien : déclarations renouvelées, autorisations maintenues, examens récurrents. Les gestes de fermeture appartiennent au Retrait. Aucune approbation ne met donc fin à la Maturité. Le responsable opérationnel lit les preuves et décide, et les blocs ci-dessus sont ce dont cette décision a besoin.",
        },
    ],
  },
  exits: [
    {
      lead: "Retour à la Croissance,",
      rest: {
        text: "quand un nouveau mandat ou une nouvelle capacité importante doit être construit. Les points de contrôle antérieurs reviennent avec.",
      },
      href: "/live-growth",
    },
    {
      lead: "En avant vers le Retrait,",
      rest: {
        text: "quand les signaux tiennent : le besoin comblé ailleurs, les utilisateurs qui partent, le fondement stratégique disparu, ou la plateforme qui se termine. Retirer un service correctement est un travail à part entière, et il commence pendant que l’argent est encore là.",
      },
      href: "/sunset",
    },
    {
      lead: "Retour dans une fenêtre de type Stabilisation,",
      rest: {
        text: "après un changement de plateforme majeur ou une défaillance grave, pendant que le service se stabilise de nouveau. C’est rare.",
      },
      href: "/live-stabilization",
    },
  ],
  offRamp: {
    intro: {
      text: "Quelle que soit la sortie, partez en bon ordre. Avant de passer à la suite, ayez ceci prêt :",
      bold: [{ phrase: "partez en bon ordre" }],
    } satisfies ThreadLinkedProse,
    items: [
      {
        text: "La décision prise sur des preuves : les constats de l’examen, le tableau de bord et les coûts, consignés comme motif de la sortie.",
        bold: [{ phrase: "La décision prise sur des preuves :" }],
      },
      {
        text: "L’argent de la suite mis de côté avant la fin du financement actuel.",
        bold: [{ phrase: "L’argent de la suite mis de côté" }],
      },
      {
        text: "La connaissance à jour : guides d’exploitation, décisions, et obligations de fin de contrat, pour que celui qui suit hérite d’un service qu’il peut comprendre.",
        bold: [{ phrase: "La connaissance à jour :" }],
      },
      {
        text: "Les inscriptions fidèles : l’entrée du service au répertoire et le dossier de son application correspondent à la réalité, prêts à être fermés ou transférés par celui qui suit.",
        bold: [{ phrase: "Les inscriptions fidèles :" }],
      },
    ] satisfies readonly ThreadLinkedProse[],
  },
};

export const MATURITY_SOURCES: SourceItem[] = [
  {
    label: "Modèles et outils",
    linkKey: "gc-service-inventory",
    description:
      "Répertoire des services du GC (Gouvernement ouvert) : le jeu de données où le dossier du service est tenu à jour.",
  },
  {
    label: "Instrument directeur",
    linkKey: "policy-on-service-and-digital",
    description:
      "Politique sur les services et le numérique (SCT).",
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
    linkKey: "standard-at-risk-it",
    description:
      "Norme sur la technologie de l’information à risque (SCT).",
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
      "Directive sur l’imputation et les autorisations financières spéciales (SCT) : comment les frais de service sont établis et examinés.",
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
      "Rapports du printemps 2018 du BVG, rapport 1 : Construction et mise en œuvre du système de paye Phoenix.",
  },
  {
    label: "Collectivités",
    description:
      "Collectivité de la gestion du portefeuille d’applications : sur GCXchange, cherchez le nom.",
  },
];
