# SEO and legal pages

## Page head

- Every route sets its head with `pageHead()` from `src/lib/seo/page-head.ts`: title with the site name, description, Open Graph tags (`og:type`, `og:site_name`, `og:locale` hr_HR, `og:title`, `og:description`, `og:url`) and a canonical link.
- Pass `noindex: true` for app screens that should stay out of search (account, exam in progress); lessons and the lesson list stay indexed.
- Canonical and sitemap URLs use the fixed `SITE_ORIGIN` in `src/lib/seo/site.ts`, never the request host, so preview deploys never claim to be the real site. Change it there when the production domain is set.

## Sitemap and robots

- `src/routes/sitemap[.]xml.ts` is a server route that returns `/sitemap.xml`, built by `sitemapPaths()` in `src/lib/seo/sitemap.ts` from the course content: the landing, `/ucenje`, every area page, every lesson (Lekcija 0 included) and the legal pages. Adding a lesson to `src/content` adds it to the sitemap with no other change.
- `public/robots.txt` allows everything except `/api/` and points to the sitemap. App screens are hidden with `noindex`, not with robots rules, because crawlers must load a page to see `noindex`.

## Legal pages

- `/privatnost` and `/uvjeti` live in `src/features/legal/`. Both share `LegalPage` (title, last-changed date, "Ukratko" summary, contact line) and `LegalSection`.
- The last-changed date and the contact link are in `src/features/legal/constants/legal.ts`. Update the date whenever the text changes.
- The privacy page describes what is stored: localStorage without an account; name, email, image, progress and session data with Google login; deletion anonymizes the name, email and image. Keep it in sync when storage changes (PR 7 adds the sync and account deletion).

## Landing facts

- Exam facts on the landing live in `src/features/landing/constants/landing-content.ts` and must match Lekcija 0 (`src/content/voditelj-brodice/lecture-0.ts`). `factsCheckedOn` is the "zadnje provjereno" date shown next to them.
- The area list on the landing reads `course.areas` from the content, so it cannot drift from the lessons.
