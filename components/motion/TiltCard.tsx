'use client'

/* =========================================================================
   TiltCard — a card that tilts in 3D toward the cursor, with a specular
   sheen that tracks the same point so the light and the geometry agree.

   The sheen is the part that sells it: tilt alone reads as a gimmick, but
   tilt + a highlight that moves like a real reflection reads as a physical
   surface. Angles are kept small (default 6°) — past ~10° text starts to
   distort and the effect turns into a toy.

   Mouse-only, and fully inert under prefers-reduced-motion.
   ========================================================================= */

import { useRef, useState } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'motion/react'
import { springs } from '@/lib/animations'
import { cn } from '@/lib/utils'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  /** Max rotation in degrees on each axis. */
  intensity?: number
  /** Show the moving specular highlight. */
  sheen?: boolean
}

export function TiltCard({
  children,
  className,
  intensity = 6,
  sheen = true,
}: TiltCardProps) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  // Normalised pointer position within the card, -0.5 → 0.5 on both axes.
  const px = useMotionValue(0)
  const py = useMotionValue(0)

  const rotateX = useSpring(
    useTransform(py, [-0.5, 0.5], [intensity, -intensity]),
    springs.pointer,
  )
  const rotateY = useSpring(
    useTransform(px, [-0.5, 0.5], [-intensity, intensity]),
    springs.pointer,
  )

  // Drive the sheen from the same values so light and geometry agree.
  const sheenBg = useTransform(
    [px, py],
    ([x, y]: number[]) =>
      `radial-gradient(420px circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(216,174,99,0.13), transparent 65%)`,
  )

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== 'mouse') return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
    if (!active) setActive(true)
  }

  const reset = () => {
    px.set(0)
    py.set(0)
    setActive(false)
  }

  if (reduce) {
    return <div className={cn('relative', className)}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        // Long perspective = subtle, architectural tilt rather than fisheye.
        perspective: 1200,
      }}
      className={cn('relative', className)}
    >
      {children}

      {sheen && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-500"
          style={{ opacity: active ? 1 : 0, background: sheenBg }}
        />
      )}
    </motion.div>
  )
}
