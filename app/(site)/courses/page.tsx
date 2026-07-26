'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'motion/react'
import { Footer } from '@/components/Footer'
import { Section } from '@/components/Section'
import { CourseCard } from '@/components/CourseCard'
import { Button } from '@/components/ui/button'
import { courses } from '@/lib/courses'
import { whatsappLink } from '@/lib/contact'
import { Compass } from 'lucide-react'

type GoalFilter = 'all' | 'core' | 'certification' | 'conversation'
type SortKey = 'level' | 'title'

const COURSE_FILTERS: { id: GoalFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'core', label: 'Core Levels' },
  { id: 'certification', label: 'Exams' },
  { id: 'conversation', label: 'Resources' },
]

export default function CoursesPage() {
  const [activeFilter, setActiveFilter] = useState<GoalFilter>('all')
  const [sortBy, setSortBy] = useState<SortKey>('level')
  const reduce = useReducedMotion()

  const filteredCourses =
    activeFilter === 'all'
      ? courses
      : courses.filter((c) => c.goal === activeFilter)

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title)
    }
    // level: custom order
    const levelOrder = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
    const aLevel = levelOrder.indexOf(a.level.split('–')[0].trim())
    const bLevel = levelOrder.indexOf(b.level.split('–')[0].trim())
    return aLevel - bLevel
  })

  return (
    <>
      {/* Hero — top padding is derived from the real header height, otherwise the
          eyebrow sits underneath the fixed navbar on small screens. */}
      <Section
        variant="ink"
        className="pt-[calc(var(--header-h)+2rem)] pb-8 md:pt-[calc(var(--header-h)+3.5rem)] md:pb-12"
      >
        <div className="mx-auto max-w-3xl text-center">
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-[#EF4135] md:text-xs">
            All Courses
          </span>
          <h1 className="mt-3 font-display text-[clamp(2rem,1.2rem+3.6vw,3.75rem)] font-semibold leading-[1.05] text-[#FFFFFF]">
            Choose Your Route
          </h1>
          <p className="mx-auto mt-4 max-w-[46ch] text-balance text-base leading-relaxed text-[#C6DAF0] md:text-lg">
            From your first <em>bonjour</em> to fluent French. {courses.length} pathways
            to match your goal.
          </p>
        </div>
      </Section>

      {/* Intro + placement nudge */}
      <Section variant="parchment" className="pt-8 pb-6 md:pt-12 md:pb-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-balance text-base leading-relaxed text-[#5C6B82] md:text-lg">
            Whether you&apos;re chasing a CLB 7 for Express Entry, preparing for DELF, or simply want to hold a real conversation in Paris — every route starts with the right level. French Compass offers {courses.length} structured pathways, each taught live by C1-certified instructors who&apos;ve lived the language, not just studied it.
          </p>
          <p className="mt-4 text-balance text-sm italic text-[#5C6B82] md:text-base">
            Not sure where you stand? The placement quiz takes 2 minutes and tells you exactly where to begin.
          </p>
          <div className="mt-6 flex justify-center">
            <Button
              asChild
              className="bg-[#EF4135] text-[#FFFFFF] hover:bg-[#FF7A70]"
            >
              <Link href="/learning-resources/placement">Find Your Level →</Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* Filter + sort toolbar. Sticks under the header so the controls stay
          reachable while scrolling a long grid. */}
      <div className="sticky top-[var(--header-h)] z-20 border-y border-ink-text/10 bg-parchment/95 backdrop-blur">
        <div className="mx-auto max-w-6xl px-gutter py-3">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            {/* Goal filter — horizontal scroll on mobile, wraps from `lg`.
                The negative margin lets the scroll area bleed to the screen
                edge so chips don't look clipped mid-swipe. */}
            <div
              className="-mx-gutter overflow-x-auto px-gutter [scrollbar-width:none] lg:mx-0 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
              role="group"
              aria-label="Filter courses by goal"
            >
              <div className="flex w-max gap-2 lg:w-auto lg:flex-wrap">
                {COURSE_FILTERS.map(({ id, label }) => {
                  const active = activeFilter === id
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setActiveFilter(id)}
                      // aria-pressed, not just colour: the active filter has to
                      // be announced, not only shown.
                      aria-pressed={active}
                      className={`flex min-h-10 shrink-0 items-center whitespace-nowrap rounded-lg px-3.5 font-mono text-xs font-semibold transition-colors sm:px-4 md:text-sm ${
                        active
                          ? 'bg-azimuth text-foam'
                          : 'bg-parchment2 text-ink-text hover:bg-brass-soft'
                      }`}
                    >
                      {label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Sort + live result count. `flex-none` on the select stops it
                stretching to the full row width on narrow screens. */}
            <div className="flex items-center gap-3">
              <p aria-live="polite" className="hidden text-xs text-ink-dim sm:block">
                {sortedCourses.length} {sortedCourses.length === 1 ? 'course' : 'courses'}
              </p>
              <label htmlFor="course-sort" className="shrink-0 text-xs text-ink-dim md:text-sm">
                Sort by
              </label>
              <select
                id="course-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortKey)}
                className="min-h-10 flex-none rounded-lg border border-ink-dim/20 bg-card px-3 text-xs text-ink-text focus:outline-none focus:ring-2 focus:ring-azimuth md:text-sm"
              >
                <option value="level">Level</option>
                <option value="title">Title (A–Z)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <Section variant="parchment" className="py-6 md:py-8">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          {sortedCourses.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-[#5C6B82]">No courses found for this filter.</p>
            </div>
          ) : (
            <div
              key={`${activeFilter}-${sortBy}`}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
            >
              {sortedCourses.map((course, i) => (
                <motion.div
                  key={course.id}
                  initial={reduce ? false : { opacity: 0, y: 18 }}
                  animate={reduce ? undefined : { opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                    delay: Math.min(i * 0.05, 0.4),
                  }}
                >
                  <CourseCard course={course} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </Section>

      {/* CTA Section */}
      <Section variant="ink" className="py-6 md:py-8">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <div className="inline-flex items-center gap-2 mb-4 md:mb-6">
            <Compass className="w-4 md:w-5 h-4 md:h-5 text-[#EF4135]" />
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-[#EF4135]">
              Still navigating?
            </span>
          </div>
          <h2 className="font-display text-2xl md:text-4xl font-semibold text-[#FFFFFF] mb-3 md:mb-4">
            Not sure which course is right for you?
          </h2>
          <p className="text-sm md:text-base text-[#C6DAF0] mb-6 md:mb-8 max-w-2xl mx-auto">
            Take our placement quiz to find your level in 2 minutes, or message us
            directly. We&apos;ll help you chart the best course.
          </p>
          <div className="flex flex-col gap-3 md:gap-4 justify-center">
            <Button
              asChild
              className="bg-[#0055A4] text-[#FFFFFF] hover:bg-[#1466BE] w-full md:w-auto md:inline-block"
            >
              <Link href="/learning-resources/placement">Find Your Level</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-[#FFFFFF]/20 text-[#FFFFFF] hover:bg-[#FFFFFF]/10 w-full md:w-auto md:inline-block"
            >
              <a
                href={whatsappLink("I'd like help choosing a course.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                Message us on WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </Section>

      <Footer />
    </>
  )
}
