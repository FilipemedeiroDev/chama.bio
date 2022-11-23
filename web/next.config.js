/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'svrfyfonppewyphgwecy.supabase.co'
      },
    ],
  },
}

module.exports = nextConfig
