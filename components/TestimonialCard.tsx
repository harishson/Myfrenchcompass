'use client'

import { motion, useReducedMotion } from 'motion/react'
import { Star } from 'lucide-react'

interface TestimonialCardProps {
  quote: string
  author: string
  course: string
  rating: number
  result?: string
  index?: number
}

export function TestimonialCard({
  quote,
  author,
  course,
  rating,
  result,
  index = 0,
}: TestimonialCardProps) {
  const reduce = useReducedMotion()

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: (index % 3) * 0.08 }}
      whileHover={reduce ? undefined : { y: -6 }}
      className="group relative flex flex-col overflow-hidden rounded-[14px] border border-brass/30 bg-card p-6 shadow-[var(--shadow-card)] transition-shadow duration-300 hover:shadow-[var(--shadow-lift)] md:p-8"
    >
      {/* brass sheen on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(420px 180px at 85% -10%, rgba(192,138,45,0.12), transparent 70%)',
        }}
      />
      {/* decorative quote glyph */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-4 right-4 font-display text-[7rem] leading-none text-brass/10 transition-transform duration-500 group-hover:scale-110"
      >
        &rdquo;
      </span>

      {/* Rating */}
      <div className="relative mb-4 flex gap-1">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-brass text-brass" strokeWidth={1} />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="relative mb-6 font-display text-lg leading-relaxed text-ink-text md:text-xl">
        &ldquo;{quote}&rdquo;
      </blockquote>

      {/* Author & Course */}
      <div className="relative mt-auto border-t border-brass/20 pt-4">
        <p className="font-semibold text-ink-text">{author}</p>
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-dim">
          {course}
        </p>
        {result && (
          <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-verdigris/10 px-2.5 py-1 text-xs font-bold text-verdigris">
            <span aria-hidden>✓</span> {result}
          </p>
        )}
      </div>
    </motion.article>
  )
}
