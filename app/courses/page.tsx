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
type SortKey = 'level' | 'price' | 'title'

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
    if (sortBy === 'price') {
      return a.priceINR - b.priceINR
    }
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
      {/* Hero */}
      <Section variant="ink" className="pt-16 md:pt-20 pb-4 md:pb-5">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <div className="inline-block mb-2">
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-[#C08A2D]">
              All Courses
            </span>
          </div>
          <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-semibold text-[#EDE6D6] mb-2 md:mb-3">
            Choose Your Route
          </h1>
          <p className="text-base md:text-lg text-[#93A6BC] mb-3 md:mb-4">
            From your first <em>bonjour</em> to fluent French. 15 pathways to match
            your goal.
          </p>
          {/* <Button
            asChild
            className="bg-[#C08A2D] text-[#0C1826] hover:bg-[#D8AE63]"
          >
            <Link href="/playground/placement">Find Your Level →</Link>
          </Button> */}
        </div>
      </Section>

      {/* Choose Your Route Section */}
      <Section variant="parchment" className="py-6 md:py-7">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          {/* <h2 className="font-display text-xl md:text-2xl font-semibold text-[#0C1826] mb-3 text-center">
            Choose Your Route
          </h2> */}
          <p className="text-base md:text-lg text-[#546575] mb-3 text-center leading-relaxed">
            Whether you&apos;re chasing a CLB 7 for Express Entry, preparing for DELF, or simply want to hold a real conversation in Paris — every route starts with the right level. French Compass offers 15 structured pathways, each taught live by C1-certified instructors who&apos;ve lived the language, not just studied it.
          </p>
          <p className="text-sm md:text-base text-[#546575] italic text-center mb-4">
            Not sure where you stand? The placement quiz takes 2 minutes and tells you exactly where to begin.
          </p>
          <div className="flex justify-center">
            <Button
              asChild
              className="bg-[#C08A2D] text-[#0C1826] hover:bg-[#D8AE63]"
            >
              <Link href="/playground/placement">Find Your Level →</Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* Filters */}
      <Section variant="parchment" className="py-3 md:py-4">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Goal filter — horizontal scroll on mobile, wraps on desktop.
                The negative margin lets the scroll area bleed to the screen
                edge so chips don't look clipped mid-swipe. */}
            <div
              className="-mx-gutter overflow-x-auto px-gutter md:mx-0 md:px-0"
              role="group"
              aria-label="Filter courses by goal"
            >
              <div className="flex min-w-min gap-2 md:min-w-fit md:flex-wrap">
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
                      className={`flex min-h-11 flex-shrink-0 items-center whitespace-nowrap rounded-lg px-4 font-mono text-xs font-semibold transition-colors md:min-h-0 md:flex-shrink md:py-2 md:text-sm ${
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

            {/* Sort — was `hidden md:flex`, which left mobile with no way to
                sort at all. */}
            <div className="flex items-center gap-2">
              <label
                htmlFor="course-sort"
                className="flex-shrink-0 text-xs text-ink-dim md:text-sm"
              >
                Sort by:
              </label>
              <select
                id="course-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortKey)}
                className="min-h-11 flex-1 rounded-lg border border-ink-dim/20 bg-card px-3 text-xs text-ink-text focus:outline-none focus:ring-2 focus:ring-azimuth md:min-h-0 md:flex-none md:py-2 md:text-sm"
              >
                <option value="level">Level</option>
                <option value="price">Price (low to high)</option>
                <option value="title">Title (A–Z)</option>
              </select>
            </div>
          </div>
        </div>
      </Section>

      {/* Courses Grid */}
      <Section variant="parchment" className="py-6 md:py-8">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          {sortedCourses.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-[#546575]">No courses found for this filter.</p>
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
            <Compass className="w-4 md:w-5 h-4 md:h-5 text-[#C08A2D]" />
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-[#C08A2D]">
              Still navigating?
            </span>
          </div>
          <h2 className="font-display text-2xl md:text-4xl font-semibold text-[#EDE6D6] mb-3 md:mb-4">
            Not sure which course is right for you?
          </h2>
          <p className="text-sm md:text-base text-[#93A6BC] mb-6 md:mb-8 max-w-2xl mx-auto">
            Take our placement quiz to find your level in 2 minutes, or message us
            directly. We&apos;ll help you chart the best course.
          </p>
          <div className="flex flex-col gap-3 md:gap-4 justify-center">
            <Button
              asChild
              className="bg-[#2440E8] text-[#EDE6D6] hover:bg-[#3E59FF] w-full md:w-auto md:inline-block"
            >
              <Link href="/playground/placement">Find Your Level</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-[#EDE6D6]/20 text-[#EDE6D6] hover:bg-[#EDE6D6]/10 w-full md:w-auto md:inline-block"
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
