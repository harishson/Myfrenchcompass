'use client'

/* =========================================================================
   Stagger / StaggerItem — scroll-triggered group reveals.

   Wrap a group in <Stagger>, mark each child with <StaggerItem>, and they
   cascade in as the group enters the viewport. Timing lives in
   lib/animations.ts so every list on the site cascades at the same rate.

   Under prefers-reduced-motion both render as plain elements.
   ========================================================================= */

import { motion, useReducedMotion } from 'motion/react'
import {
  revealVariants,
  staggerContainer,
  staggerHero,
  viewportOnce,
} from '@/lib/animations'
import { cn } from '@/lib/utils'

interface StaggerProps {
  children: React.ReactNode
  className?: string
  /** `hero` cascades more slowly, for above-the-fold copy. */
  pace?: 'default' | 'hero'
  as?: 'div' | 'ul' | 'section'
}

export function Stagger({
  children,
  className,
  pace = 'default',
  as = 'div',
}: StaggerProps) {
  const reduce = useReducedMotion()
  const Tag = motion[as]

  if (reduce) {
    const Plain = as
    return <Plain className={className}>{children}</Plain>
  }

  return (
    <Tag
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={pace === 'hero' ? staggerHero : staggerContainer}
      className={className}
    >
      {children}
    </Tag>
  )
}

interface StaggerItemProps {
  children: React.ReactNode
  className?: string
  as?: 'div' | 'li' | 'p' | 'h1' | 'h2' | 'h3' | 'span'
}

export function StaggerItem({
  children,
  className,
  as = 'div',
}: StaggerItemProps) {
  const reduce = useReducedMotion()
  const Tag = motion[as]

  if (reduce) {
    const Plain = as
    return <Plain className={className}>{children}</Plain>
  }

  return (
    <Tag variants={revealVariants} className={cn(className)}>
      {children}
    </Tag>
  )
}
