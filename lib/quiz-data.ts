export type QuizQuestion = {
  id: string
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1'
  type: 'multiple-choice' | 'true-false' | 'vocab'
  fr: string
  en?: string
  options: { text: string; label?: string; isCorrect: boolean }[]
  explanation?: string
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    level: 'A1',
    type: 'multiple-choice',
    fr: 'Bonjour! Comment allez-vous?',
    en: 'Hello! How are you? (formal)',
    options: [
      { text: 'Je suis un étudiant.', label: 'I am a student.', isCorrect: false },
      { text: 'Je vais bien, merci. Et toi?', label: "I'm fine, thanks. And you?", isCorrect: true },
      { text: 'Je suis à Paris.', label: 'I am in Paris.', isCorrect: false },
      { text: 'Je m\'appelle Marie.', label: 'My name is Marie.', isCorrect: false },
    ],
    explanation: 'When someone asks "Comment allez-vous?" (How are you?), the proper response is "Je vais bien, merci. Et toi?" or a similar greeting.',
  },
  {
    id: 'q2',
    level: 'A1',
    type: 'vocab',
    fr: 'Quel est le contraire de "petit"?',
    en: 'What is the opposite of "small"?',
    options: [
      { text: 'grand', label: 'big', isCorrect: true },
      { text: 'bleu', label: 'blue', isCorrect: false },
      { text: 'rapide', label: 'fast', isCorrect: false },
      { text: 'jeune', label: 'young', isCorrect: false },
    ],
  },
  {
    id: 'q3',
    level: 'A2',
    type: 'multiple-choice',
    fr: 'Je _____ au café hier soir avec mes amis.',
    en: 'I _____ at the café last night with my friends.',
    options: [
      { text: 'suis allé', label: 'went', isCorrect: true },
      { text: 'vais', label: 'go', isCorrect: false },
      { text: 'irai', label: 'will go', isCorrect: false },
      { text: 'allais', label: 'was going', isCorrect: false },
    ],
    explanation: 'Hier soir (last night) indicates past time, so we use passé composé: "Je suis allé".',
  },
  {
    id: 'q4',
    level: 'B1',
    type: 'multiple-choice',
    fr: 'Si j\'avais plus de temps, je _____ en France.',
    en: 'If I had more time, I _____ to France.',
    options: [
      { text: 'irais', label: 'would go', isCorrect: true },
      { text: 'vais', label: 'go', isCorrect: false },
      { text: 'irai', label: 'will go', isCorrect: false },
      { text: 'suis allé', label: 'went', isCorrect: false },
    ],
    explanation: 'Conditional: Si + imparfait → conditionnel. "Si j\'avais... je irais".',
  },
  {
    id: 'q5',
    level: 'B1',
    type: 'true-false',
    fr: 'Le subjunctif s\'utilise toujours après "croire que".',
    en: 'The subjunctive is always used after "croire que" (to believe that).',
    options: [
      { text: 'Vrai (True)', isCorrect: false },
      { text: 'Faux (False)', isCorrect: true },
    ],
    explanation: 'Croire que takes the indicative, not the subjunctive. But douter que takes the subjunctive.',
  },
  {
    id: 'q6',
    level: 'B2',
    type: 'multiple-choice',
    fr: 'À moins qu\'il ne _____ malade, il viendra à la réunion.',
    en: 'Unless he _____ sick, he will come to the meeting.',
    options: [
      { text: 'soit', label: 'is (subjunctive)', isCorrect: true },
      { text: 'est', label: 'is (indicative)', isCorrect: false },
      { text: 'serait', label: 'would be (conditional)', isCorrect: false },
      { text: 'a été', label: 'was (passé composé)', isCorrect: false },
    ],
    explanation: '"À moins que" always requires the subjunctive form: "soit".',
  },
  {
    id: 'q7',
    level: 'B2',
    type: 'vocab',
    fr: 'Parmi ces mots, lequel est un synonyme de "amasser"?',
    en: 'Among these words, which is a synonym of "amasser" (to accumulate)?',
    options: [
      { text: 'accumuler', label: 'to accumulate', isCorrect: true },
      { text: 'disperser', label: 'to scatter', isCorrect: false },
      { text: 'partager', label: 'to share', isCorrect: false },
      { text: 'perdre', label: 'to lose', isCorrect: false },
    ],
  },
  {
    id: 'q8',
    level: 'C1',
    type: 'multiple-choice',
    fr: 'L\'auteur recourt à la métaphore afin de _____ la complexité du phénomène.',
    en: 'The author resorts to metaphor in order to _____ the complexity of the phenomenon.',
    options: [
      { text: 'élucider', label: 'to clarify', isCorrect: true },
      { text: 'obscurcir', label: 'to obscure', isCorrect: false },
      { text: 'résumer', label: 'to summarize', isCorrect: false },
      { text: 'critiquer', label: 'to critique', isCorrect: false },
    ],
  },
]

// Scoring thresholds for CEFR levels
export const levelThresholds = {
  A1: { min: 0, max: 2, label: 'Absolute Beginner — Shallow waters' },
  A2: { min: 3, max: 4, label: 'Elementary — Near shore' },
  B1: { min: 5, max: 5, label: 'Intermediate — Open sea' },
  B2: { min: 6, max: 6, label: 'Upper Intermediate — Deep water' },
  C1: { min: 7, max: 8, label: 'Advanced — High latitudes' },
}

export function calculateLevel(score: number): 'A1' | 'A2' | 'B1' | 'B2' | 'C1' {
  if (score <= 2) return 'A1'
  if (score === 3 || score === 4) return 'A2'
  if (score === 5) return 'B1'
  if (score === 6) return 'B2'
  return 'C1'
}

export function getLevelLabel(level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1'): string {
  return levelThresholds[level].label
}

export function getRecommendedCourse(
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1'
): { slug: string; title: string; code: string } {
  const courseMap = {
    A1: { slug: 'a1-absolute-beginner', title: 'A1 — Absolute Beginner', code: 'A1' },
    A2: { slug: 'a2-elementary', title: 'A2 — Elementary', code: 'A2' },
    B1: { slug: 'b1-intermediate', title: 'B1 — Intermediate', code: 'B1' },
    B2: { slug: 'b2-upper-intermediate', title: 'B2 — Upper Intermediate', code: 'B2' },
    C1: { slug: 'dalf-c1-masterclass', title: 'DALF C1 Masterclass', code: 'DALF C1' },
  }
  return courseMap[level]
}
