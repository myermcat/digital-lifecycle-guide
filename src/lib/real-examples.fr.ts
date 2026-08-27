import type { ThreadLinkedProse } from "@/lib/thread-rich-content";

/**
 * Documented Government of Canada failure examples, one per sub-phase where the
 * record genuinely supports the rule. Every claim is checked against the linked
 * report before it goes here; Alpha carries none because no documented case maps
 * cleanly onto its rules.
 */
export type RealExample = {
  id: string;
  title: string;
  paragraphs: readonly ThreadLinkedProse[];
};

export const REAL_EXAMPLES: Partial<
  Record<"discovery" | "beta" | "stabilization" | "growth" | "maturity", RealExample>
> = {
  discovery: {
    id: "real-example-eti",
    title: "Trois mille boîtes aux lettres, sur cinq cent mille",
    paragraphs: [
      {
        text: "En 2011, Services partagés Canada a repris le courriel, les centres de données et les réseaux de 43 ministères, et a entrepris de fondre les systèmes de courriel ministériels en un seul. Le plan : plus de 500 000 boîtes aux lettres transférées au nouveau service d’ici mars 2015.",
        bold: [{ phrase: "plus de 500 000 boîtes aux lettres" }],
      },
      {
        text: "À cette date, environ 3 000 avaient été transférées. Le vérificateur général a constaté que des attentes claires et concrètes n’avaient jamais été établies avec les ministères, et que les progrès et les économies ne pouvaient être ni mesurés ni suivis correctement : l’engagement est venu avant la compréhension. Compter ce qui existe, convenir de ce à quoi ressemble la réussite, et se demander si la chose est seulement faisable : c’est le travail de la Découverte, et aucune phase ultérieure ne peut le faire rétroactivement.",
        bold: [{ phrase: "environ 3 000 avaient été transférées" }],
        externalLinks: [{ phrase: "Le vérificateur général a constaté", linkKey: "oag-it-shared-services" }],
      },
    ],
  },
  beta: {
    id: "real-example-phoenix-launch",
    title: "Phoenix a sauté le projet pilote et a été lancé pour tout le monde d’un coup",
    paragraphs: [
      {
        text: "En 2016, le gouvernement du Canada a remplacé son système de paye vieux de 40 ans par Phoenix. Pour tenir la date et le budget, le projet pilote prévu, un ministère en premier, a été abandonné, des fonctions de paye essentielles ont été retirées, et les essais du système ont été écourtés. Le ministère connaissait de graves faiblesses, et Phoenix a quand même été mis en service, pour tout le monde, en deux vagues.",
        bold: [{ phrase: "le projet pilote prévu, un ministère en premier, a été abandonné" }],
      },
      {
        text: "En quelques mois, des dizaines de milliers de fonctionnaires ont été mal payés ou pas payés du tout : chèques erronés, chèques manquants, des gens vérifiant leurs propres talons à la calculatrice. L’arriéré a grimpé à des centaines de milliers de dossiers de paye, et corriger le système a coûté plusieurs fois ce que sa construction avait coûté. Le vérificateur général a parlé d’un échec incompréhensible de la gestion et de la surveillance de projet. Le groupe invité, le volume plafonné, la décision de continuer prise sur des preuves : ce que cette page demande à la Bêta est exactement ce que Phoenix a sauté.",
        bold: [{ phrase: "mal payés ou pas payés du tout" }],
        externalLinks: [
          { phrase: "Le vérificateur général a parlé", linkKey: "oag-phoenix-build" },
        ],
      },
    ],
  },
  stabilization: {
    id: "real-example-phoenix-launch-day",
    title: "Le jour du lancement, il n’y avait aucune voie de retour",
    paragraphs: [
      {
        text: "Quand Phoenix a été mis en service, l’ancien système de paye a été éteint, et des centaines des conseillers en rémunération qui comprenaient la paye avaient déjà été remerciés. Alors quand les premières payes sont sorties erronées, il n’y avait aucun ancien système vers lequel se replier, et presque plus personne pour corriger un dossier de paye à la main.",
        bold: [{ phrase: "il n’y avait aucun ancien système vers lequel se replier" }],
        externalLinks: [{ phrase: "Phoenix", linkKey: "oag-phoenix-build" }],
      },
      {
        text: "Chaque défaut a atteint de vraies payes à plein volume, et la file des dossiers de paye brisés a grossi plus vite que quiconque pouvait l’écouler. La voie d’entrée de la Stabilisation existe à cause de lancements comme celui-là : l’ancienne façon encore en marche, avec un plan de retrait daté, et les personnes qui comprennent le service encore joignables.",
        bold: [{ phrase: "Chaque défaut a atteint de vraies payes à plein volume" }],
      },
    ],
  },
  growth: {
    id: "real-example-arrivecan",
    title: "177 versions, et aucun moyen d’additionner la facture",
    paragraphs: [
      {
        text: "ArriveCAN a été construit vite, en situation d’urgence, et ce n’est pas la vitesse qui lui a nui. Les dossiers de l’Agence des services frontaliers du Canada étaient si mauvais que le vérificateur général n’a pas pu déterminer ce que l’application avait coûté; l’estimation était d’environ 59,5 millions de dollars. Le premier contrat a été adjugé par un processus non concurrentiel que l’agence pouvait à peine documenter, et les factures en disaient souvent trop peu pour savoir quels travaux étaient facturés au titre de quelle autorisation de tâches.",
        bold: [{ phrase: "n’a pas pu déterminer ce que l’application avait coûté" }],
        externalLinks: [{ phrase: "le vérificateur général", linkKey: "oag-arrivecan" }],
      },
      {
        text: "L’agence a publié 177 versions de l’application, souvent avec peu ou pas d’essais documentés. Une mise à jour, en juin 2022, a dit à tort à environ 10 000 voyageurs de se mettre en quarantaine. Une tâche décrite, chiffrée et approuvée; une mise en production éprouvée d’abord à petite échelle : les règles de ce bloc sont la discipline dont la vérification décrit l’absence.",
        bold: [{ phrase: "a dit à tort à environ 10 000 voyageurs de se mettre en quarantaine" }],
      },
    ],
  },
  maturity: {
    id: "real-example-forced-replacement",
    title: "Le remplacement forcé s’appelait Phoenix",
    paragraphs: [
      {
        text: "Le système de paye que Phoenix a remplacé avait fonctionné pendant environ 40 ans, et à la fin, le remplacer n’était plus un choix que le gouvernement pouvait reporter.",
        bold: [{ phrase: "avait fonctionné pendant environ 40 ans" }],
        externalLinks: [{ phrase: "Phoenix", linkKey: "oag-phoenix-build" }],
      },
      {
        text: "Un remplacement qui ne peut plus attendre est mené comme une urgence : une date fixe, et de la pression pour aller vite et à moindre coût. Les raccourcis pris sous cette pression sont devenus le désastre Phoenix. Continuer d’améliorer un service pendant que s’améliorer est encore facultatif, c’est ce qui épargne à celui qui suit d’hériter de ses problèmes, multipliés.",
        bold: [{ phrase: "Un remplacement qui ne peut plus attendre est mené comme une urgence" }],
      },
    ],
  },
};
