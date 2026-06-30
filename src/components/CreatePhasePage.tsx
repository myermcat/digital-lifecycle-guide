import { CreateSpineSection } from "@/components/CreateSpineSection";
import { EditorialNote } from "@/components/EditorialNote";
import { GuideAssumptions } from "@/components/GuideAssumptions";
import { GuideLayout } from "@/components/GuideLayout";
import { PageFoot } from "@/components/PageFoot";
import { PhaseBreadcrumb } from "@/components/PhaseBreadcrumb";
import { PracticeCardGroup } from "@/components/PracticeCard";
import { WhereThisFits } from "@/components/WhereThisFits";
import { CREATE_PHASE } from "@/lib/create-phase-content";
import { PHASES } from "@/lib/guide-strings";
import {
  CREATE_SUBPHASES,
  LIFECYCLE_PHASE_META,
  SUBPHASE_META,
  whereThisFitsForCreateSubphase,
} from "@/lib/lifecycle-navigation";
import { renderThreadWhoseJob } from "@/lib/thread-rich-content";
import { guideProse, guideProseSpace, guideSectionTitle } from "@/lib/guide-typography";

const CREATE_SUBPHASE_CARDS = CREATE_SUBPHASES.map((subphase) => {
  const meta = SUBPHASE_META[subphase.slug as keyof typeof SUBPHASE_META];
  return {
    label: subphase.title,
    href: subphase.href,
    description: meta.subtitle.split(".")[0] + ".",
  };
});

export function CreatePhasePage() {
  const { stages, notEveryStage, whoseJob, workingThroughCreate, sources } = CREATE_PHASE;
  const meta = LIFECYCLE_PHASE_META.create;

  return (
    <GuideLayout id="create">
      <PhaseBreadcrumb
        lifecyclePhase={PHASES.create.title}
        lifecyclePhaseHref={PHASES.create.href}
      />

      <section className="mt-5 md:mt-6">
        <WhereThisFits {...whereThisFitsForCreateSubphase(null)} />
      </section>

      <section className={`${guideProseSpace} mt-8 md:mt-10`}>
        <p>{meta.subtitle}</p>
        {CREATE_PHASE.lead.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <CreateSpineSection id={stages.id} title={stages.title} stages={stages.items} />

      <EditorialNote className="mt-10 md:mt-12 scroll-mt-24" label="Not every service takes every stage">
        <p>{notEveryStage}</p>
      </EditorialNote>

      <section className="mt-10 md:mt-12 scroll-mt-24" id="who-runs-the-stages">
        <h2 className={`${guideSectionTitle} mb-3`}>Who runs the stages</h2>
        {renderThreadWhoseJob(whoseJob)}
      </section>

      <section
        className="mt-10 md:mt-12 scroll-mt-24"
        id={workingThroughCreate.id}
      >
        <h2 className={`${guideSectionTitle} mb-3`}>{workingThroughCreate.title}</h2>
        <p className={`${guideProse} mb-5`}>{workingThroughCreate.intro}</p>
        <PracticeCardGroup cards={CREATE_SUBPHASE_CARDS} />
      </section>

      <PageFoot sources={sources} />

      <GuideAssumptions className="mt-14 md:mt-16 max-w-xl" />

      <div className="h-24" />
    </GuideLayout>
  );
}
