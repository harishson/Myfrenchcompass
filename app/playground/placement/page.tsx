import { Metadata } from 'next'
import { Footer } from '@/components/Footer'
import { Section } from '@/components/Section'
import { QuizEngine } from '@/components/playground/QuizEngine'

export const metadata: Metadata = {
  title: 'Find Your Bearing — Placement Quiz | French Compass',
  description: 'Take our free 2-minute placement quiz to discover your CEFR French level (A1-C1) and get personalized course recommendations.',
  openGraph: {
    title: 'Find Your Bearing — Placement Quiz | French Compass',
    description: 'Free 2-minute placement quiz — discover your CEFR level and get personalized course recommendations.',
    type: 'website',
  },
}

export default function PlacementPage() {
  return (
    <>
      <Section className="pt-20 md:pt-32 pb-12 md:pb-20" dark>
        <div className="mb-12 px-4 md:px-0 text-center">
          <span className="inline-block rounded-full bg-[#2440E8]/10 px-4 py-2 mb-4">
            <span className="font-mono text-xs uppercase tracking-wider text-[#2440E8]">Quest #1</span>
          </span>
          <h1 className="font-display text-2xl md:text-4xl font-semibold text-[#EDE6D6] mb-3">
            Find Your Bearing
          </h1>
          <p className="text-lg text-[#93A6BC] max-w-2xl mx-auto">
            Discover your current French level in just 2 minutes. No signup required — instant results and personalized course recommendations.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <QuizEngine />
        </div>
      </Section>
      <Footer />
    </>
  )
}
