import { Footer } from '@/components/Footer'
import { Section } from '@/components/Section'
import { FranceCompassHero } from '@/components/FranceCompassHero'
import { Button } from '@/components/ui/button'
import { MaleTutorIcon, FemaleTutorIcon } from '@/components/TutorIcons'
import { RoadmapCourses } from '@/components/home/RoadmapCourses'
import { LearningLab } from '@/components/home/LearningLab'
import { CountUp } from '@/components/CountUp'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'
import { Magnetic } from '@/components/motion/Magnetic'
import { TiltCard } from '@/components/motion/TiltCard'
import { Reveal } from '@/components/Reveal'
import Link from 'next/link'

const TRUST_SIGNALS = [
  { value: '500+', label: 'students guided' },
  { value: '3', label: 'C1 instructors' },
  { value: 'A1→C2', label: 'full journey' },
]

const INSTRUCTORS = [
  {
    name: 'Harish Santhanam',
    role: 'Founder · Expedition Lead',
    icon: <MaleTutorIcon />,
    specialization: 'Real-world French from 3 countries',
    bio: '8+ years of French immersion across France, Luxembourg, and Switzerland. Known for turning grammar anxiety into genuine confidence through authentic, story-driven teaching.',
    focus: ['Conversational fluency', 'Cultural immersion', 'Foundational strength'],
  },
  {
    name: 'Samyukta',
    role: 'TEF/TCF Specialist',
    icon: <FemaleTutorIcon />,
    specialization: 'Immigration exam prep expert',
    bio: '10 years teaching, with 88% exam pass rate. Her students consistently hit CLB 7+ on first attempt. Masters the exact score pathways for Canadian Express Entry.',
    focus: ['TEF/TCF Canada', 'Immigration prep', 'Strategy coaching'],
  },
  {
    name: 'Balaji Sankar',
    role: 'Cultural Immersion Guide',
    icon: <MaleTutorIcon />,
    specialization: 'In-country immersion & fluency',
    bio: 'Currently based in France. Brings daily French, cultural nuance, and real-world context to every lesson. Specializes in bridging textbook knowledge to street-level fluency.',
    focus: ['Daily French', 'Cultural context', 'Real-world usage'],
  },
]

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="on-ink relative flex min-h-screen items-center justify-center overflow-hidden pt-24 pb-12">
        {/* Ambient floor glow — grounds the hero without a hard section edge. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-64"
          style={{
            background:
              'linear-gradient(to top, rgba(8,16,25,0.9), transparent)',
          }}
        />

        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-gutter lg:grid-cols-2">
          {/* Hero Content */}
          <Stagger pace="hero" className="space-y-8">
            <div className="space-y-3">
              <StaggerItem as="p" className="font-mono text-xs uppercase tracking-widest text-brass">
                N 48°51′ · E 2°21′ — SET YOUR BEARING
              </StaggerItem>
              <StaggerItem
                as="h1"
                className="font-display text-5xl leading-[1.05] font-semibold text-balance text-foam md:text-6xl lg:text-7xl"
              >
                Chart your course to{' '}
                <span className="text-brass-gradient">fluent French</span>.
              </StaggerItem>
            </div>

            <StaggerItem as="p" className="max-w-md text-lg leading-relaxed text-pretty text-foam-dim">
              Live 90-minute classes, C1-certified instructors, and a clear route from your first
              <em> bonjour</em> to a DELF or TEF/TCF score you can rely on.
            </StaggerItem>

            <StaggerItem className="flex flex-col gap-4 pt-2 sm:flex-row">
              {/* The one magnetic element on the page — the primary action. */}
              <Magnetic>
                <Button
                  asChild
                  size="lg"
                  className="h-12 w-full px-7 text-base bg-azimuth text-foam font-semibold shadow-[var(--glow-azimuth)] transition-all duration-300 hover:bg-azimuth-lift hover:shadow-[0_0_0_1px_rgba(36,64,232,.5),0_16px_44px_rgba(36,64,232,.42)] sm:w-auto"
                >
                  <Link href="/contact">Book a class</Link>
                </Button>
              </Magnetic>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 w-full px-7 text-base border-foam/25 text-foam transition-all duration-300 hover:-translate-y-0.5 hover:border-brass/50 hover:bg-foam/5 sm:w-auto"
              >
                <Link href="/playground">Try placement quiz</Link>
              </Button>
            </StaggerItem>

            {/* Trust signals */}
            <StaggerItem className="grid grid-cols-3 gap-6 border-t border-foam/10 pt-8">
              {TRUST_SIGNALS.map((s) => (
                <div key={s.label}>
                  <CountUp
                    value={s.value}
                    className="block font-mono text-2xl font-bold text-brass tabular-nums"
                  />
                  <p className="text-sm text-foam-dim">{s.label}</p>
                </div>
              ))}
            </StaggerItem>
          </Stagger>

          {/* France Compass Visual */}
          <div className="relative flex h-96 min-h-96 items-center justify-center md:h-full">
            <FranceCompassHero />
          </div>
        </div>
      </section>

      {/* Merged roadmap + courses (compact) */}
      <RoadmapCourses />

      {/* Interactive Learning Lab — the freed-up space */}
      <LearningLab />

      {/* Instructors — Rich Profile Cards */}
      <Section id="instructors-preview">
        <div className="mx-auto max-w-5xl">
          <Reveal className="mb-12 text-center">
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-brass">
              YOUR NAVIGATORS
            </p>
            <h2 className="mb-4 font-display text-4xl font-semibold text-balance text-ink-text">
              Three C1 instructors, one mission
            </h2>
            <p className="mx-auto max-w-2xl text-pretty text-ink-dim">
              Real experience, real culture, real connection. Each brings a distinct expertise to your French journey.
            </p>
          </Reveal>

          <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {INSTRUCTORS.map((instructor) => (
              <StaggerItem key={instructor.name} className="h-full">
                <TiltCard className="h-full">
                  <article className="edge-lit lift relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink-text/8 bg-card p-6 shadow-[var(--elev-2)] hover:border-brass/30">
                    <div className="mb-4">{instructor.icon}</div>
                    <h3 className="mb-1 font-display text-lg font-semibold text-ink-text">
                      {instructor.name}
                    </h3>
                    <p className="mb-3 font-mono text-xs uppercase tracking-wider text-brass">
                      {instructor.role}
                    </p>
                    <p className="mb-4 flex-1 text-sm leading-relaxed text-ink-dim">
                      {instructor.bio}
                    </p>
                    <div className="border-t border-ink-text/10 pt-4">
                      <p className="mb-2 font-mono text-xs uppercase text-brass">Specialization</p>
                      <div className="flex flex-wrap gap-2">
                        {instructor.focus.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md bg-brass/10 px-2 py-1 text-xs text-brass"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                </TiltCard>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={120} className="mt-10 text-center">
            <Button
              asChild
              variant="outline"
              className="h-11 border-ink-text/20 px-6 text-ink-text transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink-text/5"
            >
              <Link href="/about">Read full instructor bios</Link>
            </Button>
          </Reveal>
        </div>
      </Section>

      {/* Final CTA */}
      <Section dark className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(900px 340px at 50% 0%, rgba(36,64,232,0.15), transparent 70%)',
          }}
        />
        <Reveal className="relative mx-auto max-w-3xl text-center">
          <h2 className="mb-4 font-display text-3xl font-semibold text-balance text-foam md:text-4xl">
            Your next step starts now
          </h2>
          <p className="mb-8 text-pretty text-foam-dim">
            Take the free placement quiz, book a demo class, or dive into the Playground.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-12 w-full px-7 text-base bg-azimuth font-semibold text-foam shadow-[var(--glow-azimuth)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-azimuth-lift sm:w-auto"
            >
              <Link href="/playground/placement">Take the quiz</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="h-12 w-full px-7 text-base bg-brass font-semibold text-ink-text transition-all duration-300 hover:-translate-y-0.5 hover:bg-brass-soft sm:w-auto"
            >
              <Link href="/contact">Book a class</Link>
            </Button>
          </div>
        </Reveal>
      </Section>

      <Footer />
    </>
  )
}
