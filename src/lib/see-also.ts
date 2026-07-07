import type { SeeAlsoItem } from "@/components/SeeAlso";

export const SEE_ALSO: Record<string, SeeAlsoItem[]> = {
  "monitoring-and-instrumentation": [
    {
      label: "Releasing changes",
      to: "/thread/releasing-changes",
      gloss: "releasing changes safely once you can see the service",
    },
    { label: "Security", to: "/thread/security", gloss: "detection and response lean on monitoring" },
    { label: "Backlog", to: "/thread/backlog", gloss: "what the signals feed into next" },
  ],
  "releasing-changes": [
    {
      label: "Monitoring and instrumentation",
      to: "/thread/monitoring-and-instrumentation",
      gloss: "how you see whether a release went well",
    },
    {
      label: "Dependencies and standards",
      to: "/thread/dependencies-and-standards",
      gloss: "what a release has to stay current with",
    },
    {
      label: "Change management",
      to: "/thread/change-management",
      gloss: "helping people adopt the change",
    },
    { label: "Backlog", to: "/thread/backlog", gloss: "deciding what to release next" },
  ],
  "dependencies-and-standards": [
    {
      label: "Security",
      to: "/thread/security",
      gloss: "third-party components are part of the attack surface",
    },
    {
      label: "Releasing changes",
      to: "/thread/releasing-changes",
      gloss: "keeping dependencies current, release by release",
    },
    {
      label: "Procurement",
      to: "/thread/procurement",
      gloss: "what you build on is often what you bought",
    },
  ],
  "user-research": [
    {
      label: "Accessibility",
      to: "/thread/accessibility",
      gloss: "research includes people who use assistive technology",
    },
    {
      label: "Joined-up delivery",
      to: "/thread/joined-up-delivery",
      gloss: "the user's whole journey, not just your box",
    },
    {
      label: "Ethics and bias",
      to: "/thread/ethics-and-bias",
      gloss: "who the service affects, and how",
    },
  ],
  accessibility: [
    {
      label: "User research",
      to: "/thread/user-research",
      gloss: "testing with real users, including assistive tech",
    },
    {
      label: "Joined-up delivery",
      to: "/thread/joined-up-delivery",
      gloss: "an accessible step in an inaccessible journey still fails",
    },
    {
      label: "Procurement",
      to: "/thread/procurement",
      gloss: "accessibility written into what you buy",
    },
  ],
  security: [
    { label: "Privacy", to: "/thread/privacy", gloss: "protecting the people behind the data" },
    {
      label: "Procurement",
      to: "/thread/procurement",
      gloss: "security requirements written into the contract",
    },
    {
      label: "Monitoring and instrumentation",
      to: "/thread/monitoring-and-instrumentation",
      gloss: "where detection lives once the service runs",
    },
    {
      label: "Data stewardship",
      to: "/thread/data-stewardship",
      gloss: "handling and retiring data safely",
    },
  ],
  privacy: [
    {
      label: "Security",
      to: "/thread/security",
      gloss: "the defenses that keep personal data safe",
    },
    {
      label: "Data stewardship",
      to: "/thread/data-stewardship",
      gloss: "how the data is held, moved, and retired",
    },
    {
      label: "Ethics and bias",
      to: "/thread/ethics-and-bias",
      gloss: "the wider harms to watch for",
    },
  ],
  procurement: [
    { label: "Funding", to: "/thread/funding", gloss: "how the buy is paid for and approved" },
    {
      label: "Security",
      to: "/thread/security",
      gloss: "requirements the supplier is held to",
    },
    {
      label: "Data stewardship",
      to: "/thread/data-stewardship",
      gloss: "who holds the data you bought",
    },
  ],
  "data-stewardship": [
    { label: "Privacy", to: "/thread/privacy", gloss: "the people behind the data" },
    {
      label: "Security",
      to: "/thread/security",
      gloss: "protecting and safely disposing of data",
    },
    { label: "Funding", to: "/thread/funding", gloss: "the data move at the end costs money" },
  ],
  "ethics-and-bias": [
    { label: "Privacy", to: "/thread/privacy", gloss: "closely related harms" },
    {
      label: "User research",
      to: "/thread/user-research",
      gloss: "hearing from the people affected",
    },
    {
      label: "Accessibility",
      to: "/thread/accessibility",
      gloss: "not shutting people out",
    },
  ],
  "team-capability": [
    {
      label: "Joined-up delivery",
      to: "/thread/joined-up-delivery",
      gloss: "the team around the whole journey",
    },
    {
      label: "Procurement",
      to: "/thread/procurement",
      gloss: "keeping enough capability in-house",
    },
    { label: "Backlog", to: "/thread/backlog", gloss: "matching work to the team you have" },
  ],
  backlog: [
    {
      label: "Releasing changes",
      to: "/thread/releasing-changes",
      gloss: "turning backlog into delivered work",
    },
    {
      label: "Monitoring and instrumentation",
      to: "/thread/monitoring-and-instrumentation",
      gloss: "signals that reshape the backlog",
    },
    {
      label: "Team capability",
      to: "/thread/team-capability",
      gloss: "what the team can actually take on",
    },
  ],
  "joined-up-delivery": [
    {
      label: "User research",
      to: "/thread/user-research",
      gloss: "understanding the whole journey",
    },
    {
      label: "Accessibility",
      to: "/thread/accessibility",
      gloss: "every step usable by everyone",
    },
    {
      label: "Team capability",
      to: "/thread/team-capability",
      gloss: "the people who join it up",
    },
    {
      label: "Change management",
      to: "/thread/change-management",
      gloss: "helping people adopt a change across the journey",
    },
  ],
  funding: [
    { label: "Procurement", to: "/thread/procurement", gloss: "the other half of buying" },
    {
      label: "Joined-up delivery",
      to: "/thread/joined-up-delivery",
      gloss: "funding a service, not a project",
    },
  ],
  "change-management": [
    {
      label: "Joined-up delivery",
      to: "/thread/joined-up-delivery",
      gloss: "a change reaches across the whole journey",
    },
    {
      label: "Team capability",
      to: "/thread/team-capability",
      gloss: "the people who absorb the change",
    },
    {
      label: "Releasing changes",
      to: "/thread/releasing-changes",
      gloss: "the technical side of releasing a change",
    },
  ],
};
