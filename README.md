# French Compass

Marketing and course website for **French Compass** — live French classes (A1–C2), TEF/TCF Canada exam prep, DALF masterclasses, and interactive learning tools. Built with the Next.js App Router and a self-serve, Sanity-powered "Upcoming Batches" page so the team can publish new cohorts without touching code.

---

## Tech stack

| Area | Choice |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) · React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (design tokens in `app/globals.css`) |
| Fonts | Bricolage Grotesque · Instrument Serif · Inter · JetBrains Mono |
| Animation | Framer Motion |
| CMS | Sanity v5 + next-sanity v13 (Upcoming Batches) |
| Contact form | Web3Forms (email delivery, no backend) |
| Hosting | Vercel |

Brand palette: **French Blue `#0055A4` · White `#FFFFFF` · French Red `#EF4135`**.

---

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm run start      # serve the production build
npm run lint       # lint
```

---

## Environment variables

Copy `.env.local.example` to `.env.local` and fill in the values:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project that powers Upcoming Batches |
| `NEXT_PUBLIC_SANITY_DATASET` | Usually `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Pinned API date (e.g. `2024-10-01`) |
| `SANITY_REVALIDATE_SECRET` | Shared secret for the publish webhook |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | Contact-form email delivery key |
| `NEXT_PUBLIC_SITE_URL` | Production URL (used in the sitemap) |

The site runs without these — Upcoming Batches shows an empty state, `/studio` shows a setup note, and the contact form falls back to WhatsApp/email hand-off links.

---

## Project structure

```
app/
  (site)/              Marketing pages (share the header/footer layout)
    page.tsx           Home
    courses/           Catalogue + six level pages (a1…c2) + [slug] detail
    upcoming-batches/  Sanity-backed batch listing
    learning-resources/  Placement quiz & interactive tools
    about · contact · testimonials
  studio/              Embedded Sanity Studio (/studio) — no site chrome
  api/revalidate/      Sanity publish webhook
components/            UI components (header/footer, cards, motion, learn modules)
lib/                   Data & helpers (courses, levels, nav, contact, seo)
sanity/                Schema (`batch`), client, GROQ queries, fetch helpers
public/                Static assets
```

---

## Content management — Upcoming Batches

The **Upcoming Batches** page (`/upcoming-batches`) is edited through the embedded **Sanity Studio** at `/studio`. Editors add a batch, press Publish, and the live page updates automatically (sorted by start date; past batches hide themselves).

Full setup instructions — creating the Sanity project, environment variables, CORS, and the publish webhook — are in **[`SANITY-SETUP.md`](./SANITY-SETUP.md)**.

---

## Deployment

Deployed on **Vercel**. Push to the default branch to trigger a build, and add the environment variables above in the Vercel project settings. Once the domain is live, point its DNS at Vercel and add the domain to Sanity's CORS origins and the revalidation webhook URL (see `SANITY-SETUP.md`).
