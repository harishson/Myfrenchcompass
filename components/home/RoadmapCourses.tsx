import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { JourneyIcons } from '@/components/TutorIcons'
import { Reveal } from '@/components/Reveal'

const WAYPOINTS = [
  { level: 'A1', label: 'Starter', icon: <JourneyIcons.layers /> },
  { level: 'A2', label: 'Pioneer', icon: <JourneyIcons.book /> },
  { level: 'B1', label: 'Explorer', icon: <JourneyIcons.pin /> },
  { level: 'B2', label: 'Navigator', icon: <JourneyIcons.leaf /> },
  { level: 'C1', label: 'Cartographer', icon: <JourneyIcons.overlapping /> },
  { level: 'C2', label: 'Expedition Lead', icon: <JourneyIcons.star /> },
]

const TIERS = [
  {
    tag: 'Core',
    title: 'Core Levels (A1–B2)',
    desc: 'Foundation to fluent debate in 90-min live classes.',
  },
  {
    tag: 'Exam',
    title: 'Exam Prep (TEF/TCF, DELF)',
    desc: 'Targeted drills for CLB 7 or certification scores.',
  },
  {
    tag: 'Master',
    title: 'Masterclasses (C1/C2)',
    desc: 'Nuance, debate, and real-world French immersion.',
  },
]

/**
 * Compact section that merges the A1→C2 roadmap and the "Courses for every
 * goal" tiers into a single, space-efficient block on the dark ink surface.
 */
export function RoadmapCourses() {
  return (
    <section id="journey" className="on-ink py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-gutter">
        {/* Header */}
        <Reveal>
          <div className="text-center mb-10 md:mb-12">
            <p className="font-mono text-xs uppercase tracking-widest text-brass mb-3">
              Your expedition · Pick your passage
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-foam tracking-tight text-balance">
              From A1 to C2 — your route and your courses
            </h2>
            <p className="text-foam-dim mt-3 text-base md:text-lg">
              Six milestones. One direction. Your pace.
            </p>
          </div>
        </Reveal>

        {/* Compact roadmap */}
        <Reveal delay={80}>
          <div className="rounded-2xl border border-foam/10 bg-foam/[0.03] p-5 md:p-8">
            <div className="relative">
              {/* Connecting line (sm+) */}
              <div className="pointer-events-none absolute left-[8%] right-[8%] top-6 hidden h-0.5 bg-brass/40 sm:block" />
              <ol className="relative z-10 grid grid-cols-3 gap-y-6 sm:grid-cols-6">
                {WAYPOINTS.map((w) => (
                  <li key={w.level} className="flex flex-col items-center text-center">
                    <span className="grid h-12 w-12 place-items-center rounded-full border-2 border-brass bg-ink text-brass">
                      <span className="h-5 w-5">{w.icon}</span>
                    </span>
                    <span className="mt-2 font-mono text-sm font-semibold text-brass">
                      {w.level}
                    </span>
                    <span className="text-[11px] text-brass/60">{w.label}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Divider */}
            <div className="my-6 md:my-8 h-px bg-foam/10" />

            {/* Course tiers */}
            <div className="grid gap-4 md:grid-cols-3">
              {TIERS.map((t) => (
                <div
                  key={t.title}
                  className="rounded-xl border border-foam/10 bg-ink-panel/60 p-4 transition-colors hover:border-brass/40 hover:bg-ink-panel"
                >
                  <p className="font-mono text-[11px] uppercase tracking-wider text-brass mb-1.5">
                    {t.tag}
                  </p>
                  <p className="font-semibold text-foam leading-snug">{t.title}</p>
                  <p className="text-sm text-foam-dim mt-1 leading-relaxed">{t.desc}</p>
                </div>
              ))}
            </div>

            {/* Footer row: goal note + CTA */}
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-foam-dim leading-relaxed max-w-xl">
                <span className="text-foam font-medium">Your goal sets your route:</span>{' '}
                B2 for immigration, DELF prestige, or fluent chat — we customize the whole
                journey to your timeline.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-azimuth hover:bg-azimuth-lift text-foam font-semibold shrink-0"
              >
                <Link href="/courses">Browse all programs</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
