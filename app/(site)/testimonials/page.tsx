import Link from 'next/link'
import { Footer } from '@/components/Footer'
import { Section } from '@/components/Section'
import { TestimonialCard } from '@/components/TestimonialCard'
import { Reveal } from '@/components/Reveal'
import { Compass } from 'lucide-react'

export const metadata = {
  title: 'Student Testimonials | French Compass',
  description: 'Read real stories from French Compass students. Immigration success, exam wins, and fluency breakthroughs.',
}

const testimonials = [
  {
    quote:
      'I went from zero French to B1 in 6 months. The structure was clear, the teaching was warm, and I actually *wanted* to study every day.',
    author: 'Priya M.',
    course: 'A1 → B1 Track',
    rating: 5,
    result: 'Passed B1 exam with 78%',
  },
  {
    quote:
      'Samyukta helped me crack the TEF. I scored CLB 8 on my first try and now I\'m processing my Canadian PR application.',
    author: 'Arun K.',
    course: 'B2 + TEF Combo',
    rating: 5,
    result: 'CLB 8 — Express Entry eligible',
  },
  {
    quote:
      'I was intimidated by conversational French. After 3 months of live classes, I actually chatted with a Parisian waiter without panic. Worth every rupee.',
    author: 'Neha S.',
    course: 'A2 + Conversation Workshop',
    rating: 5,
    result: 'Confident conversationalist',
  },
  {
    quote:
      'Balaji brings authentic France into the classroom. You don\'t just learn the language — you live it. Incredible.',
    author: 'Rohan D.',
    course: 'B1 Intensive',
    rating: 5,
    result: 'B1 certified',
  },
  {
    quote:
      'The instructors are patient, encouraging, and actually care if you understand. Not just another generic online course. Real mentorship.',
    author: 'Anita J.',
    course: 'A1 — Absolute Beginner',
    rating: 5,
    result: 'Completed A1 → A2 path',
  },
  {
    quote:
      'Reached my target DELF score (B2) after following their structured approach. The focus on exam strategy made a huge difference.',
    author: 'Vikram L.',
    course: 'DELF B2 Prep',
    rating: 5,
    result: 'DELF B2 — 82/100',
  },
]

export default function TestimonialsPage() {
  return (
    <>
      {/* Hero */}
      <Section variant="parchment" className="pt-28 pb-12 md:pt-36 md:pb-16">
        <div className="mx-auto mb-12 max-w-4xl text-center">
          <Reveal>
            <div className="mb-4 inline-flex items-center gap-2">
              <Compass className="h-5 w-5 text-brass" />
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-brass">
                Success Stories
              </span>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mb-6 font-display text-3xl font-semibold text-balance text-ink-text md:text-5xl lg:text-6xl">
              Logbook Entries
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mx-auto max-w-2xl text-lg text-pretty text-ink-dim">
              Real stories from students who charted their course with French Compass. From
              zero to fluent, from confused to confident, from dreaming to doing.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Testimonials Grid */}
      <Section variant="parchment" className="pt-0 pb-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, i) => (
              <TestimonialCard key={testimonial.author} {...testimonial} index={i} />
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section variant="ink" className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(900px 340px at 50% 0%, rgba(36,64,232,0.15), transparent 70%)',
          }}
        />
        <Reveal className="relative mx-auto max-w-4xl text-center">
          <h2 className="mb-4 font-display text-3xl font-semibold text-balance text-foam md:text-4xl">
            Your story could be next.
          </h2>
          <p className="mb-8 text-lg text-pretty text-foam-dim">
            Start your journey today. Whether it&apos;s CLB 7 for Canada, a DELF for prestige,
            or just confidence to speak — we&apos;ll chart the route and walk every step with you.
          </p>
          {/* next/link, not <a>: raw anchors here forced a full document reload
              and threw away the client-side navigation. */}
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/learning-resources/placement"
              className="group inline-flex min-h-12 items-center justify-center rounded-lg bg-azimuth px-8 py-3 font-semibold text-foam shadow-[var(--glow-azimuth)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-azimuth-lift"
            >
              Find Your Level{' '}
              <span className="ml-1.5 inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-foam/20 px-8 py-3 font-semibold text-foam transition-all duration-300 hover:-translate-y-0.5 hover:border-brass/60 hover:bg-foam/10"
            >
              Book a Demo
            </Link>
          </div>
        </Reveal>
      </Section>

      <Footer />
    </>
  )
}
