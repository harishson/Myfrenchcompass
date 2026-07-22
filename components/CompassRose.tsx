'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion, animate } from 'motion/react'
import { animationConfig } from '@/lib/animations'

export function CompassRose({ size = 340 }: { size?: number }) {
  const reduce = useReducedMotion()
  const ref = useRef<SVGSVGElement>(null)
  const angle = useMotionValue(-38)
  const needle = useSpring(angle, { stiffness: 60, damping: 12 })

  useEffect(() => {
    if (reduce) {
      angle.set(0)
      return
    }
    const settle = animate(angle, 0, {
      duration: animationConfig.durations.hero / 1000,
      ease: animationConfig.settleEasing,
    })
    return () => settle.stop()
  }, [reduce, angle])

  useEffect(() => {
    if (reduce) return
    const el = ref.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const deg = (Math.atan2(e.clientY - cy, e.clientX - cx) * 180) / Math.PI + 90
      angle.set(deg)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [reduce, angle])

  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 200 200"
      role="img"
      aria-label="French Compass rose"
      className="select-none"
      style={{ filter: 'drop-shadow(0 8px 30px rgba(36, 64, 232, 0.15))' }}
    >
      {/* Faint lat/long ticks */}
      <g stroke="#C08A2D" strokeOpacity="0.35">
        {Array.from({ length: 72 }).map((_, i) => {
          const a = (i * 5 * Math.PI) / 180
          const long = i % 6 === 0
          const r1 = long ? 78 : 84
          const r2 = 90
          return (
            <line
              key={i}
              x1={100 + r1 * Math.cos(a)}
              y1={100 + r1 * Math.sin(a)}
              x2={100 + r2 * Math.cos(a)}
              y2={100 + r2 * Math.sin(a)}
              strokeWidth={long ? 1.4 : 0.7}
            />
          )
        })}
      </g>

      {/* Rotating rings — outer ring rotates unless reduced motion */}
      <motion.g
        style={{ transformOrigin: '100px 100px' }}
        animate={reduce ? {} : { rotate: 360 }}
        transition={{ duration: 120, ease: 'linear', repeat: Infinity }}
      >
        <circle cx="100" cy="100" r="90" fill="none" stroke="#C08A2D" strokeWidth="1.5" />
        <circle cx="100" cy="100" r="70" fill="none" stroke="#C08A2D" strokeOpacity="0.5" strokeWidth="1" />
      </motion.g>

      {/* 8-point rose star */}
      <g fill="#C08A2D" fillOpacity="0.9">
        <polygon points="100,18 108,100 100,120 92,100" />
        <polygon points="100,182 108,100 100,80 92,100" fillOpacity="0.5" />
        <polygon points="18,100 100,92 120,100 100,108" fillOpacity="0.5" />
        <polygon points="182,100 100,92 80,100 100,108" fillOpacity="0.5" />
        <g fillOpacity="0.35">
          <polygon points="42,42 100,96 96,100 42,42" />
          <polygon points="158,42 104,96 100,100 158,42" />
          <polygon points="158,158 104,104 100,100 158,158" />
          <polygon points="42,158 96,104 100,100 42,158" />
        </g>
      </g>

      {/* Cardinal letters */}
      <g fill="#EDE6D6" fontFamily="var(--font-display)" fontSize="11" textAnchor="middle">
        <text x="100" y="14">
          N
        </text>
        <text x="100" y="196">
          S
        </text>
        <text x="192" y="104">
          E
        </text>
        <text x="8" y="104">
          O
        </text>
      </g>

      {/* Needle (cobalt N / foam S) */}
      <motion.g style={{ rotate: needle, transformOrigin: '100px 100px' }}>
        <polygon points="100,26 106,100 100,110 94,100" fill="#2440E8" />
        <polygon points="100,174 106,100 100,90 94,100" fill="#EDE6D6" fillOpacity="0.8" />
        <circle cx="100" cy="100" r="5" fill="#0C1826" stroke="#C08A2D" strokeWidth="1.5" />
      </motion.g>
    </svg>
  )
}
