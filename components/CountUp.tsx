'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'

interface CountUpProps {
  /** The full display value, e.g. "500+", "88%", "4.9★", "25+". Digits animate, suffix/prefix stay. */
  value: string
  className?: string
  durationMs?: number
}

/**
 * A value is only countable when it holds exactly ONE run of digits, e.g.
 * "500+", "88%", "4.9★". Labels like "A1→C2" contain two runs and must render
 * verbatim — counting them produces nonsense like "A0→C2".
 */
const COUNTABLE = /^[^\d]*\d[\d.]*[^\d]*$/

/**
 * Counts the numeric portion of `value` up from zero when scrolled into view.
 * Preserves any non-numeric prefix/suffix (%, +, ★, decimals). Fully static
 * under prefers-reduced-motion, and for values that aren't countable.
 */
export function CountUp({ value, className, durationMs = 1400 }: CountUpProps) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const countable = COUNTABLE.test(value)
  const [display, setDisplay] = useState(
    reduce || !countable ? value : startValue(value),
  )
  const started = useRef(false)

  useEffect(() => {
    if (reduce || !countable) {
      setDisplay(value)
      return
    }
    const el = ref.current
    if (!el) return

    const match = value.match(/([^\d.]*)([\d.]+)(.*)/)
    if (!match) {
      setDisplay(value)
      return
    }
    const [, prefix, num, suffix] = match
    const target = parseFloat(num)
    const decimals = num.includes('.') ? num.split('.')[1].length : 0

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || started.current) return
        started.current = true
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min((now - start) / durationMs, 1)
          // easeOutCubic
          const eased = 1 - Math.pow(1 - t, 3)
          const current = (target * eased).toFixed(decimals)
          setDisplay(`${prefix}${current}${suffix}`)
          if (t < 1) requestAnimationFrame(tick)
          else setDisplay(value)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [value, reduce, countable, durationMs])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}

function startValue(value: string) {
  const match = value.match(/([^\d.]*)([\d.]+)(.*)/)
  if (!match) return value
  const [, prefix, num, suffix] = match
  const decimals = num.includes('.') ? num.split('.')[1].length : 0
  return `${prefix}${(0).toFixed(decimals)}${suffix}`
}
