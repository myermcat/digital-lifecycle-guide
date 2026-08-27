import type { LucideIcon } from "lucide-react";
import {
  Archive,
  Briefcase,
  Code2,
  Compass,
  Gauge,
  Layers,
  LifeBuoy,
  Megaphone,
  Repeat,
  Server,
  Shield,
  ShoppingCart,
} from "lucide-react";
import type { SubphaseTeamRole } from "@/components/SubphaseTeamRoles";
import type { ThreadContentSection, ThreadLinkedProse } from "@/lib/thread-rich-content";
import type { FinishBlock } from "@/components/SubphaseFinishSection";
import type { SourceItem } from "@/components/SourcesBlock";
import { GOOD_CONTRACT_PATH } from "@/lib/reference-paths";

export const GROWTH_LEAD: ThreadLinkedProse = {
  text: "La Croissance, c’est quand l’équipe se remet à construire. Le service est stable en dessous, et le travail se tourne vers la suite : les fonctionnalités que la première version a laissées de côté, les personnes que le service n’a pas encore rejointes, la charge qu’il n’a pas encore portée. Chaque ajout important est construit à l’intérieur d’un service en fonction, et il ne doit pas casser ce qui fonctionne déjà.",
};

export const GROWTH_ON_RAMP = {
  title: "Avant de commencer la Croissance",
  intro:
    "La Croissance commence quand un service stable a de vraies nouvelles capacités à construire. Ayez ceci prêt :",
  items: [
    {
      text: "Un service stable. Le critère de sortie de la Stabilisation atteint, et l’équipe d’exploitation autonome.",
      bold: [{ phrase: "Un service stable." }],
      internalLinks: [{ phrase: "Stabilisation", to: "/live-stabilization" }],
    },
    {
      text: "L’ajout nommé, avec la preuve qu’il est nécessaire : constats de recherche, un mandat, ou une demande à laquelle le service ne peut pas répondre tel quel.",
      bold: [{ phrase: "L’ajout nommé," }],
    },
    {
      text: "L’argent pour les nouveaux travaux. Les nouvelles capacités sont financées séparément, le délai d’approbation est réel, et les coûts d’exploitation que l’ajout entraîne doivent tenir dans le budget de fonctionnement existant du ministère.",
      bold: [{ phrase: "L’argent pour les nouveaux travaux." }],
    },
    {
      text: "La marge contractuelle vérifiée : ce que le plafond des autorisations de tâches et les années d’option contiennent encore, avant de promettre des dates.",
      bold: [{ phrase: "La marge contractuelle vérifiée :" }],
    },
    {
      text: "Une équipe capable de construire de nouveau : les rôles d’exploitation restent, et la capacité de construction revient à leurs côtés.",
      bold: [{ phrase: "Une équipe capable de construire de nouveau :" }],
    },
  ] satisfies readonly ThreadLinkedProse[],
};

export const GROWTH_PILLAR = {
  label: "LA QUESTION DÉCISIVE",
  title: "Traiter chaque ajout important comme son propre petit cycle de vie",
  body: {
    text: "Un service en fonction donne l’impression que construire est peu coûteux : la plateforme existe, les utilisateurs sont là, et une nouvelle fonctionnalité semble à une mise en production près. Cette impression saute le travail qui a rendu le service bon la première fois. Un ajout important change ce qu’est le service : il obtient donc sa propre petite Découverte, Alpha et Bêta, à la taille de la fonctionnalité, et il ramène les points de contrôle antérieurs : vie privée, automatisation, architecture, approvisionnement, entre autres.",
    bold: [{ phrase: "sa propre petite Découverte, Alpha et Bêta" }],
  } satisfies ThreadLinkedProse,
  href: "/create",
  linkLabel: "Voir le cycle de construction complet →",
  icon: Repeat,
};

export type GrowthAccordionStage = {
  id: string;
  icon: LucideIcon;
  title: string;
  sections: readonly ThreadContentSection[];
};

export const GROWTH_ACCORDION = {
  id: "running-your-service",
  title: "Exploiter votre service pendant la Croissance",
} as const;

export const GROWTH_ACCORDION_STAGES: readonly GrowthAccordionStage[] = [
  {
    id: "retire-the-old-way",
    icon: Archive,
    title: "Retirer l’ancienne façon, si le service en a remplacé une.",
    sections: [
      {
        text: "La Stabilisation a gardé l’ancien service en marche exprès, parce que pendant que le nouveau surprenait encore les gens, c’était la voie de retour. La Croissance commence quand le nouveau service ne surprend plus personne, et c’est le moment où la voie de retour ne vaut plus la peine d’être payée.",
        bold: [{ phrase: "c’était la voie de retour" }],
      },
      {
        type: "subheading",
        text: "Ce qui doit être vrai avant d’éteindre",
      },
      {
        type: "unorderedList",
        items: [
          {
            text: "Le nouveau service a porté un volume réel pendant un cycle complet de ce qu’il fait : un mois complet, une période d’admission complète, une période de déclaration complète, selon ce qui constitue le test honnête pour ce service.",
            bold: [{ phrase: "a porté un volume réel pendant un cycle complet" }],
          },
          {
            text: "Les personnes qui utilisaient l’ancienne façon sont passées au nouveau service. Pour celles qui ne l’ont pas fait, l’équipe sait qui elles sont et les a contactées, au lieu d’espérer qu’elles migreront d’elles-mêmes. La gestion du changement couvre la façon de faire migrer les gens.",
            bold: [{ phrase: "l’équipe sait qui elles sont et les a contactées" }],
            internalLinks: [{ phrase: "gestion du changement", to: "/thread/change-management" }],
          },
          {
            text: "Vous savez ce qu’il advient des documents de l’ancien service, et vous avez le droit de le faire. Lesquels passent dans le nouveau service, lesquels vont à Bibliothèque et Archives Canada, et lesquels sont détruits, le tout selon le calendrier de conservation réglé en Bêta. Le transfert et la destruction se font dans le cadre de l’extinction, non avant, mais la réponse doit exister d’abord, parce qu’obtenir une autorisation de disposition manquante prend des mois.",
            bold: [{ phrase: "Vous savez ce qu’il advient des documents de l’ancien service, et vous avez le droit de le faire." }],
          },
        ],
      },
      {
        text: "Il y aura de la pression pour éteindre plus tôt, et on voit facilement pourquoi. Exploiter les deux coûte visiblement cher : deux services, deux ensembles de licences, parfois deux équipes, et quelqu’un paie pour tout cela. Éteindre trop tôt coûte cher aussi, mais aucun de ces coûts n’apparaît avant qu’il soit trop tard pour l’éviter. Si le nouveau service s’avère ne pas fonctionner, tout le monde a déjà migré, l’ancien a disparu, et le ministère demande à un fournisseur des changements qu’il n’a aucun moyen de refuser.",
        bold: [{ phrase: "aucun de ces coûts n’apparaît avant qu’il soit trop tard pour l’éviter" }],
      },
      {
        text: "Éteindre l’ancien service est le début de son propre Retrait, qui couvre la façon de bien le faire.",
        internalLinks: [{ phrase: "Retrait", to: "/sunset" }],
      },
    ],
  },
  {
    id: "build-in-small-lifecycles",
    icon: Layers,
    title: "Construire chaque ajout par son propre petit cycle de vie.",
    sections: [
      {
        text: "Le cycle qui a construit le service construit chaque fonctionnalité importante : une petite découverte pour apprendre qui en a besoin, quel problème elle résout, et si quelqu’un d’autre l’a déjà résolu; des prototypes jetables pendant que l’idée est peu coûteuse à changer; puis une vraie construction validée avec un petit groupe avant que tout le monde l’obtienne. Ajustez-la à la fonctionnalité : une petite amélioration exige une conversation et une esquisse; une grosse exige le passage complet.",
        bold: [{ phrase: "Ajustez-la à la fonctionnalité :" }],
      },
      {
        type: "subheading",
        text: "Les points de contrôle que vous aviez franchis reviennent",
      },
      {
        text: "Les points de contrôle reviennent avec les ajouts importants :",
      },
      {
        type: "unorderedList",
        items: [
          {
            text: "Vie privée. Quand l’ajout change les renseignements personnels que le service utilise pour prendre des décisions concernant des personnes, l’évaluation de la protection de la vie privée est mise à jour avant sa mise en service.",
            bold: [{ phrase: "Privacy." }],
          },
          {
            text: "Automatisation. Un ajout qui automatise des décisions exige que son évaluation de l’incidence algorithmique soit publiée avant qu’il atteigne la production, en vertu de la Directive sur la prise de décisions automatisée.",
            bold: [{ phrase: "Automation." }],
            externalLinks: [
              {
                phrase: "Directive sur la prise de décisions automatisée",
                linkKey: "directive-automated-decision-making",
              },
            ],
          },
          {
            text: "Architecture. Une initiative d’assez grande envergure repasse par le comité d’examen de l’architecture du ministère, et les plus grandes, au-delà des seuils de coût du Conseil du Trésor, atteignent le CEAI GC (le Comité d’examen de l’architecture intégrée du gouvernement du Canada).",
            bold: [{ phrase: "Architecture." }],
            externalLinks: [
              {
                phrase: "CEAI GC",
                linkKey: "gc-enterprise-architecture-framework",
              },
            ],
          },
          {
            text: "Approvisionnement. Les nouveaux travaux sont achetés, et bien les acheter fait l’objet du bloc suivant.",
            bold: [{ phrase: "Procurement." }],
          },
        ],
      },
      {
        type: "subheading",
        text: "Trois choses qu’un ajout important entraîne avec lui",
      },
      {
        text: "Trois choses suivent un ajout important. Du nouveau code, c’est une nouvelle surface d’attaque : les tests de sécurité menés avant le lancement sont donc repris. La criticité du service se rouvre aussi : une nouvelle capacité peut changer ce pour quoi il est essentiel, et une hausse du volume à elle seule peut relever sa catégorie de sécurité, parce qu’un très grand nombre de documents peu sensibles réunis au même endroit ne restent pas automatiquement peu sensibles. Et un service en ligne repensé doit donner aux clients l’état de leur demande en temps réel, une exigence de la Directive sur les services et le numérique qui revient à chaque refonte.",
        bold: [{ phrase: "Du nouveau code, c’est une nouvelle surface d’attaque" }],
        internalLinks: [{ phrase: "les tests de sécurité", to: "/thread/security" }],
        externalLinks: [
          {
            phrase: "Directive sur les services et le numérique",
            linkKey: "directive-on-service-and-digital",
          },
        ],
      },
      {
        text: "Après chaque lancement majeur, une courte fenêtre de type Stabilisation : surveillée chaque jour, corrigée vite, jusqu’à ce que la nouvelle partie soit ennuyeuse elle aussi.",
        bold: [{ phrase: "une courte fenêtre de type Stabilisation" }],
      },
    ],
  },
  {
    id: "buy-the-new-work-well",
    icon: ShoppingCart,
    title: "Bien acheter les nouveaux travaux.",
    sections: [
      {
        text: "Les fonctionnalités que la Croissance construit ne pouvaient pas être nommées à la signature du contrat, et un bon contrat s’y attendait : les nouveaux travaux arrivent par autorisations de tâches, chaque tâche étant décrite, chiffrée aux taux du contrat, et approuvée par écrit avant de commencer, à l’intérieur de la portée du contrat et de son plafond.",
        bold: [{ phrase: "un bon contrat s’y attendait" }],
        externalLinks: [
          { phrase: "autorisations de tâches", linkKey: "task-authorizations" },
        ],
        internalLinks: [
        ],
      },
      {
        text: "L’endroit où tombe un ajout détermine la façon de l’acheter :",
      },
      {
        type: "unorderedList",
        items: [
          {
            bold: "À l’intérieur de la portée du contrat :",
            text: " une autorisation de tâches, chiffrée et approuvée.",
          },
          {
            bold: "Qui étire les modalités :",
            text: " une modification, et chacune exige sa justification.",
          },
          {
            bold: "Hors de la portée :",
            text: " un nouvel approvisionnement, parce qu’une modification ne peut pas légalement faire grandir un contrat jusqu’à quelque chose que le concours d’origine ne couvrait pas.",
          },
        ],
      },
      {
        text: "La croissance par modifications sans fin est le piège du verrouillage : chaque étirement rend le fournisseur plus difficile à quitter. Quand les ajouts cessent d’entrer dans le contrat, mettez-les en concurrence.",
        bold: [{ phrase: "La croissance par modifications sans fin est le piège du verrouillage :" }],
      },
    ],
  },
  {
    id: "work-on-adoption",
    icon: Megaphone,
    title: "Travailler l’adoption jusqu’à ce que les gens arrivent.",
    sections: [
      {
        text: "Un service peut faire croître ses fonctionnalités pendant que son utilisation stagne. La Croissance inclut les personnes :",
      },
      {
        type: "unorderedList",
        items: [
          {
            bold: "Dites-le-leur.",
            text: " Faites connaître le service par les portes que les gens utilisent déjà : les lettres du programme, le centre d’appels, les services de part et d’autre.",
          },
          {
            bold: "Surveillez les chiffres.",
            text: " Qui arrive, qui termine, qui revient. Une fonctionnalité qui n’en change aucun a été construite sur une supposition.",
          },
          {
            bold: "Gardez les autres portes ouvertes.",
            text: " Les personnes que le service en ligne exclut ont encore besoin du téléphone et de la voie papier tant que le besoin existe, et chaque canal suit les fonctionnalités à mesure qu’elles arrivent.",
          },
        ],
      },
      {
        text: "La gestion du changement couvre la conquête de l’adoption à l’intérieur du ministère; le parcours de part et d’autre du service relève de la prestation intégrée.",
        internalLinks: [
          { phrase: "gestion du changement", to: "/thread/change-management" },
          { phrase: "prestation intégrée", to: "/thread/joined-up-delivery" },
        ],
      },
    ],
  },
  {
    id: "scale-with-the-users",
    icon: Gauge,
    title: "Faire croître le service avec ses utilisateurs.",
    sections: [
      {
        text: "Plus d’utilisateurs arrivent avec plus que du trafic :",
      },
      {
        type: "unorderedList",
        items: [
          {
            bold: "L’infrastructure.",
            text: " Refaites les tests de capacité et de rendement à mesure que la charge monte; la marge mesurée au lancement rétrécit avec l’utilisation.",
          },
          {
            bold: "Le soutien.",
            text: " Plus d’utilisateurs veut dire plus d’appels. Dotez le soutien avant la vague, et écoutez ce que les appels disent de chaque nouvelle fonctionnalité.",
          },
        ],
      },
      {
        text: "L’argent croît lui aussi. Les coûts liés à l’usage montent avec l’utilisation : revoyez donc le budget de fonctionnement à mesure que les chiffres bougent et signalez la croissance au financement avant qu’elle dépasse l’enveloppe.",
        bold: [{ phrase: "L’argent croît lui aussi." }],
        internalLinks: [{ phrase: "funding", to: "/thread/funding" }],
      },
    ],
  },
  {
    id: "protect-the-running-service",
    icon: Shield,
    title: "Protéger le service en fonction pendant que vous construisez.",
    sections: [
      {
        text: "Les personnes qui utilisent déjà le service sont plus nombreuses que celles à qui la nouvelle fonctionnalité est destinée, et leur service garde son plancher. Le cycle de santé tourne à travers chaque construction : surveillance lue, correctifs appliqués, petites mises en production par la même chaîne. La capacité de construction et la capacité d’exploitation sont des postes distincts; quand les mêmes personnes portent les deux, la construction gagne et le plancher glisse.",
        bold: [{ phrase: "leur service garde son plancher" }],
        internalLinks: [
          { phrase: "monitoring", to: "/thread/monitoring-and-instrumentation" },
        ],
      },
      {
        text: "Mettez chaque ajout en production de façon qu’il puisse échouer à petite échelle : derrière un indicateur, à un petit groupe d’abord, facile à annuler. La mise en production des changements couvre la pratique.",
        bold: [{ phrase: "échouer à petite échelle" }],
        internalLinks: [
          { phrase: "mise en production des changements", to: "/thread/releasing-changes" },
        ],
      },
    ],
  },
];

export const GROWTH_TEAM = {
  title: "L’équipe qu’il vous faut",
  intro: {
    text: "La Croissance mène deux types de travail à la fois, construire et exploiter : l’équipe porte donc les deux formes (une personne peut cumuler plusieurs rôles) :",
    bold: [{ phrase: "deux types de travail à la fois" }],
  } satisfies ThreadLinkedProse,
  roles: [
    {
      role: "Produit et recherche",
      icon: Compass,
      body: {
        text: "mènent les petites découvertes : qui a besoin de chaque ajout, quel problème il résout, et s’il a fonctionné.",
      },
    },
    {
      role: "Développeurs, du fournisseur ou de l’interne",
      icon: Code2,
      body: {
        text: "construisent les ajouts, comme travaux nouveaux et payés au titre du contrat ou par affectation à l’interne.",
      },
    },
    {
      role: "Exploitation",
      icon: Server,
      body: { text: "garde le service en fonction à son plancher pendant que la construction se fait." },
    },
    {
      role: "Responsable du soutien",
      icon: LifeBuoy,
      body: {
        text: "met le soutien à l’échelle à mesure que les utilisateurs arrivent, et rapporte ce que les appels disent de chaque nouvelle fonctionnalité.",
      },
    },
    {
      role: "Responsable opérationnel de l’application",
      icon: Briefcase,
      body: {
        text: "décide quels ajouts valent la peine d’être construits, et assume la portée, l’argent et la marge contractuelle qu’ils consomment.",
      },
    },
  ] satisfies readonly SubphaseTeamRole[],
  closing: {
    text: "La Croissance n’a pas de durée fixe. Elle dure tant qu’il y a de vraies nouvelles capacités qui valent la peine d’être construites, et l’équipe garde cette forme aussi longtemps.",
    bold: [{ phrase: "La Croissance n’a pas de durée fixe." }],
  } satisfies ThreadLinkedProse,
};

export const GROWTH_CAUTION = {
  title: "Quand la Croissance tourne mal",
  items: [
    "Une fonctionnalité importante est mise en service sans ses points de contrôle : les évaluations décrivent encore le service tel qu’il était.",
    "La croissance par modifications sans fin : le contrat s’étire jusqu’à ce que quitter le fournisseur cesse d’être possible.",
    "La construction affame le service en fonction : tout le monde est sur la nouvelle fonctionnalité, et le cycle de santé cesse de tourner.",
    "Personne n’a demandé aux utilisateurs : les capacités croissent, l’adoption stagne, et la feuille de route est une liste de souhaits.",
    "Le lancement est traité comme petit parce que le service est en fonction : la nouvelle fonctionnalité atteint donc tout le monde d’un coup, sans avoir été éprouvée sous charge.",
  ],
};

export const GROWTH_FINISH = {
  title: "Comment savoir que la Croissance est terminée",
  sectionId: "how-you-know-growth-is-finished",
  intro: {
    text: "La Croissance est terminée quand la portée se stabilise : la feuille de route ne contient plus d’ajout important à construire ensuite, et le travail devant l’équipe consiste à soutenir, à améliorer par petites touches et à renouveler.",
    bold: [{ phrase: "La Croissance est terminée quand la portée se stabilise :" }],
  } satisfies ThreadLinkedProse,
  blocks: [
    {
      heading: "Les évaluations décrivent le service tel qu’il est maintenant",
      paragraphs: [
        {
          text: "La Croissance a changé ce qu’est le service, et la documentation doit le dire avant que la sous-phase se referme. Chaque ajout important a mis à jour ses propres évaluations pendant sa construction; la vérification de clôture lit l’ensemble au regard du service tel qu’il fonctionne maintenant.",
        },
        {
          text: "L’évaluation de sécurité couvre chaque changement, les plus importants étant approuvés par la personne qui a autorisé l’exploitation du service. La déclaration d’accessibilité couvre les pages nouvelles et modifiées. Tout ce qui a touché des renseignements personnels a son évaluation de la protection de la vie privée mise à jour; tout ce qui a automatisé une décision a son évaluation de l’incidence algorithmique mise à jour et approuvée.",
        },
      ],
    },
    {
      heading: "L’adoption est là où elle devrait être, ou l’écart est consigné",
      paragraphs: [
        {
          text: "La Croissance visait à rejoindre plus de gens : la clore veut donc dire dire s’ils sont venus. Comparez les chiffres d’utilisation actuels du service aux chiffres que la Croissance visait.",
        },
        {
          text: "Un écart ne garde pas la Croissance ouverte. Elle se referme avec un motif écrit : ce qui a été promu, ce que les chiffres ont fait, et pourquoi construire davantage ne les ferait pas bouger. C’est ce relevé qui répondra à la question des années plus tard.",
        },
      ],
    },
    {
      heading: "Le transfert à l’équipe d’exploitation est consigné",
      paragraphs: [
        {
          text: "La capacité de construction s’en va quand la Croissance se referme, et ce qu’elle sait part avec elle à moins d’être consigné d’abord. Deux choses entrent dans le transfert, et les personnes les mieux placées pour les rédiger sont dans l’équipe aujourd’hui.",
        },
        {
          text: "1. Le portrait contractuel : ce que le plafond, les années d’option et les modalités de soutien contiennent encore après tout ce que la Croissance a consommé. Avec lui, un calendrier de renouvellement, chaque date de fin accompagnée de sa date de mise en route.",
        },
        {
          text: "2. La connaissance : ce que chaque ajout a changé, inscrit dans les guides d’exploitation et le relevé des décisions pendant qu’on peut encore interroger les personnes qui l’ont construit.",
        },
      ],
    },
  ] satisfies FinishBlock[],
  aside: {
    heading: "Revenir à la Croissance",
    paragraphs: [
        {
          text: "Cette note est là pour l’équipe qui hésite à clore la Croissance au cas où quelque chose de gros arriverait plus tard; rien dans le fait de clore maintenant ne rend la réouverture plus difficile.",
        },
        {
          text: "Un service peut revenir à la Croissance. Le prochain mandat la rouvre de la même façon : un ajout nommé, la preuve qu’il est nécessaire, de l’argent, et de la marge dans le contrat. La voie d’entrée au haut de cette page est la même chaque fois.",
        },
    ],
  },
  exits: [
    {
      lead: "Ou vers la Maturité,",
      rest: {
        text: "quand la portée s’est stabilisée et que le travail se tourne vers le maintien en santé du service, année après année.",
      },
      href: "/live-maturity",
    },
    {
      lead: "Retour vers une reconstruction,",
      rest: {
        text: "quand les ajouts révèlent une fondation incapable de les porter, et qu’étendre est devenu plus difficile que de repartir. C’est rare, et c’est une décision de l’ampleur d’une Création.",
      },
    },
  ],
  offRamp: {
    intro: {
      text: "Avant de vous installer dans la Maturité, ayez ceci prêt :",
      bold: [{ phrase: "ayez ceci prêt" }],
    } satisfies ThreadLinkedProse,
    items: [
      {
        text: "L’ancien service réglé, si celui-ci a remplacé quelque chose. Habituellement cela veut dire éteint, ses documents transférés ou éliminés selon le calendrier réglé en Bêta. S’il existe encore une vraie raison de le garder disponible, gardez-le, et consignez quelle est la raison et ce qui y mettrait fin. L’exploiter plus longtemps coûte de l’argent, ce que quelqu’un suit. L’éteindre trop tôt coûte la seule voie de retour, ce que personne ne remarque avant d’en avoir besoin.",
        bold: [{ phrase: "L’ancien service réglé," }],
      },
      {
        text: "Les évaluations à jour pour le service tel qu’il est maintenant : vie privée, sécurité, et les tests d’accessibilité, chacune couvrant les ajouts.",
        bold: [{ phrase: "Les évaluations à jour" }],
      },
      {
        text: "L’adoption là où elle devrait être, ou un motif écrit expliquant pourquoi non.",
        bold: [{ phrase: "L’adoption là où elle devrait être," }],
      },
      {
        text: "La marge contractuelle connue : ce que le plafond, les options et les modalités de soutien contiennent encore pour les années à venir.",
        bold: [{ phrase: "La marge contractuelle connue :" }],
      },
      {
        text: "Le calendrier de renouvellement remis à l’équipe d’exploitation, avec chaque date de fin et sa date de mise en route à côté.",
        bold: [{ phrase: "Le calendrier de renouvellement remis à l’équipe d’exploitation," }],
      },
      {
        text: "La connaissance à jour : ce que chaque ajout a changé, inscrit dans les guides d’exploitation et les décisions.",
        bold: [{ phrase: "La connaissance à jour :" }],
      },
    ] satisfies readonly ThreadLinkedProse[],
  },
};

/**
 * Sources de la page Croissance. Ce tableau se trouvait dans LiveGrowthPage.tsx, mais les
 * modules sous src/components ne sont jamais remplacés par la version française : les
 * libellés et les descriptions restaient donc en anglais. Il vit ici pour être traduit.
 */
export const GROWTH_SOURCES: SourceItem[] = [
  {
    label: "Modèles et outils",
    linkKey: "pcra-tool",
    description:
      "Outil d’évaluation de la complexité et des risques des projets (ECRP) (SCT) : le questionnaire qui évalue l’ampleur et le risque du projet; le résultat, comparé à la classe de capacité approuvée du ministère, détermine qui peut l’approuver; un ajout important peut être un projet en soi.",
  },
  {
    label: "Modèles et outils",
    linkKey: "algorithmic-impact-assessment",
    description:
      "Outil d’évaluation de l’incidence algorithmique (SCT) : il cote toute automatisation que la Croissance ajoute.",
  },
  {
    label: "Instrument directeur",
    linkKey: "directive-on-service-and-digital",
    description:
      "Directive sur les services et le numérique (SCT).",
  },
  {
    label: "Instrument directeur",
    linkKey: "directive-automated-decision-making",
    description:
      "Directive sur la prise de décisions automatisée (SCT).",
  },
  {
    label: "Instrument directeur",
    linkKey: "concept-case-procedures",
    description:
      "Procédures obligatoires sur les analyses de rentabilisation conceptuelles pour les projets habilités par le numérique (SCT) : un ajout de grande envergure peut exiger sa propre analyse de rentabilisation conceptuelle.",
  },
  {
    label: "Instrument directeur",
    linkKey: "gc-enterprise-architecture-framework",
    description:
      "Cadre de l’architecture intégrée du gouvernement du Canada (SCT) : les critères pour les changements qui modifient l’architecture.",
  },
  {
    label: "Référence complémentaire",
    linkKey: "task-authorizations",
    description:
      "Autorisations de tâches (guide de l’acheteur d’AchatsCanada).",
  },
  {
    label: "Référence complémentaire",
    linkKey: "modify-contract",
    description:
      "Modifier un contrat (guide de l’acheteur d’AchatsCanada) : la procédure pour les modifications qui restent dans la portée.",
  },
  {
    label: "Référence complémentaire",
    linkKey: "oag-arrivecan",
    description:
      "Rapports de 2024 du BVG, rapport 1 — ArriveCAN.",
  },
  {
    label: "Collectivités",
    linkKey: "gcdigital-community",
    description:
      "Collectivité GCNumérique (BDPI du SCT) : la collectivité des praticiens du numérique dans l’ensemble du gouvernement.",
  },
];
