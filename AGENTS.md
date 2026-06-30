Make sure to always follow dry and clean code principles, with separation of concerns, modularity, and reusability in mind.

Make sure to always follow project structure and conventions, including file organization, naming conventions, and coding styles, but feel free to suggest improvements when appropriate.
The project structure should be mostly feature based.

After every code generation, ALWAYS provide a brief explanation of the code changes you made and why because I'm still learning and I want to become a better developer.

Make sure to always fetch and follow proper and most recent documentation, especially for libraries.

Do not prematurely optimize code. Focus on clarity and correctness first. Especially for frontend now that react compiler optimizations are very good.

Don't overuse comments. Write self-explanatory code and use comments only when necessary to explain complex logic or decisions.

If you need to add env variables, first notify the user and then update both the .env file and the .env.example file. Always make sure they are in sync.

# Frontend Development Guidelines

## Technology Stack Versions

**Core Framework & Runtime:**

- TanStack Start (full-stack React, file-based routing): `1.168.x`
- TanStack Router: `1.170.x`
- React / React DOM: `19.2.x`
- Vite (Rolldown-based): `8.1.x` (+ `@vitejs/plugin-react`)
- TypeScript: `^6.0`
- pnpm (package manager)

**Authentication:**

- better-auth: `1.6.x` - **Google social provider only** (no email/password)
- `tanstackStartCookies()` plugin (must be the LAST plugin in the array)
- Drizzle adapter (`provider: "sqlite"`)
- Config: `src/lib/auth.ts` · API route: `src/routes/api/auth/$.ts` · client: `src/lib/auth-client.ts`

**Database (Turso + Drizzle, better-auth identity store):**

- Turso (libSQL) via `@libsql/client`: `0.17.x` - local dev falls back to `file:local.db`
- drizzle-orm: `0.45.2`
- drizzle-kit: `0.31.10` (`pnpm db:push` / `db:generate` / `db:migrate` / `db:studio`)
- Schema: `src/db/schema.ts` (better-auth tables, hand-maintained) · client: `src/db/index.ts`

**Key Libraries:**

- React Query (@tanstack/react-query): `5.101.x`
- React Hook Form: `^7.80` (with @hookform/resolvers `^5.4`)
- Zod: `^4.4`
- Motion (animations): `^12.42` (`import { ... } from "motion/react"`)
- Lucide React (icons): `^0.577`
- Tailwind CSS: `4.3.x` (via `@tailwindcss/vite`) + `@tailwindcss/typography`, `tw-animate-css`
- shadcn/ui on Radix primitives - new-york style, zinc base, lucide icons; theme from tweakcn
- UI utilities: class-variance-authority `^0.7`, clsx `^2.1`, tailwind-merge `^3`
- _Planned (not yet installed):_ Sonner (toasts), Recharts (progress/readiness charts)

**Development Tools:**

- Biome: `2.4.5` (lint + format toolchain - replaces ESLint/Prettier; `pnpm check`/`lint`/`format`)
- React Compiler: `babel-plugin-react-compiler` `^1.0` (via `@rolldown/plugin-babel`)
- Vitest: `^4` + Testing Library + jsdom
- TypeScript: `^6.0` (`pnpm exec tsc --noEmit`)

**Deployment & Infrastructure:**

- Netlify (`@netlify/vite-plugin-tanstack-start`: `1.3.x`)
- Cloudflare DNS (domain) - planned
- Later (see README TODO): Sentry, Umami, UptimeRobot, PWA, Cloudflare Turnstile

## Guidelines

NEVER run "pnpm run dev" or any other development server command, because I always already have my dev server running. Also never run build commands.
NEVER use ":any" as a type in typescript code. Check the types and define proper interfaces or types when necessary.
NEVER use em-dashes ("—") or en-dashes ("–") anywhere: not in code, comments, docs, README, or commit messages. Always use a regular hyphen "-".

ALWAYS check if all typescript types are correct and there are no type errors by using "pnpm exec tsc --noEmit" before providing the final code.
ALWAYS use frontend design skill when generating frontend code.

If you need to import some hooks or components from react library, ALWAYS import them by "import { x } from 'react';" instead of React.x or other ways.

Write all function with syntax "function functionName() {}" instead of arrow functions like "const functionName = () => {}" unless it's a small inline function.
WHen writing function ALWAYS check there already exists similar function in the codebase and reuse it instead of writing a new one, especially in all utils/ folders.

Feature-specific code goes in feature folders, shared/generic code stays in central locations (utils/, lib/, constants/). Follow how most popular web open source apps do it.

Add empty rows for better readability between logical blocks of code, my Biome formatter will take care of the rest.

If I tell you to refactor something into a separate component or function, make sure to check if there already exists a similar component or function in the codebase and reuse it instead of writing a new one. If there is no similar component or function, then create a new one in a separate file, instead of writing it in the same file.

Never edit the package.json or package-lock.json files directly, but instead use "pnpm add package-name@version" or "pnpm remove package-name" to manage dependencies.

If you need docs about a library, always fetch the most recent documentation from the official website or repository, instead of searching in node modules or other places.

# Commit message requirement

At the end of every response that includes code changes, include a suggested Git commit message. To make sure you don't miss any changes, first check with git status and git diff what are the changes made, and then using this info and your converstation history in this chat, make a message.

Use this format:

```text
type(scope): Short summary in imperative mood

Changes:
- Specific change 1
- Specific change 2
- Specific change 3

Brief explanation of why the change was needed.

Notes:
- Optional important detail for reviewers or future maintenance
```
