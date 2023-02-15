/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
        pathname: '/img/**',
      },
      {
        protocol: 'http',
        hostname: "172.20.44.116",
        port: '4000',
        pathname: '/img/**',
      },
    ],
  },
}

module.exports = nextConfig
