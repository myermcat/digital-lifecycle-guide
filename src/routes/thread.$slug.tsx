import { createFileRoute, redirect, notFound } from "@tanstack/react-router";
import { CrossCuttingThreadPage } from "@/components/CrossCuttingThreadPage";
import { PrivacyThreadPage } from "@/components/PrivacyThreadPage";
import { SecurityThreadPage } from "@/components/SecurityThreadPage";
import { THREAD_CONTENT } from "@/lib/thread-content";
import type { ThreadSlug } from "@/lib/guide-strings";
import { PROCUREMENT_LANDING } from "@/lib/procurement-landing";
import { SECURITY_THREAD } from "@/lib/security-thread-content";
import { PRIVACY_THREAD } from "@/lib/privacy-thread-content";

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
          { name: "description", content: PRIVACY_THREAD.lead.text },
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

  const content = THREAD_CONTENT[slug as ThreadSlug];
  if (!content) throw notFound();

  return <CrossCuttingThreadPage content={content} />;
}
