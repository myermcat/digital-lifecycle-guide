export interface StubPageContent {
  title: string;
  body: string;
}

/** Non-thread pages (orientation, reviews). Practice cards link to thread pages instead. */
export const PRACTICE_STUBS: Record<string, StubPageContent> = {
  "maturity-orientation": {
    title: "Maturity orientation",
    body: "This page will walk through the first steps in Maturity: understanding the service as it is, finding your monitoring and backlog, locating your latest security and privacy assessments, and scheduling your first internal team review.",
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
