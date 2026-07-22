'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'

const WAYPOINTS = [
  { code: 'A1', label: 'Departure', x: 60, y: 220 },
  { code: 'A2', label: 'Coastal waters', x: 220, y: 170 },
  { code: 'B1', label: 'Open sea', x: 380, y: 210 },
  { code: 'B2', label: 'Deep water', x: 560, y: 150 },
  { code: 'C1', label: 'High latitudes', x: 720, y: 190 },
  { code: 'C2', label: 'True north', x: 880, y: 110 },
]

const PATH = 'M60,220 C140,150 160,150 220,170 S320,260 380,210 S500,90 560,150 S660,250 720,190 S840,150 880,110'

export function JourneyRoute() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.4'],
  })
  const draw = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div ref={ref} className="relative w-full">
      <svg
        viewBox="0 0 940 300"
        className="w-full"
        role="img"
        aria-label="Your French learning journey from A1 to C2"
      >
        {/* Dashed background path */}
        <path
          d={PATH}
          fill="none"
          stroke="#C08A2D"
          strokeOpacity="0.18"
          strokeWidth="2"
          strokeDasharray="2 8"
        />

        {/* Animated draw path */}
        <motion.path
          d={PATH}
          fill="none"
          stroke="#C08A2D"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={reduce ? { pathLength: 1 } : { pathLength: draw }}
        />

        {/* Waypoints */}
        {WAYPOINTS.map((w, i) => {
          const lit = useTransform(
            draw,
            (v) => (reduce ? 1 : v > i / (WAYPOINTS.length - 1) ? 1 : 0.25)
          )
          return (
            <motion.g key={w.code} style={{ opacity: lit }}>
              {/* Outer circle */}
              <circle
                cx={w.x}
                cy={w.y}
                r="9"
                fill="#0C1826"
                stroke="#C08A2D"
                strokeWidth="2.5"
              />
              {/* Inner dot */}
              <circle cx={w.x} cy={w.y} r="3.5" fill="#2440E8" />
              {/* Level label */}
              <text
                x={w.x}
                y={w.y - 18}
                textAnchor="middle"
                fontFamily="var(--font-display)"
                fontSize="20"
                fill="#EDE6D6"
                fontWeight="600"
              >
                {w.code}
              </text>
              {/* Description label */}
              <text
                x={w.x}
                y={w.y + 30}
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize="9"
                letterSpacing="1.5"
                fill="#93A6BC"
              >
                {w.label.toUpperCase()}
              </text>
            </motion.g>
          )
        })}
      </svg>
    </div>
  )
}
