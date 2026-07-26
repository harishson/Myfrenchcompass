import { notFound } from 'next/navigation'
import Script from 'next/script'
import { courses } from '@/lib/courses'
import { generateCourseSchema, generateBreadcrumbSchema } from '@/lib/seo'
import { whatsappLink, emailLink } from '@/lib/contact'
import { Footer } from '@/components/Footer'
import { Section } from '@/components/Section'
import { HeaderSpacer } from '@/components/ui-primitives'
import { Reveal } from '@/components/Reveal'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Check, Clock, Users, BookOpen, ArrowLeft } from 'lucide-react'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return courses.map((course) => ({
    slug: course.slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const course = courses.find((c) => c.slug === slug)

  if (!course) {
    return { title: 'Course Not Found' }
  }

  return {
    title: `${course.title} | French Compass`,
    description: course.subtitle,
  }
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params
  const course = courses.find((c) => c.slug === slug)

  if (!course) {
    notFound()
  }

  // Parse level description
  const levelLabel = course.level.includes('–') 
    ? course.level 
    : `${course.level.split('+').join(' + ')}`

  const courseSchema = generateCourseSchema(course)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Courses', url: '/courses' },
    { name: course.title, url: `/courses/${course.slug}` },
  ])

  return (
    <>
      <Script
        id={`course-${course.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <Script
        id={`breadcrumb-${course.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Back to the catalogue — offset by the real header height so it is never
          tucked under the fixed navbar. */}
      <HeaderSpacer />
      <div className="sticky top-[var(--header-h)] z-30 border-b border-[#FFFFFF]/10 bg-[#003A72]">
        <div className="mx-auto max-w-6xl px-4 py-2 md:px-6 md:py-3">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-xs md:text-sm">
              <li>
                <Link
                  href="/courses"
                  className="inline-flex min-h-9 items-center gap-2 font-medium text-[#EF4135] transition-colors hover:text-[#FF7A70]"
                >
                  <ArrowLeft className="h-4 w-4" />
                  All courses
                </Link>
              </li>
              <li aria-hidden className="text-[#C6DAF0]/40">/</li>
              <li className="truncate text-[#C6DAF0]">{course.title}</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <Section variant="ink" className="pt-10 md:pt-16 pb-6 md:pb-8">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <Reveal>
            <div className="inline-block mb-3">
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-[#EF4135]">
                {course.category}
              </span>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-[#FFFFFF] mb-4">
              {course.title}
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-xl text-[#C6DAF0] mb-8 max-w-3xl leading-relaxed">
              {course.subtitle}
            </p>
          </Reveal>
          <Reveal delay={300} className="flex flex-col sm:flex-row gap-4">
            <Button 
              asChild
              className="bg-[#0055A4] text-[#FFFFFF] hover:bg-[#1466BE]"
            >
              <Link href={`/contact?course=${encodeURIComponent(course.title)}&slug=${course.slug}`}>
                Reserve a seat
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-[#FFFFFF]/20 text-[#FFFFFF] hover:bg-[#FFFFFF]/10"
            >
              <Link href="/contact">Ask a question</Link>
            </Button>
          </Reveal>
        </div>
      </Section>

      {/* What You'll Be Able to Do */}
      {course.abilities && (
        <Section variant="ink" className="py-8 md:py-10">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <Reveal>
              <div className="inline-block mb-3">
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-[#EF4135]">
                  {course.abilities.eyebrow}
                </span>
              </div>
            </Reveal>
            <div className="space-y-3">
              {course.abilities.items.map((item, i) => (
                <Reveal key={i} delay={i * 50} className="flex gap-3">
                  <div className="w-1 h-1 bg-[#EF4135] rounded-full flex-shrink-0 mt-2" />
                  <p className="text-base md:text-lg text-[#C6DAF0] leading-relaxed">
                    {item}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* Course Stats */}
      <Section variant="parchment" className="py-6 md:py-8">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <Reveal>
              <div className="text-center">
                <div className="font-display text-3xl font-bold text-[#0055A4] mb-2">
                  {course.duration}
                </div>
                <p className="text-sm text-[#5C6B82] font-mono uppercase tracking-widest">
                  Duration
                </p>
              </div>
            </Reveal>
            <Reveal delay={50}>
              <div className="text-center">
                <div className="font-display text-3xl font-bold text-[#0055A4] mb-2">
                  {course.sessions}
                </div>
                <p className="text-sm text-[#5C6B82] font-mono uppercase tracking-widest">
                  Sessions
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="text-center">
                <div className="font-display text-3xl font-bold text-[#0055A4] mb-2">
                  {course.classSize}
                </div>
                <p className="text-sm text-[#5C6B82] font-mono uppercase tracking-widest">
                  Class size
                </p>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className="text-center">
                <div className="font-display text-3xl font-bold text-[#EF4135] mb-2">
                  ₹{course.priceINR}
                </div>
                <p className="text-sm text-[#5C6B82] font-mono uppercase tracking-widest">
                  Price
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* What You'll Learn */}
      <Section variant="parchment" className="py-8 md:py-10">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#003A72] mb-8">
              What you&apos;ll learn
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {course.highlights.map((highlight, i) => (
              <Reveal key={i} delay={i * 50} className="flex gap-3">
                <Check className="w-5 h-5 text-[#EF4135] flex-shrink-0 mt-1" />
                <div>
                  <p className="text-[#16233B] font-semibold">{highlight}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Course Details */}
      <Section variant="ink" className="py-8 md:py-10">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Reveal>
              <div className="flex gap-3">
                <Clock className="w-6 h-6 text-[#EF4135] flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-[#FFFFFF] mb-1">Schedule</h3>
                  <p className="text-[#C6DAF0] text-sm">
                    {course.schedule}
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={50}>
              <div className="flex gap-3">
                <Users className="w-6 h-6 text-[#EF4135] flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-[#FFFFFF] mb-1">Live & Interactive</h3>
                  <p className="text-[#C6DAF0] text-sm">
                    All classes are 90 minutes of live instruction with real instructors.
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="flex gap-3">
                <BookOpen className="w-6 h-6 text-[#EF4135] flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-[#FFFFFF] mb-1">Materials Included</h3>
                  <p className="text-[#C6DAF0] text-sm">
                    Lesson slides, vocabulary lists, and homework assignments.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section variant="parchment" className="py-8 md:py-10">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#003A72] mb-8 text-center">
              Common questions
            </h2>
          </Reveal>
          <div className="space-y-4">
            {[
              {
                q: 'Can I take a demo class first?',
                a: 'Absolutely! We offer a free 20-minute demo class. Click "Ask a question" to schedule yours.',
              },
              {
                q: 'What if I miss a class?',
                a: 'Classes are recorded. You can catch up anytime during the course.',
              },
              {
                q: 'What do I need to join?',
                a: 'Just a stable internet connection and a quiet space. Zoom link is sent 15 minutes before class.',
              },
              {
                q: 'Is there a refund policy?',
                a: 'Yes. Full refund up to 7 days before course starts; 50% refund up to 3 days before.',
              },
            ].map((faq, i) => (
              <Reveal key={i} delay={i * 50}>
                <div className="p-5 bg-[#F1F5FB] rounded-lg">
                  <h3 className="font-semibold text-[#003A72] mb-2">{faq.q}</h3>
                  <p className="text-[#5C6B82] text-sm">{faq.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section variant="ink" className="py-8 md:py-10">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#FFFFFF] mb-6">
            Ready to chart your course?
          </h2>
          <Button 
            asChild
            className="bg-[#EF4135] text-[#003A72] hover:bg-[#FF7A70] text-base px-6 py-2"
          >
            <Link href={`/contact?course=${encodeURIComponent(course.title)}&slug=${course.slug}`}>
              Reserve your seat now
            </Link>
          </Button>
          <p className="text-[#C6DAF0] mt-6 text-sm">
            Questions? <Link href="/contact" className="text-[#EF4135] hover:underline">Send us a message</Link>,{' '}
            <a
              href={whatsappLink(`I'd like to know more about the ${course.title} course.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#EF4135] hover:underline"
            >
              chat on WhatsApp
            </a>{' '}
            or{' '}
            <a
              href={emailLink(`${course.title} — enquiry`)}
              className="text-[#EF4135] hover:underline"
            >
              email us
            </a>
            .
          </p>
        </div>
      </Section>

      <Footer />
    </>
  )
}
