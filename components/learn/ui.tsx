'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  AlertTriangle,
  Check,
  X,
  RotateCcw,
  Volume2,
} from 'lucide-react'
import { cn } from '@/lib/utils'

/* ------------------------------------------------------------------ */
/* Sticky chapter nav + scroll progress                                */
/* ------------------------------------------------------------------ */

export interface Chapter {
  id: string
  label: string
}

export function ChapterNav({ chapters }: { chapters: Chapter[] }) {
  const [active, setActive] = useState(chapters[0]?.id)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement
      const total = doc.scrollHeight - doc.clientHeight
      setProgress(total > 0 ? Math.min(100, (doc.scrollTop / total) * 100) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    chapters.forEach((c) => {
      const el = document.getElementById(c.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [chapters])

  return (
    <div className="sticky top-[var(--header-h)] z-30 border-b border-foam/10 bg-ink/85 backdrop-blur-md supports-[backdrop-filter]:bg-ink/70">
      {/* progress bar */}
      <div className="h-0.5 w-full bg-foam/10">
        <div
          className="h-full bg-brass transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>
      <nav
        className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label="Chapters"
      >
        {chapters.map((c) => (
          <a
            key={c.id}
            href={`#${c.id}`}
            className={cn(
              'shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors',
              active === c.id
                ? 'bg-brass/15 text-brass'
                : 'text-foam-dim hover:text-foam',
            )}
          >
            {c.label}
          </a>
        ))}
      </nav>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Callout                                                             */
/* ------------------------------------------------------------------ */

export function Callout({
  variant = 'tip',
  title,
  children,
}: {
  variant?: 'tip' | 'warning'
  title: string
  children: React.ReactNode
}) {
  const isTip = variant === 'tip'
  return (
    <div
      className={cn(
        'rounded-xl border p-4 md:p-5',
        isTip
          ? 'border-verdigris/30 bg-verdigris/10'
          : 'border-brass/30 bg-brass/10',
      )}
    >
      <p
        className={cn(
          'mb-1.5 flex items-center gap-2 font-semibold',
          isTip ? 'text-verdigris' : 'text-brass',
        )}
      >
        {isTip ? (
          <Lightbulb className="h-4 w-4" />
        ) : (
          <AlertTriangle className="h-4 w-4" />
        )}
        {title}
      </p>
      <div className="text-sm leading-relaxed text-current/90">{children}</div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Accordion                                                           */
/* ------------------------------------------------------------------ */

export interface AccordionItem {
  q: string
  a: React.ReactNode
}

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="divide-y divide-current/10 overflow-hidden rounded-xl border border-current/10">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={i}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left md:px-5"
              aria-expanded={isOpen}
            >
              <span className="font-medium">{item.q}</span>
              <ChevronDown
                className={cn(
                  'h-5 w-5 shrink-0 transition-transform duration-300',
                  isOpen && 'rotate-180',
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 text-sm leading-relaxed text-current/80 md:px-5">
                    {item.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Flashcards                                                          */
/* ------------------------------------------------------------------ */

export interface Flashcard {
  front: string
  sub?: string
  back: string
  backSub?: string
}

export function Flashcards({ cards }: { cards: Flashcard[] }) {
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const reduce = useReducedMotion()
  const card = cards[index]

  const go = (dir: number) => {
    setFlipped(false)
    setIndex((i) => (i + dir + cards.length) % cards.length)
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-3 font-mono text-xs text-current/60">
        Card {index + 1} / {cards.length}
      </div>
      <button
        onClick={() => setFlipped((f) => !f)}
        className="relative h-52 w-full max-w-md [perspective:1200px]"
        aria-label="Flip card"
      >
        <motion.div
          className="relative h-full w-full [transform-style:preserve-3d]"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: reduce ? 0 : 0.5 }}
        >
          {/* front */}
          <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-brass/30 bg-gradient-to-br from-[#132234] to-[#0C1826] text-foam [backface-visibility:hidden]">
            <span className="font-display text-6xl text-brass">{card.front}</span>
            {card.sub && <span className="mt-2 text-sm text-foam-dim">{card.sub}</span>}
            <span className="mt-4 text-xs text-foam-dim/60">Tap to reveal</span>
          </div>
          {/* back */}
          <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-verdigris/40 bg-gradient-to-br from-[#0f7a63] to-[#0b5a49] px-4 text-center text-foam [transform:rotateY(180deg)] [backface-visibility:hidden]">
            <span className="font-display text-3xl">{card.back}</span>
            {card.backSub && <span className="mt-2 text-sm text-foam/80">{card.backSub}</span>}
          </div>
        </motion.div>
      </button>
      <div className="mt-5 flex items-center gap-3">
        <button
          onClick={() => go(-1)}
          className="grid h-10 w-10 place-items-center rounded-full border border-current/20 transition-colors hover:border-brass/50 hover:text-brass"
          aria-label="Previous card"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => setFlipped((f) => !f)}
          className="rounded-full border border-current/20 px-4 py-2 text-sm font-medium transition-colors hover:border-brass/50 hover:text-brass"
        >
          Flip
        </button>
        <button
          onClick={() => go(1)}
          className="grid h-10 w-10 place-items-center rounded-full border border-current/20 transition-colors hover:border-brass/50 hover:text-brass"
          aria-label="Next card"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Quiz                                                                */
/* ------------------------------------------------------------------ */

export interface QuizQuestion {
  q: string
  options: string[]
  answer: number
  explain?: string
}

export function Quiz({ questions, accent = 'brass' }: { questions: QuizQuestion[]; accent?: 'brass' | 'azimuth' }) {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  const q = questions[current]
  const answered = selected !== null

  const choose = (i: number) => {
    if (answered) return
    setSelected(i)
    if (i === q.answer) setScore((s) => s + 1)
  }

  const next = () => {
    if (current + 1 >= questions.length) {
      setDone(true)
    } else {
      setCurrent((c) => c + 1)
      setSelected(null)
    }
  }

  const reset = () => {
    setCurrent(0)
    setSelected(null)
    setScore(0)
    setDone(false)
  }

  if (done) {
    const pct = Math.round((score / questions.length) * 100)
    return (
      <div className="rounded-2xl border border-current/10 bg-current/[0.03] p-8 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-brass">Knowledge check</p>
        <p className="mt-3 font-display text-5xl font-semibold">
          {score}/{questions.length}
        </p>
        <p className="mt-2 text-current/70">
          {pct >= 80 ? 'Superbe! You are on the right track.' : pct >= 50 ? 'Bien joué — a little more practice and you have it.' : 'Keep going — review the chapter and try again.'}
        </p>
        <button
          onClick={reset}
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-current/20 px-5 py-2.5 text-sm font-medium transition-colors hover:border-brass/50 hover:text-brass"
        >
          <RotateCcw className="h-4 w-4" /> Try again
        </button>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-current/10 bg-current/[0.03] p-6 md:p-8">
      <div className="mb-4 flex items-center justify-between">
        <span className="font-mono text-xs text-current/60">
          Question {current + 1} / {questions.length}
        </span>
        <span className="font-mono text-xs text-brass">Score {score}</span>
      </div>
      <p className="mb-5 text-lg font-medium">{q.q}</p>
      <div className="grid gap-3">
        {q.options.map((opt, i) => {
          const isCorrect = i === q.answer
          const isChosen = i === selected
          return (
            <button
              key={i}
              onClick={() => choose(i)}
              disabled={answered}
              className={cn(
                'flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left transition-colors',
                !answered && 'border-current/15 hover:border-brass/50 hover:bg-current/[0.04]',
                answered && isCorrect && 'border-verdigris/50 bg-verdigris/15 text-verdigris',
                answered && isChosen && !isCorrect && 'border-red-400/50 bg-red-500/10 text-red-400',
                answered && !isChosen && !isCorrect && 'border-current/10 opacity-60',
              )}
            >
              <span>{opt}</span>
              {answered && isCorrect && <Check className="h-5 w-5 shrink-0" />}
              {answered && isChosen && !isCorrect && <X className="h-5 w-5 shrink-0" />}
            </button>
          )
        })}
      </div>
      <AnimatePresence>
        {answered && q.explain && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 rounded-lg bg-current/5 p-3 text-sm text-current/70"
          >
            {q.explain}
          </motion.p>
        )}
      </AnimatePresence>
      {answered && (
        <button
          onClick={next}
          className={cn(
            'mt-5 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-foam transition-colors',
            accent === 'azimuth' ? 'bg-azimuth hover:bg-azimuth-lift' : 'bg-brass hover:bg-brass-soft',
          )}
        >
          {current + 1 >= questions.length ? 'See results' : 'Next question'}
          <ChevronRight className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Pronounce button (Web Speech API)                                   */
/* ------------------------------------------------------------------ */

export function PronounceButton({ text, label }: { text: string; label?: string }) {
  const [supported, setSupported] = useState(true)
  const ref = useRef(false)

  useEffect(() => {
    ref.current = true
    setSupported(typeof window !== 'undefined' && 'speechSynthesis' in window)
  }, [])

  const speak = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!('speechSynthesis' in window)) return
    const u = new SpeechSynthesisUtterance(text)
    u.lang = 'fr-FR'
    u.rate = 0.85
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(u)
  }

  if (!supported) return null
  return (
    <button
      onClick={speak}
      className="inline-flex items-center gap-1.5 rounded-full border border-current/20 px-3 py-1 text-xs font-medium transition-colors hover:border-brass/50 hover:text-brass"
      aria-label={label ? `Hear ${label}` : 'Hear pronunciation'}
    >
      <Volume2 className="h-3.5 w-3.5" /> Hear it
    </button>
  )
}

/* ------------------------------------------------------------------ */
/* Section heading helper                                              */
/* ------------------------------------------------------------------ */

export function ChapterHeading({
  index,
  eyebrow,
  title,
  intro,
}: {
  index: number
  eyebrow: string
  title: string
  intro?: string
}) {
  return (
    <div className="mb-8 md:mb-10">
      <p className="font-mono text-xs uppercase tracking-widest text-brass">
        Chapter {index} · {eyebrow}
      </p>
      <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight md:text-4xl text-balance">
        {title}
      </h2>
      {intro && <p className="mt-3 max-w-2xl leading-relaxed text-current/70 text-pretty">{intro}</p>}
    </div>
  )
}
