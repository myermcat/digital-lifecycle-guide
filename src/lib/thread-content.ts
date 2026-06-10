import type { RegionId } from "@/lib/guide-strings";

export interface ThreadRegionNote {
  region: RegionId;
  body: string;
}

export interface ThreadContent {
  slug: string;
  title: string;
  stakes: string;
  whatGoodLooksLike: string[];
  whyItMatters: string;
  whoseJob: string;
  byRegion: ThreadRegionNote[];
  furtherReading: { label: string; href: string }[];
}

export const THREAD_CONTENT: Record<string, ThreadContent> = {
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
};
