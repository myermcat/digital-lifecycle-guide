/**
 * The assistant's model proxy.
 *
 * WHY THIS EXISTS. The guide is a static site, so anything the page can read every visitor
 * can read, and a shared key in the bundle would be public within a day. This holds the key
 * instead. Readers get answers without signing up for anything, and the key is never sent
 * to a browser.
 *
 * WHAT IT IS NOT. It is not a general proxy to Groq. It accepts one shape of request, caps
 * what it will forward, checks where the request came from, and refuses everything else. An
 * open proxy in front of somebody's paid key is how the key gets drained.
 *
 * Deploy:
 *   cd worker
 *   npx wrangler secret put GROQ_API_KEY      (paste the key when prompted)
 *   npx wrangler deploy
 *
 * Then set VITE_ASSISTANT_PROXY to the deployed URL and rebuild the site.
 */

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

/** Only these models, so the proxy cannot be pointed at something expensive. */
const ALLOWED_MODELS = new Set(["openai/gpt-oss-120b", "openai/gpt-oss-20b", "qwen/qwen3.6-27b"]);

/**
 * Caps, chosen from what the assistant actually sends. The rewrite prompt is about 1,200
 * tokens and the answer prompt about 2,200, so 24,000 characters is generous for both and
 * still refuses anyone trying to use this as free inference for their own work.
 */
const MAX_PROMPT_CHARS = 24_000;
const MAX_OUTPUT_TOKENS = 1_600;

/** Where the assistant is served from. Anything else is refused. */
const ALLOWED_ORIGINS = [
  "https://myermcat.github.io",
  "http://localhost:8081",
  "http://127.0.0.1:8081",
];

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

function json(body, status, origin) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
  });
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
    if (!env.GROQ_API_KEY) {
      return json(
        { error: { code: "unconfigured", message: "The shared key is not set on the server." } },
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
    if (messages[0].content.length > MAX_PROMPT_CHARS) {
      return json(
        { error: { code: "too_long", message: "That prompt is longer than this allows." } },
        413,
        origin,
      );
    }

    const model = ALLOWED_MODELS.has(body?.model) ? body.model : "openai/gpt-oss-120b";

    const upstream = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model,
        temperature: 0,
        reasoning_effort: "low",
        max_tokens: Math.min(Number(body?.max_tokens) || MAX_OUTPUT_TOKENS, MAX_OUTPUT_TOKENS),
        response_format: { type: "json_object" },
        messages: [{ role: "user", content: messages[0].content }],
      }),
    });

    const text = await upstream.text();

    /**
     * Two different 429s reach here and the reader needs different things from them.
     * Per-minute means wait a moment. Per-day means the shared allowance is gone until it
     * resets, and the only useful thing to offer is their own key. The page cannot tell
     * these apart from a status code, so name it.
     */
    if (upstream.status === 429) {
      const perDay = /per day|TPD|tokens per day/i.test(text);
      const retry = text.match(/try again in ([\d.]+)s/i)?.[1];
      return json(
        {
          error: {
            code: perDay ? "shared_exhausted" : "shared_busy",
            message: perDay
              ? "The shared allowance for today is used up."
              : "The shared allowance is busy for a moment.",
            retryAfterSeconds: retry ? Math.ceil(Number(retry)) : perDay ? null : 25,
          },
        },
        429,
        origin,
      );
    }

    /* the key must never reach a browser, not even inside an upstream error */
    const safe = text.replaceAll(env.GROQ_API_KEY, "[key]");

    return new Response(safe, {
      status: upstream.status,
      headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
    });
  },
};
