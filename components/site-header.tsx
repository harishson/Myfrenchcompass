"use client";

/* =========================================================================
   SiteHeader — warm "Maison" redesign.

   - Transparent over the cream page at the top; frosts to cream + hairline +
     soft shadow once scrolled. Espresso text reads on cream throughout, so the
     bar never goes invisible.
   - Courses opens a four-column mega-menu (Core Levels · Combination Tracks ·
     Exam Preparation · Resources); accordion on mobile.
   - Brand mark is a custom typographic seal — no compass graphic.

   Must stay a DIRECT child of the layout (never inside a transformed wrapper)
   so position:fixed / backdrop-blur keep working.
   ========================================================================= */

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MessageCircle, ChevronDown, Menu, X, Mail, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { whatsappLink, emailLink, EMAIL, WHATSAPP_DISPLAY } from "@/lib/contact";
import { PRIMARY_NAV, COURSES_MEGA } from "@/lib/nav";

const WA = whatsappLink();
const MAIL = emailLink("French classes — enquiry");

/* Horizontal lockup: the compass mark as artwork, the wordmark as live text.
   The supplied logo file stacks mark over wordmark, which is too tall for a
   fixed bar — setting the words in HTML keeps the reference's side-by-side
   layout, stays crisp at any density, and remains selectable and translatable. */
function BrandMark() {
  return (
    <Link href="/" className="group flex items-center gap-2.5" aria-label="French Compass — home">
      <Image
        src="/brand/compass-mark.png"
        alt=""
        width={512}
        height={512}
        priority
        className="h-10 w-10 shrink-0 transition-transform duration-300 group-hover:scale-105 sm:h-11 sm:w-11"
      />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[0.95rem] font-bold tracking-[0.14em] sm:text-lg">
          <span className="text-blue-deep">FRENCH</span>{' '}
          <span className="text-red-text">COMPASS</span>
        </span>
        {/* the twin rules under the wordmark, straight from the brand sheet */}
        <span aria-hidden className="mt-1 flex gap-1">
          <span className="h-[2px] w-1/2 rounded-full bg-blue-deep" />
          <span className="h-[2px] w-1/2 rounded-full bg-red" />
        </span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => { setOpen(false); setCoursesOpen(false); setMobileCoursesOpen(false); }, [pathname]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={cn(
        // Always solid white + blur so the bar is readable over ANY section
        // (incl. dark hero pages like the placement quiz). Shadow deepens on scroll.
        "fixed inset-x-0 top-0 z-50 h-[var(--header-h)] border-b border-[var(--line)] bg-white/90 backdrop-blur-md transition-shadow duration-300",
        scrolled ? "shadow-[var(--shadow-soft)]" : "shadow-none",
      )}
    >
      <div className="mx-auto flex h-full max-w-[var(--container)] items-center justify-between px-gutter">
        <BrandMark />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {PRIMARY_NAV.map((item) =>
            item.label === "Courses" ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setCoursesOpen(true)}
                onMouseLeave={() => setCoursesOpen(false)}
              >
                <Link
                  href="/courses"
                  className={cn(
                    "flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                    isActive("/courses") ? "text-blue" : "text-ink-dim hover:text-ink-text",
                  )}
                  aria-expanded={coursesOpen}
                  aria-haspopup="true"
                  onClick={() => setCoursesOpen(false)}
                >
                  {item.label}
                  <ChevronDown className={cn("h-4 w-4 transition-transform", coursesOpen && "rotate-180")} />
                </Link>

                {coursesOpen && (
                  <div className="absolute left-1/2 top-full w-[58rem] max-w-[92vw] -translate-x-1/2 pt-3">
                    <div className="grain overflow-hidden rounded-[var(--radius-lg)] border border-[var(--line)] bg-ivory shadow-[var(--shadow-lift)]">
                      <div className="relative z-10 grid grid-cols-4 gap-2 p-5">
                        {COURSES_MEGA.map((col) => (
                          <div key={col.title} className="min-w-0">
                            <p className="mb-1 px-3 font-mono text-[0.68rem] font-semibold uppercase tracking-wider text-red-accent">{col.title}</p>
                            <ul>
                              {col.links.map((l) => (
                                <li key={l.href}>
                                  <Link
                                    href={l.href}
                                    className="block truncate rounded-lg px-3 py-2 text-sm text-ink-dim transition-colors hover:bg-cream hover:text-blue"
                                  >
                                    {l.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      <Link
                        href="/courses"
                        className="flex items-center justify-center gap-2 border-t border-[var(--line)] bg-cream/60 py-3 text-sm font-semibold text-blue transition-colors hover:text-blue-deep"
                      >
                        View all courses <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  isActive(item.href) ? "text-blue" : "text-ink-dim hover:text-ink-text",
                )}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        {/* CTAs */}
        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={MAIL}
            aria-label={`Email us at ${EMAIL}`}
            title={EMAIL}
            className="grid h-10 w-10 place-items-center rounded-full border border-[var(--line-strong)] text-ink-dim transition-all duration-300 hover:-translate-y-0.5 hover:border-blue hover:text-blue"
          >
            <Mail className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.75} />
          </a>
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Message us on WhatsApp at ${WHATSAPP_DISPLAY}`}
            title={WHATSAPP_DISPLAY}
            className="grid h-10 w-10 place-items-center rounded-full border border-[var(--line-strong)] text-ink-dim transition-all duration-300 hover:-translate-y-0.5 hover:border-blue hover:text-blue"
          >
            <MessageCircle className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.75} />
          </a>
          <Link href="/upcoming-batches" className="btn btn-primary h-10 px-5 text-sm">
            Reserve your seat
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="grid h-10 w-10 place-items-center rounded-lg text-ink-text lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile drawer backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-espresso/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      {/* Slide-in drawer */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed right-0 top-0 z-50 flex h-[100dvh] w-[88%] max-w-sm flex-col border-l border-[var(--line)] bg-cream shadow-2xl transition-transform duration-300 ease-out lg:hidden",
          open ? "translate-x-0" : "translate-x-full",
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <div className="flex h-[var(--header-h)] shrink-0 items-center justify-between border-b border-[var(--line)] px-gutter">
          <BrandMark />
          <button
            className="grid h-10 w-10 place-items-center rounded-lg text-ink-text"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto overscroll-contain px-gutter py-4" aria-label="Mobile">
          {PRIMARY_NAV.map((item) =>
            item.label === "Courses" ? (
              <div key={item.label} className="border-b border-[var(--line)]">
                <button
                  className="flex w-full items-center justify-between py-3.5 font-display text-xl font-semibold text-ink-text"
                  aria-expanded={mobileCoursesOpen}
                  onClick={() => setMobileCoursesOpen((v) => !v)}
                >
                  Courses
                  <ChevronDown className={cn("h-5 w-5 transition-transform", mobileCoursesOpen && "rotate-180")} />
                </button>
                {mobileCoursesOpen && (
                  <div className="pb-3">
                    {COURSES_MEGA.map((col) => (
                      <div key={col.title} className="mb-2">
                        <p className="px-1 pb-1 pt-2 font-mono text-[0.68rem] font-semibold uppercase tracking-wider text-red-accent">{col.title}</p>
                        {col.links.map((l) => (
                          <Link
                            key={l.href}
                            href={l.href}
                            onClick={() => setOpen(false)}
                            className="block rounded-md px-1 py-2 text-sm text-ink-dim transition-colors hover:text-blue"
                          >
                            {l.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                    <Link
                      href="/courses"
                      onClick={() => setOpen(false)}
                      className="mt-1 flex items-center gap-2 px-1 py-2 text-sm font-semibold text-blue"
                    >
                      View all courses <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div key={item.label} className="border-b border-[var(--line)]">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-3.5 font-display text-xl font-semibold text-ink-text transition-colors hover:text-blue"
                >
                  {item.label}
                </Link>
              </div>
            ),
          )}
        </nav>

        <div className="shrink-0 space-y-3 border-t border-[var(--line)] p-gutter">
          <div className="grid grid-cols-2 gap-3">
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Message us on WhatsApp at ${WHATSAPP_DISPLAY}`}
              className="flex min-h-11 items-center justify-center gap-2 rounded-full border border-[var(--line-strong)] py-3 text-sm font-medium text-ink-text transition-colors hover:border-blue hover:text-blue"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
            <a
              href={MAIL}
              aria-label={`Email us at ${EMAIL}`}
              className="flex min-h-11 items-center justify-center gap-2 rounded-full border border-[var(--line-strong)] py-3 text-sm font-medium text-ink-text transition-colors hover:border-blue hover:text-blue"
            >
              <Mail className="h-4 w-4" /> Email
            </a>
          </div>
          <Link href="/upcoming-batches" onClick={() => setOpen(false)} className="btn btn-primary w-full">
            Reserve your seat
          </Link>
        </div>
      </div>
    </header>
  );
}
