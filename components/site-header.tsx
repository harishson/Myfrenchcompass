"use client";

/* =========================================================================
   SiteHeader — the navbar fix.

   ROOT CAUSES this solves:
   1. Transparent bar + light text over a LIGHT page section (Courses, top of
      Playground) = invisible nav. FIX: the bar is only transparent when it is
      knowingly over a dark hero (overHero) AND at the top; otherwise it shows a
      solid, blurred ink background so the foam text is always readable.
   2. backdrop-blur / fixed positioning silently breaking. FIX + REQUIREMENT:
      render <SiteHeader/> as a DIRECT child of the root layout (app/layout.tsx),
      NEVER inside a wrapper that has `transform`, `filter`, `perspective`,
      `will-change`, or `contain` (a Framer-Motion page wrapper counts). A
      transformed ancestor turns position:fixed into "fixed to that ancestor"
      and clips the blur. If you must animate page transitions, wrap the PAGE
      content, not the header.

   USAGE:
     app/layout.tsx      → <SiteHeader overHero={false} />  (default, solid)
     app/page.tsx (home) → render <SiteHeader overHero /> from the home tree,
                            OR set a prop/flag; the home hero is dark & full-bleed.
   ========================================================================= */

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, MessageCircle, ChevronDown, Menu, X, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { whatsappLink, emailLink, EMAIL, WHATSAPP_DISPLAY } from "@/lib/contact";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses", children: [
      { label: "A1 / A2 — Core levels", href: "/courses#core" },
      { label: "B1 / B2 — Core levels", href: "/courses#core" },
      { label: "TEF / TCF — Exam prep", href: "/courses#exam" },
      { label: "DALF C1 / C2 — Masterclasses", href: "/courses#masterclass" },
      { label: "Workshops & Conversation", href: "/courses#workshop" },
    ] },
  { label: "Playground", href: "/playground" },
  { label: "About", href: "/about" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
];

const WA = whatsappLink();
const MAIL = emailLink('French classes — enquiry');

export function SiteHeader({ overHero }: { overHero?: boolean } = {}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);

  // The home route is the only one that opens on a full-bleed dark hero, so it
  // is the only one where a transparent bar stays readable. Derived here so the
  // header can keep living as a single direct child of the root layout.
  const isOverHero = overHero ?? pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const solid = scrolled || !isOverHero;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-[var(--header-h)] transition-[background-color,border-color,backdrop-filter] duration-300",
        solid
          ? "border-b border-foam/10 bg-ink/85 backdrop-blur-md supports-[backdrop-filter]:bg-ink/70"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-full max-w-[var(--container)] items-center justify-between px-5 sm:px-6 lg:px-10">
        {/* Brand */}
        <Link href="/" className="group flex items-center gap-2.5" aria-label="French Compass — home">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-brass/60 text-brass transition-transform duration-500 group-hover:rotate-45">
            <Compass className="h-5 w-5" strokeWidth={1.5} />
          </span>
          <span className="font-display text-xl text-foam">French Compass</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setCoursesOpen(true)}
                onMouseLeave={() => setCoursesOpen(false)}
              >
                <button
                  className="flex items-center gap-1 rounded-md px-3 py-2 text-sm text-foam/85 transition-colors hover:text-foam"
                  aria-expanded={coursesOpen}
                  aria-haspopup="true"
                  onClick={() => setCoursesOpen((v) => !v)}
                >
                  {item.label}
                  <ChevronDown className={cn("h-4 w-4 transition-transform", coursesOpen && "rotate-180")} />
                </button>
                {coursesOpen && (
                  <div className="absolute left-0 top-full w-72 pt-2">
                    <div className="overflow-hidden rounded-xl border border-foam/10 bg-ink-panel p-1.5 shadow-2xl">
                      {item.children.map((c) => (
                        <Link
                          key={c.label}
                          href={c.href}
                          className="block rounded-lg px-3 py-2.5 text-sm text-foam/80 transition-colors hover:bg-ink-panel2 hover:text-foam"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm text-foam/85 transition-colors hover:text-foam"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        {/* CTAs (high contrast) */}
        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={MAIL}
            aria-label={`Email us at ${EMAIL}`}
            title={EMAIL}
            className="grid h-10 w-10 place-items-center rounded-lg border border-foam/20 text-foam transition-all duration-300 hover:-translate-y-0.5 hover:border-brass/60 hover:text-brass-soft"
          >
            <Mail className="h-5 w-5" strokeWidth={1.75} />
          </a>
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Message us on WhatsApp at ${WHATSAPP_DISPLAY}`}
            title={WHATSAPP_DISPLAY}
            className="grid h-10 w-10 place-items-center rounded-lg border border-foam/20 text-foam transition-all duration-300 hover:-translate-y-0.5 hover:border-brass/60 hover:text-brass-soft"
          >
            <MessageCircle className="h-5 w-5" strokeWidth={1.75} />
          </a>
          <Link
            href="/contact"
            className="rounded-lg bg-azimuth px-4 py-2.5 text-sm font-medium text-foam shadow-[var(--glow-azimuth)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-azimuth-lift"
          >
            Book a class
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="grid h-10 w-10 place-items-center rounded-lg text-foam lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile drawer backdrop + menu */}
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-ink/70 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      {/* Slide-in drawer panel */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed right-0 top-0 z-50 flex h-[100dvh] w-[86%] max-w-sm flex-col border-l border-foam/10 bg-ink shadow-2xl transition-transform duration-300 ease-out lg:hidden",
          open ? "translate-x-0" : "translate-x-full",
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        {/* Drawer header */}
        <div className="flex h-[var(--header-h)] shrink-0 items-center justify-between border-b border-foam/10 px-5">
          <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2.5" aria-label="French Compass — home">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-brass/60 text-brass">
              <Compass className="h-5 w-5" strokeWidth={1.5} />
            </span>
            <span className="font-display text-lg text-foam">French Compass</span>
          </Link>
          <button
            className="grid h-10 w-10 place-items-center rounded-lg text-foam"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Scrollable nav */}
        <nav className="flex-1 overflow-y-auto overscroll-contain px-5 py-4" aria-label="Mobile">
          {NAV.map((item) => (
            <div key={item.label} className="border-b border-foam/10">
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="block py-3.5 font-display text-xl text-foam transition-colors hover:text-brass-soft"
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="pb-3 pl-1">
                  {item.children.map((c) => (
                    <Link
                      key={c.label}
                      href={c.href}
                      onClick={() => setOpen(false)}
                      className="block py-1.5 text-sm text-foam-dim transition-colors hover:text-foam"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Sticky CTAs — every target is at least 44px tall for touch. */}
        <div className="shrink-0 space-y-3 border-t border-foam/10 p-5">
          <div className="grid grid-cols-2 gap-3">
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Message us on WhatsApp at ${WHATSAPP_DISPLAY}`}
              className="flex min-h-11 items-center justify-center gap-2 rounded-lg border border-foam/20 py-3 text-sm font-medium text-foam transition-colors hover:border-brass/60 hover:text-brass-soft"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
            <a
              href={MAIL}
              aria-label={`Email us at ${EMAIL}`}
              className="flex min-h-11 items-center justify-center gap-2 rounded-lg border border-foam/20 py-3 text-sm font-medium text-foam transition-colors hover:border-brass/60 hover:text-brass-soft"
            >
              <Mail className="h-4 w-4" /> Email
            </a>
          </div>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="flex min-h-11 items-center justify-center rounded-lg bg-azimuth py-3 text-center text-sm font-medium text-foam transition-colors hover:bg-azimuth-lift"
          >
            Book a class
          </Link>
        </div>
      </div>
    </header>
  );
}
