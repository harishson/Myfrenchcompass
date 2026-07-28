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
        className="relative mx-auto max-w-2xl overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#003A72] to-[#0055A4] p-8 text-center shadow-[0_30px_70px_rgba(0,85,164,0.30)] sm:p-12"
      >
        {/* decorative red arc */}
        <span aria-hidden className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#EF4135] opacity-20 blur-2xl" />
        <span className="relative inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 font-mono text-[0.7rem] font-medium uppercase tracking-widest text-white">
          <span className="h-1.5 w-1.5 rounded-full bg-[#EF4135]" /> Quest #1
        </span>
        <h2 className="relative mt-5 font-display text-3xl font-bold text-white sm:text-4xl">Find Your Bearing</h2>
        <p className="relative mx-auto mt-4 max-w-md leading-relaxed text-white/80">
          Take a quick 2-minute placement quiz to discover your current French level and get a personalized course recommendation.
        </p>
        <p className="relative mt-6 font-mono text-xs uppercase tracking-wider text-white/60">No signup required · Results instant</p>
        <button
          onClick={handleStart}
          className="btn relative mt-8 bg-white text-[#0055A4] shadow-[0_10px_30px_rgba(0,0,0,0.18)] hover:bg-[#EF4135] hover:text-white"
        >
          Start the quiz →
        </button>
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
        <div className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#003A72] to-[#0055A4] p-8 text-center shadow-[0_30px_70px_rgba(0,85,164,0.30)] sm:p-12">
          <span aria-hidden className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#EF4135] opacity-20 blur-2xl" />
          <div className="relative mb-6">
            <div className="inline-grid h-24 w-24 place-items-center rounded-full border-2 border-white/40 bg-white/10">
              <div className="font-display text-4xl font-bold text-white">{level}</div>
            </div>
          </div>

          <h2 className="relative font-display text-2xl font-semibold text-white mb-2">Your Estimated Level</h2>
          <p className="relative font-serif-italic text-xl text-white/80 mb-6">{levelLabel}</p>

          <div className="relative mb-6 rounded-2xl bg-white/10 p-6 border border-white/15">
            <p className="text-sm text-white/70 mb-2">You scored</p>
            <p className="font-mono text-2xl font-bold text-white">
              {score} / {quizQuestions.length}
            </p>
          </div>

          <div className="relative mb-8 p-6 rounded-2xl bg-white text-left">
            <p className="text-xs font-mono uppercase tracking-wider text-[#5C6B82] mb-3">Recommended Course</p>
            <p className="font-display text-xl font-semibold text-[#16233B] mb-4">{recommendedCourse.title}</p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Link
                href={`/courses/${recommendedCourse.slug}`}
                className="flex min-h-11 flex-1 items-center justify-center rounded-full bg-[#0055A4] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#EF4135]"
              >
                View Course
              </Link>
              <a
                href={whatsappLink(
                  `I took your placement quiz and scored ${level}. I'm interested in the ${recommendedCourse.title}.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 flex-1 items-center justify-center rounded-full border-2 border-[#0055A4] px-4 py-3 text-sm font-semibold text-[#0055A4] transition-colors hover:bg-[#0055A4]/10"
              >
                Message on WhatsApp
              </a>
            </div>
          </div>

          <button
            onClick={handleRestart}
            className="relative rounded-full border-2 border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Retake Quiz
          </button>
        </div>
      </motion.div>
    )
  }

  // Playing state
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative mx-auto max-w-2xl overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#003A72] to-[#0055A4] p-6 shadow-[0_30px_70px_rgba(0,85,164,0.30)] sm:p-9"
      ref={focusRef}
      tabIndex={-1}
    >
      {/* Progress bar */}
      <div className="mb-7">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-mono text-white/70">Question {currentIndex + 1} of {quizQuestions.length}</span>
          <span className="text-sm font-mono font-semibold text-white">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 rounded-full bg-white/15 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-[#EF4135]"
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
        className="mb-7"
      >
        {/* Deliberately French-only. Showing an English gloss under the prompt
            or the options turned this into a reading test of the translation
            rather than a measure of French comprehension, so the `en` and
            `label` fields are no longer rendered. */}
        <p className="text-xs font-mono uppercase tracking-wider text-white/60 mb-2">
          En français
        </p>
        <h3 className="font-display text-2xl font-semibold text-white">{currentQuestion.fr}</h3>
      </motion.div>

      {/* Options */}
      <div className="space-y-3">
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
                w-full text-left rounded-xl border-2 p-4 transition-all
                ${!answered ? 'cursor-pointer hover:border-white/70 hover:bg-white/10' : 'cursor-default'}
                ${isSelected && isCorrect ? 'border-white bg-white/15' : ''}
                ${isSelected && !isCorrect ? 'border-[#EF4135] bg-[#EF4135]/25' : ''}
                ${!isSelected ? 'border-white/15 bg-white/5' : ''}
                ${!isSelected && answered ? 'opacity-50' : ''}
              `}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex-shrink-0">
                  {showFeedback ? (
                    isCorrect ? (
                      <Check className="w-5 h-5 text-white" />
                    ) : (
                      <X className="w-5 h-5 text-white" />
                    )
                  ) : (
                    <div className={`w-5 h-5 rounded-full border-2 ${isSelected ? 'border-white bg-white' : 'border-white/40'}`} />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">{option.text}</p>
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
          className="rounded-lg bg-[#0055A4] border border-[#EF4135]/20 p-4 mb-8"
        >
          <p className="text-sm font-mono uppercase tracking-wider text-[#EF4135] mb-2">Explanation</p>
          <p className="text-[#C6DAF0]">{currentQuestion.explanation}</p>
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
            className="w-full bg-[#0055A4] hover:bg-[#1466BE] text-[#FFFFFF]"
          >
            {currentIndex === quizQuestions.length - 1 ? 'See Results' : 'Next Question'}
          </Button>
        </motion.div>
      )}
    </motion.div>
  )
}
