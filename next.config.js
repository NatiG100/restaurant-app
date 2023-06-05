/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  swcMinify: true,
  webpack(config,options){
    const {isServer} = options;
    config.module.rules.push({
      test: /\.(ogg|mp3|wav|mpe?g)$/i,
      exclude: config.exclude,
      use: [
        {
          loader: require.resolve('url-loader'),
          options: {
            limit: config.inlineImageLimit,
            fallback: require.resolve('file-loader'),
            publicPath: `${config.assetPrefix}/_next/static/images/`,
            outputPath: `${isServer ? '../' : ''}static/images/`,
            name: '[name]-[hash].[ext]',
            esModule: config.esModule || false,
          },
        },
      ],
    });
    return config;
  },
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
      {
        protocol: 'http',
        hostname: "192.168.1.11",
        port: '4000',
        pathname: '/img/**',
      },
      {
        protocol: 'http',
        hostname: "172.20.101.37",
        port: '4000',
        pathname: '/img/**',
      },
      {
        protocol: 'http',
        hostname: "192.168.1.10",
        port: '4000',
        pathname: '/img/**',
      },
    ],
  },
}

module.exports = nextConfig
