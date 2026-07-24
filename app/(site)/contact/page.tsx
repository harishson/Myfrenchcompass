import { Suspense } from 'react'
import { Footer } from '@/components/Footer'
import { Section } from '@/components/Section'
import { ContactForm } from '@/components/ContactForm'
import { Reveal } from '@/components/Reveal'
import { Compass } from 'lucide-react'

export const metadata = {
  title: 'Contact Us | French Compass',
  description: 'Get in touch with French Compass. Book a demo class, ask questions, or start your French learning journey.',
}

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <Section variant="parchment" className="pt-20 md:pt-32 pb-12 md:pb-16">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center mb-12">
          <Reveal>
            <div className="inline-flex items-center gap-2 mb-4">
              <Compass className="w-5 h-5 text-[#EF4135]" />
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-[#EF4135]">
                Let's connect
              </span>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-semibold text-[#003A72] mb-6">
              Plot Your Course
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="text-lg text-[#5C6B82] max-w-2xl mx-auto">
              Fill out the form below or message us directly on WhatsApp. We'll help you find your bearing and chart the perfect path to fluent French.
            </p>
          </Reveal>
        </div>

        {/* Form on dark background */}
        <Reveal delay={220}>
          <div className="on-ink relative overflow-hidden rounded-2xl border border-foam/10 bg-ink p-6 shadow-[var(--shadow-lift)] md:p-12 max-w-2xl mx-auto">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(600px 240px at 80% -10%, rgba(36,64,232,0.16), transparent 65%)',
              }}
            />
            <div className="relative">
              {/* ContactForm reads ?course= via useSearchParams, which opts the
                  route into client-side bailout. Without this boundary the
                  whole page fails to prerender at build time. */}
              <Suspense fallback={<ContactFormSkeleton />}>
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </Reveal>
      </Section>

      <Footer />
    </>
  )
}

/**
 * Mirrors the ContactForm's block rhythm so the Suspense swap doesn't shift
 * layout. Purely decorative — hidden from assistive tech.
 */
function ContactFormSkeleton() {
  return (
    <div aria-hidden className="animate-pulse space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="h-16 rounded-lg bg-foam/5" />
        <div className="h-16 rounded-lg bg-foam/5" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="h-16 rounded-lg bg-foam/5" />
        <div className="h-16 rounded-lg bg-foam/5" />
      </div>
      <div className="h-16 rounded-lg bg-foam/5" />
      <div className="h-16 rounded-lg bg-foam/5" />
      <div className="h-28 rounded-lg bg-foam/5" />
      <div className="h-11 rounded-lg bg-azimuth/30" />
    </div>
  )
}
