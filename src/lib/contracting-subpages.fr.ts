import type { CaseStudySide } from "@/components/CaseStudyBlock";
import type { SourceItem } from "@/components/SourcesBlock";
import {
  PROCUREMENT_SUBPAGE_SLUGS,
  type ProcurementSubPageSlug,
} from "./procurement-subpage-slugs";
import { SOO_VS_SOW_PATH } from "./reference-paths";
import type { ExternalLinkKey } from "./external-links";
import {
  comingSoonSourceItem,
  GCCASE_MIGRATION_READINESS_GUIDE,
} from "./placeholder-sources";

export {
  PROCUREMENT_SUBPAGE_SLUGS,
  type ProcurementSubPageSlug,
} from "./procurement-subpage-slugs";

/** @deprecated Use PROCUREMENT_SUBPAGE_SLUGS */
export const CONTRACTING_SUBPAGE_SLUGS = PROCUREMENT_SUBPAGE_SLUGS;

/** @deprecated Use ProcurementSubPageSlug */
export type ContractingSubPageSlug = ProcurementSubPageSlug;

export type ContractingLinkedParagraph = {
  text: string;
  bold?: { phrase: string }[];
  externalLinks?: { phrase: string; linkKey: ExternalLinkKey }[];
};

export type ContractingParagraph = string | ContractingLinkedParagraph;

export function contractingParagraphPlainText(paragraph: ContractingParagraph): string {
  return typeof paragraph === "string" ? paragraph : paragraph.text;
}

export type ContractingBullet = {
  lead: string;
  body: string;
  bodyLines?: string[];
  paragraphLink?: { phrase: string; to: string };
  externalLink?: { phrase: string; linkKey: ExternalLinkKey };
};

export type ContractingExternalParagraphLink = {
  index: number;
  phrase: string;
  linkKey: ExternalLinkKey;
};

export type ContractingParagraphLink = {
  index: number;
  phrase: string;
  to: string;
};

export type ContractingPlaceholderParagraphLink = {
  index: number;
  phrase: string;
  source: string;
  part?: string;
};

export type ContractingSection = {
  id: string;
  title: string;
  paragraphs?: string[];
  paragraphLinks?: ContractingParagraphLink[];
  externalParagraphLinks?: ContractingExternalParagraphLink[];
  placeholderParagraphLinks?: ContractingPlaceholderParagraphLink[];
  paragraphsAfterBullets?: ContractingParagraph[];
  /** How text below a bullet list is rendered. */
  paragraphsAfterBulletsVariant?: "prose" | "note";
  paragraphsAfterNote?: string[];
  contentTodo?: {
    title: string;
    items: string[];
    note?: string;
  };
  bullets?: ContractingBullet[];
  /** Short lead line rendered before bullets (e.g. a question heading into a list). */
  bulletLead?: string;
  /** Semicolon-ended lines that continue a lead sentence (plain list, no bold leads). */
  continuationBullets?: string[];
  /** Standout note below bullets — lead in semibold, body in muted aside style. */
  highlightedNote?: { lead: string; body: string };
  /** How lead/body bullet lists are rendered. */
  bulletsVariant?: "inline" | "qa" | "ladder";
  caseStudy?: {
    intro: string;
    risky: CaseStudySide;
    safer: CaseStudySide;
  };
};

export type ContractingSubPage = {
  slug: string;
  title: string;
  stub?: boolean;
  intro?: string[];
  sections: ContractingSection[];
  sources?: SourceItem[];
};

export const PROCUREMENT_SUBPAGES: Record<ProcurementSubPageSlug, ContractingSubPage> = {
  "put-the-practices-in-the-contract": {
    slug: "put-the-practices-in-the-contract",
    title: "Inscrire les pratiques au contrat",
    intro: [
      "Le reste de ce guide vous dit comment bien mener un service. Cette page porte sur ce qu’il advient de ces conseils quand c’est un fournisseur qui fait le travail.",
      "Cela doit quand même se produire. Le contrat est votre moyen de vous en assurer.",
    ],
    sections: [
      {
        id: "cannot-outsource-responsibility",
        title: "On ne peut pas sous-traiter la responsabilité",
        paragraphs: [
          "Recherche sur les utilisateurs, accessibilité, sécurité, garder le service utilisable et sûr : rien de tout cela ne cesse d’être votre travail parce qu’un fournisseur est au clavier. Si le service n’est pas accessible, c’est votre ministère qui a exclu des gens, peu importe qui a écrit le code.",
          "Donc quand vous achetez le travail, les pratiques ne disparaissent pas. Elles passent dans le contrat, et dans les choses sur lesquelles vous vérifiez le fournisseur.",
        ],
      },
      {
        id: "playbook-becomes-spec",
        title: "Le guide devient le cahier des charges",
        paragraphs: [
          "C’est la partie utile. Chaque pratique de ce guide est quelque chose que vous pouvez exiger dans un contrat, et le contrat est l’endroit où vous dites ce que le fournisseur doit livrer. Le guide se transforme donc en liste de vérification à partir de laquelle vous bâtissez ce contrat.",
          "Pour chaque pratique qui compte, il y a deux gestes :",
        ],
        bullets: [
          {
            lead: "Nommez-la.",
            body: "Inscrivez-la au contrat comme un vrai livrable.",
            bodyLines: [
              'Bonne clause : « Le fournisseur mènera un test d’utilisabilité à chaque phase avec au moins cinq participants issus des vrais groupes d’utilisateurs du service, y compris des personnes qui utilisent des technologies d’assistance, et remettra les constats au ministère. »',
              'Mauvaise clause : « Le fournisseur fera de la recherche sur les utilisateurs avec de vrais utilisateurs. »',
            ],
          },
          {
            lead: "Gouvernez-la.",
            body: "Décidez comment vous en verrez l’exécution. Si vous ne pouvez pas vérifier une pratique, vous ne pouvez pas la gouverner. Demandez les preuves : les comptes rendus de recherche, la vérification d’accessibilité, les résultats des tests.",
          },
        ],
        paragraphsAfterBullets: [
          {
            text:
              "Quand vous le pouvez, inscrivez la mesure au contrat, et faites-en une bonne exigence, précise, mesurable et vérifiable. « Les pages se chargent en moins de trois secondes pour presque tout le monde » est vérifiable. « Le service sera rapide » ne l’est pas. C’est la même idée qu’un bon tableau de bord : le chiffre doit être mesuré. Ces mesures sont ce à quoi vous tenez le fournisseur, et ce que vous payez.",
            bold: [{ phrase: "précise, mesurable et vérifiable" }],
            externalLinks: [
              {
                phrase: "précise, mesurable et vérifiable",
                linkKey: "uk-gov-testable-requirements",
              },
            ],
          },
        ],
      },
      {
        id: "what-department-does",
        title: "Ce que fait le ministère",
        paragraphs: [
          "Quand le ministère construit à l’interne, c’est lui qui fait le travail. Quand il achète, ou engage une équipe à contrat pour construire, son travail est de s’assurer que le fournisseur le fait, et le fait bien. C’est un travail en soi, et il exige du temps et de l’attention réels. Les gens traitent parfois l’achat comme l’option la plus légère. Ce n’est habituellement pas le cas.",
          "Cela veut dire aussi que vous ne pouvez pas gouverner ce que vous ne comprenez pas. Pour savoir si la recherche du fournisseur valait quelque chose, quelqu’un de votre côté doit savoir à quoi ressemble une bonne recherche. Pour savoir si le travail de sécurité est réel, quelqu’un doit être capable d’en lire la réponse. Ce sont les mêmes compétences que le reste du guide enseigne. Vous les utilisez pour gouverner un fournisseur plutôt que pour faire le travail, mais ce sont les mêmes.",
        ],
      },
    ],
  },
  "buy-in-small-pieces": {
    slug: "buy-in-small-pieces",
    title: "Acheter en petits morceaux",
    intro: [
      "La chose la plus utile que vous puissiez faire en achetant un service, c’est de ne pas l’acheter en entier d’un coup.",
      "Vous avez acheté le travail en petits morceaux distincts plutôt qu’en un seul gros bloc. Chaque morceau est étroitement circonscrit, dû bientôt, et capable de s’appuyer sur le précédent.",
    ],
    sections: [
      {
        id: "build-the-way-you-code",
        title: "Le construire comme vous le coderiez",
        paragraphs: [
          "Si vous construisiez le service vous-même, vous n’écririez pas le tout d’une seule traite. Vous en dégageriez la forme, construiriez un morceau, vérifieriez qu’il fonctionne, puis construiriez le suivant par-dessus. De petits pas que vous pouvez tester. Vous corrigez le cap à mesure que vous apprenez.",
          "Acheter en morceaux, c’est la même habitude appliquée aux contrats. Au lieu d’un gros contrat pour tout le travail, vous en rédigez plusieurs plus petits, chacun pour un vrai morceau de travail. L’architecture est un morceau. Le transfert des données est un morceau. Chaque partie du service est un morceau. Vous les achetez dans un ordre où chacun vous apprend quelque chose avant que le suivant commence.",
        ],
        bulletLead: "Pourquoi se donner cette peine, quand un seul gros contrat paraît plus simple ?",
        bullets: [
          {
            lead: "La valeur et les problèmes apparaissent tôt.",
            body: "Les petits morceaux font vite la preuve de leur valeur, et révèlent vite leurs défauts, pendant qu’il reste du temps et de l’argent pour agir.",
          },
          {
            lead: "Vous remplacez un morceau, pas le programme.",
            body: "Si un fournisseur ne livre pas, vous échangez ce morceau au lieu de tout perdre.",
          },
          {
            lead: "Le changement est absorbé.",
            body: "Si les besoins changent, le morceau suivant absorbe le changement : rien ne repose donc sur une seule livraison lointaine.",
          },
        ],
        paragraphsAfterBullets: [
          "Un seul gros contrat parie que vous aviez tout bien vu avant de commencer. Mais construire un service est plein de choses qu’on ne peut pas savoir d’avance : si la technologie convient, si elle entre en conflit avec ce que vous exploitez déjà, si le problème est plus difficile qu’il n’y paraissait. Les petits contrats vous permettent de le découvrir à peu de frais et de changer de cap.",
        ],
      },
      {
        id: "modular-not-split",
        title: "Modulaire, non fractionné : la ligne à ne pas franchir",
        paragraphs: [
          "Il y a ici une ligne juridique, et la peur de la franchir est une des raisons pour lesquelles les gens évitent d’acheter en morceaux. Il vaut donc la peine d’être clair sur les deux choses qu’on confond :",
        ],
        bullets: [
          {
            lead: "Le fractionnement de contrat est illégal.",
            body: "Cela consiste à prendre un seul travail et à le découper en fausses tranches pour contourner un contrôle, habituellement pour garder chaque tranche sous la limite en dollars qui obligerait à un concours. Les morceaux ne sont pas réellement distincts. C’est un seul travail déguisé en plusieurs, pour esquiver une règle.",
          },
          {
            lead: "L’approvisionnement modulaire est légal,",
            body: "et la Directive y penche, privilégiant des contrats structurés de façon à permettre la concurrence future partout où c’est possible. Cela consiste à diviser un programme en morceaux qui sont véritablement des travaux différents, chacun capable de tenir seul, mis en concurrence ouvertement à sa taille réelle. Rien n’est caché.",
            externalLink: { phrase: "la Directive", linkKey: "directive-procurement" },
          },
        ],
        highlightedNote: {
          lead: "Le critère :",
          body: "ces morceaux existeraient-ils comme travaux distincts même s’il n’y avait aucune limite en dollars à esquiver ? Si oui, c’est modulaire. Si la seule raison de les séparer est de passer sous un chiffre, c’est du fractionnement. L’un a de vraies coutures. L’autre en a de fausses.",
        },
      },
      {
        id: "honest-cost",
        title: "Le coût réel de l’achat en morceaux",
        paragraphs: [
          "Acheter en morceaux coûte de l’effort au départ. Il y a plus de contrats à mener, plus de fournisseurs à coordonner, et quelqu’un doit tenir le portrait d’ensemble pour que les morceaux s’emboîtent. C’est ce travail qui pousse les gens vers un seul gros contrat.",
          "L’échange vaut quand même la peine. Un gros contrat paraît plus facile jusqu’au moment où il échoue, et l’argent est alors dépensé. Acheter en morceaux étale le coût : une attention constante en chemin, et beaucoup moins à perdre quand quelque chose casse. Vous payez en coordination maintenant pour éviter une facture bien plus lourde plus tard.",
        ],
      },
      {
        id: "common-worries",
        title: "Mais ne sera-ce pas difficile à faire accepter ? Les inquiétudes courantes, avec des réponses",
        paragraphs: [
          "La plupart des raisons pour lesquelles les gens signent un seul gros contrat ne sont pas des règles. Ce sont des craintes et des habitudes. Voici celles que vous rencontrerez, et quoi faire pour chacune.",
        ],
        bulletsVariant: "qa",
        bullets: [
          {
            lead: "« Un contrat plus petit paraîtra moins maîtrisé, et ne sera pas approuvé. »",
            body: "C’est la vraie objection, et une intuition juste la sous-tend : un grand plan unique paraît net aux yeux d’un approbateur, et un ensemble de morceaux paraît brouillon. Le geste à faire est de montrer que les morceaux sont en réalité plus maîtrisés. Montrez où l’approche du gros contrat a déjà échoué. Montrez qu’un contrat court que vous pouvez arrêter est plus sûr qu’un long que vous ne pouvez pas arrêter. Les preuves vous appuient : la recherche sur les contrats de TI du gouvernement au Canada constate que les gros contrats de longue durée sont les plus susceptibles d’échouer. Amenez cela dans la salle, et l’option qui paraissait brouillonne commence à ressembler à l’option prudente.",
          },
          {
            lead: "« Mener plusieurs concours, c’est plus de travail. »",
            body: "Cela peut l’être, mais vous ne repartez pas de zéro à chaque morceau. Le gouvernement dispose déjà d’outils d’achat, offres à commandes et listes de fournisseurs préqualifiés, qui vous permettent de placer de plus petits morceaux de travail sans concours complet à chaque fois. Servez-vous-en. Le but est de rendre chaque petit achat peu coûteux à mener, pour que « petit » ne devienne pas « lent ».",
          },
          {
            lead: "« Le budget arrive comme un seul gros projet : le contrat doit donc être gros lui aussi. »",
            body: "C’est la confusion la plus courante, et la dissiper est la clé. L’argent et le contrat sont deux choses différentes. Un seul programme financé peut porter de nombreux petits contrats. Vous n’avez pas besoin d’une approbation budgétaire distincte pour chaque morceau. Il vous faut un programme financé et la liberté de l’acheter en morceaux. L’enveloppe est grande. Les contrats à l’intérieur n’ont pas à l’être.",
          },
          {
            lead: "« Si le travail n’est pas fixé d’avance, qu’est-ce qu’on paie au juste ? »",
            body: "Vous payez des progrès au regard d’objectifs convenus, vérifiés en chemin, plutôt qu’une liste fixe de fonctionnalités promises avant que quiconque ait vraiment compris le problème. Les engagements sont réels : les mesures que vous avez inscrites au contrat, le logiciel qui fonctionne livré à chaque courte étape, les objectifs atteints. C’est souvent plus facile à défendre que la grande liste fixe, parce que vous pouvez voir la valeur arriver et cesser de payer si elle n’arrive pas. Vous achetez une suite d’étapes livrées et vérifiables.",
          },
          {
            lead: "« Est-ce que cela n’aura pas l’air d’un fractionnement ? »",
            body: "Seulement si vous le faites pour esquiver une limite. Si vos morceaux sont de vrais livrables différents mis en concurrence ouvertement, vous êtes du bon côté de la ligne. Servez-vous du critère plus haut et gardez votre raisonnement par écrit. Le modulaire fait ouvertement est le contraire du fractionnement fait en secret.",
          },
        ],
      },
    ],
  },
  "avoid-over-customising": {
    slug: "avoid-over-customising",
    title: "Éviter la personnalisation excessive",
    intro: ["Quand vous achetez un logiciel qui existe déjà, la chose la plus forte que vous puissiez faire est de le laisser tel quel."],
    sources: [comingSoonSourceItem(GCCASE_MIGRATION_READINESS_GUIDE)],
    sections: [
      {
        id: "table-with-hole",
        title: "La table percée d’un trou",
        paragraphs: [
          "Disons que vous achetez une bonne table ordinaire. Puis vous y percez un trou pour y loger une machine que vous possédez. La table ne sert désormais que pour cette machine. Vous ne pouvez plus l’utiliser à autre chose, ni la revendre. Vous avez échangé une chose qui répondait à bien des besoins contre une chose qui n’en sert qu’un.",
          "Personnaliser un logiciel acheté fait la même chose. Vous le pliez à la seule façon dont vous travaillez aujourd’hui, et ce faisant vous en faites le vôtre seul, bon à rien d’autre que la tâche vers laquelle vous l’avez plié.",
        ],
      },
      {
        id: "why-customising-hurts",
        title: "Pourquoi la personnalisation fait mal plus tard",
        paragraphs: [
          "Le vrai coût apparaît au moment de la mise à niveau. Le fournisseur publie une nouvelle version avec des améliorations que vous auriez eues gratuitement, mais votre copie est pleine de vos propres modifications. Avant de pouvoir prendre la nouvelle version, vous devez refaire chaque modification par-dessus.",
          "Vous prenez donc du retard sur une vieille version, ou vous payez encore et encore pour reporter vos modifications. Chaque mise à niveau devient un projet. Personnalisez assez loin et le logiciel ne peut plus du tout être corrigé, et un correctif de sécurité dont vous avez besoin devient un correctif que vous ne pouvez pas prendre.",
        ],
      },
      {
        id: "bend-process",
        title: "Pliez le processus, pas le logiciel",
        paragraphs: [
          "Quand vous achetez, façonnez votre processus autour du logiciel. Votre façon de travailler peut plier : vous pouvez changer un formulaire, une étape, une habitude. Gardez la chose achetée aussi proche de la version standard que possible, parce que le standard reste peu coûteux à exploiter, facile à corriger et sûr à mettre à niveau.",
          "Parfois une petite modification est réellement nécessaire. Dans ce cas, faites la plus petite possible, et consignez pourquoi, pour que la personne suivante sache ce qu’elle a coûté. Le but n’est pas zéro modification à tout prix. C’est de traiter chaque modification comme une dette que vous rembourserez à chaque mise à niveau, et d’en contracter le moins que le travail permet.",
          "Une migration est le moment d’abandonner cela. Les orientations du SCT sur la migration GCcase déconseillent de reconstruire l’ancienne solution telle quelle, puisque beaucoup de personnalisations n’existent qu’à cause des limites d’une ancienne plateforme et ne sont pas nécessaires dans une plateforme moderne.",
        ],
        // PLACEHOLDER SOURCE: GCcase Migration Readiness Guide — Common Migration Approaches / Best Practices — REPLACE WITH REAL LINK (AND ANCHOR IF AVAILABLE) WHEN PUBLISHED
        placeholderParagraphLinks: [
          {
            index: 2,
            phrase: "Les orientations du SCT sur la migration GCcase",
            source: GCCASE_MIGRATION_READINESS_GUIDE,
            part: "Approches courantes de migration et pratiques exemplaires",
          },
        ],
      },
    ],
  },
  "avoid-lock-in": {
    slug: "avoid-lock-in",
    title: "Éviter le verrouillage",
    intro: [
      "Un fournisseur que vous ne pouvez pas quitter est un fournisseur qui fixe le prix. Maîtriser votre sortie est ce qui garde la relation honnête tant qu’elle dure.",
    ],
    sections: [
      {
        id: "how-stuck-happens",
        title: "Comment on se retrouve coincé",
        paragraphs: [
          "Le verrouillage, c’est quand quitter un fournisseur est assez pénible pour qu’en pratique vous ne le puissiez pas : il détient donc le pouvoir à chaque renouvellement. Cela arrive rarement d’un seul grand coup. Cela s’accumule avec le temps, de quelques façons ordinaires :",
        ],
        bullets: [
          {
            lead: "Le travail lui appartient.",
            body: "Le fournisseur détient le code : vous ne pouvez donc le confier à personne d’autre ni l’entretenir vous-même. Chaque modification passe par lui, à son prix.",
          },
          {
            lead: "Il détient les données.",
            body: "Vos données se trouvent dans un format que seul son logiciel lit : les sortir suppose donc une conversion lente et risquée que vous ne cessez de reporter.",
          },
          {
            lead: "Personne d’autre ne le connaît.",
            body: "La chose a été construite juste pour vous : aucun autre fournisseur ne la connaît. Remettre en concurrence signifie payer quelqu’un de nouveau pour l’apprendre ou la reconstruire, et le fournisseur actuel l’emporte par défaut.",
          },
          {
            lead: "La connaissance est la sienne.",
            body: "Seules les personnes du fournisseur comprennent comment cela fonctionne. Elles partent, vous êtes aveugle. Celui-ci n’exige aucune clause contractuelle.",
          },
        ],
      },
      {
        id: "staying-free",
        title: "Rester libre est un ensemble, pas une clause",
        paragraphs: [
          "Aucune clause seule ne vous garde libre. Rester capable de partir est un ensemble d’habitudes, chacune fermant une porte différente :",
        ],
        bullets: [
          {
            lead: "Détenez la propriété intellectuelle.",
            body: "Vous pouvez alors la confier à un autre fournisseur ou l’entretenir vous-même. Allez plus loin que de la détenir sur papier : faites en sorte que le fournisseur garde le code dans un dépôt que votre ministère contrôle dès le premier jour. Un code que vous détenez et pouvez lire est un code sur lequel aucun fournisseur ne peut s’asseoir.",
          },
          {
            lead: "Utilisez des normes ouvertes et des formats ouverts.",
            body: "Ainsi vos données et votre service restent transférables, et plus d’un fournisseur peut y travailler.",
          },
          {
            lead: "Évitez le sur-mesure là où un produit sur étagère fera l’affaire.",
            body: "Les choses standard ont un marché de fournisseurs qui les connaissent. Les choses sur mesure ont un marché d’un seul.",
          },
          {
            lead: "Gardez les contrats courts.",
            body: "Les contrats courts ramènent souvent le moment de changer : le verrouillage ne peut donc pas s’aggraver sans que vous le remarquiez.",
          },
          {
            lead: "Exigez la sortie assistée.",
            body: "Faites en sorte que le contrat oblige le fournisseur à vous rendre vos données sous une forme utilisable et normalisée et à vous aider à déménager, plutôt que de les retenir en otage. Le Royaume-Uni intègre cela directement à ses achats : un fournisseur doit vous laisser partir vers un concurrent.",
          },
          {
            lead: "Gardez assez de connaissance à l’interne.",
            body: "Même avec toutes les clauses en place, vous ne pouvez partir que si quelqu’un de votre côté comprend assez bien le service pour mener le déménagement.",
          },
        ],
      },
      {
        id: "after-you-bought",
        title: "Ce qui change une fois l’achat fait",
        paragraphs: [
          "L’achat n’est qu’un début. Une fois le service en fonction, la plupart des cycles consistent à le garder en marche : correctifs, surveillance, petites modifications prudentes. Vous n’ajoutez pas de grandes fonctionnalités. Votre travail dans cette période change de forme, mais il ne s’arrête pas.",
          "Vous tenez le fournisseur à ce qui a été convenu, et vous guettez la dérive, cette façon lente dont la direction d’un fournisseur et vos besoins s’écartent au fil des renouvellements. Et vous gardez un œil sur la sortie que vous aviez prévue au départ, parce que vient le jour où une partie du service, ou le fournisseur, ou le tout arrive à son terme. Planifier la sortie tôt, c’est ce qui la rend calme quand elle arrive.",
        ],
      },
    ],
  },
  "keep-capability-in-house": {
    slug: "keep-capability-in-house",
    title: "Garder de la capacité à l’interne",
    intro: [
      "Quand un fournisseur construit ou exploite votre service, il est tentant de tout lui confier et de libérer vos propres gens pour d’autres travaux. Gardez quelque chose.",
    ],
    sections: [
      {
        id: "what-enough-means",
        title: "Ce que « assez » veut dire",
        paragraphs: [
          "Conservez assez de compréhension du fonctionnement du service pour pouvoir l’expliquer, le gouverner et, s’il le fallait, le confier à quelqu’un d’autre. Le même portrait, du côté des personnes, est exposé dans la capacité de l’équipe.",
        ],
        paragraphLinks: [
          { index: 0, phrase: "la capacité de l’équipe", to: "/thread/team-capability" },
        ],
        bulletLead:
          "« Assez » ne veut pas dire que vous pouvez faire le travail du fournisseur. Cela veut dire que vous pouvez en rester maître. Vous voulez de votre côté des personnes qui :",
        continuationBullets: [
          "peuvent lire ce que le fournisseur livre et juger si c’est bon ;",
          "savent où vivent vos données et comment elles circulent ;",
          "comprennent les principales décisions de conception et pourquoi elles ont été prises ;",
          "ne seraient pas perdues si le fournisseur partait demain.",
        ],
      },
      {
        id: "why-it-matters",
        title: "Pourquoi cela compte",
        paragraphs: [
          "C’est l’assurance contre le verrouillage. Une équipe qui a gardé assez de capacité à l’interne peut poser les bonnes questions, s’opposer à une mauvaise modification, juger un renouvellement sur le fond, et mener une sortie le moment venu. Une équipe qui a tout confié est à la merci du fournisseur, et ne s’en aperçoit habituellement que tard et à grands frais.",
        ],
      },
      {
        id: "keep-it-alive",
        title: "La garder vivante délibérément",
        paragraphs: [
          "La connaissance s’estompe quand personne ne s’en sert. Consignez les décisions qui comptent, tenez votre documentation à jour, faites tourner les gens dans le travail plutôt que de laisser une seule personne tout porter, et assurez-vous que ce qui vit dans la tête du fournisseur existe aussi de votre côté.",
        ],
      },
    ],
  },
};

/** @deprecated Use PROCUREMENT_SUBPAGES */
export const CONTRACTING_SUBPAGES = PROCUREMENT_SUBPAGES;

export function isProcurementSubPageSlug(slug: string): slug is ProcurementSubPageSlug {
  return PROCUREMENT_SUBPAGE_SLUGS.includes(slug as ProcurementSubPageSlug);
}

/** @deprecated Use isProcurementSubPageSlug */
export function isContractingSubPageSlug(slug: string): slug is ContractingSubPageSlug {
  return isProcurementSubPageSlug(slug);
}
