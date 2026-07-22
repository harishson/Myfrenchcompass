'use client'

/* =========================================================================
   TenseDial — ambient banner for the verb-tenses card.

   Companion to AlphabetMosaic: same navy plate, same brass key light, same
   cadence. Where the alphabet banner walks letters, this one walks a single
   verb along a past → present → future axis, so the card communicates
   "conjugation across time" without a word of explanation.

   Purely decorative and non-interactive — the whole card is the link.
   ========================================================================= */

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'

/** One verb, walked across the axis. `pos` is its place on the timeline, 0–1. */
const FORMS = [
  { tense: 'Imparfait', form: 'je parlais', gloss: 'I was speaking', pos: 0.08 },
  { tense: 'Passé composé', form: "j'ai parlé", gloss: 'I spoke', pos: 0.3 },
  { tense: 'Présent', form: 'je parle', gloss: 'I speak', pos: 0.52 },
  { tense: 'Futur proche', form: 'je vais parler', gloss: "I'm going to speak", pos: 0.72 },
  { tense: 'Futur simple', form: 'je parlerai', gloss: 'I will speak', pos: 0.92 },
]

export function TenseDial() {
  const reduce = useReducedMotion()
  const [i, setI] = useState(2) // start on the présent

  useEffect(() => {
    if (reduce) return
    const t = setInterval(() => setI((v) => (v + 1) % FORMS.length), 2400)
    return () => clearInterval(t)
  }, [reduce])

  const active = FORMS[i]

  return (
    <div
      aria-hidden
      className="pointer-events-none relative flex h-full w-full flex-col items-center justify-center overflow-hidden px-6"
      style={{
        background: 'linear-gradient(150deg, #14243a 0%, #0b1420 55%, #101d2e 100%)',
      }}
    >
      <span
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(420px 220px at 78% 0%, rgba(62,143,124,0.18), transparent 70%)',
        }}
      />

      <div className="relative w-full max-w-xs">
        {/* the conjugated form */}
        <div className="flex h-24 flex-col items-center justify-center">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={active.tense}
              initial={reduce ? false : { opacity: 0, y: 12, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={reduce ? undefined : { opacity: 0, y: -12, filter: 'blur(6px)' }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center text-center"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-brass">
                {active.tense}
              </span>
              <span className="mt-1.5 font-display text-3xl leading-tight text-foam">
                {active.form}
              </span>
              <span className="mt-1 text-xs text-foam-dim">{active.gloss}</span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* the time axis */}
        <div className="relative mt-5 h-8">
          <div className="absolute inset-x-0 top-2.5 h-px bg-gradient-to-r from-transparent via-brass/40 to-transparent" />

          {FORMS.map((f, idx) => (
            <span
              key={f.tense}
              className="absolute top-1.5 h-2 w-2 -translate-x-1/2 rounded-full transition-colors duration-500"
              style={{
                left: `${f.pos * 100}%`,
                backgroundColor:
                  idx === i ? 'var(--color-brass-soft)' : 'rgba(237,230,214,0.22)',
              }}
            />
          ))}

          {/* travelling marker */}
          <motion.span
            className="absolute top-0.5 h-4 w-4 -translate-x-1/2 rounded-full border border-brass"
            animate={{ left: `${active.pos * 100}%` }}
            transition={
              reduce ? { duration: 0 } : { type: 'spring', stiffness: 190, damping: 24 }
            }
          />

          <span className="absolute -bottom-1 left-0 font-mono text-[9px] uppercase tracking-widest text-foam-dim/70">
            passé
          </span>
          <span className="absolute -bottom-1 right-0 font-mono text-[9px] uppercase tracking-widest text-foam-dim/70">
            futur
          </span>
        </div>
      </div>
    </div>
  )
}
