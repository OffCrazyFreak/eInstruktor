# Database

The database holds only user state. Course content (areas, lessons, questions, study cards) lives in code under `src/content/` and is bundled with the app, so changing a lesson or a question never needs a migration. See [CONTENT.md](./CONTENT.md).

Which database is used is decided by `DB_MODE`; see "Database switch" in [DEVELOPMENT.md](./DEVELOPMENT.md). Locally it is the file `local.db` in the repository root.

## Tables

The schema is in `src/db/schema/`, one file per concern, re-exported from `index.ts`. Column names are snake_case. Every progress table has a `user_id` that points at `user.id` and is deleted with the user.

| Table | File | Key | What it holds |
| --- | --- | --- | --- |
| `user`, `session`, `account`, `verification` | `auth.ts` | `id` | Better Auth tables, hand-maintained |
| `user_profile` | `profile.ts` | `user_id` | Target level (`A` or `B`), optional exam date |
| `question_attempt` | `attempts.ts` | `id` (client UUID) | One answer: question id, correct, chosen option ids (JSON), mode (`practice`, `exam`, `check`), time |
| `exam_session` | `attempts.ts` | `id` (client UUID) | One mock exam: level, start and finish, score, passed, per-subject result (JSON) |
| `lesson_progress` | `progress.ts` | `user_id` + `lesson_slug` | When a lesson was finished |
| `flagged_question` | `progress.ts` | `user_id` + `question_id` | Questions the learner marked for later |
| `user_badge` | `progress.ts` | `user_id` + `badge_id` | Badges and when they were earned |
| `study_day` | `progress.ts` | `user_id` + `day` | Days with any study, for streaks |

`question_attempt` is append-only and uses ids made on the device, so merging progress kept in the browser before sign-in is an insert with `onConflictDoNothing`: sending the same rows twice changes nothing.

`study_day.day` is a `YYYY-MM-DD` string for the calendar day in Europe/Zagreb. Make it with `toStudyDay()` from `src/lib/dates/study-day.ts`, never from a UTC date, or a session after midnight lands on the wrong day.

Question ids, lesson slugs and badge ids are plain text with no foreign key, because the things they point to live in code.

## Migrations

1. Change a file in `src/db/schema/`.
2. Run `pnpm db:generate --name <what-changed>`. It writes a new SQL file and a snapshot into `drizzle/`. Commit both.
3. Run `pnpm db:generate` again: it should print "No schema changes". If it does not, the schema and the committed migrations disagree.

`pnpm db:push` applies the schema straight to the database without a migration. Use it only for a quick experiment on `local.db`, and delete `local.db` afterwards, because a database made by push and then migrated fails on tables that already exist.

Turso gets the same migrations with a deliberate `DB_MODE=turso pnpm db:migrate`.

## Seed

`pnpm db:seed` runs `scripts/seed.ts` with plain Node and the alias loader (see [scripts/README.md](../scripts/README.md)). It:

- refuses to run unless the database is a local file, so it can never write to Turso;
- applies the migrations in `drizzle/` to `local.db`, creating the file if needed;
- prints how many areas, lessons, questions and study cards the course has.

`pnpm db:seed --demo` also adds a demo learner (`demo-user`, `demo@example.com`) aiming for category B with five finished lessons, 30 answers (every third one wrong), five study days, three flagged questions and one failed mock exam. The rows have fixed ids and every insert skips existing rows, so running the seed again is safe.

To start over, delete `local.db` and run the seed again.
