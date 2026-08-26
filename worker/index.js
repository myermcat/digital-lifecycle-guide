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
 *   Gemini      20 requests a day, and only gemini-flash-latest answers on a new key, so
 *               about 10 questions.
 *
 * THE ORDER DEPENDS ON THE STEP, because the two steps are not equally hard.
 *
 * The rewrite turns a question into three search phrases. It is short, and Workers AI does
 * it as well as anything, so it goes first there and the big allowance carries it.
 *
 * The answer is long, has to obey a page of rules, and has to come back as JSON. Tested on
 * the same question, Workers AI restated the question back, wrote "we need to know", and
 * produced follow-ups that were questions TO the reader rather than ones a reader could
 * click. Groq's gpt-oss 120B did not. So the answer step tries the keyed providers first
 * and keeps Workers AI as the thing that still works when they are spent.
 *
 * A caller says which step it wants with "step": "rewrite" or "answer". Anything else gets
 * the answer order, being the safer default.
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

/** Confirmed present on the account, asked of Groq rather than taken from documentation. */
const GROQ_MODELS = new Set([
  "openai/gpt-oss-120b",
  "openai/gpt-oss-20b",
  "qwen/qwen3.8-27b",
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
      /**
       * response_format asks Workers AI to enforce a JSON object, which is what makes this
       * usable for the answer step. Without it the long answer prompt came back as prose
       * with the object embedded, and the reply had to be thrown away.
       */
      const result = await env.AI.run(this.model, {
        messages: [{ role: "user", content: prompt }],
        max_tokens: maxTokens,
        temperature: 0,
        response_format: { type: "json_object" },
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
    /**
     * Several keys are allowed, but note they do NOT multiply the allowance: Groq's limits
     * are per organisation, so two keys on one account share the same 200,000 tokens a day.
     * A second key is for revoking one without breaking the other.
     */
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

/** Which provider leads, per step. Anything not named keeps its declared order behind them. */
/**
 * TWO PROVIDERS WERE TRIED AND REMOVED. Both are recorded here so nobody adds them back on
 * the strength of a blog post, because both look good on paper.
 *
 * Cerebras: a free account answers "Payment required to access this resource". The $5 shown
 * at signup is credit against a card, not a renewing free allowance. It offers exactly two
 * models, gpt-oss-120b and gemma-4-31b. Worth revisiting only with billing enabled.
 *
 * OpenRouter: works, and is unusable. A trivial probe took 93 to 106 seconds and came back
 * as malformed JSON. Its free catalogue rotates, llama-3.3-70b:free stopped being free, and
 * it counts the primary model against its own three-model limit. A slow wrong answer is
 * worse than no answer, so it is gone.
 */
const ORDER = {
  rewrite: ["workers-ai", "groq", "gemini"],
  answer: ["groq", "workers-ai", "gemini"],
};

/**
 * A provider that takes too long is worse than one that fails, because the reader waits and
 * then gets nothing. OpenRouter's free models answered a trivial probe in 106 seconds, so
 * anything slower than this is abandoned and the next provider is tried.
 */
const PROVIDER_TIMEOUT_MS = 25_000;

/**
 * Everything available to spend, in the order for this step. A provider with no key set is
 * simply not in the ring, so the whole thing runs on Workers AI alone until keys are added.
 */
function keyring(env, step) {
  const available = [];
  for (const provider of PROVIDERS) {
    if (provider.binding) {
      if (env.AI) available.push({ provider, key: null });
      continue;
    }
    for (const varName of provider.keyVars ?? []) {
      const key = env[varName];
      if (key) available.push({ provider, key });
    }
  }

  const order = ORDER[step] ?? ORDER.answer;
  return available.sort(
    (a, b) => order.indexOf(a.provider.name) - order.indexOf(b.provider.name),
  );
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


    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: { code: "bad_json", message: "Body must be JSON." } }, 400, origin);
    }

    /**
     * A probe: try EVERY configured provider with a trivial prompt and report what each
     * one said. Without it the only way to know whether a newly added key works is to wait
     * for the one in front of it to run out, which can be a day.
     */
    if (body?.probe === true) {
      const results = [];
      for (const { provider, key } of keyring(env, "answer")) {
        const started = Date.now();
        const probePrompt = 'Reply with JSON only, exactly: {"ok":true}';
        try {
          if (provider.binding) {
            await provider.run(env, probePrompt, 64);
            results.push({ provider: provider.name, ok: true, ms: Date.now() - started });
            continue;
          }
          const { url, init } = provider.request(probePrompt, key, undefined, 64);
          const res = await fetch(url, init);
          const text = (await res.text()).replaceAll(key, "[key]");
          if (res.ok) {
            const parsed = JSON.parse(text);
            const content = provider.normalise(parsed)?.choices?.[0]?.message?.content ?? "";
            results.push({
              provider: provider.name,
              ok: Boolean(content.trim()),
              ms: Date.now() - started,
              reply: content.trim().slice(0, 40),
            });
          } else {
            results.push({
              provider: provider.name,
              ok: false,
              status: res.status,
              outOfQuota: provider.exhausted(res.status, text),
              detail: text.slice(0, 160),
            });
          }
        } catch (err) {
          results.push({
            provider: provider.name,
            ok: false,
            detail: String(err?.message ?? err).slice(0, 160),
          });
        }
      }
      /**
       * Also ask each keyed provider what it offers. Model names are the thing that goes
       * stale here: Cerebras answered "model does not exist" and OpenRouter said its free
       * slug is no longer free, and neither is knowable from documentation that was right
       * last month.
       */
      if (body?.models === true) {
        const catalogues = {};
        const endpoints = {
          groq: "https://api.groq.com/openai/v1/models",
        };
        for (const { provider, key } of keyring(env, "answer")) {
          const url = endpoints[provider.name];
          if (!url || !key) continue;
          try {
            const res = await fetch(url, { headers: { Authorization: `Bearer ${key}` } });
            const listed = await res.json();
            const ids = (listed?.data ?? []).map((m) => m.id);
            catalogues[provider.name] = ids.slice(0, 40);
          } catch (err) {
            catalogues[provider.name] = [`error: ${String(err?.message ?? err).slice(0, 80)}`];
          }
        }
        return json({ probe: results, models: catalogues }, 200, origin);
      }

      return json({ probe: results }, 200, origin);
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

    const step = body?.step === "rewrite" ? "rewrite" : "answer";
    const ring = keyring(env, step);


    if (ring.length === 0) {
      return json(
        { error: { code: "unconfigured", message: "No provider is configured on the server." } },
        503,
        origin,
      );
    }

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
        const cutoff = new AbortController();
        const timer = setTimeout(() => cutoff.abort(), PROVIDER_TIMEOUT_MS);
        try {
          upstream = await fetch(url, { ...init, signal: cutoff.signal });
        } finally {
          clearTimeout(timer);
        }
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

    /**
     * Two different failures, and telling them apart matters to the reader. If anything was
     * genuinely out of quota, tomorrow helps. If everything declined for another reason, a
     * bad reply or a misconfigured provider, tomorrow helps nobody and saying it is a lie.
     */
    const anythingSpent = declined.some((d) => /out for the day/.test(d));

    return json(
      {
        error: {
          code: anythingSpent ? "shared_exhausted" : "shared_unavailable",
          message: anythingSpent
            ? "The shared allowance for today is used up."
            : "No shared model could answer this one.",
          retryAfterSeconds: null,
          declined,
        },
      },
      429,
      origin,
    );
  },
};
