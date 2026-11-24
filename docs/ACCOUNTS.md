# Accounts and sign-in

Everything works without an account. Google sign-in only adds progress kept on the account and carried to other devices ([SYNC.md](./SYNC.md)). There is no email or password sign-in.

## Sign-in

- `src/lib/auth/auth.ts` is the better-auth server with the Google provider and `tanstackStartCookies()` as the last plugin; `src/routes/api/auth/$.ts` serves its routes.
- `signInWithGoogle(returnTo?)` (`src/lib/auth/sign-in-with-google.ts`) starts the flow and comes back to `returnTo`, by default the page the learner is on. `safeRedirect()` keeps only same-site paths (no `//host`, backslashes or control characters); anything else returns to `/`.
- `getAuthConfig` (`src/lib/auth/auth-config.functions.ts`) tells the client whether `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are set. It reads only the environment, never a session. The root route loads it once per visit through TanStack Query.
- `AuthStatusProvider` (mounted in `__root.tsx`) puts `{ googleSignIn, viewer }` in `AuthStatusContext`; read it with `useAuthStatus()`. The viewer comes from `authClient.useSession()` and is `loading`, `anonymous` or `signed-in` with id, name, email and image. Without a provider the context is anonymous with sign-in off, which is what component tests get; a test that needs a signed-in viewer wraps the component in `<AuthStatusContext value={...}>`. Nothing in production code can fake a viewer.

## Without Google credentials

Local development runs without `.env.local` ([DEVELOPMENT.md](./DEVELOPMENT.md)). Then `googleSignIn` is false and:

- the top bar shows no account button, and the site header and landing hide "Prijava";
- the login nudge never opens;
- the Napredak card and every `GoogleSignInButton` say "Prijava trenutačno nije uključena, pa se napredak sprema samo u ovom pregledniku" instead of a button.

## Top bar account menu

`AccountMenu` (`src/components/custom/app-shell/`) shows a round "Prijava Googleom" button when signed out, a placeholder of the same size while the session loads, and for a signed-in learner the Google picture (or the first letter) opening a menu with the name and email, Napredak, Račun and Odjava. `useSignOut()` signs out, leaves `/racun` for `/napredak` and invalidates the router. Local progress stays in the browser after sign-out.

## Login nudge

`LoginNudgeSlot` (`src/components/custom/login-nudge/`) marks a place where finished work can offer sign-in. It opens the "Spremi napredak" bottom sheet (`LoginSheet`) 0.8 seconds after mount when all of these hold:

- the viewer is anonymous and Google is configured;
- the sheet has not opened in this tab session (`nudge-session.ts`, sessionStorage with an in-memory fallback);
- `shouldShowLoginNudge()` allows it: the trigger was not dismissed in the last 7 days and the sheet was shown fewer than 3 times in total.

Triggers: `practice-set` on the practice set end screen, `exam-result` on the mock exam result, and `lesson`. Finishing a lesson moves straight on to the next one, so the reader calls `markNudgeDue("lesson")` and the next lesson's slot opens the sheet as it loads; the last lesson of the course never nudges. Dismissals and the showing count are stored in `dismissedNudges` (`login-nudge:<trigger>` and `login-nudge-showings`). The sheet never opens during a question or a running exam, and saying no removes nothing.

The sheet promises only what is built: "Besplatno je i ostaje. Prijava Googleom sprema tvoj napredak i prenosi ga na drugi uređaj. Što si već riješio, ostaje." It also says that progress without an account disappears with the browser data. Rules from UX research section 8.

## Account page

`/racun` lives under the pathless layout `src/routes/_app/_authed.tsx`. Its `beforeLoad` calls the `getSession` server function through `requireViewer()`; a visitor without a session goes to `/napredak`. This is the only place that looks up the session on the server during navigation, so anonymous pages stay free of it. The guard is only UX: every account server function checks the session itself.

The page (`src/features/account/components/account-page.tsx`) shows the Google name, email and picture, the level and exam date (`LevelForm`, shared with the level sheet, saved to the progress store and synced), "Odjavi se" and "Obriši račun".

## Deleting an account

"Obriši račun" opens an in-page alert dialog that says what is removed and kept, with an opt-in switch "Obriši i napredak u ovom pregledniku". Confirming calls `deleteAccount` (`src/features/account/server/account.functions.ts`, input `{ confirm: true }`), which:

1. reads the user from the session (`requireUser`);
2. signs out through better-auth so the response clears the session cookie;
3. runs `deleteAccountData()` as one libSQL batch: deletes the user's `account` rows (Google ID, access, refresh and ID tokens), every `session` row, `verification` rows whose identifier is the email or the user id, and `user_profile`; then replaces `user.name` with "Obrisani korisnik", `user.email` with a unique `obrisan-<random>@deleted.invalid` (RFC 2606 reserves `.invalid`, so it can never receive mail) and `user.image` with null.

Attempts, exam sessions, lessons, flags, badges and study days stay as anonymous usage rows under the anonymized user. Signing in again with the same Google account creates a new, empty account, because no `account` row links to the old one. The client then clears the sync baseline, clears local progress only when the switch was on, and goes to `/napredak`. A failed deletion keeps the dialog open with "Brisanje nije uspjelo".

The privacy page (`/privatnost`) describes exactly this; change both together.

## Server functions and guards

Account server functions live in `src/features/account/server/` as `*.functions.ts` (thin `createServerFn` handlers with a zod `.inputValidator`) calling `*.server.ts` services that take the database and a user id, so tests run them against a temporary database. `requireUser(lookup)` takes the session lookup as a parameter; production passes `lookupRequestSession` (better-auth `getSession` with the request headers). `require-user.test.ts` reads every `*.functions.ts` file and fails when a function other than `getSession` does not call `requireUser(lookupRequestSession)`.

The client never sends a user id; the server takes it from the session.
