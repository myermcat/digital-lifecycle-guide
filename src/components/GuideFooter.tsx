import { Link } from "@tanstack/react-router";
import { ALL_PAGES_PATH } from "@/lib/all-pages-path";
import { REGIONS } from "@/lib/guide-strings";

/**
 * Site footer — Government of Canada–inflected, calm to match the guide.
 * Columns of links sit above a dark band carrying the Canada wordmark.
 * "All pages" is included as the index entry under Reference.
 */
export function GuideFooter() {
  const year = new Date().getFullYear();
  const regions = [REGIONS.create, REGIONS.live, REGIONS.sunset];

  return (
    <footer className="mt-20 md:mt-28 w-full">
      {/* Thin accent rule — subtle nod to GoC red */}
      <div
        aria-hidden="true"
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--gc-red) 20%, var(--gc-red) 80%, transparent)",
          opacity: 0.45,
        }}
      />

      {/* Upper band — soft cream, structured link columns */}
      <div className="bg-secondary/40 border-t border-border/60">
        <div className="mx-auto max-w-2xl px-6 py-10 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
            <FooterColumn title="The guide">
              <FooterLink to="/">Home</FooterLink>
              <FooterLink to={ALL_PAGES_PATH}>All pages</FooterLink>
            </FooterColumn>

            <FooterColumn title="Regions">
              {regions.map((r) => (
                <FooterLink key={r.id} to={r.href}>
                  {r.title}
                </FooterLink>
              ))}
            </FooterColumn>

            <FooterColumn title="About">
              <p className="text-xs leading-relaxed text-muted-foreground">
                A practitioner's guide to the digital service lifecycle in the
                Government of Canada.
              </p>
            </FooterColumn>
          </div>
        </div>
      </div>

      {/* Lower band — dark, with Canada wordmark */}
      <div
        className="border-t"
        style={{
          backgroundColor: "var(--gc-footer-bg)",
          color: "var(--gc-footer-fg)",
          borderColor: "var(--gc-footer-border)",
        }}
      >
        <div className="mx-auto max-w-2xl px-6 py-6 flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-4">
          <p
            className="text-[11px] tracking-wide"
            style={{ color: "var(--gc-footer-muted)" }}
          >
            © {year} · An independent guide. Not an official Government of
            Canada publication.
          </p>
          <CanadaWordmark />
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-[10px] font-semibold uppercase tracking-[0.14em] text-foreground/70 mb-3">
        {title}
      </h2>
      <ul className="space-y-2">
        {Array.isArray(children)
          ? children
          : // allow a single child (e.g. <p>) without forcing it into a list
            null}
        {!Array.isArray(children) ? <li>{children}</li> : null}
      </ul>
    </div>
  );
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        to={to}
        className="text-sm text-foreground/75 hover:text-foreground transition-colors"
      >
        {children}
      </Link>
    </li>
  );
}

/** Stylized "Canada" wordmark — red flag square over the final 'a'. */
function CanadaWordmark() {
  return (
    <div
      className="relative inline-flex select-none"
      aria-label="Canada"
      role="img"
    >
      <span
        className="font-serif text-2xl leading-none tracking-tight"
        style={{ color: "var(--gc-footer-fg)" }}
      >
        Canada
      </span>
      {/* Red flag square sits over the bowl of the final 'a' */}
      <span
        aria-hidden="true"
        className="absolute -top-1.5 right-[0.1em] inline-block h-[0.55em] w-[0.65em]"
        style={{ backgroundColor: "var(--gc-red)" }}
      />
    </div>
  );
}
