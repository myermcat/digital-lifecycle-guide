import { UI } from "@/lib/ui-strings";
import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { SITE_NAME } from "@/lib/site-meta";
import { IS_FRENCH, otherLanguageHref } from "@/lib/language-switch";

/**
 * The French build has no assistant. The header does not offer it, so nothing on the
 * French site leads here, but a typed or shared URL still resolves through the SPA
 * fallback, and rendering the English assistant under a /fr/ address would be worse
 * than not having it: the reader would be answered in English without being told why.
 * Send them to the English one instead, which is the thing they were looking for.
 */
function SendToEnglishAssistant() {
  if (typeof window !== "undefined") {
    window.location.replace(otherLanguageHref("/assistant"));
  }
  return null;
}

/**
 * The assistant route.
 *
 * lazyRouteComponent keeps the page and its corpus loader out of the main bundle, so
 * a reader who never opens the assistant downloads none of it and the guide's own
 * pages are unchanged. The corpus itself (about 176 KB gzipped) is fetched only when
 * this page mounts.
 */
export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: `Ask the guide — ${SITE_NAME}` },
      {
        name: "description",
        content:
          UI.assistantMetaDescription,
      },
    ],
  }),
  component: IS_FRENCH
    ? SendToEnglishAssistant
    : lazyRouteComponent(
        () => import("@/components/AssistantPage"),
        "AssistantPage",
      ),
});
