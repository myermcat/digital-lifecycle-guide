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
  SOO_VS_SOW_PATH,
  GATE_MAP_PATH,
} from "@/lib/reference-paths";
import { SUPPORT_PATH } from "@/lib/support-path";
import { SITE_NAME } from "@/lib/site-meta";

/** Look up a page-index entry by path. Throws if missing so the contents page stays honest. */
export function requirePageIndexEntry(path: string): PageIndexEntry {
  const entry = PAGE_INDEX.find((page) => page.path === path);
  if (!entry) {
    throw new Error(`page-index.ts is missing an entry for path: ${path}`);
  }
  return entry;
}

export const GUIDE_CONTENTS = {
  title: "Index of the Digital Lifecycle Guide",
  subtitle: "Every page and every document in the guide, in one place.",
  intro: {
    text: "The guide is in two forms. The phase and sub-phase pages are ordinary pages you scroll through, and they are the spine of the guide. The topic documents are the cross-cutting subjects that run through the whole life of a service. Click one and it opens in your browser.",
    bold: ["phase and sub-phase pages", "topic documents"],
  },
  startHere: {
    heading: "Start here",
    lede: "The home page explains what the guide is and who it is for. If you are not sure whether it is for you, start there. The gate map lays out the whole path of official approvals, reviews, and sign-offs on one page, so you can see the shape of it before opening anything.",
    /** Display labels for Start here only; paths resolve titles from page-index where they match. */
    links: [
      { path: "/", label: SITE_NAME },
      { path: GATE_MAP_PATH },
      { path: SUPPORT_PATH },
    ] as const,
  },
  lifeOfAService: {
    heading: "The life of a service",
    lede: "Find the phase you are in, then open the sub-phase that matches where you are.",
    phases: [
      {
        path: PHASES.create.href,
        shortTitle: PHASES.create.title,
        when: "The service does not exist yet.",
        phase: "create" as const,
        subphaseLabel: "Three sub-phases",
        subphasePaths: ["/create-discovery", "/create-alpha", "/create-beta"] as const,
      },
      {
        path: PHASES.live.href,
        shortTitle: PHASES.live.title,
        when: "The service is running. This is the longest phase.",
        phase: "live" as const,
        subphaseLabel: "Three sub-phases",
        subphasePaths: [
          "/live-stabilization",
          "/live-growth",
          "/live-maturity",
        ] as const,
      },
      {
        path: PHASES.sunset.href,
        shortTitle: PHASES.sunset.title,
        when: "The service is being retired or replaced.",
        phase: "sunset" as const,
        subphaseLabel: null,
        subphasePaths: [] as const,
      },
    ],
  },
  topics: {
    heading: "Topic documents",
    lede: {
      text: "Each of these runs through the whole life of a service, from before it exists to after it is switched off. Most people need two or three of them at a time, and the phase pages tell you which ones matter where you are. They are in four groups, by what you are trying to do.",
      bold: ["four groups"],
    },
    groups: [
      {
        title: "Getting it funded, bought, and staffed",
        lede: "Almost every service is bought or contracted rather than built in-house, so these three decide most of what follows.",
        items: [
          { path: "/thread/funding", icon: Wallet },
          { path: "/thread/procurement", icon: FileText },
          { path: "/thread/team-capability", icon: Users },
        ] satisfies ContentsDocLink[],
      },
      {
        title: "Duties you have to meet",
        lede: "Set by law, policy, or directive. Every service has to meet them.",
        items: [
          { path: "/thread/accessibility", icon: Accessibility },
          { path: "/thread/security", icon: Shield },
          { path: "/thread/privacy", icon: Lock },
          { path: "/thread/data-stewardship", icon: Boxes },
          { path: "/thread/ethics-and-bias", icon: Scale },
        ] satisfies ContentsDocLink[],
      },
      {
        title: "The people you serve",
        lede: "Whether the service works, whether it fits the wider journey a person is on, and whether anyone switches to it.",
        items: [
          { path: "/thread/user-research", icon: Search },
          { path: "/thread/joined-up-delivery", icon: GitBranch },
          { path: "/thread/change-management", icon: Megaphone },
        ] satisfies ContentsDocLink[],
      },
      {
        title: "Running it, year after year",
        lede: "Live is the longest phase by a wide margin, and this is the work that fills it.",
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
    heading: "Reference documents",
    lede: "Each of these answers one question that keeps coming up. Look them up when you need them.",
    items: [
      { path: OPTIONS_ANALYSIS_PATH, icon: GitBranch },
      { path: GOOD_CONTRACT_PATH, icon: FileCheck },
      { path: SOO_VS_SOW_PATH, icon: ClipboardList },
    ] satisfies ContentsDocLink[],
  },
  newToThis: {
    title: "New to all of this?",
    steps: [
      "Read the home page. It says what the guide is and who it is for.",
      {
        text: "Find your phase: Create if the service does not exist yet, Live if it is running, Sunset if it is being retired or replaced.",
        bold: ["Create", "Live", "Sunset"],
      },
      "Open the sub-phase that matches where you are, and work from there.",
      "Pull in the topic documents as the pages point you to them.",
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
