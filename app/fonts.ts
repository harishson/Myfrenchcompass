import { Bricolage_Grotesque, Instrument_Serif, Inter, JetBrains_Mono } from 'next/font/google'

/* =========================================================================
   Type system for the "Maison French Compass" redesign.

   - Display  : Bricolage Grotesque — modern, characterful, premium headings
   - Serif    : Instrument Serif    — editorial italic accents & pull-quotes
   - Body     : Inter               — clean, warm, highly legible
   - Mono     : JetBrains Mono      — small tags, level codes, figures

   globals.css @theme maps its --font-* vars to the CSS variables below.
   ========================================================================= */

export const displayFont = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

export const serifFont = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  weight: ['400'],
  style: ['normal', 'italic'],
})

export const bodyFont = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

export const monoFont = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono-jb',
  display: 'swap',
  weight: ['400', '500', '600'],
})
