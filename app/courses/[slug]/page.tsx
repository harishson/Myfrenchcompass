import { notFound } from 'next/navigation'
import Script from 'next/script'
import { courses } from '@/lib/courses'
import { generateCourseSchema, generateBreadcrumbSchema } from '@/lib/seo'
import { whatsappLink, emailLink } from '@/lib/contact'
import { Footer } from '@/components/Footer'
import { Section } from '@/components/Section'
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
      {/* Back Button - Visible on all devices */}
      <div className="bg-[#0C1826] border-b border-[#EDE6D6]/10 sticky top-16 md:top-24 z-30">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-2 md:py-3">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-xs md:text-sm font-medium text-[#C08A2D] hover:text-[#D8AE63] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Courses</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </div>
      </div>

      {/* Hero */}
      <Section variant="ink" className="pt-10 md:pt-16 pb-6 md:pb-8">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <Reveal>
            <div className="inline-block mb-3">
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-[#C08A2D]">
                {course.category}
              </span>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-[#EDE6D6] mb-4">
              {course.title}
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-xl text-[#93A6BC] mb-8 max-w-3xl leading-relaxed">
              {course.subtitle}
            </p>
          </Reveal>
          <Reveal delay={300} className="flex flex-col sm:flex-row gap-4">
            <Button 
              asChild
              className="bg-[#2440E8] text-[#EDE6D6] hover:bg-[#3E59FF]"
            >
              <Link href={`/contact?course=${encodeURIComponent(course.title)}&slug=${course.slug}`}>
                Reserve a seat
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-[#EDE6D6]/20 text-[#EDE6D6] hover:bg-[#EDE6D6]/10"
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
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-[#C08A2D]">
                  {course.abilities.eyebrow}
                </span>
              </div>
            </Reveal>
            <div className="space-y-3">
              {course.abilities.items.map((item, i) => (
                <Reveal key={i} delay={i * 50} className="flex gap-3">
                  <div className="w-1 h-1 bg-[#C08A2D] rounded-full flex-shrink-0 mt-2" />
                  <p className="text-base md:text-lg text-[#93A6BC] leading-relaxed">
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
                <div className="font-display text-3xl font-bold text-[#2440E8] mb-2">
                  {course.duration}
                </div>
                <p className="text-sm text-[#546575] font-mono uppercase tracking-widest">
                  Duration
                </p>
              </div>
            </Reveal>
            <Reveal delay={50}>
              <div className="text-center">
                <div className="font-display text-3xl font-bold text-[#2440E8] mb-2">
                  {course.sessions}
                </div>
                <p className="text-sm text-[#546575] font-mono uppercase tracking-widest">
                  Sessions
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="text-center">
                <div className="font-display text-3xl font-bold text-[#2440E8] mb-2">
                  {course.classSize}
                </div>
                <p className="text-sm text-[#546575] font-mono uppercase tracking-widest">
                  Class size
                </p>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className="text-center">
                <div className="font-display text-3xl font-bold text-[#C08A2D] mb-2">
                  ₹{course.priceINR}
                </div>
                <p className="text-sm text-[#546575] font-mono uppercase tracking-widest">
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
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#0C1826] mb-8">
              What you&apos;ll learn
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {course.highlights.map((highlight, i) => (
              <Reveal key={i} delay={i * 50} className="flex gap-3">
                <Check className="w-5 h-5 text-[#C08A2D] flex-shrink-0 mt-1" />
                <div>
                  <p className="text-[#122130] font-semibold">{highlight}</p>
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
                <Clock className="w-6 h-6 text-[#C08A2D] flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-[#EDE6D6] mb-1">Schedule</h3>
                  <p className="text-[#93A6BC] text-sm">
                    {course.schedule}
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={50}>
              <div className="flex gap-3">
                <Users className="w-6 h-6 text-[#C08A2D] flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-[#EDE6D6] mb-1">Live & Interactive</h3>
                  <p className="text-[#93A6BC] text-sm">
                    All classes are 90 minutes of live instruction with real instructors.
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="flex gap-3">
                <BookOpen className="w-6 h-6 text-[#C08A2D] flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-[#EDE6D6] mb-1">Materials Included</h3>
                  <p className="text-[#93A6BC] text-sm">
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
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#0C1826] mb-8 text-center">
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
                <div className="p-5 bg-[#EAE0CC] rounded-lg">
                  <h3 className="font-semibold text-[#0C1826] mb-2">{faq.q}</h3>
                  <p className="text-[#546575] text-sm">{faq.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section variant="ink" className="py-8 md:py-10">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#EDE6D6] mb-6">
            Ready to chart your course?
          </h2>
          <Button 
            asChild
            className="bg-[#C08A2D] text-[#0C1826] hover:bg-[#D8AE63] text-base px-6 py-2"
          >
            <Link href={`/contact?course=${encodeURIComponent(course.title)}&slug=${course.slug}`}>
              Reserve your seat now
            </Link>
          </Button>
          <p className="text-[#93A6BC] mt-6 text-sm">
            Questions? <Link href="/contact" className="text-[#C08A2D] hover:underline">Send us a message</Link>,{' '}
            <a
              href={whatsappLink(`I'd like to know more about the ${course.title} course.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C08A2D] hover:underline"
            >
              chat on WhatsApp
            </a>{' '}
            or{' '}
            <a
              href={emailLink(`${course.title} — enquiry`)}
              className="text-[#C08A2D] hover:underline"
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
