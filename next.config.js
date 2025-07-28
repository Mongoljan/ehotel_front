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
    
    // Next.js 15 Turbopack configuration (now stable)
    turbopack: {
      resolveAlias: {
        // Add any necessary alias resolutions
      }
    }
  };
  
  module.exports = nextConfig;
  