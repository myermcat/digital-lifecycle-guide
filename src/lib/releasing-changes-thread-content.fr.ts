import type { CaseStudySide } from "@/components/CaseStudyBlock";
import type { SourceItem } from "@/components/SourcesBlock";
import type { ExternalPhraseLink, InternalPhraseLink } from "@/components/ProseWithExternalLinks";
import type { ExternalLinkKey } from "@/lib/external-links";
import { PHASES, THREADS } from "@/lib/guide-strings";
import {
  threadLeadPlainText,
  threadSectionsPlainText,
  threadWhoseJobPlainText,
  type ThreadCloserLookBlock,
  type ThreadContentSection,
  type ThreadLinkedProse,
  type ThreadPhasePreviewBlock,
  type ThreadWhoseJobSection,
} from "@/lib/thread-rich-content";

export type ReleasingChangesLinkedProse = ThreadLinkedProse;
export type ReleasingChangesContentSection = ThreadContentSection;
export type ReleasingChangesCloserLookBlock = ThreadCloserLookBlock;
export type ReleasingChangesPhasePreviewBlock = ThreadPhasePreviewBlock;

export const releasingChangesSectionsPlainText = threadSectionsPlainText;
export const releasingChangesLeadPlainText = (lead: ThreadLinkedProse) => threadLeadPlainText(lead);
export const releasingChangesWhoseJobPlainText = (whoseJob: ThreadWhoseJobSection) =>
  threadWhoseJobPlainText(whoseJob);

export const RELEASING_CHANGES_THREAD = {
  title: "Mise en production des changements",
  slug: "releasing-changes" as const,

  lead: {
    text:
      "La mise en production des changements consiste à amener de nouvelles fonctionnalités et des correctifs sur le service en fonction, de façon sûre et fréquente. Ce qui surprend, pour qui trouve les mises en production angoissantes, c’est que mettre en production petit et souvent est plus sûr que de tout accumuler pour un grand lancement. Cette pratique réunit quatre habitudes : mettre en production par petits lots fréquents; faire passer chaque changement par une chaîne automatisée qui le teste avant sa sortie; déployer chaque changement progressivement et observer son comportement; et garder la capacité de revenir en arrière rapidement si quelque chose tourne mal. Le volet humain du même changement, c’est la gestion du changement.",
    internalLinks: [
      { phrase: "gestion du changement", to: THREADS["change-management"].path },
    ] satisfies InternalPhraseLink[],
  } satisfies ThreadLinkedProse,

  whatGoodLooksLike: [
    {
      text: "Les changements sortent par petits lots fréquents, plutôt que d’être accumulés pour de grosses mises en production risquées.",
      externalLinks: [
        { phrase: "petits lots fréquents", linkKey: "iterate-improve-frequently" },
      ] satisfies ExternalPhraseLink[],
    },
    {
      text: "Chaque changement passe par une chaîne automatisée qui le construit et le teste avant qu’il puisse être mis en production.",
      externalLinks: [
        { phrase: "une chaîne automatisée", linkKey: "martin-fowler-deployment-pipeline" },
      ] satisfies ExternalPhraseLink[],
    },
    {
      text: "Chaque mise en production est testée avant d’atteindre le public, et une personne donne le feu vert final sur celles qui en exigent un.",
    },
    {
      text: "Les nouveaux changements sont déployés progressivement, d’abord à une petite part des utilisateurs, observés, et poursuivis seulement s’ils se comportent bien.",
      externalLinks: [
        { phrase: "déployés progressivement", linkKey: "google-sre-canarying-releases" },
      ] satisfies ExternalPhraseLink[],
    },
    {
      text: "Une mise en production peut être annulée rapidement quand quelque chose tourne mal, de sorte qu’un mauvais changement est un problème court plutôt que durable.",
    },
    {
      text: "Avant tout déploiement dans le nuage, les garde-fous de sécurité du gouvernement du Canada sont en place.",
      externalLinks: [
        { phrase: "les garde-fous de sécurité", linkKey: "gc-cloud-guardrails" },
      ] satisfies ExternalPhraseLink[],
    },
    {
      text: "L’équipe suit si la mise en production est en santé : à quelle fréquence elle met en production, combien de temps un changement met à atteindre les utilisateurs, à quelle fréquence une mise en production casse quelque chose, et à quelle vitesse elle s’en rétablit.",
      externalLinks: [{ phrase: "si la mise en production est en santé", linkKey: "dora-metrics" }] satisfies ExternalPhraseLink[],
    },
  ] satisfies ReleasingChangesLinkedProse[],

  whyItMatters: {
    text:
      "Les grosses mises en production espacées sont là où le risque s’accumule. Quand des mois de changements sortent d’un coup, il y a plus de choses qui peuvent casser, il est plus difficile de dire quel changement a causé un problème, et les utilisateurs attendent longtemps les correctifs et les améliorations. Mettre en production par petits lots renverse cela : chaque changement est assez petit pour être testé, compris et annulé, de sorte qu’un problème est détecté tôt et contenu. C’est l’attente du gouvernement du Canada, dont la norme est d’itérer et d’améliorer fréquemment, en mettant en production de petits lots et en intégrant des tests automatisés pour que les nouveaux changements n’introduisent pas de nouveaux problèmes. Les données le confirment : les équipes qui mettent en production souvent et se rétablissent vite sont aussi celles qui cassent le moins de choses, de sorte que la vitesse et la stabilité vont ensemble plutôt que de s’opposer. Pour un service dans le nuage, la mise en production repose aussi sur un socle de sécurité : les garde-fous infonuagiques du GC doivent être mis en œuvre, validés et déclarés dans les 30 premiers jours ouvrables suivant l’obtention d’un compte infonuagique.",
  },

  whoseJob: {
    intro: "La mise en production des changements est partagée au sein de l’équipe, chaque rôle en portant une partie différente :",
    roles: [
      {
        role: "Développeurs",
        text: "gardent chaque changement petit, écrivent les tests automatisés, et construisent et entretiennent la chaîne qui les livre.",
      },
      {
        role: "Ingénieurs des opérations et de la mise en production",
        text: "exécutent les déploiements, observent chaque déploiement progressif, et reviennent en arrière quand quelque chose se comporte mal.",
      },
      {
        role: "Spécialistes de la sécurité",
        text: "veillent à ce que les vérifications de sécurité et les garde-fous accompagnent la chaîne et à ce que les correctifs sortent rapidement.",
        internalLinks: [
          { phrase: "les vérifications de sécurité et les garde-fous", to: THREADS.security.path },
        ] satisfies InternalPhraseLink[],
      },
      {
        role: "Le responsable opérationnel de l’application",
        text: "veille à ce que la mise en production soit fréquente et financée, accepte que de petites mises en production fréquentes soient la voie la plus sûre, et donne le feu vert sur celles qui exigent une approbation.",
      },
    ],
  } satisfies ThreadWhoseJobSection,

  closerLook: {
    id: "a-closer-look",
    title: "Un regard de plus près",
    blocks: [
      {
        title: "De petites mises en production fréquentes valent mieux que de grosses.",
        sections: [
          {
            text:
              "Deux pratiques rendent les petites mises en production possibles. L’intégration continue signifie que les développeurs fusionnent souvent leur travail dans la base de code commune, où une construction et des tests automatisés le vérifient immédiatement, de sorte que les problèmes apparaissent pendant qu’ils sont petits. La livraison continue signifie que chaque changement est ensuite porté par une chaîne de déploiement, une série d’étapes automatisées qui ajoutent chacune de la confiance, jusqu’à ce qu’il soit prêt à être mis en production d’un clic. Bâtie sur un seul paquet testé déplacé du développement à la préproduction puis à la production, c’est ce qui permet à une équipe de mettre en production chaque semaine, chaque jour, ou plusieurs fois par jour, chaque mise en production étant peu risquée parce que si peu a changé depuis la précédente.",
            bold: [{ phrase: "L’intégration continue" }, { phrase: "La livraison continue" }],
            externalLinks: [
              { phrase: "une construction et des tests automatisés", linkKey: "atlassian-ci-cd" },
            ] satisfies ExternalPhraseLink[],
          },
        ],
      },
      {
        title: "Déployer progressivement, et être prêt à annuler.",
        sections: [
          {
            text:
              "Même un changement testé peut se comporter de façon inattendue avec de vrais utilisateurs : le schéma sûr consiste donc à le mettre d’abord en production pour une petite part d’entre eux. C’est un déploiement canari : le changement va, disons, à 5 % des utilisateurs pendant que les autres restent sur l’ancienne version, on compare les deux, et le déploiement ne se poursuit que si le changement se comporte bien. Le calcul est le point important : une défaillance qui ferait échouer une requête sur cinq n’atteint qu’une fraction des utilisateurs plutôt que tout le monde. À côté de cela, une équipe a besoin d’un retour rapide : un déploiement vérifiable, à paquet unique, rend le retour à la dernière bonne version simple, et une vérification rapide après la mise en production peut déclencher ce retour automatiquement. La capacité d’annuler en quelques minutes est ce qui rend la mise en production fréquente sûre.",
            externalLinks: [
              {
                phrase: "un déploiement vérifiable, à paquet unique",
                linkKey: "uk-deploying-software-regularly",
              },
            ] satisfies ExternalPhraseLink[],
          },
        ],
      },
      {
        title: "Savoir si votre mise en production est en santé.",
        sections: [
          {
            text:
              "On distingue un processus de mise en production sain d’un processus malsain avec quelques mesures simples, souvent appelées les indicateurs DORA : à quelle fréquence vous mettez en production, combien de temps un changement met pour passer de terminé à en service, à quelle fréquence une mise en production cause un problème, et à quelle vitesse vous vous rétablissez quand cela arrive. Le constat utile derrière ces indicateurs, c’est qu’ils ne s’opposent pas : les équipes qui mettent en production le plus souvent sont aussi celles qui cassent le moins de choses et se rétablissent le plus vite. Traitez les chiffres comme une prise de température que l’équipe utilise pour s’améliorer. Un indicateur poursuivi comme une cible en soi cesse d’être honnête.",
          },
        ],
      },
    ] satisfies ReleasingChangesCloserLookBlock[],
  },

  twoWaysComparison: {
    id: "two-ways",
    title: "Deux façons de mettre en production des changements",
    risky: {
      heading: "Vell",
      framing: "Voici Vell, gestionnaire de service. L’équipe exploitait le service de déclaration de revenus avec une grosse mise en production par trimestre :",
      items: [
        "accumulait des mois de changements pour une seule soirée de mise en production",
        "testait à la main à la fin, puis déployait tout à tout le monde d’un coup",
        "n’avait aucun moyen rapide de revenir en arrière quand la mise en production cassait quelque chose",
      ],
      closing:
        "Le résultat : la grosse mise en production a fait tomber la déclaration en pleine saison de pointe, il a fallu des jours pour déterminer lequel des nombreux changements était en cause, et le centre d’appels a été enseveli pendant la correction.",
    } satisfies CaseStudySide,
    safe: {
      heading: "Pax",
      framing: "Voici Pax, gestionnaire de service. L’équipe exploitait le service de déclaration de revenus avec de petites mises en production fréquentes :",
      items: [
        "mettait en production de petits changements chaque semaine par une chaîne automatisée qui testait chacun",
        "déployait chaque changement d’abord à une petite part des déclarants, l’observait, puis élargissait",
        "pouvait revenir à la dernière bonne version en quelques minutes",
      ],
      closing:
        "Le résultat : les quelques problèmes qui sont passés ont touché une poignée d’utilisateurs, ont été repérés vite, et ont été annulés avant que la plupart des gens s’en aperçoivent, et la déclaration est restée en fonction pendant la saison chargée.",
    } satisfies CaseStudySide,
  },

  byPhase: {
    id: "by-phase",
    title: "À quoi ressemble la mise en production des changements à chaque phase",
    intro: "La façon dont un service met en production des changements évolue au fil de sa vie.",
    blocks: [
      {
        title: "Create.",
        preview: "Établir la façon dont vous mettrez en production.",
        popup: [
          {
            text:
              "Les habitudes de mise en production s’établissent avant le lancement. L’équipe construit la chaîne et les tests automatisés, décide comment elle déploiera et reviendra en arrière, et, pour un service infonuagique, met en place les garde-fous de sécurité du GC et les valide dans les 30 premiers jours ouvrables. Choisir de mettre en production petit et souvent dès le départ est bien plus facile que de l’adapter après coup à un service conçu pour de grands lancements.",
          },
        ],
      },
      {
        title: "Live.",
        preview: "Là où se fait l’essentiel de la mise en production.",
        popup: [
          {
            text:
              "Une fois le service en fonction, la mise en production est continue. L’équipe met en production de petits changements souvent, les déploie progressivement et les observe par la surveillance, revient en arrière sur ceux qui se comportent mal, et applique les correctifs de sécurité rapidement. Le travail de mise en production vient du carnet de produit priorisé, et l’équipe garde un œil sur la santé de sa mise en production.",
            internalLinks: [
              { phrase: "monitoring", to: THREADS["monitoring-and-instrumentation"].path },
              { phrase: "carnet de produit priorisé", to: THREADS.backlog.path },
            ] satisfies InternalPhraseLink[],
          },
        ],
      },
      {
        title: "Sunset.",
        preview: "La mise en production ralentit, mais compte toujours.",
        popup: [
          {
            text:
              "À mesure qu’un service est mis hors service ou remplacé, les changements se réduisent à l’essentiel : correctifs de sécurité, et étapes qui déplacent les données vers un nouveau foyer. Ceux-là passent quand même par la chaîne et les tests, parce qu’un dernier changement raté peut laisser en plan les personnes qui utilisent encore le service. Gardez la capacité de corriger et de revenir en arrière jusqu’à ce que le service soit complètement éteint.",
            internalLinks: [
              { phrase: "mis hors service ou remplacé", to: PHASES.sunset.href },
              { phrase: "déplacent les données", to: THREADS["data-stewardship"].path },
            ] satisfies InternalPhraseLink[],
          },
        ],
      },
    ] satisfies ReleasingChangesPhasePreviewBlock[],
  },

  furtherReading: {
    text:
      "Pour déployer dans le nuage sans se verrouiller, l’orientation du gouvernement du Canada d’utiliser des normes et des solutions ouvertes ajoute les attentes de stratégie de sortie et de portabilité qui sous-tendent la mise en production. Pour un point de départ en langage clair sur la première habitude, l’explication de GitHub sur l’intégration continue montre pourquoi soumettre souvent de petits changements détecte les erreurs plus tôt. Si vous voulez voir comment une plateforme infonuagique présente l’ensemble de la pratique, les orientations d’AWS sur l’excellence opérationnelle exposent les principes de changements fréquents, petits et réversibles, et de déploiements automatisés en toute sécurité. Et pour la vue d’ensemble d’une mise en production traitée comme une discipline à établir dès le départ, le chapitre de Google sur l’ingénierie de la mise en production explique pourquoi des constructions reproductibles et automatisées et une piste de vérification rendent les mises en production routinières.",
    externalLinks: [
      { phrase: "utiliser des normes et des solutions ouvertes", linkKey: "gc-use-open-standards-solutions" },
      { phrase: "l’intégration continue", linkKey: "github-continuous-integration" },
      {
        phrase: "les orientations d’AWS sur l’excellence opérationnelle",
        linkKey: "aws-well-architected-operational-excellence",
      },
      { phrase: "l’ingénierie de la mise en production", linkKey: "google-sre-release-engineering" },
    ] satisfies ExternalPhraseLink[],
  },

  sources: [
    {
      label: "Instrument directeur",
      linkKey: "iterate-improve-frequently" satisfies ExternalLinkKey,
      description:
        'Normes relatives au numérique du GC, « Itérer et améliorer fréquemment » (SCT) — https://www.canada.ca/en/government/system/digital-government/government-canada-digital-standards/iterate-improve-frequently.html',
    },
    {
      label: "Instrument directeur",
      linkKey: "gc-cloud-guardrails" satisfies ExternalLinkKey,
      description:
        "Garde-fous infonuagiques du GC (SCT / Services partagés Canada) — https://canada-ca.github.io/cloud-guardrails/ (source officielle : https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32787)",
    },
    {
      label: "Référence complémentaire",
      linkKey: "gc-use-open-standards-solutions" satisfies ExternalLinkKey,
      description:
        'GC, « Utiliser des normes et des solutions ouvertes » (ligne directrice 4, SCT) — https://canada-ca.github.io/gcdigital-tools_outils-numeriquesgc/en/4-use-open-standards-solutions.html',
    },
    {
      label: "Référence complémentaire",
      linkKey: "uk-deploying-software-regularly" satisfies ExternalLinkKey,
      description:
        "Service Manual du Royaume-Uni, déployer les logiciels régulièrement — https://www.gov.uk/service-manual/technology/deploying-software-regularly",
    },
    {
      label: "Référence complémentaire",
      linkKey: "atlassian-ci-cd" satisfies ExternalLinkKey,
      description:
        "Atlassian, intégration continue, livraison continue et déploiement continu — https://www.atlassian.com/continuous-delivery/principles/continuous-integration-vs-delivery-vs-deployment",
    },
    {
      label: "Référence complémentaire",
      linkKey: "martin-fowler-deployment-pipeline" satisfies ExternalLinkKey,
      description:
        "Martin Fowler, « Deployment Pipeline » — https://martinfowler.com/bliki/DeploymentPipeline.html",
    },
    {
      label: "Référence complémentaire",
      linkKey: "google-sre-canarying-releases" satisfies ExternalLinkKey,
      description:
        "Google SRE Workbook, déploiements canari — https://sre.google/workbook/canarying-releases/",
    },
    {
      label: "Référence complémentaire",
      linkKey: "dora-metrics" satisfies ExternalLinkKey,
      description:
        "DORA, indicateurs de performance de livraison logicielle — https://dora.dev/guides/dora-metrics/",
    },
    {
      label: "Référence complémentaire",
      linkKey: "github-continuous-integration" satisfies ExternalLinkKey,
      description:
        "Documentation GitHub, intégration continue — https://docs.github.com/en/actions/get-started/continuous-integration",
    },
    {
      label: "Référence complémentaire",
      linkKey: "aws-well-architected-operational-excellence" satisfies ExternalLinkKey,
      description:
        "AWS Well-Architected, pilier de l’excellence opérationnelle — https://docs.aws.amazon.com/wellarchitected/latest/operational-excellence-pillar/operational-excellence.html",
    },
    {
      label: "Référence complémentaire",
      linkKey: "google-sre-release-engineering" satisfies ExternalLinkKey,
      description:
        "Google SRE Book, ingénierie de la mise en production (chap. 8) — https://sre.google/sre-book/release-engineering/",
    },
  ] satisfies SourceItem[],
} as const;
