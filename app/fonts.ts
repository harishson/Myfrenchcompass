import { Fraunces, Inter, JetBrains_Mono } from 'next/font/google'

/**
 * Font variable names here MUST match what globals.css `@theme` consumes:
 *   --font-display → var(--font-fraunces)
 *   --font-sans    → var(--font-geist-sans)
 *   --font-mono    → var(--font-geist-mono)
 */

export const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

export const GeistSans = Inter({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
})

/**
 * A real monospace. The site leans on `font-mono` for coordinates, eyebrows and
 * instrument labels — that typographic joke only lands in an actual mono.
 * (Previously this was Inter with style:'italic', so every eyebrow on the site
 * rendered as italic sans.)
 */
export const GeistMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
  weight: ['400', '500', '600'],
})
