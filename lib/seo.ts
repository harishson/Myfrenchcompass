/**
 * SEO & structured data utilities
 * JSON-LD generation for enhanced search visibility
 */

export const siteConfig = {
  name: 'French Compass',
  description:
    'Live French classes (A1–C2) with C1-certified instructors. TEF/TCF Canada exam prep, DALF masterclasses, and interactive lessons.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://frenchcompass.com',
  author: 'French Compass',
  ogImage: '/og-image.png',
}

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'French Compass',
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.png`,
  description: siteConfig.description,
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Support',
    email: 'myfrenchcompass@gmail.com',
    url: `${siteConfig.url}/contact`,
  },
  sameAs: [
    'https://www.facebook.com/frenchcompass',
    'https://www.instagram.com/frenchcompass',
    'https://www.linkedin.com/company/frenchcompass',
  ],
}

export function generateCourseSchema(course: {
  code: string
  title: string
  description: string
  priceINR: number
  duration: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.description,
    provider: {
      '@type': 'EducationalOrganization',
      name: 'French Compass',
      url: siteConfig.url,
    },
    offers: {
      '@type': 'Offer',
      price: course.priceINR,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
    duration: `P${course.duration.split(' ')[0]}W`,
  }
}

export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}
