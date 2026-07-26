import Link from 'next/link'
import Script from 'next/script'
import {
  Compass, Check, ArrowRight, ArrowLeft, CalendarDays, Clock, Users,
  Wallet, CalendarRange, BookOpen, Layers, Video, Hourglass, GraduationCap,
  PencilLine,
} from 'lucide-react'
import { Section, Container, Eyebrow, HeaderSpacer } from '@/components/ui-primitives'
import { Footer } from '@/components/Footer'
import { type LevelData, PARIS_COORD, inr } from '@/lib/levels'

/* One canonical level page, driven by lib/levels.ts. Light-dominant per brief:
   white surfaces lead, French blue is the accent, a single navy CTA band anchors
   the foot of the page. Compass motif appears once, as a low-opacity watermark. */

export function LevelPage({ level }: { level: LevelData }) {
  const batchHref = `/upcoming-batches?level=${encodeURIComponent(level.code)}`

  /* `wide: true` marks a value that is a phrase rather than a figure — those
     drop onto their own line instead of being squeezed against the label. */
  const stats: { icon: typeof Clock; label: string; value: string; wide?: boolean }[] = [
    { icon: Clock, label: 'Duration', value: level.duration },
    { icon: CalendarDays, label: 'Instructor-led live sessions', value: String(level.sessions) },
    { icon: Hourglass, label: 'Session length', value: level.sessionLength },
    { icon: Video, label: 'Mode', value: level.mode },
    { icon: GraduationCap, label: 'Level', value: `CEFR ${level.code}` },
    { icon: Users, label: 'Class size', value: level.classSize },
    { icon: CalendarRange, label: 'Schedule', value: level.schedule, wide: true },
    { icon: PencilLine, label: 'Practice', value: level.practice, wide: true },
    { icon: Check, label: 'Assessment', value: level.assessment, wide: true },
    { icon: Wallet, label: 'Fees', value: inr(level.priceINR) },
  ]

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `${level.code} — ${level.name}`,
    description: level.promise,
    provider: { '@type': 'Organization', name: 'French Compass', sameAs: process.env.NEXT_PUBLIC_SITE_URL || 'https://frenchcompass.com' },
    educationalLevel: level.cefr,
    offers: { '@type': 'Offer', price: level.priceINR, priceCurrency: 'INR', category: 'Paid' },
  }

  return (
    <>
      <Script
        id={`course-schema-${level.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />

      {/* --------------------------- BACK TO ALL COURSES ------------------------- *
       * Level pages are reached straight from the header mega-menu and the footer,
       * so browser-back lands wherever the visitor came from (often the homepage).
       * This gives an explicit, always-correct route up to the catalogue. */}
      <HeaderSpacer />
      <div className="sticky top-[var(--header-h)] z-30 border-b border-ink-text/10 bg-card/95 backdrop-blur">
        <Container className="py-2.5">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-xs sm:text-sm">
              <li>
                <Link
                  href="/courses"
                  className="inline-flex min-h-9 items-center gap-1.5 font-medium text-azimuth transition-colors hover:text-flag-red"
                >
                  <ArrowLeft className="h-4 w-4" />
                  All courses
                </Link>
              </li>
              <li aria-hidden className="text-ink-dim/50">/</li>
              <li className="truncate text-ink-dim">
                {level.code} — {level.name}
              </li>
            </ol>
          </nav>
        </Container>
      </div>

      {/* ---------------------------------- HERO --------------------------------- */}
      <Section tone="parchment" className="relative overflow-hidden pt-[clamp(2rem,5vw,4rem)]">
        {/* compass watermark — the motif as supporting texture, used once */}
        <Compass
          aria-hidden
          strokeWidth={0.5}
          className="pointer-events-none absolute -right-16 -top-10 h-[26rem] w-[26rem] text-azimuth/[0.05]"
        />
        <div className="relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Eyebrow coord={PARIS_COORD}>{level.cefr}</Eyebrow>
            <div className="mt-6 flex items-center gap-4">
              <span className="grid h-16 w-16 place-items-center rounded-2xl border border-azimuth/25 bg-azimuth/[0.06] font-mono text-2xl font-semibold text-azimuth">
                {level.code}
              </span>
              <div className="rule-red" />
            </div>
            <h1 className="mt-6 font-display fs-4 leading-[1.02]">{level.name}</h1>
            <p className="mt-5 max-w-[46ch] fs-1 leading-relaxed text-ink-dim">{level.promise}</p>
            <p className="mt-3 max-w-[46ch] text-sm leading-relaxed text-ink-dim">{level.who}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={batchHref} className="btn-cta">
                Reserve your seat <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#syllabus" className="btn-ghost">View the syllabus</a>
            </div>
          </div>

          {/* at-a-glance card */}
          <div className="rounded-2xl border border-ink-text/10 bg-card p-6 shadow-[var(--shadow-card)] sm:p-8">
            <p className="eyebrow text-brass">At a glance</p>
            <dl className="mt-5 divide-y divide-ink-text/[0.08]">
              {stats.map(({ icon: Icon, label, value, wide }) => (
                <div
                  key={label}
                  className={
                    wide
                      ? 'grid grid-cols-[2.5rem_1fr] gap-x-4 gap-y-1 py-3.5'
                      : 'grid grid-cols-[2.5rem_1fr_auto] items-center gap-x-4 py-3.5'
                  }
                >
                  <span
                    className={`grid h-10 w-10 shrink-0 place-items-center self-start rounded-lg border border-azimuth/20 text-azimuth ${
                      wide ? 'row-span-2' : ''
                    }`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <dt className="text-sm text-ink-dim">{label}</dt>
                  <dd
                    className={`font-mono text-sm font-medium text-ink-text ${
                      wide ? 'col-start-2 text-balance' : 'text-right'
                    }`}
                  >
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      {/* ------------------------- WHAT YOU'LL BE ABLE TO DO ---------------------- */}
      <Section tone="parchment" className="!pt-0">
        <div className="rounded-[20px] border border-ink-text/10 bg-parchment2 p-8 sm:p-12">
          <p className="eyebrow text-brass">By the end of the course</p>
          <div className="rule-blue mt-3" />
          <ul className="mt-8 grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {level.outcomes.map((o) => (
              <li key={o} className="flex gap-3">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-azimuth/10 text-azimuth">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                <span className="fs-0 leading-relaxed text-ink-text">{o}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* -------------------------------- SYLLABUS ------------------------------- */}
      <Section tone="parchment" id="syllabus" className="!pt-0">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow text-brass">The syllabus</p>
            <h2 className="mt-3 font-display fs-2">What we cover in {level.code}</h2>
            <div className="rule-red mt-4" />
            <p className="mt-4 max-w-[38ch] leading-relaxed text-ink-dim">
              Every session is live and taught in small groups by C1-certified instructors — no recordings, no autopilot.
            </p>
          </div>
          <ol className="space-y-3">
            {level.syllabus.map((s, i) => (
              <li key={s} className="flex items-start gap-4 rounded-xl border border-ink-text/10 bg-card p-4 shadow-[var(--elev-1)]">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-azimuth/[0.08] font-mono text-sm font-semibold text-azimuth">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="fs-0 leading-relaxed text-ink-text">{s}</span>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* ---------------------- COMBINATION TRACKS + E-BOOK ---------------------- */}
      {(level.comboTracks.length > 0 || level.ebook) && (
        <Section tone="parchment" className="!pt-0">
          <div className="grid gap-6 md:grid-cols-2">
            {level.comboTracks.length > 0 && (
              <div className="rounded-2xl border border-ink-text/10 bg-card p-8 shadow-[var(--shadow-card)]">
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-azimuth/20 text-azimuth">
                  <Layers className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <h3 className="mt-5 font-display text-xl text-ink-text">Combination tracks with {level.code}</h3>
                <p className="mt-2 text-sm text-ink-dim">Bundle {level.code} with adjacent levels — one continuous curriculum, better value.</p>
                <ul className="mt-5 space-y-2">
                  {level.comboTracks.map((t) => (
                    <li key={t.href}>
                      <Link href={t.href} className="group flex items-center justify-between rounded-lg border border-ink-text/[0.08] bg-parchment2 px-4 py-3 text-sm font-medium text-ink-text transition-colors hover:border-azimuth/30">
                        {t.label}
                        <ArrowRight className="h-4 w-4 text-azimuth transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {level.ebook && (
              <div className="rounded-2xl border border-ink-text/10 bg-card p-8 shadow-[var(--shadow-card)]">
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-brass/30 text-brass">
                  <BookOpen className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <h3 className="mt-5 font-display text-xl text-ink-text">The matching vocabulary book</h3>
                <p className="mt-2 text-sm text-ink-dim">A themed reference built for {level.code} students — the same words you'll meet in class and in the exam.</p>
                <Link href={level.ebook.href} className="mt-5 inline-flex items-center gap-2 font-medium text-azimuth hover:text-flag-red">
                  {level.ebook.label} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </div>
        </Section>
      )}

      {/* ----------------------------- PREV / NEXT ------------------------------- */}
      <Section tone="parchment" className="!pt-0">
        <div className="rounded-2xl border border-ink-text/10 bg-parchment2 p-6 sm:p-8">
          <p className="eyebrow text-brass">Where this sits on the map</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {level.prev ? (
              <Link href={level.prev.href} className="group flex items-center gap-3 rounded-xl border border-ink-text/10 bg-card p-5 transition-colors hover:border-azimuth/30">
                <ArrowLeft className="h-5 w-5 text-azimuth" />
                <span>
                  <span className="block text-xs uppercase tracking-wide text-ink-dim">Comes before</span>
                  <span className="font-medium text-ink-text">{level.prev.label}</span>
                </span>
              </Link>
            ) : <div className="hidden sm:block" />}
            {level.next && (
              <Link href={level.next.href} className="group flex items-center justify-end gap-3 rounded-xl border border-ink-text/10 bg-card p-5 text-right transition-colors hover:border-azimuth/30">
                <span>
                  <span className="block text-xs uppercase tracking-wide text-ink-dim">What comes next</span>
                  <span className="font-medium text-ink-text">{level.next.label}</span>
                </span>
                <ArrowRight className="h-5 w-5 text-azimuth" />
              </Link>
            )}
          </div>
        </div>
      </Section>

      {/* --------------------------------- FAQs ---------------------------------- */}
      <Section tone="parchment" className="!pt-0">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <p className="eyebrow text-brass">Questions</p>
            <h2 className="mt-3 font-display fs-2">Good to know about {level.code}</h2>
          </div>
          <div className="mt-10 space-y-3">
            {level.faqs.map((f) => (
              <details key={f.q} className="group rounded-xl border border-ink-text/10 bg-card p-5 shadow-[var(--elev-1)]">
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-medium text-ink-text marker:content-none">
                  {f.q}
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-azimuth/30 text-azimuth transition-transform group-open:rotate-45">
                    <span className="text-lg leading-none">+</span>
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-ink-dim">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      {/* --------------------------- REGISTRATION CTA ---------------------------- */}
      <Section tone="ink" className="relative overflow-hidden">
        <Compass aria-hidden strokeWidth={0.5} className="pointer-events-none absolute -left-10 -bottom-16 h-80 w-80 text-foam/[0.05]" />
        <div className="relative mx-auto max-w-2xl text-center">
          <p className="eyebrow text-brass-soft">Set your bearing</p>
          <h2 className="mt-3 font-display fs-3 text-foam">Ready to start {level.code}?</h2>
          <p className="mx-auto mt-4 max-w-[44ch] leading-relaxed text-foam-dim">
            See the next {level.code} cohorts, dates and seats — then reserve your place.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href={batchHref} className="btn-cta">
              View {level.code} batches <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/contact" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius)] border border-foam/25 px-6 font-medium text-foam transition-colors hover:border-brass/60 hover:text-brass-soft">
              Talk to an advisor
            </Link>
          </div>
        </div>
      </Section>

      <Footer />
    </>
  )
}
