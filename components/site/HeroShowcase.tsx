'use client'

/* Hero showcase — a floating "live class" UI collage. Photo-free, custom-built,
   and deliberately unlike the old compass hero. Gentle Framer-Motion float on
   each card (different phase); fully static under prefers-reduced-motion. */

import { motion, useReducedMotion } from 'motion/react'
import { Users, Sparkles, Star } from 'lucide-react'

const AVATARS = [
  { initials: 'AK', bg: '#0055A4' },
  { initials: 'MD', bg: '#EF4135' },
  { initials: 'RS', bg: '#EF4135' },
  { initials: 'JP', bg: '#013A72' },
]

function Float({
  children,
  dy = 10,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  dy?: number
  delay?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -dy, 0] }}
      transition={{ duration: 6 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      {children}
    </motion.div>
  )
}

export function HeroShowcase() {
  const reduce = useReducedMotion()

  return (
    <div className="relative mx-auto aspect-[5/6] w-full max-w-[30rem]">
      {/* warm ambient wash */}
      <div aria-hidden className="spotlight-warm pointer-events-none absolute -inset-8 rounded-[3rem] blur-2xl" />

      {/* main live-class panel */}
      <Float dy={8} delay={0} className="absolute inset-x-0 top-6 mx-auto w-[86%]">
        <div className="grain relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue to-blue-deep p-7 text-foam shadow-[var(--shadow-lift)]">
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 rounded-full bg-red px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-wider text-white">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" /> Live
              </span>
              <span className="font-mono text-xs text-foam/70">A1 → C2</span>
            </div>

            <p className="mt-8 font-serif-italic text-5xl leading-none text-ochre-soft">Bonjour !</p>
            <p className="mt-3 max-w-[16rem] text-sm leading-relaxed text-foam/80">
              A 90-minute live class, in a room of four to six. Cameras on, accents welcome.
            </p>

            <div className="mt-7 flex items-center gap-3">
              <div className="flex -space-x-2.5">
                {AVATARS.map((a) => (
                  <span
                    key={a.initials}
                    className="grid h-9 w-9 place-items-center rounded-full border-2 border-blue-deep font-mono text-[0.62rem] font-semibold text-white"
                    style={{ background: a.bg }}
                  >
                    {a.initials}
                  </span>
                ))}
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs text-foam/70">
                <Users className="h-3.5 w-3.5" /> 4–6 seats
              </span>
            </div>
          </div>
        </div>
      </Float>

      {/* floating progress card — top left */}
      <Float dy={12} delay={1.2} className="absolute left-0 top-0 w-[54%]">
        <div className="card-warm p-4">
          <div className="flex items-center justify-between">
            <span className="chip chip-ochre">
              <Sparkles className="h-3 w-3" /> Progress
            </span>
            <span className="font-mono text-xs text-ink-dim">B1</span>
          </div>
          <p className="mt-3 text-sm font-semibold text-ink-text">You're 78% to B1</p>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-cream-deep">
            <div className="h-full rounded-full bg-blue" style={{ width: '78%' }} />
          </div>
        </div>
      </Float>

      {/* floating testimonial card — bottom right */}
      <Float dy={10} delay={2.1} className="absolute bottom-1 right-0 w-[58%]">
        <div className="card-warm p-4">
          <div className="flex items-center gap-1 text-red">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-current" />
            ))}
          </div>
          <p className="mt-2 font-serif-italic text-[0.98rem] leading-snug text-ink-text">
            "Cleared TEF Canada — CLB 8, first try."
          </p>
          <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-wide text-ink-dim">Aditya · Toronto PR</p>
        </div>
      </Float>

      {/* stray accented letters */}
      {!reduce && (
        <>
          <motion.span
            aria-hidden
            className="absolute -left-4 top-1/2 font-serif-italic text-4xl text-red/40"
            animate={{ y: [0, -14, 0], rotate: [-6, 4, -6] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          >
            é
          </motion.span>
          <motion.span
            aria-hidden
            className="absolute -right-2 top-8 font-serif-italic text-3xl text-blue/40"
            animate={{ y: [0, -10, 0], rotate: [5, -4, 5] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          >
            à
          </motion.span>
        </>
      )}
    </div>
  )
}
