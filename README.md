# DietPlanned (Next.js 14 + TypeScript)

Humanized diet planner with assessments, BMI/BMR calculations, and plan generation. Built on the Next.js App Router, TailwindCSS, and Framer Motion.

## Stack

- Next.js 14 (App Router, TypeScript)
- TailwindCSS + PostCSS
- Framer Motion (animations)
- Node `crypto` for password hashing and signed session tokens
- Supabase persistence via `@supabase/supabase-js`
- Server API routes: auth, assessment, gemini proxy
- Tests: Node built-in `node:test`

## Getting Started

1. Prerequisites: Node 18+ and pnpm/npm/yarn.
2. Install deps:
   - `pnpm install` or `npm install` or `yarn`
3. Create `.env` with:
   - `PUBLIC_SUPABASE_URL="..."`
   - `PUBLIC_SUPABASE_ANON_KEY="..."`
   - `GEMINI_API_KEY="..."` (Google Generative AI key)
   - Optionally: `AUTH_TOKEN_SECRET="long-random-secret"`
4. Run dev server:
   - `pnpm dev` (or `npm run dev`)

## Scripts

- `dev` — start Next dev server
- `build` — build production assets
- `start` — run production server
- `test` — run unit tests (`node --test`)

## Project Structure

- `src/app` — App Router pages and API routes
  - `/` landing
  - `/login`, `/register`
  - `/dashboard`, `/dashboard/assessment`, `/dashboard/plan/[id]`
  - `/api/auth/*` (register, login, me, logout)
  - `/api/assessment` (BMI/BMR/calories + summary + store)
  - `/api/gemini` (server-side proxy/stub)
- `src/components` — UI components
- `src/lib` — utilities: auth, db, assessment math, copy helpers, gemini stub, supabase client
- `src/types` — `db.d.ts` with interfaces
- `tests` — node:test specs for auth, assessment, gemini

## Authentication

- Supabase Auth handles email/password signup and login.
- Client uses `@supabase/auth-helpers-nextjs` to set cookies.
- Server reads session via `createServerClient` in `src/lib/supabase-server.ts`.
- A `profiles` table stores display name and email; data tables link to `auth.users` via `user_id`.

## Assessment

- Calculates BMI (1 decimal), BMR (Mifflin-St Jeor), activity factor, and recommended daily calories with goal adjustment.
- Persists an `Assessment` record and stubs a diet plan via the Gemini proxy.

## Gemini Proxy (Stub)

- `POST /api/gemini` accepts `{ userId, assessment }` and returns a structured `DietPlan`.
- Currently returns a local, deterministic plan for development.
- Replace `src/lib/gemini.ts` with real Google Generative AI SDK calls using `process.env.GEMINI_API_KEY` when ready.

## Supabase

- Configure env vars in `.env`:
  - `PUBLIC_SUPABASE_URL`
  - `PUBLIC_SUPABASE_ANON_KEY`
- Create tables and basic RLS by running `supabase/schema.sql` in the Supabase SQL editor.
- CRUD is defined in `src/lib/db.ts` and uses the anon key (suitable for development). Tighten RLS or use a service role key on the server for production.

## Deployment Notes

- Set `AUTH_TOKEN_SECRET`, `PUBLIC_SUPABASE_URL`, `PUBLIC_SUPABASE_ANON_KEY`, and `GEMINI_API_KEY` in your hosting provider.
- Ensure your RLS policies are production-safe (the provided SQL is permissive for development).
- Ensure `secure: true` on cookies when serving over HTTPS.

## Tests

Run tests with:

```bash
npm test
```

## Notes

- This codebase intentionally includes comments where real SDK calls and secrets will be added.
- UI is built with TailwindCSS and Framer Motion and is responsive across breakpoints.
