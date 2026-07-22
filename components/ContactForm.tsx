'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from './ui/button'
import { CheckCircle2, AlertCircle, MessageCircle, Mail } from 'lucide-react'
import { contactSchema } from '@/lib/contact-schema'
import { whatsappLink, emailLink, EMAIL, WHATSAPP_DISPLAY } from '@/lib/contact'

export function ContactForm() {
  const searchParams = useSearchParams()
  const courseTitle = searchParams?.get('course')
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    level: '',
    timePreference: '',
    message: courseTitle ? `I'm interested in ${courseTitle}.` : '',
    company: '', // honeypot field
  })

  // Extract course level from title and set it in the form
  useEffect(() => {
    if (courseTitle) {
      // Extract level from course title (e.g., "A1 — Absolute Beginner" -> "A1")
      const levelMatch = courseTitle.match(/^([A-C][12]|TEF|TCF|DALF)/i)
      if (levelMatch) {
        setFormData((prev) => ({
          ...prev,
          level: levelMatch[1].toUpperCase() === 'TEF' ? 'TEF' :
                 levelMatch[1].toUpperCase() === 'TCF' ? 'TCF' :
                 levelMatch[1].toUpperCase() === 'DALF' ? 'DALF' :
                 levelMatch[1],
        }))
      }
    }
  }, [courseTitle])
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  /** What they actually sent, kept for the post-submit handoff links. */
  const [submittedSnapshot, setSubmittedSnapshot] = useState<typeof formData | null>(null)
  const [apiError, setApiError] = useState('')

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setApiError('')
    setErrors({})

    try {
      // Validate on client
      const validation = contactSchema.safeParse(formData)
      if (!validation.success) {
        const fieldErrors: Record<string, string> = {}
        // Zod v4 exposes `.issues`; `.errors` was the v3 name and is undefined
        // here, which used to throw and swallow every validation message.
        validation.error.issues.forEach((issue) => {
          const path = issue.path[0] as string
          fieldErrors[path] = issue.message
        })
        setErrors(fieldErrors)
        setIsSubmitting(false)
        return
      }

      // Submit to API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validation.data),
      })

      const result = await response.json()

      if (!response.ok) {
        setApiError(result.message || 'Failed to submit form. Please try again.')
        setIsSubmitting(false)
        return
      }

      // Keep a snapshot so the confirmation screen can offer a prefilled
      // WhatsApp/email handoff (see the note on `submittedSnapshot`).
      setSubmittedSnapshot(formData)
      setSubmitted(true)
      // NOTE: deliberately no auto-reset timer here. The old 4s timeout threw
      // the user back to an empty form mid-read, losing the confirmation and
      // the follow-up links with it.
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        level: '',
        timePreference: '',
        message: '',
        company: '',
      })
    } catch (error) {
      console.error('Form submission error:', error)
      setApiError('Something went wrong. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    const s = submittedSnapshot
    // The API currently only logs submissions — email delivery is still a TODO
    // in app/api/contact/route.ts. Until that's wired up, offer a one-tap
    // handoff prefilled with what they just typed, so the enquiry actually
    // reaches a human instead of dying in a server log.
    const summary = s
      ? [
          `Name: ${s.firstName}${s.lastName ? ` ${s.lastName}` : ''}`,
          `Email: ${s.email}`,
          `Phone: ${s.phone}`,
          `Course: ${s.level}`,
          `Preferred time: ${s.timePreference}`,
          s.message ? `Message: ${s.message}` : '',
        ]
          .filter(Boolean)
          .join('\n')
      : ''

    return (
      <div
        className="mx-auto max-w-2xl py-12 text-center"
        role="status"
        aria-live="polite"
      >
        <div className="mb-4">
          <CheckCircle2 className="mx-auto h-16 w-16 text-[#C08A2D]" />
        </div>
        <h3 className="mb-2 font-display text-3xl font-semibold text-[#EDE6D6]">
          Bearing confirmed!
        </h3>
        <p className="mb-6 text-[#93A6BC]">
          We&apos;ve got your details and will chart the best course for you within 24 hours.
        </p>

        <div className="mb-6 rounded-xl border border-[#EDE6D6]/10 bg-[#0C1826]/40 p-5 text-left">
          <p className="mb-3 text-center text-sm text-[#93A6BC]">
            Want a faster reply? Send it straight through — your details are already filled in.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <a
              href={whatsappLink(`I just submitted the contact form.\n\n${summary}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#EDE6D6]/20 px-4 py-3 text-sm font-medium text-[#EDE6D6] transition-all duration-300 hover:-translate-y-0.5 hover:border-brass/60 hover:text-brass-soft"
            >
              <MessageCircle className="h-4 w-4" />
              Send on WhatsApp
            </a>
            <a
              href={emailLink('French classes — enquiry', summary)}
              className="flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#EDE6D6]/20 px-4 py-3 text-sm font-medium text-[#EDE6D6] transition-all duration-300 hover:-translate-y-0.5 hover:border-brass/60 hover:text-brass-soft"
            >
              <Mail className="h-4 w-4" />
              Send by email
            </a>
          </div>
        </div>

        <p className="text-sm text-[#93A6BC]">
          In the meantime, explore our{' '}
          <Link href="/courses" className="underline hover:text-[#EDE6D6]">
            course catalogue
          </Link>{' '}
          or take our{' '}
          <Link href="/playground/placement" className="underline hover:text-[#EDE6D6]">
            placement quiz
          </Link>
          .
        </p>
      </div>
    )
  }

  // Show API error if exists
  if (apiError) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="rounded-lg bg-red-500/10 border border-red-500/30 p-4 mb-6 flex gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-red-300 text-sm">{apiError}</p>
        </div>
        <button
          onClick={() => {
            setApiError('')
          }}
          className="text-[#2440E8] underline hover:text-[#3E59FF]"
        >
          Try again
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      {/* Name Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-semibold text-[#EDE6D6] mb-2">
            First Name {errors.firstName && <span className="text-red-400">*</span>}
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg bg-[#0C1826]/50 border text-[#EDE6D6] placeholder-[#93A6BC] focus:outline-none focus:ring-2 focus:border-transparent ${
              errors.firstName
                ? 'border-red-500/50 focus:ring-red-500'
                : 'border-[#EDE6D6]/20 focus:ring-[#2440E8]'
            }`}
            placeholder="Jean"
          />
          {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-semibold text-[#EDE6D6] mb-2">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-[#0C1826]/50 border border-[#EDE6D6]/20 text-[#EDE6D6] placeholder-[#93A6BC] focus:outline-none focus:ring-2 focus:ring-[#2440E8] focus:border-transparent"
            placeholder="Dupont"
          />
        </div>
      </div>

      {/* Email & Phone Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-[#EDE6D6] mb-2">
            Email {errors.email && <span className="text-red-400">*</span>}
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg bg-[#0C1826]/50 border text-[#EDE6D6] placeholder-[#93A6BC] focus:outline-none focus:ring-2 focus:border-transparent ${
              errors.email
                ? 'border-red-500/50 focus:ring-red-500'
                : 'border-[#EDE6D6]/20 focus:ring-[#2440E8]'
            }`}
            placeholder="jean@example.com"
          />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-[#EDE6D6] mb-2">
            Phone {errors.phone && <span className="text-red-400">*</span>}
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg bg-[#0C1826]/50 border text-[#EDE6D6] placeholder-[#93A6BC] focus:outline-none focus:ring-2 focus:border-transparent ${
              errors.phone
                ? 'border-red-500/50 focus:ring-red-500'
                : 'border-[#EDE6D6]/20 focus:ring-[#2440E8]'
            }`}
            placeholder="+91 98765 43210"
          />
          {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
        </div>
      </div>

      {/* Honeypot (hidden) */}
      <input
        type="hidden"
        name="company"
        value={formData.company}
        onChange={handleChange}
      />

      {/* Course & Time Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="level" className="block text-sm font-semibold text-[#EDE6D6] mb-2">
            Interested Course {errors.level && <span className="text-red-400">*</span>}
          </label>
          <select
            name="level"
            id="level"
            value={formData.level}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg bg-[#0C1826]/50 border text-[#EDE6D6] focus:outline-none focus:ring-2 focus:border-transparent ${
              errors.level
                ? 'border-red-500/50 focus:ring-red-500'
                : 'border-[#EDE6D6]/20 focus:ring-[#2440E8]'
            }`}
          >
            <option value="">Select a course...</option>
            <option value="A1">A1 — Absolute Beginner</option>
            <option value="A2">A2 — Elementary</option>
            <option value="B1">B1 — Intermediate</option>
            <option value="B2">B2 — Upper Intermediate</option>
            <option value="C1">C1 — Advanced</option>
            <option value="C2">C2 — Mastery</option>
            <option value="TEF">TEF Preparation</option>
            <option value="TCF">TCF Preparation</option>
            <option value="DALF">DALF C1/C2 Masterclass</option>
            <option value="Workshop">Conversation Workshop</option>
            <option value="Not sure">Not sure yet</option>
          </select>
          {errors.level && <p className="text-red-400 text-xs mt-1">{errors.level}</p>}
        </div>
        <div>
          <label htmlFor="timePreference" className="block text-sm font-semibold text-[#EDE6D6] mb-2">
            Preferred Time {errors.timePreference && <span className="text-red-400">*</span>}
          </label>
          <select
            name="timePreference"
            id="timePreference"
            value={formData.timePreference}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg bg-[#0C1826]/50 border text-[#EDE6D6] focus:outline-none focus:ring-2 focus:border-transparent ${
              errors.timePreference
                ? 'border-red-500/50 focus:ring-red-500'
                : 'border-[#EDE6D6]/20 focus:ring-[#2440E8]'
            }`}
          >
            <option value="">Select a time...</option>
            <option value="Morning">Morning (6–9 AM)</option>
            <option value="Afternoon">Afternoon (1–5 PM)</option>
            <option value="Evening">Evening (6–9 PM)</option>
            <option value="Weekend">Weekend</option>
          </select>
          {errors.timePreference && <p className="text-red-400 text-xs mt-1">{errors.timePreference}</p>}
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-[#EDE6D6] mb-2">
          Message
        </label>
        <textarea
          name="message"
          id="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 rounded-lg bg-[#0C1826]/50 border border-[#EDE6D6]/20 text-[#EDE6D6] placeholder-[#93A6BC] focus:outline-none focus:ring-2 focus:ring-[#2440E8] focus:border-transparent resize-none"
          placeholder="Tell us a bit about your French journey and what you're hoping to achieve..."
        />
      </div>

      {/* Trust Chips */}
      <div className="flex flex-wrap gap-3 justify-center py-4">
        <div className="text-xs text-[#93A6BC] flex items-center gap-1">
          🔒 Secure
        </div>
        <div className="text-xs text-[#93A6BC] flex items-center gap-1">
          🤐 Confidential
        </div>
        <div className="text-xs text-[#93A6BC] flex items-center gap-1">
          ⚡ Quick response
        </div>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#2440E8] text-[#EDE6D6] hover:bg-[#3E59FF] disabled:opacity-50"
      >
        {isSubmitting ? 'Sending details...' : 'Send Details'}
      </Button>

      {/* Alt CTAs */}
      <div className="border-t border-[#EDE6D6]/10 pt-6 space-y-3">
        <p className="text-center text-sm text-[#93A6BC]">Or reach out directly:</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <a
            href={whatsappLink("I'd like to know more about your courses.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#EDE6D6]/20 px-4 py-3 text-sm font-medium text-[#EDE6D6] transition-all duration-300 hover:-translate-y-0.5 hover:border-brass/60 hover:bg-[#EDE6D6]/5 hover:text-brass-soft"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
          <a
            href={emailLink('French classes — enquiry')}
            className="flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#EDE6D6]/20 px-4 py-3 text-sm font-medium text-[#EDE6D6] transition-all duration-300 hover:-translate-y-0.5 hover:border-brass/60 hover:bg-[#EDE6D6]/5 hover:text-brass-soft"
          >
            <Mail className="h-4 w-4" />
            Email
          </a>
        </div>
        <p className="text-center font-mono text-xs text-[#93A6BC]">
          {WHATSAPP_DISPLAY} · {EMAIL}
        </p>
      </div>
    </form>
  )
}
