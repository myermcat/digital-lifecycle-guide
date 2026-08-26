# The assistant's model proxy

The guide is a static site, so a shared model key cannot live in the page: anything the page
can read, every visitor can read. This holds the key instead, so a reader can ask a question
without signing up for anything.

## Deploy

```bash
cd worker
npx wrangler login              # once, opens a browser
npx wrangler secret put GROQ_API_KEY
npx wrangler deploy
```

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

## The numbers that matter

Groq's free tier allows **200,000 tokens a day**, counting input, output and reasoning. A
question costs roughly 5,000 tokens across the two calls, so the shared allowance is about
**40 questions a day for everybody together**. That is enough for demonstrating the thing and
not enough for a service. Paid Groq, or a paid Gemini key on the same proxy, removes the cap.
