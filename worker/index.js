/**
 * The assistant's model proxy, with fallback across providers.
 *
 * WHY THIS EXISTS. The guide is a static site, so anything the page can read every visitor
 * can read. A shared key in the bundle would be public within a day and drained shortly
 * after. This holds the keys instead, so a reader gets answers without signing up for
 * anything, and no key ever reaches a browser.
 *
 * WHY MORE THAN ONE PROVIDER. Every free allowance is small, and they run out at different
 * times of day against different meters. In order of how much they give:
 *
 *   Workers AI  10,000 neurons a day on the free Workers plan, which Cloudflare puts at
 *               roughly 1,300 model responses, so about 650 questions since each one is
 *               two calls. NO KEY AT ALL: it is a binding on this Worker's own account,
 *               which is the account needed to deploy this in the first place.
 *   Groq        200,000 tokens a day, counting input, output and reasoning. A question
 *               costs about 5,000 tokens, so roughly 40 questions. Also 6,000 a minute.
 *   Cerebras    a free tier with no card, OpenAI-compatible, smaller than Groq.
 *   OpenRouter  one API in front of many models, some free. Least predictable, since what
 *               is free there changes, which is why it is the last resort.
 *   Gemini      20 requests a day, and only gemini-flash-latest answers on a new key, so
 *               about 10 questions.
 *
 * Workers AI is therefore an order of magnitude larger than the other two together, and it
 * is first. The keyed providers are kept behind it for when it runs out, and because an
 * open-weight model at the edge is not always the best writer.
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
 * Every provider is optional. One with no key set is simply not in the ring, so this runs
 * on Workers AI alone until keys are added, and adding one needs no code change:
 * GROQ_API_KEY, CEREBRAS_API_KEY, OPENROUTER_API_KEY, GEMINI_API_KEY, and _2 variants of
 * each, are picked up in the order listed above.
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
    name: "workers-ai",
    /**
     * No key: Workers AI is reached through the env.AI binding declared in wrangler.toml,
     * on the same Cloudflare account that runs this Worker. That makes it the only provider
     * here with nothing to leak and nothing to rotate.
     */
    binding: true,
    model: "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
    async run(env, prompt, maxTokens) {
      const result = await env.AI.run(this.model, {
        messages: [{ role: "user", content: prompt }],
        max_tokens: maxTokens,
        temperature: 0,
      });
      /**
       * Workers AI does not return one shape. Depending on the model it is a bare string,
       * an object with `response`, or an OpenAI-style `choices` array, and `response` is
       * itself sometimes an object rather than text. Assuming one of them cost a deploy:
       * the failure surfaced as "raw.replace is not a function", reported to the reader as
       * a spent allowance.
       */
      const candidates = [
        typeof result === "string" ? result : null,
        typeof result?.response === "string" ? result.response : null,
        typeof result?.response?.response === "string" ? result.response.response : null,
        typeof result?.choices?.[0]?.message?.content === "string"
          ? result.choices[0].message.content
          : null,
        typeof result?.result?.response === "string" ? result.result.response : null,
      ];
      const raw = candidates.find((c) => c && c.trim());
      if (!raw) {
        throw new Error(`unexpected shape: ${JSON.stringify(result).slice(0, 120)}`);
      }

      /**
       * There is no enforced JSON mode here, unlike the keyed providers, so the reply has to
       * be checked. Two things happen in practice: the model wraps the object in a fenced
       * code block, which is easy to undo, or it writes prose around it, which is not. An
       * unparseable reply THROWS, so the caller falls through to a provider that can be held
       * to a schema, rather than handing the page something it will choke on.
       */
      const text = raw
        .replace(/^\s*```(?:json)?\s*/i, "")
        .replace(/\s*```\s*$/, "")
        .trim();

      if (!text) throw new Error("empty response");
      try {
        JSON.parse(text);
      } catch {
        throw new Error("not JSON");
      }

      return { choices: [{ message: { content: text }, finish_reason: "stop" }] };
    },
  },
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
    name: "cerebras",
    /**
     * Same request shape as Groq, being OpenAI-compatible, and free with no card. Placed
     * after Groq because its allowance is smaller and its models fewer, and before Gemini
     * because Gemini's twenty requests a day is the smallest thing here.
     */
    keyVars: ["CEREBRAS_API_KEY", "CEREBRAS_API_KEY_2"],
    request(prompt, key, _model, maxTokens) {
      return {
        url: "https://api.cerebras.ai/v1/chat/completions",
        init: {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
          body: JSON.stringify({
            model: "llama3.1-8b",
            temperature: 0,
            max_tokens: maxTokens,
            response_format: { type: "json_object" },
            messages: [{ role: "user", content: prompt }],
          }),
        },
      };
    },
    normalise(json) {
      return json;
    },
    exhausted(status, text) {
      return status === 429 && /per day|daily|quota/i.test(text);
    },
  },
  {
    name: "openrouter",
    /**
     * One API in front of many models, some of them free. Last of the keyed providers
     * because a free model there is whatever is free that week, so it is the least
     * predictable, which is exactly what a last resort should be.
     */
    keyVars: ["OPENROUTER_API_KEY"],
    request(prompt, key, _model, maxTokens) {
      return {
        url: "https://openrouter.ai/api/v1/chat/completions",
        init: {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${key}`,
            /* OpenRouter asks callers to identify themselves */
            "HTTP-Referer": "https://myermcat.github.io/digital-lifecycle-guide/",
            "X-Title": "Digital Lifecycle Guide assistant",
          },
          body: JSON.stringify({
            model: "meta-llama/llama-3.3-70b-instruct:free",
            temperature: 0,
            max_tokens: maxTokens,
            response_format: { type: "json_object" },
            messages: [{ role: "user", content: prompt }],
          }),
        },
      };
    },
    normalise(json) {
      return json;
    },
    exhausted(status, text) {
      return status === 429 && /per day|daily|quota|credits/i.test(text);
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

/**
 * Everything available to spend, in order. The binding first when it is present, then every
 * configured key. A provider with no key set simply is not in the ring.
 */
function keyring(env) {
  const ring = [];
  for (const provider of PROVIDERS) {
    if (provider.binding) {
      if (env.AI) ring.push({ provider, key: null });
      continue;
    }
    for (const varName of provider.keyVars ?? []) {
      const key = env[varName];
      if (key) ring.push({ provider, key });
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
    /**
     * Why each provider declined. Returned when everything fails, because a bare
     * "allowance used up" gave no way to tell a spent quota from a misconfigured binding,
     * and the first deploy failed for the second reason while reporting the first.
     */
    const declined = [];

    for (const { provider, key } of ring) {
      /* the binding is a function call rather than a fetch, so it is handled apart */
      if (provider.binding) {
        try {
          const normalised = await provider.run(env, prompt, maxTokens);
          return json(normalised, 200, origin, { "X-Answered-By": provider.name });
        } catch (err) {
          /**
           * Workers AI answers a spent allowance with an error rather than a 429, and the
           * wording is not stable enough to match on. Either way the next provider is the
           * right response, so anything from here falls through, with the reason kept.
           */
          declined.push(`${provider.name}: ${String(err?.message ?? err).slice(0, 160)}`);
          continue;
        }
      }

      const { url, init } = provider.request(prompt, key, body?.model, maxTokens);

      let upstream;
      try {
        upstream = await fetch(url, init);
      } catch (err) {
        /* network trouble with one provider is not the reader's problem, but record it */
        declined.push(`${provider.name}: network ${String(err?.message ?? err).slice(0, 80)}`);
        continue;
      }

      const text = (await upstream.text()).replaceAll(key, "[key]");

      if (upstream.ok) {
        let parsed;
        try {
          parsed = JSON.parse(text);
        } catch {
          declined.push(`${provider.name}: reply was not JSON`);
          continue;
        }
        return json(provider.normalise(parsed), 200, origin, { "X-Answered-By": provider.name });
      }

      if (provider.exhausted(upstream.status, text)) {
        declined.push(`${provider.name}: out for the day`);
        continue;
      }

      if (upstream.status === 429) {
        const seconds = text.match(/try again in ([\d.]+)s/i)?.[1];
        busyRetryAfter = seconds ? Math.ceil(Number(seconds)) : 25;
        declined.push(`${provider.name}: busy`);
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
          /* which providers declined and why: a spent quota reads very differently
             from a binding that was never configured */
          declined,
        },
      },
      429,
      origin,
    );
  },
};
