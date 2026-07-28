import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowUpRight, ArrowRight, Radio, Target, GraduationCap, Sparkles, Quote,
} from 'lucide-react'
import { Footer } from '@/components/Footer'
import { Reveal } from '@/components/Reveal'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'
import { TiltCard } from '@/components/motion/TiltCard'
import { LearningLab } from '@/components/home/LearningLab'
import { levels } from '@/lib/levels'
import { MaleTutorIcon, FemaleTutorIcon } from '@/components/TutorIcons'

const MARQUEE = ['DELF', 'TEF Canada', 'TCF', 'DALF', 'CLB 7+', 'Express Entry', 'A1 → C2', 'DELF', 'TEF Canada', 'TCF', 'DALF', 'CLB 7+', 'Express Entry', 'A1 → C2']

const FEATURES = [
  {
    icon: Radio,
    title: 'Live, never recorded',
    body: 'Every class is a real 90-minute session in a room of four to six — cameras on, questions welcome, no autopilot playlists.',
    tone: 'blue' as const,
  },
  {
    icon: GraduationCap,
    title: 'C1-certified navigators',
    body: 'Taught by instructors who reached C1 themselves and have lived French across France, Luxembourg and Switzerland.',
    tone: 'red' as const,
  },
  {
    icon: Target,
    title: 'Built around your target',
    body: 'DELF, a CLB 7 for Canadian PR, a university place — the path is engineered backward from the outcome you need.',
    tone: 'blue' as const,
  },
]

const METHOD = [
  { n: '01', title: 'Find your bearing', body: 'A free two-minute placement quiz pins your real CEFR level — no guessing which class to buy.' },
  { n: '02', title: 'Learn live', body: 'Small cohorts, twice a week, taught entirely in the way you actually use French.' },
  { n: '03', title: 'Practise for real', body: 'Conversation workshops and graded drills turn grammar you know into French you can speak.' },
  { n: '04', title: 'Certify with proof', body: 'Targeted TEF / TCF / DELF prep takes you into exam day knowing exactly what examiners reward.' },
]

const OUTCOMES = [
  { fig: '88%', label: 'first-attempt exam pass rate' },
  { fig: '500+', label: 'students guided to fluency' },
  { fig: 'CLB 7+', label: 'reached for Express Entry' },
  { fig: '4–6', label: 'students per live class' },
]

const INSTRUCTORS: {
  name: string; role: string; icon: React.ReactNode; bio: string; focus: string[]; image?: string
}[] = [
  { name: 'Harish Santhanam', role: 'Founder · Expedition Lead', icon: <MaleTutorIcon />, image: '/instructors/harish.jpg', bio: '8+ years of French immersion across France, Luxembourg and Switzerland. Turns grammar anxiety into genuine confidence.', focus: ['Conversation', 'Foundations'] },
  { name: 'Samyukta', role: 'TEF / TCF Specialist', icon: <FemaleTutorIcon />, bio: '10 years teaching with an 88% pass rate. Her students consistently hit CLB 7+ on the first attempt.', focus: ['Immigration prep', 'Strategy'] },
  { name: 'Balaji Sankar', role: 'Cultural Immersion Guide', icon: <MaleTutorIcon />, bio: 'Based in France. Brings daily French, cultural nuance and real-world context to every lesson.', focus: ['Daily French', 'Culture'] },
]

const TESTIMONIALS = [
  { quote: 'I went from freezing in French to leading a client call in Paris. The small classes made all the difference.', name: 'Priya R.', meta: 'B2 · Product Manager' },
  { quote: 'Cleared TEF Canada with CLB 8 on the first attempt. The exam strategy sessions were worth every rupee.', name: 'Aditya M.', meta: 'TEF · Toronto PR' },
  { quote: 'No judgment, just steady progress. I actually look forward to my classes now.', name: 'Sneha K.', meta: 'A2 · Absolute beginner' },
]

const featureAccent = {
  blue: 'text-blue border-blue/20 bg-blue/[0.06]',
  red: 'text-red-accent border-red/25 bg-red/[0.07]',
}

export default function Home() {
  return (
    <>
      {/* ============================== HERO ==============================
       * The client's reference: a full-bleed Paris scene anchored right, washed
       * out to white on the left so the copy sits on clean paper and the tower
       * emerges from it — one continuous surface rather than a photo in a box.
       * The floating-words backdrop was retired here because the reference is
       * deliberately uncluttered; the component still exists if wanted back.
       * ================================================================== */}
      <section className="relative bg-white">
        {/* `min-h-svh` on desktop pins the bottom of the hero — and therefore the
            bottom of the photo — to the fold, so the scene is whole on first
            paint instead of completing only once you scroll. It is a minimum,
            not a fixed height, so on short viewports the section still grows
            with its content rather than clipping it. */}
        <div className="relative overflow-hidden lg:flex lg:min-h-svh lg:items-center">
          {/* --- background plate ---
              Desktop draws ONE flattened image and nothing on top of it. Every
              seam in earlier attempts came from compositing at render time — a
              panel with an edge, a mask over it, a white wash over that — and
              each layer gave the eye somewhere to catch an inflection. The wash
              from paper-white into the photograph is now baked into
              hero-paris-wide.jpg itself, whose luma falls monotonically across
              the band, so there is nothing left that can read as a division.
              Mobile keeps the original portrait crop and its own vertical wash,
              untouched. */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            {/* -- mobile -- */}
            <div className="absolute inset-y-0 right-0 w-full lg:hidden">
              <Image
                src="/brand/hero-paris.jpg"
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-contain object-bottom"
              />
            </div>
            <div className="absolute inset-0 lg:hidden bg-[linear-gradient(to_bottom,#fff_0%,#fff_36%,rgba(255,255,255,0.88)_58%,rgba(255,255,255,0.58)_100%)]" />

            {/* -- desktop: single layer, no overlay -- */}
            <div className="absolute inset-0 hidden lg:block">
              <Image
                src="/brand/hero-paris-wide.jpg"
                alt=""
                fill
                priority
                quality={90}
                sizes="100vw"
                className="object-cover object-right-bottom"
              />
            </div>
            {/* Between lg and xl the viewport is narrow enough that `cover` crops
                into the baked white margin, so the copy can end up over sky. A
                light wash covers only that range; from xl up — where the seam was
                visible — the photograph is drawn completely bare. */}
            <div className="absolute inset-0 hidden lg:block xl:hidden bg-[linear-gradient(to_right,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.62)_34%,rgba(255,255,255,0)_58%)]" />
          </div>

          {/* Desktop pads to just clear the fixed header and balances top/bottom,
              so the vertically-centred block reads as centred rather than
              pushed down — and stays inside the fold. */}
          <div className="relative z-10 mx-auto w-full max-w-[var(--container)] px-gutter pt-[calc(var(--header-h)+2.5rem)] pb-[clamp(2.5rem,6vw,5rem)] lg:pt-[calc(var(--header-h)+1rem)] lg:pb-10">
            <Stagger pace="hero" className="flex max-w-2xl flex-col items-start text-left">
            {/* Desktop drops the eyebrow: the reference goes straight into the
                headline, and the ~50px it frees is what lets the whole hero —
                stats included — sit inside the fold. Mobile keeps it, where
                there is room to spare. */}
            <StaggerItem as="p" className="eyebrow lg:hidden">Live French classes · A1 to C2</StaggerItem>

            <StaggerItem
              as="h1"
              className="mt-5 lg:mt-0 font-display text-[clamp(2.6rem,1.5rem+4.6vw,5.2rem)] font-bold leading-[1.02] tracking-[-0.035em]"
            >
              <span className="block text-blue-deep">Your Journey.</span>
              <span className="block text-red-text">Our Guidance.</span>
            </StaggerItem>

            <StaggerItem as="p" className="mt-5 fs-1 font-medium text-ink-text">
              Learn French. Achieve global opportunities.
            </StaggerItem>

            {/* the twin navy/red rules from the brand sheet */}
            <StaggerItem className="mt-6 flex gap-2" aria-hidden>
              <span className="h-1 w-16 rounded-full bg-blue-deep" />
              <span className="h-1 w-16 rounded-full bg-red" />
            </StaggerItem>

            {/* NB: the {' '} is load-bearing — JSX collapses the space that
                would otherwise follow </span>, giving "bonjourto". */}
            <StaggerItem as="p" className="mt-7 max-w-[46ch] leading-relaxed text-ink-dim">
              From your first <span className="font-serif-italic text-ink-text">bonjour</span>{' '}
              to a DELF diploma or a CLB&nbsp;7 for Canada — in small live classes with
              C1-certified instructors who've walked the path.
            </StaggerItem>

            <StaggerItem className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/upcoming-batches" className="btn btn-primary">
                Reserve your seat <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link href="/learning-resources/placement" className="btn btn-ghost">
                Take the free placement quiz
              </Link>
            </StaggerItem>

            <StaggerItem className="mt-10 flex w-full flex-wrap items-center gap-x-10 gap-y-5 border-t border-[var(--line)] pt-7">
              {OUTCOMES.slice(0, 3).map((o) => (
                <div key={o.label}>
                  <p className="font-display text-3xl font-bold text-blue-deep">{o.fig}</p>
                  <p className="mt-1 text-xs text-ink-dim">{o.label}</p>
                </div>
              ))}
            </StaggerItem>
            </Stagger>
          </div>
        </div>

        {/* marquee ribbon */}
        <div className="relative z-10 mt-[clamp(3rem,6vw,5rem)] border-y border-[var(--line)] bg-cream-deep py-4">
          <div className="marquee mx-auto max-w-[100vw]">
            {[0, 1].map((dup) => (
              <div className="marquee__track" key={dup} aria-hidden={dup === 1}>
                {MARQUEE.map((w, i) => (
                  <span key={i} className="inline-flex items-center gap-3.5 font-display text-lg font-semibold text-ink-text/60">
                    {w} <span className="text-red">·</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== INTERACTIVE PRACTICE (cards) ==================== */}
      <LearningLab />

      {/* ============================ FEATURES ============================ */}
      <section className="bg-cream py-section-spacing">
        <div className="mx-auto max-w-[var(--container)] px-gutter">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Why French Compass</p>
            <h2 className="mt-4 font-display fs-3 font-bold">
              Small classes, real teachers, a route that ends in fluency.
            </h2>
          </Reveal>
          <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
            {FEATURES.map((f) => (
              <StaggerItem key={f.title}>
                <div className="card-warm lift h-full p-8">
                  <span className={`grid h-14 w-14 place-items-center rounded-2xl border ${featureAccent[f.tone]}`}>
                    <f.icon className="h-6 w-6" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-semibold text-ink-text">{f.title}</h3>
                  <p className="mt-3 fs-0 text-ink-dim">{f.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ============================= LEVELS ============================= */}
      <section className="relative overflow-hidden bg-cream-deep py-section-spacing">
        <div className="mx-auto max-w-[var(--container)] px-gutter">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="eyebrow">The six levels</p>
              <h2 className="mt-4 font-display fs-3 font-bold">From A1 to C2 — your route and your courses</h2>
              <p className="mt-3 font-serif-italic text-xl text-ink-dim">Six milestones. One direction. Your pace.</p>
            </div>
            <Link href="/courses" className="link-underline inline-flex items-center gap-2 font-semibold text-blue">
              Explore the full catalogue <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>

          <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {levels.map((l) => (
              <StaggerItem key={l.slug} className="h-full">
                <TiltCard className="h-full">
                  <Link
                    href={`/courses/${l.slug}`}
                    className="card-warm lift group flex h-full flex-col p-7"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display text-4xl font-bold text-blue-deep">{l.code}</span>
                      <span className="grid h-10 w-10 place-items-center rounded-full border border-[var(--line-strong)] text-ink-dim transition-colors group-hover:border-blue group-hover:bg-blue group-hover:text-white">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-lg font-semibold text-ink-text">{l.name}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-dim">{l.promise}</p>
                    <span className="mt-5 font-mono text-xs uppercase tracking-wide text-ink-dim/80">{l.cefr}</span>
                  </Link>
                </TiltCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ============================= METHOD ============================= */}
      <section className="bg-cream py-section-spacing">
        <div className="mx-auto max-w-[var(--container)] px-gutter">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow eyebrow-center">How it works</p>
            <h2 className="mt-4 font-display fs-3 font-bold">Four steps from curious to certified</h2>
          </Reveal>
          <div className="relative mt-16">
            <div aria-hidden className="absolute left-0 right-0 top-8 hidden h-px bg-[var(--line)] lg:block" />
            <Stagger className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {METHOD.map((s) => (
                <StaggerItem key={s.n} className="relative">
                  <span className="relative z-10 grid h-16 w-16 place-items-center rounded-full border border-[var(--line-strong)] bg-cream font-mono text-lg font-semibold text-blue">
                    {s.n}
                  </span>
                  <h3 className="mt-6 font-display text-lg font-semibold text-ink-text">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-dim">{s.body}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* =================== OUTCOMES + TESTIMONIALS (dark) =================== */}
      <section className="on-ink grain relative overflow-hidden py-section-spacing">
        <div aria-hidden className="spotlight-warm pointer-events-none absolute inset-0 opacity-60" />
        <div className="relative z-10 mx-auto max-w-[var(--container)] px-gutter">
          <Stagger className="grid gap-8 border-b border-foam/10 pb-16 sm:grid-cols-2 lg:grid-cols-4">
            {OUTCOMES.map((o) => (
              <StaggerItem key={o.label}>
                <p className="font-display text-5xl font-bold text-ochre-soft">{o.fig}</p>
                <p className="mt-2 text-sm text-foam-dim">{o.label}</p>
              </StaggerItem>
            ))}
          </Stagger>

          <div className="mt-16">
            <Reveal className="max-w-xl">
              <p className="eyebrow">Student stories</p>
              <h2 className="mt-4 font-display fs-2 font-bold text-foam">
                Real people, real French, real outcomes.
              </h2>
            </Reveal>
            <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <StaggerItem key={t.name}>
                  <figure className="flex h-full flex-col rounded-[var(--radius-lg)] border border-foam/10 bg-ink-panel p-7">
                    <Quote className="h-7 w-7 text-red" />
                    <blockquote className="mt-4 flex-1 font-serif-italic text-lg leading-snug text-foam">
                      "{t.quote}"
                    </blockquote>
                    <figcaption className="mt-6 border-t border-foam/10 pt-4">
                      <p className="font-semibold text-foam">{t.name}</p>
                      <p className="font-mono text-xs uppercase tracking-wide text-foam-dim">{t.meta}</p>
                    </figcaption>
                  </figure>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* =========================== INSTRUCTORS =========================== */}
      <section className="bg-cream py-section-spacing">
        <div className="mx-auto max-w-[var(--container)] px-gutter">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <p className="eyebrow">Your navigators</p>
              <h2 className="mt-4 font-display fs-3 font-bold">Three C1 instructors, one mission</h2>
            </div>
            <Link href="/about" className="link-underline inline-flex items-center gap-2 font-semibold text-blue">
              Read full bios <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
          <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
            {INSTRUCTORS.map((p) => (
              <StaggerItem key={p.name}>
                <article className="card-warm lift h-full overflow-hidden">
                  <div className="relative flex h-52 items-center justify-center overflow-hidden bg-gradient-to-br from-blue/[0.08] to-red/[0.06]">
                    {p.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.image}
                        alt={`${p.name}, ${p.role}`}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover object-top"
                      />
                    ) : (
                      <div className="h-24 w-24 [&_svg]:h-full [&_svg]:w-full">{p.icon}</div>
                    )}
                  </div>
                  <div className="p-7">
                    <h3 className="font-display text-lg font-semibold text-ink-text">{p.name}</h3>
                    <p className="mt-1 font-mono text-xs uppercase tracking-wide text-red-accent">{p.role}</p>
                    <p className="mt-4 text-sm leading-relaxed text-ink-dim">{p.bio}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {p.focus.map((tag) => (
                        <span key={tag} className="chip">{tag}</span>
                      ))}
                    </div>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ============================ FINAL CTA ============================ */}
      <section className="bg-cream pb-section-spacing">
        <div className="mx-auto max-w-[var(--container)] px-gutter">
          <Reveal>
            <div className="grain relative overflow-hidden rounded-[var(--radius-lg)] bg-gradient-to-br from-blue-deep via-blue to-blue-deep px-8 py-16 text-center sm:px-16 sm:py-20">
              <div aria-hidden className="spotlight-warm pointer-events-none absolute inset-0 opacity-70" />
              <div className="relative z-10 mx-auto max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white">
                  <Sparkles className="h-3.5 w-3.5" /> Next cohorts open now
                </span>
                <h2 className="mt-6 font-display fs-3 font-bold text-white">Your next step starts with a single class.</h2>
                <p className="mx-auto mt-4 max-w-md fs-0 text-white/80">
                  Take the free placement quiz, see the upcoming batches, or just say bonjour on WhatsApp.
                </p>
                <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Link href="/upcoming-batches" className="btn btn-cream">
                    View upcoming batches <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <Link href="/learning-resources/placement" className="btn btn-ghost">
                    Take the placement quiz
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  )
}
