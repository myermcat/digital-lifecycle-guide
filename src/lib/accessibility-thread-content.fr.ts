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
  type ThreadContentSection,
  type ThreadLinkedProse,
  type ThreadPhasePreviewBlock,
  type ThreadWhoseJobSection,
} from "@/lib/thread-rich-content";

export type AccessibilityLinkedProse = ThreadLinkedProse;
export type AccessibilityContentSection = ThreadContentSection;
export type AccessibilityCloserLookBlock = ThreadCloserLookBlock;
export type AccessibilityPhasePreviewBlock = ThreadPhasePreviewBlock;

export const accessibilitySectionsPlainText = threadSectionsPlainText;
export const accessibilityLeadPlainText = (lead: ThreadLinkedProse) => threadLeadPlainText(lead);
export const accessibilityWhoseJobPlainText = (whoseJob: ThreadWhoseJobSection) =>
  threadWhoseJobPlainText(whoseJob);

export const ACCESSIBILITY_THREAD = {
  title: "Accessibilité",
  slug: "accessibility" as const,

  lead: {
    text:
      "L’accessibilité consiste à construire un service que tout le monde peut utiliser, y compris les personnes handicapées, que ce handicap soit permanent, temporaire ou situationnel. Au Canada, c’est la loi : la Loi canadienne sur l’accessibilité fixe l’objectif d’un Canada exempt d’obstacles d’ici 2040 et nomme les technologies de l’information et des communications comme l’un des domaines à rendre accessibles. Un service qui ne peut pas être utilisé au clavier, avec un lecteur d’écran, avec des sous-titres ou en langage clair exclut des gens de quelque chose dont le gouvernement fait souvent la seule option. Les décisions qui rendent un service accessible se prennent tôt et sont réexaminées à mesure qu’il change.",
    externalLinks: [
      { phrase: "Loi canadienne sur l’accessibilité", linkKey: "accessible-canada-act-summary" },
    ] satisfies ExternalPhraseLink[],
  } satisfies ThreadLinkedProse,

  userResearchOverlap: {
    text:
      "L’accessibilité chevauche la recherche sur les utilisateurs, en particulier les tests avec de vraies personnes. Cette page couvre le volet accessibilité; la recherche et les tests avec les utilisateurs en général relèvent de la recherche sur les utilisateurs.",
    internalLinks: [
      { phrase: "recherche sur les utilisateurs", to: THREADS["user-research"].path },
    ] satisfies InternalPhraseLink[],
  } satisfies ThreadLinkedProse,

  whatGoodLooksLike: [
    { text: "L’accessibilité est intégrée à la conception dès le départ, pendant qu’il est encore peu coûteux de la modifier." },
    {
      text: "Le service respecte la norme exigée par la loi, CAN/ASC-EN 301 549, ce qui pour le Web signifie le niveau AA des WCAG 2.1.",
      externalLinks: [
        { phrase: "CAN/ASC-EN 301 549", linkKey: "can-asc-en-301-549" },
        { phrase: "le niveau AA des WCAG 2.1", linkKey: "wcag-22-quickref" },
      ] satisfies ExternalPhraseLink[],
    },
    {
      text: "La norme couvre les documents numériques et toute application mobile, en plus du site Web.",
    },
    {
      text: "Les exigences d’accessibilité sont inscrites au contrat quand la technologie est achetée, et le fournisseur fournit un rapport de conformité en matière d’accessibilité, une déclaration normalisée du degré d’accessibilité de son produit.",
      internalLinks: [
        { phrase: "inscrites au contrat", to: GOOD_CONTRACT_PATH },
      ] satisfies InternalPhraseLink[],
      externalLinks: [
        { phrase: "rapport de conformité en matière d’accessibilité", linkKey: "a11y-toolkit-procurement" },
      ] satisfies ExternalPhraseLink[],
    },
    {
      text: "Le service est testé avec de vraies personnes, y compris des personnes qui utilisent des technologies d’assistance. Les outils automatisés ne trouvent qu’une partie des problèmes.",
      internalLinks: [
        { phrase: "testé avec de vraies personnes", to: THREADS["user-research"].path },
      ] satisfies InternalPhraseLink[],
    },
    {
      text: "Une déclaration d’accessibilité publiée indique ce qui est accessible et ce qui ne l’est pas, et comment obtenir de l’aide ou une solution de rechange.",
      externalLinks: [
        {
          phrase: "déclaration d’accessibilité",
          linkKey: "accessible-canada-regulations-digital-technologies",
        },
      ] satisfies ExternalPhraseLink[],
    },
    {
      text: "Les personnes qui ne peuvent pas utiliser le service seules peuvent quand même accomplir la tâche, par téléphone, en personne, ou avec du soutien.",
    },
    {
      text: "Le personnel qui construit, entretient ou achète des technologies numériques a reçu une formation en accessibilité.",
      externalLinks: [
        { phrase: "formation en accessibilité", linkKey: "digital-accessibility-toolkit" },
      ] satisfies ExternalPhraseLink[],
    },
  ] satisfies AccessibilityLinkedProse[],

  whyItMatters: {
    text:
      "Quand un service n’est pas accessible, des gens sont exclus de choses qu’ils ont le droit d’utiliser — une prestation, une déclaration de revenus, un service de santé — et il n’existe souvent aucun autre moyen de les obtenir. C’est aussi une obligation légale : en vertu de la Loi canadienne sur l’accessibilité et du Règlement canadien sur l’accessibilité, un service numérique fédéral doit respecter la norme d’accessibilité, avec des échéances échelonnées en 2027 et 2028, et le commissaire à l’accessibilité peut imposer des sanctions. Il y a un intervalle entre les deux, et il est facile à mal lire. La Norme sur l’accessibilité des sites Web du Conseil du Trésor a été abrogée le 2 mars 2026 : jusqu’à ce que le règlement s’applique, aucune norme unique du Conseil du Trésor n’est en vigueur. Ce n’est pas une pause. La consigne donnée aux ministères est que l’abrogation ne doit pas entraîner de réduction de l’accessibilité, de report de l’entretien, ni de recul. Continuez de respecter au moins ce que le service respectait déjà, et nommez CAN/ASC-EN 301 549 dans tout ce qui est acheté maintenant, parce qu’une plateforme choisie aujourd’hui fonctionnera encore à l’arrivée des échéances. Intégrer l’accessibilité tôt coûte bien moins cher que de la corriger sous pression d’échéance, et un service accessible est plus facile pour tout le monde, sur un téléphone, sur une connexion lente, en plein soleil. La plupart des obstacles sont ordinaires et évitables : une image sans texte de remplacement, un formulaire qui exige une souris, un contraste trop faible pour être lu.",
    externalLinks: [
      { phrase: "Loi canadienne sur l’accessibilité", linkKey: "accessible-canada-act-summary" },
      {
        phrase: "Règlement canadien sur l’accessibilité",
        linkKey: "accessible-canada-regulations-digital-technologies",
      },
    ] satisfies ExternalPhraseLink[],
  },

  whoseJob: {
    intro: "L’accessibilité est partagée au sein de l’équipe, chaque rôle en portant une partie différente :",
    roles: [
      {
        role: "Concepteurs et rédacteurs de contenu",
        text: "écrivent en langage clair, structurent correctement le contenu, et conçoivent pour l’utilisation au clavier et au lecteur d’écran.",
      },
      {
        role: "Développeurs",
        text: "construisent selon la norme et corrigent ce que les tests révèlent.",
      },
      {
        role: "L’équipe d’accessibilité ou de TI du ministère",
        text: "conseille, mène les tests avec les technologies d’assistance, et aide à publier la déclaration d’accessibilité.",
      },
      {
        role: "Le responsable opérationnel",
        text: "de l’application veille à ce que l’accessibilité soit planifiée et financée, à ce qu’elle soit construite selon la norme avant le lancement, et répond du respect des exigences légales.",
      },
    ],
  } satisfies ThreadWhoseJobSection,

  closerLook: {
    id: "a-closer-look",
    title: "Un regard de plus près",
    blocks: [
      {
        title: "Construire selon la norme.",
        sections: [
          {
            text:
              "La loi renvoie à une seule norme technique, CAN/ASC-EN 301 549, la norme canadienne d’accessibilité pour les technologies de l’information et des communications. Pour un site Web, la respecter signifie respecter le niveau AA des WCAG 2.1, les règles internationales pour l’accessibilité des contenus Web, qui s’organisent autour de quatre idées :",
            externalLinks: [
              { phrase: "CAN/ASC-EN 301 549", linkKey: "can-asc-en-301-549" },
              { phrase: "le niveau AA des WCAG 2.1", linkKey: "wcag-22-quickref" },
            ] satisfies ExternalPhraseLink[],
          },
          {
            type: "orderedList",
            items: [
              { bold: "Perceptible", text: ", les gens peuvent voir ou entendre le contenu" },
              { bold: "Utilisable", text: ", de sorte que cela fonctionne au clavier autant qu’à la souris" },
              { bold: "Compréhensible", text: ", cela se lit clairement et se comporte de façon prévisible" },
              {
                bold: "Robuste",
                text: ", cela fonctionne avec les technologies d’assistance comme les lecteurs d’écran",
              },
            ],
          },
          {
            text: "La norme dépasse le site Web : les documents numériques comme les PDF et les fichiers Word, et toute application mobile, doivent la respecter aussi. Les WCAG comportent trois niveaux, A, AA et AAA; AA est la barre à laquelle un service gouvernemental se construit.",
            bold: [{ phrase: "AA" }],
          },
        ],
      },
      {
        title: "L’acheter accessible.",
        sections: [
          {
            text:
              "La plupart des services existants reposent sur des technologies achetées plutôt que construites à l’interne : l’accessibilité doit donc être une condition de l’achat. La Boîte à outils de l’accessibilité numérique comporte un générateur d’exigences qui transforme une description de ce que vous achetez en clauses d’accessibilité précises à inscrire au contrat, et le fournisseur fournit un rapport de conformité en matière d’accessibilité indiquant où se situe son produit. Lorsqu’un produit n’est pas entièrement accessible, une feuille de route de correction consigne ce qui sera corrigé et quand. Les exigences d’accessibilité inscrites au contrat, c’est le moment où un responsable opérationnel a le plus de rapport de force, et le programme AATIA de Services partagés Canada conseille sur la prise en compte de l’accessibilité dans un approvisionnement.",
            bold: [{ phrase: "rapport de conformité en matière d’accessibilité" }],
            externalLinks: [
              { phrase: "Boîte à outils de l’accessibilité numérique", linkKey: "a11y-toolkit-procurement" },
              { phrase: "programme AATIA", linkKey: "aaact-program" },
            ] satisfies ExternalPhraseLink[],
            internalLinks: [
              { phrase: "inscrites au contrat", to: GOOD_CONTRACT_PATH },
            ] satisfies InternalPhraseLink[],
          },
        ],
      },
      {
        title: "Tester avec de vraies personnes.",
        sections: [
          {
            text:
              "Les vérificateurs automatisés comme un analyseur d’accessibilité de navigateur ne détectent qu’une partie des problèmes, et ils ne peuvent pas dire si le service fonctionne réellement pour quelqu’un. La Boîte à outils de l’accessibilité numérique fournit une liste de vérification de l’accessibilité Web et des orientations sur les tests, mais le test qui compte, ce sont les personnes : quelqu’un qui navigue au clavier, qui écoute avec un lecteur d’écran, ou qui lit avec le texte agrandi. Respecter la norme n’est que le plancher. Un service peut réussir chaque vérification automatisée et rester difficile à utiliser. Allez au-delà des utilisateurs faciles à joindre, vers les personnes les plus susceptibles d’être exclues : personnes handicapées, personnes neurodivergentes, personnes peu à l’aise avec le numérique ou sans appareil fiable, personnes servies dans l’autre langue officielle ou dont la première langue n’est ni l’une ni l’autre, personnes âgées, et personnes peu alphabétisées.",
            externalLinks: [
              { phrase: "Boîte à outils de l’accessibilité numérique", linkKey: "a11y-toolkit-test-products" },
            ] satisfies ExternalPhraseLink[],
            internalLinks: [
              {
                phrase: "tests avec les personnes en situation de handicap",
                to: THREADS["user-research"].path,
              },
            ] satisfies InternalPhraseLink[],
          },
          {
            text:
              "Il existe une équipe à qui demander de l’aide. Le programme Accessibilité, adaptation et technologie informatique adaptée (AATIA) de Services partagés Canada aide les équipes à intégrer l’accessibilité aux produits, services et contenus dès le départ, avec des séances de formation et des tests avec technologies adaptées.",
            bold: [{ phrase: "Il existe une équipe à qui demander de l’aide." }],
            externalLinks: [
              {
                phrase: "programme Accessibilité, adaptation et technologie informatique adaptée (AATIA)",
                linkKey: "aaact-program",
              },
            ] satisfies ExternalPhraseLink[],
          },
        ],
      },
    ] satisfies AccessibilityCloserLookBlock[],
  },

  twoWaysComparison: {
    id: "two-ways",
    title: "Deux façons de faire l’accessibilité",
    risky: {
      heading: "Vell",
      framing: "Voici Vell, agent de programme. L’équipe a traité l’accessibilité comme une vérification finale du portail de subventions :",
      items: [
        "l’a ajoutée à la fin, avec une seule analyse automatisée la semaine avant le lancement, sur le site Web seulement, ni sur les lettres de décision en PDF ni sur l’application mobile",
        "n’a jamais testé avec une vraie personne",
      ],
      closing:
        "Le résultat : au lancement, un demandeur utilisant un lecteur d’écran n’a pas pu terminer le formulaire parce que les champs n’avaient pas d’étiquettes, et les lettres de décision ne pouvaient pas être lues à voix haute. Les correctifs sont arrivés tard, précipités et coûteux, et des gens sont restés exclus entre-temps.",
    } satisfies CaseStudySide,
    safe: {
      heading: "Pax",
      framing: "Voici Pax, agent de programme. L’équipe a intégré l’accessibilité au portail de subventions dès le premier croquis :",
      items: [
        "a conçu pour l’utilisation au clavier et au lecteur d’écran, avec EN 301 549 (WCAG 2.1 AA) comme barre",
        "a exigé un rapport de conformité en matière d’accessibilité du fournisseur de l’outil de gestion des dossiers, et l’a vérifié",
        "a testé avec de vraies personnes, dont quelqu’un utilisant un lecteur d’écran et quelqu’un naviguant au clavier, et a corrigé leurs constats avant le lancement",
        "a publié une déclaration d’accessibilité indiquant ce qui fonctionne et comment obtenir une solution de rechange",
      ],
      closing:
        "Le résultat : le portail respectait la loi, fonctionnait pour tout le monde, et a coûté bien moins cher parce que les problèmes ont été détectés tôt.",
    } satisfies CaseStudySide,
  },

  byPhase: {
    id: "by-phase",
    title: "À quoi ressemble l’accessibilité à chaque phase",
    intro: "Le travail d’accessibilité change de forme au fil de la vie d’un service.",
    blocks: [
      {
        title: "Create.",
        preview: "L’intégrer à la conception et fixer la norme.",
        popup: [
          {
            text:
              "L’accessibilité coûte le moins cher à intégrer au départ. L’équipe conçoit pour l’utilisation au clavier et au lecteur d’écran, écrit en langage clair, et fixe EN 301 549 (WCAG 2.1 AA pour le Web) comme barre à laquelle le service se construit. Si la technologie est achetée, les exigences d’accessibilité sont inscrites au contrat et le rapport de conformité du fournisseur est vérifié. Les tests avec des personnes sont planifiés dès maintenant plutôt que laissés à la fin. Le travail change de forme au fil des trois sous-phases de la Création :",
            externalLinks: [
              { phrase: "EN 301 549", linkKey: "can-asc-en-301-549" },
            ] satisfies ExternalPhraseLink[],
            internalLinks: [
              { phrase: "inscrites au contrat", to: GOOD_CONTRACT_PATH },
            ] satisfies InternalPhraseLink[],
          },
          {
            text: "Pendant la Découverte, apprendre qui se trouve exclu.",
            bold: [{ phrase: "Pendant la Découverte, apprendre qui se trouve exclu." }],
            internalLinks: [{ phrase: "Découverte", to: "/create-discovery" }],
          },
          {
            type: "unorderedList",
            items: [
              "inclure dans la recherche des personnes ayant des déficiences visuelles, auditives, motrices ou cognitives, et des personnes ayant peu d’accès au numérique ou peu d’assurance",
              "apprendre où la façon de faire actuelle exclut des gens",
              "rien n’existe encore, il n’y a donc rien à tester",
            ],
          },
          {
            text: "Pendant l’Alpha, rendre les maquettes accessibles et les tester avec les personnes les plus susceptibles d’être exclues.",
            bold: [
              {
                phrase:
                  "Pendant l’Alpha, rendre les maquettes accessibles et les tester avec les personnes les plus susceptibles d’être exclues.",
              },
            ],
            internalLinks: [{ phrase: "Alpha", to: "/create-alpha" }],
          },
          {
            type: "unorderedList",
            items: [
              "confronter les conceptions aux principes d’accessibilité",
              "mener les séances de recherche sur les maquettes avec des personnes ayant des besoins d’accès",
              "déterminer quelles clauses de la norme ont leur place dans le contrat de construction",
            ],
          },
          {
            text: "Pendant la Bêta, le prouver sur le vrai service.",
            bold: [{ phrase: "Pendant la Bêta, le prouver sur le vrai service." }],
            internalLinks: [{ phrase: "Bêta", to: "/create-beta" }],
          },
          {
            type: "unorderedList",
            items: [
              "tester avec des technologies d’assistance, et avec les personnes les plus susceptibles d’être exclues",
              "corriger ce que les tests révèlent avant l’arrivée du public",
              "confronter le rapport de conformité du fournisseur au contrat",
            ],
          },
        ],
      },
      {
        title: "Live.",
        preview: "La garder accessible et dire aux gens où elle en est.",
        popup: [
          {
            text:
              "Une fois le service en fonction, chaque nouvelle page, chaque document et chaque fonctionnalité sont tenus à la norme, et le service est testé régulièrement, y compris avec des technologies d’assistance. Une déclaration d’accessibilité publiée indique ce qui est accessible et ce qui ne l’est pas et comment demander de l’aide ou une solution de rechange, et un canal de rétroaction permet aux gens de signaler des obstacles. La déclaration revient au ministère en vertu du Règlement canadien sur l’accessibilité modifié, avec entrée en vigueur progressive à partir de décembre 2027; une seule déclaration peut couvrir plusieurs services, et les résultats de tests de chaque service l’alimentent. Elle est actualisée tous les 12 mois et conservée sous forme électronique pendant quatre ans, de sorte qu’elle demeure une obligation vivante aussi longtemps que le service fonctionne. Les personnes qui ne peuvent pas utiliser le service seules sont soutenues par téléphone ou en personne. Le personnel qui construit ou achète des technologies numériques tient sa formation en accessibilité à jour.",
            internalLinks: [
              {
                phrase: "soutenues par téléphone ou en personne",
                to: THREADS["joined-up-delivery"].path,
              },
            ] satisfies InternalPhraseLink[],
          },
        ],
      },
      {
        title: "Sunset.",
        preview: "Garder le remplacement accessible, et ne laisser personne en plan.",
        popup: [
          {
            text:
              "Quand un service est retiré ou remplacé, l’accessibilité se poursuit dans ce qui suit : un remplacement est construit selon la norme dès le départ, et le contenu transféré conserve sa structure accessible. Pendant que l’ancien service fonctionne encore, sa déclaration d’accessibilité et son canal de rétroaction restent actifs. Personne ne devrait se retrouver sans moyen accessible d’accomplir la tâche pendant le changement.",
          },
        ],
      },
    ] satisfies AccessibilityPhasePreviewBlock[],
  },

  furtherReading: {
    text:
      "La Loi canadienne sur l’accessibilité, le Règlement canadien sur l’accessibilité, CAN/ASC-EN 301 549 et la Boîte à outils de l’accessibilité numérique figurent tous dans les Sources ci-dessous. Pour comprendre pourquoi l’accessibilité compte, l’introduction du W3C à l’accessibilité du Web est le point de départ le plus simple, et les orientations d’autres gouvernements valent le détour : le Service Manual du Royaume-Uni sur le numérique assisté et les ressources d’approvisionnement de la section 508 des États-Unis. Pour savoir qui fixe la barre au pays et ce qui s’en vient, Normes d’accessibilité Canada est l’organisme fédéral de normalisation, avec la définition du handicap, les sept domaines prioritaires, et une base de données gratuite des normes publiées et en cours. Quand l’équipe a besoin de savoir comment construire concrètement une page accessible, les tutoriels du W3C WAI donnent des orientations travaillées sur les images, les formulaires, les tableaux et la structure de page, et le guide de WebAIM sur l’accessibilité au clavier montre comment vérifier que tout fonctionne sans souris.",
    externalLinks: [
      { phrase: "l’introduction du W3C à l’accessibilité du Web", linkKey: "w3c-wai-accessibility-intro" },
      { phrase: "le numérique assisté", linkKey: "uk-service-manual-assisted-digital" },
      { phrase: "les ressources d’approvisionnement de la section 508", linkKey: "section508-gov" },
      { phrase: "Normes d’accessibilité Canada", linkKey: "asc-creating-accessibility-standards" },
      { phrase: "les tutoriels du W3C WAI", linkKey: "w3c-wai-tutorials" },
      { phrase: "le guide de WebAIM sur l’accessibilité au clavier", linkKey: "webaim-keyboard-accessibility" },
    ] satisfies ExternalPhraseLink[],
  },

  sources: [
    {
      label: "Instrument directeur",
      linkKey: "accessible-canada-act-summary" satisfies ExternalLinkKey,
      description:
        "Loi canadienne sur l’accessibilité (résumé d’EDSC; texte contraignant chez Justice) — https://www.canada.ca/en/employment-social-development/programs/accessible-canada/act-summary.html",
    },
    {
      label: "Instrument directeur",
      linkKey: "accessible-canada-regulations-digital-technologies" satisfies ExternalLinkKey,
      description:
        "Règlement canadien sur l’accessibilité, technologies numériques (EDSC) — https://www.canada.ca/en/employment-social-development/programs/accessible-canada-regulations-guidance/category-digital-technologies.html",
    },
    {
      label: "Instrument directeur",
      linkKey: "can-asc-en-301-549" satisfies ExternalLinkKey,
      description:
        "CAN/ASC-EN 301 549:2024, exigences d’accessibilité pour les TIC (Normes d’accessibilité Canada; PDF gratuit) — https://accessible.canada.ca/",
    },
    {
      label: "Référence complémentaire",
      linkKey: "policy-on-service-and-digital" satisfies ExternalLinkKey,
      description:
        "Orientation du SCT sur l’accessibilité des TIC (2026-03-02), au titre de la Politique sur les services et le numérique (art. 4.4.11); elle a abrogé l’ancienne Norme sur l’accessibilité des sites Web et fixe la règle de transition — https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32603",
    },
    {
      label: "Référence complémentaire",
      linkKey: "digital-accessibility-toolkit" satisfies ExternalLinkKey,
      description:
        "Boîte à outils de l’accessibilité numérique du GC (approvisionnement, tester vos produits, normes) — https://a11y.canada.ca/en/",
    },
    {
      label: "Référence complémentaire",
      linkKey: "aaact-program" satisfies ExternalLinkKey,
      description:
        "Programme AATIA, Services partagés Canada (formation, tests avec technologies adaptées, conseils en approvisionnement) — https://www.canada.ca/en/shared-services/services/employees-accessibility/aaact-program.html",
    },
    {
      label: "Référence complémentaire",
      linkKey: "wcag-22-quickref" satisfies ExternalLinkKey,
      description: "Référence rapide des WCAG 2.2 (W3C WAI) — https://www.w3.org/WAI/WCAG22/quickref/",
    },
    {
      label: "Référence complémentaire",
      linkKey: "w3c-wai-accessibility-intro" satisfies ExternalLinkKey,
      description:
        "Introduction du W3C à l’accessibilité du Web (W3C WAI) — https://www.w3.org/WAI/fundamentals/accessibility-intro/",
    },
    {
      label: "Référence complémentaire",
      linkKey: "webaim-wave" satisfies ExternalLinkKey,
      description: "WAVE de WebAIM (vérificateur automatisé gratuit) — https://wave.webaim.org/",
    },
    {
      label: "Référence complémentaire",
      linkKey: "section508-gov" satisfies ExternalLinkKey,
      description:
        "Section508.gov (États-Unis) — l’accessibilité imposée à l’achat — https://www.section508.gov/",
    },
    {
      label: "Référence complémentaire",
      linkKey: "nz-web-accessibility-standard" satisfies ExternalLinkKey,
      description:
        'Norme d’accessibilité Web du gouvernement de la Nouvelle-Zélande 1.2 — priorisation des cas « à enjeux élevés » — https://www.digital.govt.nz/standards-and-guidance/nz-government-web-standards/web-accessibility-standard-1-2',
    },
    {
      label: "Référence complémentaire",
      linkKey: "australia-dta-leave-no-one-behind" satisfies ExternalLinkKey,
      description:
        'DTA de l’Australie, « Ne laisser personne derrière » (anciennement critère 9) — des preuves d’accessibilité à chaque phase — https://www.digital.gov.au/policy/digital-experience/digital-service-standard/criterion-3',
    },
    {
      label: "Référence complémentaire",
      linkKey: "uk-service-manual-assisted-digital" satisfies ExternalLinkKey,
      description:
        "Service Manual du Royaume-Uni, accessibilité et numérique assisté — https://www.gov.uk/service-manual/helping-people-to-use-your-service",
    },
    {
      label: "Référence complémentaire",
      linkKey: "nng-accessible-web-design" satisfies ExternalLinkKey,
      description:
        "Nielsen Norman Group, lignes directrices d’utilisabilité pour une conception Web accessible — l’accessibilité, c’est l’utilisabilité — https://www.nngroup.com/reports/usability-guidelines-accessible-web-design/",
    },
    {
      label: "Référence complémentaire",
      linkKey: "asc-creating-accessibility-standards" satisfies ExternalLinkKey,
      description:
        "Normes d’accessibilité Canada (Élaboration de normes d’accessibilité) — https://accessible.canada.ca/creating-accessibility-standards",
    },
    {
      label: "Référence complémentaire",
      linkKey: "w3c-wai-tutorials" satisfies ExternalLinkKey,
      description: "Tutoriels du W3C WAI — https://www.w3.org/WAI/tutorials/",
    },
    {
      label: "Référence complémentaire",
      linkKey: "webaim-keyboard-accessibility" satisfies ExternalLinkKey,
      description: "Accessibilité au clavier de WebAIM — https://webaim.org/techniques/keyboard/",
    },
    {
      label: "Instrument directeur",
      linkKey: "cio-direction-ict-accessibility",
      description:
        "Orientation sur l’accessibilité des TIC (DPI du Canada, mars 2026) : a abrogé la Norme sur l’accessibilité des sites Web et fixe la transition vers le Règlement canadien sur l’accessibilité modifié.",
    },
    {
      label: "Modèles et outils",
      linkKey: "a11y-remediation-roadmap",
      description:
        "Le modèle de feuille de route pour la correction des problèmes d’accessibilité (SPC) : le plan de correction de ce qu’un rapport de conformité en matière d’accessibilité déclare non encore conforme.",
    },
    {
      label: "Référence complémentaire",
      linkKey: "esdc-a11y-training-guidance",
      description:
        "Lignes directrices pour offrir une formation sur les notions fondamentales de l’accessibilité numérique (EDSC) : l’obligation de formation que porte chaque membre d’une équipe numérique à partir de décembre 2027.",
    },
  ] satisfies SourceItem[],
} as const;
