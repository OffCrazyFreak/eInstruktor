# Progress sync

While a learner is signed in, the browser progress store ([PROGRESS.md](./PROGRESS.md)) and the account tables ([DATABASE.md](./DATABASE.md)) are kept in step. The browser store stays the source every screen reads; the account is where progress survives cleared browser data and reaches other devices. Anonymous learners never sync.

## When it runs

`ProgressSync` (`src/features/account/components/progress-sync.tsx`) is mounted by the `_app` route through `AppLayout`'s `background` slot and starts `createProgressSync()` (`src/features/account/utils/progress-sync.ts`) for the signed-in user:

- once at start, as a full sync that also pulls the account's attempts and finished exams;
- then 3 seconds after the last change to the store (`SYNC_DEBOUNCE_MS`), sending only what changed;
- one request at a time; a change during a request queues exactly one more;
- while `navigator.onLine` is false it sends nothing and runs again on the `online` event;
- a failed request is retried after 5, 30 and 120 seconds; when those fail too, one quiet toast says "Napredak trenutačno ne stiže na račun" (once per page load), and the next change tries again;
- it never blocks the UI and never throws.

The first sync into an account that has not seen this browser shows "Prenijeli smo N odgovora na tvoj račun." when answers moved.

## What is sent

`buildSyncRequest()` compares the store with the baseline (below) and sends:

| Part | Sent | Server rule |
| --- | --- | --- |
| attempts | all on the first sync for this user, later those answered after `attemptsThrough` | insert, ignore existing ids |
| finished exam sessions | those not yet in the baseline (running exams stay on the device) | insert, ignore existing ids; the first copy wins |
| lessons | added and removed slugs | insert keeping the earlier finish time; delete removed |
| flags | added and removed question ids | insert, ignore existing; delete removed |
| study days, badges | new ones | insert, ignore existing |
| profile (level, exam date, passed time) | first sync: all values with mode `fill`; later: changed fields with mode `set` | `fill`: the account keeps its values, local ones fill its blanks; `set`: the learner's new choice wins, clearing included |

An exam answer links to `exam_session_id` only when that exam belongs to the same user, so a client cannot attach rows to someone else's exam. Every insert is idempotent, so a retry, a double fire or two tabs sending the same rows change nothing and need no lock; tests run two tabs at once against the real merge.

`syncRequestSchema` (`src/features/account/utils/sync-schema.ts`) validates the request with limits a little above what the browser keeps: 5000 attempts, 150 exams of up to 100 questions, 500 lessons, 2000 flags, 1000 study days, 50 badges, ids up to 120 characters. Inserts go in chunks of 100 rows.

## What comes back

The server returns the account's lessons, flags, study days, badges and profile, plus on a full sync the newest 4000 attempts and 100 finished exams. `applySyncResponse()` adopts them:

- sets follow the account, except for changes this device made while the request was on its way, which are kept and sent next time;
- attempts and exams are merged by id (the local exam copy wins, as it may hold exam flags), sorted, and trimmed to the store limits;
- review boxes are rebuilt from pulled answers for questions that have none, so "Za ponoviti" works on a new device; oral card boxes stay on the device;
- a profile field the learner changed during the request keeps the local value.

## Baseline

`einstruktor:sync-baseline:v1` in localStorage (`sync-baseline.ts`) holds what the account had after the last sync: user id, `attemptsThrough` (the newest answer time this device has sent), synced exam ids, lessons, flags, study days, badges and profile. A removed flag or lesson is one in the baseline but no longer in the store, which is how an unflag on one device reaches the other on its next full sync. A baseline for another user id, or a damaged one, counts as empty: the next sync sends everything again, which the server ignores. Deleting the account clears it.

## Known limits

- Another device's changes arrive on the next full sync, which is the first sync of each page load, not live.
- A full sync pulls up to 4000 attempts (about 600 KB of JSON) on each page load of a signed-in learner.
- A different Google account signing in on the same browser receives the progress left in it (UX research accepted this; sign-out keeps local progress).
- Running exams, oral card boxes, the last opened lesson and exam flags stay on the device.
