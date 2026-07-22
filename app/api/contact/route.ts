import { NextRequest, NextResponse } from 'next/server'
import { contactSchema } from '@/lib/contact-schema'

/**
 * POST /api/contact
 * Receives contact form submission and logs it.
 * In production, integrate with Resend, Google Sheets, or CRM.
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
            errors: (error as any).errors,
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
