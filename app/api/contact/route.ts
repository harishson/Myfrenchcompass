import { NextRequest, NextResponse } from 'next/server'
import { contactSchema } from '@/lib/contact-schema'

/**
 * POST /api/contact
 *
 * ⚠️ NOT PRODUCTION-COMPLETE: this endpoint validates the submission and
 * writes it to the server log — nothing more. No email is sent to the team or
 * the enquirer, so a lead submitted here reaches nobody unless someone is
 * tailing logs. Wiring up delivery needs an account + API key (see the Resend
 * sketch below), which is why it's left as a decision rather than a default.
 *
 * Until then, the confirmation screen in components/ContactForm.tsx offers a
 * prefilled WhatsApp / mailto handoff so the enquiry still has a real route in.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate against schema
    const validated = contactSchema.parse(body)

    // Honeypot check (spam prevention)
    if (validated.company && validated.company.length > 0) {
      // Silently reject spam
      return NextResponse.json({ success: true }, { status: 200 })
    }

    // Log the submission (in production, send email via Resend, save to DB, etc.)
    console.log('Contact form submission:', {
      timestamp: new Date().toISOString(),
      firstName: validated.firstName,
      email: validated.email,
      level: validated.level,
      timePreference: validated.timePreference,
    })

    // TODO: Integrate with Resend for email notifications
    // const { data, error } = await resend.emails.send({
    //   from: 'contact@frenchcompass.com',
    //   to: validated.email,
    //   replyTo: 'support@frenchcompass.com',
    //   subject: 'We received your inquiry - French Compass',
    //   html: `<p>Hi ${validated.firstName},</p><p>Thanks for reaching out! We'll get back to you soon.</p>`,
    // })

    // TODO: Send notification to admin
    // await resend.emails.send({
    //   from: 'contact@frenchcompass.com',
    //   to: process.env.ADMIN_EMAIL!,
    //   subject: `New contact form: ${validated.firstName} (${validated.level})`,
    //   text: `${validated.firstName} ${validated.lastName || ''}\n${validated.email}\n${validated.phone}\nLevel: ${validated.level}\nTime: ${validated.timePreference}\n\nMessage: ${validated.message}`,
    // })

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for reaching out! We will contact you soon.',
      },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof Error) {
      console.error('Contact form error:', error.message)

      if (error.name === 'ZodError') {
        return NextResponse.json(
          {
            success: false,
            message: 'Please check your form and try again.',
            // Zod v4: `.issues`. `.errors` was the v3 name and is undefined here.
            errors: (error as any).issues,
          },
          { status: 400 }
        )
      }
    }

    return NextResponse.json(
      {
        success: false,
        message: 'Something went wrong. Please try again later.',
      },
      { status: 500 }
    )
  }
}
