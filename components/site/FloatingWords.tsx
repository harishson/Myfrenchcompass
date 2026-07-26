'use client'

/* Floating French words — immersive, decorative hero backdrop. Deterministic
   positions (SSR-safe), gentle drift, tricolour only. Hidden from AT and fully
   static under prefers-reduced-motion.

   Visibility is handled by two things working together, not by one opacity
   value: the words carry real tint (0.22–0.34), and the container wears a
   radial mask (`.hero-words`) that fades them to nothing across the centre
   column. That gives full strength out at the edges — where there is nothing to
   collide with — and zero strength behind the headline, so raising contrast
   never costs readability.

   Positions are authored per breakpoint. On mobile the hero copy is full-bleed,
   so a sparser set sits hard against the left/right edges, deliberately part-bled
   off-screen; from `sm` up the copy is capped at max-w-4xl and the words spread
   into the side margins. */

import { motion, useReducedMotion } from 'motion/react'

type Pos = { top: string; left: string }

type Word = {
  text: string
  /** shown only from the `sm` breakpoint up */
  desktop: Pos
  /** omit to hide this word on small screens */
  mobile?: Pos
  size: string
  color: 'blue' | 'blue-deep' | 'red'
  /** resting opacity, before the container mask is applied */
  opacity: number
  /** drift distance in px — varied so the field doesn't pulse in lockstep */
  travel: number
  delay: number
  dur: number
  serif?: boolean
  /** render as a hairline outline instead of a solid fill */
  outline?: boolean
}

const WORDS: Word[] = [
  { text: 'Bonjour',   desktop: { top: '6%',  left: '3%'  }, mobile: { top: '1%',  left: '-4%' }, size: 'text-4xl sm:text-6xl', color: 'blue-deep', opacity: 0.30, travel: 18, delay: 0,   dur: 15, serif: true },
  { text: 'Merci',     desktop: { top: '73%', left: '2%'  }, mobile: { top: '90%', left: '-3%' }, size: 'text-3xl sm:text-5xl', color: 'red',       opacity: 0.26, travel: 14, delay: 2.4, dur: 17, serif: true },
  { text: 'Enchanté',  desktop: { top: '15%', left: '77%' }, mobile: { top: '5%',  left: '58%' }, size: 'text-3xl sm:text-5xl', color: 'blue-deep', opacity: 0.28, travel: 16, delay: 1.2, dur: 16, serif: true },
  { text: 'À bientôt', desktop: { top: '82%', left: '72%' }, mobile: { top: '95%', left: '52%' }, size: 'text-2xl sm:text-4xl', color: 'red',       opacity: 0.24, travel: 20, delay: 3.4, dur: 18, serif: true },
  { text: 'Voilà',     desktop: { top: '44%', left: '89%' }, mobile: { top: '40%', left: '80%' }, size: 'text-2xl sm:text-4xl', color: 'blue',      opacity: 0.26, travel: 15, delay: 4.2, dur: 16, serif: true },
  { text: 'Salut',     desktop: { top: '40%', left: '0%'  }, mobile: { top: '55%', left: '-2%' }, size: 'text-2xl sm:text-4xl', color: 'red',       opacity: 0.24, travel: 13, delay: 5.1, dur: 19, serif: true },
  { text: 'é',         desktop: { top: '28%', left: '44%' }, mobile: { top: '70%', left: '86%' }, size: 'text-6xl sm:text-8xl', color: 'red',       opacity: 0.34, travel: 12, delay: 1.8, dur: 14, outline: true },
  { text: 'à',         desktop: { top: '64%', left: '38%' }, mobile: { top: '22%', left: '-1%' }, size: 'text-6xl sm:text-8xl', color: 'blue',      opacity: 0.32, travel: 17, delay: 3.9, dur: 15, outline: true },
  { text: 'ç',         desktop: { top: '9%',  left: '55%' },                                     size: 'text-5xl sm:text-7xl', color: 'blue-deep', opacity: 0.28, travel: 14, delay: 2.7, dur: 16, outline: true },
]

const COLOR = {
  blue: 'text-blue',
  'blue-deep': 'text-blue-deep',
  red: 'text-red',
} as const

export function FloatingWords() {
  const reduce = useReducedMotion()

  return (
    <div aria-hidden className="hero-words pointer-events-none absolute inset-0 overflow-hidden">
      {WORDS.map((w) => {
        const glyph = (
          <span
            className={`block whitespace-nowrap font-semibold ${w.serif ? 'font-serif-italic' : 'font-display'} ${
              w.outline ? 'word-outline' : ''
            } ${w.size} ${COLOR[w.color]}`}
          >
            {w.text}
          </span>
        )

        // Two absolutely-positioned wrappers per word, one per breakpoint —
        // cheaper and more predictable than expressing responsive top/left
        // through inline styles.
        return (['mobile', 'desktop'] as const).map((bp) => {
          const pos = bp === 'mobile' ? w.mobile : w.desktop
          if (!pos) return null

          const visibility = bp === 'mobile' ? 'sm:hidden' : 'hidden sm:block'
          const style = { top: pos.top, left: pos.left, opacity: w.opacity }

          return reduce ? (
            <span key={`${w.text}-${bp}`} className={`absolute ${visibility}`} style={style}>
              {glyph}
            </span>
          ) : (
            <motion.span
              key={`${w.text}-${bp}`}
              className={`absolute ${visibility} will-change-transform`}
              style={style}
              // Long, offset cycles with a touch of lateral drift and scale —
              // the field breathes rather than bobbing in unison.
              animate={{
                y: [0, -w.travel, 0, w.travel * 0.5, 0],
                x: [0, w.travel * 0.35, 0, -w.travel * 0.3, 0],
                rotate: [-1.5, 1.5, -1.5],
                scale: [1, 1.04, 1],
              }}
              transition={{ duration: w.dur, delay: w.delay, repeat: Infinity, ease: 'easeInOut' }}
            >
              {glyph}
            </motion.span>
          )
        })
      })}
    </div>
  )
}
