/**
 * Les mots qui appartiennent au document Word des points de contrôle.
 *
 * `scripts/build-checkpoints-doc.ts` tire presque tout son contenu des mêmes modules
 * `src/lib` que rend le site, et ceux-là sont jumelés à des fichiers `.fr.ts`. Ses
 * propres mots — titres, en-têtes de tableaux, légendes, pages liminaires,
 * l’introduction et la conclusion — n’avaient nulle part où être traduits, ce qui
 * faisait de ce document le seul du guide sans édition française.
 *
 * Ils vivent ici pour que le crochet de résolution de `build-checkpoints-doc.mjs`
 * puisse échanger `checkpoints-doc-strings.ts` contre ce fichier comme il échange
 * chaque autre import, et que le générateur produise le document français à partir
 * du même code.
 *
 * Rien de ce qui provient d’un autre module `src/lib` n’a sa place ici : c’est déjà
 * traduit là où il vit. Pas plus que les chemins de fichiers, les noms d’actifs ou
 * la sortie console.
 */

export const CHECKPOINTS_DOC = {
  /** La couverture, l’en-tête courant et les pages liminaires. */
  frontMatter: {
    /** Jamais traduit, dans l’une comme dans l’autre édition. */
    classification: "NON CLASSIFIÉ / UNCLASSIFIED",
    /** La même mention dans l’en-tête courant, après deux taquets. */
    headerClassification: "\t\tNON CLASSIFIÉ / UNCLASSIFIED",
    /** La petite ligne au-dessus du titre, sur la couverture. */
    eyebrow: "Le Guide du cycle de vie numérique",
    subtitle:
      "Les approbations, les examens, les autorisations et les obligations permanentes par lesquels un service doit passer, et à qui revient chacun",
    /** Qui l’a fait, en une phrase. Des personnes, non une institution qui publie. */
    developedBy:
      "Créé par des membres des équipes du Bureau du dirigeant principal de l’information du Secrétariat du Conseil du Trésor du Canada, du Secteur du dirigeant principal de la technologie et de la Technologie numérique et cybersécurité, pour vous aider en chemin.",
    bannerAltTitle: "Bandeau de couverture",
    bannerAltDescription: "Bandeau décoratif en haut de la couverture",
    bannerAltFootDescription: "Bandeau décoratif au bas de la couverture",
    bannerAltName: "Bandeau de couverture",
    /**
     * The caveat on the title page, one paragraph per line.
     *
     * The first is the caveat the home page carries, in the same words. The second is
     * this document's own: the list was assembled by reading the instruments, not handed
     * down by anyone, so it says so and asks for what it missed.
     */
    /** The small label above the note. */
    datedNoteLabel: "À PROPOS DE CETTE ÉDITION",
    datedNote: [
      "Ceci est un guide de 2026, exact pour le moment. Des liens peuvent se périmer à mesure que des instruments sont renommés et que des pages changent d’adresse, mais les concepts tiennent.",
      "C’est notre meilleure tentative de réunir ces points de contrôle au même endroit. S’il en manque un, dites-le-nous.",
    ],
    contents: "Table des matières",
    listOfFigures: "Liste des figures",
    listOfTables: "Liste des tableaux",
  },

  /** Les titres de section et de sous-section, dans l’ordre où le document les emploie. */
  headings: {
    introduction: "Introduction",
    context: "Contexte",
    purposeAndScope: "Objet et portée",
    audience: "Public visé",
    howToUse: "Comment utiliser ce document",
    tagsMean: "Ce que signifient les étiquettes",
    scopeTag: "La seule étiquette qui change si une rangée s’applique à vous",
    kinds: "De quel type est chacun",
    conclusion: "Conclusion et prochaines étapes",
    aboutTheGuide: "À propos du Guide du cycle de vie numérique",
    references: "Références",
    howLongItTook: "Le temps que cela a pris",
    howToReadTheSteps: "Comment lire les étapes",
  },

  /** Le texte courant que ce document écrit lui-même. */
  prose: {
    context:
      "Mettre en service un service numérique du gouvernement du Canada suppose de franchir des points de contrôle officiels : des évaluations à mener, des comités à rencontrer, des registres où figurer, et des obligations qui durent aussi longtemps que le service. Ils viennent des politiques du Conseil du Trésor, de lois et de normes, et ils sont répartis dans des dizaines d’instruments. Ceux qui s’appliquent dépendent de ce que fait le service et de ce qui est dépensé : deux services n’empruntent donc jamais tout à fait le même parcours.",
    /** {instruments} et {topics} sont comptés à partir du contenu importé. */
    purposeAndScope:
      "Le présent document couvre {instruments} instruments, regroupés en {topics} sujets. L’annexe A énumère ce que d’autres parties du gouvernement ont déjà construit et qu’une équipe peut réutiliser. L’annexe B suit un service fictif depuis son premier signe de difficulté jusqu’au jour où il est remplacé.",
    audience:
      "Le présent document s’adresse au responsable opérationnel d’un service numérique du gouvernement du Canada, et aux personnes qui l’appuient : gestionnaires de programme et de service, équipes de projet, architectes d’entreprise, et les fonctions ministérielles avec lesquelles un responsable opérationnel doit travailler, en sécurité, en protection de la vie privée, en approvisionnement, en gestion de l’information et en communications.",
    /**
     * La liste « comment utiliser » de la page renvoie aux tableaux ; dans un document,
     * ils portent un numéro de section, alors la formule y renvoie.
     */
    howToUseFind: "lisez les tableaux",
    howToUseReplace: "lisez les tableaux de la section 5",
  },

  /** Les en-têtes de colonnes. Dessinés en petites capitales, donc écrits ici en minuscules. */
  tableHeaders: {
    instrument: "Instrument",
    whatBringsItIntoScope: "Ce qui le fait entrer dans la portée",
    whatTheBusinessOwnerDoes: "Ce que fait le responsable opérationnel",
    whoDoesTheWork: "Qui fait le travail",
    piece: "Pièce",
    whatYouWouldOtherwiseBuild: "Ce que vous construiriez autrement",
    whoRunsItAndHowToGetIt: "Qui l’exploite, et comment l’obtenir",
    worthALookIn: "À examiner pendant",
    stepNumber: "#",
    whatNadiaDoes: "Ce que fait Nadia",
    whoRespondsAndHow: "Qui intervient, et comment",
  },

  /** Les petites capitales qui introduisent un passage à l’intérieur d’une cellule. */
  inlineLabels: {
    /** Les espaces de fin sont l’écart avant la phrase ; gardez-les. */
    whatItIs: "CE QUE C’EST   ",
    whenItComesUp: "QUAND CELA SURVIENT   ",
    responderDepartment: "SON MINISTÈRE  ",
    responderCentral: "ORGANISME CENTRAL  ",
    about: "À propos",
    governingInstruments: "Instruments directeurs",
    supportingReferences: "Références complémentaires",
  },

  /** La légende des étiquettes, et la seule étiquette que le générateur dessine lui-même. */
  tags: {
    onlyIf: "Seulement si",
    onlyIfGloss:
      "Cet instrument ne s’applique pas à tous les services. La colonne de la portée dit ce qui le fait entrer dans la portée. Un instrument sans étiquette s’applique à tous.",
  },

  /** Les titres des figures et des tableaux, et le mot de numérotation devant eux. */
  captions: {
    tableWord: "Tableau",
    figureWord: "Figure",
    actionTags: "Ce que signifie chaque étiquette d’action",
    scopeTag: "L’étiquette de portée",
    kinds: "De quel type est chaque instrument",
    glossary: "Les mots que les tableaux emploient sans les définir",
    /** {topic} est le nom du sujet, tiré du tableau des instruments. */
    topicTable: "{topic} : ce qui s’applique, qui s’en charge, et quand cela survient",
    reuseTable: "Ce qu’une autre partie du gouvernement a déjà construit",
    nadiaPortrait: "Nadia, directrice générale",
    whoTable: "Les personnes avec qui Nadia traite, et ce que chacune fait",
    timeline: "Le temps qu’a pris chaque phase pour ce seul service",
    /** {phase} est le titre de la phase, coupé à son séparateur. */
    phaseSteps: "{phase} : ce que fait Nadia et qui intervient",
  },

  /** Les deux annexes, et les mots qui n’apparaissent qu’à l’intérieur. */
  appendix: {
    labelA: "Annexe A",
    labelB: "Annexe B",
    reuseIntro:
      "Cherchez quelque chose à réutiliser avant de fabriquer le vôtre. Voici les pièces déjà construites et entretenues par une autre partie du gouvernement : une équipe peut donc configurer quelque chose plutôt que le fabriquer. Choisir de fabriquer le vôtre n’enfreint aucune règle. Le cadre de l’architecture intégrée demande bien aux équipes d’examiner d’abord la réutilisation : un comité d’examen de l’architecture demandera donc probablement lesquelles de ces pièces ont été envisagées et pourquoi aucune ne convenait.",
    /** L’espace de fin porte l’écart avec la phrase qui suit. */
    inventedLead: "Nadia et son programme de subventions sont fictifs. ",
    inventedBody:
      "Rien dans cette annexe ne décrit un service réel, un ministère réel ou une personne réelle. Elle est écrite comme un seul exemple travaillé, pour que les points de contrôle de la section 5 puissent être vus dans un ordre, et l’ordre montré est celui qu’a produit ce service fictif.",
    /** Suit la clé de la colonne de gauche, importée, avec une espace entre les deux. */
    columnKeyRight:
      "La colonne de droite indique qui répond, et comment. L’étiquette de chaque réponse indique si le répondant relève de son ministère ou d’un organisme central.",
    /**
     * Ce qui sépare le nom d’une phase de son résumé dans les titres de phase importés.
     * La légende du tableau des étapes ne garde que ce qui vient avant.
     */
    phaseHeadingSeparator: " - ",
  },

  /** La section de clôture, et la note permanente sur le guide. */
  conclusion: {
    ruleOutFirst:
      "La liste est longue, et aucun service ne la rencontre au complet. L’étape qui fait gagner le plus de temps est la moins coûteuse : parcourez la colonne de la portée de chaque sujet qui correspond à ce que fait votre service, et écartez ce qui ne s’applique pas, avant que quiconque se mette à planifier autour. Ce qui reste est habituellement plus petit qu’une équipe ne l’imagine, et l’essentiel revient à quelqu’un d’autre.",
    settleEarly:
      "Deux choses méritent d’être réglées plus tôt qu’il ne semble nécessaire, parce que toutes deux changent la forme de la construction et coûtent cher à ajouter après coup : combien de temps le service peut demeurer indisponible, et ce que le système doit pouvoir faire de ses documents. Les deux se trouvent à la section 5, sous Continuité et incidents et sous Registres et documents.",
    /** Trois passages, parce que le nom du guide est en gras à l’intérieur de la phrase. */
    aboutBefore: "Ce document fait partie du ",
    /* The callout heading carries the article; the run inside the sentence does not. */
    aboutHeading: "Le Guide du cycle de vie numérique",
    aboutGuideName: "Guide du cycle de vie numérique",
    aboutAfter:
      ", un guide destiné aux personnes qui exploitent les services numériques du gouvernement du Canada sur toute la vie d’un service : d’avant son existence, en passant par son exploitation et sa maturation, jusqu’à son retrait ou son remplacement réussi. Le présent document est l’index des points de contrôle officiels. Les documents de phase et de sous-phase couvrent comment faire le travail à l’intérieur de chaque étape, et les documents de fil expliquent le raisonnement derrière chaque sujet. Pour trouver les autres documents et voir où ils s’inscrivent, commencez par la page d’accueil du guide, ou allez directement à l’Index du Guide du cycle de vie numérique.",
  },

  /** Les mots propres à la liste des références. */
  references: {
    intro:
      "Chaque instrument de la section 5 et de l’annexe A qui possède une source publique, numéroté dans l’ordre où les tableaux l’emploient. Là où une rangée ne porte aucune référence, l’instrument s’obtient auprès d’un bureau ministériel plutôt qu’à partir d’une page publiée.",
  },

  /** Le lien de retour à la table des matières, à la fin de chaque section et de chaque tableau. */
  backToContents: "↑ Retour à la table des matières",

  /**
   * Les noms des phases et des sous-phases, mis en gras partout où ils paraissent
   * dans la colonne « À examiner pendant » du tableau de réutilisation.
   */
  phaseWords: [
    "Découverte",
    "Alpha",
    "Bêta",
    "Stabilisation",
    "Croissance",
    "Maturité",
    "Exploitation",
    "Retrait",
  ],

  /**
   * Un PNG par sujet, tiré des actifs que les autres générateurs emploient déjà.
   *
   * Les clés sont les noms des sujets tels que les donne le tableau des instruments,
   * donc traduits avec lui. Les noms de fichiers sont des actifs et ne sont jamais
   * traduits.
   */
  topicIcons: {
    Sécurité: "shieldcheck.png",
    "Continuité et incidents": "siren.png",
    "Vie privée et décisions automatisées": "shield.png",
    Accessibilité: "users.png",
    "Langues officielles": "megaphone.png",
    "Approbations et financement": "coins.png",
    "Contrats et fournisseurs": "filesignature.png",
    "Hébergement et infonuagique": "server.png",
    "Identité et ouverture de session": "user.png",
    "Publication sur canada.ca": "layers.png",
    "Registres et documents": "archive.png",
    "Accès à l’information et transparence": "search.png",
  } as Record<string, string>,
} as const;
