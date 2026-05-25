# AI Portfolio Assistant

This feature adds a premium RAG chatbot to the existing Roby Arjuna portfolio without rewriting the portfolio architecture.

## Architecture

The browser only renders the chat UI and streams tokens from Supabase Edge Functions. Gemini, pgvector retrieval, prompt rules, rate limiting, and message persistence run server-side so API keys and hidden instructions never ship to the client.

Flow:

1. CV PDF and `src/ai/rag/profileContext.md` are parsed by `scripts/ingest-cv.mjs`.
2. Text is normalized and split into 500-800 character chunks with 100 character overlap.
3. Gemini embeddings are generated with `gemini-embedding-2` at 768 dimensions.
4. Chunks are stored in Supabase Postgres using `pgvector`.
5. The widget calls `supabase/functions/portfolio-chat`.
6. The function embeds the user query, retrieves matching chunks, injects only that context into Gemini `gemini-2.5-flash`, and streams grounded output back to React.

## Why This Architecture

Supabase Edge Functions are the right boundary for this portfolio because the app already uses Supabase, the browser keeps using the existing anon key, and the service role key stays server-side. pgvector keeps the RAG data close to existing portfolio data and avoids adding a second vector database for a small personal assistant.

Tradeoffs:

- Supabase Edge Functions add one backend deployment step, but they protect Gemini secrets and system prompts.
- `pdf-parse` is used in a local ingestion script, not in the browser, keeping the frontend bundle small.
- Markdown rendering is intentionally conservative and dependency-light. For richer markdown, add `react-markdown`, `remark-gfm`, and `rehype-sanitize`.

## Files Added

- `src/ai/components/AiChatWidget.jsx`: floating glassmorphism chat widget.
- `src/ai/hooks/useAiChat.js`: local session memory, optimistic UI, streaming state.
- `src/ai/services/portfolioChatService.js`: SSE client for the Supabase Edge Function.
- `src/ai/utils/sanitizeInput.js`: input limits, language detection, prompt-injection prefilter.
- `src/ai/utils/markdown.js`: safe minimal markdown rendering.
- `supabase/migrations/202605250001_ai_portfolio_assistant.sql`: pgvector schema and similarity search.
- `supabase/functions/portfolio-chat/index.ts`: RAG retrieval, Gemini streaming, rate limiting, message persistence.
- `scripts/ingest-cv.mjs`: CV PDF parsing and embedding ingestion.

## Environment

Frontend:

```bash
REACT_APP_SUPABASE_URL=https://your-project-ref.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-public-anon-key
```

Supabase Edge Function secrets:

```bash
GEMINI_API_KEY=your-gemini-api-key
GEMINI_MODEL=gemini-3.5-flash
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
AI_GENERATION_PROVIDER=gemini
```

Optional OpenRouter generation:

```bash
AI_GENERATION_PROVIDER=openrouter
OPENROUTER_API_KEY=your-openrouter-api-key
OPENROUTER_MODEL=google/gemini-3.5-flash
OPENROUTER_SITE_URL=https://portfolio-robyarjuna.my.id
OPENROUTER_APP_TITLE=Roby Portfolio AI Assistant
```

Embeddings still use Gemini `gemini-embedding-2` because the pgvector index was built with that embedding space. OpenRouter is used only for answer generation.

Local ingestion:

```bash
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
GEMINI_API_KEY=your-gemini-api-key
# Optional overrides. By default, ingestion reads site_config.resume_url from Supabase.
CV_URL=https://your-public-cv-url.pdf
CV_PATH=src/asset/RobyCV.pdf
```

## Setup

Run the migration in Supabase SQL editor or through Supabase CLI:

```bash
supabase db push
```

Deploy the Edge Function:

```bash
supabase functions deploy portfolio-chat
supabase secrets set GEMINI_API_KEY=your-gemini-api-key
supabase secrets set GEMINI_MODEL=gemini-3.5-flash
```

Switch generation to OpenRouter:

```bash
supabase secrets set AI_GENERATION_PROVIDER=openrouter
supabase secrets set OPENROUTER_API_KEY=your-openrouter-api-key
supabase secrets set OPENROUTER_MODEL=google/gemini-3.5-flash
supabase functions deploy portfolio-chat
```

Index the CV. The script reads the CV from `site_config.resume_url` by default, then refreshes the `cv_pdf` chunks in Supabase:

```bash
npm run ai:ingest-cv
```

Then build the frontend:

```bash
npm run build
```

## Debugging

Enable frontend debug logs in the browser console:

```js
localStorage.setItem('roby-ai-debug', 'true')
```

Disable them:

```js
localStorage.removeItem('roby-ai-debug')
```

When enabled, the frontend logs:

- request start and response status
- stream chunk type
- `requestId`
- context count
- frontend errors

Test the deployed Edge Function without the React UI:

```bash
npm run ai:debug-chat -- "Does Roby have Flutter experience?"
```

Then open Supabase Edge Function logs and search by the printed `debugId`. Server logs are structured JSON with these stages:

- `request_received`
- `rate_limit_ok`
- `query_embedded`
- `retrieval_done`
- `gemini_stream_started`
- `empty_answer_fallback`
- `done`
- `error`

If CLI works but the UI keeps loading, the issue is frontend streaming/state. If CLI also fails, check the Supabase logs for the same `requestId`.

## Anti-Hallucination Strategy

The assistant uses multiple gates:

- Query is sanitized and capped at 900 characters.
- Prompt-injection phrases are rejected before retrieval.
- Similarity search must return chunks above threshold. The current threshold is `0.55`, tuned for `gemini-embedding-2` 768-dimensional embeddings.
- Gemini receives only retrieved CV/profile context.
- System prompt requires exact fallback when unsupported.
- Temperature is low at `0.2`.
- The UI copy says answers are CV-grounded.

Fallbacks:

- Indonesian: `Maaf, informasi tersebut belum tersedia di data CV saya.`
- English: `Sorry, that information is not available in my current CV data.`

## Memory Strategy

The widget keeps the current session in `localStorage` and sends only the last eight messages to the Edge Function. Supabase stores session and message rows for analytics/debugging, but retrieval remains grounded in CV/profile chunks rather than conversational guesses.

## Security

Implemented:

- Gemini API key stays server-side.
- Service role key stays server-side.
- RLS is enabled on AI tables.
- Browser uses only anon key.
- Rate limit table caps requests per session/IP fingerprint.
- Message length is limited.
- Markdown is escaped before formatting.
- System prompt and embeddings are never exposed.

Recommended hardening before high-traffic production:

- Restrict CORS to the portfolio domain instead of `*`.
- Add CAPTCHA or Turnstile for abusive traffic.
- Add Supabase logs/alerts for repeated rate-limit hits.
- Rotate `GEMINI_API_KEY` if it is ever exposed.

## UI/UX Notes

The widget follows the existing cyber-glass design system:

- Fixed bottom-right launcher.
- Dark `#050814` panel.
- Cyan neon border and glow.
- Accent red for errors/stop state.
- Mobile width uses `calc(100vw - 2rem)`.
- Suggested questions are horizontally scrollable on mobile.
- Message area auto-scrolls during streaming.

## Recommended Packages

Already added:

- `pdf-parse`: CV PDF ingestion.

Optional future upgrades:

- `react-markdown`, `remark-gfm`, `rehype-sanitize`: richer safe markdown.
- `@langchain/textsplitters`: more advanced chunking if CV/profile context grows.
- `@google/genai`: typed Gemini SDK wrapper if you prefer SDKs over REST in Edge Functions.

## Performance

- Frontend adds about 20 bytes gzip after cleanup plus the widget module in the main CRA bundle.
- Retrieval returns only top matching chunks to keep Gemini prompt small.
- Session history sent to the backend is capped.
- The ingestion script chunks once offline, so visitors do not pay PDF parsing cost.

## Current Limitations

- The chatbot will not answer correctly until the Supabase migration is applied, the Edge Function is deployed, secrets are set, and the CV is ingested.
- The current markdown renderer is intentionally minimal.
- The Edge Function uses REST streaming to Gemini; if Google changes streaming framing, switch to the official Gemini SDK in the function.
