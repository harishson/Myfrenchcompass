/* =========================================================================
   Contact — the single source of truth for every way to reach French Compass.

   Every WhatsApp / email / phone CTA on the site MUST build its href from this
   module. Hardcoding a number in a component is how the site ended up shipping
   `wa.me/919xxxxxxxxx` in five different places.
   ========================================================================= */

/** E.164 digits only — this is what wa.me expects (no +, spaces or dashes). */
export const WHATSAPP_NUMBER = '916369864411'

/** Human-readable, for display in the UI. */
export const WHATSAPP_DISPLAY = '+91 63698 64411'

export const EMAIL = 'yuvakeshan16@gmail.com'

/** `tel:` needs the +, unlike wa.me. */
export const TEL_HREF = `tel:+${WHATSAPP_NUMBER}`

const DEFAULT_CONTEXT =
  "I'd like to know more about your French classes."

/**
 * Build a WhatsApp deep link with a prefilled message.
 * @param context What the user is asking about, e.g. "I'd like to book a demo class."
 */
export function whatsappLink(context?: string): string {
  const message = `Hi French Compass! ${context ?? DEFAULT_CONTEXT}`
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

/**
 * Build a `mailto:` link with a prefilled subject and body.
 */
export function emailLink(subject?: string, body?: string): string {
  const params = new URLSearchParams()
  if (subject) params.set('subject', subject)
  if (body) params.set('body', body)
  const qs = params.toString()
  return `mailto:${EMAIL}${qs ? `?${qs}` : ''}`
}
