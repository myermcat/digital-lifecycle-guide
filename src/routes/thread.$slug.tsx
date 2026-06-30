import { createFileRoute, redirect, notFound } from "@tanstack/react-router";
import { CrossCuttingThreadPage } from "@/components/CrossCuttingThreadPage";
import { AccessibilityThreadPage } from "@/components/AccessibilityThreadPage";
import { UserResearchThreadPage } from "@/components/UserResearchThreadPage";
import { EthicsAndBiasThreadPage } from "@/components/EthicsAndBiasThreadPage";
import { BacklogThreadPage } from "@/components/BacklogThreadPage";
import { JoinedUpDeliveryThreadPage } from "@/components/JoinedUpDeliveryThreadPage";
import { ReleasingChangesThreadPage } from "@/components/ReleasingChangesThreadPage";
import { DependenciesAndStandardsThreadPage } from "@/components/DependenciesAndStandardsThreadPage";
import { FundingThreadPage } from "@/components/FundingThreadPage";
import { PrivacyThreadPage } from "@/components/PrivacyThreadPage";
import { DataStewardshipThreadPage } from "@/components/DataStewardshipThreadPage";
import { SecurityThreadPage } from "@/components/SecurityThreadPage";
import { THREAD_CONTENT } from "@/lib/thread-content";
import type { ThreadSlug } from "@/lib/guide-strings";
import { PROCUREMENT_LANDING } from "@/lib/procurement-landing";
import { SECURITY_THREAD } from "@/lib/security-thread-content";
import { PRIVACY_THREAD } from "@/lib/privacy-thread-content";
import { DATA_STEWARDSHIP_THREAD } from "@/lib/data-stewardship-thread-content";
import { ACCESSIBILITY_THREAD } from "@/lib/accessibility-thread-content";
import { USER_RESEARCH_THREAD } from "@/lib/user-research-thread-content";
import { ETHICS_AND_BIAS_THREAD } from "@/lib/ethics-and-bias-thread-content";
import { BACKLOG_THREAD } from "@/lib/backlog-thread-content";
import { JOINED_UP_DELIVERY_THREAD } from "@/lib/joined-up-delivery-thread-content";
import { RELEASING_CHANGES_THREAD } from "@/lib/releasing-changes-thread-content";
import { DEPENDENCIES_AND_STANDARDS_THREAD } from "@/lib/dependencies-and-standards-thread-content";
import { FUNDING_THREAD, fundingLeadPlainText } from "@/lib/funding-thread-content";
import { threadLeadPlainText } from "@/lib/thread-rich-content";

export const Route = createFileRoute("/thread/$slug")({
  head: ({ params }) => {
    if (params.slug === "procurement") {
      return {
        meta: [
          { title: `${PROCUREMENT_LANDING.title} — The Digital Lifecycle Guide` },
          { name: "description", content: PROCUREMENT_LANDING.intro.paragraphs[0] },
        ],
      };
    }

    if (params.slug === "security") {
      return {
        meta: [
          { title: `${SECURITY_THREAD.title} — The Digital Lifecycle Guide` },
          { name: "description", content: SECURITY_THREAD.lead },
        ],
      };
    }

    if (params.slug === "privacy") {
      return {
        meta: [
          { title: `${PRIVACY_THREAD.title} — The Digital Lifecycle Guide` },
          { name: "description", content: threadLeadPlainText(PRIVACY_THREAD.lead) },
        ],
      };
    }

    if (params.slug === "data-stewardship") {
      return {
        meta: [
          { title: `${DATA_STEWARDSHIP_THREAD.title} — The Digital Lifecycle Guide` },
          { name: "description", content: threadLeadPlainText(DATA_STEWARDSHIP_THREAD.lead) },
        ],
      };
    }

    if (params.slug === "accessibility") {
      return {
        meta: [
          { title: `${ACCESSIBILITY_THREAD.title} — The Digital Lifecycle Guide` },
          { name: "description", content: threadLeadPlainText(ACCESSIBILITY_THREAD.lead) },
        ],
      };
    }

    if (params.slug === "user-research") {
      return {
        meta: [
          { title: `${USER_RESEARCH_THREAD.title} — The Digital Lifecycle Guide` },
          { name: "description", content: threadLeadPlainText(USER_RESEARCH_THREAD.lead) },
        ],
      };
    }

    if (params.slug === "ethics-and-bias") {
      return {
        meta: [
          { title: `${ETHICS_AND_BIAS_THREAD.title} — The Digital Lifecycle Guide` },
          { name: "description", content: threadLeadPlainText(ETHICS_AND_BIAS_THREAD.lead) },
        ],
      };
    }

    if (params.slug === "backlog") {
      return {
        meta: [
          { title: `${BACKLOG_THREAD.title} — The Digital Lifecycle Guide` },
          { name: "description", content: threadLeadPlainText(BACKLOG_THREAD.lead) },
        ],
      };
    }

    if (params.slug === "joined-up-delivery") {
      return {
        meta: [
          { title: `${JOINED_UP_DELIVERY_THREAD.title} — The Digital Lifecycle Guide` },
          {
            name: "description",
            content: threadLeadPlainText(JOINED_UP_DELIVERY_THREAD.lead),
          },
        ],
      };
    }

    if (params.slug === "releasing-changes") {
      return {
        meta: [
          { title: `${RELEASING_CHANGES_THREAD.title} — The Digital Lifecycle Guide` },
          {
            name: "description",
            content: threadLeadPlainText(RELEASING_CHANGES_THREAD.lead),
          },
        ],
      };
    }

    if (params.slug === "dependencies-and-standards") {
      return {
        meta: [
          {
            title: `${DEPENDENCIES_AND_STANDARDS_THREAD.title} — The Digital Lifecycle Guide`,
          },
          {
            name: "description",
            content: threadLeadPlainText(DEPENDENCIES_AND_STANDARDS_THREAD.lead),
          },
        ],
      };
    }

    if (params.slug === "funding") {
      return {
        meta: [
          { title: `${FUNDING_THREAD.title} — The Digital Lifecycle Guide` },
          {
            name: "description",
            content: fundingLeadPlainText(FUNDING_THREAD.lead),
          },
        ],
      };
    }

    const content = THREAD_CONTENT[params.slug as ThreadSlug];
    return {
      meta: content
        ? [
            { title: `${content.title} — The Digital Lifecycle Guide` },
            { name: "description", content: content.stakes },
          ]
        : [{ title: "Not found — The Digital Lifecycle Guide" }],
    };
  },
  beforeLoad: ({ params }) => {
    if (params.slug === "cybersecurity") {
      throw redirect({ to: "/thread/security" });
    }
    if (params.slug === "procurement") {
      throw redirect({ to: "/thread/procurement" });
    }
    if (params.slug === "contracting") {
      throw redirect({ to: "/thread/procurement" });
    }
  },
  component: ThreadRoutePage,
});

function ThreadRoutePage() {
  const { slug } = Route.useParams();

  if (slug === "security") {
    return <SecurityThreadPage />;
  }

  if (slug === "privacy") {
    return <PrivacyThreadPage />;
  }

  if (slug === "data-stewardship") {
    return <DataStewardshipThreadPage />;
  }

  if (slug === "accessibility") {
    return <AccessibilityThreadPage />;
  }

  if (slug === "user-research") {
    return <UserResearchThreadPage />;
  }

  if (slug === "ethics-and-bias") {
    return <EthicsAndBiasThreadPage />;
  }

  if (slug === "backlog") {
    return <BacklogThreadPage />;
  }

  if (slug === "joined-up-delivery") {
    return <JoinedUpDeliveryThreadPage />;
  }

  if (slug === "releasing-changes") {
    return <ReleasingChangesThreadPage />;
  }

  if (slug === "dependencies-and-standards") {
    return <DependenciesAndStandardsThreadPage />;
  }

  if (slug === "funding") {
    return <FundingThreadPage />;
  }

  const content = THREAD_CONTENT[slug as ThreadSlug];
  if (!content) throw notFound();

  return <CrossCuttingThreadPage content={content} />;
}
