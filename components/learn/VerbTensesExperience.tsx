'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react'
import {
  ChapterNav,
  ChapterHeading,
  Flashcards,
  Quiz,
  Callout,
  PronounceButton,
  type Chapter,
} from '@/components/learn/ui'
import { cn } from '@/lib/utils'
import {
  MOODS,
  SUBJUNCTIVE_ENDINGS,
  IRREGULAR_SUBJUNCTIVE,
  CONDITIONAL_CONJUGATION,
  PAST_PARTICIPLES,
  VERB_FLASHCARDS,
  VERB_QUIZ,
  type Frequency,
  type Tense,
} from '@/lib/learn/verbs'

const CHAPTERS: Chapter[] = [
  ...MOODS.map((m) => ({ id: m.id, label: m.title.replace('The ', '') })),
  { id: 'conjugations', label: 'Conjugations' },
  { id: 'quiz', label: 'Quiz' },
]

const freqStyle: Record<Frequency, string> = {
  'Most common': 'bg-verdigris/15 text-verdigris border-verdigris/30',
  Common: 'bg-brass/15 text-brass border-brass/30',
  Rare: 'bg-foam/10 text-foam-dim border-foam/20',
  Literary: 'bg-azimuth/15 text-azimuth-lift border-azimuth/30',
}

function TenseCard({ t }: { t: Tense }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-foam/10 bg-foam/[0.03] p-5 transition-colors hover:border-brass/40">
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="font-display text-xl font-semibold text-foam">{t.name}</h3>
        <span className={cn('shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] font-medium', freqStyle[t.frequency])}>
          {t.frequency}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-foam-dim">{t.meaning}</p>
      <p className="mt-3 rounded-lg bg-ink/60 px-3 py-2 font-mono text-xs leading-relaxed text-foam-dim">
        {t.formation}
      </p>
      <div className="mt-auto pt-4">
        <div className="flex items-center justify-between gap-2">
          <p className="font-display text-base text-brass">{t.fr}</p>
          <PronounceButton text={t.fr} label={t.name} />
        </div>
        <p className="mt-1 text-sm text-foam-dim">{t.en}</p>
      </div>
    </div>
  )
}

function DataTable({
  headers,
  rows,
  caption,
}: {
  headers: string[]
  rows: string[][]
  caption?: string
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-foam/10">
      {caption && (
        <p className="border-b border-foam/10 bg-foam/5 px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-brass">
          {caption}
        </p>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-foam/5 font-mono text-xs uppercase tracking-wider text-foam-dim">
            <tr>
              {headers.map((h) => (
                <th key={h} className="whitespace-nowrap px-4 py-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-foam/10 text-foam">
            {rows.map((r, i) => (
              <tr key={i} className="hover:bg-foam/[0.03]">
                {r.map((c, j) => (
                  <td key={j} className={cn('px-4 py-2.5', j === 0 && 'text-foam-dim')}>
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function VerbTensesExperience() {
  return (
    <div className="on-ink min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden pt-[calc(var(--header-h)+2rem)] pb-12">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-gutter md:grid-cols-2">
          <div>
            <Link
              href="/#learning-lab"
              className="inline-flex items-center gap-2 text-sm text-foam-dim transition-colors hover:text-brass"
            >
              <ArrowLeft className="h-4 w-4" /> Back to learning lab
            </Link>
            <p className="mt-6 font-mono text-xs uppercase tracking-widest text-brass">
              Interactive journey
            </p>
            <h1 className="mt-2 font-display text-4xl font-semibold leading-tight text-foam md:text-6xl text-balance">
              Master the French Verb Tenses
            </h1>
            <p className="mt-4 max-w-md leading-relaxed text-foam-dim">
              Five moods, more than twenty tenses. We break them into clear chapters —
              from everyday indicative to the literary forms — with timelines, tables and
              drills so it finally clicks.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['5 moods', 'Indicative → Impersonal', 'Conjugation tables', 'Drills & quiz'].map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-foam/15 bg-foam/5 px-3 py-1 text-xs text-foam-dim"
                >
                  {s}
                </span>
              ))}
            </div>
            <a
              href="#indicative"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-azimuth px-6 py-3 font-semibold text-foam shadow-[var(--glow-azimuth)] transition-colors hover:bg-azimuth-lift"
            >
              Start the journey <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto w-full max-w-xs overflow-hidden rounded-3xl border border-foam/10 shadow-2xl"
          >
            <Image
              src="/french-verbs-badge.png"
              alt="French Verbs badge with two crossed French flags"
              width={447}
              height={447}
              className="h-auto w-full"
              priority
            />
          </motion.div>
        </div>
      </section>

      <ChapterNav chapters={CHAPTERS} />

      {/* Mood sections */}
      {MOODS.map((mood, mIndex) => (
        <section
          key={mood.id}
          id={mood.id}
          className={cn(
            'border-t border-foam/10',
            mIndex % 2 === 1 && 'bg-foam/[0.02]',
          )}
        >
          <div className="mx-auto max-w-6xl px-gutter py-16 md:py-20">
            <ChapterHeading
              index={mIndex + 1}
              eyebrow={mood.tagline}
              title={mood.title}
              intro={mood.intro}
            />

            {/* Indicative timeline */}
            {mood.id === 'indicative' && (
              <div className="mb-10 rounded-2xl border border-foam/10 bg-foam/[0.03] p-5 md:p-6">
                <p className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-brass">
                  <Clock className="h-4 w-4" /> Where each tense sits in time
                </p>
                <div className="flex items-center gap-3 overflow-x-auto pb-2 text-center text-xs">
                  {['Plus-que-parfait', 'Imparfait / Passé composé', 'Présent', 'Futur simple', 'Futur antérieur'].map(
                    (label, i, arr) => (
                      <div key={label} className="flex items-center gap-3">
                        <span className="whitespace-nowrap rounded-full border border-brass/30 bg-brass/10 px-3 py-1.5 text-brass">
                          {label}
                        </span>
                        {i < arr.length - 1 && <span className="text-brass/50">→</span>}
                      </div>
                    ),
                  )}
                </div>
                <div className="mt-2 flex justify-between px-1 font-mono text-[10px] uppercase tracking-wider text-foam-dim">
                  <span>Past</span>
                  <span>Now</span>
                  <span>Future</span>
                </div>
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {mood.tenses.map((t) => (
                <TenseCard key={t.name} t={t} />
              ))}
            </div>

            {mood.id === 'subjunctive' && (
              <div className="mt-6">
                <Callout variant="tip" title="Good news">
                  You really only need the <strong className="text-foam">present</strong> and{' '}
                  <strong className="text-foam">past</strong> subjunctive for speaking. The
                  imperfect and pluperfect are literary — worth recognizing, not memorizing.
                </Callout>
              </div>
            )}
          </div>
        </section>
      ))}

      {/* Conjugations chapter */}
      <section id="conjugations" className="border-t border-foam/10 bg-foam/[0.02]">
        <div className="mx-auto max-w-6xl px-gutter py-16 md:py-20">
          <ChapterHeading
            index={MOODS.length + 1}
            eyebrow="Reference tables"
            title="Conjugations & drills"
            intro="The endings and irregulars worth committing to memory — plus flashcards to test yourself. avoir and être are irregular in almost every mood, so start there."
          />

          <div className="grid gap-6 lg:grid-cols-2">
            <DataTable
              caption="Present subjunctive endings"
              headers={SUBJUNCTIVE_ENDINGS.headers}
              rows={SUBJUNCTIVE_ENDINGS.rows}
            />
            <DataTable
              caption="Subjunctive of avoir & être (the essentials)"
              headers={IRREGULAR_SUBJUNCTIVE.headers}
              rows={IRREGULAR_SUBJUNCTIVE.rows}
            />
            <DataTable
              caption={`Conditionnel présent — ${CONDITIONAL_CONJUGATION.verb}`}
              headers={CONDITIONAL_CONJUGATION.headers}
              rows={CONDITIONAL_CONJUGATION.rows}
            />
            <DataTable
              caption="Regular past participles"
              headers={PAST_PARTICIPLES.headers}
              rows={PAST_PARTICIPLES.rows}
            />
          </div>

          <div className="mt-10">
            <Callout variant="warning" title="Watch the irregulars">
              Regular past participles follow -er → é, -ir → i, -re → u, but there are many
              notable exceptions. Learning the irregular participles pays off across every
              compound tense.
            </Callout>
          </div>

          <div className="mt-12">
            <h3 className="mb-6 text-center font-display text-2xl text-foam">
              Flashcard drills
            </h3>
            <Flashcards cards={VERB_FLASHCARDS} />
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section id="quiz" className="border-t border-foam/10">
        <div className="mx-auto max-w-3xl px-gutter py-16 md:py-20">
          <ChapterHeading
            index={MOODS.length + 2}
            eyebrow="Knowledge check"
            title="Test your tenses"
            intro="Six questions across all five moods. Get 80% and you have earned your stripes."
          />
          <div className="text-foam">
            <Quiz questions={VERB_QUIZ} accent="azimuth" />
          </div>

          <div className="mt-12 flex flex-col items-center gap-4 rounded-2xl border border-foam/10 bg-foam/5 p-8 text-center">
            <p className="font-display text-2xl text-foam">Want a human to guide you?</p>
            <p className="text-foam-dim">
              Practice these tenses live with a C1-certified instructor.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/learn/alphabet"
                className="inline-flex items-center gap-2 rounded-full border border-foam/20 px-6 py-3 font-semibold text-foam transition-colors hover:border-brass/50 hover:text-brass"
              >
                <ArrowLeft className="h-4 w-4" /> Back to the alphabet
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-brass px-6 py-3 font-semibold text-ink-text transition-colors hover:bg-brass-soft"
              >
                Book a class <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
