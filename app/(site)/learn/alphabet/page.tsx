import type { Metadata } from 'next'
import { AlphabetExperience } from '@/components/learn/AlphabetExperience'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Master the French Alphabet — French Compass',
  description:
    "An interactive journey through l'alphabet français: every letter, sound, name and accent, plus flashcards and a quiz to lock it in.",
}

export default function AlphabetPage() {
  return (
    <>
      <AlphabetExperience />
      <Footer />
    </>
  )
}
