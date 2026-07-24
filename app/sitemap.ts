import { MetadataRoute } from 'next'
import { courses } from '@/lib/courses'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://frenchcompass.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    '',
    '/courses',
    '/upcoming-batches',
    '/learning-resources',
    '/learning-resources/placement',
    '/about',
    '/testimonials',
    '/contact',
    // Six canonical level pages
    '/courses/a1',
    '/courses/a2',
    '/courses/b1',
    '/courses/b2',
    '/courses/c1',
    '/courses/c2',
  ]

  // Non-level catalogue items (combo tracks, exam prep, workshop, e-books).
  // Level courses use the short canonical slugs above, so skip their long slugs.
  const LEVEL_SLUGS = new Set([
    'a1-absolute-beginner', 'a2-elementary', 'b1-intermediate',
    'b2-upper-intermediate', 'dalf-c1-masterclass', 'dalf-c2-masterclass',
  ])
  const coursePages = courses
    .filter((course) => !LEVEL_SLUGS.has(course.slug))
    .map((course) => ({
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
