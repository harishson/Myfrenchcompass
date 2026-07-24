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
      <Section className="pt-28 md:pt-36 pb-16 md:pb-24">
        <div className="mb-10 px-4 text-center md:px-0">
          <p className="eyebrow eyebrow-center">Free placement quiz</p>
          <p className="mx-auto mt-5 max-w-xl fs-1 text-ink-dim">
            Two minutes, no signup — find your exact CEFR level and the class that fits.
          </p>
        </div>

        <div className="mx-auto max-w-2xl">
          <QuizEngine />
        </div>
      </Section>
      <Footer />
    </>
  )
}
