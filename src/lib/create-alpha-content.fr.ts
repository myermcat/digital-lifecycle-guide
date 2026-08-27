import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Briefcase,
  Code2,
  Map,
  PencilRuler,
  PenTool,
  Route,
  Shield,
  ShieldAlert,
  ShoppingCart,
  Target,
  Users,
} from "lucide-react";
import {
  ACCESSIBILITY_EXCLUSION_GROUPS,
  ACCESSIBILITY_EXCLUSION_INTRO,
} from "@/lib/accessibility-exclusion-groups";
import type { LifecycleVisualAsset } from "@/lib/lifecycle-visuals";
import { LIFECYCLE_VISUALS } from "@/lib/lifecycle-visuals";
import type { ThreadContentSection, ThreadLinkedProse } from "@/lib/thread-rich-content";
import type { FinishBlock } from "@/components/SubphaseFinishSection";
import type { SourceItem } from "@/components/SourcesBlock";
import type { SectionNavLink } from "@/components/SubphaseSectionNav";
import type { SubphaseTeamRole } from "@/components/SubphaseTeamRoles";

export const ALPHA_EXTRACT = {
  spine: "L’Alpha sert à casser l’idée pendant que casser coûte peu.",
  opening: {
    text: "L’Alpha est la deuxième sous-phase de la Création. L’équipe reprend le problème issu de la Découverte et :",
    internalLinks: [
      { phrase: "Création", to: "/create" },
      { phrase: "Découverte", to: "/create-discovery" },
    ],
  } satisfies ThreadLinkedProse,
  workOutItems: [
    "dresse la liste des hypothèses les plus susceptibles de tuer l’idée, et les met à l’épreuve",
    "fabrique de quoi les éprouver : une esquisse ou une maquette si la question est de savoir de quoi cela devrait avoir l’air, un prototype cliquable si la question est de savoir comment cela devrait fonctionner, ou, quand le ministère achète, des prototypes que des fournisseurs construisent sous contrat",
    "le met devant des personnes qui ne font pas partie de l’équipe, et observe où elles bloquent",
  ],
  whatsNew: {
    label: "Nouveau depuis la Découverte",
    text: "L’équipe commence à fabriquer, et les utilisateurs commencent à essayer.",
  },
  closing: {
    text: "L’Alpha produit des esquisses, des maquettes et des prototypes. Qu’une partie devienne ou non le service fini dépend de la façon dont cela a été construit, et cette question est traitée plus bas dans cette page. Ce qui est reporté dans tous les cas, c’est la décision, ce que l’équipe a appris, et l’approche retenue. Seules les quelques personnes qui essaient ces choses les voient, jamais le public.",
    bold: [{ phrase: "dépend de la façon dont cela a été construit" }],
  } satisfies ThreadLinkedProse,
};

export const ALPHA_EXTRACT_CLOSING: ThreadLinkedProse = {
  text: "Un prototype qui démontre qu’une idée est fausse a fait son travail.",
  bold: [{ phrase: "Un prototype qui démontre qu’une idée est fausse a fait son travail." }],
};

export const ALPHA_PROTOTYPE_QUOTE = {
  title: "Vous n’avez besoin ni d’un fournisseur ni de développeurs pour commencer à prototyper.",
  body: "Les prototypes les moins coûteux exigent un stylo, ou une demi-journée et un outil d’IA.",
} as const;

export const ALPHA_ON_RAMP = {
  title: "Avant de commencer l’Alpha",
  intro:
    "L’Alpha commence là où la Découverte s’est arrêtée : il lui faut donc ce que la Découverte a produit. Ayez ceci avant de commencer :",
  items: [
    {
      text: "Un problème défini, avec la preuve qu’il est réel et qu’il vaut la peine d’être résolu.",
      bold: [{ phrase: "problème défini" }],
    },
    {
      text: "Une liste classée d’idées risquées à éprouver, et laquelle éprouver en premier.",
      bold: [{ phrase: "liste classée d’idées risquées" }],
    },
    {
      text: "L’équipe de la Découverte reconduite, à laquelle s’ajoute un développeur ou un technologue pour les prototypes codés. Les esquisses et les prototypes construits par l’IA qui les précèdent n’exigent personne de technique. Les mêmes personnes conservent le contexte et l’élan.",
      bold: [{ phrase: "L’équipe de la Découverte reconduite," }],
    },
    {
      text: "Du financement pour l’alpha, souvent à même le budget de fonctionnement existant du ministère, y compris un budget pour la recherche sur les utilisateurs.",
      bold: [{ phrase: "Du financement pour l’alpha" }],
    },
    {
      text: "L’équipe est libre d’arrêter, ou de revenir à la Découverte, si les idées ne tiennent pas.",
      bold: [{ phrase: "libre d’arrêter, ou de revenir à la Découverte" }],
    },
  ] satisfies readonly ThreadLinkedProse[],
};

export const ALPHA_PILLAR = {
  label: "LA QUESTION DÉCISIVE",
  title: "Éprouver d’abord l’hypothèse la plus risquée",
  body: {
    text: "Trouvez les hypothèses qui tueraient le service, et éprouvez-les en premier. Menez le test le moins coûteux qui pourrait démontrer que chacune est fausse. Une hypothèse qui tombe épargne le coût d’une mauvaise construction, et c’est une réussite. Une hypothèse qui tient a mérité le test suivant.",
    bold: [
      {
        phrase: "Trouvez les hypothèses qui tueraient le service, et éprouvez-les en premier.",
      },
    ],
  } satisfies ThreadLinkedProse,
  killersIntro: {
    text: "La plupart des services ne sont pas tués par leur logiciel. Les tueurs habituels :",
    bold: [{ phrase: "La plupart des services ne sont pas tués par leur logiciel." }],
  } satisfies ThreadLinkedProse,
  killers: [
    { text: "La politique ne le permet pas." },
    { text: "Personne n’a le pouvoir légal de le faire." },
    { text: "Les données dont dépend le service n’existent pas." },
    { text: "Les personnes visées n’utiliseront pas ce canal." },
    { text: "Un autre ministère détient une étape et ne la changera pas." },
  ] satisfies readonly ThreadLinkedProse[],
  ratioNote: {
    text: "La plupart des équipes passent leur Alpha dans l’autre sens, sur le prototype, parce que le prototype est la partie qu’elles peuvent voir et sur laquelle elles peuvent agir. C’est le décalage qu’il vaut la peine de remarquer. Une réponse technique négative peut certainement mettre fin à une idée : rien de tout cela ne dit d’omettre les tests techniques. Cela dit que le prototype est une raison parmi d’autres, et que les raisons au-dessus sont les plus faciles à manquer, les plus lentes à corriger, et généralement tranchées par quelqu’un à l’extérieur de l’équipe.",
    bold: [{ phrase: "C’est le décalage qu’il vaut la peine de remarquer." }],
  } satisfies ThreadLinkedProse,
  technicalNote: {
    text: "Les tueurs techniques sont réels eux aussi, et l’Alpha ne peut les mener que jusqu’à un certain point. L’Alpha répond à la question de savoir si une chose est possible : peut-on seulement se connecter au système officiel, les données sont-elles vraiment là, la sécurité acceptera-t-elle un jour cette approche. Savoir si c’est assez rapide sous une charge réelle, ou assez peu coûteux à exploiter, n’est pas connaissable avant la Bêta. Prévoyez-le. Ne prétendez pas l’avoir testé.",
    bold: [{ phrase: "L’Alpha répond à la question de savoir si une chose est possible" }],
  } satisfies ThreadLinkedProse,
  closingWarning: {
    text: "Engagez de l’argent dans une construction avant que les parties risquées tiennent, et tout ce qui suit est à risque.",
  } satisfies ThreadLinkedProse,
  href: "/thread/user-research",
  linkLabel: "Voir comment tester avec les utilisateurs →",
  icon: Target,
};

export type AlphaAccordionStage = {
  id: string;
  icon: LucideIcon;
  title: string;
  headerVisual?: LifecycleVisualAsset;
  sections: readonly ThreadContentSection[];
};

export const ALPHA_ACCORDION = {
  id: "what-to-find-out",
  title: "Ce qu’il faut faire pendant l’Alpha",
} as const;

export const ALPHA_ACCORDION_STAGES: readonly AlphaAccordionStage[] = [
  {
    id: "throwaway-prototypes",
    icon: PencilRuler,
    title: "Fabriquer des choses jetables et peu coûteuses, et essayer plus d’une approche.",
    headerVisual: LIFECYCLE_VISUALS.alphaPrototypeLadder,
    sections: [
      {
        text: "Fabriquez juste assez pour éprouver une idée, bien en deçà de la qualité de production, et attendez-vous à jeter le code et la plupart des idées. Essayez plusieurs approches du problème.",
      },
      {
        type: "subheading",
        text: "Maquette ou prototype : lequel répond à votre question",
      },
      {
        text: "Les maquettes montrent de quoi un service a l’air. Les prototypes montrent comment il fonctionne. Rien d’officiel ne définit ni l’un ni l’autre : la question utile est donc de savoir lequel répond à ce que vous cherchez à découvrir : une maquette tant que la question est de savoir si les gens comprennent la chose, un prototype une fois que la question est de savoir comment ils s’y déplacent.",
        bold: [
          {
            phrase: "Les maquettes montrent de quoi un service a l’air. Les prototypes montrent comment il fonctionne.",
          },
        ],
        externalLinks: [
          { phrase: "Rien d’officiel ne définit ni l’un ni l’autre", linkKey: "miro-mockup-vs-prototype" },
        ],
      },
      {
        text: "Un prototype peut être interactif sans rien avoir derrière, parce que l’interaction n’est pas du calcul. Appuyez sur Soumettre et il affiche l’écran de confirmation que quelqu’un a dessiné plus tôt. Rien n’a été soumis nulle part, aucune demande n’existe, et il n’y a personne à l’autre bout pour en traiter une. C’est assez pour voir où les gens bloquent, et pas assez pour dire si les règles sont bonnes ou si cela tient sous la charge. L’Alpha écarte des choses, et la Bêta découvre si ce qui a survécu fonctionne réellement.",
        bold: [{ phrase: "l’interaction n’est pas du calcul" }],
      },
      {
        type: "subheading",
        text: "Quoi fabriquer en premier, et quoi ne fabriquer qu’en cas de nécessité",
      },
      {
        text: "Montez cette échelle, en vous arrêtant dès que la question a sa réponse :",
      },
      {
        type: "orderedList",
        items: [
          {
            bold: "Papier, esquisses et maquettes filaires.",
            text: " La façon la moins coûteuse d’expliquer une idée à quelqu’un, et la façon la moins coûteuse de découvrir qu’elle est mauvaise. Une maquette filaire en est la version mise au propre : des cases et des étiquettes montrant ce qui figure sur une page et dans quel ordre, sans couleur ni image de marque.",
          },
          {
            bold: "Une maquette.",
            text: " Les écrans dessinés correctement, dans un outil de conception ou par un collègue qui en possède un. Cela ressemble au service et cela ne fait toujours rien.",
          },
          {
            bold: "Un prototype construit avec l’IA.",
            text: " Un certain nombre d’outils en construisent maintenant un, fonctionnel et cliquable, à partir d’une consigne écrite, dont Lovable, Cursor, Claude Code, v0, Bolt et Replit, et il en arrive constamment. Cela n’exige aucune compétence technique : décrivez l’idée en mots simples et regardez ce qui revient. Prévoyez environ une demi-journée en tout, apprentissage de l’outil compris.",
          },
          {
            bold: "Un prototype codé,",
            text: " une fois que la recherche montre la voie. Un développeur le construit, souvent directement à partir de votre maquette.",
          },
        ],
      },
      {
        text: "L’intérêt de celui construit par l’IA, c’est qu’une équipe peut mettre une idée devant des collègues et des intervenants au lieu de la décrire en mots. Leur réaction montre vite si elle tient debout.",
      },
      {
        type: "subheading",
        text: "À qui le montrer, et quoi leur demander",
      },
      {
        text: "À qui vous le montrez dépend de ce que vous avez fabriqué. Une esquisse sur papier se présente à un collègue ou à un intervenant, et la seule question qui vaille est de savoir s’il a compris ce que le service serait. Dès que quelque chose est cliquable, cela mérite une séance de recherche : cinq ou six personnes qui ressemblent aux vrais utilisateurs du service l’essaient, et l’équipe observe où elles bloquent.",
        bold: [{ phrase: "À qui vous le montrez dépend de ce que vous avez fabriqué." }],
      },
    ],
  },
  {
    id: "prototype-without-vendor",
    icon: PenTool,
    title: "Vous n’avez besoin ni d’un fournisseur ni de développeurs pour commencer à prototyper.",
    sections: [
      {
        text: "C’est l’objection qui empêche des équipes de faire l’Alpha. Elle ne devrait pas.",
      },
      {
        type: "unorderedList",
        items: [
          {
            text: "Une esquisse sur papier exige une personne capable de dessiner. Esquissez les écrans, mettez-les devant un collègue, et demandez s’il a compris ce que le service est censé faire. Le papier ne peut pas vous dire où un utilisateur bloquerait, parce qu’il bloquera sur le papier. Cela coûte un après-midi et cela peut quand même changer ce qu’est le service.",
            bold: [{ phrase: "Une esquisse sur papier exige une personne capable de dessiner." }],
          },
          {
            text: "Un prototype cliquable exige une demi-journée, et vous pouvez le faire vous-même. Les outils d’IA prennent une description écrite et en construisent un; prévoyez que la demi-journée comprenne l’apprentissage de l’outil. Un collègue qui connaît Figma ou Penpot peut construire une maquette de la même façon, même si demander la moitié d’une journée de travail à quelqu’un reste une vraie demande.",
            bold: [
              { phrase: "Un prototype cliquable exige une demi-journée, et vous pouvez le faire vous-même." },
            ],
          },
          {
            text: "Si le ministère achète une Équipe, le fournisseur est déjà là. Ce contrat est signé à l’ouverture de l’Alpha, parce que c’est l’équipe qui réalise l’Alpha : elle prototype donc aux côtés du ministère.",
            bold: [
              { phrase: "Si le ministère achète une Équipe, le fournisseur est déjà là." },
            ],
          },
        ],
      },
      {
        text: "Quiconque finit par construire le service doit se faire dire ce qu’on veut, et une chose qu’il peut tenir et cliquer le dit mieux qu’une page de prose. Cela ne remplace pas les exigences. Ce qu’une maquette peut et ne peut pas transporter dans un contrat est exposé sous la rédaction des exigences, plus bas dans cette page.",
        bold: [{ phrase: "Cela ne remplace pas les exigences." }],
      },
    ],
  },
  {
    id: "joined-up",
    icon: Route,
    title: "Résoudre le problème entier, de façon intégrée.",
    sections: [
      {
        text: "Cadrez correctement du point de vue de l’utilisateur, et reprenez la carte du parcours issue de la Découverte. Là où le service n’est qu’une étape d’un parcours plus long, vérifiez si les autres services et équipes peuvent changer pour faire fonctionner ce parcours, et prévoyez de réutiliser l’information que le gouvernement détient déjà pour qu’on ne la redemande pas aux gens. C’est la suite de la prestation intégrée.",
        bold: [
          { phrase: "Cadrez correctement" },
          { phrase: "réutiliser l’information que le gouvernement détient déjà" },
        ],
        internalLinks: [{ phrase: "prestation intégrée", to: "/thread/joined-up-delivery" }],
      },
    ],
  },
  {
    id: "constraints",
    icon: Shield,
    title: "Travailler à l’intérieur des contraintes.",
    sections: [
      {
        text: "Éprouvez les contraintes fermes trouvées pendant la Découverte : lois, contrats existants et technologies patrimoniales. À la fin de l’Alpha, soyez en mesure de dire comment le service répondra au besoin à l’intérieur de ces contraintes, ou d’exposer le plan pour lever une contrainte qui peut bouger.",
        bold: [{ phrase: "comment le service répondra au besoin à l’intérieur de ces contraintes" }],
      },
    ],
  },
  {
    id: "accessibility",
    icon: Users,
    title: "Concevoir pour l’accessibilité et l’inclusion.",
    sections: [
      {
        text: "Comprenez les principes d’accessibilité et incluez dans la recherche les personnes les plus susceptibles d’être exclues.",
      },
      {
        text: ACCESSIBILITY_EXCLUSION_INTRO,
      },
      {
        type: "unorderedList",
        items: [...ACCESSIBILITY_EXCLUSION_GROUPS],
      },
      {
        text: "Un prototype est trop grossier pour éprouver la conformité complète : servez-vous donc de l’Alpha pour préparer le travail d’accessibilité en vue de la Bêta, où le contrat est signé. Déterminez quelles clauses de la norme le service doit respecter, pour qu’elles puissent entrer au contrat plutôt que d’être débattues plus tard. Réservez les tests tôt. Les vérificateurs automatisés ne détectent qu’une fraction des problèmes. L’accessibilité couvre l’obligation et la façon d’y répondre.",
        internalLinks: [{ phrase: "accessibilité", to: "/thread/accessibility" }],
      },
      {
        text: "La norme a un nom : CAN/ASC EN 301 549, à laquelle le Règlement canadien sur l’accessibilité exige que les pages Web, applications et documents numériques nouveaux et mis à jour se conforment. Les Lignes directrices sur la règlementation sur l’accessibilité des technologies numériques précisent ce qui doit s’y conformer, et à quel moment. La Boîte à outils de l’accessibilité numérique montre comment construire et tester en fonction de celle-ci.",
        externalLinks: [
          { phrase: "CAN/ASC EN 301 549", linkKey: "en-301-549" },
          {
            phrase: "Lignes directrices sur la règlementation sur l’accessibilité des technologies numériques",
            linkKey: "esdc-a11y-regulations-guidance",
          },
          { phrase: "Boîte à outils de l’accessibilité numérique", linkKey: "digital-accessibility-toolkit" },
        ],
      },
    ],
  },
  {
    id: "build-or-buy",
    icon: ShoppingCart,
    title: "Se préparer à construire ou à acheter.",
    sections: [
      {
        type: "subheading",
        text: "Trois approbations à lancer avant le premier prototype",
      },
      {
        text: "Faites intervenir dès maintenant l’équipe Web du ministère et le chef des communications. Tout ce qui est publié sous la marque canada.ca doit utiliser les gabarits obligatoires, l’architecture de l’information établie, l’en-tête et le pied de page globaux, et le guide de style du contenu. Ceux-ci limitent l’apparence possible d’un service et l’endroit où il peut résider. Les équipes les rencontrent habituellement à la Bêta, quand un prototype à conception sur mesure parvient à l’équipe Web pour la première fois et doit être refait.",
        bold: [
          { phrase: "Faites intervenir dès maintenant l’équipe Web du ministère et le chef des communications." },
        ],
      },
      {
        text: "L’adresse Web n’appartient pas à l’équipe du service. Elle se règle par l’entremise de l’équipe Web du ministère, qui dépose la demande exigée par le domaine canada.ca, et cela peut prendre un certain temps. Lancez la démarche avant de promettre une date de lancement à qui que ce soit.",
        bold: [{ phrase: "n’appartient pas à l’équipe du service" }],
      },
      {
        text: "Tranchez ici aussi entre le Web adaptatif et une application téléchargeable, à partir des preuves issues de la recherche. Une application téléchargeable est testée, publiée puis retirée de façon centralisée, ce qui ajoute une dépendance que le ministère ne contrôle ni au lancement ni au retrait.",
      },
      {
        type: "subheading",
        text: "Préparez ensuite le contrat et l’argent",
      },
      {
        text: "Arrêtez l’approche et l’outillage pour la Bêta, et déterminez s’ils offrent un bon rapport qualité-prix. L’Alpha est le moment où l’équipe se prépare à acquérir la construction : commencez donc tôt. L’approvisionnement couvre l’achat. C’est ici que les droits de sortie et la portabilité des données ont leur place dans le contrat, avec les mécanismes qui permettent au Canada de changer de cap plus tard :",
        bold: [
          { phrase: "l’approche et l’outillage" },
          { phrase: "les droits de sortie et la portabilité des données" },
        ],
        internalLinks: [{ phrase: "approvisionnement", to: "/thread/procurement" }],
      },
      {
        text: "Si votre voie signe à l’ouverture de l’Alpha plutôt qu’à celle de la Bêta, alors tout ce qui doit figurer au contrat doit se régler ici. L’un de ces éléments est facile à manquer : ce qu’il advient à la fin des documents que le service détiendra, c’est-à-dire les demandes, décisions, dossiers de cas et correspondance qu’il crée. La durée de conservation de chaque type, et le fait qu’ils soient éventuellement transférés à Bibliothèque et Archives Canada ou détruits, doit être inscrit au contrat lorsqu’un fournisseur en détiendra ou en traitera. L’intendance des données couvre la façon dont cette décision se prend.",
        bold: [{ phrase: "tout ce qui doit figurer au contrat doit se régler ici" }],
        internalLinks: [{ phrase: "intendance des données", to: "/thread/data-stewardship" }],
      },
      {
        type: "unorderedList",
        items: [
          {
            text: "Portes de sortie : le Canada choisit de ne pas exercer une option, ou cesse d’attribuer d’autres travaux.",
            bold: [{ phrase: "Off-ramps:" }],
          },
          {
            text: "Points de contrôle : des points du contrat où les travaux ne peuvent pas se poursuivre tant que le Canada ne l’a pas dit. Ce sont des points de contrôle contractuels, rédigés par vous, distincts des points de contrôle officiels que le service doit franchir de toute façon.",
            bold: [{ phrase: "Gates:" }],
          },
          {
            text: "Le pivot : les travaux passent à un fournisseur de secours déjà sous contrat.",
            bold: [{ phrase: "Le pivot :" }],
          },
        ],
      },
      {
        text: "Faites approuver l’argent pour tout le parcours. Lorsqu’un contrat de prototype comporte une option de construction, la valeur qui compte pour l’approbation est le total que le parcours pourrait atteindre. Les contrats ne doivent pas être fractionnés pour rester sous une limite d’approbation. Lorsque le total risque de dépasser ce que le ministère peut approuver seul, entamez cette conversation à l’étape de la stratégie, pendant qu’il est encore temps de façonner l’approvisionnement autour de la réponse. Le Financement couvre la façon dont l’argent est obtenu et conservé.",
        bold: [{ phrase: "Faites approuver l’argent pour tout le parcours." }],
        internalLinks: [{ phrase: "Financement", to: "/thread/funding" }],
      },
      {
        text: "Déterminez les menaces auxquelles le service fera face et la façon dont il sera gardé sécurisé. Une Évaluation de la menace et des risques les énumère et les classe. Elle se fait trois fois : ici, contre la conception de haut niveau; de nouveau contre la conception détaillée à mesure que la construction est précisée; et une troisième fois contre le système fini en Bêta, ce qui est le passage sur lequel repose l’autorisation d’exploiter.",
      },
      {
        text: "Découvrez dès maintenant qui signera cette autorisation, parce que ce n’est pas automatique. C’est normalement le responsable opérationnel pour un service appartenant à un seul ministère, le dirigeant principal de l’information du Canada pour un système commun ou intégré, et le gestionnaire du programme pour un système partagé par deux organisations ou plus. La Bêta a besoin de la réponse avant l’ouverture de la bêta privée, et c’est une question peu coûteuse ici et coûteuse à ce moment-là. La sécurité couvre la façon dont le travail d’évaluation se fait.",
        bold: [{ phrase: "Découvrez dès maintenant qui signera cette autorisation" }],
        internalLinks: [{ phrase: "sécurité", to: "/thread/security" }],
      },
      {
        text: "La direction retenue est elle aussi évaluée : les comités d’examen de l’architecture des ministères pèsent chaque initiative numérique au regard du Cadre de l’architecture intégrée du gouvernement du Canada, qui demande aux équipes de chercher ce qui existe déjà avant d’acheter ou de construire du neuf. Les plus grandes initiatives passent ensuite au comité d’examen à l’échelle du gouvernement. Arrivez avec le balayage de réutilisation de la Découverte en main et l’examen va vite.",
        bold: [
          {
            phrase: "chercher ce qui existe déjà avant d’acheter ou de construire du neuf",
          },
        ],
        externalLinks: [
          {
            phrase: "Cadre de l’architecture intégrée du gouvernement du Canada",
            linkKey: "gc-enterprise-architecture-framework",
          },
        ],
      },
    ],
  },
  {
    id: "write-the-requirements",
    icon: Briefcase,
    title: "Rédiger les exigences, et savoir lesquelles peuvent sans risque entrer au contrat.",
    sections: [
      {
        text: "Les exigences se présentent en trois catégories, et les séparer détermine ce que coûtera un changement ultérieur. Changez une exigence encore dans un prototype et quelqu’un la redessine en un après-midi. Changez-en une qui est inscrite dans un contrat signé et cela devient une modification de contrat, dont le prix est fixé par le seul fournisseur dans la salle. Les modifications prévues comptent dans la valeur du contrat qui doit rester sous la limite d’approbation du ministère, et franchir cette limite envoie le changement au Conseil du Trésor avant qu’il puisse être fait.",
        bold: [{ phrase: "les séparer détermine ce que coûtera un changement ultérieur" }],
        externalLinks: [
          {
            phrase: "Les modifications prévues comptent dans la valeur du contrat",
            linkKey: "directive-procurement",
          },
        ],
      },
      {
        type: "subheading",
        text: "Quelles exigences vont au contrat, et lesquelles restent en dehors",
      },
      {
        text: "Où elles vont répond à ce à quoi elles servent. L’énoncé des travaux est rédigé à partir d’elles, et il est annexé au contrat, ce qui en fait la chose à laquelle le fournisseur est réellement tenu.",
        bold: [{ phrase: "rédigé à partir d’elles" }],
        internalLinks: [{ phrase: "L’énoncé des travaux", to: "/thread/procurement" }],
      },
      {
        type: "unorderedList",
        items: [
          {
            text: "Les exigences opérationnelles deviennent l’objectif et le contexte de l’énoncé des travaux.",
            bold: [{ phrase: "Les exigences opérationnelles" }],
          },
          {
            text: "Les exigences non fonctionnelles deviennent ses niveaux de service, et c’est en fonction d’elles que les soumissions sont cotées.",
            bold: [{ phrase: "Les exigences non fonctionnelles" }],
          },
          {
            text: "Les exigences fonctionnelles restent en dehors du contrat. Le prototype et la conception les portent.",
            bold: [{ phrase: "Les exigences fonctionnelles" }],
          },
        ],
      },
      {
        text: "Les exigences elles-mêmes ne sont déposées nulle part. Au moment où quelqu’un à l’extérieur du ministère les voit, elles sont devenues le contrat.",
      },
      {
        type: "subheading",
        text: "Les exigences comptent encore quand personne n’achète",
      },
      {
        text: "Une équipe qui construit le service elle-même a quand même besoin des trois catégories d’exigences devant elle, parce que c’est ainsi qu’on sait quoi construire. L’achat ajoute une forme imposée et une signature; il ne crée pas le besoin. Un énoncé des travaux n’est pas exigé pour une construction interne, même si en rédiger un peut être plus facile que de partir d’une page blanche, puisqu’il vient avec un gabarit.",
        bold: [{ phrase: "a quand même besoin des trois catégories d’exigences devant elle" }],
      },
      {
        type: "subheading",
        text: "Joindre la maquette explique, cela n’oblige pas",
      },
      {
        text: "Une maquette peut être jointe à l’énoncé des travaux en annexe, et cela vaut la peine, parce qu’elle montre à un soumissionnaire ce qu’on veut mieux que n’importe quel paragraphe. La joindre explique. Cela n’oblige pas. Rien ne lie le fournisseur à moins que le contrat ne le dise : donc si une page doit être construite telle que dessinée, un critère d’acceptation doit le nommer.",
        bold: [{ phrase: "La joindre explique." }],
      },
      {
        type: "subheading",
        text: "La règle, et pourquoi un changement ultérieur coûte ce qu’il coûte",
      },
      {
        text: "Mettez les exigences opérationnelles et non fonctionnelles dans le contrat. Gardez les exigences fonctionnelles en dehors.",
        bold: [{ phrase: "Mettez les exigences opérationnelles et non fonctionnelles dans le contrat." }],
      },
      {
        text: "À un fournisseur tenu au besoin opérationnel et aux niveaux de service, on peut dire en cours de route qu’une page ne va pas, et la corriger fait partie du travail. Un fournisseur tenu à une conception de page convenue avant que quiconque l’ait testée construira cette conception, et chaque changement coûte une modification de contrat.",
      },
      {
        type: "subheading",
        text: "Ce que les règles exigent réellement, selon la valeur en dollars",
      },
      {
        text: "Définir les exigences est obligatoire, et la Directive sur la gestion de l’approvisionnement en confie la responsabilité au responsable opérationnel. Aucun instrument ne fournit de gabarit ni de formulaire, et c’est pourquoi cette page consacre son temps à la façon de les rédiger. La valeur en dollars change la paperasse plutôt que l’obligation :",
        bold: [{ phrase: "Définir les exigences est obligatoire" }],
        externalLinks: [
          {
            phrase: "Directive sur la gestion de l’approvisionnement",
            linkKey: "directive-procurement",
          },
        ],
      },
      {
        type: "unorderedList",
        items: [
          {
            text: "Au-delà de 40 000 $ de services professionnels, l’autorité contractante reçoit un énoncé des travaux écrit avant l’adjudication, et le responsable opérationnel signe une confirmation que les exigences ont été définies.",
            bold: [{ phrase: "Au-delà de 40 000 $ de services professionnels" }],
          },
          {
            text: "En deçà, l’achat est plus léger : contrats et bons de commande de faible valeur, sans énoncé des travaux obligatoire. Les exigences doivent quand même exister, puisque la commande est rédigée à partir d’elles.",
            bold: [{ phrase: "En deçà, l’achat est plus léger" }],
          },
        ],
      },
    ],
  },
  {
    id: "measure-success",
    icon: Activity,
    title: "Préciser la façon dont vous mesurerez la réussite.",
    sections: [
      {
        text: "Reprenez les références établies pendant la Découverte et affinez les indicateurs qui vous diront si le service fonctionne. Le fil Surveillance et instrumentation couvre les signaux et les cibles.",
        internalLinks: [
          {
            phrase: "Surveillance et instrumentation",
            to: "/thread/monitoring-and-instrumentation",
          },
        ],
      },
    ],
  },
];

export const ALPHA_TEAM = {
  title: "L’équipe qu’il vous faut",
  intro: {
    text: "L’Alpha conserve l’équipe de la Découverte et y ajoute quelqu’un capable de construire. Garder les mêmes personnes préserve le contexte et l’élan. Les rôles minimaux (une personne peut en cumuler plusieurs) :",
    bold: [{ phrase: "Les rôles minimaux" }],
  } satisfies ThreadLinkedProse,
  roles: [
    {
      role: "Chercheur en expérience utilisateur",
      icon: Map,
      body: { text: "planifie et mène les tests." },
    },
    {
      role: "Concepteur",
      icon: PenTool,
      body: { text: "façonne les prototypes et le parcours." },
    },
    {
      role: "Développeur ou technologue",
      icon: Code2,
      body: { text: "construit les prototypes jetables et sonde la faisabilité." },
    },
    {
      role: "Responsable des activités et des politiques",
      icon: Briefcase,
      body: { text: "connaît le programme, les règles et les contraintes." },
    },
    {
      role: "Responsable opérationnel",
      icon: Users,
      body: { text: "oriente le travail et assume la décision de continuer, de revenir en arrière ou d’arrêter." },
    },
  ] satisfies readonly SubphaseTeamRole[],
  closing: {
    text: "Au gouvernement du Canada, l’équipe est habituellement composée d’un mélange de fonctionnaires et de fournisseurs. Un alpha est court : environ six à douze semaines est typique.",
    bold: [{ phrase: "environ six à douze semaines" }],
  } satisfies ThreadLinkedProse,
};

export const ALPHA_EXERCISE = {
  label: "L’EXERCICE",
  title: "Ce qui pourrait mettre le service hors service, et combien de temps il peut le rester",
  icon: ShieldAlert,
  sectionId: "what-could-go-wrong",
  halfDayHeading: "Accordez ensuite une demi-journée à la troisième question",
  bodyIntro: {
    text: "Deux réponses font plus que toutes les autres pour déterminer ce que ce service coûte à exploiter et la quantité d’ingénierie qu’il faut mettre dessous. Ce ne sont pas les seuls facteurs, mais ce sont ceux qu’on laisse le plus souvent traîner jusqu’à ce qu’il soit trop tard pour agir. Trompez-vous dans un sens et vous surdimensionnez un service dont personne ne s’ennuierait pendant quinze jours. Trompez-vous dans l’autre et des gens subissent un préjudice dans les heures suivant une panne que personne n’avait prévue. Une demi-journée avec les bonnes personnes règle les deux :",
    bold: [
      {
        phrase: "Deux réponses font plus que toutes les autres",
      },
    ],
  } satisfies ThreadLinkedProse,
  bodyQuestions: [
    {
      text: "Qu’est-ce qui pourrait arrêter le service, ou nuire aux personnes qui l’utilisent?",
    },
    {
      text: "Combien de temps peut-il être hors service avant qu’un préjudice réel commence?",
    },
  ] satisfies readonly ThreadLinkedProse[],
  bodyAfterQuestions: {
    text: "Faites-le à la fin de l’Alpha, pendant que la conception peut encore absorber les réponses.",
  } satisfies ThreadLinkedProse,
  sizingHeading: "Commencez par trois questions sur la criticité",
  sizingIntro: {
    text: "La criticité, c’est l’ampleur du préjudice qui suit si ce service est indisponible, erroné ou compromis. Ce n’est pas un jugement sur l’importance ressentie du travail, et un gros budget ne rend pas un service essentiel. Le nombre d’utilisateurs ne compte que par le préjudice qu’il porte : un service utilisé par des millions de personnes fait habituellement plus de dégâts quand il tombe, et un service utilisé par quelques centaines peut être tout aussi essentiel si ce qu’il fait pour elles est urgent. Asseyez-vous avec les personnes qui savent à quoi sert le service et répondez à trois questions. Ce qui en ressort détermine quelles obligations officielles s’appliquent au service, quel niveau de protection son information exige, et quelle quantité d’ingénierie doit se trouver dessous.",
    bold: [
      {
        phrase:
          "La criticité, c’est l’ampleur du préjudice qui suit si ce service est indisponible, erroné ou compromis.",
      },
    ],
  } satisfies ThreadLinkedProse,
  sizingColumns: ["Question", "Ce que la réponse détermine"],
  sizingRows: [
    {
      term: "Quelles obligations s’y rattachent?",
      cells: [
        "Un service accessible au public doit les deux langues officielles, la norme d’accessibilité et une autorisation d’exploiter. Un outil interne en doit moins. Celle-ci porte sur les obligations, pas sur l’importance.",
      ],
    },
    {
      term: "Que contient-il?",
      cells: [
        "Rien de sensible, ou des renseignements personnels et financiers. La seconde réponse entraîne une évaluation de la protection de la vie privée, une catégorisation de sécurité, et des règles sur l’endroit où les données peuvent résider.",
      ],
    },
    {
      term: "Que se passe-t-il quand il tombe en panne?",
      cells: [
        "Un inconvénient, ou un préjudice. C’est celle qui exige un vrai travail pour y répondre, et c’est de cela que traite le reste de ce bloc.",
      ],
    },
  ],
  threatsHeading: "D’abord, nommer ce qui pourrait mal tourner",
  threatsIntro: {
    text: "Les menaces se présentent en trois catégories, et les orientations du gouvernement du Canada préviennent lesquelles les équipes oublient :",
  } satisfies ThreadLinkedProse,
  threatItems: [
    {
      text: "délibérées : vol, altération, un initié, une attaque coordonnée",
      bold: [{ phrase: "deliberate:" }],
    },
    {
      text: "accidentelles : erreur humaine, un entrepreneur qui tire le mauvais câble, une défaillance logicielle, des dommages mécaniques ou électriques",
      bold: [{ phrase: "accidental:" }],
    },
    {
      text: "naturelles : inondation, incendie, tempête, tremblement de terre, une pandémie",
      bold: [{ phrase: "natural:" }],
    },
  ] satisfies readonly ThreadLinkedProse[],
  threatsClosing: {
    text: "Le guide d’évaluation de la GRC le dit clairement : il peut être facile de négliger les menaces naturelles et accidentelles, la plus grande attention allant aux menaces délibérées. La plupart des équipes imaginent un attaquant et oublient l’inondation.",
    bold: [{ phrase: "il peut être facile de négliger les menaces naturelles et accidentelles" }],
  } satisfies ThreadLinkedProse,
  numbersPointer: {
    text: "Quatre chiffres ressortent de cette demi-journée : combien de temps le service peut être indisponible avant qu’un préjudice réel commence, ce qui compte comme suffisant pendant qu’il est hors service, à quelle vitesse il doit être rétabli, et quelle quantité de données récentes peut être perdue. La sécurité définit chacun d’eux et précise qui les reçoit.",
    bold: [{ phrase: "Quatre chiffres ressortent de cette demi-journée" }],
    internalLinks: [{ phrase: "La sécurité définit chacun d’eux", to: "/thread/security" }],
  } satisfies ThreadLinkedProse,
  scaleNote: {
    text: "Quatre heures et deux semaines ne sont pas deux réglages du même service. Elles achètent des architectures différentes et des factures d’hébergement différentes. C’est donc en réalité une décision de dépense, même si elle arrive sous une étiquette de politique de sécurité. Répondez-y ici, avec les personnes qui savent à quoi sert le service. Laissez cela à un formulaire que quelqu’un remplira plus tard, et le budget sera fixé par celui qui se trouve à tenir le formulaire.",
    bold: [{ phrase: "en réalité une décision de dépense" }],
  } satisfies ThreadLinkedProse,
  handoverHeading: "Puis transmettez-les",
  ownershipNote: {
    text: "Les chiffres ne restent pas avec l’équipe une fois fixés. Ils vont au coordonnateur de la continuité des activités du ministère, parce que le ministère tient un seul plan de continuité couvrant tout ce qu’il exploite. La sécurité explique ce qui est transmis et ce que l’équipe garde.",
    bold: [{ phrase: "Les chiffres ne restent pas avec l’équipe une fois fixés." }],
    internalLinks: [{ phrase: "sécurité", to: "/thread/security" }],
  } satisfies ThreadLinkedProse,
  confusionNote: {
    text: "Faire l’évaluation est exigé pour chaque service, quelle qu’en soit la taille, sans seuil. La rédiger sous forme de rapport ne l’est pas. Les orientations disent qu’un rapport autonome n’est ni recommandé ni exigé, et il n’y a nulle part où en déposer un : rien ne viendra donc vous le réclamer. Ce qui la rend réelle, c’est l’autorisation d’exploiter à la fin de la Bêta. La personne qui la signe accepte le risque, et sans l’évaluation elle n’a rien à accepter.",
    bold: [
      { phrase: "Faire l’évaluation est exigé pour chaque service" },
      { phrase: "La rédiger sous forme de rapport ne l’est pas." },
    ],
  } satisfies ThreadLinkedProse,
  closing: {
    text: "Trois instruments se trouvent sous cette demi-journée : la méthodologie harmonisée d’Évaluation de la menace et des risques pour ce qui pourrait mal tourner, la Norme sur la catégorisation de sécurité pour la sensibilité de l’information, et l’annexe D de la Directive sur la gestion de la sécurité pour la criticité du service et la durée pendant laquelle il peut être hors service. La sécurité explique comment l’évaluation se fait.",
    internalLinks: [
      { phrase: "La sécurité explique comment l’évaluation se fait", to: "/thread/security" },
    ],
    externalLinks: [
      {
        phrase: "méthodologie harmonisée d’Évaluation de la menace et des risques",
        linkKey: "harmonized-tra-methodology",
      },
      {
        phrase: "Norme sur la catégorisation de sécurité",
        linkKey: "standard-on-security-categorization",
      },
      {
        phrase: "Directive sur la gestion de la sécurité",
        linkKey: "directive-security-management",
      },
    ],
  } satisfies ThreadLinkedProse,
  href: "/thread/security",
  linkLabel: "Voir comment se fait l’évaluation →",
};

export const ALPHA_BUYER_BEWARE = {
  label: "SI QUELQU’UN D’AUTRE LE CONSTRUIT",
  title: "Un prototype soigné n’est pas un produit presque terminé.",
  body: "Quand un fournisseur fait la démonstration de quelque chose qui clique, s’anime et a l’air fini, ce que vous regardez est la surface. Les règles, les intégrations, la sécurité et tout ce qui doit se produire quand une personne fait la mauvaise chose peuvent ne pas exister du tout, et les construire peut prendre plus de temps que tout ce qu’il y avait dans la démonstration. Ce n’est habituellement pas qu’on vous mente. C’est à cela que sert un prototype, et c’est pourquoi la finition est dangereuse : plus cela a l’air réussi, plus tout le monde dans la salle suppose que c’est à une semaine de la fin. Demandez ce qui est réel derrière chaque écran, et posez des questions sur les parties que personne ne vous a montrées.",
  bodyBold: "Demandez ce qui est réel derrière chaque écran, et posez des questions sur les parties que personne ne vous a montrées.",
} as const;

export const ALPHA_AI_CALLOUT = {
  label: "CONSTRUCTIONS PAR IA",
  title: "Traitez un prototype construit par l’IA exactement comme du papier.",
  body: "Les outils fabriquent en une demi-journée quelque chose de convaincant, ce qui est à la fois tout leur intérêt et tout leur risque. Il est là pour être archivé, non pour être prolongé. Si personne dans l’équipe ne peut expliquer ce qu’il contient, aucune partie ne devrait être reportée dans la construction, et cela vaut d’autant plus quand le ministère construit à l’interne et que la tentation de continuer est la plus forte.",
  bodyBold: "Il est là pour être archivé, non pour être prolongé.",
} as const;

export const ALPHA_CAUTION = {
  title: "Quand l’Alpha tourne mal",
  items: [
    "Les prototypes deviennent trop soignés et finissent par servir de vraie construction.",
    "Seules les hypothèses sûres sont éprouvées, et les risquées sont évitées.",
    "Les prototypes sont montrés aux intervenants et jamais testés avec de vrais utilisateurs.",
    "L’équipe s’engage dans la construction avant que les hypothèses les plus risquées tiennent.",
    "L’Alpha s’étire et devient une première version lente et coûteuse.",
  ],
};

export const ALPHA_FINISH = {
  title: "Comment savoir que l’Alpha est terminé",
  sectionId: "how-you-know-alpha-is-finished",
  intro: {
    text: "L’Alpha est terminé quand vous avez un prototype assez substantiel pour décider, que les hypothèses les plus risquées ont été éprouvées, et que vous êtes convaincu de pouvoir construire ou acheter quelque chose qui répond au besoin et qui est rentable. Ce qui survit à l’Alpha a mérité la construction.",
    bold: [{ phrase: "hypothèses les plus risquées ont été éprouvées" }],
  } satisfies ThreadLinkedProse,
  blocks: [
    {
      heading: "Les exigences sont rédigées et arrêtées",
      paragraphs: [
        {
          text: "La Découverte a transmis le problème, les personnes qui le vivent, et à quoi ressemblerait la réussite. L’Alpha transforme cela en ce que le service doit faire, rédigé de façon que quelqu’un d’autre puisse le construire.",
        },
        {
          text: "Arrêtées veut dire arrêtées, parce que la demande de propositions est rédigée à partir d’elles et paraît pendant l’Alpha. Une exigence encore floue le jour de sa publication reste floue dans le contrat, et la changer ensuite coûte une modification.",
          bold: [{ phrase: "Arrêtées veut dire arrêtées" }],
        },
      ],
    },
    {
      heading: "Le concours pour trouver un fournisseur a commencé",
      onlyIf: "Seulement si l’on achète",
      paragraphs: [
        {
          text: "Annoncer les exigences, recevoir les soumissions et les évaluer prend des mois, et c’est pourquoi cela commence pendant que le prototypage se poursuit plutôt qu’après.",
        },
        {
          text: "Que l’Alpha se termine avec un contrat signé ou avec un contrat encore à signer dépend de la voie, et les deux sont normaux. Ce qui ne se rattrape pas, c’est un concours qui n’a pas commencé au moment où l’Alpha se termine, parce qu’alors la Bêta attend, tout simplement.",
          bold: [{ phrase: "un concours qui n’a pas commencé au moment où l’Alpha se termine" }],
          internalLinks: [{ phrase: "Bêta", to: "/create-beta" }],
        },
      ],
    },
  ] satisfies FinishBlock[],
  exits: [
    {
      lead: "En avant vers la Bêta,",
      rest: {
        text: "quand les hypothèses risquées tiennent et que vous connaissez l’approche pour construire ou acheter.",
      },
      href: "/create-beta",
    },
    {
      lead: "Retour à la Découverte,",
      rest: {
        text: "quand l’Alpha montre que le problème n’était pas assez bien compris.",
      },
      href: "/create-discovery",
    },
    {
      lead: "Stop,",
      rest: {
        text: "quand les preuves disent que cela ne vaut pas la peine d’être construit. S’arrêter ici épargne encore le coût d’une mauvaise construction.",
      },
    },
  ],
  offRamp: {
    intro: {
      text: "Ce que l’équipe a fabriqué est soit archivé, soit reporté dans la Bêta, selon la façon dont cela a été construit, et ce que tout cela a appris devient les exigences dans les deux cas. Ayez ceci prêt avant que la Bêta commence :",
      bold: [{ phrase: "ce que tout cela a appris devient les exigences" }],
    } satisfies ThreadLinkedProse,
    items: [
      {
        text: "L’approche retenue pour construire ou acheter, avec l’outillage de la Bêta et son rapport qualité-prix.",
        bold: [{ phrase: "L’approche retenue" }],
      },
      {
        text: "La plus petite version, définie : la chose la plus simple qui puisse être construite ou achetée et qui réponde au besoin. Cette définition circonscrit ce que la Bêta construit.",
        bold: [{ phrase: "La plus petite version, définie :" }],
      },
      {
        text: "La conception testée : les maquettes gagnantes, conservées comme le document d’exigences le plus clair que le ministère remettra jamais à un constructeur.",
        bold: [{ phrase: "La conception testée :" }],
      },
      {
        text: "Les exigences, rassemblées au même endroit. La demande de propositions est rédigée à partir d’elles : chaque ligne doit donc être quelque chose à quoi un fournisseur peut être tenu :",
        bold: [{ phrase: "Les exigences, rassemblées au même endroit." }],
        subItems: [
          {
            text: "ce que le service doit faire, rédigé de façon qu’un constructeur puisse agir",
          },
          {
            text: "les indicateurs précisés qui disent si cela a fonctionné",
          },
          {
            text: "les clauses d’accessibilité que le service doit respecter",
          },
          {
            text: "comment le système doit se comporter : à quelle vitesse, avec quelle disponibilité, et pendant combien de temps il conserve les documents",
          },
          {
            text: "les données que le service doit détenir, et les métadonnées qui les décrivent",
          },
          {
            text: "les cibles de rétablissement produites par l’exercice ci-dessus : combien de temps le service peut être hors service, et quelle quantité de données récentes il peut se permettre de perdre",
          },
        ] satisfies readonly ThreadLinkedProse[],
      },
      {
        text: "La carte du parcours issue de la Découverte, mise à jour avec ce que les tests ont appris.",
        bold: [{ phrase: "La carte du parcours" }],
      },
      {
        text: "Le concours mené et le contrat prêt à signer, avec les droits de sortie et la portabilité des données. La Bêta s’ouvre avec la signature : tout ce qui se négocie encore est du temps que la Bêta passe à attendre.",
        bold: [{ phrase: "Le concours mené et le contrat prêt à signer," }],
        onlyIf: "achat d’une solution ou d’un produit",
      },
      {
        text: "Le budget et les personnes pour la Bêta, y compris un budget de recherche.",
        bold: [{ phrase: "Le budget et les personnes pour la Bêta," }],
      },
      {
        text: "L’accessibilité, prête pour la Bêta : les clauses de la norme que le service doit respecter, prêtes à entrer au contrat, et les tests avec les personnes les plus susceptibles d’être exclues réservés.",
        bold: [{ phrase: "L’accessibilité, prête pour la Bêta :" }],
      },
      {
        text: "Des indicateurs de réussite précisés, repris de la Découverte.",
        bold: [{ phrase: "Des indicateurs de réussite précisés," }],
      },
      {
        text: "Le relevé des idées mortes, et pourquoi, pour que la prochaine équipe ne paie pas pour les éprouver de nouveau.",
        bold: [{ phrase: "Le relevé des idées mortes," }],
      },
      {
        text: "Chaque point de contrôle officiel que l’Alpha atteint est fait : les évaluations entamées ou terminées, les comités rencontrés, les approbations données. Le tableau ci-dessous nomme chacun, l’étape qu’il atteint pendant l’Alpha, et qui fait le travail.",
        bold: [{ phrase: "Chaque point de contrôle officiel que l’Alpha atteint est fait" }],
      },
    ] satisfies readonly (ThreadLinkedProse & {
      subItems?: readonly ThreadLinkedProse[];
      onlyIf?: string;
    })[],
  },
};

export const ALPHA_SECTION_NAV = {
  prev: { href: "/create-discovery", label: "Sous-phase Découverte", level: "subphase" },
  next: { href: "/create-beta", label: "Sous-phase Bêta", level: "subphase" },
} satisfies { prev: SectionNavLink; next: SectionNavLink };

/**
 * Sources du bloc Sources de la sous-phase Alpha. Ce tableau vit ici, et non dans
 * CreateAlphaPage.tsx, parce que la version française ne substitue que les modules
 * de src/lib : ce qui reste dans un composant n’est jamais substitué et s’afficherait
 * en anglais sur le site français.
 */
export const ALPHA_SOURCES: SourceItem[] = [
  {
    label: "Modèles et outils",
    linkKey: "design-canada",
    description:
      "Système de design de Canada.ca (design.canada.ca) : styles, gabarits et modèles testés auprès des utilisateurs, pour prototyper.",
  },
  {
    label: "Modèles et outils",
    linkKey: "gc-design-system",
    description:
      "Système de design GC (Service numérique canadien) : des composants d’interface accessibles et prêts à l’emploi.",
  },
  {
    label: "Modèles et outils",
    linkKey: "gc-forms-assistance",
    description:
      "Formulaires GC (Service numérique canadien) : une plateforme de création de formulaires pour prototyper des formulaires sans écrire de code.",
  },
  {
    label: "Modèles et outils",
    linkKey: "digital-accessibility-toolkit",
    description:
      "Boîte à outils de l’accessibilité numérique (a11y.canada.ca) : des modes d’emploi pour concevoir, construire et tester des services accessibles.",
  },
  {
    label: "Instrument directeur",
    linkKey: "digital-standards",
    description:
      "Normes relatives au numérique du gouvernement du Canada (SCT).",
  },
  {
    label: "Instrument directeur",
    linkKey: "guideline-service-digital",
    description:
      "Ligne directrice sur les services et le numérique (SCT).",
  },
  {
    label: "Instrument directeur",
    linkKey: "gc-enterprise-architecture-framework",
    description:
      "Cadre de l’architecture intégrée du GC (SCT) : les critères au regard desquels le comité d’examen de l’architecture de votre ministère évalue la direction retenue pour construire ou acheter; les initiatives les plus vastes vont au comité de l’échelle du GC.",
  },
  {
    label: "Instrument directeur",
    linkKey: "en-301-549",
    description:
      "CAN/ASC - EN 301 549:2024 (Normes d’accessibilité Canada) : la norme d’accessibilité à laquelle les nouvelles pages Web et applications doivent se conformer en vertu du Règlement canadien sur l’accessibilité.",
  },
  {
    label: "Référence complémentaire",
    linkKey: "design-research",
    description:
      "Système de design de Canada.ca, mode d’emploi de la recherche et des tests : méthodes pour tester des prototypes avec les utilisateurs.",
  },
  {
    label: "Référence complémentaire",
    linkKey: "esdc-a11y-regulations-guidance",
    description:
      "Lignes directrices sur la règlementation sur l’accessibilité des technologies numériques (EDSC) : ce qui doit s’y conformer, et pour quand.",
  },
  {
    label: "Référence complémentaire",
    linkKey: "harmonized-tra-methodology",
    description:
      "Méthodologie harmonisée d’évaluation de la menace et des risques (Centre canadien pour la cybersécurité) : comment les menaces qui pèsent sur un service sont énumérées et classées.",
  },
  {
    label: "Collectivités",
    linkKey: "gc-ux-network",
    description:
      "Réseau UX du gouvernement du Canada : praticiens de la recherche sur les utilisateurs dans l’ensemble du gouvernement; aussi sur GCXchange, cherchez le nom.",
  },
];
