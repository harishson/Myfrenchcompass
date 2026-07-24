'use client'

import { motion, useReducedMotion } from 'motion/react'
import { Seal } from './Seal'
import { Globe } from 'lucide-react'

interface InstructorCardProps {
  name: string
  title: string
  c1Level?: boolean
  experience?: string
  specialization: string
  territories: string[]
  bio: string
  monogram: string
  index?: number
}

export function InstructorCard({
  name,
  title,
  c1Level,
  experience,
  specialization,
  territories,
  bio,
  monogram,
  index = 0,
}: InstructorCardProps) {
  const reduce = useReducedMotion()

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
      whileHover={reduce ? undefined : { y: -6 }}
      className="group relative flex flex-col overflow-hidden rounded-[14px] border border-brass/30 bg-card p-8 shadow-[var(--shadow-card)] transition-shadow duration-300 hover:shadow-[var(--shadow-lift)]"
    >
      {/* ambient hover glow */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(480px 220px at 50% -10%, rgba(36,64,232,0.10), transparent 70%)',
        }}
      />

      {/* Medallion */}
      <div className="relative mx-auto mb-6 h-24 w-24">
        <span
          aria-hidden
          className="absolute inset-[-6px] rounded-full opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: 'conic-gradient(from 180deg, #EF4135, #0055A4, #0055A4, #EF4135)' }}
        />
        <div className="relative flex h-full w-full items-center justify-center rounded-full border-4 border-brass bg-gradient-to-br from-azimuth to-verdigris transition-transform duration-500 group-hover:rotate-[6deg]">
          <span className="font-display text-3xl font-bold text-foam">{monogram}</span>
        </div>
        {c1Level && (
          <Seal
            variant="certified"
            className="absolute -bottom-2 -right-2 h-14 w-14 text-[8px]"
          >
            C1
          </Seal>
        )}
      </div>

      {/* Name & Title */}
      <h3 className="relative text-center font-display text-2xl font-semibold text-ink-text">
        {name}
      </h3>
      <p className="relative mb-1 mt-1 text-center font-mono text-xs uppercase tracking-[0.14em] text-ink-dim">
        {title}
      </p>
      {experience && (
        <p className="relative mb-4 text-center text-sm font-semibold text-brass">
          {experience}
        </p>
      )}

      {/* Specialization */}
      <div className="relative mb-4 rounded-lg bg-parchment2 px-3 py-2 text-center">
        <p className="text-xs font-medium text-ink-text">{specialization}</p>
      </div>

      {/* Bio */}
      <p className="relative mb-6 flex-grow text-sm leading-relaxed text-ink-dim">
        {bio}
      </p>

      {/* Territories */}
      <div className="relative border-t border-ink-dim/10 pt-4">
        <div className="mb-2 flex items-center gap-2">
          <Globe className="h-4 w-4 text-brass" />
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-ink-dim">
            Immersion
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {territories.map((territory, i) => (
            <span
              key={i}
              className="inline-block rounded-full bg-azimuth/10 px-2.5 py-1 text-xs font-semibold text-azimuth transition-colors duration-300 group-hover:bg-azimuth/15"
            >
              {territory}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  )
}
