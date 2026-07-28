/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    /* Was `unoptimized: true` (a v0 scaffold default), which shipped every
       image as the raw file at one fixed size — no modern format, no density
       switching. Enabling the pipeline lets Vercel serve AVIF/WebP at the exact
       size each viewport asks for, which is the single biggest quality win
       available on the hero photograph. */
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1500, 1920, 2048],
    /* Next 16 only honours `quality` values listed here; anything else silently
       falls back to 75. The hero photograph is enlarged from a small source, so
       it needs the higher setting to avoid compounding the softness. */
    qualities: [75, 90],
  },
  async redirects() {
    return [
      // Playground → Learning Resources (client already shared the old links)
      { source: '/playground', destination: '/learning-resources', permanent: true },
      { source: '/playground/placement', destination: '/learning-resources/placement', permanent: true },
      { source: '/playground/:path*', destination: '/learning-resources/:path*', permanent: true },

      // Long course slugs → canonical short level slugs
      { source: '/courses/a1-absolute-beginner', destination: '/courses/a1', permanent: true },
      { source: '/courses/a2-elementary', destination: '/courses/a2', permanent: true },
      { source: '/courses/b1-intermediate', destination: '/courses/b1', permanent: true },
      { source: '/courses/b2-upper-intermediate', destination: '/courses/b2', permanent: true },
      { source: '/courses/dalf-c1-masterclass', destination: '/courses/c1', permanent: true },
      { source: '/courses/dalf-c2-masterclass', destination: '/courses/c2', permanent: true },
    ]
  },
}

export default nextConfig
