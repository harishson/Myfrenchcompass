import type { Metadata } from 'next'
import { VerbTensesExperience } from '@/components/learn/VerbTensesExperience'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Master French Verb Tenses — French Compass',
  description:
    'An interactive guide to French verb tenses and moods: the indicative, subjunctive, conditional and imperative, with comparison tables, timelines and quizzes.',
}

export default function VerbTensesPage() {
  return (
    <>
      <VerbTensesExperience />
      <Footer />
    </>
  )
}
