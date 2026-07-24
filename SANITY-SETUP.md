# Upcoming Batches — Sanity CMS setup

The **Upcoming Batches** page (`/upcoming-batches`) is powered by Sanity so you
can add, edit and remove batches yourself — no code, no redeploy. Everything is
already built; this guide connects it to *your* Sanity project.

Until you complete Step 1–2, the site still runs fine: the page shows its
"next intake isn't announced yet" empty state, and `/studio` shows a short
setup note instead of crashing.

> **Time needed:** ~15 minutes, once.

---

## What's already built (you don't need to touch code)

| Piece | Location |
|---|---|
| Batch content model (`batch`) | `sanity/schemaTypes/batch.ts` |
| Studio config | `sanity.config.ts` |
| Embedded Studio (admin) | `/studio` |
| Read client (`useCdn:false`, pinned API) | `sanity/lib/client.ts` |
| GROQ query (hides past batches automatically) | `sanity/lib/queries.ts` |
| Server-side fetch (cache-tagged `batch`) | `sanity/lib/fetch.ts` |
| Live-update webhook | `app/api/revalidate/route.ts` |
| The public page | `app/(site)/upcoming-batches/page.tsx` |

---

## Step 1 — Create a Sanity project (free)

1. Go to **https://www.sanity.io** and sign up / log in.
2. Open **https://www.sanity.io/manage** → **Create new project**.
3. Name it (e.g. *French Compass*). When asked for a dataset, choose
   **`production`** and keep it **Public** (this site only *reads* — a public
   dataset needs no token).
4. On the project page, copy the **Project ID** (looks like `a1b2c3d4`).

## Step 2 — Add your environment variables

Create a file named **`.env.local`** in the project root (copy
`.env.local.example`) and fill it in:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-10-01
SANITY_REVALIDATE_SECRET=paste_a_long_random_string_here
```

Generate the secret with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Then restart the dev server (`npm run dev`).

## Step 3 — Allow the Studio to talk to Sanity (CORS)

In **sanity.io/manage → your project → API → CORS origins**, add:

- `http://localhost:3000`  (for local development)
- `https://updated-french-compass.vercel.app`  (your live site)

Leave "Allow credentials" **off**.

## Step 4 — Open the Studio and add a batch

1. Visit **`/studio`** (locally `http://localhost:3000/studio`).
2. Log in with the same Sanity account.
3. Click **Upcoming Batch → Create new**, fill in the fields (each has a helper
   note under it), and press **Publish**.

That's it — the batch appears on `/upcoming-batches`, sorted by start date.
Past batches vanish on their own once the start date passes.

### Field guide

| Field | What to enter |
|---|---|
| Course name | What students see, e.g. `A2 — Elementary` |
| Level | Pick from the dropdown — drives the badge and the level filter |
| Start date | The first class day (past dates auto-hide the batch) |
| Schedule | e.g. `Mon, Tue, Thu, Fri — 7:00–8:30 PM IST` |
| Duration | e.g. `8 weeks` |
| Seats available | 0–50. Set 0 + status **Full** when sold out |
| Fees | **Number only** — no ₹, no commas. The site formats it |
| Fee note | Optional, e.g. `Early-bird: ₹1,000 off until 20 July` |
| Registration link | Where "Reserve your seat" goes (form, `https://wa.me/…`, `mailto:`, `tel:`) |
| Status | Open / Filling Fast / Full |
| Enrolment deadline | Optional last date to register |

---

## Step 5 — Live updates without a redeploy (webhook)

So the live site refreshes the instant you publish:

1. In **sanity.io/manage → your project → API → Webhooks → Create webhook**.
2. Fill in:
   - **Name:** `Revalidate batches`
   - **URL:** `https://updated-french-compass.vercel.app/api/revalidate`
   - **Dataset:** `production`
   - **Trigger on:** Create, Update, Delete
   - **Filter:** `_type == "batch"`
   - **HTTP method:** `POST`
   - **API version:** `v2021-03-25` (or later)
   - **Secret:** paste the **same** `SANITY_REVALIDATE_SECRET` value from `.env.local`
3. Save.

Now publishing/editing/deleting a batch revalidates the page within seconds.

## Step 6 — Add the env vars to Vercel

In **Vercel → your project → Settings → Environment Variables**, add all four
variables from `.env.local` (for Production, Preview and Development), then
redeploy once so they take effect.

---

## Notes

- This site is **read-only** against Sanity — no editor/write token is created
  or needed, and no Presentation/Visual-Editing tooling is enabled.
- The only content type is `batch`. Don't add others unless the site is
  extended to use them.
- Level pages deep-link here filtered by level, e.g. `/upcoming-batches?level=B2`.
