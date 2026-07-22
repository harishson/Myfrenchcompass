'use client'

/* =========================================================================
   ContactDock — the floating "reach us" control, bottom-right on every page.

   Collapsed it is a single brass instrument dial. Opening it fans out the two
   real channels (WhatsApp, email) with a short stagger. It is a disclosure,
   not a menu: Escape closes it, focus is trapped nowhere, and every target
   clears 44px.

   Replaces the old WhatsAppFab, which was written but never actually rendered
   anywhere in the app.
   ========================================================================= */

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { MessageCircle, Mail, Plus } from 'lucide-react'
import { whatsappLink, emailLink, EMAIL, WHATSAPP_DISPLAY } from '@/lib/contact'
import { springs } from '@/lib/animations'

const ACTIONS = [
  {
    label: 'WhatsApp',
    detail: WHATSAPP_DISPLAY,
    href: whatsappLink(),
    external: true,
    Icon: MessageCircle,
    tint: '#25D366',
  },
  {
    label: 'Email',
    detail: EMAIL,
    href: emailLink('French classes — enquiry'),
    external: false,
    Icon: Mail,
    tint: 'var(--color-brass-soft)',
  },
]

export function ContactDock() {
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  // Escape to close, and click-away anywhere outside the dock.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onDown)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', onDown)
    }
  }, [open])

  return (
    <div
      ref={rootRef}
      className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6"
    >
      <AnimatePresence>
        {open && (
          <motion.ul
            className="flex flex-col items-end gap-2.5"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              hidden: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
              visible: { transition: { staggerChildren: 0.06 } },
            }}
          >
            {ACTIONS.map(({ label, detail, href, external, Icon, tint }) => (
              <motion.li
                key={label}
                variants={{
                  hidden: { opacity: 0, y: 10, scale: 0.9 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
                transition={reduce ? { duration: 0 } : springs.crisp}
              >
                <a
                  href={href}
                  {...(external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  onClick={() => setOpen(false)}
                  title={detail}
                  className="group/dock flex min-h-11 items-center gap-3 rounded-full border border-foam/10 bg-ink-panel/95 py-2 pl-4 pr-2 shadow-[var(--elev-ink-3)] backdrop-blur-md transition-colors hover:border-brass/40"
                >
                  <span className="flex flex-col text-right leading-tight">
                    <span className="text-sm font-medium text-foam">{label}</span>
                    <span className="font-mono text-[10px] text-foam-dim">
                      {detail}
                    </span>
                  </span>
                  <span
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full transition-transform duration-300 group-hover/dock:scale-110"
                    style={{ backgroundColor: tint, color: '#08111A' }}
                  >
                    <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
                  </span>
                </a>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? 'Close contact options' : 'Contact us'}
        className="relative grid h-14 w-14 place-items-center rounded-full border border-brass/40 bg-ink-panel text-brass shadow-[var(--elev-ink-3)] transition-colors hover:border-brass hover:text-brass-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azimuth"
      >
        {/* Idle halo — a slow instrument pulse, so the dock reads as live
            without ever demanding attention. */}
        {!reduce && !open && (
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full border border-brass/50"
            animate={{ scale: [1, 1.35], opacity: [0.5, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeOut' }}
          />
        )}
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={reduce ? { duration: 0 } : springs.crisp}
        >
          {open ? (
            <Plus className="h-6 w-6" strokeWidth={1.8} />
          ) : (
            <MessageCircle className="h-6 w-6" strokeWidth={1.8} />
          )}
        </motion.span>
      </button>
    </div>
  )
}
