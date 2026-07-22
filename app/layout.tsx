import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { fraunces, GeistSans, GeistMono } from './fonts'
import { SiteHeader } from '@/components/site-header'
import { ContactDock } from '@/components/ContactDock'
import { ScrollProgress } from '@/components/motion/ScrollProgress'
import { organizationSchema } from '@/lib/seo'
import './globals.css'

export const metadata: Metadata = {
  title: 'French Compass — Fluent French, Clear Path',
  description: 'Live 90-minute French classes (A1–C2) with C1-certified instructors. TEF/TCF Canada exam prep, DALF masterclasses, and interactive lessons. Plot your course to fluency.',
  generator: 'v0.app',
  keywords: [
    'French language classes',
    'TEF TCF exam prep',
    'DELF DALF',
    'Online French lessons',
    'French for Canada',
    'French academy',
  ],
  authors: [{ name: 'French Compass' }],
  icons: {
    icon: '/icon.svg',
  },
  openGraph: {
    title: 'French Compass — Fluent French, Clear Path',
    description: 'Live French classes with C1-certified instructors. Chart your course to fluency.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#0C1826',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`bg-parchment ${fraunces.variable} ${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <Script
          id="org-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="font-sans antialiased clip-x">
        <a
          href="#main"
          className="sr-only rounded-lg bg-azimuth px-4 py-2 text-sm font-medium text-foam focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60]"
        >
          Skip to content
        </a>
        {/* Header and dock are DIRECT children of body — never inside a
            transformed wrapper, which would break their fixed positioning. */}
        <SiteHeader />
        <ScrollProgress />
        <main id="main">{children}</main>
        <ContactDock />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
