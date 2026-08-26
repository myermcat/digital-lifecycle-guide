import type { CaseStudySide } from "@/components/CaseStudyBlock";
import type { SourceItem } from "@/components/SourcesBlock";
import type { ExternalPhraseLink, InternalPhraseLink } from "@/components/ProseWithExternalLinks";
import type { ExternalLinkKey } from "@/lib/external-links";
import { PHASES, THREADS } from "@/lib/guide-strings";
import { OPTIONS_ANALYSIS_PATH } from "@/lib/reference-paths";
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

export type JoinedUpDeliveryLinkedProse = ThreadLinkedProse;
export type JoinedUpDeliveryContentSection = ThreadContentSection;
export type JoinedUpDeliveryCloserLookBlock = ThreadCloserLookBlock;
export type JoinedUpDeliveryPhasePreviewBlock = ThreadPhasePreviewBlock;

export const joinedUpDeliverySectionsPlainText = threadSectionsPlainText;
export const joinedUpDeliveryLeadPlainText = (lead: ThreadLinkedProse) => threadLeadPlainText(lead);
export const joinedUpDeliveryWhoseJobPlainText = (whoseJob: ThreadWhoseJobSection) =>
  threadWhoseJobPlainText(whoseJob);

export const JOINED_UP_DELIVERY_THREAD = {
  title: "Prestation intégrée",
  slug: "joined-up-delivery" as const,

  lead: {
    text:
      "La prestation intégrée consiste à faire fonctionner la tâche entière d’une personne de bout en bout, y compris les étapes prises en charge par d’autres services qui viennent avant et après le vôtre dans son parcours. Une personne entreprend rarement d’utiliser un seul service ; elle entreprend de déménager, de démarrer une entreprise, ou de se remettre d’un décès, et cette tâche traverse habituellement plusieurs services et plusieurs façons d’obtenir de l’aide. La prestation intégrée réunit quatre choses : voir le parcours complet de l’utilisateur à travers chaque service et chaque canal touché, travailler avec les équipes responsables des services de part et d’autre du vôtre, connecter les systèmes pour qu’ils échangent l’information au lieu de la redemander à l’utilisateur, et garder chaque canal au diapason pour que la ligne téléphonique et le comptoir donnent les mêmes réponses que le site Web.",
  } satisfies ThreadLinkedProse,

  wholeJourney: {
    id: "your-service-is-one-box-in-a-bigger-journey",
    title: "Votre service n’est qu’une case d’un parcours plus vaste",
    paragraphs: [
      {
        text: "La plupart du temps, les gens ne veulent pas utiliser un service gouvernemental. Ce qu’ils veulent, c’est s’installer dans un nouveau pays, commencer un emploi, élever un enfant, prendre leur retraite. Le service est ce qu’ils doivent faire pour atteindre ce qu’ils veulent vraiment. Comme l’a formulé Louise Downe, qui a dirigé la conception pour le gouvernement du Royaume-Uni : les bons services sont des verbes, les mauvais services sont des noms.",
        externalLinks: [
          {
            phrase: "les bons services sont des verbes, les mauvais services sont des noms",
            linkKey: "uk-home-office-service-design",
          },
        ] satisfies ExternalPhraseLink[],
      },
      {
        text: "Le gouvernement touche à ces grands moments, mais les services pour l’un d’eux sont fragmentés, répartis entre ministères et entre les ordres fédéral, provincial et municipal. Une personne doit déterminer, seule, quoi faire et quand.",
        bold: [{ phrase: "sont fragmentés" }],
      },
    ] satisfies ThreadLinkedProse[],
    example: {
      title: "Refaire sa vie au Canada.",
      text: "Prenons Amara, une infirmière qui vient travailler au Canada. Son objectif est simple : vivre et travailler ici, avec ses enfants à l’école. Pour y arriver, elle doit obtenir l’autorisation de venir (résidence permanente, IRCC ; si son emploi l’exige, son employeur obtient d’abord une étude d’impact sur le marché du travail, EDSC), être admise à la frontière (ASFC), obtenir un numéro d’assurance sociale avant de pouvoir être payée (Service Canada), ouvrir un compte bancaire, demander une carte d’assurance maladie provinciale et, dans certaines provinces, attendre trois mois avant d’être couverte, obtenir un permis de conduire, faire reconnaître ses titres de compétence en soins infirmiers par l’organisme de réglementation provincial, inscrire ses enfants à l’école, et produire une déclaration de revenus pour recevoir l’Allocation canadienne pour enfants et le crédit pour la TPS (ARC). Des mois plus tard, elle doit suivre le moment où sa carte de résidence permanente doit être renouvelée et celui où elle pourra demander la citoyenneté. Aucun bureau ne voit le parcours complet d’Amara. Chacun voit son propre formulaire. Elle est la seule à vivre l’ensemble, et c’est à elle de déterminer l’ordre, le calendrier, et quel bureau appeler.",
    },
    closingLeads: [
      {
        text: "Votre service est une case de ce parcours plus vaste. La partie dont votre équipe est responsable — le visa, la carte d’assurance maladie, le compte fiscal — peut être irréprochable en soi et le parcours s’effondrer quand même si les cases ne s’articulent pas.",
        bold: [{ phrase: "Votre service est une case de ce parcours plus vaste." }],
      },
      {
        text: "Cartographiez d’abord le parcours, puis concevez votre case pour qu’elle s’y insère. Cartographier le parcours complet montre où il casse entre les bureaux, c’est-à-dire là où les gens se perdent, prennent peur ou restent coincés, et il montre les étapes qui se répètent et les parties qui pourraient être réutilisées.",
        bold: [{ phrase: "Cartographiez d’abord le parcours, puis concevez votre case pour qu’elle s’y insère." }],
      },
    ] satisfies ThreadLinkedProse[],
  },

  whatGoodLooksLike: [
    {
      text: "Le parcours complet de l’utilisateur est cartographié de bout en bout, à travers chaque service et chaque canal touché, y compris les étapes qui se produisent avant et après votre propre partie.",
      externalLinks: [
        { phrase: "cartographié de bout en bout", linkKey: "uk-service-manual-whole-problem" },
      ] satisfies ExternalPhraseLink[],
    },
    {
      text: "Les équipes responsables des services de part et d’autre se sont entendues sur le fonctionnement du parcours par-delà les frontières organisationnelles.",
    },
    {
      text: "Les systèmes échangent l’information pour qu’une personne donne les mêmes renseignements au gouvernement une seule fois, plutôt que de les répéter à chaque service.",
      externalLinks: [
        { phrase: "échangent l’information", linkKey: "gc-standards-on-apis" },
      ] satisfies ExternalPhraseLink[],
    },
    {
      text: "Les solutions existantes sont réutilisées et les fonctionnalités sont exposées comme des services, pour que la prochaine équipe puisse se connecter au vôtre au lieu de le reconstruire.",
      internalLinks: [{ phrase: "reused", to: OPTIONS_ANALYSIS_PATH }] satisfies InternalPhraseLink[],
    },
    {
      text: "Chaque canal offre une expérience cohérente, et un changement au service en ligne met à jour les scripts téléphoniques, les lettres et les étapes en personne en même temps.",
      externalLinks: [
        { phrase: "une expérience cohérente", linkKey: "guideline-service-digital" },
      ] satisfies ExternalPhraseLink[],
    },
    {
      text: "Le personnel de première ligne et des opérations qui aide les utilisateurs sait comment fonctionne le service actuel, et il existe un processus pour le tenir à jour quand celui-ci change.",
    },
    {
      text: "Les personnes qui ne peuvent pas ou ne veulent pas utiliser le service en ligne seules peuvent obtenir de l’aide par téléphone ou en personne, et les canaux non numériques restent faciles à trouver.",
    },
  ] satisfies JoinedUpDeliveryLinkedProse[],

  whyItMatters: {
    lead:
      "Une personne ne vit pas votre service isolément. Elle vit la tâche entière, et cette tâche traverse habituellement des ministères et des canaux.",
    failureIntro: "Quand les parties ne s’articulent pas, la personne se retrouve à devoir :",
    failureModes: [
      "comprendre comment le gouvernement est organisé simplement pour accomplir quelque chose ;",
      "donner les mêmes renseignements à un service après l’autre ;",
      "ou tomber dans l’écart entre un formulaire en ligne et une ligne téléphonique qui n’en sait rien.",
    ],
    closing: {
      text: "Le gouvernement du Canada établit l’attente dans ses normes relatives au numérique — concevoir autour des besoins des utilisateurs et collaborer largement — et la Politique sur les services et le numérique la rend plus ferme : les services devraient adopter une approche omnicanal offrant une expérience client intégrée, avec des normes de service pour chaque canal et des canaux non numériques maintenus ouverts pour que les gens aient le choix. Intégrer un service, c’est aussi la façon de ne pas laisser derrière quelqu’un qui a besoin du téléphone ou du comptoir à mesure qu’une plus grande part du service passe en ligne.",
      externalLinks: [
        { phrase: "normes relatives au numérique", linkKey: "digital-standards" },
        { phrase: "Politique sur les services et le numérique", linkKey: "policy-on-service-and-digital" },
      ] satisfies ExternalPhraseLink[],
    } satisfies ThreadLinkedProse,
  },

  whoseJob: {
    intro:
      "La prestation intégrée est partagée au sein de l’équipe et entre les organisations qui l’entourent, chaque rôle en portant une partie différente :",
    roles: [
      {
        role: "Concepteurs de services et chercheurs en expérience utilisateur",
        text: "cartographient le parcours complet, mènent la cartographie interorganisationnelle, et trouvent où le parcours casse entre services et canaux.",
      },
      {
        role: "Développeurs et architectes",
        text: "construisent les connexions, exposent les fonctionnalités du service par une API, et réutilisent ce qui existe déjà pour que les systèmes soient interopérables.",
        externalLinks: [{ phrase: "API", linkKey: "gc-standards-on-apis" }] satisfies ExternalPhraseLink[],
      },
      {
        role: "Personnel des opérations et de première ligne",
        text: "assure les canaux téléphonique et en personne ainsi que l’aide dont les gens ont besoin, et tient à jour ses scripts et ses connaissances à mesure que le service change.",
      },
      {
        role: "Le responsable opérationnel de l’application",
        text: "assume la responsabilité de s’entendre avec les autres organisations sur le fonctionnement du parcours, et finance les canaux non numériques et le soutien qui les accompagne.",
      },
    ],
  } satisfies ThreadWhoseJobSection,

  closerLook: {
    id: "a-closer-look",
    title: "Un regard de plus près",
    blocks: [
      {
        title: "Cartographier d’abord le parcours complet.",
        sections: [
          {
            text: "Avant de pouvoir intégrer un service, il faut voir la tâche entière comme la personne la voit, comme Amara ci-dessus. Deux cartes aident :",
          },
          {
            type: "unorderedList",
            items: [
              {
                bold: "Un panorama de service",
                text: " montre la tâche du côté du gouvernement : chaque point de contact, les étapes en coulisse, et les organisations en cause.",
              },
              {
                text: "Une carte d’expérience la montre du côté de l’utilisateur, là où il attend, se répète, ou aboutit à un cul-de-sac.",
                externalLinks: [
                  { phrase: "Une carte d’expérience", linkKey: "nng-journey-mapping-101" },
                ] satisfies ExternalPhraseLink[],
              },
            ],
          },
          {
            text: "La cartographie commence par déterminer qui d’autre assure le parcours, puis par réunir ces équipes pour que tout le monde partage un même portrait. La carte montre les gains rapides, souvent des corrections de contenu, et les changements plus importants qui valent la peine.",
          },
        ] satisfies ThreadContentSection[],
      },
      {
        title: "Connecter les systèmes pour que les gens saisissent leurs renseignements une seule fois.",
        sections: [
          {
            text: "Les services s’intègrent techniquement lorsqu’ils peuvent échanger de l’information. Les normes du gouvernement du Canada sur les API décrivent comment un service expose ses fonctionnalités pour que d’autres systèmes puissent les utiliser, selon le principe « construire une fois et servir chaque canal ». L’attente en architecture intégrée est de réutiliser ce qui existe et d’exposer les fonctionnalités comme des services plutôt que de reconstruire.",
            externalLinks: [
              { phrase: "normes du gouvernement du Canada sur les API", linkKey: "gc-standards-on-apis" },
              {
                phrase: "réutiliser ce qui existe et d’exposer les fonctionnalités comme des services",
                linkKey: "gc-ea-application-architecture",
              },
            ] satisfies ExternalPhraseLink[],
          },
          {
            text: "Le modèle européen expose quatre couches : juridique, organisationnelle, sémantique et technique. Un test utile pour la couche sémantique est que ce qu’un service envoie soit ce que le service suivant comprend.",
            bold: [{ phrase: "L’interopérabilité est plus que technique." }],
            externalLinks: [
              { phrase: "Le modèle européen", linkKey: "european-interoperability-framework" },
            ] satisfies ExternalPhraseLink[],
          },
          {
            text: "Le bénéfice pour l’utilisateur est simple : il donne ses renseignements au gouvernement une seule fois.",
          },
        ] satisfies ThreadContentSection[],
      },
      {
        title: "Garder chaque canal au diapason.",
        sections: [
          {
            text: "La plupart des services fonctionnent sur plus d’un canal : en ligne, par téléphone, par lettre, en personne. Les garder au diapason signifie qu’un changement au service en ligne atteint les autres en même temps. Les scripts du centre d’appels sont mis à jour, les lettres sont révisées, et le personnel de première ligne qui répond aux questions sait comment fonctionne le service actuel.",
            externalLinks: [
              {
                phrase: "personnel de première ligne qui répond aux questions",
                linkKey: "uk-service-standard-point-3-join-channels",
              },
            ] satisfies ExternalPhraseLink[],
          },
          {
            text: "Cela signifie aussi prendre soin des personnes qui ne peuvent pas ou ne veulent pas utiliser le service en ligne seules. Cette aide, par téléphone ou en personne, s’appelle le soutien numérique assisté, et les gens peuvent en avoir besoin pour des raisons de confiance, d’assurance, d’accès à Internet, de compétences numériques ou de motivation.",
            externalLinks: [
              { phrase: "le soutien numérique assisté", linkKey: "uk-assisted-digital-introduction" },
            ] satisfies ExternalPhraseLink[],
          },
          {
            text: "À mesure qu’une plus grande part d’un service passe en ligne, le téléphone et le comptoir restent faciles à trouver. Favoriser l’adoption du numérique ne devrait jamais rendre les autres canaux plus difficiles à joindre.",
          },
        ] satisfies ThreadContentSection[],
      },
    ] satisfies JoinedUpDeliveryCloserLookBlock[],
  },

  twoWaysComparison: {
    id: "two-ways",
    title: "Deux façons d’intégrer un service",
    risky: {
      heading: "Vell",
      framing:
        "Voici Vell, gestionnaire de service. L’équipe a construit un formulaire de changement d’adresse pour un seul programme et s’est arrêtée là :",
      items: [
        "n’a jamais parlé aux autres programmes qu’une personne qui déménage doit aussi prévenir",
        "n’a construit aucune connexion vers d’autres systèmes : la personne devait donc saisir de nouveau la même adresse auprès de chaque ministère",
        "a modifié le formulaire en ligne sans prévenir le centre d’appels : le personnel téléphonique guidait donc les gens à travers des étapes qui n’existaient plus",
      ],
      closing:
        "Le résultat : les gens croyaient qu’une seule mise à jour avait rejoint tout le monde alors que non, les appels ont augmenté, et le site Web et la ligne téléphonique se contredisaient.",
    } satisfies CaseStudySide,
    safe: {
      heading: "Pax",
      framing:
        "Voici Pax, gestionnaire de service. L’équipe a traité le déménagement comme un seul parcours à travers les services qu’il touche :",
      items: [
        "a cartographié le parcours avec les autres programmes et convenu de la façon dont le changement d’adresse circulerait entre eux",
        "a exposé le changement par une API pour que les services en aval se mettent à jour, et la personne a saisi la nouvelle adresse une seule fois",
        "a mis à jour les scripts du centre d’appels et formé le personnel de première ligne la semaine même où le formulaire en ligne a changé, et a gardé l’option téléphonique facile à trouver",
      ],
      closing:
        "Le résultat : une personne pouvait mettre son adresse à jour une seule fois et voir le changement atteindre les programmes concernés, et la ligne téléphonique donnait les mêmes réponses que le site Web.",
    } satisfies CaseStudySide,
  },

  byPhase: {
    id: "by-phase",
    title: "À quoi ressemble la prestation intégrée à chaque phase",
    intro: "Intégrer un service est un travail de chaque phase, non une tâche ponctuelle de lancement.",
    blocks: [
      {
        title: "Create.",
        preview: "Cartographier le parcours complet avant de construire.",
        popup: [
          {
            text:
              "Le moment le moins coûteux pour intégrer un service est avant sa construction. L’équipe cartographie la tâche entière telle que l’utilisateur la vit, détermine quels autres services elle touche, et décide quoi réutiliser ou à quoi se connecter plutôt que de reconstruire. Concevoir le service pour qu’il expose ses fonctionnalités par une API dès le départ est bien plus facile que de l’adapter après coup. La recherche qui cartographie le parcours est la même qui vous dit qui dépend des canaux qui l’entourent.",
            externalLinks: [
              {
                phrase: "expose ses fonctionnalités par une API",
                linkKey: "gc-standards-on-apis",
              },
            ] satisfies ExternalPhraseLink[],
            internalLinks: [
              { phrase: "quoi réutiliser ou à quoi se connecter", to: OPTIONS_ANALYSIS_PATH },
              { phrase: "research", to: THREADS["user-research"].path },
            ] satisfies InternalPhraseLink[],
          },
        ],
      },
      {
        title: "Live.",
        preview: "Coordonner avec les services adjacents, et garder tous les canaux au diapason.",
        popup: [
          {
            text:
              "Une fois un service en fonction, la prestation intégrée comporte deux tâches continues. La première est de coordonner avec les services adjacents : continuer de travailler avec les équipes responsables des services de part et d’autre du vôtre, pour que le parcours complet de l’utilisateur continue de fonctionner et pas seulement votre partie. La seconde est de garder tous les canaux au diapason : à mesure que le service en ligne change, mettre à jour les scripts du centre d’appels, reformer le personnel des opérations, et s’assurer que les personnes qui soutiennent les utilisateurs comprennent le service actuel.",
            bold: [
              { phrase: "coordonner avec les services adjacents" },
              { phrase: "garder tous les canaux au diapason" },
            ],
            externalLinks: [
              { phrase: "soutiennent les utilisateurs", linkKey: "uk-service-standard-point-3-join-channels" },
            ] satisfies ExternalPhraseLink[],
          },
        ],
      },
      {
        title: "Sunset.",
        preview: "Retirer ou remplacer sans casser le parcours.",
        popup: [
          {
            text:
              "Quand un service est retiré ou remplacé, les connexions qu’il entretient avec d’autres services comptent le plus. L’équipe travaille avec les services adjacents et les systèmes qui dépendent de ses données pour que rien ne casse en aval, redirige les gens vers l’endroit où la tâche se trouve désormais, et prévient le centre d’appels et le personnel en personne avant que le changement atteigne les utilisateurs. Une personne qui compte sur le téléphone ou le comptoir ne devrait jamais être la dernière à apprendre qu’un service a déménagé.",
            internalLinks: [
              { phrase: "retiré ou remplacé", to: PHASES.sunset.href },
            ] satisfies InternalPhraseLink[],
          },
        ],
      },
    ] satisfies JoinedUpDeliveryPhasePreviewBlock[],
  },

  furtherReading: {
    text:
      "La norme de service du Royaume-Uni sur la résolution d’un problème entier pour les utilisateurs expose le principe derrière la facette 1 et se transpose sans heurt. Pour voir comment le Service numérique canadien présente le métier de bout en bout, sa pratique de conception de services expose les principes et méthodes qu’un concepteur emploie pour planifier un service à travers les canaux numériques et hors ligne. Pour la partie du travail par-delà les frontières, le guide de GOV.UK sur le travail interorganisationnel avec les collectivités de service offre une façon concrète de mettre sur pied et d’animer un groupe interorganisationnel autour d’un parcours utilisateur commun. Et si vous voulez le parcours complet exprimé en étapes nommées, le processus de conception et de prestation de services de l’Australie mène un service de la découverte jusqu’à la mise en service pour que vous compreniez le problème avant de construire la solution.",
    externalLinks: [
      { phrase: "la résolution d’un problème entier pour les utilisateurs", linkKey: "uk-service-standard-point-2" },
      { phrase: "sa pratique de conception de services", linkKey: "cds-service-design-at-cds" },
      {
        phrase: "le travail interorganisationnel avec les collectivités de service",
        linkKey: "uk-working-across-organisational-boundaries",
      },
      {
        phrase: "processus de conception et de prestation de services",
        linkKey: "dta-service-design-delivery-process",
      },
    ] satisfies ExternalPhraseLink[],
  },

  sources: [
    {
      label: "Inspiration et source",
      linkKey: "uk-home-office-service-design" satisfies ExternalLinkKey,
      description:
        'UK Home Office, Service design at the Home Office (Louise Downe, « les bons services sont des verbes ») — https://hodigital.blog.gov.uk/2016/04/27/service-design-at-the-home-office/',
    },
    {
      label: "Instrument directeur",
      linkKey: "policy-on-service-and-digital" satisfies ExternalLinkKey,
      description:
        "Politique sur les services et le numérique (SCT) — https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32603",
    },
    {
      label: "Instrument directeur",
      linkKey: "directive-on-service-and-digital" satisfies ExternalLinkKey,
      description:
        "Directive sur les services et le numérique (SCT) — https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32601",
    },
    {
      label: "Instrument directeur",
      linkKey: "guideline-service-digital" satisfies ExternalLinkKey,
      description:
        "Ligne directrice sur les services et le numérique (SCT), omnicanal / Accès — https://www.canada.ca/en/government/system/digital-government/guideline-service-digital.html",
    },
    {
      label: "Instrument directeur",
      linkKey: "digital-standards" satisfies ExternalLinkKey,
      description:
        'Normes relatives au numérique du GC (SCT), « Collaborer largement » et « Concevoir avec les utilisateurs » — https://www.canada.ca/en/government/system/digital-government/government-canada-digital-standards.html',
    },
    {
      label: "Référence complémentaire",
      linkKey: "gc-standards-on-apis" satisfies ExternalLinkKey,
      description:
        "Normes du gouvernement du Canada sur les API (SCT) — https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/government-canada-standards-apis.html",
    },
    {
      label: "Référence complémentaire",
      linkKey: "enabling-interoperability" satisfies ExternalLinkKey,
      description:
        "Carrefour de l’interopérabilité du GC (SCT) — https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/enabling-interoperability.html",
    },
    {
      label: "Référence complémentaire",
      linkKey: "gc-ea-application-architecture" satisfies ExternalLinkKey,
      description:
        "Architecture intégrée du GC, architecture applicative (CEAI GC, GCcollab ; ouvert) — https://wiki.gccollab.ca/GC_Enterprise_Architecture/Standards/Application_Architecture",
    },
    {
      label: "Référence complémentaire",
      linkKey: "uk-service-standard-point-2" satisfies ExternalLinkKey,
      description:
        "Norme de service de GOV.UK, point 2 : résoudre un problème entier pour les utilisateurs — https://www.gov.uk/service-manual/service-standard/point-2-solve-a-whole-problem",
    },
    {
      label: "Référence complémentaire",
      linkKey: "uk-service-standard-point-3-join-channels" satisfies ExternalLinkKey,
      description:
        "Norme de service de GOV.UK, point 3 : offrir une expérience intégrée sur tous les canaux — https://www.gov.uk/service-manual/service-standard/point-3-join-up-across-channels",
    },
    {
      label: "Référence complémentaire",
      linkKey: "uk-service-manual-whole-problem" satisfies ExternalLinkKey,
      description:
        "Service Manual du Royaume-Uni, cartographier et comprendre le problème entier d’un utilisateur — https://www.gov.uk/service-manual/design/map-a-users-whole-problem",
    },
    {
      label: "Référence complémentaire",
      linkKey: "uk-creating-experience-map" satisfies ExternalLinkKey,
      description:
        "Service Manual du Royaume-Uni, créer une carte d’expérience — https://www.gov.uk/service-manual/user-research/creating-an-experience-map",
    },
    {
      label: "Référence complémentaire",
      linkKey: "nng-journey-mapping-101" satisfies ExternalLinkKey,
      description:
        "Nielsen Norman Group, « Journey Mapping 101 » — https://www.nngroup.com/articles/journey-mapping-101/",
    },
    {
      label: "Référence complémentaire",
      linkKey: "european-interoperability-framework" satisfies ExternalLinkKey,
      description:
        "Cadre d’interopérabilité européen, les quatre couches (Commission européenne) — https://interoperable-europe.ec.europa.eu/collection/iopeu-monitoring/european-interoperability-framework-detail",
    },
    {
      label: "Référence complémentaire",
      linkKey: "uk-assisted-digital-introduction" satisfies ExternalLinkKey,
      description:
        "Service Manual de GOV.UK, soutien numérique assisté : introduction — https://www.gov.uk/service-manual/helping-people-to-use-your-service/assisted-digital-support-introduction",
    },
    {
      label: "Référence complémentaire",
      linkKey: "cds-service-design-at-cds" satisfies ExternalLinkKey,
      description:
        "Service numérique canadien, la conception de services au SNC — https://digital.canada.ca/service-digital-toolkit/user-centred-design/service-design-at-cds/",
    },
    {
      label: "Référence complémentaire",
      linkKey: "uk-working-across-organisational-boundaries" satisfies ExternalLinkKey,
      description:
        "GOV.UK, travailler par-delà les frontières organisationnelles avec les collectivités de service — https://www.gov.uk/service-manual/design/working-across-organisational-boundaries",
    },
    {
      label: "Référence complémentaire",
      linkKey: "dta-service-design-delivery-process" satisfies ExternalLinkKey,
      description:
        "Digital Transformation Agency (Australie), processus de conception et de prestation de services — https://www.digital.gov.au/policy/digital-experience/toolkit/service-design-and-delivery-process",
    },
  ] satisfies SourceItem[],
} as const;
