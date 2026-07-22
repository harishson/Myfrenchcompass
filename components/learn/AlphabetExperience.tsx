'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import {
  ChapterNav,
  ChapterHeading,
  Accordion,
  Callout,
  Flashcards,
  Quiz,
  PronounceButton,
  type Chapter,
} from '@/components/learn/ui'
import {
  LETTERS,
  TRICKY_LETTERS,
  ACCENTS,
  ALPHABET_QUIZ,
  type Letter,
} from '@/lib/learn/alphabet'

const CHAPTERS: Chapter[] = [
  { id: 'chart', label: "L'alphabet" },
  { id: 'tricky', label: 'Tricky letters' },
  { id: 'accents', label: 'Accents' },
  { id: 'vowels', label: 'Vowels' },
  { id: 'flashcards', label: 'Flashcards' },
  { id: 'quiz', label: 'Quiz' },
]

const flashcards = LETTERS.map((l) => ({
  front: l.letter,
  sub: l.phonetic,
  back: `${l.example}`,
  backSub: `${l.name} · ${l.translation}`,
}))

export function AlphabetExperience() {
  const [selected, setSelected] = useState<Letter>(LETTERS[0])

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
              Master the French Alphabet
            </h1>
            <p className="mt-4 max-w-md leading-relaxed text-foam-dim">
              L&apos;alphabet français looks familiar, but the sounds tell a different
              story. Learn every letter, name and accent — then lock it in with flashcards
              and a quiz.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['26 letters', '6 vowels', '20 consonants', '7 tricky sounds'].map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-foam/15 bg-foam/5 px-3 py-1 text-xs text-foam-dim"
                >
                  {s}
                </span>
              ))}
            </div>
            <a
              href="#chart"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-azimuth px-6 py-3 font-semibold text-foam shadow-[var(--glow-azimuth)] transition-colors hover:bg-azimuth-lift"
            >
              Start the journey <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-foam/10 shadow-2xl"
          >
            <Image
              src="/french-alphabet-chart.png"
              alt="French alphabet chart showing each letter with its phonetic pronunciation and name"
              width={1000}
              height={1400}
              className="h-auto w-full"
              priority
            />
          </motion.div>
        </div>
      </section>

      <ChapterNav chapters={CHAPTERS} />

      {/* Chapter 1 — interactive alphabet */}
      <section id="chart" className="mx-auto max-w-6xl px-gutter py-16 md:py-20">
        <ChapterHeading
          index={1}
          eyebrow="The full alphabet"
          title="Tap any letter to hear and see it"
          intro="Each letter has its own name and sound. Select a letter to explore its phonetic value, its letter-name, its accented forms and an example word."
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* Grid */}
          <div className="grid grid-cols-4 gap-2.5 sm:grid-cols-6 md:grid-cols-7">
            {LETTERS.map((l) => (
              <button
                key={l.letter}
                onClick={() => setSelected(l)}
                className={
                  'aspect-square rounded-xl border text-center font-display text-2xl transition-all ' +
                  (selected.letter === l.letter
                    ? 'border-brass bg-brass/15 text-brass scale-105'
                    : 'border-foam/10 bg-foam/[0.03] text-foam hover:border-brass/40 hover:bg-foam/5')
                }
                aria-pressed={selected.letter === l.letter}
              >
                {l.letter}
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <motion.div
            key={selected.letter}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="h-fit rounded-2xl border border-brass/20 bg-gradient-to-br from-[#132234] to-[#0C1826] p-6 lg:sticky lg:top-36"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-6xl text-brass">{selected.letter}</span>
              <PronounceButton text={selected.example} label={selected.example} />
            </div>
            <dl className="mt-5 space-y-3 text-sm">
              <div>
                <dt className="font-mono text-xs uppercase tracking-wider text-foam-dim">Sound</dt>
                <dd className="text-lg text-foam">{selected.phonetic}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-wider text-foam-dim">Letter name</dt>
                <dd className="text-lg text-foam">{selected.name}</dd>
              </div>
              {selected.accents && (
                <div>
                  <dt className="font-mono text-xs uppercase tracking-wider text-foam-dim">Accented forms</dt>
                  <dd className="text-lg text-foam">{selected.accents}</dd>
                </div>
              )}
              <div>
                <dt className="font-mono text-xs uppercase tracking-wider text-foam-dim">Example</dt>
                <dd className="text-lg text-foam">
                  {selected.example}{' '}
                  <span className="text-foam-dim">({selected.translation})</span>
                </dd>
              </div>
            </dl>
          </motion.div>
        </div>
      </section>

      {/* Chapter 2 — tricky letters */}
      <section id="tricky" className="border-t border-foam/10 bg-foam/[0.02]">
        <div className="mx-auto max-w-4xl px-gutter py-16 md:py-20">
          <ChapterHeading
            index={2}
            eyebrow="The 7 trickiest letters"
            title="Sounds English speakers stumble on"
            intro="A handful of letters trip up English speakers most. Expand each one for a plain-English trick to nail the sound."
          />
          <div className="text-foam">
            <Accordion
              items={TRICKY_LETTERS.map((t) => ({
                q: `${t.letter} — ${t.letter === 'Œ' ? 'the digraph' : 'the letter'}`,
                a: <p>{t.tip}</p>,
              }))}
            />
          </div>
        </div>
      </section>

      {/* Chapter 3 — accents */}
      <section id="accents" className="border-t border-foam/10">
        <div className="mx-auto max-w-4xl px-gutter py-16 md:py-20">
          <ChapterHeading
            index={3}
            eyebrow="Accents & diacritics"
            title="Small marks, big meaning"
            intro="French accent marks are named by the letter plus the accent. They do not always change pronunciation, but they can change a word’s meaning entirely."
          />
          <div className="overflow-hidden rounded-2xl border border-foam/10">
            <table className="w-full text-left text-sm">
              <thead className="bg-foam/5 font-mono text-xs uppercase tracking-wider text-foam-dim">
                <tr>
                  <th className="px-4 py-3">Mark</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-foam/10 text-foam">
                {ACCENTS.map((a) => (
                  <tr key={a.mark} className="hover:bg-foam/[0.03]">
                    <td className="px-4 py-3 font-display text-2xl text-brass">{a.mark}</td>
                    <td className="px-4 py-3">{a.name}</td>
                    <td className="px-4 py-3 text-foam-dim">{a.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6">
            <Callout variant="warning" title="Accents change meaning">
              Always add the correct accent in writing. For example{' '}
              <strong className="text-foam">pêcheur</strong> (fisherman) versus{' '}
              <strong className="text-foam">pécheur</strong> (sinner) — one small mark, two
              very different words.
            </Callout>
          </div>
        </div>
      </section>

      {/* Chapter 4 — vowels */}
      <section id="vowels" className="border-t border-foam/10 bg-foam/[0.02]">
        <div className="mx-auto max-w-4xl px-gutter py-16 md:py-20">
          <ChapterHeading
            index={4}
            eyebrow="Vowels & consonants"
            title="Six vowels, twenty consonants"
            intro="French counts six vowels and twenty consonants — and Y is treated as a vowel, unlike in English."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-verdigris/30 bg-verdigris/10 p-6 text-center">
              <p className="font-display text-5xl font-semibold text-verdigris">6</p>
              <p className="mt-1 font-mono text-xs uppercase tracking-wider text-foam-dim">Vowels</p>
              <p className="mt-3 flex flex-wrap justify-center gap-2">
                {['A', 'E', 'I', 'O', 'U', 'Y'].map((v) => (
                  <span key={v} className="rounded-lg bg-verdigris/20 px-2.5 py-1 font-display text-lg text-foam">
                    {v}
                  </span>
                ))}
              </p>
            </div>
            <div className="rounded-2xl border border-brass/30 bg-brass/10 p-6 text-center">
              <p className="font-display text-5xl font-semibold text-brass">20</p>
              <p className="mt-1 font-mono text-xs uppercase tracking-wider text-foam-dim">Consonants</p>
              <p className="mt-3 text-sm text-foam-dim">
                Everything else — from B to Z. Y is the surprise crossover that plays a
                vowel in French.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 5 — flashcards */}
      <section id="flashcards" className="border-t border-foam/10">
        <div className="mx-auto max-w-4xl px-gutter py-16 md:py-20">
          <ChapterHeading
            index={5}
            eyebrow="Flashcards"
            title="Flip through every letter"
            intro="See the letter and its sound, then flip to reveal an example word and translation. Use the arrows to move through the deck."
          />
          <div className="text-foam">
            <Flashcards cards={flashcards} />
          </div>
        </div>
      </section>

      {/* Chapter 6 — quiz */}
      <section id="quiz" className="border-t border-foam/10 bg-foam/[0.02]">
        <div className="mx-auto max-w-3xl px-gutter py-16 md:py-20">
          <ChapterHeading
            index={6}
            eyebrow="Knowledge check"
            title="Test your alphabet"
            intro="Five quick questions to prove you have the sounds, names and accents down."
          />
          <div className="text-foam">
            <Quiz questions={ALPHABET_QUIZ} accent="azimuth" />
          </div>

          <div className="mt-12 flex flex-col items-center gap-4 rounded-2xl border border-foam/10 bg-foam/5 p-8 text-center">
            <p className="font-display text-2xl text-foam">Ready for the next challenge?</p>
            <p className="text-foam-dim">Now that letters make sense, tackle the verbs.</p>
            <Link
              href="/learn/verb-tenses"
              className="inline-flex items-center gap-2 rounded-full bg-brass px-6 py-3 font-semibold text-ink-text transition-colors hover:bg-brass-soft"
            >
              Master the verb tenses <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
