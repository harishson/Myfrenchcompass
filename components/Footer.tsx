import Link from 'next/link'
import { MessageCircle, Mail } from 'lucide-react'
import { whatsappLink, emailLink, EMAIL, WHATSAPP_DISPLAY } from '@/lib/contact'

export function Footer() {
  return (
    <footer
      className="grain relative overflow-hidden py-16 text-white"
      style={{ background: 'linear-gradient(180deg, #EF4135 0%, #E1352B 100%)' }}
    >
      {/* Blue + white accent line (the third flag colour is the footer itself) */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[3px]"
        style={{
          background:
            'linear-gradient(90deg, var(--color-blue) 0%, var(--color-blue) 50%, #ffffff 50%, #ffffff 100%)',
        }}
      />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4 md:gap-12 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <div className="mb-4 flex items-center gap-2.5">
              <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-white font-serif-italic text-lg text-[#EF4135] shadow-[0_4px_14px_rgba(0,0,0,0.15)]">
                F
                <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full border-2 border-[#EF4135] bg-[#0055A4]" />
              </span>
              <span className="font-display text-base font-bold text-white">
                French Compass
              </span>
            </div>
            <p className="text-white/80 text-sm leading-relaxed max-w-xs">
              Plot your course to fluent French. Live classes, C1-certified instructors, results you can rely on.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-sans font-semibold text-foam mb-4 text-sm uppercase tracking-wide">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'Home', href: '/' },
                { label: 'Courses', href: '/courses' },
                { label: 'Upcoming Batches', href: '/upcoming-batches' },
                { label: 'Learning Resources', href: '/learning-resources' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-block text-white/80 transition-all duration-200 hover:translate-x-1 hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More */}
          <div>
            <h3 className="font-sans font-semibold text-foam mb-4 text-sm uppercase tracking-wide">
              More
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'About', href: '/about' },
                { label: 'Testimonials', href: '/testimonials' },
                { label: 'Contact', href: '/contact' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-block text-white/80 transition-all duration-200 hover:translate-x-1 hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
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
                  className="group inline-flex items-start gap-2.5 text-white/80 transition-colors hover:text-white"
                >
                  <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-white" strokeWidth={1.75} />
                  <span className="flex flex-col">
                    <span>WhatsApp</span>
                    <span className="font-mono text-xs text-white/70 transition-colors group-hover:text-white">
                      {WHATSAPP_DISPLAY}
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={emailLink('French classes — enquiry')}
                  className="group inline-flex items-start gap-2.5 text-white/80 transition-colors hover:text-white"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-white" strokeWidth={1.75} />
                  <span className="flex flex-col">
                    <span>Email</span>
                    <span className="font-mono text-xs break-all text-white/70 transition-colors group-hover:text-white">
                      {EMAIL}
                    </span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/25 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/80">
            <p>&copy; {new Date().getFullYear()} French Compass. All rights reserved.</p>
            <p>
              Crafted with precision. Guided by{' '}
              <span className="text-white">N 09°55′ · E 78°07′</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
