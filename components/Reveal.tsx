'use client'

import { motion, useReducedMotion } from 'motion/react'
import { animationConfig, viewportOnce } from '@/lib/animations'

interface RevealProps {
  children: React.ReactNode
  /** Delay in milliseconds. */
  delay?: number
  className?: string
  /** Where the element travels in from. */
  from?: 'bottom' | 'left' | 'right' | 'scale'
}

const OFFSETS = {
  bottom: { y: 18, x: 0, scale: 1 },
  left: { y: 0, x: -22, scale: 1 },
  right: { y: 0, x: 22, scale: 1 },
  scale: { y: 10, x: 0, scale: 0.97 },
} as const

/**
 * Fade + rise reveal with scroll-into-view.
 * Fully static under prefers-reduced-motion.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  from = 'bottom',
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion()

  // Render the same box either way — returning a bare fragment here used to
  // drop `className`, so reduced-motion users lost the wrapper's layout.
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  const offset = OFFSETS[from]

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={viewportOnce}
      transition={{
        duration: animationConfig.durations.slow / 1000,
        ease: animationConfig.revealEasing,
        delay: delay / 1000,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
