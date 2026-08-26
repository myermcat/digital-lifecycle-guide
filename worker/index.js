/**
 * The assistant's model proxy, with fallback across providers.
 *
 * WHY THIS EXISTS. The guide is a static site, so anything the page can read every visitor
 * can read. A shared key in the bundle would be public within a day and drained shortly
 * after. This holds the keys instead, so a reader gets answers without signing up for
 * anything, and no key ever reaches a browser.
 *
 * WHY MORE THAN ONE PROVIDER. Every free tier is small, and they run out at different
 * times of day against different meters. Measured from the APIs rather than read in docs:
 *
 *   Groq    200,000 tokens a day, counting input, output and reasoning. A question costs
 *           about 5,000 tokens across the rewrite and the answer, so roughly 40 questions
 *           a day for everybody together. Also 6,000 tokens a minute.
 *   Gemini  20 requests a day per model, and only gemini-flash-latest is reachable on a
 *           new key. So about 10 questions, since each one is two calls.
 *
 * Neither is a service on its own. Together they are about 50 questions a day, and the
 * order matters: spend the generous meter first and keep the small one for when it is gone.
 *
 * WHAT IT IS NOT. Not a general proxy. It accepts one shape of request, caps what it will
 * forward, checks the origin, and refuses everything else. An open proxy in front of
 * somebody's key is how the key gets drained.
 *
 * Deploy:
 *   cd worker
 *   npx wrangler login
 *   npx wrangler secret put GROQ_API_KEY        (and GEMINI_API_KEY, if you have one)
 *   npx wrangler deploy
 *
 * Adding another key later needs no code change: GROQ_API_KEY_2, GEMINI_API_KEY_2 and so
 * on are picked up automatically, in order.
 */

/** Caps, from what the assistant actually sends: prompts of about 1,200 and 2,200 tokens. */
const MAX_PROMPT_CHARS = 24_000;
const MAX_OUTPUT_TOKENS = 1_600;

const ALLOWED_ORIGINS = [
  "https://myermcat.github.io",
  "http://localhost:8081",
  "http://127.0.0.1:8081",
];

/* ------------------------------------------------------------------ *
 * Providers
 * ------------------------------------------------------------------ */

const GROQ_MODELS = new Set([
  "openai/gpt-oss-120b",
  "openai/gpt-oss-20b",
  "qwen/qwen3.6-27b",
]);

/**
 * Each provider turns the one incoming message into its own request and its answer back
 * into the OpenAI-ish shape the page already reads, so the page needs no idea which one
 * answered.
 */
const PROVIDERS = [
  {
    name: "groq",
    /** Generous meter first: tokens per day rather than requests per day. */
    keyVars: ["GROQ_API_KEY", "GROQ_API_KEY_2", "GROQ_API_KEY_3"],
    request(prompt, key, model, maxTokens) {
      return {
        url: "https://api.groq.com/openai/v1/chat/completions",
        init: {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
          body: JSON.stringify({
            model: GROQ_MODELS.has(model) ? model : "openai/gpt-oss-120b",
            temperature: 0,
            reasoning_effort: "low",
            max_tokens: maxTokens,
            response_format: { type: "json_object" },
            messages: [{ role: "user", content: prompt }],
          }),
        },
      };
    },
    /** Already the shape the page expects. */
    normalise(json) {
      return json;
    },
    /** True when this key is done for the day rather than merely busy. */
    exhausted(status, text) {
      return status === 429 && /per day|TPD|tokens per day|requests per day|RPD/i.test(text);
    },
  },
  {
    name: "gemini",
    /**
     * The alias, not a pinned version. Pinning does not survive contact: 2.5-flash answers
     * 404 "no longer available to new users", and on a new key gemini-flash-latest is the
     * only model that responds at all.
     */
    keyVars: ["GEMINI_API_KEY", "GEMINI_API_KEY_2"],
    request(prompt, key, _model, maxTokens) {
      return {
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${key}`,
        init: {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0,
              /* it reasons before answering and the reasoning is billed against the cap */
              thinkingConfig: { thinkingBudget: 0 },
              maxOutputTokens: maxTokens,
              responseMimeType: "application/json",
            },
          }),
        },
      };
    },
    normalise(json) {
      const text = json?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
      const reason = json?.candidates?.[0]?.finishReason ?? "stop";
      return { choices: [{ message: { content: text }, finish_reason: reason }] };
    },
    exhausted(status, text) {
      return status === 429 && /per day|PerDay|RequestsPerDay/i.test(text);
    },
  },
];

/* ------------------------------------------------------------------ *
 * Plumbing
 * ------------------------------------------------------------------ */

function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function json(body, status, origin, extra = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders(origin), ...extra },
  });
}

/** Every configured key, in the order they should be spent. */
function keyring(env) {
  const ring = [];
  for (const provider of PROVIDERS) {
    for (const varName of provider.keyVars) {
      const key = env[varName];
      if (key) ring.push({ provider, key, varName });
    }
  }
  return ring;
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") ?? "";

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }
    if (request.method !== "POST") {
      return json({ error: { code: "method", message: "POST only." } }, 405, origin);
    }
    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      return json({ error: { code: "origin", message: "Not served from here." } }, 403, origin);
    }

    const ring = keyring(env);
    if (ring.length === 0) {
      return json(
        { error: { code: "unconfigured", message: "No shared key is set on the server." } },
        503,
        origin,
      );
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: { code: "bad_json", message: "Body must be JSON." } }, 400, origin);
    }

    const messages = Array.isArray(body?.messages) ? body.messages : null;
    if (!messages || messages.length !== 1 || typeof messages[0]?.content !== "string") {
      return json(
        { error: { code: "shape", message: "Expect exactly one user message." } },
        400,
        origin,
      );
    }
    const prompt = messages[0].content;
    if (prompt.length > MAX_PROMPT_CHARS) {
      return json(
        { error: { code: "too_long", message: "That prompt is longer than this allows." } },
        413,
        origin,
      );
    }
    const maxTokens = Math.min(Number(body?.max_tokens) || MAX_OUTPUT_TOKENS, MAX_OUTPUT_TOKENS);

    /**
     * Try each key in turn. Fall through only when a key is done FOR THE DAY: a
     * per-minute limit means this key is fine and simply busy, so it is worth waiting for
     * rather than burning the next key's smaller allowance on it.
     */
    let busyRetryAfter = null;

    for (const { provider, key } of ring) {
      const { url, init } = provider.request(prompt, key, body?.model, maxTokens);

      let upstream;
      try {
        upstream = await fetch(url, init);
      } catch {
        continue; /* network trouble with one provider is not the reader's problem */
      }

      const text = (await upstream.text()).replaceAll(key, "[key]");

      if (upstream.ok) {
        let parsed;
        try {
          parsed = JSON.parse(text);
        } catch {
          continue;
        }
        return json(provider.normalise(parsed), 200, origin, { "X-Answered-By": provider.name });
      }

      if (provider.exhausted(upstream.status, text)) continue;

      if (upstream.status === 429) {
        const seconds = text.match(/try again in ([\d.]+)s/i)?.[1];
        busyRetryAfter = seconds ? Math.ceil(Number(seconds)) : 25;
        continue;
      }

      /* a real error from the first provider, worth returning rather than hiding */
      return new Response(text, {
        status: upstream.status,
        headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
      });
    }

    /**
     * Nothing left. Busy and exhausted need different things from the reader, so they are
     * named apart: busy means wait a moment, exhausted means the day is gone and their own
     * key is the way through.
     */
    if (busyRetryAfter !== null) {
      return json(
        {
          error: {
            code: "shared_busy",
            message: "The shared allowance is busy for a moment.",
            retryAfterSeconds: busyRetryAfter,
          },
        },
        429,
        origin,
      );
    }

    return json(
      {
        error: {
          code: "shared_exhausted",
          message: "The shared allowance for today is used up.",
          retryAfterSeconds: null,
        },
      },
      429,
      origin,
    );
  },
};
