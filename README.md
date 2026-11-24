# e-instruktor (WIP)

## Description

e-instruktor je web aplikacija za ucenje i pripremu ispita kroz kratke, jasne i vizualno zanimljive lekcije te vjezbanje pitanja. Umjesto suhoparnog citanja skripte, gradivo je podijeljeno na manje cjeline, objasnjeno jednostavnim jezikom, uz vizuale, primjere i provjere znanja.

Prva verzija pokriva ispit za **Voditelja brodice A i B kategorije**. Arhitektura je zamisljena tako da se kasnije lako prosiri na druga podrucja (autoskola, matura, faks kolegiji, certifikati).

Fokus prve verzije: banka pitanja (vjezbanje + simulacija ispita + "spreman za ispit" mjerac), uz vizualne lekcije za teme koje su prirodno vizualne (svjetla, plovne oznake, pravila mimoilazenja).

## Link

_(uskoro)_

## Visuals

_(uskoro)_

## Tech stack

- **Core:** TanStack Start (React, file-based routing), TypeScript, pnpm
- **Auth:** Better Auth (Google login only) + `tanstackStartCookies`
- **Database:** libSQL + Drizzle ORM / Drizzle Kit; a local SQLite file in development, Turso in production
- **UI:** Tailwind CSS v4, shadcn/ui (Radix), Motion, lucide-react
- **Forms:** Zod, React Hook Form + `@hookform/resolvers`
- **Tooling:** Biome (lint/format), React Compiler, Vitest
- **Deploy:** Netlify

Exact versions are in `package.json`.

## How to run

### Prerequisites

- Node.js 22 LTS+ and pnpm

### Setup

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Create your local env file and fill in the values:

   ```bash
   cp .env.example .env.local
   ```

   - `BETTER_AUTH_SECRET` - generate with `pnpm dlx @better-auth/cli secret`
   - `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` - from Google Cloud Console. Authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
   - `DB_MODE` - leave it `local` (or unset) for development, which uses `file:local.db`. Turso is used only with `DB_MODE=turso`, even when `TURSO_DATABASE_URL` / `TURSO_AUTH_TOKEN` are filled in.

3. Create the local database (applies the migrations and prints what the course holds; add `--demo` for a demo learner):

   ```bash
   pnpm db:seed
   ```

4. Start the dev server:

   ```bash
   pnpm dev
   ```

   App runs on http://localhost:3000

### Scripts

- `pnpm dev` / `pnpm build` / `pnpm preview`
- `pnpm generate-routes` (TanStack route tree)
- `pnpm db:seed` (`--demo` for a demo learner) / `db:push` / `db:generate` / `db:migrate` / `db:studio`
- `pnpm check` (Biome, TypeScript and tests) / `pnpm lint` / `pnpm format` (Biome)
- `pnpm test` (Vitest)

More detail (database switch, hooks, tests, the Netlify dev workaround) is in [docs/DEVELOPMENT.md](./docs/DEVELOPMENT.md).

## Database (Drizzle + Turso)

- Schema: `src/db/schema/` with the Better Auth tables in `auth.ts` (`user` / `session` / `account` / `verification`) and the learner progress tables beside them; see [docs/DATABASE.md](./docs/DATABASE.md). The auth tables are hand-maintained, because `@better-auth/cli` (1.4.x) currently lags behind `better-auth` 1.6.x and its generator crashes. Regenerate when the CLI catches up.
- Client: `src/db/index.ts` (libSQL). `src/db/config.ts` picks the local `file:local.db` unless `DB_MODE=turso`.

## Auth (Better Auth)

- Config: `src/lib/auth/auth.ts` - Drizzle adapter (`sqlite`) + Google provider, no email/password.
- API route: `src/routes/api/auth/$.ts`, client: `src/lib/auth/auth-client.ts`.

## Note: pnpm 12 and build scripts

pnpm 12 skips dependency build scripts by default, so the ones this project needs are approved in `pnpm-workspace.yaml`:

- `onlyBuiltDependencies` + `allowBuilds: true` for `esbuild`, `sharp`, `lightningcss`, `@parcel/watcher`, `@biomejs/biome`.
- `better-sqlite3` and `@prisma/client` are intentionally `false` (we use Turso/libSQL).
- Added a new native dependency? Run `pnpm approve-builds`.

## Deployment

Netlify (`@netlify/vite-plugin-tanstack-start`). Cloudflare DNS for the domain is planned. See the roadmap for later infrastructure.

## Roadmap / TODO

**App logic (soon):**

- [ ] Content editing without a code change (an admin area) is planned for a later version.

**Infra:**

- Netlify (deploy)
- Cloudflare DNS (domain)
- Cloudflare Turnstile (later, if needed)

**Later:**

- Sentry (error monitoring)
- Umami (analytics)
- UptimeRobot (uptime monitoring)
- PWA
- TanStack Table (if needed)
- PostHog (if Umami becomes too limited)
- Stripe (if monetized)
- Resend (if emails are needed)
- AI mentor (sometime later)

## Attribution

**Created by: Jakov Jakovac**

## License [![License: PolyForm NC 1.0.0](https://img.shields.io/badge/license-PolyForm%20Noncommercial%201.0.0-blue.svg)](./LICENSE)

This work is licensed under the [PolyForm Noncommercial License 1.0.0](./LICENSE): everyone may use, fork, modify, and contribute for **noncommercial** purposes only.

- **Commercial use** by anyone other than the owner requires a separate written license: see [COMMERCIAL_LICENSE.md](./COMMERCIAL_LICENSE.md).
- **Contributions** are accepted under the [Contributor License Agreement](./CLA.md), which lets the owner (Jakov Jakovac) include them in commercial offerings while the public project stays noncommercial.

As the copyright holder, the owner reserves all commercial rights to the project.

## Contributing

Contributions are welcome (bugs, ideas, docs, designs, code). Please read [CONTRIBUTING.md](./CONTRIBUTING.md) and the [CLA](./CLA.md) first, and follow the conventions in [AGENTS.md](./AGENTS.md).

Branch from `dev` and open pull requests into `dev`; `main` only receives release pull requests from `dev`.
