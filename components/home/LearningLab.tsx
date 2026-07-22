import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import { AlphabetMosaic } from '@/components/learn/AlphabetShowcase'
import { TenseDial } from '@/components/learn/TenseDial'

/**
 * Both banners are live components rather than raster art. The alphabet card
 * used to ship a screenshot of a chart (foreign palette, unreadable at card
 * size); the verbs card a flag badge. Rendering them means one visual system,
 * no image payload, and type that stays crisp at any density.
 */
const CARDS = [
  {
    href: '/learn/alphabet',
    kicker: 'Interactive · 26 letters',
    title: 'Master the French Alphabet',
    desc: "Sounds, names, accents and the trickiest letters — with flashcards, quizzes and pronunciation tips that make l'alphabet stick.",
    Banner: AlphabetMosaic,
    stats: ['6 vowels', '20 consonants', '7 tricky letters'],
  },
  {
    href: '/learn/verb-tenses',
    kicker: 'Interactive · Every tense',
    title: 'Master the French Verb Tenses',
    desc: 'Indicative, subjunctive, conditional, imperative and impersonal — organized into clear chapters with timelines, tables and knowledge checks.',
    Banner: TenseDial,
    stats: ['5 moods', '20+ tenses', 'Conjugation drills'],
  },
]

export function LearningLab() {
  return (
    <section id="learning-lab" className="bg-parchment py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-gutter">
        <Reveal>
          <div className="text-center mb-10 md:mb-14">
            <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-brass mb-3">
              <Sparkles className="h-4 w-4" /> Interactive learning lab
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-ink-text tracking-tight text-balance">
              Learn by doing, not just reading
            </h2>
            <p className="text-ink-dim mt-3 text-base md:text-lg max-w-2xl mx-auto text-pretty">
              Two immersive, self-paced journeys. Tap a card to open a full learning
              experience with flashcards, quizzes and live practice.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {CARDS.map((card, i) => (
            <Reveal key={card.href} delay={100 + i * 100}>
              <Link
                href={card.href}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink-text/10 bg-card shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:border-brass/40 hover:shadow-[var(--shadow-lift)] focus-visible:-translate-y-1"
              >
                {/* Live banner */}
                <div className="relative h-56 overflow-hidden border-b border-foam/10 sm:h-64">
                  <card.Banner />
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-brass mb-2">
                    {card.kicker}
                  </p>
                  <h3 className="font-display text-2xl font-semibold text-ink-text">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-dim">{card.desc}</p>

                  {/* Stat chips */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {card.stats.map((s) => (
                      <span
                        key={s}
                        className="rounded-full bg-brass/10 px-3 py-1 text-xs font-medium text-brass"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <span className="mt-6 inline-flex items-center gap-2 font-medium text-azimuth">
                    Start learning
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
