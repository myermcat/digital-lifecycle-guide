import { proseWithMixedLinks } from "@/components/ProseWithExternalLinks";
import type { CreateSpineStage } from "@/lib/create-phase-content";
import { guideProse, guideProseTight, guideSectionTitle } from "@/lib/guide-typography";

function SpineStepNumber({ n }: { n: number }) {
  return (
    <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-primary/25 bg-background font-sans text-xs font-semibold text-primary">
      {n}
    </span>
  );
}

export function CreateSpineSection({
  id,
  title,
  intro,
  stages,
  stackedTitle = false,
}: {
  id: string;
  title: string;
  intro?: string;
  stages: readonly CreateSpineStage[];
  /** When true, step title sits on its own line above the body. */
  stackedTitle?: boolean;
}) {
  return (
    <section className="mt-10 md:mt-12 scroll-mt-24" id={id}>
      <h2 className={`${guideSectionTitle} mb-6`}>{title}</h2>
      {intro ? <p className={`${guideProse} mb-6`}>{intro}</p> : null}
      <ol className="relative list-none space-y-0 pl-0">
        {stages.map((stage, index) => (
          <li key={stage.title} className="relative flex gap-4 pb-8 last:pb-0">
            {index < stages.length - 1 ? (
              <span
                className="absolute left-4 top-8 bottom-0 w-px -translate-x-1/2 bg-primary/20"
                aria-hidden
              />
            ) : null}
            <SpineStepNumber n={index + 1} />
            <div className="min-w-0 flex-1 rounded-lg border border-border bg-card px-4 py-4 md:px-5 md:py-5">
              {stackedTitle ? (
                <>
                  <p className="font-semibold text-foreground/90">{stage.title}</p>
                  <p className={`${guideProseTight} mt-1`}>
                    {proseWithMixedLinks(stage.text, {
                      external: stage.externalLinks,
                      internal: stage.internalLinks,
                      placeholder: stage.placeholderLinks,
                      placeholderGcNetwork: stage.placeholderGcNetworkLinks,
                      bold: stage.bold,
                    })}
                  </p>
                </>
              ) : (
                <p className={guideProseTight}>
                  <span className="font-semibold text-foreground/90">{stage.title}</span>{" "}
                  {proseWithMixedLinks(stage.text, {
                    external: stage.externalLinks,
                    internal: stage.internalLinks,
                    placeholder: stage.placeholderLinks,
                    placeholderGcNetwork: stage.placeholderGcNetworkLinks,
                    bold: stage.bold,
                  })}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
