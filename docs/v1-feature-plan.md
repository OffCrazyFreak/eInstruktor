# e-instruktor - Feature plan and v1 scope (rev. 3)

## Context

Mapping every feature the app could have (informed by similar learning/testing apps)
and locking what goes into a v1 that best demonstrates the whole system. This revision
locks the build order, the slice topic, gamification, and a library policy.

## Guiding lens

- **One-time, time-boxed users** (study ~1-2 months, pass, leave), but it should **feel
  like a game** so people try it and stick through the sprint. Gamification is in,
  framed around the exam run (study streak, topic/readiness badges), not an infinite
  habit loop.
- **Anonymous-first and completely free.** The whole app works without an account;
  login only adds progress tracking and cross-device. "Completely free" is stated on
  the landing and in login nudges.
- **Growth = word of mouth + a great free landing.** Closest analog: driving-theory
  test-prep apps. Tags: `[V1]` core, `[V1+]` showcase, `[Later]`, `[Skip]`.

## Product shape: landing + Lecture 0 + three pillars

1. **Landing** - public, SEO-optimized, lots of tasteful animation, feels like a game
   (NOT pitchy/corporate). Clear "100% free", instant try (no login wall). `[V1]`
2. **Lecture 0 (intro)** - how everything is structured: the app (Learning / Practice /
   Testing, A vs B, accounts) AND the real-world system for the licence (what voditelj
   brodice A/B is, where/how you take the exam, requirements, format, pass criteria).
   `[V1]`
3. **Three pillars (kept distinct):** **Learning** (lectures), **Practice** (many
   modes), **Testing** (mock exam that mimics the real test as closely as possible).

## Access & accounts model

- **Anonymous:** full access - read all lectures, practice all areas or filter to
  specific ones, take tests. CANNOT track mistakes or persist progress (ephemeral
  `localStorage` only).
- **Logged in (Google):** progress across lectures/practice/tests, mistake history,
  readiness, gamification, cross-device sync.
- **Login nudge:** non-blocking modal here and there (e.g. after a lecture and after a
  test) explaining account advantages and that it is **completely free**.
- **Toasts:** shadcn / Sonner for feedback messages.

## A vs B level handling

- Content (lectures, blocks, practice + exam questions) tagged level: `A`, `B`, or
  `common`. User picks target level (A/B) in onboarding/Lecture 0 (changeable).
- **B-only sections collapsed by default with a small "B" badge**, still expandable and
  learnable.
- **Testing differentiates A vs B** (scope, count, threshold per the real exams);
  practice can filter by level.

## Gamification (locked: badges + study streak)

- **Badges/achievements:** finish Lecture 0, complete a topic, hit a readiness
  threshold, pass a first mock, ace a practice set.
- **Study streak** across the run-up to the exam (not infinite).
- Readiness meter stays the hero metric. Persisted only for logged-in users.

## Legal & GDPR (app is in Croatia -> EU GDPR)

- **Privacy Policy** + **Terms of Service / Use** pages. `[V1]`
- **Account deletion** anonymizes PII irreversibly (name/email/image) while retaining
  non-identifying usage data for the owner. `[V1+]`
- Cookie/analytics consent: `[Later]`.

## Feature catalog (verdicts)

### A. Learning
- course > module > lesson > typed blocks (text/image/remember/warning/example/check).
  `[V1]`. Lecture 0 intro `[V1]`. Signature interactive visual `[V1+]` (USP). Cheat
  sheet per topic `[V1]`. Flashcards `[V1+]`. Audio/TTS `[Later]`, video `[Skip]`,
  scenario `[Later]`, glossary/search `[Later]`.

### B. Practice (many modes)
- By topic / all / filtered, wrong-only, weak-focus, custom set, A/B filter. `[V1]`.
- Types: single/multi/true-false/image `[V1]`; hotspot/match/order `[Later]`.
- Feedback + explanation + rule reference `[V1]`. Flag/bookmark `[V1]`. Light SRS
  `[V1+]`. Confidence rating `[Later]`. Report error `[v2]`.

### C. Testing
- Mock exam mimicking the real test per A/B (count, timer, threshold, no live answers,
  score, review). `[V1]`. Mock history/trend `[V1+]`.

### D. Progress, motivation, gamification
- Progress + accuracy `[V1]` (logged-in). Readiness meter `[V1]` (hero).
  Strengths/weaknesses `[V1]`. Badges + study streak `[V1+]`. Exam date + study plan
  `[V1+]`. Reminders `[Later]`. Leaderboards `[Skip]`.

### E. Onboarding & access
- Anonymous-first `[V1]`. Google login `[V1]` (done). Login-nudge modal + "free"
  `[V1]`. Pick level (A/B) + optional exam date `[V1+]`. Diagnostic `[Later]`.

### F. Account, data, admin
- Sync, profile/settings, multi-course architecture `[V1]`. Account deletion =
  anonymize PII `[V1+]`. Seed/MDX content (no CMS GUI) `[V1]`. First user = admin stub
  `[V1+]`. Full admin CMS + report triage `[v2]`.

### G. Growth & legal
- SEO animated game-like landing `[V1]`. Privacy + ToS `[V1]`. Donation note ("Buy Me a
  Coffee" - if it pops off, may add donations and surface to users) `[Later]` (note on
  landing + code TODO). Referral/share `[Later]`. Testimonials `[Later]`. Forum `[Skip]`.

### H. Monetization
- Free for v1 `[V1]`. Freemium/one-time/Stripe/cross-sell `[Later]`.

### I. AI
- AI mentor (grounded RAG) `[Later]`. AI-generated questions/adaptive `[Later]`.

### J. Platform / non-functional
- Responsive + a11y floor `[V1]`. **Dark mode** `[V1]`. Sonner toasts `[V1]`.
  PWA/offline `[Later]`, Sentry `[Later]`, Umami `[Later]`, landing SEO `[V1+]`,
  Turnstile `[Later]`.
- **Testing:** Vitest unit/component (scaffolded) `[V1+]`; **Playwright E2E** `[Later]`
  for automated full-flow verification.
- **i18n (hr, en, de, it, sl)** `[Later]`. **Recommendation: Paraglide** (TanStack
  `paraglide` add-on): type-safe, localized routing, message bundles.

## Build sequencing (your revised order)

1. **Step 1 - Clean slate + first commit.**
2. **Step 2 - Landing page + login only**, shipped standalone so you can try it and
   decide if you like the look and feel before we build the rest.
3. **Step 3 - Full v1** (the vertical slice), then v1+ / v2.

**Library policy:** every third-party library MUST be free for commercial use (MIT /
Apache-2.0 / ISC / BSD or otherwise commercially free; no GPL/AGPL/non-commercial).
Before adding any non-trivial library I propose a few popular options with pros/cons
and a recommendation, and you pick.

## Step 1: clean slate + first commit

Tidy the scaffold, then make the first commit (local only; no remote/push and no public
GitHub repo without asking). Git has 0 commits, everything staged.

- **Delete build/run leftovers:** `local.db` (+ `-shm`/`-wal`), `dist/`, `.netlify/`,
  `.tanstack/`.
- **Remove demo/example pages:** `src/routes/demo/` (both files), their nav links in
  `src/components/Header.tsx`, then `pnpm generate-routes`; drop unused `.demo-*` CSS
  from `src/styles.css`. KEEP `.env.example` and the real integrations.
- **.gitignore hardening:** add `.cta.json` (and delete it), `*.tsbuildinfo`,
  `.claude/settings.local.json`, `*.log`. Keep committing `src/routeTree.gen.ts`.
- **Add Sonner** (`pnpm add sonner`); confirm dark mode works.
- **First commit** of the cleaned baseline.

## Step 2: landing + login (standalone, for your feedback)

A polished, animated, game-like, SEO-friendly landing with the "100% free" message and
a working Google login (already wired). Built and shipped so you can judge the look and
feel before we commit to the full build. Uses the frontend-design skill and your tweakcn
theme. Needs the animation library decision below.

## Step 3: v1 vertical slice (topic: Plovne oznake / IALA)

One topic end to end plus the shell, so v1 exercises the full system:

1. Lecture 0 (app + real voditelj brodice A/B system).
2. **Learning** - the topic as rich blocks (A/B tags, B-only collapsed + badge) + one
   signature interactive visual (buoyage explorer) + cheat sheet.
3. **Practice** - modes (topic/all/filtered/wrong/weak/custom, A/B filter), image-based
   questions, feedback + explanation + rule ref, flag.
4. **Testing** - one mock exam mimicking the real test (A or B), timer, threshold,
   result, review.
5. **Progress + gamification** - readiness meter, weak/strong breakdown, a couple badges
   + study streak (logged-in).
6. **Accounts** - anonymous works fully; Google login adds tracking; login-nudge modal;
   Sonner toasts; dark mode.
7. **Legal** - Privacy + ToS pages; account deletion (anonymize PII) wired.
8. **Data + content** - seed/MDX, so new topics are pure data.

## Data model sketch

- `course` > `module` (level-tagged) > `lesson` > `lessonBlock` (level-tagged,
  collapsible).
- `question` (module, `level`, `type`, `prompt`, `media`, `explanation`, `ruleRef`) >
  `answerOption` (correct).
- `user` (better-auth) + `profile` (`targetLevel`, `examDate`). `attempt` -> derived
  `mistakes`, `topicProgress`/`readiness`. `badge`/`achievement`, `streak` (logged-in).
- `report` (`targetType`, `targetId`, `message`, `status`) for v2 error reporting.
- Account deletion anonymizes PII on `user`, keeps `attempt`/stats. Anonymous = ephemeral
  localStorage only.

## Locked decisions

- **Slice topic:** Plovne oznake (IALA).
- **Gamification in v1:** badges + study streak.
- **Sequencing:** Step 1 clean slate + first commit -> Step 2 landing + login
  (standalone) -> Step 3 full v1.
- **Landing animation:** Motion + Lenis (both MIT).
- **Library policy:** see above (commercially-free only; you pick before I add).

## Library decisions (all candidates are free for commercial use)

I will ask for your pick before adding each. Candidates + my recommendation:

- **Landing animation (Step 2):** LOCKED -> **Motion (installed, MIT) + Lenis smooth
  scroll (MIT)**. (Alternatives considered: Motion-only; GSAP + ScrollTrigger.)
- **Charts - readiness/progress (Step 3):** Recharts (MIT, REC) / Tremor (Apache-2.0) /
  visx (MIT).
- **Client state - quiz session + anonymous localStorage (Step 3):** Zustand (MIT, REC)
  / Jotai (MIT) / TanStack Store (MIT).
- **Lesson content pipeline (Step 3):** plain typed TS/TSX modules (REC) / MDX
  (@mdx-js, MIT) / content-collections (MIT).
- **Minor (will confirm before adding):** canvas-confetti (MIT) for badge celebrations,
  date-fns (MIT) for exam-date math, embla-carousel (MIT) if the landing needs a
  carousel.

## v2 / later

- **Report an error** in a lecture/practice/exam item, reviewed from the admin dashboard.
- Full admin CMS, AI mentor, i18n (Paraglide; hr/en/de/it/sl), donations (Buy Me a
  Coffee), payments, PWA/offline, Sentry/Umami/Turnstile, referral, scenario and
  hotspot/match/order question types, audio/TTS, diagnostic, reminders.
- **Playwright E2E suite** for automated full-flow verification (with ongoing Vitest).

## Verification (when we build)

Per AGENTS.md I will not run dev or build (you keep dev running). To verify:

- `pnpm exec tsc --noEmit` clean, `pnpm check` (Biome) clean, `pnpm db:push` applies
  schema, seeded content shows.
- Step 2: you open the landing in your dev server and judge look/feel + login.
- Step 3 flow: landing -> try without login -> Lecture 0 -> topic lecture (expand a
  B-only block) -> practice (image question, a wrong answer to see explanation; flag) ->
  mock exam -> result/review -> readiness updates -> login nudge -> Google login persists
  -> a badge unlocks -> dark mode toggle -> Privacy/ToS -> delete account anonymizes PII.
- Screenshots at landing + one pillar to check design against the frontend-design skill.
- Vitest covers key units as we build; later a Playwright E2E suite automates this whole
  click-through.
