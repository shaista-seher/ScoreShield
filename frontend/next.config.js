/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  env: {
    // Add environment variables that need to be exposed to the browser
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || '/api',
  },
  // Handle images from external domains if needed
  images: {
    domains: ['localhost', 'vercel.app'],
    unoptimized: true, // Required for static export if needed
  },
  // Ensure trailing slashes for static hosting
  trailingSlash: false,
}

module.exports = nextConfig
