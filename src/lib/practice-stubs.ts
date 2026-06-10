export interface StubPageContent {
  title: string;
  body: string;
}

export const PRACTICE_STUBS: Record<string, StubPageContent> = {
  "maturity-orientation": {
    title: "Maturity orientation",
    body: "This page will walk through the first steps in Maturity: understanding the service as it is, finding your monitoring and backlog, locating your latest security and privacy assessments, and scheduling your first internal team review.",
  },
  "monitor-performance": {
    title: "Monitor and improve performance",
    body: "This page will cover tracking how the service behaves in production, choosing signals from instrumentation rather than impressions, and turning what you see into improvements.",
  },
  "deliver-changes-safely": {
    title: "Deliver changes safely",
    body: "This page will cover keeping changes small and tested, releasing without downtime, and maintaining a rollback you have actually exercised.",
  },
  "manage-dependencies-standards": {
    title: "Manage your dependencies and open standards",
    body: "This page will cover tracking what your service relies on upstream and adopting the updates and open standards that matter.",
  },
  "continue-user-research": {
    title: "Continue user research",
    body: "This page will cover staying in contact with the people who use your service and acting on what they tell you.",
  },
  "maintain-accessibility": {
    title: "Maintain accessibility",
    body: "This page will cover testing on a cadence as standards and assistive technologies change, including testing with disabled users and not relying on automated checks alone.",
  },
  "maintain-security": {
    title: "Maintain security",
    body: "This page will cover patching on schedule, auditing access, testing for vulnerabilities, and keeping your incident response plan current.",
  },
  "maintain-privacy": {
    title: "Maintain privacy",
    body: "This page will cover keeping personal data protected and handled lawfully, including privacy assessments, consent, retention, and breach response.",
  },
  "steward-data": {
    title: "Steward the data",
    body: "This page will cover holding only the data you still need, disposing of what you should, and opening what you can.",
  },
  "review-ethics-bias": {
    title: "Review ethics and bias",
    body: "This page will cover testing automated decisions for bias on a schedule and keeping the assessment current.",
  },
  "maintain-team-capability": {
    title: "Maintain team capability",
    body: "This page will cover documenting knowledge so it survives staff changes, running retrospectives, and managing vendor relationships against the contract.",
  },
  "run-backlog": {
    title: "Run the backlog",
    body: "This page will cover keeping one prioritised list, reordering it at every internal team review, and recording what you decide not to do.",
  },
  "coordinate-adjacent-services": {
    title: "Coordinate with adjacent services",
    body: "This page will cover working with teams on either side of yours so the user's whole journey keeps working, not just your part of it.",
  },
  "keep-channels-in-step": {
    title: "Keep all channels in step",
    body: "This page will cover keeping call centre scripts, operations staff, and other channels aligned when the online service changes.",
  },
  "build-dashboard": {
    title: "Build a dashboard from instrumentation",
    body: "This page will cover choosing signals measured by the service and its infrastructure, keeping the dashboard readable, and making it visible to the bodies that review you.",
  },
};

export const REVIEW_STUBS: Record<string, StubPageContent> = {
  "internal-team-review": {
    title: "Internal team review",
    body: "This page will cover the frequent internal review where the team turns signals into decisions — maintenance, not an exam.",
  },
  "external-peer-review": {
    title: "External peer review",
    body: "This page will cover the occasional external review where someone from outside your team looks at the service so you can see gaps you cannot see alone.",
  },
  "institutional-review": {
    title: "Institutional review",
    body: "This page will cover the rare central review when a service's scope or impact warrants institutional scrutiny.",
  },
};
