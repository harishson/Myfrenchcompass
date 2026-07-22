'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from './ui/button'
import { CompassRose } from './CompassRose'
import { whatsappLink } from '@/lib/contact'
import { Compass, Share2, BookOpen } from 'lucide-react'

type QuizQuestion = {
  id: number
  question: string
  type: 'multiple-choice' | 'self-assess'
  options: string[]
  correctIndex?: number
  points: number[]
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'How do you introduce yourself in French?',
    type: 'multiple-choice',
    options: [
      'Je m\'appelle... / Je suis...',
      'Comment t\'appelles-tu?',
      'Enchanté(e) de vous rencontrer.',
      'Qu\'est-ce que tu fais?',
    ],
    correctIndex: 0,
    points: [10, 0, 0, 0],
  },
  {
    id: 2,
    question: 'Complete: "Je vais **__** café tous les matins."',
    type: 'multiple-choice',
    options: ['à', 'au', 'en', 'dans'],
    correctIndex: 1,
    points: [0, 15, 0, 0],
  },
  {
    id: 3,
    question: 'What tense is: "Je serais heureux(se) si tu venais."?',
    type: 'multiple-choice',
    options: [
      'Présent',
      'Passé composé',
      'Conditionnel',
      'Subjonctif',
    ],
    correctIndex: 2,
    points: [0, 0, 20, 5],
  },
  {
    id: 4,
    question:
      'Read: "Les amies de ma mère habitent en Suisse depuis dix ans." What does "depuis" mean?',
    type: 'multiple-choice',
    options: ['before', 'since/for', 'after', 'during'],
    correctIndex: 1,
    points: [0, 12, 0, 0],
  },
  {
    id: 5,
    question: 'How comfortable are you having unscripted conversations?',
    type: 'self-assess',
    options: ['Panicked', 'Few words', 'Simple sentences', 'Natural flow'],
    points: [0, 8, 15, 25],
  },
  {
    id: 6,
    question: 'Which past tense form is correct: "J\'**__** allé(e) au marché."',
    type: 'multiple-choice',
    options: ['ai', 'suis', 'était', 'vais'],
    correctIndex: 1,
    points: [0, 18, 0, 0],
  },
  {
    id: 7,
    question:
      'Conjugate: "Si j\'**__** riche, j\'achèterais un château." (être)',
    type: 'multiple-choice',
    options: ['suis', 'étais', 'serais', 'sois'],
    correctIndex: 1,
    points: [0, 20, 5, 0],
  },
  {
    id: 8,
    question: 'How would you describe your listening comprehension level?',
    type: 'self-assess',
    options: [
      'Understand very little',
      'Catch keywords',
      'Follow main ideas',
      'Understand nuance',
    ],
    points: [0, 8, 16, 25],
  },
  {
    id: 9,
    question:
      'Choose the correct form: "Il faut que tu **__** tes devoirs." (faire)',
    type: 'multiple-choice',
    options: ['fasses', 'fais', 'fasses', 'fassent'],
    correctIndex: 0,
    points: [22, 0, 22, 0],
  },
  {
    id: 10,
    question: 'What is your primary goal for learning French?',
    type: 'self-assess',
    options: [
      'General interest',
      'Travel & culture',
      'Immigration / work',
      'Exam certification',
    ],
    points: [0, 0, 0, 0],
  },
]

type LevelResult = {
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1'
  journey: string
  recommendation: string
  recommendedCourse: string
  emoji: string
}

const levelMap: Record<number, LevelResult> = {
  0: {
    level: 'A1',
    journey: 'Setting Sail',
    recommendation: 'You\'re just beginning—perfect timing to chart your course!',
    recommendedCourse: 'A1 — Absolute Beginner',
    emoji: '🧭',
  },
  1: {
    level: 'A2',
    journey: 'Coastal Waters',
    recommendation:
      'You know the basics. Time to build real conversational confidence.',
    recommendedCourse: 'A2 — Elementary',
    emoji: '🌊',
  },
  2: {
    level: 'B1',
    journey: 'Open Sea',
    recommendation:
      'You\'re hitting stride. B1 opens doors to work, travel, and deeper discussions.',
    recommendedCourse: 'B1 — Intermediate',
    emoji: '🌅',
  },
  3: {
    level: 'B2',
    journey: 'Near Shore Mastery',
    recommendation:
      'You\'re nearly fluent. B2 is your ticket to CLB 7 and beyond.',
    recommendedCourse: 'B2 — Upper Intermediate',
    emoji: '⛵',
  },
  4: {
    level: 'C1',
    journey: 'Master Navigator',
    recommendation:
      'Exceptional! Explore DALF C1/C2 or teach others—you\'re at home in French.',
    recommendedCourse: 'DALF C1 Masterclass',
    emoji: '🗺️',
  },
}

interface PlacementQuizProps {
  onComplete?: (result: LevelResult) => void
}

export function PlacementQuiz({ onComplete }: PlacementQuizProps) {
  const [stage, setStage] = useState<'intro' | 'quiz' | 'result'>('intro')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [result, setResult] = useState<LevelResult | null>(null)

  const handleStart = () => {
    setStage('quiz')
  }

  const handleAnswer = (selectedIndex: number) => {
    const question = quizQuestions[currentQuestion]
    const points = question.points[selectedIndex] || 0
    setScore(score + points)
    setAnswers([...answers, selectedIndex])

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      completeQuiz(score + points)
    }
  }

  const completeQuiz = (finalScore: number) => {
    let levelBucket = 0
    if (finalScore >= 140) levelBucket = 4
    else if (finalScore >= 100) levelBucket = 3
    else if (finalScore >= 70) levelBucket = 2
    else if (finalScore >= 35) levelBucket = 1

    const resultData = levelMap[levelBucket]
    setResult(resultData)
    setStage('result')
    onComplete?.(resultData)
  }

  const handleReset = () => {
    setStage('intro')
    setCurrentQuestion(0)
    setScore(0)
    setAnswers([])
    setResult(null)
  }

  if (stage === 'intro') {
    return (
      <div className="max-w-2xl mx-auto px-6 py-12 text-center">
        <div className="mb-6">
          <Compass className="w-12 h-12 text-[#C08A2D] mx-auto mb-4" />
          <h2 className="font-display text-4xl font-semibold text-[#0C1826] mb-2">
            Find Your Bearing
          </h2>
          <p className="text-[#546575] text-lg">
            2 minutes, 10 questions. No login needed.
          </p>
        </div>

        <div className="bg-[#EAE0CC] rounded-lg p-6 mb-8 text-left">
          <p className="text-[#122130] mb-3">
            We&apos;ll ask a mix of <strong>grammar</strong>, <strong>vocab</strong>,
            and <strong>comfort-level</strong> questions to pinpoint your exact CEFR level.
            No penalty for guessing — just be honest about how you feel.
          </p>
          <p className="text-[#546575] text-sm">
            Your result shows you a recommended course + a WhatsApp shortcut to book.
          </p>
        </div>

        <Button
          onClick={handleStart}
          size="lg"
          className="bg-[#2440E8] text-[#EDE6D6] hover:bg-[#3E59FF]"
        >
          Start Quiz →
        </Button>
      </div>
    )
  }

  if (stage === 'quiz') {
    const question = quizQuestions[currentQuestion]
    const progress = ((currentQuestion + 1) / quizQuestions.length) * 100

    return (
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase tracking-[0.14em] text-[#546575]">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </span>
            <span className="text-xs font-mono text-[#C08A2D]">{Math.round(progress)}%</span>
          </div>
          <div className="h-1 bg-[#EAE0CC] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#2440E8] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <h3 className="font-display text-2xl font-semibold text-[#0C1826] mb-6">
          {question.question}
        </h3>

        {/* Options */}
        <div className="space-y-3 mb-8">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className="w-full text-left p-4 rounded-lg border-2 border-[#EAE0CC] bg-white hover:border-[#2440E8] hover:bg-[#EDE6D6] transition-all text-[#122130]"
            >
              {option}
            </button>
          ))}
        </div>

        {/* Hint */}
        <p className="text-xs text-[#546575] text-center">
          {question.type === 'self-assess'
            ? 'No wrong answers here — just be honest.'
            : 'Choose the best answer.'}
        </p>
      </div>
    )
  }

  if (stage === 'result' && result) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-12 text-center">
        {/* Result Badge */}
        <div className="mb-8">
          <div className="text-5xl mb-4">{result.emoji}</div>
          <h2 className="font-display text-5xl font-semibold text-[#0C1826] mb-2">
            Your Level: <span className="text-[#2440E8]">{result.level}</span>
          </h2>
          <p className="text-lg text-[#C08A2D] font-mono font-semibold">
            {result.journey}
          </p>
        </div>

        {/* Message */}
        <div className="bg-[#F3EBDB] rounded-lg p-6 mb-8 text-left border-2 border-[#C08A2D]">
          <p className="text-[#122130] font-display text-lg mb-3">
            {result.recommendation}
          </p>
          <p className="text-[#546575]">
            <strong>Recommended next step:</strong> {result.recommendedCourse}
          </p>
        </div>

        {/* CTAs */}
        <div className="space-y-3 mb-8">
          <Button
            asChild
            size="lg"
            className="w-full bg-[#2440E8] text-[#EDE6D6] hover:bg-[#3E59FF]"
          >
            <Link href={`/courses?level=${result.level.toLowerCase()}`}>
              <BookOpen className="w-4 h-4 mr-2" />
              View {result.recommendedCourse.split('—')[0].trim()} Course
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full border-[#122130]/20 text-[#122130] hover:bg-[#EAE0CC]"
          >
            <a
              href={whatsappLink(`I just took the placement quiz and got ${result.level} - ${result.journey} level. I'd like to know more about the ${result.recommendedCourse} course.`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Message Your Result on WhatsApp
            </a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full border-[#122130]/20 text-[#122130] hover:bg-[#EAE0CC]"
            onClick={() => {
              const text = `I just scored ${result.level} on the French Compass placement quiz: "${result.journey}". Find your level at frenchcompass.in/playground/placement 🧭`
              if (navigator.share) {
                navigator.share({
                  title: 'My French Compass Level',
                  text,
                })
              }
            }}
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share Your Level
          </Button>
        </div>

        {/* Retake */}
        <button
          onClick={handleReset}
          className="text-sm text-[#546575] hover:text-[#122130] underline"
        >
          Retake Quiz
        </button>
      </div>
    )
  }

  return null
}
