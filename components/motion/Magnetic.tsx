'use client'

/* =========================================================================
   Magnetic — an element that leans toward the cursor.

   Deliberately restrained: pull is clamped to a fraction of the distance so
   the element never leaves its own hit box, and it always springs back on
   leave. Reserve this for the ONE primary action in a view; used on every
   button it stops reading as craft and starts reading as noise.

   Pointer-driven only — it no-ops on touch (where there is no hover) and
   under prefers-reduced-motion.
   ========================================================================= */

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react'
import { springs } from '@/lib/animations'
import { cn } from '@/lib/utils'

interface MagneticProps {
  children: React.ReactNode
  className?: string
  /** Fraction of the cursor offset the element travels. Keep well under 1. */
  strength?: number
  /** Max travel in px, whichever limit is hit first. */
  max?: number
}

export function Magnetic({
  children,
  className,
  strength = 0.28,
  max = 12,
}: MagneticProps) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, springs.pointer)
  const sy = useSpring(y, springs.pointer)

  const clamp = (n: number) => Math.max(-max, Math.min(max, n))

  const handleMove = (e: React.PointerEvent<HTMLSpanElement>) => {
    // Coarse pointers have no hover state; a "magnetic" tap just feels laggy.
    if (reduce || e.pointerType !== 'mouse') return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    x.set(clamp((e.clientX - (r.left + r.width / 2)) * strength))
    y.set(clamp((e.clientY - (r.top + r.height / 2)) * strength))
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.span
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      // Cancelled/lost pointers must reset too, or the element sticks off-centre.
      onPointerCancel={reset}
      onBlur={reset}
      style={reduce ? undefined : { x: sx, y: sy }}
      className={cn('inline-block', className)}
    >
      {children}
    </motion.span>
  )
}
