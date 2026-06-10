import type { RegionId } from "@/lib/guide-strings";
import { THREADS, type ThreadSlug } from "@/lib/guide-strings";

export interface ThreadRegionNote {
  region: RegionId;
  body: string;
}

export interface ThreadTopicSection {
  title: string;
  body: string;
}

export interface ThreadContent {
  slug: ThreadSlug;
  title: string;
  stakes: string;
  whatGoodLooksLike: string[];
  whyItMatters: string;
  whoseJob: string;
  byRegion: ThreadRegionNote[];
  /** Optional thematic sections (e.g. Joined-up delivery). */
  topicSections?: ThreadTopicSection[];
  furtherReading: { label: string; href: string }[];
}

function placeholderThread(
  slug: ThreadSlug,
  stakesTopic: string,
): ThreadContent {
  const title = THREADS[slug].title;
  return {
    slug,
    title,
    stakes: `This page will explain what ${stakesTopic} means across the lifecycle and why it matters for federal digital services.`,
    whatGoodLooksLike: [
      `This page will describe the concrete bar to clear for ${title.toLowerCase()} in Create.`,
      `This page will describe what good looks like for ${title.toLowerCase()} in Live.`,
      `This page will describe what good looks like for ${title.toLowerCase()} in Sunset.`,
    ],
    whyItMatters: `This page will cover the principle and human stakes behind ${title.toLowerCase()}.`,
    whoseJob: `This page will explain how ${title.toLowerCase()} is shared across the team, not owned by one person.`,
    byRegion: [
      {
        region: "create",
        body: `This page will describe how ${title.toLowerCase()} shows up during Create.`,
      },
      {
        region: "live",
        body: `This page will describe how ${title.toLowerCase()} shows up during Live.`,
      },
      {
        region: "sunset",
        body: `This page will describe how ${title.toLowerCase()} shows up during Sunset.`,
      },
    ],
    furtherReading: [],
  };
}

export const THREAD_CONTENT: Record<ThreadSlug, ThreadContent> = {
  accessibility: {
    slug: "accessibility",
    title: "Accessibility",
    stakes:
      "Accessibility is a legal requirement for federal services and a practical one for everyone who uses them. When barriers remain, people are excluded and the service fails its mandate.",
    whatGoodLooksLike: [
      "The service meets WCAG 2.1 Level AA at minimum.",
      "Disabled users are included in research and testing, not only automated scans.",
      "Accessibility is checked before release and on a recurring schedule in Live.",
      "Issues found are tracked, prioritised, and fixed like any other defect.",
    ],
    whyItMatters:
      "A service that works for some people but not others is not finished. Accessibility is about dignity and equal access — and about building something that still works when circumstances, devices, or abilities change.",
    whoseJob:
      "Accessibility is shared work. Designers, developers, content authors, and product owners each carry part of it. No single role can own it alone.",
    byRegion: [
      {
        region: "create",
        body: "Bake accessibility in from the start: inclusive research, accessible prototypes, and standards in acceptance criteria before anything goes live.",
      },
      {
        region: "live",
        body: "Most of the ongoing work lives here: regression testing, monitoring for drift, fixing issues from user feedback, and keeping assistive technology compatibility current.",
      },
      {
        region: "sunset",
        body: "Keep accessible paths open until the last user has moved on. Do not remove support channels or documentation people still rely on.",
      },
    ],
    furtherReading: [
      {
        label: "Government of Canada Design System — Accessibility",
        href: "https://design-system.canada.ca/",
      },
      {
        label: "Accessible Canada Act",
        href: "https://www.canada.ca/en/employment-social-development/programs/accessible-canada.html",
      },
    ],
  },
  "monitoring-and-instrumentation": {
    ...placeholderThread(
      "monitoring-and-instrumentation",
      "monitoring and instrumentation",
    ),
    stakes:
      "You cannot improve what you do not measure. Instrumentation turns impressions into evidence — and dashboards are one way to make that evidence visible.",
    whatGoodLooksLike: [
      "Signals come from the service and its infrastructure, not from manual entry.",
      "The team watches a small set of metrics that reflect real user experience and system health.",
      "Dashboards are readable, trusted, and visible to the bodies that review you.",
      "What you learn from monitoring leads to decisions, not just reports.",
    ],
    whyItMatters:
      "Without instrumentation, you are guessing. A service can feel fine while failing users quietly. Monitoring is how you notice problems before they become crises.",
    whoseJob:
      "Developers instrument the service. The whole team chooses what to watch and acts on what they see. Dashboards are a team tool, not a vanity display.",
    byRegion: [
      {
        region: "create",
        body: "Decide what to measure before go-live. Build instrumentation into the first real version, not as an afterthought.",
      },
      {
        region: "live",
        body: "Most monitoring work lives here: dashboards, alerts, performance tracking, and turning signals into backlog items.",
      },
      {
        region: "sunset",
        body: "Keep monitoring until the last user has moved on. Watch for stragglers and failures during transition.",
      },
    ],
  },
  "releasing-changes": placeholderThread("releasing-changes", "releasing changes safely"),
  "dependencies-and-standards": placeholderThread(
    "dependencies-and-standards",
    "dependencies and open standards",
  ),
  "component-eol": placeholderThread(
    "component-eol",
    "component end of life",
  ),
  "user-research": placeholderThread("user-research", "user research"),
  cybersecurity: {
    ...placeholderThread("cybersecurity", "cybersecurity"),
    stakes:
      "Security failures can shut down a service, expose citizens' data, and erode trust. Keeping security current is not a one-time task.",
    whatGoodLooksLike: [
      "Patches are applied on schedule.",
      "Access is audited and least-privilege is the default.",
      "Vulnerabilities are tested for regularly.",
      "An incident response plan exists and has been exercised.",
    ],
  },
  privacy: {
    ...placeholderThread("privacy", "privacy"),
    stakes:
      "Personal data must be protected and handled lawfully. Privacy failures carry legal and reputational consequences.",
    whatGoodLooksLike: [
      "Privacy assessments are current.",
      "Consent and retention rules are followed.",
      "Only necessary data is collected and kept.",
      "Breach response procedures are in place.",
    ],
  },
  procurement: placeholderThread(
    "procurement",
    "procurement and contracts",
  ),
  contracting: placeholderThread("contracting", "contracting"),
  "data-stewardship": placeholderThread("data-stewardship", "data stewardship"),
  "ethics-and-bias": placeholderThread("ethics-and-bias", "ethics and bias"),
  "team-capability": placeholderThread("team-capability", "team capability"),
  backlog: placeholderThread("backlog", "running the backlog"),
  "joined-up-delivery": {
    slug: "joined-up-delivery",
    title: "Joined-up delivery",
    stakes:
      "Users experience a whole journey, not isolated services or channels. When parts drift apart, the service fails even when each team is doing their job.",
    whatGoodLooksLike: [
      "Adjacent services are coordinated so handoffs work end to end.",
      "All channels tell the same story about what the service does today.",
      "Operations staff and call centres are kept in step when the online service changes.",
      "Someone owns the cross-service view, even when delivery is split across teams.",
    ],
    whyItMatters:
      "A user does not care which team owns which system. They care whether they can finish what they came to do.",
    whoseJob:
      "Joined-up delivery is shared. Product owners, service owners, and channel leads each carry part of keeping the whole journey coherent.",
    byRegion: [
      {
        region: "create",
        body: "Map the user journey across services early. Design handoffs before building in isolation.",
      },
      {
        region: "live",
        body: "Most coordination work lives here: keeping adjacent services aligned and all channels current as the service evolves.",
      },
      {
        region: "sunset",
        body: "Coordinate the exit across services and channels so users are not stranded between old and new.",
      },
    ],
    topicSections: [
      {
        title: "Between-services coordination",
        body: "This page will cover working with the teams responsible for services on either side of yours, so the user's whole journey keeps working and not just your part of it.",
      },
      {
        title: "Between-channels consistency",
        body: "This page will cover keeping call centre scripts, operations staff, and other channels in sync when the online service changes.",
      },
    ],
    furtherReading: [],
  },
};
