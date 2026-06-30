import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

import { PAGE_INDEX } from "../src/lib/page-index";
import { PROCUREMENT_STRINGS } from "../src/lib/procurement-strings";
import { PROCUREMENT_SUBPAGES } from "../src/lib/contracting-subpages";
import { SOO_VS_SOW } from "../src/lib/soo-vs-sow-content";
import { MANAGING_WHAT_YOU_BOUGHT } from "../src/lib/managing-what-you-bought-content";
import { OPTIONS_ANALYSIS } from "../src/lib/options-analysis-content";
import { GOOD_CONTRACT, goodContractSimplificationNoteText } from "../src/lib/good-contract-content";
import { DESIGN_FOR_WHOLE_JOURNEY } from "../src/lib/design-for-whole-journey-content";
import { CREATE_PHASE, createPhaseLeadPlainText, createSpinePlainText } from "../src/lib/create-phase-content";
import { PHASES } from "../src/lib/guide-strings";
import {
  DESIGN_FOR_WHOLE_JOURNEY_PATH,
  GOOD_CONTRACT_PATH,
  MANAGING_WHAT_YOU_BOUGHT_PATH,
  OPTIONS_ANALYSIS_PATH,
  SOO_VS_SOW_PATH,
} from "../src/lib/reference-paths";
import { SECURITY_THREAD } from "../src/lib/security-thread-content";
import { PRIVACY_THREAD, privacySectionsPlainText } from "../src/lib/privacy-thread-content";
import {
  DATA_STEWARDSHIP_THREAD,
  dataStewardshipSectionsPlainText,
} from "../src/lib/data-stewardship-thread-content";
import {
  ACCESSIBILITY_THREAD,
  accessibilitySectionsPlainText,
} from "../src/lib/accessibility-thread-content";
import {
  USER_RESEARCH_THREAD,
  userResearchSectionsPlainText,
} from "../src/lib/user-research-thread-content";
import {
  ETHICS_AND_BIAS_THREAD,
  ethicsAndBiasSectionsPlainText,
} from "../src/lib/ethics-and-bias-thread-content";
import {
  BACKLOG_THREAD,
  backlogSectionsPlainText,
} from "../src/lib/backlog-thread-content";
import {
  JOINED_UP_DELIVERY_THREAD,
  joinedUpDeliverySectionsPlainText,
} from "../src/lib/joined-up-delivery-thread-content";
import {
  RELEASING_CHANGES_THREAD,
  releasingChangesSectionsPlainText,
} from "../src/lib/releasing-changes-thread-content";
import {
  DEPENDENCIES_AND_STANDARDS_THREAD,
  dependenciesAndStandardsSectionsPlainText,
} from "../src/lib/dependencies-and-standards-thread-content";
import {
  FUNDING_THREAD,
  FUNDING_DETAIL_CARDS,
  fundingLeadPlainText,
  fundingWhoseJobPlainText,
} from "../src/lib/funding-thread-content";
import {
  TREASURY_BOARD_SUBMISSION,
  treasuryBoardSubmissionLeadPlainText,
  treasuryBoardSubmissionSectionsPlainText,
  treasuryBoardSubmissionWhoseJobPlainText,
} from "../src/lib/treasury-board-submission-content";
import { COSTING_A_SERVICE } from "../src/lib/costing-a-service-content";
import { STAYING_FUNDED } from "../src/lib/staying-funded-content";
import { FUNDING_THE_EXIT } from "../src/lib/funding-the-exit-content";
import {
  COSTING_A_SERVICE_PATH,
  FUNDING_THE_EXIT_PATH,
  STAYING_FUNDED_PATH,
  TREASURY_BOARD_SUBMISSION_PATH,
} from "../src/lib/reference-paths";
import {
  threadLeadPlainText,
  threadSectionsPlainText,
  threadWhoseJobPlainText,
} from "../src/lib/thread-rich-content";
import { SUPPORT_PAGE } from "../src/lib/support-content";
import { SUPPORT_PATH } from "../src/lib/support-path";
import { THREADS } from "../src/lib/guide-strings";

type SearchIndexRecord = {
  id: string;
  pageTitle: string;
  pagePath: string;
  sectionId: string;
  sectionHeading: string;
  lifecyclePhase: string;
  text: string;
  keywords?: string;
};

function inferLifecyclePhase(path: string) {
  if (path.startsWith("/create")) return "create";
  if (path.startsWith("/live")) return "live";
  if (path.startsWith("/sunset")) return "sunset";
  if (path.startsWith("/thread/")) return "thread";
  if (path.startsWith("/reference/")) return "reference";
  return "other";
}

function collapseWhitespace(text: string) {
  return String(text ?? "").replace(/\s+/g, " ").trim();
}

function concat(...parts: Array<string | undefined>) {
  return collapseWhitespace(parts.filter(Boolean).join("\n"));
}

function recordId({ pagePath, sectionId }: { pagePath: string; sectionId: string }) {
  return sectionId ? `${pagePath}#${sectionId}` : pagePath;
}

const records: SearchIndexRecord[] = [];

// Base: every page title is searchable (even if it has no sections).
for (const page of PAGE_INDEX) {
  records.push({
    id: recordId({ pagePath: page.path, sectionId: "" }),
    pageTitle: page.title,
    pagePath: page.path,
    sectionId: "",
    sectionHeading: page.title,
    lifecyclePhase: inferLifecyclePhase(page.path),
    text: "",
  });
}

// Procurement landing — section-level records with known anchors.
{
  const pageTitle = PROCUREMENT_STRINGS.title;
  const pagePath = "/thread/procurement";

  const landingSections: Array<{
    sectionId: string;
    sectionHeading: string;
    text: string;
  }> = [
    {
      sectionId: "what-work-stays-yours",
      sectionHeading: PROCUREMENT_STRINGS.whatWorkStaysYours.heading,
      text: concat(
        PROCUREMENT_STRINGS.whatWorkStaysYours.intro,
        ...PROCUREMENT_STRINGS.whatWorkStaysYours.items.map((i) => `${i.lead} ${i.body}`),
        PROCUREMENT_STRINGS.whatWorkStaysYours.close,
      ),
    },
    {
      sectionId: "how-a-procurement-goes",
      sectionHeading: "How a procurement goes",
      text: concat(
        PROCUREMENT_STRINGS.journey.intro,
        ...PROCUREMENT_STRINGS.journey.steps.map((s) => `${s.title} ${s.leadIn} ${s.body}`),
      ),
    },
    {
      sectionId: "traditional-vs-agile",
      sectionHeading: "Traditional vs agile",
      text: concat(
        ...PROCUREMENT_STRINGS.comparison.rows.map(
          (r) => `${r.topic}. Traditional: ${r.traditional}. Agile: ${r.agile}.`,
        ),
        PROCUREMENT_STRINGS.comparison.caption,
      ),
    },
    {
      sectionId: "case-study",
      sectionHeading: PROCUREMENT_STRINGS.caseStudy.title,
      text: concat(
        PROCUREMENT_STRINGS.caseStudy.risky.heading,
        PROCUREMENT_STRINGS.caseStudy.risky.framing,
        ...PROCUREMENT_STRINGS.caseStudy.risky.good.map((t) => `${t.lead} ${t.body}`),
        ...PROCUREMENT_STRINGS.caseStudy.risky.bad.map((t) => `${t.lead} ${t.body}`),
        PROCUREMENT_STRINGS.caseStudy.safer.heading,
        PROCUREMENT_STRINGS.caseStudy.safer.framing,
        ...PROCUREMENT_STRINGS.caseStudy.safer.good.map((t) => `${t.lead} ${t.body}`),
        ...PROCUREMENT_STRINGS.caseStudy.safer.bad.map((t) => `${t.lead} ${t.body}`),
      ),
    },
    {
      sectionId: "what-good-looks-like",
      sectionHeading: "What good looks like",
      text: PROCUREMENT_STRINGS.goodLooksIntro,
    },
    {
      sectionId: "good-contract",
      sectionHeading: PROCUREMENT_STRINGS.goodContractCallout.title,
      text: concat(
        PROCUREMENT_STRINGS.goodContractCallout.label,
        ...PROCUREMENT_STRINGS.goodContractCallout.paragraphs,
        PROCUREMENT_STRINGS.goodContractCallout.linkLabel,
      ),
    },
    {
      sectionId: "why-it-matters",
      sectionHeading: "Why it matters",
      text: concat(...PROCUREMENT_STRINGS.whyItMatters),
    },
    {
      sectionId: "whose-job",
      sectionHeading: "Whose job it is",
      text: PROCUREMENT_STRINGS.whoseJob.text,
    },
    {
      sectionId: "by-phase",
      sectionHeading: PROCUREMENT_STRINGS.byPhase.title,
      text: concat(
        PROCUREMENT_STRINGS.byPhase.intro,
        ...PROCUREMENT_STRINGS.byPhase.blocks.map((block) =>
          Array.isArray(block.popup)
            ? block.popup.map((section) => ("text" in section ? section.text : "")).join(" ")
            : block.popup.text,
        ),
      ),
    },
    {
      sectionId: "further-reading",
      sectionHeading: "Further reading",
      text: PROCUREMENT_STRINGS.furtherReading.text,
    },
    { sectionId: "sources", sectionHeading: "Sources", text: "Sources and references." },
  ];

  for (const section of landingSections) {
    records.push({
      id: recordId({ pagePath, sectionId: section.sectionId }),
      pageTitle,
      pagePath,
      sectionId: section.sectionId,
      sectionHeading: section.sectionHeading,
      lifecyclePhase: inferLifecyclePhase(pagePath),
      text: section.text,
    });
  }
}

// Procurement subpages — index each section.
for (const slug of Object.keys(PROCUREMENT_SUBPAGES) as Array<keyof typeof PROCUREMENT_SUBPAGES>) {
  const page = PROCUREMENT_SUBPAGES[slug];
  if (!page || page.stub) continue;

  const pageTitle = page.title;
  const pagePath = `/thread/procurement/${slug}`;

  for (const section of page.sections) {
    const bulletText = (section.bullets ?? [])
      .map((b) => concat(b.lead, b.body, ...(b.bodyLines ?? [])))
      .join("\n");

    records.push({
      id: recordId({ pagePath, sectionId: section.id }),
      pageTitle,
      pagePath,
      sectionId: section.id,
      sectionHeading: section.title,
      lifecyclePhase: inferLifecyclePhase(pagePath),
      text: concat(
        ...(section.paragraphs ?? []),
        bulletText,
        ...(section.paragraphsAfterBullets ?? []),
        ...(section.paragraphsAfterNote ?? []),
        section.contentTodo
          ? concat(
              section.contentTodo.title,
              ...(section.contentTodo.items ?? []),
              section.contentTodo.note,
            )
          : "",
      ),
    });
  }
}

// Reference: SOO vs SOW
{
  const pageTitle = SOO_VS_SOW.title;
  const pagePath = SOO_VS_SOW_PATH;

  records.push({
    id: recordId({ pagePath, sectionId: SOO_VS_SOW.whatEachOneIs.id }),
    pageTitle,
    pagePath,
    sectionId: SOO_VS_SOW.whatEachOneIs.id,
    sectionHeading: SOO_VS_SOW.whatEachOneIs.title,
    lifecyclePhase: inferLifecyclePhase(pagePath),
    text: concat(SOO_VS_SOW.opening, SOO_VS_SOW.whatEachOneIs.body),
  });

  records.push({
    id: recordId({ pagePath, sectionId: SOO_VS_SOW.workTogether.id }),
    pageTitle,
    pagePath,
    sectionId: SOO_VS_SOW.workTogether.id,
    sectionHeading: SOO_VS_SOW.workTogether.title,
    lifecyclePhase: inferLifecyclePhase(pagePath),
    text: SOO_VS_SOW.workTogether.body,
  });

  records.push({
    id: recordId({ pagePath, sectionId: SOO_VS_SOW.workedExample.id }),
    pageTitle,
    pagePath,
    sectionId: SOO_VS_SOW.workedExample.id,
    sectionHeading: SOO_VS_SOW.workedExample.title,
    lifecyclePhase: inferLifecyclePhase(pagePath),
    text: concat(...SOO_VS_SOW.workedExample.paragraphs),
  });
}

// Reference: Managing what you bought
{
  const pageTitle = MANAGING_WHAT_YOU_BOUGHT.title;
  const pagePath = MANAGING_WHAT_YOU_BOUGHT_PATH;

  for (const section of MANAGING_WHAT_YOU_BOUGHT.sections) {
    records.push({
      id: recordId({ pagePath, sectionId: section.id }),
      pageTitle,
      pagePath,
      sectionId: section.id,
      sectionHeading: section.title,
      lifecyclePhase: inferLifecyclePhase(pagePath),
      text: concat(...section.paragraphs),
    });
  }
}

// Reference: Options analysis
{
  const pageTitle = OPTIONS_ANALYSIS.title;
  const pagePath = OPTIONS_ANALYSIS_PATH;

  records.push({
    id: recordId({ pagePath, sectionId: "" }),
    pageTitle,
    pagePath,
    sectionId: "",
    sectionHeading: pageTitle,
    lifecyclePhase: inferLifecyclePhase(pagePath),
    text: concat(...OPTIONS_ANALYSIS.intro),
  });

  const sections = [
    {
      sectionId: OPTIONS_ANALYSIS.startWithProblem.id,
      sectionHeading: OPTIONS_ANALYSIS.startWithProblem.title,
      text: concat(...OPTIONS_ANALYSIS.startWithProblem.paragraphs),
    },
    {
      sectionId: OPTIONS_ANALYSIS.fieldOfOptions.id,
      sectionHeading: OPTIONS_ANALYSIS.fieldOfOptions.title,
      text: concat(
        OPTIONS_ANALYSIS.fieldOfOptions.intro,
        ...OPTIONS_ANALYSIS.fieldOfOptions.ladder.map((r) => `${r.lead} ${r.body}`),
      ),
    },
    {
      sectionId: OPTIONS_ANALYSIS.howToWeigh.id,
      sectionHeading: OPTIONS_ANALYSIS.howToWeigh.title,
      text: concat(
        OPTIONS_ANALYSIS.howToWeigh.intro,
        ...OPTIONS_ANALYSIS.howToWeigh.criteria.map((c) => `${c.lead} ${c.body}`),
        OPTIONS_ANALYSIS.howToWeighClosing,
      ),
    },
    {
      sectionId: OPTIONS_ANALYSIS.homework.id,
      sectionHeading: OPTIONS_ANALYSIS.homework.title,
      text: concat(
        ...OPTIONS_ANALYSIS.homework.paragraphs.map((paragraph) =>
          typeof paragraph === "string" ? paragraph : paragraph.text,
        ),
      ),
    },
    {
      sectionId: OPTIONS_ANALYSIS.byPhase.id,
      sectionHeading: OPTIONS_ANALYSIS.byPhase.title,
      text: concat(
        ...OPTIONS_ANALYSIS.byPhase.cards.map((c) => c.body),
      ),
    },
    {
      sectionId: OPTIONS_ANALYSIS.whyThisMatters.id,
      sectionHeading: OPTIONS_ANALYSIS.whyThisMatters.title,
      text: OPTIONS_ANALYSIS.whyThisMatters.body,
    },
    { sectionId: "sources", sectionHeading: "Sources", text: "Sources and references." },
  ];

  for (const section of sections) {
    records.push({
      id: recordId({ pagePath, sectionId: section.sectionId }),
      pageTitle,
      pagePath,
      sectionId: section.sectionId,
      sectionHeading: section.sectionHeading,
      lifecyclePhase: inferLifecyclePhase(pagePath),
      text: section.text,
    });
  }
}

// Reference: What a good contract looks like
{
  const pageTitle = GOOD_CONTRACT.title;
  const pagePath = GOOD_CONTRACT_PATH;

  records.push({
    id: recordId({ pagePath, sectionId: "" }),
    pageTitle,
    pagePath,
    sectionId: "",
    sectionHeading: pageTitle,
    lifecyclePhase: inferLifecyclePhase(pagePath),
    text: concat(...GOOD_CONTRACT.lead.map((paragraph) => paragraph.text), GOOD_CONTRACT.exampleNote),
  });

  const sections = [
    {
      sectionId: "how-to-read",
      sectionHeading: "How to read this contract",
      text: concat(
        ...GOOD_CONTRACT.howToRead.intro.map((paragraph) => paragraph.text),
        goodContractSimplificationNoteText(GOOD_CONTRACT.simplificationNote),
      ),
    },
    {
      sectionId: "the-contract",
      sectionHeading: "The contract",
      text: concat(
        GOOD_CONTRACT.contractTitle,
        GOOD_CONTRACT.parties,
        ...GOOD_CONTRACT.articles.map((article) => `${article.title} ${article.text}`),
        GOOD_CONTRACT.schedulesClosing,
      ),
    },
    {
      sectionId: "the-schedules",
      sectionHeading: "The schedules",
      text: concat(
        ...GOOD_CONTRACT.schedules.map((schedule) =>
          concat(
            schedule.heading,
            schedule.purpose,
            ...schedule.clauses.map((clause) => `${clause.label} ${clause.text}`),
            schedule.whyHere.text,
          ),
        ),
      ),
    },
    { sectionId: "sources", sectionHeading: "Sources", text: "Sources and references." },
  ];

  for (const section of sections) {
    records.push({
      id: recordId({ pagePath, sectionId: section.sectionId }),
      pageTitle,
      pagePath,
      sectionId: section.sectionId,
      sectionHeading: section.sectionHeading,
      lifecyclePhase: inferLifecyclePhase(pagePath),
      text: section.text,
    });
  }
}

// Design for the whole journey — section-level records.
{
  const pageTitle = DESIGN_FOR_WHOLE_JOURNEY.title;
  const pagePath = DESIGN_FOR_WHOLE_JOURNEY_PATH;

  records.push({
    id: recordId({ pagePath, sectionId: "" }),
    pageTitle,
    pagePath,
    sectionId: "",
    sectionHeading: pageTitle,
    lifecyclePhase: inferLifecyclePhase(pagePath),
    text: concat(...DESIGN_FOR_WHOLE_JOURNEY.mostPeopleDoNotWant.paragraphs),
  });

  const sections = [
    {
      sectionId: DESIGN_FOR_WHOLE_JOURNEY.mostPeopleDoNotWant.id,
      sectionHeading: DESIGN_FOR_WHOLE_JOURNEY.mostPeopleDoNotWant.title,
      text: concat(...DESIGN_FOR_WHOLE_JOURNEY.mostPeopleDoNotWant.paragraphs),
    },
    {
      sectionId: DESIGN_FOR_WHOLE_JOURNEY.seeingTheBiggerPicture.id,
      sectionHeading: DESIGN_FOR_WHOLE_JOURNEY.seeingTheBiggerPicture.title,
      text: concat(...DESIGN_FOR_WHOLE_JOURNEY.seeingTheBiggerPicture.paragraphs),
    },
    {
      sectionId: DESIGN_FOR_WHOLE_JOURNEY.buildingALifeInCanada.id,
      sectionHeading: DESIGN_FOR_WHOLE_JOURNEY.buildingALifeInCanada.title,
      text: concat(
        DESIGN_FOR_WHOLE_JOURNEY.buildingALifeInCanada.intro,
        DESIGN_FOR_WHOLE_JOURNEY.buildingALifeInCanada.amaraJourney,
        ...DESIGN_FOR_WHOLE_JOURNEY.buildingALifeInCanada.afterVisual,
      ),
    },
    {
      sectionId: DESIGN_FOR_WHOLE_JOURNEY.yourServiceIsOneBox.id,
      sectionHeading: DESIGN_FOR_WHOLE_JOURNEY.yourServiceIsOneBox.title,
      text: concat(...DESIGN_FOR_WHOLE_JOURNEY.yourServiceIsOneBox.paragraphs),
    },
    {
      sectionId: DESIGN_FOR_WHOLE_JOURNEY.whereToGoNext.id,
      sectionHeading: DESIGN_FOR_WHOLE_JOURNEY.whereToGoNext.title,
      text: concat(
        ...DESIGN_FOR_WHOLE_JOURNEY.whereToGoNext.cards.map((c) => `${c.title} ${c.body}`),
      ),
    },
    { sectionId: "sources", sectionHeading: "Sources", text: "Sources and references." },
  ];

  for (const section of sections) {
    records.push({
      id: recordId({ pagePath, sectionId: section.sectionId }),
      pageTitle,
      pagePath,
      sectionId: section.sectionId,
      sectionHeading: section.sectionHeading,
      lifecyclePhase: inferLifecyclePhase(pagePath),
      text: section.text,
    });
  }
}

// Create phase — section-level records.
{
  const pageTitle = CREATE_PHASE.title;
  const pagePath = PHASES.create.href;

  records.push({
    id: recordId({ pagePath, sectionId: "" }),
    pageTitle,
    pagePath,
    sectionId: "",
    sectionHeading: pageTitle,
    lifecyclePhase: inferLifecyclePhase(pagePath),
    text: createPhaseLeadPlainText,
  });

  const sections = [
    {
      sectionId: CREATE_PHASE.stages.id,
      sectionHeading: CREATE_PHASE.stages.title,
      text: createSpinePlainText(CREATE_PHASE.stages.items),
    },
    {
      sectionId: "not-every-stage",
      sectionHeading: "Not every service takes every stage",
      text: CREATE_PHASE.notEveryStage,
    },
    {
      sectionId: "who-runs-the-stages",
      sectionHeading: "Who runs the stages",
      text: CREATE_PHASE.whoseJob.roles
        .map((role) => `${role.role} ${role.text}`)
        .join(" "),
    },
    {
      sectionId: CREATE_PHASE.workingThroughCreate.id,
      sectionHeading: CREATE_PHASE.workingThroughCreate.title,
      text: CREATE_PHASE.workingThroughCreate.intro,
    },
    { sectionId: "sources", sectionHeading: "Sources", text: "Sources and references." },
  ];

  for (const section of sections) {
    records.push({
      id: recordId({ pagePath, sectionId: section.sectionId }),
      pageTitle,
      pagePath,
      sectionId: section.sectionId,
      sectionHeading: section.sectionHeading,
      lifecyclePhase: inferLifecyclePhase(pagePath),
      text: section.text,
    });
  }
}

// Security thread — section-level records.
{
  const pageTitle = SECURITY_THREAD.title;
  const pagePath = THREADS.security.path;

  const securityKeywords = "cybersecurity";

  records.push({
    id: recordId({ pagePath, sectionId: "" }),
    pageTitle,
    pagePath,
    sectionId: "",
    sectionHeading: pageTitle,
    lifecyclePhase: inferLifecyclePhase(pagePath),
    text: SECURITY_THREAD.lead,
    keywords: securityKeywords,
  });

  const sections = [
    {
      sectionId: "the-security-lifecycle",
      sectionHeading: "The security lifecycle",
      text: concat(
        SECURITY_THREAD.securityLifecycle.framing.text,
        ...SECURITY_THREAD.securityLifecycle.tiles.map(
          (tile) => `${tile.label} ${tile.gloss}`,
        ),
      ),
    },
    {
      sectionId: "what-good-looks-like",
      sectionHeading: "What good looks like",
      text: concat(...SECURITY_THREAD.whatGoodLooksLike.map((item) => item.text)),
    },
    {
      sectionId: "why-it-matters",
      sectionHeading: "Why it matters",
      text: SECURITY_THREAD.whyItMatters.text,
    },
    {
      sectionId: "whose-job",
      sectionHeading: "Whose job it is",
      text: threadWhoseJobPlainText(SECURITY_THREAD.whoseJob),
    },
    {
      sectionId: SECURITY_THREAD.closerLook.id,
      sectionHeading: SECURITY_THREAD.closerLook.title,
      text: concat(
        ...SECURITY_THREAD.closerLook.blocks.map((block) =>
          concat(
            block.title,
            block.text ?? "",
            ...(block.sections ? [threadSectionsPlainText(block.sections)] : []),
          ),
        ),
      ),
    },
    {
      sectionId: SECURITY_THREAD.twoWaysComparison.id,
      sectionHeading: SECURITY_THREAD.twoWaysComparison.title,
      text: concat(
        SECURITY_THREAD.twoWaysComparison.risky.framing ?? "",
        ...(SECURITY_THREAD.twoWaysComparison.risky.items ?? []),
        SECURITY_THREAD.twoWaysComparison.risky.closing ?? "",
        SECURITY_THREAD.twoWaysComparison.safe.framing ?? "",
        ...(SECURITY_THREAD.twoWaysComparison.safe.items ?? []),
        SECURITY_THREAD.twoWaysComparison.safe.closing ?? "",
      ),
    },
    {
      sectionId: SECURITY_THREAD.byPhase.id,
      sectionHeading: SECURITY_THREAD.byPhase.title,
      text: concat(
        SECURITY_THREAD.byPhase.intro,
        ...SECURITY_THREAD.byPhase.blocks.map((block) =>
          `${block.title} ${block.preview} ${
            Array.isArray(block.popup)
              ? threadSectionsPlainText(block.popup)
              : block.popup.text
          }`,
        ),
      ),
    },
    {
      sectionId: "further-reading",
      sectionHeading: "Further reading",
      text: SECURITY_THREAD.furtherReading.text,
    },
    { sectionId: "sources", sectionHeading: "Sources", text: "Sources and references." },
  ];

  for (const section of sections) {
    records.push({
      id: recordId({ pagePath, sectionId: section.sectionId }),
      pageTitle,
      pagePath,
      sectionId: section.sectionId,
      sectionHeading: section.sectionHeading,
      lifecyclePhase: inferLifecyclePhase(pagePath),
      text: section.text,
      keywords: securityKeywords,
    });
  }
}

// Privacy thread — section-level records.
{
  const pageTitle = PRIVACY_THREAD.title;
  const pagePath = THREADS.privacy.path;

  const privacyKeywords = "PIA privacy impact assessment";

  records.push({
    id: recordId({ pagePath, sectionId: "" }),
    pageTitle,
    pagePath,
    sectionId: "",
    sectionHeading: pageTitle,
    lifecyclePhase: inferLifecyclePhase(pagePath),
    text: threadLeadPlainText(PRIVACY_THREAD.lead),
    keywords: privacyKeywords,
  });

  const sections = [
    {
      sectionId: "what-good-looks-like",
      sectionHeading: "What good looks like",
      text: concat(...PRIVACY_THREAD.whatGoodLooksLike.map((item) => item.text)),
    },
    {
      sectionId: "why-it-matters",
      sectionHeading: "Why it matters",
      text: PRIVACY_THREAD.whyItMatters.text,
    },
    {
      sectionId: "whose-job",
      sectionHeading: "Whose job it is",
      text: threadWhoseJobPlainText(PRIVACY_THREAD.whoseJob),
    },
    {
      sectionId: PRIVACY_THREAD.closerLook.id,
      sectionHeading: PRIVACY_THREAD.closerLook.title,
      text: concat(
        ...PRIVACY_THREAD.closerLook.blocks.map((block) =>
          concat(
            block.title,
            privacySectionsPlainText(block.sections),
          ),
        ),
      ),
    },
    {
      sectionId: PRIVACY_THREAD.byPhase.id,
      sectionHeading: PRIVACY_THREAD.byPhase.title,
      text: concat(
        PRIVACY_THREAD.byPhase.intro,
        ...PRIVACY_THREAD.byPhase.blocks.map(
          (block) =>
            `${block.title} ${block.preview} ${privacySectionsPlainText(block.popup)}`,
        ),
      ),
    },
    {
      sectionId: "further-reading",
      sectionHeading: "Further reading",
      text: PRIVACY_THREAD.furtherReading.text,
    },
    { sectionId: "sources", sectionHeading: "Sources", text: "Sources and references." },
  ];

  for (const section of sections) {
    records.push({
      id: recordId({ pagePath, sectionId: section.sectionId }),
      pageTitle,
      pagePath,
      sectionId: section.sectionId,
      sectionHeading: section.sectionHeading,
      lifecyclePhase: inferLifecyclePhase(pagePath),
      text: section.text,
      keywords: privacyKeywords,
    });
  }
}

// Data stewardship thread — section-level records.
{
  const pageTitle = DATA_STEWARDSHIP_THREAD.title;
  const pagePath = THREADS["data-stewardship"].path;

  const dataKeywords = "retention disposition data quality";

  records.push({
    id: recordId({ pagePath, sectionId: "" }),
    pageTitle,
    pagePath,
    sectionId: "",
    sectionHeading: pageTitle,
    lifecyclePhase: inferLifecyclePhase(pagePath),
    text: threadLeadPlainText(DATA_STEWARDSHIP_THREAD.lead),
    keywords: dataKeywords,
  });

  const sections = [
    {
      sectionId: "what-good-looks-like",
      sectionHeading: "What good looks like",
      text: concat(
        ...DATA_STEWARDSHIP_THREAD.whatGoodLooksLike.map((item) => item.text),
        DATA_STEWARDSHIP_THREAD.retentionQuestionCallout.title,
        DATA_STEWARDSHIP_THREAD.retentionQuestionCallout.body.text,
      ),
    },
    {
      sectionId: "why-it-matters",
      sectionHeading: "Why it matters",
      text: DATA_STEWARDSHIP_THREAD.whyItMatters.text,
    },
    {
      sectionId: "whose-job",
      sectionHeading: "Whose job it is",
      text: threadWhoseJobPlainText(DATA_STEWARDSHIP_THREAD.whoseJob),
    },
    {
      sectionId: DATA_STEWARDSHIP_THREAD.closerLook.id,
      sectionHeading: DATA_STEWARDSHIP_THREAD.closerLook.title,
      text: concat(
        ...DATA_STEWARDSHIP_THREAD.closerLook.blocks.map((block) =>
          concat(block.title, dataStewardshipSectionsPlainText(block.sections)),
        ),
      ),
    },
    {
      sectionId: DATA_STEWARDSHIP_THREAD.byPhase.id,
      sectionHeading: DATA_STEWARDSHIP_THREAD.byPhase.title,
      text: concat(
        DATA_STEWARDSHIP_THREAD.byPhase.intro,
        ...DATA_STEWARDSHIP_THREAD.byPhase.blocks.map(
          (block) =>
            `${block.title} ${block.preview} ${dataStewardshipSectionsPlainText(block.popup)}`,
        ),
      ),
    },
    {
      sectionId: "further-reading",
      sectionHeading: "Further reading",
      text: DATA_STEWARDSHIP_THREAD.furtherReading.text,
    },
    { sectionId: "sources", sectionHeading: "Sources", text: "Sources and references." },
  ];

  for (const section of sections) {
    records.push({
      id: recordId({ pagePath, sectionId: section.sectionId }),
      pageTitle,
      pagePath,
      sectionId: section.sectionId,
      sectionHeading: section.sectionHeading,
      lifecyclePhase: inferLifecyclePhase(pagePath),
      text: section.text,
      keywords: dataKeywords,
    });
  }
}

// Accessibility thread — section-level records.
{
  const pageTitle = ACCESSIBILITY_THREAD.title;
  const pagePath = THREADS.accessibility.path;

  const accessibilityKeywords = "WCAG EN 301 549 Accessible Canada Act";

  records.push({
    id: recordId({ pagePath, sectionId: "" }),
    pageTitle,
    pagePath,
    sectionId: "",
    sectionHeading: pageTitle,
    lifecyclePhase: inferLifecyclePhase(pagePath),
    text: threadLeadPlainText(ACCESSIBILITY_THREAD.lead),
    keywords: accessibilityKeywords,
  });

  const sections = [
    {
      sectionId: "user-research-overlap",
      sectionHeading: "Accessibility and user research overlap",
      text: ACCESSIBILITY_THREAD.userResearchOverlap.text,
    },
    {
      sectionId: "what-good-looks-like",
      sectionHeading: "What good looks like",
      text: concat(...ACCESSIBILITY_THREAD.whatGoodLooksLike.map((item) => item.text)),
    },
    {
      sectionId: "why-it-matters",
      sectionHeading: "Why it matters",
      text: ACCESSIBILITY_THREAD.whyItMatters.text,
    },
    {
      sectionId: "whose-job",
      sectionHeading: "Whose job it is",
      text: threadWhoseJobPlainText(ACCESSIBILITY_THREAD.whoseJob),
    },
    {
      sectionId: ACCESSIBILITY_THREAD.closerLook.id,
      sectionHeading: ACCESSIBILITY_THREAD.closerLook.title,
      text: concat(
        ...ACCESSIBILITY_THREAD.closerLook.blocks.map((block) =>
          concat(block.title, accessibilitySectionsPlainText(block.sections)),
        ),
      ),
    },
    {
      sectionId: ACCESSIBILITY_THREAD.twoWaysComparison.id,
      sectionHeading: ACCESSIBILITY_THREAD.twoWaysComparison.title,
      text: concat(
        ACCESSIBILITY_THREAD.twoWaysComparison.risky.framing ?? "",
        ...(ACCESSIBILITY_THREAD.twoWaysComparison.risky.items ?? []),
        ACCESSIBILITY_THREAD.twoWaysComparison.risky.closing ?? "",
        ACCESSIBILITY_THREAD.twoWaysComparison.safe.framing ?? "",
        ...(ACCESSIBILITY_THREAD.twoWaysComparison.safe.items ?? []),
        ACCESSIBILITY_THREAD.twoWaysComparison.safe.closing ?? "",
      ),
    },
    {
      sectionId: ACCESSIBILITY_THREAD.byPhase.id,
      sectionHeading: ACCESSIBILITY_THREAD.byPhase.title,
      text: concat(
        ACCESSIBILITY_THREAD.byPhase.intro,
        ...ACCESSIBILITY_THREAD.byPhase.blocks.map(
          (block) =>
            `${block.title} ${block.preview} ${accessibilitySectionsPlainText(block.popup)}`,
        ),
      ),
    },
    {
      sectionId: "further-reading",
      sectionHeading: "Further reading",
      text: ACCESSIBILITY_THREAD.furtherReading.text,
    },
    { sectionId: "sources", sectionHeading: "Sources", text: "Sources and references." },
  ];

  for (const section of sections) {
    records.push({
      id: recordId({ pagePath, sectionId: section.sectionId }),
      pageTitle,
      pagePath,
      sectionId: section.sectionId,
      sectionHeading: section.sectionHeading,
      lifecyclePhase: inferLifecyclePhase(pagePath),
      text: section.text,
      keywords: accessibilityKeywords,
    });
  }
}

// User research thread — section-level records.
{
  const pageTitle = USER_RESEARCH_THREAD.title;
  const pagePath = THREADS["user-research"].path;

  const userResearchKeywords = "usability testing design with users UX research";

  records.push({
    id: recordId({ pagePath, sectionId: "" }),
    pageTitle,
    pagePath,
    sectionId: "",
    sectionHeading: pageTitle,
    lifecyclePhase: inferLifecyclePhase(pagePath),
    text: threadLeadPlainText(USER_RESEARCH_THREAD.lead),
    keywords: userResearchKeywords,
  });

  const sections = [
    {
      sectionId: "what-good-looks-like",
      sectionHeading: "What good looks like",
      text: concat(...USER_RESEARCH_THREAD.whatGoodLooksLike.map((item) => item.text)),
    },
    {
      sectionId: "why-it-matters",
      sectionHeading: "Why it matters",
      text: USER_RESEARCH_THREAD.whyItMatters.text,
    },
    {
      sectionId: "whose-job",
      sectionHeading: "Whose job it is",
      text: threadWhoseJobPlainText(USER_RESEARCH_THREAD.whoseJob),
    },
    {
      sectionId: USER_RESEARCH_THREAD.closerLook.id,
      sectionHeading: USER_RESEARCH_THREAD.closerLook.title,
      text: concat(
        ...USER_RESEARCH_THREAD.closerLook.blocks.map((block) =>
          concat(block.title, userResearchSectionsPlainText(block.sections)),
        ),
      ),
    },
    {
      sectionId: USER_RESEARCH_THREAD.twoWaysComparison.id,
      sectionHeading: USER_RESEARCH_THREAD.twoWaysComparison.title,
      text: concat(
        USER_RESEARCH_THREAD.twoWaysComparison.risky.framing ?? "",
        ...(USER_RESEARCH_THREAD.twoWaysComparison.risky.items ?? []),
        USER_RESEARCH_THREAD.twoWaysComparison.risky.closing ?? "",
        USER_RESEARCH_THREAD.twoWaysComparison.safe.framing ?? "",
        ...(USER_RESEARCH_THREAD.twoWaysComparison.safe.items ?? []),
        USER_RESEARCH_THREAD.twoWaysComparison.safe.closing ?? "",
      ),
    },
    {
      sectionId: USER_RESEARCH_THREAD.byPhase.id,
      sectionHeading: USER_RESEARCH_THREAD.byPhase.title,
      text: concat(
        USER_RESEARCH_THREAD.byPhase.intro,
        ...USER_RESEARCH_THREAD.byPhase.blocks.map(
          (block) =>
            `${block.title} ${block.preview} ${userResearchSectionsPlainText(block.popup)}`,
        ),
      ),
    },
    {
      sectionId: "further-reading",
      sectionHeading: "Further reading",
      text: USER_RESEARCH_THREAD.furtherReading.text,
    },
    { sectionId: "sources", sectionHeading: "Sources", text: "Sources and references." },
  ];

  for (const section of sections) {
    records.push({
      id: recordId({ pagePath, sectionId: section.sectionId }),
      pageTitle,
      pagePath,
      sectionId: section.sectionId,
      sectionHeading: section.sectionHeading,
      lifecyclePhase: inferLifecyclePhase(pagePath),
      text: section.text,
      keywords: userResearchKeywords,
    });
  }
}

// Ethics and bias thread — section-level records.
{
  const pageTitle = ETHICS_AND_BIAS_THREAD.title;
  const pagePath = THREADS["ethics-and-bias"].path;

  const ethicsKeywords = "AIA GBA Plus automated decision-making AI bias fairness";

  records.push({
    id: recordId({ pagePath, sectionId: "" }),
    pageTitle,
    pagePath,
    sectionId: "",
    sectionHeading: pageTitle,
    lifecyclePhase: inferLifecyclePhase(pagePath),
    text: threadLeadPlainText(ETHICS_AND_BIAS_THREAD.lead),
    keywords: ethicsKeywords,
  });

  const sections = [
    {
      sectionId: "what-good-looks-like",
      sectionHeading: "What good looks like",
      text: concat(...ETHICS_AND_BIAS_THREAD.whatGoodLooksLike.map((item) => item.text)),
    },
    {
      sectionId: "why-it-matters",
      sectionHeading: "Why it matters",
      text: concat(
        ETHICS_AND_BIAS_THREAD.whyItMatters.text,
        ETHICS_AND_BIAS_THREAD.happenedAtScaleCallout.title,
        ETHICS_AND_BIAS_THREAD.happenedAtScaleCallout.body.text,
      ),
    },
    {
      sectionId: "whose-job",
      sectionHeading: "Whose job it is",
      text: threadWhoseJobPlainText(ETHICS_AND_BIAS_THREAD.whoseJob),
    },
    {
      sectionId: ETHICS_AND_BIAS_THREAD.closerLook.id,
      sectionHeading: ETHICS_AND_BIAS_THREAD.closerLook.title,
      text: concat(
        ...ETHICS_AND_BIAS_THREAD.closerLook.blocks.map((block) =>
          concat(block.title, ethicsAndBiasSectionsPlainText(block.sections)),
        ),
      ),
    },
    {
      sectionId: ETHICS_AND_BIAS_THREAD.twoWaysComparison.id,
      sectionHeading: ETHICS_AND_BIAS_THREAD.twoWaysComparison.title,
      text: concat(
        ETHICS_AND_BIAS_THREAD.twoWaysComparison.risky.framing ?? "",
        ...(ETHICS_AND_BIAS_THREAD.twoWaysComparison.risky.items ?? []),
        ETHICS_AND_BIAS_THREAD.twoWaysComparison.risky.closing ?? "",
        ETHICS_AND_BIAS_THREAD.twoWaysComparison.safe.framing ?? "",
        ...(ETHICS_AND_BIAS_THREAD.twoWaysComparison.safe.items ?? []),
        ETHICS_AND_BIAS_THREAD.twoWaysComparison.safe.closing ?? "",
      ),
    },
    {
      sectionId: ETHICS_AND_BIAS_THREAD.byPhase.id,
      sectionHeading: ETHICS_AND_BIAS_THREAD.byPhase.title,
      text: concat(
        ETHICS_AND_BIAS_THREAD.byPhase.intro,
        ...ETHICS_AND_BIAS_THREAD.byPhase.blocks.map(
          (block) =>
            `${block.title} ${block.preview} ${ethicsAndBiasSectionsPlainText(block.popup)}`,
        ),
      ),
    },
    {
      sectionId: "further-reading",
      sectionHeading: "Further reading",
      text: ETHICS_AND_BIAS_THREAD.furtherReading.text,
    },
    { sectionId: "sources", sectionHeading: "Sources", text: "Sources and references." },
  ];

  for (const section of sections) {
    records.push({
      id: recordId({ pagePath, sectionId: section.sectionId }),
      pageTitle,
      pagePath,
      sectionId: section.sectionId,
      sectionHeading: section.sectionHeading,
      lifecyclePhase: inferLifecyclePhase(pagePath),
      text: section.text,
      keywords: ethicsKeywords,
    });
  }
}

// Backlog thread — section-level records.
{
  const pageTitle = BACKLOG_THREAD.title;
  const pagePath = THREADS.backlog.path;

  const backlogKeywords = "product backlog prioritization user stories MoSCoW";

  records.push({
    id: recordId({ pagePath, sectionId: "" }),
    pageTitle,
    pagePath,
    sectionId: "",
    sectionHeading: pageTitle,
    lifecyclePhase: inferLifecyclePhase(pagePath),
    text: threadLeadPlainText(BACKLOG_THREAD.lead),
    keywords: backlogKeywords,
  });

  const sections = [
    {
      sectionId: "what-good-looks-like",
      sectionHeading: "What good looks like",
      text: concat(...BACKLOG_THREAD.whatGoodLooksLike.map((item) => item.text)),
    },
    {
      sectionId: BACKLOG_THREAD.insideABacklog.id,
      sectionHeading: BACKLOG_THREAD.insideABacklog.title,
      text: concat(
        BACKLOG_THREAD.insideABacklog.intro.text,
        BACKLOG_THREAD.insideABacklog.example.story,
        ...BACKLOG_THREAD.insideABacklog.example.doneWhen,
        BACKLOG_THREAD.insideABacklog.closing.text,
      ),
    },
    {
      sectionId: "why-it-matters",
      sectionHeading: "Why it matters",
      text: BACKLOG_THREAD.whyItMatters.text,
    },
    {
      sectionId: "whose-job",
      sectionHeading: "Whose job it is",
      text: threadWhoseJobPlainText(BACKLOG_THREAD.whoseJob),
    },
    {
      sectionId: BACKLOG_THREAD.closerLook.id,
      sectionHeading: BACKLOG_THREAD.closerLook.title,
      text: concat(
        ...BACKLOG_THREAD.closerLook.blocks.map((block) =>
          concat(block.title, backlogSectionsPlainText(block.sections)),
        ),
      ),
    },
    {
      sectionId: BACKLOG_THREAD.twoWaysComparison.id,
      sectionHeading: BACKLOG_THREAD.twoWaysComparison.title,
      text: concat(
        BACKLOG_THREAD.twoWaysComparison.risky.framing ?? "",
        ...(BACKLOG_THREAD.twoWaysComparison.risky.items ?? []),
        BACKLOG_THREAD.twoWaysComparison.risky.closing ?? "",
        BACKLOG_THREAD.twoWaysComparison.safe.framing ?? "",
        ...(BACKLOG_THREAD.twoWaysComparison.safe.items ?? []),
        BACKLOG_THREAD.twoWaysComparison.safe.closing ?? "",
      ),
    },
    {
      sectionId: BACKLOG_THREAD.byPhase.id,
      sectionHeading: BACKLOG_THREAD.byPhase.title,
      text: concat(
        BACKLOG_THREAD.byPhase.intro,
        ...BACKLOG_THREAD.byPhase.blocks.map(
          (block) =>
            `${block.title} ${block.preview} ${backlogSectionsPlainText(block.popup)}`,
        ),
      ),
    },
    {
      sectionId: BACKLOG_THREAD.commonQuestions.id,
      sectionHeading: BACKLOG_THREAD.commonQuestions.title,
      text: concat(
        ...BACKLOG_THREAD.commonQuestions.blocks.map((block) =>
          concat(block.title, backlogSectionsPlainText(block.sections)),
        ),
      ),
    },
    {
      sectionId: "further-reading",
      sectionHeading: "Further reading",
      text: BACKLOG_THREAD.furtherReading.text,
    },
    { sectionId: "sources", sectionHeading: "Sources", text: "Sources and references." },
  ];

  for (const section of sections) {
    records.push({
      id: recordId({ pagePath, sectionId: section.sectionId }),
      pageTitle,
      pagePath,
      sectionId: section.sectionId,
      sectionHeading: section.sectionHeading,
      lifecyclePhase: inferLifecyclePhase(pagePath),
      text: section.text,
      keywords: backlogKeywords,
    });
  }
}

// Joined-up delivery thread — section-level records.
{
  const pageTitle = JOINED_UP_DELIVERY_THREAD.title;
  const pagePath = THREADS["joined-up-delivery"].path;

  const joinedUpKeywords =
    "joined-up delivery omni-channel interoperability API journey mapping assisted digital";

  records.push({
    id: recordId({ pagePath, sectionId: "" }),
    pageTitle,
    pagePath,
    sectionId: "",
    sectionHeading: pageTitle,
    lifecyclePhase: inferLifecyclePhase(pagePath),
    text: threadLeadPlainText(JOINED_UP_DELIVERY_THREAD.lead),
    keywords: joinedUpKeywords,
  });

  const sections = [
    {
      sectionId: "what-good-looks-like",
      sectionHeading: "What good looks like",
      text: concat(...JOINED_UP_DELIVERY_THREAD.whatGoodLooksLike.map((item) => item.text)),
    },
    {
      sectionId: "why-it-matters",
      sectionHeading: "Why it matters",
      text: JOINED_UP_DELIVERY_THREAD.whyItMatters.text,
    },
    {
      sectionId: "whose-job",
      sectionHeading: "Whose job it is",
      text: threadWhoseJobPlainText(JOINED_UP_DELIVERY_THREAD.whoseJob),
    },
    {
      sectionId: JOINED_UP_DELIVERY_THREAD.closerLook.id,
      sectionHeading: JOINED_UP_DELIVERY_THREAD.closerLook.title,
      text: concat(
        ...JOINED_UP_DELIVERY_THREAD.closerLook.blocks.map((block) =>
          concat(block.title, joinedUpDeliverySectionsPlainText(block.sections)),
        ),
      ),
    },
    {
      sectionId: JOINED_UP_DELIVERY_THREAD.twoWaysComparison.id,
      sectionHeading: JOINED_UP_DELIVERY_THREAD.twoWaysComparison.title,
      text: concat(
        JOINED_UP_DELIVERY_THREAD.twoWaysComparison.risky.framing ?? "",
        ...(JOINED_UP_DELIVERY_THREAD.twoWaysComparison.risky.items ?? []),
        JOINED_UP_DELIVERY_THREAD.twoWaysComparison.risky.closing ?? "",
        JOINED_UP_DELIVERY_THREAD.twoWaysComparison.safe.framing ?? "",
        ...(JOINED_UP_DELIVERY_THREAD.twoWaysComparison.safe.items ?? []),
        JOINED_UP_DELIVERY_THREAD.twoWaysComparison.safe.closing ?? "",
      ),
    },
    {
      sectionId: JOINED_UP_DELIVERY_THREAD.byPhase.id,
      sectionHeading: JOINED_UP_DELIVERY_THREAD.byPhase.title,
      text: concat(
        JOINED_UP_DELIVERY_THREAD.byPhase.intro,
        ...JOINED_UP_DELIVERY_THREAD.byPhase.blocks.map(
          (block) =>
            `${block.title} ${block.preview} ${joinedUpDeliverySectionsPlainText(block.popup)}`,
        ),
      ),
    },
    {
      sectionId: "further-reading",
      sectionHeading: "Further reading",
      text: JOINED_UP_DELIVERY_THREAD.furtherReading.text,
    },
    { sectionId: "sources", sectionHeading: "Sources", text: "Sources and references." },
  ];

  for (const section of sections) {
    records.push({
      id: recordId({ pagePath, sectionId: section.sectionId }),
      pageTitle,
      pagePath,
      sectionId: section.sectionId,
      sectionHeading: section.sectionHeading,
      lifecyclePhase: inferLifecyclePhase(pagePath),
      text: section.text,
      keywords: joinedUpKeywords,
    });
  }
}

// Releasing changes thread — section-level records.
{
  const pageTitle = RELEASING_CHANGES_THREAD.title;
  const pagePath = THREADS["releasing-changes"].path;

  const releasingKeywords =
    "releasing changes CI CD pipeline deployment canary rollback DORA metrics cloud guardrails";

  records.push({
    id: recordId({ pagePath, sectionId: "" }),
    pageTitle,
    pagePath,
    sectionId: "",
    sectionHeading: pageTitle,
    lifecyclePhase: inferLifecyclePhase(pagePath),
    text: threadLeadPlainText(RELEASING_CHANGES_THREAD.lead),
    keywords: releasingKeywords,
  });

  const sections = [
    {
      sectionId: "what-good-looks-like",
      sectionHeading: "What good looks like",
      text: concat(
        ...RELEASING_CHANGES_THREAD.whatGoodLooksLike.map((item) => item.text),
      ),
    },
    {
      sectionId: "why-it-matters",
      sectionHeading: "Why it matters",
      text: RELEASING_CHANGES_THREAD.whyItMatters.text,
    },
    {
      sectionId: "whose-job",
      sectionHeading: "Whose job it is",
      text: threadWhoseJobPlainText(RELEASING_CHANGES_THREAD.whoseJob),
    },
    {
      sectionId: RELEASING_CHANGES_THREAD.closerLook.id,
      sectionHeading: RELEASING_CHANGES_THREAD.closerLook.title,
      text: concat(
        ...RELEASING_CHANGES_THREAD.closerLook.blocks.map((block) =>
          concat(block.title, releasingChangesSectionsPlainText(block.sections)),
        ),
      ),
    },
    {
      sectionId: RELEASING_CHANGES_THREAD.twoWaysComparison.id,
      sectionHeading: RELEASING_CHANGES_THREAD.twoWaysComparison.title,
      text: concat(
        RELEASING_CHANGES_THREAD.twoWaysComparison.risky.framing ?? "",
        ...(RELEASING_CHANGES_THREAD.twoWaysComparison.risky.items ?? []),
        RELEASING_CHANGES_THREAD.twoWaysComparison.risky.closing ?? "",
        RELEASING_CHANGES_THREAD.twoWaysComparison.safe.framing ?? "",
        ...(RELEASING_CHANGES_THREAD.twoWaysComparison.safe.items ?? []),
        RELEASING_CHANGES_THREAD.twoWaysComparison.safe.closing ?? "",
      ),
    },
    {
      sectionId: RELEASING_CHANGES_THREAD.byPhase.id,
      sectionHeading: RELEASING_CHANGES_THREAD.byPhase.title,
      text: concat(
        RELEASING_CHANGES_THREAD.byPhase.intro,
        ...RELEASING_CHANGES_THREAD.byPhase.blocks.map(
          (block) => concat(block.title, block.preview, releasingChangesSectionsPlainText(block.popup)),
        ),
      ),
    },
    {
      sectionId: "further-reading",
      sectionHeading: "Further reading",
      text: RELEASING_CHANGES_THREAD.furtherReading.text,
    },
    { sectionId: "sources", sectionHeading: "Sources", text: "Sources and references." },
  ];

  for (const section of sections) {
    records.push({
      id: recordId({ pagePath, sectionId: section.sectionId }),
      pageTitle,
      pagePath,
      sectionId: section.sectionId,
      sectionHeading: section.sectionHeading,
      lifecyclePhase: inferLifecyclePhase(pagePath),
      text: section.text,
      keywords: releasingKeywords,
    });
  }
}

// Dependencies and standards thread — section-level records.
{
  const pageTitle = DEPENDENCIES_AND_STANDARDS_THREAD.title;
  const pagePath = THREADS["dependencies-and-standards"].path;

  const dependenciesKeywords =
    "dependencies standards open source SBOM supply chain vetting patching lock-in";

  records.push({
    id: recordId({ pagePath, sectionId: "" }),
    pageTitle,
    pagePath,
    sectionId: "",
    sectionHeading: pageTitle,
    lifecyclePhase: inferLifecyclePhase(pagePath),
    text: threadLeadPlainText(DEPENDENCIES_AND_STANDARDS_THREAD.lead),
    keywords: dependenciesKeywords,
  });

  const sections = [
    {
      sectionId: "what-good-looks-like",
      sectionHeading: "What good looks like",
      text: concat(
        ...DEPENDENCIES_AND_STANDARDS_THREAD.whatGoodLooksLike.map((item) => item.text),
      ),
    },
    {
      sectionId: "why-it-matters",
      sectionHeading: "Why it matters",
      text: dependenciesAndStandardsSectionsPlainText(
        DEPENDENCIES_AND_STANDARDS_THREAD.whyItMatters,
      ),
    },
    {
      sectionId: "whose-job",
      sectionHeading: "Whose job it is",
      text: threadWhoseJobPlainText(DEPENDENCIES_AND_STANDARDS_THREAD.whoseJob),
    },
    {
      sectionId: DEPENDENCIES_AND_STANDARDS_THREAD.closerLook.id,
      sectionHeading: DEPENDENCIES_AND_STANDARDS_THREAD.closerLook.title,
      text: concat(
        ...DEPENDENCIES_AND_STANDARDS_THREAD.closerLook.blocks.map((block) =>
          concat(
            block.title,
            dependenciesAndStandardsSectionsPlainText(block.sections),
          ),
        ),
      ),
    },
    {
      sectionId: DEPENDENCIES_AND_STANDARDS_THREAD.twoWaysComparison.id,
      sectionHeading: DEPENDENCIES_AND_STANDARDS_THREAD.twoWaysComparison.title,
      text: concat(
        DEPENDENCIES_AND_STANDARDS_THREAD.twoWaysComparison.risky.framing ?? "",
        ...(DEPENDENCIES_AND_STANDARDS_THREAD.twoWaysComparison.risky.items ?? []),
        DEPENDENCIES_AND_STANDARDS_THREAD.twoWaysComparison.risky.closing ?? "",
        DEPENDENCIES_AND_STANDARDS_THREAD.twoWaysComparison.safe.framing ?? "",
        ...(DEPENDENCIES_AND_STANDARDS_THREAD.twoWaysComparison.safe.items ?? []),
        DEPENDENCIES_AND_STANDARDS_THREAD.twoWaysComparison.safe.closing ?? "",
      ),
    },
    {
      sectionId: DEPENDENCIES_AND_STANDARDS_THREAD.byPhase.id,
      sectionHeading: DEPENDENCIES_AND_STANDARDS_THREAD.byPhase.title,
      text: concat(
        DEPENDENCIES_AND_STANDARDS_THREAD.byPhase.intro,
        ...DEPENDENCIES_AND_STANDARDS_THREAD.byPhase.blocks.map(
          (block) =>
            concat(
              block.title,
              block.preview,
              dependenciesAndStandardsSectionsPlainText(block.popup),
            ),
        ),
      ),
    },
    {
      sectionId: "further-reading",
      sectionHeading: "Further reading",
      text: DEPENDENCIES_AND_STANDARDS_THREAD.furtherReading.text,
    },
    { sectionId: "sources", sectionHeading: "Sources", text: "Sources and references." },
  ];

  for (const section of sections) {
    records.push({
      id: recordId({ pagePath, sectionId: section.sectionId }),
      pageTitle,
      pagePath,
      sectionId: section.sectionId,
      sectionHeading: section.sectionHeading,
      lifecyclePhase: inferLifecyclePhase(pagePath),
      text: section.text,
      keywords: dependenciesKeywords,
    });
  }
}

// Funding thread — section-level records.
{
  const pageTitle = FUNDING_THREAD.title;
  const pagePath = THREADS.funding.path;

  const fundingKeywords =
    "Treasury Board submission TB funding cost estimate GBA Plus CFO attestation life-cycle cost";

  records.push({
    id: recordId({ pagePath, sectionId: "" }),
    pageTitle,
    pagePath,
    sectionId: "",
    sectionHeading: pageTitle,
    lifecyclePhase: inferLifecyclePhase(pagePath),
    text: fundingLeadPlainText(FUNDING_THREAD.lead),
    keywords: fundingKeywords,
  });

  const sections = [
    {
      sectionId: FUNDING_THREAD.whereMoneyComesFrom.id,
      sectionHeading: FUNDING_THREAD.whereMoneyComesFrom.title,
      text: concat(
        FUNDING_THREAD.whereMoneyComesFrom.intro,
        ...FUNDING_THREAD.whereMoneyComesFrom.items.map(
          (item) => `${item.heading} ${item.text}`,
        ),
        FUNDING_THREAD.whereMoneyComesFrom.closing,
      ),
    },
    {
      sectionId: FUNDING_THREAD.detailCards.id,
      sectionHeading: FUNDING_THREAD.detailCards.title,
      text: concat(
        ...FUNDING_DETAIL_CARDS.map((card) => `${card.label} ${card.description}`),
      ),
    },
    {
      sectionId: FUNDING_THREAD.byPhase.id,
      sectionHeading: FUNDING_THREAD.byPhase.title,
      text: concat(
        ...FUNDING_THREAD.byPhase.blocks.map((block) =>
          threadSectionsPlainText(
            Array.isArray(block.popup) ? block.popup : [block.popup],
          ),
        ),
      ),
    },
    {
      sectionId: "whose-job",
      sectionHeading: "Whose job it is",
      text: fundingWhoseJobPlainText(FUNDING_THREAD.whoseJob),
    },
    {
      sectionId: FUNDING_THREAD.twoWaysComparison.id,
      sectionHeading: FUNDING_THREAD.twoWaysComparison.title,
      text: concat(
        FUNDING_THREAD.twoWaysComparison.risky.framing ?? "",
        ...(FUNDING_THREAD.twoWaysComparison.risky.items ?? []),
        FUNDING_THREAD.twoWaysComparison.risky.closing ?? "",
        FUNDING_THREAD.twoWaysComparison.safe.framing ?? "",
        ...(FUNDING_THREAD.twoWaysComparison.safe.items ?? []),
        FUNDING_THREAD.twoWaysComparison.safe.closing ?? "",
      ),
    },
    {
      sectionId: "further-reading",
      sectionHeading: "Further reading",
      text: concat(...FUNDING_THREAD.furtherReading.map((item) => item.text)),
    },
    { sectionId: "sources", sectionHeading: "Sources", text: "Sources and references." },
  ];

  for (const section of sections) {
    records.push({
      id: recordId({ pagePath, sectionId: section.sectionId }),
      pageTitle,
      pagePath,
      sectionId: section.sectionId,
      sectionHeading: section.sectionHeading,
      lifecyclePhase: inferLifecyclePhase(pagePath),
      text: section.text,
      keywords: fundingKeywords,
    });
  }
}

// Reference: Treasury Board submission
{
  const pageTitle = TREASURY_BOARD_SUBMISSION.title;
  const pagePath = TREASURY_BOARD_SUBMISSION_PATH;

  records.push({
    id: recordId({ pagePath, sectionId: "" }),
    pageTitle,
    pagePath,
    sectionId: "",
    sectionHeading: pageTitle,
    lifecyclePhase: inferLifecyclePhase(pagePath),
    text: treasuryBoardSubmissionLeadPlainText(TREASURY_BOARD_SUBMISSION.lead),
  });

  const tbSections = [
    {
      sectionId: TREASURY_BOARD_SUBMISSION.whenNeeded.id,
      sectionHeading: TREASURY_BOARD_SUBMISSION.whenNeeded.title,
      text: treasuryBoardSubmissionSectionsPlainText(TREASURY_BOARD_SUBMISSION.whenNeeded.sections),
    },
    {
      sectionId: TREASURY_BOARD_SUBMISSION.whatToPrepare.id,
      sectionHeading: TREASURY_BOARD_SUBMISSION.whatToPrepare.title,
      text: concat(
        TREASURY_BOARD_SUBMISSION.whatToPrepare.intro,
        ...TREASURY_BOARD_SUBMISSION.whatToPrepare.items.map(
          (item) => `${item.title} ${item.text}`,
        ),
        TREASURY_BOARD_SUBMISSION.whatToPrepare.closing,
      ),
    },
    {
      sectionId: TREASURY_BOARD_SUBMISSION.howItGoes.id,
      sectionHeading: TREASURY_BOARD_SUBMISSION.howItGoes.title,
      text: concat(
        TREASURY_BOARD_SUBMISSION.howItGoes.intro,
        ...TREASURY_BOARD_SUBMISSION.howItGoes.items.map(
          (item) => `${item.title} ${item.text}`,
        ),
      ),
    },
    {
      sectionId: TREASURY_BOARD_SUBMISSION.oneOfSeveralApprovals.id,
      sectionHeading: TREASURY_BOARD_SUBMISSION.oneOfSeveralApprovals.title,
      text: TREASURY_BOARD_SUBMISSION.oneOfSeveralApprovals.text,
    },
    {
      sectionId: "whose-job",
      sectionHeading: "Whose job it is",
      text: treasuryBoardSubmissionWhoseJobPlainText(TREASURY_BOARD_SUBMISSION.whoseJob),
    },
    { sectionId: "sources", sectionHeading: "Sources", text: "Sources and references." },
  ];

  for (const section of tbSections) {
    records.push({
      id: recordId({ pagePath, sectionId: section.sectionId }),
      pageTitle,
      pagePath,
      sectionId: section.sectionId,
      sectionHeading: section.sectionHeading,
      lifecyclePhase: inferLifecyclePhase(pagePath),
      text: section.text,
    });
  }
}

// Reference: Costing a service
{
  const pageTitle = COSTING_A_SERVICE.title;
  const pagePath = COSTING_A_SERVICE_PATH;

  records.push({
    id: recordId({ pagePath, sectionId: "" }),
    pageTitle,
    pagePath,
    sectionId: "",
    sectionHeading: pageTitle,
    lifecyclePhase: inferLifecyclePhase(pagePath),
    text: concat(...COSTING_A_SERVICE.lead),
  });

  records.push({
    id: recordId({ pagePath, sectionId: COSTING_A_SERVICE.confidenceRange.id }),
    pageTitle,
    pagePath,
    sectionId: COSTING_A_SERVICE.confidenceRange.id,
    sectionHeading: COSTING_A_SERVICE.confidenceRange.title,
    lifecyclePhase: inferLifecyclePhase(pagePath),
    text: concat(
      COSTING_A_SERVICE.confidenceRange.intro,
      ...COSTING_A_SERVICE.confidenceRange.items.map((item) => `${item.lead} ${item.body}`),
      COSTING_A_SERVICE.confidenceRange.closing,
      COSTING_A_SERVICE.confidenceRange.formula,
      COSTING_A_SERVICE.confidenceRange.guideClosing.text,
    ),
  });
}

// Reference: Staying funded
{
  const pageTitle = STAYING_FUNDED.title;
  const pagePath = STAYING_FUNDED_PATH;

  records.push({
    id: recordId({ pagePath, sectionId: "" }),
    pageTitle,
    pagePath,
    sectionId: "",
    sectionHeading: pageTitle,
    lifecyclePhase: inferLifecyclePhase(pagePath),
    text: concat(...STAYING_FUNDED.lead),
  });

  records.push({
    id: recordId({ pagePath, sectionId: STAYING_FUNDED.whatThisTakes.id }),
    pageTitle,
    pagePath,
    sectionId: STAYING_FUNDED.whatThisTakes.id,
    sectionHeading: STAYING_FUNDED.whatThisTakes.title,
    lifecyclePhase: inferLifecyclePhase(pagePath),
    text: concat(
      ...STAYING_FUNDED.whatThisTakes.items.map((item) => `${item.lead} ${item.body}`),
      STAYING_FUNDED.whatThisTakes.closing,
    ),
  });
}

// Reference: Funding the exit
{
  const pageTitle = FUNDING_THE_EXIT.title;
  const pagePath = FUNDING_THE_EXIT_PATH;

  records.push({
    id: recordId({ pagePath, sectionId: "" }),
    pageTitle,
    pagePath,
    sectionId: "",
    sectionHeading: pageTitle,
    lifecyclePhase: inferLifecyclePhase(pagePath),
    text: concat(...FUNDING_THE_EXIT.lead),
  });

  records.push({
    id: recordId({ pagePath, sectionId: FUNDING_THE_EXIT.whatCostsMoney.id }),
    pageTitle,
    pagePath,
    sectionId: FUNDING_THE_EXIT.whatCostsMoney.id,
    sectionHeading: FUNDING_THE_EXIT.whatCostsMoney.title,
    lifecyclePhase: inferLifecyclePhase(pagePath),
    text: concat(
      ...FUNDING_THE_EXIT.whatCostsMoney.items.map((item) => `${item.lead} ${item.body}`),
      FUNDING_THE_EXIT.whatCostsMoney.closing,
    ),
  });
}

// Support and communities — section-level records.
{
  const pageTitle = SUPPORT_PAGE.title;
  const pagePath = SUPPORT_PATH;

  const sections = [
    {
      sectionId: "",
      sectionHeading: pageTitle,
      text: SUPPORT_PAGE.lead,
    },
    {
      sectionId: SUPPORT_PAGE.acrossLifecycle.id,
      sectionHeading: SUPPORT_PAGE.acrossLifecycle.title,
      text: concat(
        ...SUPPORT_PAGE.acrossLifecycle.bullets.map((bullet) => bullet.text),
      ),
    },
    {
      sectionId: SUPPORT_PAGE.byTopic.id,
      sectionHeading: SUPPORT_PAGE.byTopic.title,
      text: concat(
        ...SUPPORT_PAGE.byTopic.bullets.map((bullet) => bullet.text),
        SUPPORT_PAGE.byTopic.closing.text,
      ),
    },
    {
      sectionId: "further-reading",
      sectionHeading: "Further reading",
      text: SUPPORT_PAGE.furtherReading.text,
    },
    { sectionId: "sources", sectionHeading: "Sources", text: "Sources and references." },
  ];

  for (const section of sections) {
    records.push({
      id: recordId({ pagePath, sectionId: section.sectionId }),
      pageTitle,
      pagePath,
      sectionId: section.sectionId,
      sectionHeading: section.sectionHeading,
      lifecyclePhase: inferLifecyclePhase(pagePath),
      text: section.text,
      keywords: "support communities help contact mailbox",
    });
  }
}

function recordSearchWeight(record: SearchIndexRecord) {
  return record.text.length + (record.keywords?.length ?? 0);
}

// Dedupe by id — keep the richer record when PAGE_INDEX stubs collide with section copy.
const dedupedById = new Map<string, SearchIndexRecord>();
for (const record of records) {
  const existing = dedupedById.get(record.id);
  if (!existing || recordSearchWeight(record) > recordSearchWeight(existing)) {
    dedupedById.set(record.id, record);
  }
}
const deduped = [...dedupedById.values()];

const outPath = new URL("../public/search-index.json", import.meta.url);
await mkdir(dirname(outPath.pathname), { recursive: true });
await writeFile(outPath, JSON.stringify(deduped, null, 2) + "\n", "utf8");

console.log(`Wrote ${deduped.length} records to public/search-index.json`);

