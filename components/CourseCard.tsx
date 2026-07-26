'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Course } from '@/lib/courses'

interface CourseCardProps {
  course: Course
  onClick?: () => void
}

export function CourseCard({ course, onClick }: CourseCardProps) {
  const isEbook = course.goal === 'conversation' && course.slug.includes('ebook')
  const isCefr = ['A1', 'A2', 'B1', 'B2'].includes(course.level)

  return (
    <Link
      href={`/courses/${course.slug}`}
      onClick={onClick}
      className="group block h-full rounded-2xl focus-visible:outline-none"
    >
      <article
        className={cn(
          'edge-lit lift relative flex h-full flex-col rounded-2xl',
          'border border-ink-text/10 bg-card p-6 shadow-[var(--elev-2)]',
          'group-hover:border-brass/35 group-focus-visible:border-brass/60',
        )}
      >
        {/* Warm sheen that rises from the lower edge on hover. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(420px 200px at 50% 115%, rgba(192,138,45,0.14), transparent 70%)',
          }}
        />

        <div className="relative flex items-baseline gap-2">
          <span className="font-mono text-2xl font-bold tracking-tight text-brass md:text-3xl">
            {course.code}
          </span>
          {isCefr && (
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-dim">
              CEFR
            </span>
          )}
        </div>

        <span className="relative mt-1 font-mono text-xs uppercase tracking-[0.14em] text-ink-dim">
          {course.tier}
        </span>

        <h3 className="relative mt-2 font-display text-base font-semibold text-balance text-ink-text md:text-lg">
          {course.title}
        </h3>

        <p className="relative mt-1.5 flex-grow text-sm leading-relaxed text-pretty text-ink-dim">
          {course.blurb}
        </p>

        <div className="relative mt-3 flex flex-wrap gap-1.5">
          {course.highlights.slice(0, 2).map((highlight) => (
            <span
              key={highlight}
              className="inline-block rounded-full bg-parchment2 px-2.5 py-0.5 text-xs text-ink-text"
            >
              {highlight}
            </span>
          ))}
        </div>

        {/* Duration + session count, matching the "At a glance" figures on the
            level pages. Fees are no longer published anywhere on the site. */}
        <div className="relative mt-4 border-t border-ink-text/10 pt-3">
          <div className="flex items-center justify-between gap-2">
            <div>
              <span className="text-xs text-ink-dim">Duration</span>
              <p className="font-mono text-xs font-semibold text-ink-text md:text-sm">
                {course.duration}
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-ink-dim">Live sessions</span>
              <p className="font-mono text-xs font-semibold tabular-nums text-ink-text md:text-sm">
                {course.sessions}
              </p>
            </div>
          </div>
        </div>

        {/* Deliberately a <span>, not a <button>: the whole card is already the
            link, and nesting an interactive control inside an anchor is invalid
            markup and confuses screen readers. */}
        <span className="relative mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-azimuth py-2.5 text-sm font-medium text-foam transition-colors duration-300 group-hover:bg-azimuth-lift">
          {isEbook ? 'Get E-Book' : 'View Course'}
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            strokeWidth={2}
          />
        </span>
      </article>
    </Link>
  )
}
