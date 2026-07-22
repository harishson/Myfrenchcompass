'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Trophy, Star, Zap } from 'lucide-react'

type Badge = {
  id: string
  name: string
  description: string
  /** Lucide icons and the local `Flame` fallback both satisfy this. */
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  color: string
  unlockedAt?: Date
}

const availableBadges: Badge[] = [
  {
    id: 'first-step',
    name: 'First Step',
    description: 'Complete your first Daily Bearing',
    icon: Star,
    color: '#C08A2D',
  },
  {
    id: 'week-warrior',
    name: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: Flame,
    color: '#E63946',
  },
  {
    id: 'month-master',
    name: 'Month Master',
    description: 'Maintain a 30-day streak',
    icon: Trophy,
    color: '#FFB703',
  },
  {
    id: 'quiz-taker',
    name: 'Quiz Taker',
    description: 'Complete the placement quiz',
    icon: Zap,
    color: '#2440E8',
  },
]

export function ProgressMap() {
  const [xp, setXP] = useState(0)
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>([])

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Load XP and daily bearing data
    const savedXP = localStorage.getItem('playerXP')
    const dailyBearing = localStorage.getItem('dailyBearing')

    if (savedXP) setXP(parseInt(savedXP))

    // Check badge unlock conditions
    const unlocked: string[] = []
    if (dailyBearing) {
      const data = JSON.parse(dailyBearing)
      if (data.streak >= 1) unlocked.push('first-step')
      if (data.streak >= 7) unlocked.push('week-warrior')
      if (data.streak >= 30) unlocked.push('month-master')
    }

    const hasQuizzed = localStorage.getItem('quizCompleted')
    if (hasQuizzed) unlocked.push('quiz-taker')

    setUnlockedBadges(unlocked)
  }, [])

  const level = Math.floor(xp / 100) + 1
  const nextLevelXP = level * 100
  const currentLevelXP = (level - 1) * 100
  const progress = ((xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border border-[#C08A2D]/20 bg-[#0C1826]/50 p-8"
    >
      <h3 className="font-display text-2xl font-semibold text-[#EDE6D6] mb-8">Your Progress</h3>

      {/* XP and Level */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Level */}
        <div className="rounded-lg bg-gradient-to-br from-[#2440E8]/20 to-[#C08A2D]/20 border border-[#C08A2D]/20 p-6 text-center">
          <p className="text-sm text-[#93A6BC] mb-2">Current Level</p>
          <div className="font-display text-4xl font-bold text-[#2440E8] mb-2">{level}</div>
          <p className="text-xs text-[#C08A2D]">Explorer</p>
        </div>

        {/* XP Progress */}
        <div className="rounded-lg bg-gradient-to-br from-[#C08A2D]/20 to-[#2440E8]/20 border border-[#C08A2D]/20 p-6">
          <p className="text-sm text-[#93A6BC] mb-2">Experience Points</p>
          <div className="font-mono text-2xl font-bold text-[#EDE6D6] mb-3">
            {xp} / {nextLevelXP}
          </div>
          <div className="h-2 rounded-full bg-[#0C1826] border border-[#C08A2D]/20 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#2440E8] to-[#C08A2D]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-xs text-[#93A6BC] mt-2">{Math.round(progress)}% to next level</p>
        </div>
      </div>

      {/* Badges */}
      <div>
        <h4 className="font-display text-lg font-semibold text-[#EDE6D6] mb-4">Achievements</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {availableBadges.map((badge) => {
            const unlocked = unlockedBadges.includes(badge.id)
            const Icon = badge.icon

            return (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={unlocked ? { scale: 1.05 } : {}}
                className={`relative rounded-lg border-2 p-4 text-center transition-all ${
                  unlocked
                    ? `border-[${badge.color}] bg-[${badge.color}]/10`
                    : 'border-[#C08A2D]/20 bg-[#0C1826]/30 opacity-50'
                }`}
              >
                <div
                  className="mx-auto w-10 h-10 rounded-full flex items-center justify-center mb-2"
                  style={{
                    backgroundColor: unlocked ? `${badge.color}20` : 'transparent',
                  }}
                >
                  <Icon
                    className="w-6 h-6"
                    style={{ color: unlocked ? badge.color : '#93A6BC' }}
                  />
                </div>
                <p className="text-xs font-semibold text-[#EDE6D6]">{badge.name}</p>
                <p className="text-xs text-[#93A6BC] mt-1">{badge.description}</p>

                {unlocked && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#3E8F7C] flex items-center justify-center"
                  >
                    <span className="text-xs text-[#EDE6D6]">✓</span>
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}

// Flame icon (for badges, in case it wasn't imported)
export function Flame({
  className,
  style,
}: {
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2c1.1 0 2 .9 2 2v5.26c1.62 1.38 2.64 3.44 2.64 5.74 0 4.42-3.58 8-8 8s-8-3.58-8-8c0-2.3 1.02-4.36 2.64-5.74V4c0-1.1.9-2 2-2h7m0 18c3.31 0 6-2.69 6-6 0-1.75-.76-3.31-1.96-4.4L15 7v8c0 2.21-1.79 4-4 4s-4-1.79-4-4V7l-.04.6C6.76 8.69 6 10.25 6 12c0 3.31 2.69 6 6 6z" />
    </svg>
  )
}
