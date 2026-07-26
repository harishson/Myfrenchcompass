import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import {
  Compass, CalendarDays, Clock, Users, Wallet, ArrowRight, MessageCircle, Hourglass,
} from 'lucide-react'
import { Section, Eyebrow, HeaderSpacer } from '@/components/ui-primitives'
import { Footer } from '@/components/Footer'
import { getBatches } from '@/sanity/lib/fetch'
import { type Batch } from '@/sanity/lib/queries'
import { inr } from '@/lib/levels'
import { whatsappLink, WHATSAPP_DISPLAY } from '@/lib/contact'

export const metadata: Metadata = {
  title: 'Upcoming Batches — French Compass',
  description: 'See the next live French cohorts — start dates, schedules, seats and fees — and reserve your place. Batches update the moment a new intake is announced.',
  alternates: { canonical: '/upcoming-batches' },
  openGraph: {
    title: 'Upcoming Batches — French Compass',
    description: 'The next live French cohorts — dates, seats and fees. Reserve your seat.',
    type: 'website',
    siteName: 'French Compass',
    url: '/upcoming-batches',
  },
}

const WA = whatsappLink('I would like to know about upcoming French batches')

const FILTERS = ['All', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'TEF', 'TCF', 'DELF', 'DALF', 'Workshop']

const pillClass = (status: Batch['status']) =>
  status === 'Open' ? 'pill pill-open' : status === 'Filling Fast' ? 'pill pill-filling' : 'pill pill-full'

function formatDate(iso?: string) {
  if (!iso) return null
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return null
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

function BatchCard({ batch }: { batch: Batch }) {
  const start = formatDate(batch.startDate)
  const deadline = formatDate(batch.enrolDeadline)
  const full = batch.status === 'Full'

  const facts = [
    start && { icon: CalendarDays, label: 'Starts', value: start },
    batch.schedule && { icon: Clock, label: 'Schedule', value: batch.schedule },
    batch.duration && { icon: Hourglass, label: 'Duration', value: batch.duration },
    typeof batch.seatsAvailable === 'number' && {
      icon: Users, label: 'Seats', value: full ? 'No seats left' : `${batch.seatsAvailable} available`,
    },
  ].filter(Boolean) as { icon: typeof Users; label: string; value: string }[]

  return (
    <article className="lift flex flex-col rounded-2xl border border-ink-text/10 bg-card p-6 shadow-[var(--shadow-card)]">
      <div className="flex items-start justify-between gap-3">
        <span className="level-badge">{batch.level}</span>
        <span className={pillClass(batch.status)}>{batch.status}</span>
      </div>

      <h2 className="mt-4 font-display text-xl leading-snug text-ink-text">{batch.courseName}</h2>

      <dl className="mt-5 space-y-3 border-t border-ink-text/[0.08] pt-5">
        {facts.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-3">
            <Icon className="h-4 w-4 shrink-0 text-azimuth" strokeWidth={1.75} />
            <dt className="text-sm text-ink-dim">{label}</dt>
            <dd className="ml-auto text-right font-mono text-sm text-ink-text">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 rounded-xl border border-ink-text/[0.08] bg-parchment2 p-4">
        <div className="flex items-baseline gap-2">
          <Wallet className="h-4 w-4 translate-y-0.5 text-azimuth" strokeWidth={1.75} />
          <span className="font-mono text-lg font-semibold text-ink-text">
            {typeof batch.fees === 'number' ? inr(batch.fees) : 'Contact us'}
          </span>
        </div>
        {batch.feeNote && <p className="mt-1 pl-6 text-xs text-flag-red">{batch.feeNote}</p>}
        {deadline && <p className="mt-1 pl-6 text-xs text-ink-dim">Enrol by {deadline}</p>}
      </div>

      <div className="mt-5 flex-1" />
      {full ? (
        <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-ghost mt-2 w-full">
          Join the waitlist
        </a>
      ) : (
        <a
          href={batch.registrationUrl || WA}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-cta mt-2 w-full"
        >
          Reserve your seat <ArrowRight className="h-4 w-4" />
        </a>
      )}
    </article>
  )
}

function EmptyState() {
  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-ink-text/10 bg-card p-10 text-center shadow-[var(--shadow-card)]">
      <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-azimuth/25 text-azimuth">
        <Compass className="h-7 w-7" strokeWidth={1.5} />
      </span>
      <h2 className="mt-6 font-display text-2xl text-ink-text">The next intake isn't announced yet</h2>
      <p className="mx-auto mt-3 max-w-[42ch] leading-relaxed text-ink-dim">
        New cohorts open regularly. Message us on WhatsApp and we'll tell you the moment the next batch for your level
        is scheduled — and hold you a seat.
      </p>
      <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-cta mt-7">
        <MessageCircle className="h-4 w-4" /> Ask about the next batch
      </a>
      <p className="mt-3 font-mono text-xs text-ink-dim">{WHATSAPP_DISPLAY}</p>
    </div>
  )
}

export default async function UpcomingBatchesPage({
  searchParams,
}: {
  searchParams: Promise<{ level?: string }>
}) {
  const { level } = await searchParams
  const all = await getBatches()
  const active = level && FILTERS.includes(level) ? level : 'All'
  const batches = active === 'All' ? all : all.filter((b) => b.level === active)

  // Course + Event JSON-LD for the visible batches.
  const jsonLd = batches.map((b) => ({
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: b.courseName,
    provider: { '@type': 'Organization', name: 'French Compass', sameAs: process.env.NEXT_PUBLIC_SITE_URL || 'https://frenchcompass.com' },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      startDate: b.startDate,
      ...(b.registrationUrl ? { url: b.registrationUrl } : {}),
    },
    ...(typeof b.fees === 'number'
      ? { offers: { '@type': 'Offer', price: b.fees, priceCurrency: 'INR', availability: b.status === 'Full' ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock' } }
      : {}),
  }))

  return (
    <>
      {jsonLd.length > 0 && (
        <Script
          id="batches-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <HeaderSpacer />
      <Section tone="parchment" className="relative overflow-hidden pt-[clamp(2rem,5vw,4rem)] pb-10">
        <Compass aria-hidden strokeWidth={0.5} className="pointer-events-none absolute -right-16 -top-8 h-96 w-96 text-azimuth/[0.05]" />
        <div className="relative max-w-3xl">
          <Eyebrow coord="N 48°51′ · E 2°21′">Set your bearing</Eyebrow>
          <h1 className="mt-6 font-display fs-4 leading-[1.02]">Upcoming Batches</h1>
          <div className="rule-red mt-5" />
          <p className="mt-5 max-w-[52ch] fs-1 leading-relaxed text-ink-dim">
            Every live cohort we've scheduled, soonest first. Pick your level, check the dates and seats, and reserve
            your place in a small group taught by C1-certified instructors.
          </p>
        </div>

        {/* Level filter — links, so it works without JS and is shareable */}
        <div className="relative mt-8 flex flex-wrap gap-2">
          {FILTERS.map((f) => {
            const activeChip = f === active
            return (
              <Link
                key={f}
                href={f === 'All' ? '/upcoming-batches' : `/upcoming-batches?level=${f}`}
                scroll={false}
                className={
                  'rounded-full border px-3.5 py-1.5 font-mono text-xs transition-colors ' +
                  (activeChip
                    ? 'border-azimuth bg-azimuth text-foam'
                    : 'border-ink-text/15 text-ink-dim hover:border-azimuth/40 hover:text-azimuth')
                }
              >
                {f}
              </Link>
            )
          })}
        </div>
      </Section>

      <Section tone="parchment" className="!pt-0 pb-[clamp(4rem,8vw,8rem)]">
        {batches.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {batches.map((b) => (
              <BatchCard key={b._id} batch={b} />
            ))}
          </div>
        ) : all.length > 0 ? (
          // Batches exist, just none for this filter.
          <div className="mx-auto max-w-xl rounded-2xl border border-ink-text/10 bg-card p-10 text-center shadow-[var(--shadow-card)]">
            <h2 className="font-display text-2xl text-ink-text">No {active} batches scheduled right now</h2>
            <p className="mx-auto mt-3 max-w-[40ch] leading-relaxed text-ink-dim">
              Nothing open for {active} at the moment. See every level, or ask us about the next {active} intake.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/upcoming-batches" className="btn-ghost">View all batches</Link>
              <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-cta">
                <MessageCircle className="h-4 w-4" /> Ask about {active}
              </a>
            </div>
          </div>
        ) : (
          <EmptyState />
        )}
      </Section>

      <Footer />
    </>
  )
}
