/**
 * Prompts, shared by the command line tools and the browser.
 *
 * Pure strings and no I/O, so the page can import them. They were written and tuned
 * against real questions, and every rule in them is there because it failed without
 * it, so a second copy for the browser would drift and lose those fixes.
 */

import type { Section } from "./retrieval";

/**
 * Bump when either prompt changes. Cache keys include it, so an edited prompt is not
 * silently served stale results from the previous wording.
 */
export const PROMPT_VERSION = 6;

/**
 * The currency rules, verbatim from instrument-matrix.ts.
 *
 * These are in every prompt because a confidently cited rescinded instrument is worse
 * than no answer, and because readers arrive holding stale checklists that name exactly
 * these three. Naming the dead instrument is what makes the answer useful to them.
 */
export const CURRENCY = `Three instruments moved and must never be presented as current:
- The Standard on Web Accessibility was rescinded on 2 March 2026, along with the Guideline on Making Information Technology Usable by All. The live instruments are the Accessible Canada Regulations and CAN/ASC-EN 301 549.
- The Directive on the Management of Communications (2016) and the Procedures for Publishing (2013) were replaced on 27 March 2025 by the Directive on the Management of Communications and Federal Identity.
- ITSG-33 Annexes 3A and 4A were superseded in spring 2026 by ITSP.10.033 and ITSP.10.033-01. Annexes 1 and 2 remain valid.
- The stand-alone Directive on Privacy Impact Assessment was rescinded on 9 October 2024. The live instrument is Appendix C of the Directive on Privacy Practices.
If one of these comes up, give the live instrument and name the rescinded one, because that is what the reader's old checklist says.`;


/**
 * A single very long section can double the cost of an answer, and the free tier counts
 * input and output against the same per-minute allowance. Long sections are trimmed at a
 * sentence boundary so the model still gets whole thoughts.
 */
const SECTION_CHAR_CAP = 1600;

function trimSection(text: string): string {
  if (text.length <= SECTION_CHAR_CAP) return text;
  const cut = text.slice(0, SECTION_CHAR_CAP);
  const lastStop = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("\n"));
  return (lastStop > SECTION_CHAR_CAP * 0.6 ? cut.slice(0, lastStop + 1) : cut) + "\n[continues]";
}

export type PriorTurn = { question: string; answer: string };

/**
 * The last few exchanges, trimmed.
 *
 * Without this every question was answered as if it were the first, so "threats like
 * what" got a definition of threat modelling rather than a list of threats. Two turns is
 * enough to resolve a follow-up and cheap enough not to matter against the rate limit.
 */
function historyBlock(history: PriorTurn[]): string {
  if (!history.length) return "";
  const recent = history.slice(-2);
  return (
    "\nWhat has already been said in this conversation, oldest first:\n" +
    recent
      .map((t) => `Q: ${t.question}\nA: ${t.answer.replace(/\s+/g, " ").slice(0, 420)}`)
      .join("\n\n") +
    "\n\nThe question below may be a follow-up to that. If it is, answer the NEW question " +
    "directly and do not restate what was already said.\n"
  );
}

export function buildAnswerPrompt(
  question: string,
  sections: Section[],
  situation?: string,
  history: PriorTurn[] = [],
): string {
  const supplied = sections
    .map(
      (s, i) =>
        `--- SECTION ${i + 1}  id=${s.id}\nPage: ${s.page}\nHeading: ${s.heading}\n\n${trimSection(s.text)}`,
    )
    .join("\n\n");

  return `You answer questions about the Government of Canada Digital Lifecycle Guide, for a person who has been made responsible for a digital service and is not an expert in how government projects get approved, funded or bought.

${situation ? `What they appear to be trying to do: ${situation}\n` : ""}${historyBlock(history)}
Their question:
"${question}"

The only material you may use:

${supplied}

CHOOSE ONE SHAPE and set "shape" to it:

- "quoted" when the supplied text states the answer. Give it, then say what it means for the reader.
- "conditional" when it depends on something.
- "asked_back" when a single question decides the answer. Ask that one question and put the choices in "options". Do not ask more than one.
- "routed" when no fixed answer exists in the material.

EVERY SHAPE OWES THE READER A COMPLETE ANSWER. Naming the dependency and stopping is
not an answer, it is a label. Follow the skeleton for the shape you chose:

- quoted: what the material says. Then what the reader has to do about it. Then anything about it that varies.
- conditional: what it depends on, in one sentence. THEN each branch, as a list, saying what happens in each. THEN who can tell them which branch they are in.
- asked_back: why the answer splits, the one question, and the options. Then one line on what happens after they choose.
- routed: the three numbered requirements below.

Aim for 120 to 250 words. Under 60 words is almost always an incomplete answer rather than a concise one.

A "routed" answer must do three things, in this order, or it is useless. A routed answer
that says only "there is no single answer in the material" is a failure, not an answer:
the reader learns nothing and cannot act. Points 2 and 3 are what make it useful.
1. Say plainly that there is no single answer, in one short sentence.
2. Name the PARTS of the thing, and for each part any duration or figure the material actually gives. Never invent one.
3. Say who holds the fact the guide cannot supply, and give an example from the material if there is one.

RULES THAT MATTER MORE THAN THE SHAPE:

- ANSWER EVERY PART OF THE QUESTION. A question with two or three parts gets two or three answers. "What do I need to do, and what am I protecting against" is two questions and both are owed an answer. Answering the first and ignoring the rest is the most common way this goes wrong.
- If one part cannot be answered from the material, SAY SO FOR THAT PART, in a sentence, and answer the others. Do not let one unanswerable part silence the rest.
- A question about whether the reader even needs to know something IS a question, and it is usually answerable: say whether the guide treats it as the reader's business, and who holds it if not.
- Do not open by restating the topic or defining a term the reader did not ask about. Answer first. "Threats like what" wants a list of threats, not a definition of threat modelling.
- Use ONLY the supplied sections. If they do not answer the question at all, set cannotAnswer true and say what the material does cover.
- Never invent a number, a duration, a threshold, a dollar figure, a job title or an instrument name. If a figure is not in the text above, it does not exist for this answer.
- Anything that varies by department must be said to vary: thresholds, who signs, how long a queue is, who chairs a board. Where the material gives a duration, present it as one team's experience rather than a planning figure.
- Put every section id you actually drew on in usedSectionIds. Do not list one you did not use.
- Write for a person under time pressure. Short paragraphs. Bold the lead-in phrase of a point. No preamble, no restating the question back.
- FORMAT LISTS AS LISTS, one item per LINE, each line starting with "- ". Never run items together in a paragraph. Put a blank line between a heading and its list, and between paragraphs. A wall of prose containing "1. ... 2. ... 3. ..." is wrong even when the content is right.
- When the question has two parts, give each part its own bold heading on its own line.
- NEVER mention the supplied material as material. The reader cannot see it and does not know it exists. Never write "Section 1", "the supplied text", "the material above", "the provided sections", "according to the document". State the fact as a fact. The citation is attached separately.
- If your answer contains the word "if", "depends", "whether" or "unless" as its main hinge, the shape is "conditional" and not "quoted". Choose the shape from what your answer actually does.
- Do not use em-dashes or en-dashes. Do not use the construction "X, not Y".
- Use plain ASCII punctuation: straight apostrophes and ordinary hyphens, never typographic quotes or non-breaking hyphens.

${CURRENCY}

Reply with JSON only, in this shape:
{"shape": "quoted|conditional|asked_back|routed", "answer": "...", "usedSectionIds": ["..."], "options": [], "followUps": ["...", "..."], "cannotAnswer": false}`;
}


export function buildRewritePrompt(
  question: string,
  contents: string,
  previousQuestion?: string,
): string {
  return `You translate a question into the vocabulary of one specific document. You do not answer it.

The document is the Government of Canada Digital Lifecycle Guide. It covers the life of a government digital service: the Create phase (Discovery, Alpha, Beta sub-phases), the Live phase (Stabilization, Growth, Maturity), Sunset, the official checkpoints a service must meet, and topic threads such as procurement, privacy, security, accessibility, funding and user research.

Its table of contents:
${contents}

${previousQuestion ? `Their previous question was: "${previousQuestion}"\nThe question below may be a follow-up to it. If it is a fragment like "threats like what" or "such as", read it in the light of the previous question when choosing vocabulary.\n\n` : ""}Someone asked:
"${question}"

Write 2 to 3 short search queries using the words this document would use, so a keyword search can find the right section. Rules:

- NEVER copy a heading or page title from the list above. The list is there to show you the document's vocabulary, not to be quoted. A query that repeats a heading matches that heading and nothing else, which is worse than useless.
- Use CONTENT words: the things, roles and instruments involved. "The old system is falling over" becomes "retire replace decommission a service", not "How the Sunset phase works".
- Use the document's vocabulary, not the asker's.
- ONLY name an approval instrument when the question is genuinely about approval or money. Treasury Board submission, project complexity and risk assessment and concept case belong to questions about who approves a project or how much it costs. Putting them into a question about buying, timing, ownership, measurement or suppliers sends the search to the wrong place. This was the single biggest source of wrong answers when this prompt was tested: "how long does buying software take" was answered correctly until the rewrite added Treasury Board to it.
- Match the vocabulary to what the question is ACTUALLY about:
  - buying, suppliers, demos, costs from a company: procurement, supplier, solicitation, competition
  - HOW LONG THE BUYING TAKES: procurement lead time, months from first idea to signed contract, competition timelines. This is a different question from how long a contract lasts, and confusing the two answers the wrong question with a real fact. "How many years does a procurement run for" is about the process.
  - HOW LONG A CONTRACT LASTS: contract term, option years, extension
  - whether to build, buy or reuse: options analysis, reuse, buy, build
  - who owns or runs a service, handover, no documentation: team capability, roles, service ownership
  - whether it is working, complaints, usage, what to measure: monitoring, instrumentation, signals, user research
  - replacing or retiring something: sunset, retire, replace, decommission
  - personal information: privacy impact assessment
  - putting a service online, clearance to operate: security assessment and authorization
  - who approves, thresholds, dollar limits, going higher up: Treasury Board submission, capacity class, concept case
- Each query is 3 to 8 words. No punctuation, no question marks.
- Do not answer the question and do not invent facts, thresholds, durations or names.
- Set outOfScope true only if this document plainly cannot help: a departmental fact that varies by department, or a subject outside the life of a government digital service.

Also give "situation": one short sentence saying what the asker is trying to do, in the document's terms.

Reply with JSON only, in this shape:
{"queries": ["...", "..."], "situation": "...", "outOfScope": false}`;
}


/**
 * A compact table of contents for the prompt: one line per page, with a few of its
 * section headings. Small on purpose. The whole map is about 7,000 tokens and this is
 * a fraction of that, which is what keeps a rewrite call cheap enough to run on every
 * question.
 */
export function buildContents(
  map: Array<{ title: string; path: string; sections: string[] }>,
): string {
  return map
    .filter((p) => !p.path.startsWith("/shared") && !p.path.startsWith("/unmapped"))
    .map((p) => `- ${p.title} (${p.path}): ${p.sections.slice(0, 2).join("; ")}`)
    .join("\n");
}
