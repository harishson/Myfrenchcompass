'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'motion/react'
import { quizQuestions, calculateLevel, getLevelLabel, getRecommendedCourse } from '@/lib/quiz-data'
import { Button } from '@/components/ui/button'
import { Check, X } from 'lucide-react'
import { whatsappLink } from '@/lib/contact'

type QuizState = 'intro' | 'playing' | 'result'

export function QuizEngine() {
  const [state, setState] = useState<QuizState>('intro')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const focusRef = useRef<HTMLDivElement>(null)

  const currentQuestion = quizQuestions[currentIndex]
  const level = calculateLevel(score)
  const levelLabel = getLevelLabel(level)
  const recommendedCourse = getRecommendedCourse(level)

  const handleStart = () => {
    setState('playing')
    setCurrentIndex(0)
    setScore(0)
    setAnswered(false)
    setSelectedOption(null)
    setTimeout(() => focusRef.current?.focus(), 100)
  }

  const handleAnswer = (optionIndex: number) => {
    if (answered) return
    setSelectedOption(optionIndex)
    setAnswered(true)

    if (quizQuestions[currentIndex].options[optionIndex].isCorrect) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setAnswered(false)
      setSelectedOption(null)
      setTimeout(() => focusRef.current?.focus(), 100)
    } else {
      setState('result')
    }
  }

  const handleRestart = () => {
    handleStart()
  }

  const progress = ((currentIndex + 1) / quizQuestions.length) * 100

  if (state === 'intro') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-2xl rounded-lg border border-[#C08A2D]/20 bg-[#0C1826]/50 p-8 text-center"
      >
        <h2 className="font-display text-3xl font-semibold text-[#EDE6D6] mb-4">Find Your Bearing</h2>
        <p className="text-[#93A6BC] mb-6">
          Take a quick 2-minute placement quiz to discover your current French level and get a personalized course recommendation.
        </p>
        <p className="text-sm text-[#C08A2D] mb-8">No signup required · Results instant</p>
        <Button onClick={handleStart} className="bg-[#2440E8] hover:bg-[#3E59FF] text-[#EDE6D6]">
          Start Quiz
        </Button>
      </motion.div>
    )
  }

  if (state === 'result') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto max-w-2xl"
      >
        <div className="rounded-lg border border-[#C08A2D]/20 bg-[#0C1826]/50 p-8 text-center">
          <div className="mb-6">
            <div className="inline-block rounded-full bg-[#2440E8]/20 border-2 border-[#2440E8] p-6">
              <div className="font-display text-4xl font-bold text-[#2440E8]">{level}</div>
            </div>
          </div>

          <h2 className="font-display text-2xl font-semibold text-[#EDE6D6] mb-2">Your Estimated Level</h2>
          <p className="text-lg text-[#C08A2D] mb-6">{levelLabel}</p>

          <div className="mb-8 rounded-lg bg-[#0C1826] p-6 border border-[#C08A2D]/10">
            <p className="text-sm text-[#93A6BC] mb-2">You scored</p>
            <p className="font-mono text-2xl font-bold text-[#EDE6D6]">
              {score} / {quizQuestions.length}
            </p>
          </div>

          <div className="mb-8 p-6 rounded-lg bg-[#1A2A3F] border border-[#2440E8]/20">
            <p className="text-sm text-[#93A6BC] mb-3">Recommended Course</p>
            <p className="font-display text-xl font-semibold text-[#EDE6D6] mb-4">{recommendedCourse.title}</p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Link
                href={`/courses/${recommendedCourse.slug}`}
                className="flex min-h-11 flex-1 items-center justify-center rounded-lg bg-[#C08A2D] px-4 py-3 text-sm font-medium text-[#0C1826] transition-colors hover:bg-[#D9A855]"
              >
                View Course
              </Link>
              <a
                href={whatsappLink(
                  `I took your placement quiz and scored ${level}. I'm interested in the ${recommendedCourse.title}.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-lg border border-[#C08A2D] px-4 py-3 text-sm font-medium text-[#C08A2D] hover:bg-[#C08A2D]/10 transition-colors"
              >
                Message on WhatsApp
              </a>
            </div>
          </div>

          <Button
            onClick={handleRestart}
            variant="outline"
            className="border-[#2440E8] text-[#2440E8] hover:bg-[#2440E8]/10"
          >
            Retake Quiz
          </Button>
        </div>
      </motion.div>
    )
  }

  // Playing state
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mx-auto max-w-2xl"
      ref={focusRef}
      tabIndex={-1}
    >
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-mono text-[#93A6BC]">Question {currentIndex + 1} of {quizQuestions.length}</span>
          <span className="text-sm font-mono text-[#C08A2D]">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 rounded-full bg-[#0C1826] border border-[#C08A2D]/20 overflow-hidden">
          <motion.div
            className="h-full bg-[#2440E8]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-lg border border-[#C08A2D]/20 bg-[#0C1826]/50 p-8 mb-8"
      >
        <p className="text-sm font-mono uppercase tracking-wider text-[#C08A2D] mb-2">
          {currentQuestion.en ? 'Bilingual' : 'French only'}
        </p>
        <h3 className="font-display text-2xl font-semibold text-[#EDE6D6] mb-4">{currentQuestion.fr}</h3>
        {currentQuestion.en && (
          <p className="text-[#93A6BC] italic">{currentQuestion.en}</p>
        )}
      </motion.div>

      {/* Options */}
      <div className="space-y-3 mb-8">
        {currentQuestion.options.map((option, idx) => {
          const isSelected = selectedOption === idx
          const isCorrect = option.isCorrect
          const showFeedback = answered && isSelected

          return (
            <motion.button
              key={idx}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => handleAnswer(idx)}
              disabled={answered}
              className={`
                w-full text-left rounded-lg border-2 p-4 transition-all
                ${!answered ? 'cursor-pointer hover:border-[#2440E8] hover:bg-[#2440E8]/5' : 'cursor-default'}
                ${isSelected && isCorrect ? 'border-[#3E8F7C] bg-[#3E8F7C]/10' : ''}
                ${isSelected && !isCorrect ? 'border-red-500/50 bg-red-500/5' : ''}
                ${!isSelected && answered ? 'border-[#C08A2D]/20 opacity-50' : 'border-[#C08A2D]/20'}
              `}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1 flex-shrink-0">
                  {showFeedback ? (
                    isCorrect ? (
                      <Check className="w-5 h-5 text-[#3E8F7C]" />
                    ) : (
                      <X className="w-5 h-5 text-red-400" />
                    )
                  ) : (
                    <div className={`w-5 h-5 rounded-full border-2 ${isSelected ? 'border-[#2440E8] bg-[#2440E8]' : 'border-[#C08A2D]/30'}`} />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-[#EDE6D6] font-medium">{option.text}</p>
                  {option.label && (
                    <p className="text-sm text-[#93A6BC]">{option.label}</p>
                  )}
                </div>
              </div>
            </motion.button>
          )
        })}
      </div>

      {/* Explanation */}
      {answered && currentQuestion.explanation && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg bg-[#1A2A3F] border border-[#C08A2D]/20 p-4 mb-8"
        >
          <p className="text-sm font-mono uppercase tracking-wider text-[#C08A2D] mb-2">Explanation</p>
          <p className="text-[#93A6BC]">{currentQuestion.explanation}</p>
        </motion.div>
      )}

      {/* Next button */}
      {answered && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button
            onClick={handleNext}
            className="w-full bg-[#2440E8] hover:bg-[#3E59FF] text-[#EDE6D6]"
          >
            {currentIndex === quizQuestions.length - 1 ? 'See Results' : 'Next Question'}
          </Button>
        </motion.div>
      )}
    </motion.div>
  )
}
