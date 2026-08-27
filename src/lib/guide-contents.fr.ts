import type { LucideIcon } from "lucide-react";
import {
  Accessibility,
  Activity,
  Boxes,
  CheckSquare,
  ClipboardList,
  FileCheck,
  FileText,
  GitBranch,
  Lock,
  Megaphone,
  Package,
  Rocket,
  Scale,
  Search,
  Shield,
  Users,
  Wallet,
} from "lucide-react";
import { PAGE_INDEX, type PageIndexEntry } from "@/lib/page-index";
import { PHASES } from "@/lib/guide-strings";
import {
  GOOD_CONTRACT_PATH,
  OPTIONS_ANALYSIS_PATH,
  CHECKPOINT_MAP_PATH,
} from "@/lib/reference-paths";
import { SUPPORT_PATH } from "@/lib/support-path";
import { SITE_NAME } from "@/lib/site-meta";

/** Look up a page-index entry by path. Throws if missing so the contents page stays honest. */
export function requirePageIndexEntry(path: string): PageIndexEntry {
  const entry = PAGE_INDEX.find((page) => page.path === path);
  if (!entry) {
    throw new Error(`page-index.ts is missing an entry for path : ${path}`);
  }
  return entry;
}

export const GUIDE_CONTENTS = {
  title: "Index du Guide du cycle de vie numérique",
  subtitle: "Toutes les pages et tous les documents du guide, au même endroit.",
  intro: {
    text: "Le guide existe sous deux formes. Les pages de phase et de sous-phase sont des pages ordinaires que vous faites défiler, et elles forment la colonne vertébrale du guide. Les documents thématiques portent sur les sujets transversaux qui traversent toute la vie d’un service. Cliquez sur l’un d’eux et il s’ouvre dans votre navigateur.",
    bold: ["pages de phase et de sous-phase", "documents thématiques"],
  },
  startHere: {
    heading: "Commencez ici",
    lede: "La page d’accueil explique ce qu’est le guide et à qui il s’adresse. Si vous ne savez pas s’il est fait pour vous, commencez par là. La page du cycle de vie présente sur une seule page tout le parcours des approbations, des examens et des autorisations officielles, pour que vous en voyiez la forme avant d’ouvrir quoi que ce soit.",
    /** Display labels for Start here only; paths resolve titles from page-index where they match. */
    links: [
      { path: "/", label: SITE_NAME },
      { path: CHECKPOINT_MAP_PATH },
      { path: SUPPORT_PATH },
    ] as const,
  },
  lifeOfAService: {
    heading: "La vie d’un service",
    lede: "Trouvez la phase où vous êtes, puis ouvrez la sous-phase qui correspond à votre situation.",
    phases: [
      {
        path: PHASES.create.href,
        shortTitle: PHASES.create.title,
        when: "Le service n’existe pas encore.",
        phase: "create" as const,
        subphaseLabel: "Trois sous-phases",
        subphasePaths: ["/create-discovery", "/create-alpha", "/create-beta"] as const,
      },
      {
        path: PHASES.live.href,
        shortTitle: PHASES.live.title,
        when: "Le service fonctionne. C’est la phase la plus longue.",
        phase: "live" as const,
        subphaseLabel: "Trois sous-phases",
        subphasePaths: [
          "/live-stabilization",
          "/live-growth",
          "/live-maturity",
        ] as const,
      },
      {
        path: PHASES.sunset.href,
        shortTitle: PHASES.sunset.title,
        when: "Le service est mis hors service ou remplacé.",
        phase: "sunset" as const,
        subphaseLabel: null,
        subphasePaths: [] as const,
      },
    ],
  },
  topics: {
    heading: "Documents thématiques",
    lede: {
      text: "Chacun d’eux traverse toute la vie d’un service, depuis avant son existence jusqu’après sa fermeture. La plupart des gens en utilisent deux ou trois à la fois, et les pages de phase vous indiquent lesquels comptent là où vous êtes. Ils sont répartis en quatre groupes, selon ce que vous cherchez à faire.",
      bold: ["quatre groupes"],
    },
    groups: [
      {
        title: "Le faire financer, acheter et doter en personnel",
        lede: "Presque tous les services sont achetés ou confiés à contrat plutôt que construits à l’interne : ces trois documents déterminent donc l’essentiel de ce qui suit.",
        items: [
          { path: "/thread/funding", icon: Wallet },
          { path: "/thread/procurement", icon: FileText },
          { path: "/thread/team-capability", icon: Users },
        ] satisfies ContentsDocLink[],
      },
      {
        title: "Les obligations à respecter",
        lede: "Fixées par la loi, une politique ou une directive. Chaque service doit les respecter.",
        items: [
          { path: "/thread/accessibility", icon: Accessibility },
          { path: "/thread/security", icon: Shield },
          { path: "/thread/privacy", icon: Lock },
          { path: "/thread/data-stewardship", icon: Boxes },
          { path: "/thread/ethics-and-bias", icon: Scale },
        ] satisfies ContentsDocLink[],
      },
      {
        title: "Les personnes que vous servez",
        lede: "Si le service fonctionne, s’il s’inscrit dans le parcours plus large d’une personne, et si quelqu’un l’adopte.",
        items: [
          { path: "/thread/user-research", icon: Search },
          { path: "/thread/joined-up-delivery", icon: GitBranch },
          { path: "/thread/change-management", icon: Megaphone },
        ] satisfies ContentsDocLink[],
      },
      {
        title: "L’exploiter, année après année",
        lede: "L’Exploitation est de loin la phase la plus longue, et voici le travail qui la remplit.",
        items: [
          { path: "/thread/releasing-changes", icon: Rocket },
          { path: "/thread/monitoring-and-instrumentation", icon: Activity },
          { path: "/thread/backlog", icon: CheckSquare },
          { path: "/thread/dependencies-and-standards", icon: Package },
        ] satisfies ContentsDocLink[],
      },
    ],
  },
  references: {
    heading: "Documents de référence",
    lede: "Chacun répond à une question qui revient sans cesse. Consultez-les au besoin.",
    items: [
      { path: OPTIONS_ANALYSIS_PATH, icon: GitBranch },
      { path: GOOD_CONTRACT_PATH, icon: FileCheck },
    ] satisfies ContentsDocLink[],
  },
  newToThis: {
    title: "Vous découvrez tout cela?",
    steps: [
      "Lisez la page d’accueil. Elle dit ce qu’est le guide et à qui il s’adresse.",
      {
        text: "Trouvez votre phase : Création si le service n’existe pas encore, Exploitation s’il fonctionne, Retrait s’il est mis hors service ou remplacé.",
        bold: ["Création", "Exploitation", "Retrait"],
      },
      "Ouvrez la sous-phase qui correspond à votre situation, et partez de là.",
      "Consultez les documents thématiques à mesure que les pages vous y renvoient.",
    ] as const,
  },
} as const;

export type ContentsDocLink = {
  path: string;
  icon: LucideIcon;
};

/** Resolve a Start here / doc link to its page-index title (or an explicit label). */
export function contentsLinkLabel(
  path: string,
  explicitLabel?: string,
): { title: string; path: string } {
  const entry = requirePageIndexEntry(path);
  return { title: explicitLabel ?? entry.title, path: entry.path };
}
