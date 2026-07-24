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

      // Honeypot — silently accept (and don't send) obvious bot submissions.
      if (formData.company) {
        setSubmittedSnapshot(formData)
        setSubmitted(true)
        setIsSubmitting(false)
        return
      }

      // Keep a snapshot so the confirmation screen can offer a prefilled
      // WhatsApp/email handoff.
      setSubmittedSnapshot(formData)

      // Deliver the enquiry by email via Web3Forms (free, no backend). The
      // access key is a PUBLIC key (safe to expose) set in the env var below;
      // Web3Forms mails every submission to the address that owns the key
      // (myfrenchcompass@gmail.com). If the key isn't set yet, we still show the
      // confirmation screen with its one-tap WhatsApp / email handoff, so an
      // enquiry always has a real route in.
      const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
      if (WEB3FORMS_KEY) {
        try {
          await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({
              access_key: WEB3FORMS_KEY,
              subject: `New enquiry — ${formData.firstName || 'Website'}${formData.level ? ` (${formData.level})` : ''}`,
              from_name: 'French Compass website',
              name: `${formData.firstName} ${formData.lastName}`.trim(),
              email: formData.email,
              phone: formData.phone,
              interested_course: formData.level,
              preferred_time: formData.timePreference,
              message: formData.message || '(no message)',
            }),
          })
        } catch (err) {
          console.error('Web3Forms delivery error:', err)
          // non-fatal — the confirmation handoff links still work
        }
      }

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
          <CheckCircle2 className="mx-auto h-16 w-16 text-[#EF4135]" />
        </div>
        <h3 className="mb-2 font-display text-3xl font-semibold text-[#FFFFFF]">
          Bearing confirmed!
        </h3>
        <p className="mb-6 text-[#C6DAF0]">
          We&apos;ve got your details and will chart the best course for you within 24 hours.
        </p>

        <div className="mb-6 rounded-xl border border-[#FFFFFF]/10 bg-[#003A72]/40 p-5 text-left">
          <p className="mb-3 text-center text-sm text-[#C6DAF0]">
            Want a faster reply? Send it straight through — your details are already filled in.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <a
              href={whatsappLink(`I just submitted the contact form.\n\n${summary}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#FFFFFF]/20 px-4 py-3 text-sm font-medium text-[#FFFFFF] transition-all duration-300 hover:-translate-y-0.5 hover:border-brass/60 hover:text-brass-soft"
            >
              <MessageCircle className="h-4 w-4" />
              Send on WhatsApp
            </a>
            <a
              href={emailLink('French classes — enquiry', summary)}
              className="flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#FFFFFF]/20 px-4 py-3 text-sm font-medium text-[#FFFFFF] transition-all duration-300 hover:-translate-y-0.5 hover:border-brass/60 hover:text-brass-soft"
            >
              <Mail className="h-4 w-4" />
              Send by email
            </a>
          </div>
        </div>

        <p className="text-sm text-[#C6DAF0]">
          In the meantime, explore our{' '}
          <Link href="/courses" className="underline hover:text-[#FFFFFF]">
            course catalogue
          </Link>{' '}
          or take our{' '}
          <Link href="/learning-resources/placement" className="underline hover:text-[#FFFFFF]">
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
          className="text-[#0055A4] underline hover:text-[#1466BE]"
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
          <label htmlFor="firstName" className="block text-sm font-semibold text-[#FFFFFF] mb-2">
            First Name {errors.firstName && <span className="text-red-400">*</span>}
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg bg-[#003A72]/50 border text-[#FFFFFF] placeholder-[#C6DAF0] focus:outline-none focus:ring-2 focus:border-transparent ${
              errors.firstName
                ? 'border-red-500/50 focus:ring-red-500'
                : 'border-[#FFFFFF]/20 focus:ring-[#0055A4]'
            }`}
            placeholder="Jean"
          />
          {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-semibold text-[#FFFFFF] mb-2">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-[#003A72]/50 border border-[#FFFFFF]/20 text-[#FFFFFF] placeholder-[#C6DAF0] focus:outline-none focus:ring-2 focus:ring-[#0055A4] focus:border-transparent"
            placeholder="Dupont"
          />
        </div>
      </div>

      {/* Email & Phone Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-[#FFFFFF] mb-2">
            Email {errors.email && <span className="text-red-400">*</span>}
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg bg-[#003A72]/50 border text-[#FFFFFF] placeholder-[#C6DAF0] focus:outline-none focus:ring-2 focus:border-transparent ${
              errors.email
                ? 'border-red-500/50 focus:ring-red-500'
                : 'border-[#FFFFFF]/20 focus:ring-[#0055A4]'
            }`}
            placeholder="jean@example.com"
          />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-[#FFFFFF] mb-2">
            Phone {errors.phone && <span className="text-red-400">*</span>}
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg bg-[#003A72]/50 border text-[#FFFFFF] placeholder-[#C6DAF0] focus:outline-none focus:ring-2 focus:border-transparent ${
              errors.phone
                ? 'border-red-500/50 focus:ring-red-500'
                : 'border-[#FFFFFF]/20 focus:ring-[#0055A4]'
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
          <label htmlFor="level" className="block text-sm font-semibold text-[#FFFFFF] mb-2">
            Interested Course {errors.level && <span className="text-red-400">*</span>}
          </label>
          <select
            name="level"
            id="level"
            value={formData.level}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg bg-[#003A72]/50 border text-[#FFFFFF] focus:outline-none focus:ring-2 focus:border-transparent ${
              errors.level
                ? 'border-red-500/50 focus:ring-red-500'
                : 'border-[#FFFFFF]/20 focus:ring-[#0055A4]'
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
          <label htmlFor="timePreference" className="block text-sm font-semibold text-[#FFFFFF] mb-2">
            Preferred Time {errors.timePreference && <span className="text-red-400">*</span>}
          </label>
          <select
            name="timePreference"
            id="timePreference"
            value={formData.timePreference}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg bg-[#003A72]/50 border text-[#FFFFFF] focus:outline-none focus:ring-2 focus:border-transparent ${
              errors.timePreference
                ? 'border-red-500/50 focus:ring-red-500'
                : 'border-[#FFFFFF]/20 focus:ring-[#0055A4]'
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
        <label htmlFor="message" className="block text-sm font-semibold text-[#FFFFFF] mb-2">
          Message
        </label>
        <textarea
          name="message"
          id="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 rounded-lg bg-[#003A72]/50 border border-[#FFFFFF]/20 text-[#FFFFFF] placeholder-[#C6DAF0] focus:outline-none focus:ring-2 focus:ring-[#0055A4] focus:border-transparent resize-none"
          placeholder="Tell us a bit about your French journey and what you're hoping to achieve..."
        />
      </div>

      {/* Trust Chips */}
      <div className="flex flex-wrap gap-3 justify-center py-4">
        <div className="text-xs text-[#C6DAF0] flex items-center gap-1">
          🔒 Secure
        </div>
        <div className="text-xs text-[#C6DAF0] flex items-center gap-1">
          🤐 Confidential
        </div>
        <div className="text-xs text-[#C6DAF0] flex items-center gap-1">
          ⚡ Quick response
        </div>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#0055A4] text-[#FFFFFF] hover:bg-[#1466BE] disabled:opacity-50"
      >
        {isSubmitting ? 'Sending details...' : 'Send Details'}
      </Button>

      {/* Alt CTAs */}
      <div className="border-t border-[#FFFFFF]/10 pt-6 space-y-3">
        <p className="text-center text-sm text-[#C6DAF0]">Or reach out directly:</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <a
            href={whatsappLink("I'd like to know more about your courses.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#FFFFFF]/20 px-4 py-3 text-sm font-medium text-[#FFFFFF] transition-all duration-300 hover:-translate-y-0.5 hover:border-brass/60 hover:bg-[#FFFFFF]/5 hover:text-brass-soft"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
          <a
            href={emailLink('French classes — enquiry')}
            className="flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#FFFFFF]/20 px-4 py-3 text-sm font-medium text-[#FFFFFF] transition-all duration-300 hover:-translate-y-0.5 hover:border-brass/60 hover:bg-[#FFFFFF]/5 hover:text-brass-soft"
          >
            <Mail className="h-4 w-4" />
            Email
          </a>
        </div>
        <p className="text-center font-mono text-xs text-[#C6DAF0]">
          {WHATSAPP_DISPLAY} · {EMAIL}
        </p>
      </div>
    </form>
  )
}
