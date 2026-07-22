'use client'

/* =========================================================================
   ScrollProgress — a brass hairline across the top of the viewport that
   fills as you move down the page.

   Reads as an instrument gauge rather than a generic progress bar, which is
   why it's a 2px brass rule rather than a coloured block. Sits directly under
   the fixed header.
   ========================================================================= */

import { motion, useScroll, useSpring, useReducedMotion } from 'motion/react'

export function ScrollProgress() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()

  // Spring the raw progress so the bar glides instead of tracking scroll
  // jitter one-to-one on trackpads.
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  })

  // A progress indicator is information, not decoration — keep it for
  // reduced-motion users, just without the spring smoothing.
  const value = reduce ? scrollYProgress : scaleX

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-[var(--header-h)] z-50 h-0.5 origin-left"
      style={{
        scaleX: value,
        background:
          'linear-gradient(90deg, var(--color-brass), var(--color-brass-soft) 55%, var(--color-azimuth))',
      }}
    />
  )
}
