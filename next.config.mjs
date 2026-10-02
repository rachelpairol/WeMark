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
      { source: "/services", destination: "/shop", permanent: true },
      { source: "/customize", destination: "/customize/shadow-boxes", permanent: true },
    ]
  },
}

export default nextConfig
