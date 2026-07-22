import { Footer } from '@/components/Footer'
import { Section } from '@/components/Section'
import { InstructorCard } from '@/components/InstructorCard'
import { Reveal } from '@/components/Reveal'
import { CountUp } from '@/components/CountUp'
import { Compass } from 'lucide-react'

export const metadata = {
  title: 'About French Compass | Meet Our Instructors',
  description: 'Meet the C1-certified instructors behind French Compass. Real expertise, real immersion, real results.',
}

export default function AboutPage() {
  return (
    <>
      {/* Story Section */}
      <Section variant="parchment" className="pt-20 md:pt-32 pb-12 md:pb-16">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <div className="inline-flex items-center gap-2 mb-6">
              <Compass className="w-5 h-5 text-brass" />
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-brass">
                Our story
              </span>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-semibold text-ink-text mb-8">
              Why We Started French Compass
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <div className="space-y-6 text-lg text-ink-dim leading-relaxed">
              <p>
                French Compass exists because navigating French fluency shouldn&apos;t feel like
                charting unknown waters. Too many learners get caught in &ldquo;app purgatory&rdquo;
                — grinding through apps for years but never reaching a checkpoint that <em>means
                something</em> (a B2 for Canadian PR, a DELF exam score, real conversation).
              </p>
              <p>
                We brought together three C1-certified instructors with real immersion experience
                across France, Luxembourg, Switzerland — and a decade of teaching from India to
                Canada — to offer something different: <strong>live, structured, warm instruction</strong> that
                honors both rigor (exam prep, CEFR levels) and joy (culture, conversation, real
                human connection).
              </p>
              <p>
                Our philosophy: <strong>Your goal is your bearing.</strong> Whether you need CLB 7 for
                immigration, a DELF ticket for prestige, or just fluent chat with Parisians on holiday
                — we chart a clear course, then walk every step with you.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Instructors */}
      <Section variant="ink" className="py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="text-center mb-12">
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-brass">
                Your navigators
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-semibold text-foam mt-3">
                Meet the Crew
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <InstructorCard
              index={0}
              name="Harish Santhanam"
              title="Founder · Expedition Lead"
              c1Level
              specialization="Real-world French from 3 countries"
              territories={['🇫🇷 France', '🇱🇺 Luxembourg', '🇨🇭 Switzerland']}
              bio="Founder with 8+ years of French immersion across Western Europe and a proven knack for turning grammar anxiety into genuine confidence. Brings authenticity into every class."
              monogram="HS"
            />
            <InstructorCard
              index={1}
              name="Samyukta"
              title="TEF/TCF Specialist"
              c1Level
              experience="10 years teaching"
              specialization="Immigration exam prep expert"
              territories={['🇨🇦 Canada-focused', '🇫🇷 Native materials']}
              bio="Gets learners the exact scores they need for Canadian Express Entry and international admissions. Her students consistently hit CLB 7+ on their first attempt."
              monogram="SK"
            />
            <InstructorCard
              index={2}
              name="Balaji Sankar"
              title="Cultural Immersion Guide"
              c1Level
              experience="6 years abroad"
              specialization="In-country immersion & fluency"
              territories={['🇫🇷 Based in France']}
              bio="Currently based in France, bringing authentic daily French and cultural context into every lesson. Specializes in helping learners move from textbook to real-world fluency."
              monogram="BS"
            />
          </div>
        </div>
      </Section>

      {/* Trust Stats */}
      <Section variant="parchment" className="py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { v: '500+', l: 'Students taught' },
              { v: '88%', l: 'Exam pass rate' },
              { v: '4.9★', l: 'Student rating' },
              { v: '25+', l: 'Countries reached' },
            ].map((s, i) => (
              <Reveal key={s.l} delay={i * 80}>
                <div className="group rounded-[14px] p-6 transition-colors duration-300 hover:bg-card">
                  <CountUp
                    value={s.v}
                    className="mb-2 block font-display text-4xl font-bold tabular-nums text-azimuth"
                  />
                  <p className="font-mono text-sm uppercase tracking-[0.14em] text-ink-dim">
                    {s.l}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Footer />
    </>
  )
}
