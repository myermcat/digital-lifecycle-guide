/**
 * A bridge from the words readers use to the words this guide uses.
 *
 * WHY. Retrieval is keyword scoring, so a question only finds a section when they share
 * words. Measured against the slice a reader downloads, the eval's four families score
 * 92, 95 and 86 per cent at top-1 for questions phrased in the guide's own vocabulary, and
 * 17 per cent for the twelve written the way people actually ask. "We haven't started"
 * shares no word with "Discovery". "My minister announced it" pulls up the monitoring
 * thread, because that is where the word minister appears, in a sentence about hearing
 * from the minister's office when a service breaks.
 *
 * The model rewrite is supposed to close that gap and often does, but it cannot be relied
 * on: the proxy leads the rewrite step with Workers AI, a much smaller model than the one
 * writing the answer, because its allowance is the only large one. A vocabulary hint added
 * to the rewrite prompt was followed by Groq from the command line and ignored by Workers AI
 * on the page, which is how a fix came to be reported as working when it was not.
 *
 * So this layer is deterministic. No model, no allowance, no variation between one reader
 * and the next.
 *
 * HONESTY ABOUT WHAT THIS MEASURES. The entries below were written against questions we had
 * already seen fail: the eval's twelve human-phrased cases and the eight a tester asked. A
 * HUMAN score that rises after adding them is therefore not an independent measurement, and
 * should not be quoted as if it were. What it does show is that the mechanism works and the
 * guide has the material. Every new phrasing a reader tries and we miss is a candidate for a
 * new row, and each row's query should be checked against the corpus before it is added,
 * because a query that misses its own page makes retrieval worse rather than better.
 */

/** Each query below was checked against the browser's own slice and reaches its page. */
const BRIDGE: Array<{ test: RegExp; query: string; reaches: string }> = [
  {
    /* nothing exists yet: the guide calls this Discovery, and shares no word with it */
    test: /\b(have ?n[o']?t (?:even )?started|has ?n[o']?t started|not started (?:yet|at all)|where (?:do|should) (?:i|we) (?:start|begin)|nothing (?:exists|has been built)|from scratch|brand new service)\b/i,
    query: "Discovery sub-phase set a goal and define the problem",
    reaches: "/create-discovery",
  },
  {
    /* a date set by somebody else. The word "minister" alone lands on monitoring. */
    test: /\b(minister (?:announced|said|promised)|announced (?:it |this )?in a speech|legislation names|date (?:somebody|someone) else set|by (?:january|february|march|april|may|june|july|august|september|october|november|december)\b|deadline (?:is|was) set)\b/i,
    query: "Discovery sub-phase set a goal and define the problem",
    reaches: "/create-discovery",
  },
  {
    /* a decision question is a question about authority, so fetch who approves */
    test: /\b(stop or (?:push|carry|keep)|push through|over budget|behind schedule|do (?:i|we) (?:stop|carry on|keep going)|should (?:i|we) (?:stop|cancel|continue))\b/i,
    query: "who approves continuing a project over budget",
    reaches: "the approval ladder and the funding thread",
  },
  {
    test: /\b(who owns the data|(?:vendor|supplier) (?:says |claims )?(?:they )?own|data (?:rights|ownership))\b/i,
    query: "who owns the data the contract data rights what stays yours",
    reaches: "/thread/procurement",
  },
  {
    test: /\b(nobody knows who owns|no ?one owns|who owns (?:this|the) service|lost track of who)\b/i,
    query: "service owner whose job keeping capability in the department",
    reaches: "/thread/team-capability",
  },
  {
    test: /\b(already built it|did we (?:skip|miss)|what did we miss|have we missed)\b/i,
    query: "the official checkpoints a digital service must meet",
    reaches: "/gate-map",
  },
  {
    test: /\b(extend (?:the |our )?(?:old )?contract|contract (?:is )?(?:about to |nearly )?expir|renew the contract)\b/i,
    query: "renew before anything runs out contract expiry re-compete",
    reaches: "/live-maturity",
  },
  {
    test: /\b(falling over|failing badly|old system|legacy system|replace it fast|needs replacing)\b/i,
    query: "replace or retire an ageing service forced replacement",
    reaches: "/sunset",
  },
  {
    test: /\b(permission to (?:put|go) (?:this )?(?:on ?line|on the internet|live)|allowed to go live|clearance to operate)\b/i,
    query: "security is built in from the start not added later",
    reaches: "/thread/security",
  },
  {
    test: /\b(is my service any good|how (?:do|would) i know if (?:it|my service) (?:is any good|works)|any good\b)/i,
    query: "service standards targets signals monitoring how well it runs",
    reaches: "/thread/monitoring-and-instrumentation",
  },
  {
    test: /\b(no money|no budget|cannot pay|can ?not afford|without (?:any )?(?:new )?(?:money|funding))\b/i,
    query: "where the money comes from funding a service without new money",
    reaches: "/thread/funding",
  },
  {
    test: /\b(users? (?:hate|dislike|do ?n[o']?t like)|nobody uses it|people (?:hate|do ?n[o']?t want) it)\b/i,
    query: "user research finds out what people actually need",
    reaches: "/thread/user-research",
  },
  {
    test: /\b(pia\b|privacy impact assessment|personal information)\b/i,
    query: "privacy impact assessment personal information about someone",
    reaches: "/thread/privacy",
  },
  {
    test: /\b(off the shelf|already exists|another department'?s? (?:system|service)|someone else'?s? (?:system|platform)|reuse (?:instead|rather))\b/i,
    query: "options analysis reuse buy or build the field of options",
    reaches: "/reference/options-analysis",
  },
  {
    test: /\b(no ?body(?: on my team)? can maintain|cannot maintain|stuck with (?:the |one )?(?:vendor|supplier)|locked in)\b/i,
    query: "avoid lock-in exit plan open standards change supplier",
    reaches: "/thread/procurement and /thread/dependencies-and-standards",
  },
  {
    test: /\b(pilot (?:it )?in one|one region first|small (?:trial|pilot)|try it with a few)\b/i,
    query: "private beta prove it with a few real people invite only",
    reaches: "/create-beta",
  },
];

/**
 * Guide-vocabulary queries for a reader's question. At most two: these score high because
 * they are written in the corpus's own words, and letting four of them in would drown both
 * the reader's phrasing and the model's rewrite.
 */
export function bridgeQueries(question: string): string[] {
  const out: string[] = [];
  for (const row of BRIDGE) {
    if (out.length >= 2) break;
    if (row.test.test(question) && !out.includes(row.query)) out.push(row.query);
  }
  return out;
}

/** Exposed for the probe script, so a new row can be checked before it is trusted. */
export const BRIDGE_ROWS = BRIDGE;
