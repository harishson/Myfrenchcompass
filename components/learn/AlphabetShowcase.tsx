'use client'

/* =========================================================================
   AlphabetShowcase / AlphabetMosaic — replacements for the static
   french-alphabet-chart.png.

   The chart was a flat raster: unreadable at card size, unsearchable,
   untranslatable, and stylistically foreign to the navy-and-brass system.
   These render the same information as live type on the site's own surface.

   AlphabetShowcase — the full instrument. A spotlight panel that walks the
   alphabet on a slow cycle, plus a tappable letter bank. The cycle is a
   demonstration, not a carousel: it pauses the moment a pointer or keyboard
   arrives, and pins to whatever the user picked.

   AlphabetMosaic — the ambient variant for card banners. No interaction,
   just a lit letter travelling the grid.
   ========================================================================= */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { LETTERS, type Letter } from '@/lib/learn/alphabet'
import { cn } from '@/lib/utils'

const CYCLE_MS = 2600

/* ------------------------------------------------------------------ *
 * Full showcase
 * ------------------------------------------------------------------ */
export function AlphabetShowcase({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  /** Set once the user actually picks a letter — permanent, they've taken over. */
  const [pinned, setPinned] = useState(false)
  /** Transient: pause while a pointer is over the panel, resume when it leaves. */
  const [hovering, setHovering] = useState(false)
  const active: Letter = LETTERS[index]

  const vowelCount = useMemo(() => LETTERS.filter((l) => l.vowel).length, [])

  // Auto-advance until the user takes over. Reduced-motion users get a static
  // panel — an unattended 26-step cycle is exactly the kind of ambient motion
  // that setting exists to stop.
  useEffect(() => {
    if (reduce || pinned || hovering) return
    const t = setInterval(() => setIndex((i) => (i + 1) % LETTERS.length), CYCLE_MS)
    return () => clearInterval(t)
  }, [reduce, pinned, hovering])

  const select = useCallback((i: number) => {
    setIndex(i)
    setPinned(true)
  }, [])

  // Roving arrow-key navigation across the letter bank.
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const delta =
      e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : e.key === 'ArrowDown' ? 7 : e.key === 'ArrowUp' ? -7 : 0
    if (!delta) return
    e.preventDefault()
    select((index + delta + LETTERS.length) % LETTERS.length)
  }

  return (
    <div
      className={cn(
        'edge-lit relative overflow-hidden rounded-2xl border border-foam/10 p-6 sm:p-7',
        className,
      )}
      style={{
        background:
          'linear-gradient(160deg, rgba(19,34,52,0.95), rgba(8,16,25,0.92))',
        boxShadow: 'var(--elev-ink-3)',
      }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocusCapture={() => setPinned(true)}
    >
      {/* soft key light from the upper left */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(520px 260px at 15% -10%, rgba(192,138,45,0.16), transparent 68%)',
        }}
      />

      <div className="relative">
        {/* header */}
        <div className="flex items-baseline justify-between gap-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brass">
            L&apos;alphabet français
          </p>
          <p className="font-mono text-[11px] tabular-nums text-foam-dim">
            {vowelCount} voyelles · {LETTERS.length - vowelCount} consonnes
          </p>
        </div>

        <div className="rule-brass my-5" />

        {/* spotlight */}
        <div className="flex items-center gap-5 sm:gap-7">
          <div className="relative h-24 w-20 shrink-0 sm:h-28 sm:w-24">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={active.letter}
                initial={reduce ? false : { opacity: 0, y: 14, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={reduce ? undefined : { opacity: 0, y: -14, filter: 'blur(6px)' }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <span className="text-brass-gradient font-display text-7xl leading-none font-semibold sm:text-8xl">
                  {active.letter}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="min-w-0 flex-1">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.letter}
                initial={reduce ? false : { opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? undefined : { opacity: 0, x: -10 }}
                transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="font-mono text-lg text-foam">{active.phonetic}</p>
                <p className="mt-0.5 text-sm text-foam-dim">
                  called <span className="text-brass-soft">« {active.name} »</span>
                </p>
                <p className="mt-3 truncate font-display text-lg text-foam">
                  {active.example}
                  <span className="ml-2 text-sm text-foam-dim">— {active.translation}</span>
                </p>
                {active.accents && (
                  <p className="mt-2 font-display text-sm text-brass/80">{active.accents}</p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* letter bank */}
        <div
          className="mt-6 grid grid-cols-7 gap-1.5 sm:grid-cols-9"
          role="listbox"
          aria-label="French alphabet"
          tabIndex={0}
          onKeyDown={onKeyDown}
        >
          {LETTERS.map((l, i) => {
            const on = i === index
            return (
              <button
                key={l.letter}
                type="button"
                role="option"
                aria-selected={on}
                aria-label={`${l.letter}, pronounced ${l.name}`}
                onClick={() => select(i)}
                onMouseEnter={() => setIndex(i)}
                className={cn(
                  'relative aspect-square rounded-lg border font-display text-sm transition-all duration-300 sm:text-base',
                  on
                    ? 'border-brass/70 text-ink-text'
                    : l.vowel
                      ? 'border-brass/20 text-brass-soft/80 hover:border-brass/50'
                      : 'border-foam/10 text-foam/70 hover:border-brass/40 hover:text-foam',
                )}
              >
                {/* the lit plate travels between letters instead of popping */}
                {on && (
                  <motion.span
                    layoutId="alphabet-spotlight"
                    className="absolute inset-0 rounded-lg bg-gradient-to-br from-brass-soft to-brass"
                    transition={
                      reduce ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 32 }
                    }
                  />
                )}
                <span className="relative">{l.letter}</span>
              </button>
            )
          })}
        </div>

        <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-foam-dim/70">
          {pinned || hovering ? 'Tap a letter · arrow keys to move' : 'Walking the alphabet…'}
        </p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Ambient banner variant
 * ------------------------------------------------------------------ */
export function AlphabetMosaic() {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  // Banner sits inside a card link, so it must never trap a pointer.
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (reduce) return
    timer.current = setInterval(() => setIndex((i) => (i + 1) % LETTERS.length), 1900)
    return () => {
      if (timer.current) clearInterval(timer.current)
    }
  }, [reduce])

  const active = LETTERS[index]

  return (
    <div
      aria-hidden
      className="pointer-events-none relative flex h-full w-full items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(150deg, #0055A4 0%, #002E5C 55%, #003A72 100%)',
      }}
    >
      <span
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(420px 220px at 22% 0%, rgba(192,138,45,0.20), transparent 70%)',
        }}
      />

      {/* full alphabet, dim — the texture the spotlight moves across */}
      <div className="absolute inset-0 grid grid-cols-7 content-center gap-x-2 gap-y-1 px-6 py-5 sm:grid-cols-9">
        {LETTERS.map((l, i) => (
          <span
            key={l.letter}
            className={cn(
              'text-center font-display text-lg transition-colors duration-500 sm:text-xl',
              i === index ? 'text-brass' : l.vowel ? 'text-brass/25' : 'text-foam/15',
            )}
          >
            {l.letter}
          </span>
        ))}
      </div>

      {/* the lit letter, oversized and centred */}
      <div className="relative flex h-full w-full items-center justify-center">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={active.letter}
            initial={reduce ? false : { opacity: 0, scale: 0.86, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={reduce ? undefined : { opacity: 0, scale: 1.1, filter: 'blur(8px)' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center"
          >
            <span
              className="text-brass-gradient font-display text-[5.5rem] leading-none font-semibold"
              style={{ textShadow: '0 12px 40px rgba(0,0,0,0.5)' }}
            >
              {active.letter}
            </span>
            <span className="mt-1 font-mono text-sm text-foam-dim">{active.phonetic}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
