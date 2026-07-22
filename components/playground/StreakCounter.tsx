'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Flame } from 'lucide-react'

export function StreakCounter() {
  const [streak, setStreak] = useState(0)
  const [lastPlayed, setLastPlayed] = useState<string | null>(null)
  const [hasPlayedToday, setHasPlayedToday] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return

    const stored = localStorage.getItem('dailyBearing')
    if (stored) {
      const data = JSON.parse(stored)
      const today = new Date().toDateString()
      const isToday = data.lastPlayed === today

      setLastPlayed(data.lastPlayed)
      setStreak(data.streak || 0)
      setHasPlayedToday(isToday)
    }
  }, [])

  const handlePlayDaily = () => {
    const today = new Date().toDateString()
    const stored = localStorage.getItem('dailyBearing')
    let currentStreak = 0

    if (stored) {
      const data = JSON.parse(stored)
      const lastDate = new Date(data.lastPlayed).toDateString()
      const today_str = new Date().toDateString()

      if (lastDate === today_str) {
        // Already played today
        currentStreak = data.streak
      } else {
        // Calculate day difference
        const lastDateTime = new Date(data.lastPlayed).getTime()
        const todayTime = new Date().getTime()
        const daysDiff = Math.floor((todayTime - lastDateTime) / (1000 * 60 * 60 * 24))

        if (daysDiff === 1) {
          // Consecutive day
          currentStreak = (data.streak || 1) + 1
        } else if (daysDiff > 1) {
          // Streak broken
          currentStreak = 1
        }
      }
    } else {
      currentStreak = 1
    }

    const newData = {
      streak: currentStreak,
      lastPlayed: today,
      xp: (localStorage.getItem('playerXP') ? parseInt(localStorage.getItem('playerXP')!) : 0) + 10,
    }

    localStorage.setItem('dailyBearing', JSON.stringify(newData))
    localStorage.setItem('playerXP', newData.xp.toString())

    setStreak(currentStreak)
    setLastPlayed(today)
    setHasPlayedToday(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border border-[#C08A2D]/20 bg-[#0C1826]/50 p-6 text-center"
    >
      <h3 className="font-display text-xl font-semibold text-[#EDE6D6] mb-4">Daily Bearing</h3>

      <div className="mb-6 flex justify-center">
        <motion.div
          animate={hasPlayedToday ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.6, times: [0, 0.5, 1] }}
          className="flex items-center gap-2"
        >
          <Flame className={`w-8 h-8 ${hasPlayedToday ? 'text-[#C08A2D]' : 'text-[#C08A2D]/30'}`} />
          <div className="font-mono text-4xl font-bold text-[#EDE6D6]">{streak}</div>
        </motion.div>
      </div>

      <p className="text-sm text-[#93A6BC] mb-4">
        {hasPlayedToday ? 'You\'ve played today! Come back tomorrow to extend your streak.' : 'Complete one micro-challenge daily to build your streak.'}
      </p>

      <button
        onClick={handlePlayDaily}
        disabled={hasPlayedToday}
        className={`w-full rounded-lg px-4 py-3 font-medium transition-all ${
          hasPlayedToday
            ? 'bg-[#C08A2D]/20 text-[#C08A2D] cursor-default'
            : 'bg-[#2440E8] hover:bg-[#3E59FF] text-[#EDE6D6]'
        }`}
      >
        {hasPlayedToday ? 'Done for Today' : 'Start Daily Challenge'}
      </button>

      <p className="mt-3 text-xs text-[#C08A2D]">
        <span className="font-mono font-bold">+10 XP</span> for completing today's challenge
      </p>
    </motion.div>
  )
}
