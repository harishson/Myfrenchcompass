import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { displayFont, serifFont, bodyFont, monoFont } from './fonts'
import { organizationSchema } from '@/lib/seo'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://frenchcompass.com'),
  /* The app is reachable at myfrenchcompass.vercel.app as well as the real
     domain, and that alias serves 200 rather than redirecting. Resolving the
     canonical against metadataBase makes every page name the real domain as
     authoritative whichever host answered, so the two can't compete in search.
     './' means "this page's own path" — Next fills in the rest. */
  alternates: {
    canonical: './',
  },
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
    siteName: 'French Compass',
    // Same resolution as the canonical, so a link shared from the .vercel.app
    // alias still unfurls as the real domain.
    url: './',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#FFFFFF',
  width: 'device-width',
  initialScale: 1,
}

/* Root layout is intentionally minimal — just <html>/<body>, fonts and global
   styles. The site chrome (header, footer dock, scroll progress) lives in
   app/(site)/layout.tsx so the embedded Sanity Studio at /studio renders
   WITHOUT the marketing header and footer. */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`bg-parchment ${displayFont.variable} ${serifFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
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
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
