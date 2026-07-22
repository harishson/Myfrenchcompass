import { MetadataRoute } from 'next'
import { courses } from '@/lib/courses'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://frenchcompass.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    '',
    '/courses',
    '/playground/placement',
    '/about',
    '/testimonials',
    '/contact',
    '/ebooks',
    '/legal/terms',
    '/legal/privacy',
    '/legal/refund',
  ]

  const coursePages = courses.map((course) => ({
    url: `${baseUrl}/courses/${course.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const staticSitemap = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return [...staticSitemap, ...coursePages]
}
