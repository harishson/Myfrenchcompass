'use client'

/* Floating French words — immersive, decorative hero backdrop. Deterministic
   positions (SSR-safe), gentle drift, tricolour only. Hidden from AT and fully
   static under prefers-reduced-motion. */

import { motion, useReducedMotion } from 'motion/react'

type Word = { text: string; top: string; left: string; size: string; color: string; delay: number; dur: number; serif?: boolean }

const WORDS: Word[] = [
  { text: 'Bonjour', top: '8%', left: '6%', size: 'text-3xl sm:text-5xl', color: 'text-blue/10', delay: 0, dur: 13, serif: true },
  { text: 'Merci', top: '70%', left: '4%', size: 'text-2xl sm:text-4xl', color: 'text-red/10', delay: 2, dur: 15, serif: true },
  { text: 'Enchanté', top: '20%', left: '74%', size: 'text-2xl sm:text-4xl', color: 'text-blue/10', delay: 1.2, dur: 14, serif: true },
  { text: 'À bientôt', top: '78%', left: '68%', size: 'text-xl sm:text-3xl', color: 'text-red/[0.08]', delay: 3.1, dur: 16, serif: true },
  { text: 'Voilà', top: '46%', left: '88%', size: 'text-xl sm:text-3xl', color: 'text-blue/[0.09]', delay: 4, dur: 15, serif: true },
  { text: 'Salut', top: '40%', left: '2%', size: 'text-xl sm:text-3xl', color: 'text-red/[0.08]', delay: 5, dur: 17, serif: true },
  { text: 'é', top: '30%', left: '46%', size: 'text-5xl sm:text-7xl', color: 'text-red/[0.06]', delay: 1.8, dur: 12 },
  { text: 'à', top: '62%', left: '40%', size: 'text-4xl sm:text-6xl', color: 'text-blue/[0.07]', delay: 3.6, dur: 13 },
  { text: 'ç', top: '12%', left: '52%', size: 'text-3xl sm:text-5xl', color: 'text-blue/[0.06]', delay: 2.6, dur: 14 },
]

export function FloatingWords() {
  const reduce = useReducedMotion()
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {WORDS.map((w) =>
        reduce ? (
          <span
            key={w.text + w.left}
            className={`absolute font-semibold ${w.serif ? 'font-serif-italic' : 'font-display'} ${w.size} ${w.color}`}
            style={{ top: w.top, left: w.left }}
          >
            {w.text}
          </span>
        ) : (
          <motion.span
            key={w.text + w.left}
            className={`absolute font-semibold ${w.serif ? 'font-serif-italic' : 'font-display'} ${w.size} ${w.color}`}
            style={{ top: w.top, left: w.left }}
            animate={{ y: [0, -18, 0], rotate: [-2, 2, -2], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: w.dur, delay: w.delay, repeat: Infinity, ease: 'easeInOut' }}
          >
            {w.text}
          </motion.span>
        ),
      )}
    </div>
  )
}
