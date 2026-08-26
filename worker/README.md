# The assistant's model proxy

The guide is a static site, so a shared model key cannot live in the page: anything the page
can read, every visitor can read. This holds the key instead, so a reader can ask a question
without signing up for anything.

## Deploy

```bash
cd worker
npx wrangler login                        # once, opens a browser
npx wrangler secret put GROQ_API_KEY      # paste the key when prompted
npx wrangler secret put GEMINI_API_KEY    # optional, adds a second allowance
npx wrangler deploy
```

The first two need you: `login` authenticates your Cloudflare account in a browser, and
`secret put` takes the key itself. Claude does neither. `deploy` can be run by anyone once
those are done.

The deploy prints a URL. Put it in the site's environment as `VITE_ASSISTANT_PROXY` and
rebuild:

```
VITE_ASSISTANT_PROXY=https://dlg-assistant.<your-subdomain>.workers.dev
```

In GitHub Actions that is a repository variable of the same name, read by the deploy
workflow. Without it the page falls back to asking each reader for their own key, which is
how it worked before this existed.

## What it refuses

An open proxy in front of somebody's key is how the key gets drained, so it accepts one
shape of request and nothing else:

- **POST only**, from the guide's own origins
- **exactly one user message**, at most 24,000 characters, which is generous against the
  assistant's real prompts of about 1,200 and 2,200 tokens
- **three models**, all of them cheap ones
- **1,600 output tokens** at most, whatever was asked for

It also separates the two kinds of rate limit, because a reader needs different things from
them: `shared_busy` means wait a moment, `shared_exhausted` means the day's allowance is gone
and their own key is the way through.

## Several keys, spent in order

Every free tier is small, and they run out at different times of day against different
meters. Measured from the APIs rather than read in documentation:

| provider | allowance | questions a day |
|---|---|---|
| Groq | 200,000 tokens a day, counting input, output and reasoning | about **40** |
| Gemini | 20 requests a day, and only `gemini-flash-latest` answers on a new key | about **10** |

A question is two calls, the rewrite and the answer, at roughly 5,000 tokens together.

The proxy spends the generous meter first and keeps the small one for when it is gone, so
together they are about **50 questions a day**. It falls through to the next key only when
one is done FOR THE DAY: a per-minute limit means that key is fine and merely busy, and
waiting for it is better than burning a smaller allowance.

Adding another key needs no code change. `GROQ_API_KEY_2`, `GEMINI_API_KEY_2` and so on are
picked up in order. Neither free tier should be assumed private, so only public guide content
goes through here.
