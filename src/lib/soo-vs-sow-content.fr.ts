import type { CaseStudySide } from "@/components/CaseStudyBlock";

export const SOO_VS_SOW = {
  title: "Énoncé des besoins et énoncé des travaux",
  summary: [
    "Tout contrat exige une description écrite des travaux achetés, et elle se construit en trois étapes. Chacune est élaborée à partir de la précédente, et le Canada rédige les trois.",
  ],
  afterVisual: [
    "L’énoncé des travaux est celui qui compte en fin de compte. Il entre dans la demande de soumissions, de sorte que les fournisseurs soumissionnent en fonction de lui, et il est annexé au contrat, ce qui en fait la chose à laquelle le fournisseur est tenu.",
    "Ce que vous décidez, c’est le niveau de détail à y mettre. Rédigez-le au niveau de ce que le service doit accomplir, et lorsque les tests montreront plus tard qu’un écran ne va pas, corriger cet écran fera partie du travail pour lequel le fournisseur a déjà été engagé. Rédigez-le comme un ensemble de conceptions d’écrans convenues avant que quiconque les ait testées, et le fournisseur construira ces conceptions; en changer une signifiera alors modifier le contrat, à un prix fixé par le seul fournisseur dans la salle.",
  ],
  comparison: {
    actualLabel: "Rédigé de façon serrée",
    alternativeLabel: "Rédigé en fonction du résultat",
    sow: {
      heading: "Rédigé de façon serrée",
      items: [
        "Énumère les choses exactes à construire, dans l’ordre, avec des dates fixes.",
        "Suppose que les exigences sont connues et ne changeront pas.",
        "Se lit comme « le fournisseur doit construire ces écrans, dans cet ordre, pour cette date ».",
        "Convient à des travaux bien compris et stables.",
        "Quand vous apprenez quelque chose de nouveau, vous rouvrez le contrat pour changer la liste.",
      ],
    } satisfies CaseStudySide,
    soo: {
      heading: "Rédigé en fonction du résultat",
      items: [
        "Énonce les objectifs et les personnes visées, non les étapes.",
        "Suppose que vous apprendrez en chemin, et laisse de la place pour cela.",
        "Se lit comme « voici ce que ce service doit accomplir, et pour qui ».",
        "Convient au travail numérique, où le problème n’est pas entièrement connu au départ.",
        "Les travaux peuvent changer sans nouveau contrat, parce qu’ils sont liés à l’objectif.",
      ],
    } satisfies CaseStudySide,
  },
} as const;
