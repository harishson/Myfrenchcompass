# French Compass — project state & resume guide

> **Where the code lives:** `C:\Users\YUVAKESHAN\Downloads\french-compass-website-main\french-compass-website-main\`
> (nested one level under the folder Claude Code opens in). Run all commands from here.
> Live: https://updated-french-compass.vercel.app · Repo: https://github.com/Yuvakeshan2002/UPDATED-FRENCH-COMPASS

## Stack
Next.js 16.2 (App Router, Turbopack) · React 19 · Tailwind **v4** (`@theme` in `app/globals.css`, no tailwind.config) ·
TypeScript · Sanity v5.31 + next-sanity v13.2 · framer-motion. `next.config.mjs` has `typescript.ignoreBuildErrors: true` (v0 default).

## DESIGN LANGUAGE — "Maison French Compass" (full redesign, replaces old navy/compass)
The client asked for a ground-up reimagining inspired by lingorelic.com + lesfritesfolles.com — **warm, human,
white-dominant, premium — NOT the old navy/compass/brass look.** The compass hero, brass motif and FranceCompassHero
are RETIRED. Do not reintroduce them.

**Palette — STRICT TRICOLOUR ONLY** (client insisted: no warm/cream/ochre). In `app/globals.css @theme`:
- **French Blue `#0055A4`**, **White `#FFFFFF`**, **French Red `#EF4135`** — plus derived blue shades
  (`blue-deep #003A72`, `blue-lift #1466BE`, panels `#0A5FB0`) and neutral ink for text only.
- `cream`/`ivory`/`parchment`/`card` → `#FFFFFF`; `cream-deep`/`parchment2` → `#F1F5FB` (faint blue-white band)
- `espresso`/`ink` dark bands → **French Blue `#0055A4`** (NOT brown/navy). `ink-panel` `#0A5FB0`.
- **Footer** = **French Red `#EF4135`** (client request) with white text + blue/white accent line (`components/Footer.tsx`, own bg, not `on-ink`).
- Placement quiz (`QuizEngine.tsx`) states are self-contained deep-blue gradient panels (`from-[#003A72] to-[#0055A4]`) — never `/50` opacity (that caused a washed look).
- `red`/`flag-red`/`coral`/`ochre`/`brass` → `#EF4135`; `red-text` `#CE1B12` (small-text contrast); `ochre-soft` → white.
- `ink-text` `#16233B` (cool near-black body) · `ink-dim` `#5C6B82` · headings `blue-deep #003A72`.
- WhatsApp brand green (`#25D366`) is the only non-tricolour colour, intentionally kept.
- A `scripts/tricolor.py`-style sweep enforced this across all components; **keep any new colour within these values.**

The site is **token-driven**: legacy names (`ink`, `parchment`, `card`, `brass`, `azimuth`, `foam`, `flag-red`, `ochre`)
are all aliased to the tricolour, so every page stays on-palette. New work uses semantic names.

**Homepage** (`app/(site)/page.tsx`): centred hero with `FloatingWords` backdrop (floating French words) + underline
squiggle; the **Bonjour hero card was removed**; the real interactive `LearningLab` cards (Alphabet + Verb Tenses,
image-free, functional, link to `/learn/*`) sit right below the hero; `TiltCard` 3D on the level cards. Copy: H1
"Chart your course to fluent French.", levels heading "From A1 to C2 — your route and your courses / Six milestones.
One direction. Your pace." **Header is ALWAYS solid** (`bg-white/90`) so the navbar never goes invisible over dark
hero pages (was the placement-quiz bug). Placement page is light with a single "Find Your Bearing" (QuizEngine owns it).
Custom utilities: `.eyebrow` (mono + red rule), `.btn` + `.btn-primary/red/ghost/cream/cta`, `.chip(-blue/red/ochre)`,
`.card-warm`, `.lift`, `.grain` (paper noise), `.marquee`, `.spotlight-blue/warm`, `.text-french-sweep`,
`.font-serif-italic`, `.pill-*`, `.level-badge`, `.rule-red/blue`, `.link-underline`.

**Fonts (`app/fonts.ts`):** Bricolage Grotesque (display) · Instrument Serif (editorial italic accents) ·
Inter (body) · JetBrains Mono (mono). Vars: `--font-display / --font-serif / --font-body / --font-mono-jb`.

## Architecture decisions (don't undo without reason)
1. **Route group `app/(site)/`** holds all marketing pages + `app/(site)/layout.tsx` (header/footer/dock). Root `app/layout.tsx` is minimal (html/body/fonts) so the Sanity Studio at `/studio` renders WITHOUT site chrome.
2. **Header is always solid** now (`isOverHero` defaults false) because the site is light-dominant — a transparent bar would be invisible on the light hero.
3. Shared nav in `lib/nav.ts` (`PRIMARY_NAV`, `COURSES_MEGA`) — single source for header, mobile, footer.
4. Level pages: one `components/LevelPage.tsx` driven by `lib/levels.ts` (six authored levels).
5. Sanity is **read-only** — no write/editor token, no defineLive/Visual Editing/Presentation. Only schema type: `batch`.

## Key files
| Area | File |
|---|---|
| Design tokens / palette | `app/globals.css` |
| Fonts | `app/fonts.ts` |
| Root layout (minimal) | `app/layout.tsx` |
| Site chrome layout | `app/(site)/layout.tsx` |
| Header + mega-menu | `components/site-header.tsx` |
| Nav config | `lib/nav.ts` |
| Homepage (light hero) | `app/(site)/page.tsx` |
| Level pages | `app/(site)/courses/{a1..c2}/page.tsx` → `components/LevelPage.tsx` + `lib/levels.ts` |
| Course catalogue (kept) | `app/(site)/courses/page.tsx`, `app/(site)/courses/[slug]/page.tsx` |
| Upcoming Batches | `app/(site)/upcoming-batches/page.tsx` |
| Sanity schema/config/client | `sanity/schemaTypes/batch.ts`, `sanity.config.ts`, `sanity/lib/{client,queries,fetch}.ts`, `sanity/env.ts` |
| Studio | `app/studio/[[...tool]]/page.tsx` |
| Revalidate webhook | `app/api/revalidate/route.ts` |
| Redirects (301) | `next.config.mjs` |
| Contact info (has Gmail ⚠️) | `lib/contact.ts` |
| Sanity setup guide | `SANITY-SETUP.md` · env template `.env.local.example` |

## Redirects (in next.config.mjs)
`/playground(/*)` → `/learning-resources(/*)`; 6 long course slugs (`a1-absolute-beginner`, `dalf-c1-masterclass`, …) → short (`/courses/a1` … `/c2`). All verified 308.

## Status — DONE
- Phase 0 token audit + migration (233 hex across 23 files → French palette).
- Phase 1 light-dominant retheme; homepage hero flipped (navy compass medallion on white).
- Phase 2 six level pages, 4-col Courses mega-menu, nav reorder, Playground→Learning Resources rename + redirects.
- Phase 3 Upcoming Batches page + full Sanity integration (schema, Studio, read client, webhook, empty state, Course/Event JSON-LD).
- Phase 4 stat counters render real values (no `0+`), footer year dynamic.
- Production build passes (40 routes, 0 errors).

## TODO / follow-ups
- [ ] **Client action:** complete `SANITY-SETUP.md` (create Sanity project, set `.env.local` + Vercel env vars, wire webhook). Until then `/upcoming-batches` shows empty state and `/studio` shows a setup note.
- [ ] **Gmail swap:** `lib/contact.ts` `EMAIL = 'yuvakeshan16@gmail.com'` → domain address when available.
- [ ] Optional: convert remaining arbitrary-class hex (e.g. `bg-[#0055A4]`) in learn/quiz modules to semantic utilities (`bg-azimuth`). Values are already correct; syntax only.
- [ ] Optional: rename internal `PlaygroundProvider` / `components/playground/` identifiers for literal "zero Playground occurrences" (UI already 0).
- [ ] Optional: flip interior legacy pages (`/learning-resources`, `/courses` catalogue sections, learn modules) fully light using `tone="parchment"` (homepage + new pages already flipped).
- [ ] Optional a11y polish: Lighthouse ≥95 pass, keyboard-open for mega-menu.

## Run locally
```bash
cd french-compass-website-main/french-compass-website-main
npm install          # Sanity packages were added — required
npm run dev          # http://localhost:3000
# prod check: npm run build && npm start
```
`/studio` and `/upcoming-batches` work without Sanity (setup note / empty state) until `.env.local` is filled.
