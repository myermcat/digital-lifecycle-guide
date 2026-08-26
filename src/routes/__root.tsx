import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  redirect,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { NotFoundPage } from "@/components/NotFoundPage";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import favicon from "@/assets/favicon.png?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SITE_DESCRIPTION, SITE_FULL_TITLE, SITE_NAME, SITE_ORIGIN } from "../lib/site-meta";
import { GITHUB_PAGES_SPA_RESTORE_SCRIPT } from "../lib/github-pages-spa-fallback";
import { THREADS } from "@/lib/guide-strings";
import { DESIGN_FOR_WHOLE_JOURNEY_LEGACY_PATH } from "@/lib/reference-paths";
import { UI } from "@/lib/ui-strings";
import { IS_FRENCH, otherLanguageHref } from "@/lib/language-switch";

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          {UI.thisPageDidnTLoad}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {UI.somethingWentWrongOnOurEndYouCanTryRef}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {UI.tryAgain}
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            {UI.goHome}
          </a>
        </div>
      </div>
    </div>
  );
}

/**
 * On the deployed site otherLanguageHref() returns a path under the base, which needs
 * an origin in front of it to be a URL. In dev the two languages are two servers, so
 * it returns a whole URL already -- that one is left alone.
 */
function absoluteUrl(href: string): string {
  return /^[a-z][a-z\d+.-]*:/i.test(href) ? href : `${SITE_ORIGIN}${href}`;
}

/** The path this build serves the guide at, "/" on a dev server. */
const BASE_PATH = import.meta.env.BASE_URL || "/";

/**
 * The absolute address of one page in both languages.
 *
 * A reader can cross between the two builds from the header, but a search engine
 * cannot infer that the English and French pages are the same page: it needs
 * <link rel="alternate" hreflang> in the head, on every page, pointing both ways.
 * otherLanguageHref() already knows where the other build keeps this page; this pairs
 * that with the address of the page you are on and makes both absolute.
 *
 * Everything comes from import.meta.env.BASE_URL and the matched pathname, both of
 * which hold the same value during the static prerender and in the browser. Reading
 * window.location here would put one set of links in the prerendered HTML -- the only
 * copy a crawler ever sees -- and a different set after hydration, which React
 * reports as a mismatch.
 *
 * Both builds produce the same pair, which is what makes the pair usable: the French
 * page names the same two URLs the English page does. On a dev server they are a
 * mixture -- the page you are on has no published address yet, so it is named at the
 * origin it will have, while the other language is named at its localhost port.
 */
function alternateLanguageUrls(pathname: string): { en: string; fr: string } {
  const here = absoluteUrl(`${BASE_PATH}${pathname.replace(/^\/+/, "")}`);
  const there = absoluteUrl(otherLanguageHref(pathname));
  return IS_FRENCH ? { en: there, fr: here } : { en: here, fr: there };
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  beforeLoad: ({ location }) => {
    if (location.pathname === DESIGN_FOR_WHOLE_JOURNEY_LEGACY_PATH) {
      throw redirect({ to: THREADS["joined-up-delivery"].path });
    }
  },
  /**
   * The head of every page, including the pair of hreflang links that tell a search
   * engine the English and French pages are one page in two languages.
   *
   * The pathname comes from the matches rather than from the router's location because
   * this function runs inside the match load, on the server and again on every client
   * navigation, and the last match is the page being rendered. It is the route path
   * without the base ("/create-alpha"), which is what otherLanguageHref() expects.
   */
  head: ({ matches }) => {
    const pathname = matches[matches.length - 1]?.pathname ?? "/";
    const alternate = alternateLanguageUrls(pathname);
    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: SITE_FULL_TITLE },
        { name: "description", content: SITE_DESCRIPTION },
        { property: "og:title", content: SITE_NAME },
        { property: "og:description", content: SITE_DESCRIPTION },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
      ],
      links: [
        {
          rel: "stylesheet",
          href: appCss,
        },
        {
          rel: "icon",
          href: favicon,
          type: "image/png",
        },
        {
          rel: "apple-touch-icon",
          href: favicon,
        },
        {
          rel: "alternate",
          hrefLang: "en",
          href: alternate.en,
        },
        {
          rel: "alternate",
          hrefLang: "fr",
          href: alternate.fr,
        },
        /* Whoever asks in a language the site does not have gets the English page. */
        {
          rel: "alternate",
          hrefLang: "x-default",
          href: alternate.en,
        },
      ],
    };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundPage,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang={IS_FRENCH ? "fr" : "en"}>
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: GITHUB_PAGES_SPA_RESTORE_SCRIPT }}
        />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
