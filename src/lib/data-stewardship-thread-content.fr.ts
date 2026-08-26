import type { CaseStudySide } from "@/components/CaseStudyBlock";
import type { SourceItem } from "@/components/SourcesBlock";
import type { ExternalPhraseLink, InternalPhraseLink } from "@/components/ProseWithExternalLinks";
import type { ExternalLinkKey } from "@/lib/external-links";
import { THREADS } from "@/lib/guide-strings";
import { GOOD_CONTRACT_PATH } from "@/lib/reference-paths";
import {
  threadLeadPlainText,
  threadSectionsPlainText,
  threadWhoseJobPlainText,
  type ThreadCloserLookBlock,
  type ThreadLinkedProse,
  type ThreadLead,
  type ThreadPhasePreviewBlock,
  type ThreadWhoseJobSection,
} from "@/lib/thread-rich-content";

export const DATA_STEWARDSHIP_THREAD = {
  title: "Intendance des données",
  slug: "data-stewardship" as const,

  lead: {
    text:
      "L’intendance des données, c’est le soin apporté aux données que détient un service sur toute leur vie, du premier document qu’il recueille au jour où ce document est détruit. Le gouvernement du Canada traite l’information et les données comme un bien public, gérées comme un actif stratégique, au titre de la Politique sur les services et le numérique et de sa directive. Pour les données d’un seul service, cela se ramène à quatre choses : savoir qui en répond, les garder aptes à l’usage, ne les conserver qu’aussi longtemps qu’elles sont nécessaires, et les transférer en toute sécurité quand le service change. Ces décisions se prennent tôt et sont réexaminées à mesure que le service grandit.",
    externalLinks: [
      { phrase: "Politique sur les services et le numérique", linkKey: "policy-on-service-and-digital" },
      { phrase: "directive", linkKey: "directive-on-service-and-digital" },
    ] satisfies ExternalPhraseLink[],
  } satisfies ThreadLinkedProse,

  whatGoodLooksLike: [
    {
      text: "Une personne répond des données que détient le service, et les règles de gestion sont consignées.",
    },
    {
      text: "Les données sont aptes à leur usage : exactes, complètes, et assez récentes pour les décisions qu’elles soutiennent.",
    },
    {
      text: "Seules les données dont le service a besoin sont recueillies, et elles ne sont conservées qu’aussi longtemps qu’elles sont nécessaires.",
    },
    {
      text: "Chaque période de conservation comporte trois parties : une durée, un déclencheur qui met l’horloge en marche, et un motif.",
    },
    {
      text: "Rien n’est détruit sans l’autorisation de disposition qui le couvre.",
      externalLinks: [
        { phrase: "autorisation de disposition", linkKey: "lac-documented-disposition" },
      ] satisfies ExternalPhraseLink[],
    },
    {
      text: "Les renseignements personnels suivent les règles supplémentaires qui les protègent.",
      internalLinks: [{ phrase: "les protègent", to: THREADS.privacy.path }] satisfies InternalPhraseLink[],
    },
    {
      text: "Quand le service passe à un nouveau système, les données sont d’abord nettoyées, transférées avec leur sens intact, et vérifiées avant que l’ancien système soit éteint.",
    },
    {
      text: "Les données sont ouvertes par défaut là où elles peuvent l’être, et protégées là où elles doivent l’être.",
    },
  ] satisfies ThreadLinkedProse[],

  retentionQuestionCallout: {
    title: "Question courante : combien de temps dois-je conserver les données ?",
    body: {
      text:
        "Il n’y a pas de chiffre unique. Chaque type de document a sa propre période de conservation. Les Outils générique d’évaluation de Bibliothèque et Archives Canada donnent les périodes de départ normalisées par activité, et le calendrier de conservation de votre ministère en précise les détails. Une fois la période connue, consignez-la comme une durée, un déclencheur qui met l’horloge en marche, et un motif, puis disposez selon le calendrier.",
      externalLinks: [
        { phrase: "Outils générique d’évaluation", linkKey: "lac-gvt-overview" },
      ] satisfies ExternalPhraseLink[],
    } satisfies ThreadLinkedProse,
  },

  whyItMatters: {
    text:
      "Les données sont la partie d’un service qui survit au logiciel. Une équipe peut remplacer le système et garder les documents : les documents méritent donc plus de soin que le code. Quand la qualité des données glisse, des décisions se prennent sur de l’information erronée, et l’erreur se propage à tous ceux en aval qui s’y fient. Conserver des données plus longtemps que permis, ou les détruire sans autorisation, enfreint les règles dans les deux cas : la Politique sur les services et le numérique et sa directive exigent d’une institution qu’elle gère la qualité des données, fixe des périodes de conservation, et applique un processus de disposition documenté ; et en vertu de la Loi sur la Bibliothèque et les Archives du Canada, aucun document gouvernemental ne peut être détruit sans le consentement écrit du bibliothécaire et archiviste.",
    externalLinks: [
      { phrase: "Politique sur les services et le numérique", linkKey: "policy-on-service-and-digital" },
      { phrase: "directive", linkKey: "directive-on-service-and-digital" },
      { phrase: "Loi sur la Bibliothèque et les Archives du Canada", linkKey: "laca" },
    ] satisfies ExternalPhraseLink[],
  },

  whoseJob: {
    intro: "L’intendance des données est partagée au sein de l’équipe, chaque rôle en portant une partie différente :",
    roles: [
      {
        role: "Le bureau de la gestion de l’information du ministère",
        text: "établit les normes et détient les autorisations de disposition ; certains ministères nomment un dirigeant principal des données pour diriger ce travail.",
        externalLinks: [
          { phrase: "les autorisations de disposition", linkKey: "lac-information-disposition-hub" },
        ] satisfies ExternalPhraseLink[],
      },
      {
        role: "Développeurs",
        text: "bâtissent le service de façon qu’il saisisse proprement les données, applique les règles de conservation, et puisse exporter les données sans leur faire perdre leur sens.",
      },
      {
        role: "Le responsable opérationnel",
        text: "de l’application décide des données dont le service a besoin, veille à ce que la conservation et la disposition soient fixées avant le lancement, et répond de la qualité des données et de leur élimination licite.",
      },
    ],
  } satisfies ThreadWhoseJobSection,

  closerLook: {
    id: "a-closer-look",
    title: "Un regard de plus près",
    blocks: [
      {
        title: "Garder les données aptes à l’usage.",
        sections: [
          {
            text:
              "La qualité des données, c’est la mesure dans laquelle elles servent les décisions qu’elles soutiennent. Les Orientations sur la qualité des données du gouvernement du Canada la décrivent selon neuf dimensions :",
            bold: [{ phrase: "La qualité des données" }],
            externalLinks: [
              { phrase: "Orientations sur la qualité des données", linkKey: "tbs-data-quality-guidance" },
            ] satisfies ExternalPhraseLink[],
          },
          {
            type: "orderedList",
            items: [
              { bold: "Accès", text: ", la facilité avec laquelle les données peuvent être trouvées, extraites et utilisées" },
              { bold: "Exactitude", text: ", la justesse avec laquelle elles décrivent ce dont il s’agit" },
              { bold: "Cohérence", text: ", la façon dont elles s’accordent avec les données connexes" },
              { bold: "Exhaustivité", text: ", le degré de remplissage des valeurs" },
              { bold: "Constance", text: ", l’absence de contradictions internes" },
              {
                bold: "Interprétabilité",
                text: ", la présence d’assez d’information de soutien pour les comprendre",
              },
              { bold: "Pertinence", text: ", la mesure dans laquelle elles répondent au besoin réel" },
              {
                bold: "Fiabilité",
                text: ", la mesure dans laquelle les écarts dans les données peuvent être expliqués",
              },
              { bold: "Actualité", text: ", leur actualité pour la décision à prendre" },
            ],
          },
          {
            text:
              "Aucun jeu de données n’obtient une note parfaite sur les neuf. Le critère est de savoir si les données sont aptes à l’usage, c’est-à-dire assez bonnes pour l’usage qu’on en fait, ce qui varie selon la décision et selon l’étape du service. Ces dimensions sont issues des six dimensions plus anciennes de Statistique Canada dans ses Lignes directrices sur la qualité, et elles vont de pair avec les principes FAIR — repérables, accessibles, interopérables, réutilisables — quand les données sont partagées ou réutilisées.",
            bold: [{ phrase: "aptes à l’usage" }],
            externalLinks: [
              { phrase: "Lignes directrices sur la qualité", linkKey: "statcan-quality-guidelines" },
              { phrase: "principes FAIR", linkKey: "tbs-fair-principles" },
            ] satisfies ExternalPhraseLink[],
          },
        ],
      },
      {
        title: "Ne conserver les données qu’aussi longtemps qu’elles sont nécessaires.",
        sections: [
          {
            text:
              "Deux pratiques liées empêchent les données de s’accumuler. La conservation, c’est la durée pendant laquelle les données sont gardées, et chaque période de conservation comporte trois parties : une durée, un déclencheur qui met l’horloge en marche (un dossier est clos, un exercice se termine), et un motif. La disposition, c’est ce qui se passe à la fin. En vertu de la Loi sur la Bibliothèque et les Archives du Canada, un document gouvernemental ne peut pas être détruit sans le consentement écrit du bibliothécaire et archiviste, et la disposition prend l’une de trois formes : détruire le document, le transférer à Bibliothèque et Archives Canada, ou l’aliéner (le retirer du contrôle du gouvernement). Avant toute disposition, le processus documenté effectue quelques vérifications :",
            bold: [{ phrase: "conservation" }, { phrase: "disposition" }],
            externalLinks: [
              { phrase: "Loi sur la Bibliothèque et les Archives du Canada", linkKey: "laca" },
              { phrase: "le processus documenté", linkKey: "lac-documented-disposition" },
            ] satisfies ExternalPhraseLink[],
          },
          {
            type: "orderedList",
            items: [
              "confirmer qu’une autorisation de disposition couvre les documents",
              "vérifier la classification de sécurité",
              "vérifier l’existence d’obligations de conservation ou de demandes d’accès à l’information en cours",
              "obtenir l’approbation du bureau propriétaire des documents",
              "exécuter l’action et consigner ce qui a été fait",
            ],
          },
          {
            text:
              "Fixer la période de conservation ne relève pas de la devinette : les Outils générique d’évaluation de Bibliothèque et Archives Canada donnent des points de départ prêts à l’emploi pour les activités gouvernementales courantes, et la ligne directrice sur la disposition comprend un modèle de formulaire pour consigner chaque décision. Lorsque les documents contiennent des renseignements personnels, les règles supplémentaires sur leur conservation et leur élimination s’appliquent également.",
            externalLinks: [
              { phrase: "Outils générique d’évaluation", linkKey: "lac-gvt-overview" },
            ] satisfies ExternalPhraseLink[],
            internalLinks: [
              { phrase: "leur conservation et leur élimination", to: THREADS.privacy.path },
            ] satisfies InternalPhraseLink[],
          },
        ],
      },
      {
        title: "Transférer les données en toute sécurité quand le service change.",
        sections: [
          {
            text:
              "Quand un service est remplacé, ou que ses données passent à un nouveau système, les données doivent arriver intactes et garder leur sens. La première décision est de savoir s’il faut les transférer : pour chaque série de documents, le choix est de la migrer, de l’archiver ou d’en disposer. Ce qui est transféré est d’abord nettoyé, parce que corriger la qualité des données avant une migration coûte bien moins cher qu’après, et le transfert se fait avec le sens intact, c’est-à-dire les métadonnées qui permettront plus tard de trouver, d’ouvrir et de croire les données. Une migration pilote et un plan de retour en arrière protègent des surprises, et les données sont vérifiées avant que l’ancien système soit éteint. Pour le cas de la fin de vie, c’est-à-dire préserver les données avant le démantèlement d’un système, la même règle vaut : saisir et archiver les données pendant que le système fonctionne encore, puis détruire le reste de façon sécuritaire.",
            externalLinks: [
              {
                phrase: "la migrer, de l’archiver ou d’en disposer",
                linkKey: "uk-national-archives-migration",
              },
              { phrase: "decommissioned", linkKey: "aws-app-retirement" },
            ] satisfies ExternalPhraseLink[],
          },
        ],
      },
    ] satisfies ThreadCloserLookBlock[],
  },

  decidingWhatHappens: {
    id: "deciding-what-happens-to-the-data",
    title: "Décider ce qu’il advient des données",
    intro: [
      {
        text:
          "Déterminer ce qu’il advient des données d’un service est l’une des tâches les plus souvent oubliées au gouvernement. La règle elle-même est simple. Le processus qui la sous-tend est rarement exposé : un service peut donc arriver à son terme sans que personne sache à qui s’adresser, quoi demander, ni quand. Le travail commence alors pendant qu’on éteint le service, c’est-à-dire au pire moment.",
      },
      {
        text:
          "Tout tient au calendrier : les décisions sur les données se prennent tôt, et le nettoyage et le transfert viennent plus tard. Réglez pendant la construction et les années d’exploitation ce qui sera conservé, transféré ou détruit, et retirer ou remplacer le service devient une tâche à dérouler plutôt qu’une course contre la montre à la fin.",
      },
    ] satisfies ThreadLinkedProse[],
    lifecycleFigure: {
      caption:
        "Le mettre en place à la Création, le garder propre pendant l’Exploitation, le transférer ou y mettre fin au Retrait.",
      alt: "Trois étapes du cycle de vie des données à travers la Création, l’Exploitation et le Retrait.",
    },
    trapCallout: {
      title: "Le piège est de laisser cela à la fin.",
      body:
        "Au moment où l’on éteint un service, l’autorisation de détruire ses documents peut ne pas encore exister, et en obtenir une peut prendre des mois, voire des années. Les décisions sur les données appartiennent à la construction et aux années d’exploitation.",
    },
    oneRule: {
      id: "the-one-rule-that-governs-all-of-it",
      title: "1. La règle unique qui gouverne tout cela",
      paragraphs: [
        {
          text:
            "En vertu de la Loi sur la Bibliothèque et les Archives du Canada, aucun document gouvernemental ne peut être détruit sans le consentement écrit du bibliothécaire et archiviste. Ce consentement est une autorisation de disposition : la permission permanente qui permet de détruire un document. Sans une autorisation qui le couvre, rien n’est supprimé, et un service ne peut être ni nettoyé ni fermé selon son propre calendrier. L’autorisation doit exister d’abord, ou être demandée et accordée.",
          bold: [{ phrase: "autorisation de disposition" }],
          externalLinks: [
            { phrase: "Loi sur la Bibliothèque et les Archives du Canada", linkKey: "laca" },
          ] satisfies ExternalPhraseLink[],
        },
      ] satisfies ThreadLinkedProse[],
    },
    authorityCheck: {
      id: "is-an-authority-already-in-place",
      title: "2. Une autorisation est-elle déjà en place ?",
      intro: {
        text:
          "Une autorisation se rattache à un ministère et à un type de document, non à un projet en particulier : il se peut donc qu’il y en ait déjà une. Dans les deux cas, le bureau de la gestion de l’information (GI) le confirme.",
        bold: [{ phrase: "un ministère et à un type de document" }],
      } satisfies ThreadLinkedProse,
      figure: {
        caption:
          "Demandez d’abord au bureau de la GI. Habituellement, les documents sont déjà couverts ; parfois, il faut demander une nouvelle autorisation.",
        alt: "Demandez d’abord au bureau de la GI : habituellement les documents sont déjà couverts ; parfois il faut demander une nouvelle autorisation.",
      },
      bullets: [
        {
          text:
            "Habituellement, c’est déjà couvert. Les documents administratifs courants (ressources humaines, finances) relèvent d’autorisations pangouvernementales que chaque ministère détient déjà. Les documents propres au programme peuvent l’être aussi, si le ministère a obtenu par le passé une autorisation pour ce type de document, ou s’ils relèvent d’une autorisation commune pour les dossiers de cas opérationnels. Il n’y a alors rien à demander, seulement à confirmer.",
          bold: [{ phrase: "Habituellement, c’est déjà couvert." }],
        },
        {
          text:
            "Parfois, ce ne l’est pas. Si les documents ne sont véritablement pas couverts, le ministère demande une nouvelle autorisation pour eux, par le bureau de la GI. C’est ici qu’il faut agir tôt : il n’y a aucun délai fixé, et cela peut prendre des mois, parfois des années.",
          bold: [{ phrase: "Parfois, ce ne l’est pas." }],
        },
      ] satisfies ThreadLinkedProse[],
    },
    howToSort: {
      id: "how-to-sort-it-out",
      title: "3. Comment régler la question : quand, qui, et quoi demander",
      intro: "Trois choses règlent la question.",
      points: [
        {
          lead: "When.",
          body: {
            text:
              " Tôt, en Bêta, avant le lancement du service. Une autorisation n’est jamais refusée : ce n’est donc pas un point de contrôle de type réussite ou échec ; le seul risque est le temps que prend une nouvelle, et c’est pourquoi la démarche commence tôt.",
            bold: [{ phrase: "Bêta" }],
          } satisfies ThreadLinkedProse,
        },
        {
          lead: "Who.",
          body: {
            text:
              " Bureau de la gestion de l’information (GI). Il détient les autorisations, sait ce qui couvre les documents, et en demande de nouvelles à Bibliothèque et Archives Canada par son centre de liaison.",
            bold: [{ phrase: "Bureau de la gestion de l’information (GI)" }],
          } satisfies ThreadLinkedProse,
        },
        {
          lead: "Ce qu’il faut leur demander.",
          body: {
            text: " Deux questions :",
          } satisfies ThreadLinkedProse,
        },
      ],
      askList: [
        "Une autorisation est-elle déjà en place pour ces documents, et sinon, comment en demande-t-on une et combien de temps cela prendra-t-il ?",
        "Que peut-on éliminer de façon continue une fois le service en fonction, et au titre de quelle autorisation ?",
      ],
      waitNote: {
        bold: "Pourquoi une nouvelle autorisation peut prendre si longtemps.",
        text:
          " Il existe un processus, mais aucun délai publié pour en délivrer une, et le système est engorgé : une vérification du vérificateur général de 2014 a constaté que la plupart des institutions fédérales travaillaient encore avec des autorisations de disposition qui n’avaient pas été renouvelées depuis des années. Prévoyez des mois, parfois davantage.",
      },
    },
    whileRunning: {
      id: "while-the-service-runs",
      title: "4. Pendant que le service fonctionne : le garder nettoyé",
      intro: {
        text:
          "Un service en fonction ne devrait pas simplement accumuler des données jusqu’à sa fermeture. Éliminer les documents à échéance est permis, et cela utilise chaque fois la même autorisation : une autorisation de disposition est une permission permanente, non un billet à usage unique. À mesure que chaque document atteint la fin de sa période de conservation (la durée pendant laquelle il doit être gardé), il peut être détruit au titre de l’autorisation qui le couvre déjà.",
        bold: [
          { phrase: "la même autorisation" },
          { phrase: "période de conservation" },
        ],
      } satisfies ThreadLinkedProse,
      disposalRoutes: [
        {
          icon: "fileX" as const,
          lead: "Documents éphémères.",
          text:
            " Les versions provisoires, les doublons et les notes de travail sans valeur durable peuvent être détruits à tout moment, au titre d’une autorisation pangouvernementale permanente prévue à cette fin.",
        },
        {
          icon: "clock" as const,
          lead: "Documents ayant dépassé leur période de conservation.",
          text:
            " Une fois la période terminée, l’autorisation existante est le consentement à les détruire.",
        },
        {
          icon: "user" as const,
          lead: "Renseignements personnels.",
          text:
            " La Loi sur la protection des renseignements personnels exige qu’ils soient éliminés dès qu’ils ne sont plus nécessaires, et au plus tard deux ans après leur dernière utilisation pour décider au sujet d’une personne.",
        },
      ],
      irbv: {
        term: "Ressource documentaire à valeur opérationnelle (RDVO)",
        definition:
          "un document qui atteste une décision, une opération ou une obligation. Dans un système de subventions : les dossiers de demande et d’évaluation, les ententes de financement, les documents de paiement et de rapprochement, et les documents de décision, d’approbation et de suivi. Tous ont des périodes de conservation et exigent une autorisation pour être détruits. Seuls les véritables rebuts, comme les copies en double et les versions provisoires remplacées, y échappent.",
      },
      sharedWorkIntro:
        "Décider qu’un document n’est plus nécessaire n’est pas la même chose qu’avoir le droit de le supprimer.",
      cleanupRolesLead: "Trois parties se partagent le travail, dans l’ordre :",
      cleanupRoles: [
        {
          lead: "Le propriétaire des documents",
          text: " approuve qu’une série de documents n’est plus nécessaire.",
        },
        {
          lead: "Le bureau de la GI",
          text:
            " confirme qu’une autorisation la couvre, vérifie l’absence d’obligations de conservation ou de demandes d’accès à l’information en cours, la détruit de façon sécuritaire, et consigne ce qui a été fait.",
        },
        {
          lead: "Le fournisseur",
          text: " exécute la suppression technique, là où le contrat l’exige.",
        },
      ],
      contractDuty: {
        text:
          "Pour une petite équipe qui exploite un produit acheté, l’élimination ne se fait pas d’elle-même ; elle ne se fait que là où le contrat l’exige. Ces obligations appartiennent donc au contrat dès le départ : disposer selon le calendrier, restituer les données, détruire les copies de façon sécuritaire, et démontrer que cela a été fait. Elles forment le calendrier des données d’un bon contrat, établi au moment de l’achat du service.",
        internalLinks: [
          {
            phrase: "le calendrier des données d’un bon contrat",
            to: GOOD_CONTRACT_PATH,
          },
        ] satisfies InternalPhraseLink[],
      },
      reasonsLead: {
        text: "Pourquoi éliminer les documents au fur et à mesure ? Trois raisons.",
        bold: [{ phrase: "Pourquoi éliminer les documents au fur et à mesure ?" }],
      } satisfies ThreadLinkedProse,
    },
    reasonCards: [
      {
        icon: "minimize" as const,
        heading: "Un Retrait plus petit et plus sûr.",
        line:
          "Moins de données à la fin, c’est moins à migrer, moins à éliminer, et moins de cas où il faut déterminer si une autorisation existe.",
      },
      {
        icon: "shield" as const,
        heading: "Conformité en matière de vie privée.",
        line:
          "Conserver des renseignements personnels au-delà de leur période de conservation est en soi un problème au regard de la Loi sur la protection des renseignements personnels.",
      },
      {
        icon: "lock" as const,
        heading: "Une cible plus petite.",
        line:
          "Les données conservées sont des données à protéger. (Le coût de stockage peut compter aussi, mais seulement là où le contrat facture à l’usage ; à tarif fixe, l’économie est surtout une réduction du risque.)",
      },
    ],
    inPractice: {
      label: "En pratique",
      body: {
        text:
          "Une fois par année, des organisations et des personnes participent aux Journées du nettoyage numérique, en supprimant les données dont elles n’ont plus besoin. L’initiative a été lancée par l’organisme estonien sans but lucratif Let’s Do It World, principalement pour le coût en carbone du stockage de données inutilisées, et se déroule aujourd’hui dans plus de 170 pays. C’est une campagne volontaire, non un processus de gestion des documents, mais elle montre le nettoyage courant traité comme une pratique délibérée. Journée du nettoyage numérique",
        bold: [{ phrase: "Journées du nettoyage numérique" }],
        externalLinks: [
          {
            phrase: "Journée du nettoyage numérique",
            linkKey: "digital-cleanup-day",
          },
        ] satisfies ExternalPhraseLink[],
      } satisfies ThreadLinkedProse,
    },
    whenReplaced: {
      id: "when-the-service-is-replaced-or-retired",
      title: "5. Quand le service est remplacé ou retiré",
      intro: {
        text:
          "Retirer ou remplacer un service passe par ses propres étapes : évaluer, décider, planifier, puis transférer. Le travail sur les données se répartit entre elles.",
      },
      decisionPoints: [
        {
          text:
            "La décision se prend à l’étape de la planification, près du début. Pour chaque série de documents, choisissez si elle est migrée vers le nouveau système, transférée à Bibliothèque et Archives Canada, ou détruite au titre d’une autorisation existante. Le plan de migration en dépend, parce qu’il ne peut pas être établi sans savoir ce qui peut être détruit et ce qui doit être conservé.",
          bold: [
            {
              phrase:
                "La décision se prend à l’étape de la planification, près du début.",
            },
          ],
        },
        {
          text:
            "Le transfert vient plus tard, à mesure que l’ancien service s’éteint, et ne se termine qu’une fois le nouveau service en fonction.",
          bold: [{ phrase: "Le transfert vient plus tard" }],
        },
      ] satisfies ThreadLinkedProse[],
      figure: {
        caption:
          "La décision sur les documents se situe à l’étape de la planification, tôt. Le transfert se fait à mesure que l’ancien service s’éteint.",
        alt: "Diagramme annoté : la décision sur les documents à la planification, pendant que l’ancien et le nouveau service se chevauchent à mesure que l’ancien s’éteint.",
      },
      practices: [
        {
          icon: "split" as const,
          lead: "Menez la migration des données comme un projet distinct, avant le démantèlement.",
          text:
            " Les guides de démantèlement ministériels amorcent la migration séparément et retiennent la fermeture jusqu’à ce qu’elle soit terminée.",
        },
        {
          icon: "coins" as const,
          lead: "Décidez tôt.",
          text:
            " Les données conservées au-delà du besoin coûtent en stockage et en effort : plus tôt on décide ce qui part, moins on en transporte dans le transfert.",
        },
      ],
      closing: {
        text:
          "Les documents conservés sont d’abord nettoyés, parce que corriger la qualité avant une migration coûte moins cher qu’après, et transférés avec leur sens intact. Les documents détruits le sont de façon sécuritaire. Rien n’est détruit sans l’autorisation qui le couvre.",
      },
      copyrightNote: {
        bold: "La propriété du logiciel compte aussi.",
        text:
          " La possibilité de disposer de l’application et de ses données peut dépendre de qui détient le droit d’auteur, établi dans le contrat d’approvisionnement : la Couronne en est propriétaire quand des fonctionnaires l’ont construite ; autrement, c’est le contrat qui tranche.",
      },
    },
    whoYouTalkTo: {
      id: "who-you-talk-to",
      title: "6. À qui vous parlez",
      bullets: [
        {
          text:
            "Bureau de la gestion de l’information (GI) — détient les autorisations, sait ce qui couvre les documents, en demande de nouvelles, suit le calendrier, et exécute et documente l’élimination. Premier appel.",
          bold: [{ phrase: "Bureau de la gestion de l’information (GI)" }],
        },
        {
          text:
            "Bureau de l’AIPRP ou de la protection de la vie privée — pour l’obligation, en vertu de la Loi sur la protection des renseignements personnels, d’éliminer les renseignements personnels à temps.",
          bold: [{ phrase: "Bureau de l’AIPRP ou de la protection de la vie privée" }],
        },
        {
          text:
            "Bibliothèque et Archives Canada, par son centre de liaison — là où le ministère demande une nouvelle autorisation, par l’entremise du bureau de la GI.",
          bold: [
            {
              phrase: "Bibliothèque et Archives Canada, par son centre de liaison",
            },
          ],
        },
      ] satisfies ThreadLinkedProse[],
    },
  },

  twoWaysComparison: {
    id: "two-ways",
    title: "Deux façons de prendre soin des données",
    risky: {
      heading: "Vell",
      framing:
        "Voici Vell, gestionnaire de service. L’équipe a laissé les données du portail de subventions se débrouiller seules :",
      items: [
        "personne n’était responsable des données : personne n’a donc fixé de période de conservation",
        'gardé chaque document pour toujours, « au cas où », et laissé les doublons et les erreurs s’accumuler',
        "au remplacement du portail, a vidé l’ancienne base de données pour gagner du temps",
      ],
      closing:
        "Le résultat : les agents ont pris des décisions sur des données périmées et dupliquées, et des documents ont été détruits sans autorisation de disposition, ce qui est contraire à la loi.",
    } satisfies CaseStudySide,
    safe: {
      heading: "Pax",
      framing:
        "Voici Pax, gestionnaire de service. L’équipe a traité les données du portail de subventions comme un bien dont on prend soin :",
      items: [
        "a nommé une personne responsable",
        "a fixé une période de conservation pour chaque type de document (une durée, un déclencheur, un motif), en partant des Outils générique d’évaluation de Bibliothèque et Archives Canada",
        "a gardé les données propres, en corrigeant doublons et erreurs à mesure",
        "au remplacement du portail, a migré les données avec leur sens intact et éliminé le reste selon le calendrier",
      ],
      closing:
        "Le résultat : des documents fiables, des décisions prises sur de bonnes données, et une élimination licite.",
    } satisfies CaseStudySide,
  },

  byPhase: {
    id: "by-phase",
    title: "À quoi ressemble l’intendance des données à chaque phase",
    intro: "Le travail sur les données change de forme au fil de la vie d’un service.",
    blocks: [
      {
        title: "Create.",
        preview: "Décider quelles données vous détenez, et comment elles seront conservées.",
        popup: [
          {
            text:
              "La plupart des décisions sur les données coûtent le moins cher au départ. L’équipe décide des données dont le service a besoin et n’en recueille pas davantage, nomme qui en répond, et fixe une période de conservation pour chaque type de données (une durée, un déclencheur, un motif), en partant des Outils générique d’évaluation de Bibliothèque et Archives Canada. Le service est conçu pour que les données soient saisies proprement et puissent être exportées plus tard, et les règles de qualité et les normes de métadonnées sont choisies dès maintenant. Si les données comprennent des renseignements personnels, les exigences de protection de la vie privée s’ajoutent.",
            externalLinks: [
              { phrase: "Outils générique d’évaluation", linkKey: "lac-gvt-overview" },
            ] satisfies ExternalPhraseLink[],
            internalLinks: [
              { phrase: "les exigences de protection de la vie privée", to: THREADS.privacy.path },
            ] satisfies InternalPhraseLink[],
          },
        ],
      },
      {
        title: "Live.",
        preview: "Garder les données aptes à l’usage, et disposer selon le calendrier.",
        popup: [
          {
            text:
              "Une fois le service en fonction, les données sont gardées aptes à l’usage, confrontées à des sources fiables et surveillées pour déceler les erreurs. Les périodes de conservation sont appliquées, et la disposition se fait selon le calendrier : les documents ayant dépassé leur période sont éliminés par le processus documenté, et rien n’est détruit sans l’autorisation qui le couvre. Les données sont ouvertes par défaut là où elles peuvent l’être et restreintes là où elles doivent l’être. Garder les données sécurisées fait partie de ce travail.",
            externalLinks: [
              { phrase: "aptes à l’usage", linkKey: "tbs-data-quality-guidance" },
              { phrase: "le processus documenté", linkKey: "lac-documented-disposition" },
            ] satisfies ExternalPhraseLink[],
            internalLinks: [
              { phrase: "Garder les données sécurisées", to: THREADS.security.path },
            ] satisfies InternalPhraseLink[],
          },
        ],
      },
      {
        title: "Sunset.",
        preview: "Migrer ou éliminer les données, licitement.",
        popup: [
          {
            text: "Quand le service est retiré ou remplacé, chaque document est migré, archivé ou détruit.",
          },
          {
            text:
              "Si le service est remplacé, les données sont nettoyées, transférées avec leur sens intact, et vérifiées avant que l’ancien système soit éteint.",
            bold: [{ phrase: "replaced" }],
            externalLinks: [
              {
                phrase: "transférées avec leur sens intact",
                linkKey: "uk-national-archives-migration",
              },
            ] satisfies ExternalPhraseLink[],
          },
          {
            text:
              "Si le service est retiré, les documents sont conservés ou détruits selon leur calendrier de conservation, et ce qui est détruit l’est de façon sécuritaire pour qu’il ne puisse pas être récupéré.",
            bold: [{ phrase: "retired" }],
          },
          {
            text: "Rien n’est détruit sans autorisation de disposition.",
          },
        ],
      },
    ] satisfies ThreadPhasePreviewBlock[],
  },

  furtherReading: {
    text:
      "Chaque source derrière cette page est énumérée avec ses liens dans le bloc Sources ci-dessous. Pour voir comment ce service s’inscrit dans le portrait pangouvernemental, la Stratégie relative aux données de 2023-2026 pour la fonction publique fédérale expose où le gouvernement fédéral mène la gouvernance des données et les attentes qui en découlent pour votre ministère. Pour une courte introduction en langage clair à l’idée elle-même, « Intendance des données : introduction » de Statistique Canada explique la différence entre gouvernance et intendance des données et ce que fait concrètement un intendant des données. Et si vous voulez la source des idées FAIR que la page effleure, les principes FAIR de l’initiative GO FAIR exposent chaque principe pour que vos données restent repérables et réutilisables quand elles sont partagées.",
    externalLinks: [
      {
        phrase: "Stratégie relative aux données de 2023-2026 pour la fonction publique fédérale",
        linkKey: "tbs-2023-2026-data-strategy",
      },
      {
        phrase: "Intendance des données : introduction",
        linkKey: "statcan-data-stewardship-intro",
      },
      { phrase: "principes FAIR", linkKey: "go-fair-principles" },
    ] satisfies ExternalPhraseLink[],
  },

  sources: [
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
        "Directive sur les services et le numérique, art. 4.4.8 (SCT) — https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32601",
    },
    {
      label: "Instrument directeur",
      linkKey: "laca" satisfies ExternalLinkKey,
      description:
        "Loi sur la Bibliothèque et les Archives du Canada, par. 12(1) — https://laws-lois.justice.gc.ca/eng/acts/l-7.7/FullText.html",
    },
    {
      label: "Référence complémentaire",
      linkKey: "lac-documented-disposition" satisfies ExternalLinkKey,
      description:
        "BAC, Lignes directrices sur la documentation de la disposition des documents (comprend un modèle de formulaire de disposition)",
    },
    {
      label: "Référence complémentaire",
      linkKey: "lac-da-2016-001" satisfies ExternalLinkKey,
      description: "Autorisation de disposition 2016/001 (documents éphémères)",
    },
    {
      label: "Référence complémentaire",
      linkKey: "lac-gvt-overview" satisfies ExternalLinkKey,
      description: "BAC, Outils générique d’évaluation (aperçu)",
    },
    {
      label: "Référence complémentaire",
      linkKey: "lac-information-disposition-hub" satisfies ExternalLinkKey,
      description:
        "BAC, Gestion de l’information et disposition des documents fédéraux (carrefour)",
    },
    {
      label: "Référence complémentaire",
      linkKey: "tbs-data-quality-guidance" satisfies ExternalLinkKey,
      description: "SCT, Orientations sur la qualité des données (neuf dimensions)",
    },
    {
      label: "Référence complémentaire",
      linkKey: "statcan-quality-guidelines" satisfies ExternalLinkKey,
      description: "Statistique Canada, Lignes directrices sur la qualité (6e éd., 12-539-X)",
    },
    {
      label: "Référence complémentaire",
      linkKey: "tbs-fair-principles" satisfies ExternalLinkKey,
      description: "SCT, Orientations sur la préparation à gérer les données selon les principes FAIR",
    },
    {
      label: "Référence complémentaire",
      linkKey: "uk-national-archives-migration" satisfies ExternalLinkKey,
      description:
        "The National Archives (Royaume-Uni), migration de l’information entre systèmes de gestion des documents",
    },
    {
      label: "Référence complémentaire",
      linkKey: "aws-app-retirement" satisfies ExternalLinkKey,
      description:
        "AWS Prescriptive Guidance, retirer les applications avant de démanteler l’infrastructure",
    },
    {
      label: "Référence complémentaire",
      linkKey: "oag-2014-ch7-documentary-heritage" satisfies ExternalLinkKey,
      description:
        "Vérification du BVG de 2014, chap. 7 — Le patrimoine documentaire du gouvernement du Canada",
    },
    {
      label: "Référence complémentaire",
      linkKey: "cccs-itsm-50-104" satisfies ExternalLinkKey,
      description: "CCC ITSM.50.104 (clauses contractuelles)",
    },
    {
      label: "Référence complémentaire",
      linkKey: "digital-cleanup-day" satisfies ExternalLinkKey,
      description: "Journée du nettoyage numérique de Let’s Do It World",
    },
    {
      label: "Référence complémentaire",
      linkKey: "tbs-2023-2026-data-strategy" satisfies ExternalLinkKey,
      description:
        "SCT, Stratégie relative aux données de 2023-2026 pour la fonction publique fédérale — https://www.canada.ca/en/treasury-board-secretariat/corporate/reports/2023-2026-data-strategy.html",
    },
    {
      label: "Référence complémentaire",
      linkKey: "statcan-data-stewardship-intro" satisfies ExternalLinkKey,
      description:
        "Statistique Canada, Intendance des données : introduction — https://www.statcan.gc.ca/en/wtc/data-literacy/catalogue/892000062020013",
    },
    {
      label: "Référence complémentaire",
      linkKey: "go-fair-principles" satisfies ExternalLinkKey,
      description: "Principes FAIR de GO FAIR — https://www.go-fair.org/fair-principles/",
    },
    {
      label: "Instrument directeur",
      linkKey: "directive-open-government",
      description:
        "Directive sur le gouvernement ouvert (SCT) : l’instrument derrière l’ouverture par défaut.",
    },
    {
      label: "Instrument directeur",
      linkKey: "standard-systems-manage-information",
      description:
        "Annexe J, Norme sur les systèmes qui gèrent l’information et les données (SCT) : les exigences obligatoires que doit respecter le traitement des documents par un système.",
    },
    {
      label: "Instrument directeur",
      linkKey: "standard-managing-metadata",
      description:
        "Annexe L, Norme pour la gestion des métadonnées (SCT) : quelles normes de métadonnées s’appliquent, pour que les données se transfèrent avec leur sens intact.",
    },
    {
      label: "Modèles et outils",
      linkKey: "open-government-licence",
      description:
        "Licence du gouvernement ouvert – Canada : la licence sous laquelle paraît chaque diffusion ouverte.",
    },
    {
      label: "Modèles et outils",
      linkKey: "open-government-portal",
      description:
        "Portail du gouvernement ouvert : là où aboutissent les diffusions.",
    },
    {
      label: "Référence complémentaire",
      linkKey: "open-government-guidebook",
      description:
        "Guide du gouvernement ouvert (SCT) : orientation et outils pour diffuser données et information.",
    },
    {
      label: "Référence complémentaire",
      linkKey: "im-basics-guidance",
      description:
        "Notions de base de la gestion de l’information (SCT) : les orientations en langage clair sur les obligations documentaires de chaque membre de l’équipe.",
    },
  ] satisfies SourceItem[],
} as const;

export const dataStewardshipSectionsPlainText = threadSectionsPlainText;
export const dataStewardshipLeadPlainText = (lead: ThreadLead) => threadLeadPlainText(lead);
export const dataStewardshipWhoseJobPlainText = (whoseJob: ThreadWhoseJobSection) =>
  threadWhoseJobPlainText(whoseJob);
