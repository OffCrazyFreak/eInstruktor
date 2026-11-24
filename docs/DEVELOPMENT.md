# Development

## Setup

1. Use Node 22.18 or newer (`.nvmrc` says 22; `engines` in `package.json` sets the floor) and pnpm 12.18 (pinned as `packageManager`). Scripts need 22.18 because that is the first Node 22 release that strips TypeScript types by default; the alias loader also needs `module.registerHooks` (22.15).
2. Run `pnpm install`. Its `prepare` script runs `git config core.hooksPath .githooks`, which turns on the commit message hook.
3. Run `cp .env.example .env.local` and fill in what you need. Every variable is optional for local work: without Google credentials the app runs and only sign-in is off (every sign-in button is hidden or replaced by a note, see [ACCOUNTS.md](./ACCOUNTS.md)).
4. Run `pnpm db:seed` to build `local.db` from the migrations (add `--demo` for a demo learner with some progress), then `pnpm dev` (http://localhost:3000).

## Database switch

`resolveDbConfig()` in `src/db/config.ts` picks the database for the app, `drizzle.config.ts` and scripts:

- `DB_MODE` unset, empty or `local`: the file `local.db` in the repository root (gitignored).
- `DB_MODE=turso`: `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN`, and it throws as soon as the database client loads when either is missing.

In a production build (`pnpm build`, then Netlify or `pnpm preview`) an unset `DB_MODE` is an error, so a missing variable on the host cannot silently serve an empty local file. Netlify sets `DB_MODE=turso`; for `pnpm preview` against the local file, set `DB_MODE=local` on purpose.

Turso credentials in `.env.local` do nothing on their own, so `pnpm dev` and `pnpm db:push` stay local. Set `DB_MODE=turso` only in Netlify, or for a deliberate one-off command such as `DB_MODE=turso pnpm db:migrate`. A shell variable beats `.env.local`.

`src/lib/server-env.ts` validates the auth variables with zod. The check runs when the server starts and first loads the auth module, not during `pnpm build`: a production server without `BETTER_AUTH_URL`, `BETTER_AUTH_SECRET`, `GOOGLE_CLIENT_ID` or `GOOGLE_CLIENT_SECRET` fails at start, while the build itself still succeeds.

## Scripts

| Command | What it does |
| --- | --- |
| `pnpm dev` | Vite dev server on port 3000 |
| `pnpm build` / `pnpm preview` | Production build into `dist/` and a local preview of it |
| `pnpm check` | Biome, `tsc --noEmit` and Vitest; the gate before every PR and in CI |
| `pnpm test` | Vitest only |
| `pnpm lint` / `pnpm format` | Biome lint or format alone |
| `pnpm db:seed` | Apply the migrations in `drizzle/` to `local.db`; `--demo` adds a demo learner. Refuses any database but a local file |
| `pnpm db:push` | Apply `src/db/schema/` to the selected database without a migration, for quick local experiments |
| `pnpm db:generate` / `pnpm db:migrate` | SQL migrations, for Turso once it is live |
| `pnpm db:studio` | Drizzle Studio |

TypeScript scripts in `scripts/` run with plain Node through `scripts/alias-loader.mjs`; see [scripts/README.md](../scripts/README.md).

## Tests

`vitest.config.ts` is separate from `vite.config.ts` so tests skip the Netlify and Start plugins. It has two projects: `unit` runs `*.test.ts` in Node, `dom` runs `*.test.tsx` in jsdom with Testing Library. Put a test next to the file it covers.

Database services take the database as a parameter. `createTempDatabase()` (`src/lib/testing/temp-database.ts`) migrates a fresh libSQL file in the system temp folder and deletes it in `cleanup()`; it is a file because libSQL runs a batch on a new connection, where an in-memory database would be empty. Components that need a signed-in viewer get one through `<AuthStatusContext value={...}>`, and tests mock server functions with `vi.mock`.

## Git hooks

`.githooks/commit-msg` checks the commit template from `AGENTS.md`: a `type(scope): Summary` subject of at most 72 characters, no em or en dashes and no attribution trailers. `.githooks/post-checkout` passes the event on to a global hook if you have one. Never skip the hooks with `--no-verify`.

## Netlify dev workaround

`vite.config.ts` passes `dev: { edgeFunctions: { enabled: false } }` to the Netlify plugin. Its local edge function emulator starts Deno with `--allow-scripts`, which current Deno releases reject, and `pnpm dev` crashed with "Could not establish a connection". The app has no edge functions, so nothing is lost. Remove the option once netlify/primitives PR 790 (drop the flag) is released; netlify/framework-adapters issue 67 tracks the bug.

## Line endings

`.gitattributes` keeps LF in the working copy. Without it, a checkout with `core.autocrlf=true` (common on Windows and on NTFS drives) writes CRLF files that Biome rejects.
