import { z } from 'zod'

export const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().optional(),
  email: z.string().email('Enter a valid email address'),
  phone: z.string().min(7, 'Enter a valid phone number'),
  // Zod v4 replaced `errorMap` with `error`; the old key was silently ignored,
  // so these fields fell back to the generic "Invalid input" message.
  level: z.enum(
    ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'TEF', 'TCF', 'DALF', 'Workshop', 'Not sure'],
    { error: 'Please select a course level' }
  ),
  timePreference: z.enum(['Morning', 'Afternoon', 'Evening', 'Weekend'], {
    error: 'Please select a time preference',
  }),
  message: z.string().optional().default(''),
  // Honeypot field for spam prevention
  company: z.string().max(0).optional(),
})

export type ContactInput = z.infer<typeof contactSchema>

/**
 * Contact details live in `lib/contact.ts`. These re-exports keep older imports
 * working — prefer importing from `@/lib/contact` directly in new code.
 */
export { WHATSAPP_NUMBER as whatsappPhone, whatsappLink as getWhatsappLink } from './contact'
