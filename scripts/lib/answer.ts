/**
 * The answer layer: turn retrieved sections into an answer with a named shape.
 *
 * The design point of this whole assistant is that it says WHAT KIND of answer it is
 * giving. Readers ask the guide questions it deliberately refuses to answer with a
 * number, and a model handed procurement text will supply that number confidently.
 * Naming the shape makes the refusal legible instead of evasive.
 *
 * Four shapes, and the rules that decide between them:
 *
 *   QUOTED       The retrieved text states it. Give it, with the citation.
 *   CONDITIONAL  It depends on something. The dependency IS the answer, so say what
 *                changes it before saying anything else.
 *   ASKED BACK   One question decides the branch. Ask that one and offer the options.
 *   ROUTED       No fixed answer exists. Give the parts, the durations that do exist,
 *                and who holds the fact the guide cannot supply.
 *
 * ROUTED carries an extra rule, from Mariia: a routed answer must DECOMPOSE and
 * EXEMPLIFY, never just deflect. "There is no single number" alone is useless. Name
 * the parts, say how long each can run where the guide says so, and give an example.
 * Deflection is what makes an assistant feel worthless.
 *
 * Nothing here invents. Every claim has to be traceable to a supplied section, and the
 * prompt says so three separate ways, because this is the failure that would embarrass
 * the guide rather than merely disappoint a reader.
 */

import type { Section } from "../../src/lib/assistant/retrieval";
import { buildAnswerPrompt } from "../../src/lib/assistant/prompts";
import { callJson, type Provider } from "./llm";

export type Shape = "quoted" | "conditional" | "asked_back" | "routed";

export type Answer = {
  shape: Shape;
  /** The answer itself. Short paragraphs, bold lead-ins, lists where there are lists. */
  answer: string;
  /** Section ids actually used. Anything not used must not be cited. */
  usedSectionIds: string[];
  /** For asked_back: the options to offer as buttons. Empty otherwise. */
  options: string[];
  /** Two or three next questions the corpus can answer. */
  followUps: string[];
  /** Set when the sections do not answer the question, so the page can say so. */
  cannotAnswer: boolean;
};

const SCHEMA = {
  type: "OBJECT",
  properties: {
    shape: { type: "STRING", enum: ["quoted", "conditional", "asked_back", "routed"] },
    answer: { type: "STRING" },
    usedSectionIds: { type: "ARRAY", items: { type: "STRING" } },
    options: { type: "ARRAY", items: { type: "STRING" } },
    followUps: { type: "ARRAY", items: { type: "STRING" } },
    cannotAnswer: { type: "BOOLEAN" },
  },
  required: ["shape", "answer", "usedSectionIds", "options", "followUps", "cannotAnswer"],
};

export async function answerQuestion(opts: {
  question: string;
  sections: Section[];
  situation?: string;
  provider: Provider;
  key: string;
  model?: string;
}): Promise<Answer & { citedSections: Section[] }> {
  const raw = await callJson<Answer>({
    provider: opts.provider,
    key: opts.key,
    model: opts.model,
    prompt: buildAnswerPrompt(opts.question, opts.sections, opts.situation),
    // room for the reasoning plus a real answer; too low returns an empty response
    maxTokens: 2600,
    schema: SCHEMA,
  });

  const byId = new Map(opts.sections.map((s) => [s.id, s]));
  /**
   * Only cite sections that were actually supplied. A model that invents an id would
   * otherwise produce a citation pointing nowhere, which is worse than no citation
   * because it looks checkable.
   */
  const citedSections = (raw.usedSectionIds ?? [])
    .map((id) => byId.get(id))
    .filter((s): s is Section => Boolean(s));

  /**
   * Normalise typography rather than trusting the instruction. The first run came back
   * with curly apostrophes and a non-breaking hyphen inside "task-authorization", which
   * the project's prose linter would flag and which no reader benefits from.
   */
  const normalise = (t: string) =>
    t
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/[\u201C\u201D]/g, '"')
      .replace(/[\u2011\u2012\u2013\u2014]/g, "-")
      .replace(/\u00A0/g, " ");

  return {
    shape: raw.shape ?? "routed",
    answer: normalise(String(raw.answer ?? "").trim()),
    usedSectionIds: citedSections.map((s) => s.id),
    options: (raw.options ?? []).map(normalise),
    followUps: (raw.followUps ?? []).map(normalise),
    cannotAnswer: Boolean(raw.cannotAnswer),
    citedSections,
  };
}
