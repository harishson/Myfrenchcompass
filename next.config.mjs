/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
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
