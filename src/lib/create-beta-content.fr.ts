import type { LucideIcon } from "lucide-react";
import {
  Archive,
  Briefcase,
  Code2,
  Compass,
  FileSignature,
  Globe,
  Gauge,
  PencilRuler,
  Route,
  Search,
  Server,
  UserCheck,
  Users,
  Wrench,
} from "lucide-react";
import {
  ACCESSIBILITY_EXCLUSION_GROUPS,
  ACCESSIBILITY_EXCLUSION_INTRO,
} from "@/lib/accessibility-exclusion-groups";
import { GOOD_CONTRACT_PATH } from "@/lib/reference-paths";
import type { LifecycleVisualAsset } from "@/lib/lifecycle-visuals";
import { LIFECYCLE_VISUALS } from "@/lib/lifecycle-visuals";
import type { ThreadContentSection, ThreadLinkedProse } from "@/lib/thread-rich-content";
import type { FinishBlock } from "@/components/SubphaseFinishSection";
import type { SectionNavLink } from "@/components/SubphaseSectionNav";
import type { SubphaseTeamRole } from "@/components/SubphaseTeamRoles";
import type { SourceItem } from "@/components/SourcesBlock";

export const BETA_EXTRACT = {
  spine: "La Bêta sert à construire le service pour de vrai et à le prouver avant qu’il devienne officiel.",
  opening: {
    text: "La Bêta est la troisième sous-phase de la Création. L’équipe reprend l’idée éprouvée en Alpha et :",
    internalLinks: [{ phrase: "Création", to: "/create" }],
  } satisfies ThreadLinkedProse,
  workOutItems: [
    "signe le contrat de construction, ou modifie celui qu’elle détient déjà, si elle achète.",
    "construit ou configure la chose réelle, à la qualité de production.",
    "la prouve avec de vraies personnes, dans une bêta privée puis une bêta publique.",
  ],
  whatsNew: {
    label: "Nouveau depuis l’Alpha",
    text: "La construction est réelle, et le public commence à l’utiliser.",
  },
  scoped: {
    text: "La Bêta est circonscrite à un ministère qui met en place un service, qu’il soit acheté, réutilisé ou construit.",
  } satisfies ThreadLinkedProse,
};

export const BETA_EXTRACT_CLOSING: ThreadLinkedProse = {
  text: "Un service en Bêta est réel, mais ce n’est pas encore le service officiel.",
  bold: [{ phrase: "Un service en Bêta est réel, mais ce n’est pas encore le service officiel." }],
};

export const BETA_STAGES = {
  title: "Bêta privée et bêta publique",
  whatChangedHeading: "Ce qui a changé depuis l’Alpha",
  twoPartsHeading: "Les deux parties",
  notLaunchHeading: "Ni l’une ni l’autre n’est un lancement",
  opening: {
    text: "Ce qui a bougé, c’est que le service est réel et que ce que les gens y font compte. La demande de quelqu’un existe ensuite.",
    bold: [
      {
        phrase:
          "le service est réel et que ce que les gens y font compte",
      },
    ],
  } satisfies ThreadLinkedProse,
  openingSecond: {
    text: "Des gens essayaient aussi des choses en Alpha : leur arrivée n’est donc pas le changement. C’est pourquoi un prototype testé avec cinq vrais utilisateurs relève encore de l’Alpha, et pourquoi la plus petite version qui fonctionne de bout en bout appartient ici.",
  } satisfies ThreadLinkedProse,
  privateBeta: {
    text: "Bêta privée. La Bêta commence en privé. Un nombre limité de personnes sont invitées à utiliser le vrai service, pour que l’équipe puisse recueillir des commentaires et l’améliorer pendant que l’auditoire est encore assez petit pour qu’on puisse s’excuser auprès de lui.",
    bold: [{ phrase: "Bêta privée." }],
  } satisfies ThreadLinkedProse,
  publicBeta: {
    text: "Bêta publique. Une fois le service amélioré et l’équipe convaincue qu’il peut être exploité à grande échelle, il s’ouvre à quiconque en a besoin. S’il remplace un service existant, il fonctionne à côté de l’ancienne façon jusqu’au lancement.",
    bold: [{ phrase: "Bêta publique." }],
  } satisfies ThreadLinkedProse,
  keepOldService: {
    text: "Si le service en remplace un existant, gardez l’ancien en fonction jusqu’à ce que le nouveau soit véritablement en service. La Bêta n’est pas le moment de l’éteindre. Si le service est nouveau, il n’y a rien à garder en fonction, et ceci ne s’applique pas.",
  } satisfies ThreadLinkedProse,
  notLaunch: {
    text: "Ni la bêta privée ni la bêta publique n’est un lancement. Le lancement, c’est quand le service devient le service officiel pour les personnes qu’il sert. S’il existait une façon de faire antérieure, c’est le moment où elle est retirée, et cette façon antérieure est ce que les gens utilisaient réellement avant : un formulaire papier, une ligne téléphonique, une boîte de réception, ou une application qui fonctionne depuis quinze ans. Si le service est nouveau, il n’y a rien à retirer. Dans les deux cas, c’est le lancement qui met fin à la Bêta.",
  } satisfies ThreadLinkedProse,
};

export const BETA_ON_RAMP = {
  title: "Avant de commencer la Bêta",
  intro:
    "Le minimum que vous devriez déjà avoir. Ce sont des choses que vous apportez, non des choses que la Bêta produit.",
  items: [
    {
      text: "Une idée éprouvée issue de l’Alpha, et la preuve qu’elle fonctionne pour de vraies personnes.",
      bold: [{ phrase: "Une idée éprouvée issue de l’Alpha," }],
    },
    {
      text: "Le raisonnement derrière la voie retenue, consigné, puisque la voie elle-même a été choisie dès la Découverte et que le relevé des motifs est ce qu’un vérificateur, un successeur ou un comité d’examen demandera.",
      bold: [{ phrase: "Le raisonnement derrière la voie retenue, consigné" }],
    },
    {
      text: "Tout concours terminé. L’endroit où il s’est déroulé dépend de la voie, tout comme le fait que la Bêta s’ouvre par une signature ou par une modification à un contrat que vous détenez déjà. La section « Est-ce que quelque chose se signe ici » ci-dessous précise lequel est lequel.",
      bold: [{ phrase: "Tout concours terminé." }],
    },
    {
      text: "Un financement et une approbation qui couvrent la construction autant que la recherche, et qui peuvent tenir dans le budget de fonctionnement existant du ministère.",
      bold: [{ phrase: "Un financement et une approbation" }],
    },
    {
      text: "Un responsable de produit nommé, ayant le pouvoir de prendre des décisions.",
      bold: [{ phrase: "Un responsable de produit nommé" }],
    },
    {
      text: "Les critères de feu vert et de feu rouge pour le lancement, consignés et convenus. Faites-le avant qu’une date de lancement existe et avant que quiconque y soit attaché. Convenus d’avance, les critères laissent les preuves annoncer la mauvaise nouvelle : arrêter devient une décision que le ministère a déjà prise plutôt qu’une personne devant trouver le courage d’annoncer à une salle pleine de gens investis que le lancement est annulé.",
      bold: [{ phrase: "Les critères de feu vert et de feu rouge pour le lancement," }],
    },
    {
      text: "Les tests d’accessibilité réservés avec les personnes les plus susceptibles d’être exclues, et les clauses d’accessibilité de la norme repérées pour qu’elles puissent entrer au contrat.",
      bold: [{ phrase: "Les tests d’accessibilité réservés" }],
    },
  ] satisfies readonly ThreadLinkedProse[],
};

export const BETA_PILLAR = {
  label: "LE CONTRAT",
  title: "Le contrat que vous signez survivra au service",
  icon: FileSignature,
  bodyIntro: {
    text: "Quand vous achetez, le contrat, peu importe le moment du parcours où il a été signé, est ce avec quoi le ministère devra vivre. La signature est le moment où le ministère a un vrai rapport de force, parce que rien n’est encore engagé.",
    bold: [{ phrase: "le contrat, peu importe le moment du parcours où il a été signé," }],
  } satisfies ThreadLinkedProse,
  listIntro: {
    text: "Tout ce qui rend un service possible à quitter plus tard se gagne ou se perd à la signature :",
  } satisfies ThreadLinkedProse,
  listItems: [
    {
      text: "les droits de sortie et la portabilité des données, inscrits dès le départ",
      bold: [{ phrase: "les droits de sortie et la portabilité des données" }],
    },
    {
      text: "le code dans un dépôt que le ministère contrôle, dès le premier jour",
      bold: [{ phrase: "le code dans un dépôt que le ministère contrôle" }],
    },
    {
      text: "la date de fin, et le délai réel pour renouveler ou remettre en concurrence",
      bold: [{ phrase: "la date de fin, et le délai réel" }],
    },
    {
      text: "les clauses d’accessibilité, et un rapport de conformité en matière d’accessibilité du fournisseur. Au Canada, la vérification de l’accessibilité se fait au moment de l’achat : un service acheté sans ces clauses est un service que vous paierez deux fois pour le corriger.",
      bold: [{ phrase: "les clauses d’accessibilité" }],
    },
  ] satisfies readonly ThreadLinkedProse[],
  closing: {
    text: "Un service qui n’a jamais été conçu pour être quitté coûte cher à quitter, et à ce moment-là le ministère n’a plus aucun rapport de force. L’approvisionnement couvre la façon d’acheter, et « À quoi ressemble un bon contrat » énonce les clauses.",
    internalLinks: [
      { phrase: "approvisionnement", to: "/thread/procurement" },
      { phrase: "À quoi ressemble un bon contrat", to: GOOD_CONTRACT_PATH },
    ],
  } satisfies ThreadLinkedProse,
};

export type BetaAccordionStage = {
  id: string;
  icon: LucideIcon;
  title: string;
  /**
   * One line under the title, readable while the row is closed.
   *
   * Seven closed rows of full sentences give a reader no way to tell which one
   * holds what they came for, so each row says what is inside it.
   */
  triggerNote?: string;
  headerVisual?: LifecycleVisualAsset;
  sections: readonly ThreadContentSection[];
};

export const BETA_ACCORDION = {
  id: "what-to-build-and-prove",
  title: "Ce qu’il faut construire et prouver en Bêta",
} as const;

export const BETA_ACCORDION_STAGES: readonly BetaAccordionStage[] = [
  {
    id: "when-contract-signed",
    icon: FileSignature,
    title: "Que quelque chose se signe ici dépend de la voie.",
    triggerNote: "Certaines voies signent maintenant. D’autres ont signé plus tôt, ou jamais.",
    sections: [
      {
        text: "La règle sous tout cela est simple : le concours se déroule dans la sous-phase qui précède la signature. L’endroit où tombe la signature vous dit donc où le concours s’est déroulé.",
        bold: [{ phrase: "le concours se déroule dans la sous-phase qui précède la signature" }],
      },
      {
        type: "unorderedList",
        items: [
          {
            text: "Achat d’une Solution ou d’un Produit fini. Concours pendant l’Alpha, signature maintenant, avant toute construction ou configuration.",
            bold: [{ phrase: "Achat d’une Solution ou d’un Produit fini." }],
            internalLinks: [{ phrase: "Alpha", to: "/create-alpha" }],
          },
          {
            text: "Le modèle multifournisseurs défini par SPAC. Concours pendant la Découverte, signature à l’ouverture de l’Alpha, parce que les prototypes sont construits sous ce contrat. Ce qui se produit à cette frontière est une modification exerçant l’option de construire, non une nouvelle signature.",
            bold: [{ phrase: "Le modèle multifournisseurs défini par SPAC." }],
          },
          {
            text: "Achat d’une Équipe. Concours pendant la Découverte, signature à l’ouverture de l’Alpha, puisque c’est l’équipe qui réalise l’Alpha.",
            bold: [{ phrase: "Achat d’une Équipe." }],
          },
        ],
      },
      {
        text: "Un ministère qui construit à l’interne, ou qui réutilise une plateforme qu’il exploite déjà, n’a rien à signer du tout.",
      },
      {
        text: "Si un contrat est signé ici, c’est le moment où le ministère a un rapport de force, parce que rien n’est encore engagé. Tout ce qui figure dans l’encadré ci-dessus se gagne à cette signature, ou ne se gagne pas du tout.",
        bold: [
          {
            phrase:
              "Si un contrat est signé ici, c’est le moment où le ministère a un rapport de force, parce que rien n’est encore engagé.",
          },
        ],
      },
      {
        text: "L’approvisionnement expose les voies et la façon dont chacune se déroule.",
        internalLinks: [{ phrase: "approvisionnement", to: "/thread/procurement" }],
      },
    ],
  },
  {
    id: "build-smallest-real-thing",
    icon: Wrench,
    title: "Construire la plus petite chose réelle qui fonctionne de bout en bout.",
    triggerNote: "Un parcours complet, construit pour de vrai, toutes les autres fonctionnalités laissées de côté.",
    sections: [
      {
        type: "subheading",
        text: "Quand il faut retrancher, coupez une fonctionnalité et non une étape",
      },
      {
        text: "C’est le premier code, ou la première configuration, destiné à survivre. La plupart des services existants du gouvernement du Canada ont été achetés, réutilisés ou configurés plutôt qu’écrits à partir de zéro, et la Bêta est là où ce produit est réellement mis en place.",
        bold: [{ phrase: "le premier code, ou la première configuration, destiné à survivre" }],
      },
      {
        text: "La plus petite veut dire le moins de fonctionnalités. De bout en bout veut dire le parcours complet, du premier écran jusqu’à ce qui confirme que la chose a réellement eu lieu. Souvent les deux vont bien ensemble. Là où ce n’est pas le cas, c’est le bout en bout qui l’emporte : un service qui fonctionne à merveille jusqu’au moment où quelqu’un doit téléverser un document, et n’y arrive pas, n’a pas aidé cette personne du tout.",
        bold: [{ phrase: "Là où ce n’est pas le cas, c’est le bout en bout qui l’emporte" }],
      },
      {
        text: "Donc quand il faut retrancher, laissez tomber une fonctionnalité plutôt qu’une étape du parcours. Que le service fasse moins de choses est supportable. Un parcours qui s’arrête à mi-chemin ne l’est pas.",
        bold: [{ phrase: "laissez tomber une fonctionnalité plutôt qu’une étape du parcours" }],
      },
      {
        type: "subheading",
        text: "Quatre choses à mettre en place au début de la construction",
      },
      {
        type: "orderedList",
        items: [
          {
            text: "Décidez honnêtement si le prototype de l’Alpha peut servir de base. Si l’équipe comprend ce qu’il contient et le défendrait, le reporter peut économiser de l’argent réel. S’il a été bricolé pour répondre à une seule question, il porte tous les raccourcis pris dans cet esprit, et recommencer coûte habituellement moins cher que de le démêler.",
            bold: [{ phrase: "Décidez honnêtement si le prototype de l’Alpha peut servir de base." }],
          },
          {
            text: "Mettez en place la chaîne qui permettra de mettre en production des changements en toute sécurité, petits et fréquents, parce qu’elle est nécessaire dès le premier jour où le service est en fonction.",
            internalLinks: [{ phrase: "mettre en production des changements", to: "/thread/releasing-changes" }],
          },
          {
            text: "Si le service traite des renseignements personnels servant à prendre des décisions concernant des personnes, faites l’évaluation des facteurs relatifs à la vie privée avant son ouverture. La protection de la vie privée couvre ce que cela suppose.",
            internalLinks: [{ phrase: "évaluation des facteurs relatifs à la vie privée", to: "/thread/privacy" }],
          },
          {
            text: "Faites l’inventaire des dépendances sur lesquelles le service reposera, et sachez qui les corrige.",
            internalLinks: [
              { phrase: "dependencies", to: "/thread/dependencies-and-standards" },
            ],
          },
        ],
      },
      {
        type: "subheading",
        text: "Deux autorisations se dressent entre la construction et la production",
      },
      {
        text: "Ni l’une ni l’autre n’est rapide, et ni l’une ni l’autre ne peut être entamée la semaine avant le lancement.",
      },
      {
        text: "Le service ne peut pas fonctionner en production tant qu’il n’y est pas autorisé. C’est l’évaluation et l’autorisation de sécurité, qui se termine par une autorisation d’exploiter. Elle découle de la Directive sur la gestion de la sécurité du Conseil du Trésor et des contrôles de l’ITSG-33. La production est l’environnement où le vrai service fonctionne sur de vraies données, par opposition aux environnements de développement et d’essai dans lesquels l’équipe construit. Il s’agit de savoir où le service fonctionne, non s’il est terminé. La bêta privée se déroule en production : une poignée de personnes invitées, faisant du vrai travail, créant de vrais documents. L’autorisation doit donc être en main avant l’ouverture de la bêta privée, c’est-à-dire en cours de Bêta, non au lancement ni à la fin. Remontez à partir de cette date, et commencez l’évaluation au début de la construction.",
        bold: [
          { phrase: "Le service ne peut pas fonctionner en production tant qu’il n’y est pas autorisé." },
          { phrase: "La bêta privée se déroule en production" },
        ],
        externalLinks: [
          {
            phrase: "Directive sur la gestion de la sécurité",
            linkKey: "directive-security-management",
          },
          { phrase: "ITSG-33", linkKey: "itsg-33" },
        ],
      },
      {
        text: "Qui la signe n’est pas automatique. Il y a trois cas :",
        bold: [{ phrase: "Qui la signe n’est pas automatique." }],
      },
      {
        type: "orderedList",
        items: [
          {
            text: "Un service qui appartient à un seul ministère. Le responsable opérationnel signe normalement, acceptant le risque au nom du ministère.",
            bold: [{ phrase: "Un service qui appartient à un seul ministère." }],
          },
          {
            text: "Un système commun ou intégré. Le dirigeant principal de l’information du Canada signe, y compris quand le système fonctionne sur une plateforme de Services partagés Canada.",
            bold: [{ phrase: "Un système commun ou intégré." }],
          },
          {
            text: "Un système partagé par deux organisations ou plus. Le gestionnaire de ce programme ou service signe.",
            bold: [{ phrase: "Un système partagé par deux organisations ou plus." }],
          },
        ],
      },
      {
        text: "L’Alpha dit de déterminer de quel cas il s’agit, et si cela a été fait il n’y a rien à faire ici que le confirmer. Si cela n’a pas été fait, faites-le maintenant plutôt que la semaine avant l’ouverture de la bêta privée.",
        internalLinks: [{ phrase: "Alpha", to: "/create-alpha" }],
      },
      {
        text: "L’autorisation repose sur le dernier passage de l’Évaluation de la menace et des risques, qui est le troisième. Le premier s’est fait en Alpha contre la conception de haut niveau, et le deuxième contre la conception détaillée à mesure que la construction était précisée. Celui-ci se fait contre le système réellement construit, parce que la réponse change une fois qu’il est réel. Ce qu’il révèle devient l’évaluation du risque résiduel, le relevé du risque qui reste à accepter par celui qui signe. La sécurité couvre la façon dont ce travail se fait.",
        bold: [{ phrase: "Celui-ci se fait contre le système réellement construit" }],
        externalLinks: [
          { phrase: "Évaluation de la menace et des risques", linkKey: "harmonized-tra-methodology" },
        ],
        internalLinks: [{ phrase: "sécurité", to: "/thread/security" }],
      },
      {
        text: "Si le service prend ou soutient une décision automatisée concernant une personne, l’évaluation de l’incidence algorithmique doit être remplie, approuvée et publiée sur le Portail du gouvernement ouvert avant que le système entre en production. En vertu de la Directive sur la prise de décisions automatisée, c’est une exigence de publication, et elle est facile à manquer.",
        bold: [
          { phrase: "Si le service prend ou soutient une décision automatisée concernant une personne," },
          {
            phrase:
              "publiée sur le Portail du gouvernement ouvert avant que le système entre en production",
          },
        ],
        externalLinks: [
          { phrase: "évaluation de l’incidence algorithmique", linkKey: "algorithmic-impact-assessment" },
        ],
      },
    ],
  },
  {
    id: "both-official-languages",
    icon: Globe,
    title: "Le livrer en français et en anglais en même temps.",
    triggerNote: "Qualité égale, les deux langues, dès le jour du lancement. Pas une étape de traduction à la fin.",
    sections: [
      {
        type: "subheading",
        text: "Ce que l’obligation exige réellement",
      },
      {
        text: "Un service numérique destiné au public doit être offert et fourni en français et en anglais, également et en même temps. Cela couvre l’interface, le contenu, les avis, les messages d’erreur, et les personnes qui répondent au téléphone derrière. La qualité égale est le critère : une version française qui arrive un sprint plus tard, ou qui se lit comme la traduction d’une idée anglaise, n’y répond pas.",
        bold: [{ phrase: "également et en même temps" }],
      },
      {
        text: "La Directive sur les langues officielles pour les communications et services précise comment cela se fait. Le paragraphe 6.6.4.1 exige que le contenu Web dans les deux langues soit disponible en même temps et de qualité égale, ce qui écarte la publication en anglais d’abord suivie du français. Les paragraphes 6.2.1 et 6.2.2 portent sur l’offre active, c’est-à-dire que le service annonce aux gens, dans les deux langues, qu’il est offert dans les deux.",
        bold: [{ phrase: "disponible en même temps et de qualité égale" }],
      },
      {
        type: "subheading",
        text: "Le français est plus long : la conception doit céder",
      },
      {
        text: "C’est du rattrapage que naît le coût, et c’est un problème de conception avant d’être un problème de traduction. Le français est environ un cinquième plus long que l’anglais : les boutons, étiquettes, titres et menus ont donc besoin d’une place que la version anglaise n’exige pas. Parfois un composant qui fonctionne en anglais doit être disposé autrement en français : un menu qui tient sur une ligne, une colonne de tableau qui doit se replier, un bouton dont l’étiquette ne tient plus à l’intérieur. Concevez pour la langue la plus longue et la plus courte tiendra toujours.",
        bold: [{ phrase: "un problème de conception avant d’être un problème de traduction" }],
      },
      {
        text: "Construisez et testez dans les deux dès le départ, et incluez des utilisateurs francophones dans la recherche.",
      },
      {
        type: "subheading",
        text: "Inscrivez-le au contrat comme un seul livrable, non deux",
      },
      {
        text: "Lorsqu’un fournisseur construit, héberge, soutient ou rédige du contenu pour une partie du service, l’obligation appartient au contrat, et elle y appartient comme un seul livrable plutôt que deux. Le français n’est pas un ajout au service ; c’est l’autre moitié du même service. Un fournisseur qui n’est pas contractuellement tenu de le livrer en fixera le prix plus tard comme un changement, et c’est ainsi qu’un ministère finit par payer deux fois une chose qu’il était toujours tenu d’avoir. L’exigence vient du responsable opérationnel ; l’autorité contractante rédige les clauses.",
        bold: [{ phrase: "c’est l’autre moitié du même service" }],
        internalLinks: [{ phrase: "autorité contractante", to: "/thread/procurement" }],
      },
      {
        text: "La sous-traitance ne déplace pas l’obligation. L’article 25 de la Loi sur les langues officielles la transporte à quiconque agit au nom du ministère : le ministère répond donc du français d’un fournisseur comme du sien.",
        bold: [{ phrase: "La sous-traitance ne déplace pas l’obligation." }],
      },
      {
        type: "subheading",
        text: "Un service comptant peu d’utilisateurs n’en est pas exempté",
      },
      {
        text: "Les équipes supposent souvent que l’obligation linguistique varie avec la taille de l’auditoire, et ce n’est pas le cas. Ce qui la déclenche, c’est la façon dont le service est fourni : un service utilisé par une seule région, ou par quelques centaines de personnes, est visé exactement aux mêmes conditions qu’un service national.",
        bold: [{ phrase: "l’obligation linguistique varie avec la taille de l’auditoire, et ce n’est pas le cas" }],
      },
      {
        text: "Si un collègue conteste cela, voici le raisonnement en trois étapes :",
      },
      {
        type: "orderedList",
        items: [
          {
            bold: "La Loi sur les langues officielles, alinéa 24(1)b),",
            text: " prévoit que des règlements peuvent nommer les circonstances qui obligent un bureau à fonctionner dans les deux langues.",
          },
          {
            bold: "Le Règlement sur les communications avec le public et la prestation des services, alinéa 11b),",
            text: " nomme l’une de ces circonstances : tout ce qui est offert par un système automatisé accessible au public.",
          },
          {
            bold: "Un service numérique est un système automatisé accessible au public,",
            text: " l’obligation s’applique donc. Rien dans cette chaîne ne demande combien de personnes l’utilisent ni où elles habitent.",
          },
        ],
      },
      {
        text: "La croyance qu’un petit service est exempté vient habituellement de l’alinéa 11a) du même règlement, qui lui dépend du nombre de personnes servies. Il régit la correspondance et les services téléphoniques, et il ne vise pas un service numérique.",
      },
      {
        text: "Si le service est déficient en français une fois en fonction, les plaintes à son sujet vont au commissaire aux langues officielles, qui peut enquêter sur le ministère.",
      },
    ],
  },
  {
    id: "private-beta",
    icon: UserCheck,
    title: "Bêta privée : la prouver avec quelques vraies personnes.",
    triggerNote: "Un groupe invité, un volume plafonné, et ce qu’il faut surveiller.",
    sections: [
      {
        text: "Une bêta privée se fait sur invitation seulement. Ce n’est pas un lancement discret, et elle n’est pas annoncée.",
        bold: [{ phrase: "invite-only" }],
      },
      {
        type: "unorderedList",
        items: [
          {
            text: "Choisissez qui en fait partie. Un petit groupe invité obtient l’accès, et ces personnes utilisent le service pour faire ce qu’elles étaient réellement venues faire. Rien n’est simulé : la subvention qu’elles demandent est une vraie subvention, le permis qu’elles obtiennent est un vrai permis, et l’argent est vraiment le leur.",
            bold: [{ phrase: "Choisissez qui en fait partie." }, { phrase: "Rien n’est simulé :" }],
          },
          {
            text: "Plafonnez le volume. Gardez le contrôle du nombre de transactions qui passent, pour qu’une défaillance coûte à une poignée de personnes plutôt qu’à une province.",
            bold: [{ phrase: "Plafonnez le volume." }],
          },
          {
            text: "Testez en courtes rondes. Invitez, observez, corrigez, invitez de nouveau. Les rondes raccourcissent à mesure que le service se raffermit.",
            bold: [{ phrase: "Testez en courtes rondes." }],
          },
          {
            text: "Trouvez ce qui ne va pas pendant que l’auditoire est encore assez petit pour qu’on puisse s’excuser auprès de lui.",
            bold: [{ phrase: "Trouvez ce qui ne va pas pendant que l’auditoire est encore assez petit pour qu’on puisse s’excuser auprès de lui." }],
          },
        ],
      },
      {
        text: "Le critère de sortie de la bêta privée : le service fonctionne de bout en bout, pour une vraie personne, sans que quiconque intervienne en coulisse pour le sauver. Gardez la bêta privée en marche jusqu’à ce que ce soit vrai.",
        bold: [{ phrase: "Le critère de sortie de la bêta privée :" }, { phrase: "de bout en bout" }],
      },
    ],
  },
  {
    id: "public-beta",
    icon: Users,
    title: "Bêta publique : l’ouvrir à quiconque en a besoin.",
    triggerNote: "L’ouverture, le maintien de l’ancien service à côté, et le moment d’arrêter.",
    sections: [
      {
        text: "La bêta publique, c’est le vrai service, offert au public. Si le service en remplace un existant, il fonctionne à côté de l’ancienne façon jusqu’au lancement.",
        bold: [{ phrase: "bêta publique" }],
      },
      {
        type: "unorderedList",
        items: [
          {
            text: "Si le service en remplace un existant, gardez l’ancien en marche. Les personnes qui ne peuvent pas ou ne veulent pas encore migrer doivent quand même pouvoir obtenir ce dont elles ont besoin, et la Bêta n’est pas le moment d’éteindre l’ancienne façon. Si le service est nouveau, il n’y a rien à garder en marche, et ceci ne vous concerne pas.",
            bold: [
              { phrase: "Si le service en remplace un existant, gardez l’ancien en marche." },
              { phrase: "Si le service est nouveau, il n’y a rien à garder en marche, et ceci ne vous concerne pas." },
            ],
          },
        ],
      },
      {
        text: "Corrigez ce que les tests d’accessibilité ont révélé avant d’ouvrir. Respecter la norme d’accessibilité est une obligation légale. Une déclaration d’accessibilité publiée s’en vient aussi : en vertu du Règlement canadien sur l’accessibilité modifié, elle entre en vigueur progressivement à partir de décembre 2027, et elle appartient au ministère, de sorte qu’une seule déclaration peut couvrir plusieurs services.",
        bold: [{ phrase: "Corrigez ce que les tests d’accessibilité ont révélé avant d’ouvrir." }],
        internalLinks: [{ phrase: "accessibility", to: "/thread/accessibility" }],
      },
      {
        text: ACCESSIBILITY_EXCLUSION_INTRO,
      },
      {
        type: "unorderedList",
        items: [...ACCESSIBILITY_EXCLUSION_GROUPS],
      },
      {
        text: "Les vérificateurs automatisés ne détectent qu’une fraction des problèmes.",
      },
      {
        type: "unorderedList",
        items: [
          {
            text: "Être capable de l’exploiter à grande échelle, et de continuer à l’améliorer pendant que le public l’utilise.",
            bold: [{ phrase: "l’exploiter à grande échelle" }],
          },
        ],
      },
      {
        text: "Prouver et lancer sont deux moments distincts. Le lancement, c’est quand le service devient le service officiel pour les personnes qu’il sert, et là où il existait une façon de faire antérieure, c’est le moment où elle est retirée. C’est ce qui met fin à la Bêta. Un service qui passe directement du prototype à tout le monde arrive sans avoir jamais été éprouvé.",
        bold: [{ phrase: "Prouver et lancer sont deux moments distincts." }],
      },
    ],
  },
  {
    id: "build-dashboard",
    icon: Gauge,
    title: "Construire le tableau de bord, et décider à qui il appartient.",
    triggerNote: "Les quatre mesures que chaque service déclare, et qui les tient à jour.",
    headerVisual: LIFECYCLE_VISUALS.serviceDashboard,
    sections: [
      {
        text: "Le service doit être observable dès le jour de sa mise en service : le tableau de bord se construit donc ici.",
      },
      {
        type: "unorderedList",
        items: [
          {
            text: "Arrêtez les quelques chiffres qui vous diront si le service fonctionne pour les personnes qui l’utilisent, et instrumentez le service pour qu’il les émette. La surveillance couvre quoi mesurer et comment.",
            internalLinks: [
              { phrase: "surveillance", to: "/thread/monitoring-and-instrumentation" },
            ],
          },
          {
            text: "Nommez à qui revient le tableau de bord. C’est souvent le fournisseur qui le construit, ce qui veut dire qu’il faut l’inscrire au contrat, sans quoi il pourrait ne jamais exister.",
            bold: [{ phrase: "Nommez à qui revient le tableau de bord." }],
          },
          "Assurez-vous que le ministère peut lire le tableau de bord sans demander au fournisseur.",
        ],
      },
    ],
  },
  {
    id: "ready-to-run",
    icon: Server,
    title: "Se préparer à l’exploiter.",
    triggerNote: "Le soutien, les personnes, et le budget qui doit se renouveler.",
    sections: [
      {
        text: "Un service que personne n’est affecté à exploiter peut se dégrader dès sa première semaine.",
      },
      {
        type: "unorderedList",
        items: [
          {
            text: "Constituez l’équipe qui exploitera le service après le lancement, et gardez-en assez à l’interne pour gouverner le travail.",
            internalLinks: [{ phrase: "team", to: "/thread/team-capability" }],
          },
          {
            text: "Dotez le soutien avant l’arrivée du public. Certaines personnes auront de la difficulté avec le service d’une façon que personne n’avait prévue, et le soutien doit pouvoir suivre. Prévoyez l’aide pour les personnes qui ne peuvent pas l’utiliser seules.",
            bold: [{ phrase: "Dotez le soutien avant l’arrivée du public." }],
          },
          {
            text: "Assurez-vous que le service fonctionne sur tous les canaux que les gens utilisent réellement, y compris les lettres qu’il envoie et le centre d’appels qui en répond.",
            bold: [{ phrase: "tous les canaux que les gens utilisent réellement" }],
          },
          {
            text: "Planifiez l’adoption. Un service livré vers lequel personne ne migre a échoué. La gestion du changement couvre la façon de gagner cette migration.",
            internalLinks: [{ phrase: "gestion du changement", to: "/thread/change-management" }],
          },
        ],
      },
    ],
  },
  {
    id: "decide-records-disposition",
    icon: Archive,
    title: "Décider dès maintenant ce qu’il advient des documents.",
    triggerNote: "Conservation et disposition, réglées pendant que le système est encore en construction.",
    sections: [
      {
        text:
          "Au moment où la Bêta s’ouvre, l’équipe sait exactement quelle information le service détiendra, et c’est ce qui rend la question répondable. Décidez ici ce qu’il advient de ces documents à la fin : lesquels sont conservés, lesquels sont transférés à Bibliothèque et Archives Canada, et lesquels font l’objet d’une disposition.",
      },
      {
        text:
          "Si un fournisseur détient ou traite les documents, réglez la question avant la signature du contrat, où qu’elle tombe pour votre voie, parce que les exigences de conservation et de disposition y appartiennent. Pour la plupart des voies, cela veut dire le faire tôt en Bêta ; pour celles qui ont signé à l’ouverture de l’Alpha, ce devrait déjà être fait.",
        bold: [{ phrase: "réglez la question avant la signature du contrat" }],
      },
      {
        text:
          "Si l’autorisation n’existe tout simplement pas encore et que la demande est chez Bibliothèque et Archives Canada, c’est une position normale. Dites-le dans le contrat, et ajoutez les précisions par modification quand la réponse arrivera. Ce qui cause des ennuis, c’est de signer comme si la question avait été posée alors que personne ne l’a posée.",
        bold: [{ phrase: "c’est une position normale" }],
      },
      {
        text:
          "Laisser cela au Retrait est l’erreur courante, et elle coûte cher. S’il s’avère que les documents exigent une autorisation qui n’existe pas encore, en obtenir une prend des mois, et au Retrait il reste rarement des mois. Décider maintenant signifie aussi que les règles de conservation sont intégrées au système pendant qu’il est construit, plutôt que reconstituées à partir de lui plus tard.",
        bold: [{ phrase: "Laisser cela au Retrait est l’erreur courante" }],
      },
      {
        text:
          "Demandez au bureau de la gestion de l’information du ministère de confirmer quelles autorisations de disposition de documents couvrent ce que ce service détiendra. Il y en a deux sortes :",
      },
      {
        type: "unorderedList",
        items: [
          {
            text: "Les autorisations pluri-institutionnelles de disposition de documents (APDD) couvrent les documents administratifs communs à l’ensemble du gouvernement.",
            bold: [{ phrase: "autorisations pluri-institutionnelles de disposition de documents (APDD)" }],
          },
          {
            text: "Les autorisations de disposition de documents propres à une institution (ADDPI) couvrent les documents propres à un programme, comme les décisions de subvention, les évaluations et les dossiers de cas.",
            bold: [{ phrase: "autorisations de disposition de documents propres à une institution (ADDPI)" }],
          },
        ],
      },
      {
        text:
          "Si aucune autorisation ne couvre les documents du programme, en demander une à Bibliothèque et Archives Canada prend du temps, et c’est la raison de le faire dès maintenant.",
      },
      {
        text: "Deux choses à faire en Bêta :",
      },
      {
        type: "unorderedList",
        items: [
          "Demandez au bureau de la GI quelles autorisations de disposition s’appliquent aux documents que ce service détiendra, et signalez toute lacune.",
          "Si un fournisseur détient ou traite les documents, incluez les exigences de conservation et de disposition dans le contrat.",
        ],
      },
      {
        text:
          "L’intendance des données couvre en entier la décision sur ce qu’il advient des données.",
        internalLinks: [
          { phrase: "intendance des données", to: "/thread/data-stewardship" },
        ],
      },
    ],
  },
];

export const BETA_TEAM = {
  title: "L’équipe qu’il vous faut",
  intro: {
    text: "La Bêta est la partie la plus longue et la plus coûteuse de la Création. Attendez-vous à des mois, et attendez-vous à ce que le coût soit dominé par la construction ou la configuration.",
    bold: [{ phrase: "months" }],
  } satisfies ThreadLinkedProse,
  keepTeam: {
    text: "Gardez l’équipe de l’Alpha. Les personnes qui ont fait la recherche et le prototypage portent l’empathie, le contexte et l’élan. Confier le service à une équipe neuve au moment où il devient réel jette les trois.",
    bold: [{ phrase: "Gardez l’équipe de l’Alpha." }],
  } satisfies ThreadLinkedProse,
  rolesIntro: {
    text: "Les rôles minimaux pour soutenir la Bêta. Une personne peut en cumuler plusieurs.",
  } satisfies ThreadLinkedProse,
  roles: [
    {
      role: "Responsable de produit",
      icon: Compass,
      body: {
        text: "décide de ce qui figure dans la première version réelle et de ce qui attend, et détient le pouvoir de dire non.",
      },
    },
    {
      role: "Gestionnaire de la livraison",
      icon: Route,
      body: {
        text: "garde la construction en mouvement et tient l’échéancier par rapport à la date de lancement.",
      },
    },
    {
      role: "Développeurs ou équipe du fournisseur",
      icon: Code2,
      body: { text: "construisent ou configurent le vrai service." },
    },
    {
      role: "Concepteur",
      icon: PencilRuler,
      body: {
        text: "fait passer le service d’une idée éprouvée à quelque chose que les gens peuvent réellement utiliser.",
      },
    },
    {
      role: "Chercheur en expérience utilisateur",
      icon: Search,
      body: {
        text: "mène la validation avec de vrais utilisateurs, et continue de trouver ce qui ne va pas.",
      },
    },
    {
      role: "Exploitation",
      icon: Server,
      body: { text: "mettent en place ce sur quoi le service fonctionne, et se préparent à l’exploiter." },
    },
    {
      role: "Autorité contractante",
      icon: FileSignature,
      body: {
        text: "signe le contrat, et est la seule personne qui peut tenir le fournisseur aux clauses de sortie.",
      },
    },
    {
      role: "Responsable opérationnel de l’application",
      icon: Briefcase,
      body: {
        text: "accepte le risque qui subsiste, finance le travail, et donne le feu vert au lancement.",
      },
    },
  ] satisfies readonly SubphaseTeamRole[],
};

export const BETA_CAUTION = {
  title: "Quand la Bêta tourne mal",
  lead: "Quelques signes à surveiller :",
  items: [
    {
      heading: "Le prototype a été promu.",
      line: "Le code jetable de l’Alpha est devenu le vrai service, et il porte tous les raccourcis pris à l’époque où il était censé être jeté.",
    },
    {
      heading: "Le contrat a été signé à la hâte.",
      line: "Aucun droit de sortie, aucune portabilité des données, le code dans le dépôt du fournisseur. Le ministère loue désormais son propre service.",
    },
    {
      heading: "La validation a été omise.",
      line: "Le service est passé du prototype à tout le monde : ses premiers vrais utilisateurs sont donc le public entier.",
    },
    {
      heading: "Personne n’est responsable du tableau de bord.",
      line: "Le service est en fonction et aveugle, et la seule partie qui peut le voir est le fournisseur.",
    },
    {
      heading: "L’équipe qui l’a construit n’est pas celle qui l’exploitera,",
      line: "et rien n’a été consigné.",
    },
    {
      heading: "Le lancement est devenu l’objectif.",
      line: "C’est la date qu’on défend plutôt que le service, et on brade la qualité pour la respecter.",
    },
  ],
};

export const BETA_FINISH = {
  title: "Comment savoir que la Bêta est terminée",
  sectionId: "how-you-know-beta-is-finished",
  intro: {
    text: "Les critères d’achèvement. La Bêta est terminée quand le service a traversé la bêta privée puis la bêta publique, a été utilisé par de vraies personnes à grande échelle, et a tenu. Il livre le parcours complet, de bout en bout. Le service respecte la norme d’accessibilité et ce que les tests ont révélé a été corrigé, l’évaluation de la protection de la vie privée est faite, le tableau de bord est en fonction, et le soutien est doté.",
    bold: [{ phrase: "Les critères d’achèvement." }],
  } satisfies ThreadLinkedProse,
  blocks: [
    {
      heading: "Le ministère peut le porter après le lancement",
      paragraphs: [
        {
          text: "C’est le test pour lequel ce guide existe. Le ministère peut soutenir le service et continuer de l’améliorer, chaque année, jusqu’à ce qu’il soit remplacé ou mis hors service. S’il ne le peut pas, le service n’est pas prêt à être lancé, aussi belle que soit la démonstration.",
        },
        {
          text: "Soutenir veut dire des personnes nommées ayant du temps dans leur semaine, de l’argent dans un budget qui se renouvelle, et un endroit où un utilisateur peut aller quand le service lui fait défaut. Un lancement sans rien de tout cela produit un service qui se dégrade dès son premier jour et dont personne n’a la responsabilité de s’apercevoir.",
        },
      ],
    },
    {
      heading: "La décision de lancer se prend au regard des critères que vous avez déjà rédigés",
      paragraphs: [
        {
          text: "Les critères de feu vert et de feu rouge ont été convenus au début de la Bêta, avant qu’une date de lancement existe. La décision à la fin de la Bêta consiste à lire les preuves au regard de ces critères, et rien de plus. Réécrire les critères une fois la date inscrite à l’agenda d’un ministre annule l’intérêt de les avoir rédigés.",
          internalLinks: [{ phrase: "début de la Bêta", to: "/create-beta" }],
        },
      ],
    },
  ] satisfies FinishBlock[],
  exits: [
    {
      lead: "En avant vers la Stabilisation,",
      rest: {
        text: "quand le service est lancé et devient le service officiel pour les personnes qu’il sert. Le travail passe de le construire à le stabiliser.",
      },
      href: "/live-stabilization",
    },
    {
      lead: "Retour à l’Alpha,",
      rest: {
        text: "quand la validation avec de vrais utilisateurs montre que l’approche ne fonctionne pas, et qu’il faut la repenser avant d’y mettre plus d’argent.",
      },
      href: "/create-alpha",
    },
    {
      lead: "Stop,",
      rest: {
        text: "quand les preuves disent que le service ne devrait pas être lancé du tout. C’est rare et c’est coûteux, et c’est quand même moins cher que de lancer quelque chose qui ne fonctionne pas.",
      },
    },
  ],
  offRamp: {
    intro: {
      text: "Liste de sortie. La liste de l’Alpha portait sur la construction, et tout ce qui s’y trouvait était quelque chose qu’on pouvait demander à un fournisseur de livrer. Celle-ci porte sur le ministère : des personnes ayant le service dans leurs objectifs, un budget qui se renouvelle sans que quiconque ait à plaider de nouveau, et des autorisations qui appartiennent à un titulaire nommé. Aucun fournisseur ne peut prendre ces engagements pour vous, et chacun doit être vrai le jour où le service cesse d’être un projet pour devenir la responsabilité à long terme de quelqu’un. Avant de passer à la Stabilisation, ayez ceci prêt :",
      bold: [{ phrase: "Celle-ci porte sur le ministère" }],
      internalLinks: [{ phrase: "Stabilisation", to: "/live-stabilization" }],
    } satisfies ThreadLinkedProse,
    items: [
      {
        text: "Le contrat, peu importe le moment du parcours où il a été signé, avec les droits de sortie, la portabilité des données et le dépôt de code.",
        bold: [{ phrase: "Le contrat," }],
      },
      {
        text: "La norme d’accessibilité respectée, et les tests faits avec les personnes les plus susceptibles d’être exclues, leurs constats corrigés. Aucune exigence officielle n’impose ces tests ; c’est la seule façon de savoir que la norme est respectée dans les faits.",
        bold: [{ phrase: "La norme d’accessibilité respectée," }],
      },
      {
        text: "Chaque point de contrôle officiel que la Bêta atteint est fait. Le tableau sous cette section nomme chacun, l’étape qu’il atteint, et qui fait le travail : ils ne sont donc pas énumérés ici. L’un d’eux décide si le service peut être lancé : sans l’autorisation d’exploiter, le service n’a pas le droit de fonctionner en production.",
        bold: [
          { phrase: "Chaque point de contrôle officiel que la Bêta atteint est fait." },
          { phrase: "sans l’autorisation d’exploiter, le service n’a pas le droit de fonctionner en production" },
        ],
      },
      {
        text: "Les dispositions de continuité en place. Les cibles de rétablissement fixées en Alpha sont chez le coordonnateur de la continuité des activités du ministère. Si le service est essentiel, il est nommé dans le plan ministériel, avec sa limite d’interruption et les étapes pour le rétablir.",
        bold: [{ phrase: "Les dispositions de continuité en place." }],
      },
      {
        text: "La restauration testée au moins une fois. Personne ne sait si une sauvegarde fonctionne tant que quelqu’un ne s’en est pas servi pour reconstruire le service.",
        bold: [{ phrase: "La restauration testée au moins une fois." }],
      },
      {
        text: "Le tableau de bord en fonction, et une personne nommée qui en est responsable.",
        bold: [{ phrase: "Le tableau de bord en fonction," }],
      },
      {
        text: "Le modèle de soutien doté et joignable.",
        bold: [{ phrase: "Le modèle de soutien" }],
      },
      {
        text: "L’équipe qui exploitera le service nommée, et assez de celle-ci à l’interne pour gouverner le travail.",
        bold: [{ phrase: "L’équipe qui exploitera le service" }],
      },
      {
        text: "Si le service en remplace un existant, l’ancienne façon encore en marche, avec un plan daté pour la retirer une fois le nouveau service véritablement en fonction. Elle n’est pas éteinte en Bêta. Si le service est nouveau, ceci ne s’applique pas.",
        bold: [{ phrase: "encore en marche" }],
      },
      {
        text: "Les autorisations de disposition des documents que le service détiendra confirmées auprès du bureau de la gestion de l’information, et toute lacune signalée.",
        bold: [{ phrase: "Les autorisations de disposition des documents" }],
      },
    ] satisfies readonly ThreadLinkedProse[],
  },
};

export const BETA_SECTION_NAV = {
  prev: { href: "/create-alpha", label: "Sous-phase Alpha", level: "subphase" },
  next: { href: "/live", label: "Phase Exploitation", level: "phase" },
} satisfies { prev: SectionNavLink; next: SectionNavLink };

export const BETA_SOURCES: SourceItem[] = [
  {
    label: "Modèles et outils",
    linkKey: "algorithmic-impact-assessment",
    description:
      "Outil d’évaluation de l’incidence algorithmique (SCT) : le questionnaire qui note un système de décision automatisée.",
  },
  {
    label: "Modèles et outils",
    linkKey: "a11y-toolkit-procurement",
    description:
      "Boîte à outils de l’accessibilité numérique, approvisionnement : génère les exigences d’accessibilité pour ce que vous achetez et construisez.",
  },
  {
    label: "Modèles et outils",
    linkKey: "gc-notify-contact",
    description:
      "Notification GC (Service numérique canadien) : une plateforme de notification à configurer au lieu d’en construire une.",
  },
  {
    label: "Modèles et outils",
    linkKey: "gc-forms-assistance",
    description:
      "Formulaires GC (Service numérique canadien) : une plateforme de création de formulaires à configurer au lieu d’en construire une.",
  },
  {
    label: "Modèles et outils",
    linkKey: "gc-design-system",
    description:
      "Système de design GC (Service numérique canadien) : des composants d’interface prêts à l’emploi et accessibles.",
  },
  {
    label: "Instrument directeur",
    linkKey: "guideline-service-digital",
    description:
      "Ligne directrice sur les services et le numérique (SCT).",
  },
  {
    label: "Instrument directeur",
    linkKey: "policy-government-security",
    description:
      "Politique sur la sécurité du gouvernement (SCT) : la politique mère sous laquelle se trouve la directive sur la sécurité, et d’où viennent la continuité des activités et les services essentiels.",
  },
  {
    label: "Instrument directeur",
    linkKey: "directive-security-management",
    description:
      "Directive sur la gestion de la sécurité (SCT).",
  },
  {
    label: "Instrument directeur",
    linkKey: "directive-automated-decision-making",
    description:
      "Directive sur la prise de décisions automatisée (SCT).",
  },
  {
    label: "Instrument directeur",
    linkKey: "directive-privacy-practices",
    description:
      "Directive sur les pratiques relatives à la protection de la vie privée (SCT).",
  },
  {
    label: "Référence complémentaire",
    linkKey: "itsg-33",
    description:
      "ITSG-33, La gestion des risques liés à la sécurité des TI (Centre canadien pour la cybersécurité).",
  },
  {
    label: "Référence complémentaire",
    linkKey: "harmonized-tra-methodology",
    description:
      "Méthodologie harmonisée d’évaluation de la menace et des risques (Centre canadien pour la cybersécurité) : l’évaluation sur laquelle repose l’autorisation de sécurité.",
  },
  {
    label: "Référence complémentaire",
    linkKey: "lac-information-disposition-hub",
    description:
      "Bibliothèque et Archives Canada, disposition de l’information : d’où viennent les obligations de tenue de documents.",
  },
  {
    label: "Référence complémentaire",
    linkKey: "oag-phoenix-build",
    description:
      "Rapports du printemps 2018 du BVG, rapport 1 : Construction et mise en œuvre du système de paye Phoenix.",
  },
  {
    label: "Collectivités",
    linkKey: "a11y-community-terms",
    description:
      "Groupe de travail sur l’accès : la collectivité interministérielle de l’accessibilité derrière la Boîte à outils de l’accessibilité numérique.",
  },
];
