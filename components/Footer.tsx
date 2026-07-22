import Link from 'next/link'
import { Compass, MessageCircle, Mail } from 'lucide-react'
import { whatsappLink, emailLink, EMAIL, WHATSAPP_DISPLAY } from '@/lib/contact'

export function Footer() {
  return (
    <footer className="on-ink relative overflow-hidden border-t border-foam/10 py-16">
      {/* brass gradient hairline */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(192,138,45,0.55), transparent)',
        }}
      />
      {/* faint compass watermark */}
      <Compass
        aria-hidden
        className="pointer-events-none absolute -right-10 -bottom-10 h-64 w-64 text-brass/[0.04]"
        strokeWidth={0.5}
      />
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4 md:gap-12 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <div className="group mb-4 flex items-center gap-2">
              <Compass className="h-5 w-5 text-brass transition-transform duration-500 group-hover:rotate-45" />
              <span className="font-display text-base font-semibold text-foam">
                French Compass
              </span>
            </div>
            <p className="text-foam-dim text-sm leading-relaxed max-w-xs">
              Plot your course to fluent French. Live classes, C1-certified instructors, results you can rely on.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-sans font-semibold text-foam mb-4 text-sm uppercase tracking-wide">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="inline-block text-foam-dim transition-all duration-200 hover:translate-x-1 hover:text-brass">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/courses" className="inline-block text-foam-dim transition-all duration-200 hover:translate-x-1 hover:text-brass">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/playground" className="inline-block text-foam-dim transition-all duration-200 hover:translate-x-1 hover:text-brass">
                  Playground
                </Link>
              </li>
              <li>
                <Link href="/about" className="inline-block text-foam-dim transition-all duration-200 hover:translate-x-1 hover:text-brass">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-sans font-semibold text-foam mb-4 text-sm uppercase tracking-wide">
              Resources
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/testimonials" className="inline-block text-foam-dim transition-all duration-200 hover:translate-x-1 hover:text-brass">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/contact" className="inline-block text-foam-dim transition-all duration-200 hover:translate-x-1 hover:text-brass">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Reach us — the actual channels, not just a link to a form. */}
          <div>
            <h3 className="font-sans font-semibold text-foam mb-4 text-sm uppercase tracking-wide">
              Reach us
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-start gap-2.5 text-foam-dim transition-colors hover:text-brass"
                >
                  <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-brass" strokeWidth={1.75} />
                  <span className="flex flex-col">
                    <span>WhatsApp</span>
                    <span className="font-mono text-xs text-foam-dim/80 transition-colors group-hover:text-brass/80">
                      {WHATSAPP_DISPLAY}
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={emailLink('French classes — enquiry')}
                  className="group inline-flex items-start gap-2.5 text-foam-dim transition-colors hover:text-brass"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brass" strokeWidth={1.75} />
                  <span className="flex flex-col">
                    <span>Email</span>
                    <span className="font-mono text-xs break-all text-foam-dim/80 transition-colors group-hover:text-brass/80">
                      {EMAIL}
                    </span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-foam/10 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-foam-dim">
            <p>&copy; 2025 French Compass. All rights reserved.</p>
            <p>
              Crafted with precision. Guided by{' '}
              <span className="text-brass">N 09°55′ · E 78°07′</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
