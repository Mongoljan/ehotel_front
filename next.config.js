/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'dev.kacc.mn',
          pathname: '/media/**',
        },
      ],
    },
  };
  
  module.exports = nextConfig;
  