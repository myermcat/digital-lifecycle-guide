import { AnimalIllustrationPanel } from "@/components/AnimalIllustrationPanel";
import { GuideLayout } from "@/components/GuideLayout";
import { guideProse, guideProseSpace } from "@/lib/guide-typography";

export function SourceComingSoonPage({
  source,
  part,
}: {
  source: string;
  part?: string;
}) {
  const displayName = source.trim() || "This source";

  return (
    <GuideLayout bare>
      <AnimalIllustrationPanel animal="fox">
        <header className="mb-6 md:mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-foreground leading-[1.1]">
            This source is on its way
          </h1>
          <div className="mx-auto md:mx-0 mt-5 h-px w-16 bg-border" />
        </header>

        <section className={guideProseSpace}>
          <p className={guideProse}>
            <span className="font-semibold text-foreground/90">{displayName}</span> is still being
            written. We&apos;ll add the link the moment it goes live.
          </p>
          {part ? (
            <p className="font-sans text-sm text-muted-foreground">
              Section: <span className="text-foreground/75">{part}</span>
            </p>
          ) : null}
        </section>
      </AnimalIllustrationPanel>
    </GuideLayout>
  );
}
