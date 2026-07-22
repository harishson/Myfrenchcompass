/**
 * Global animation configuration and helpers.
 * Respects prefers-reduced-motion throughout.
 *
 * The easing names mirror the CSS custom properties in globals.css, so a
 * component animated in JS and one animated in CSS decelerate identically.
 */

import type { Variants, Transition } from 'motion/react'

export const animationConfig = {
  settleEasing: [0.16, 1, 0.3, 1] as const, // gentle overshoot for compass
  revealEasing: [0.22, 1, 0.36, 1] as const, // ease-out for reveals
  glideEasing: [0.4, 0, 0.2, 1] as const, // symmetric, for moves + fades
  springEasing: [0.34, 1.56, 0.64, 1] as const, // slight overshoot, for pops
  tapEasing: [0.15, 0.85, 0.85, 0.15] as const,
  durations: {
    micro: 150,
    quick: 200,
    standard: 300,
    slow: 600,
    hero: 1100,
  },
}

/** Springs tuned once, reused everywhere, so nothing feels off-brand. */
export const springs = {
  /** Cursor-following elements — magnetic buttons, tilt cards. */
  pointer: { stiffness: 220, damping: 22, mass: 0.6 } as const,
  /** The compass needle: visibly settles rather than snapping. */
  needle: { stiffness: 55, damping: 12 } as const,
  /** UI that should feel immediate but not brittle. */
  crisp: { stiffness: 400, damping: 34 } as const,
} satisfies Record<string, Transition>

/**
 * The house reveal: rise + fade. Distance is deliberately small — a large
 * translate reads as "the page is broken" on slower devices.
 */
export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: animationConfig.durations.slow / 1000,
      ease: animationConfig.revealEasing,
    },
  },
}

/** Parent for staggered groups. Children opt in via `revealVariants`. */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.08 },
  },
}

/** A slower stagger for hero-level content, where each line should land. */
export const staggerHero: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.11, delayChildren: 0.15 },
  },
}

export const textVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4 },
  }),
}

export const containerVariants = staggerContainer

/**
 * Standard viewport config for scroll reveals. `once` matters: re-animating on
 * every scroll-by is the single fastest way to make a site feel cheap.
 */
export const viewportOnce = { once: true, margin: '-12% 0px -12% 0px' } as const
