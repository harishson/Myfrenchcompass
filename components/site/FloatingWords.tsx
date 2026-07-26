'use client'

/* Floating French words — immersive, decorative hero backdrop. Deterministic
   positions (SSR-safe), gentle drift, tricolour only. Hidden from AT and fully
   static under prefers-reduced-motion.

   Positions are authored per breakpoint. On mobile the hero copy fills the whole
   width, so a separate, sparser set sits in the narrow top/bottom gutters where
   nothing else lives; from `sm` up the copy is capped at max-w-4xl and the words
   move out into the side margins. Opacity is carried on a wrapper (not baked
   into the text colour) so the drift animation scales one known value instead of
   compounding two — that double-fade is what made the words invisible before. */

import { motion, useReducedMotion } from 'motion/react'

type Pos = { top: string; left: string }

type Word = {
  text: string
  /** shown only from the `sm` breakpoint up */
  desktop: Pos
  /** omit to hide this word on small screens */
  mobile?: Pos
  size: string
  color: 'blue' | 'red'
  /** resting opacity — accents sit lower than words */
  opacity: number
  delay: number
  dur: number
  serif?: boolean
}

const WORDS: Word[] = [
  { text: 'Bonjour',  desktop: { top: '7%',  left: '4%'  }, mobile: { top: '2%',  left: '-2%' }, size: 'text-4xl sm:text-6xl', color: 'blue', opacity: 0.16, delay: 0,   dur: 13, serif: true },
  { text: 'Merci',    desktop: { top: '72%', left: '3%'  }, mobile: { top: '92%', left: '4%'  }, size: 'text-3xl sm:text-5xl', color: 'red',  opacity: 0.15, delay: 2,   dur: 15, serif: true },
  { text: 'Enchanté', desktop: { top: '17%', left: '78%' }, mobile: { top: '7%',  left: '52%' }, size: 'text-3xl sm:text-5xl', color: 'blue', opacity: 0.15, delay: 1.2, dur: 14, serif: true },
  { text: 'À bientôt',desktop: { top: '80%', left: '74%' }, mobile: { top: '86%', left: '44%' }, size: 'text-2xl sm:text-4xl', color: 'red',  opacity: 0.13, delay: 3.1, dur: 16, serif: true },
  { text: 'Voilà',    desktop: { top: '45%', left: '88%' },                                     size: 'text-2xl sm:text-4xl', color: 'blue', opacity: 0.14, delay: 4,   dur: 15, serif: true },
  { text: 'Salut',    desktop: { top: '40%', left: '1%'  },                                     size: 'text-2xl sm:text-4xl', color: 'red',  opacity: 0.13, delay: 5,   dur: 17, serif: true },
  { text: 'é',        desktop: { top: '30%', left: '46%' }, mobile: { top: '46%', left: '90%' }, size: 'text-6xl sm:text-8xl', color: 'red',  opacity: 0.08, delay: 1.8, dur: 12 },
  { text: 'à',        desktop: { top: '62%', left: '40%' }, mobile: { top: '62%', left: '2%'  }, size: 'text-5xl sm:text-7xl', color: 'blue', opacity: 0.09, delay: 3.6, dur: 13 },
  { text: 'ç',        desktop: { top: '11%', left: '52%' },                                     size: 'text-4xl sm:text-6xl', color: 'blue', opacity: 0.08, delay: 2.6, dur: 14 },
]

const COLOR = { blue: 'text-blue', red: 'text-red' } as const

export function FloatingWords() {
  const reduce = useReducedMotion()

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {WORDS.map((w) => {
        const inner = (
          <span
            className={`block whitespace-nowrap font-semibold ${w.serif ? 'font-serif-italic' : 'font-display'} ${w.size} ${COLOR[w.color]}`}
          >
            {w.text}
          </span>
        )

        // Two absolutely-positioned wrappers per word: one for each breakpoint.
        // Cheaper and more predictable than trying to express responsive
        // top/left through inline styles.
        return (['mobile', 'desktop'] as const).map((bp) => {
          const pos = bp === 'mobile' ? w.mobile : w.desktop
          if (!pos) return null

          const visibility = bp === 'mobile' ? 'sm:hidden' : 'hidden sm:block'
          const style = { top: pos.top, left: pos.left, opacity: w.opacity }

          return reduce ? (
            <span key={`${w.text}-${bp}`} className={`absolute ${visibility}`} style={style}>
              {inner}
            </span>
          ) : (
            <motion.span
              key={`${w.text}-${bp}`}
              className={`absolute ${visibility}`}
              style={style}
              animate={{ y: [0, -16, 0], rotate: [-2, 2, -2], opacity: [w.opacity * 0.7, w.opacity, w.opacity * 0.7] }}
              transition={{ duration: w.dur, delay: w.delay, repeat: Infinity, ease: 'easeInOut' }}
            >
              {inner}
            </motion.span>
          )
        })
      })}
    </div>
  )
}
