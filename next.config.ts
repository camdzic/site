import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
        pathname: '/app-assets/**'
      },
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        pathname: '/image/**'
      }
    ]
  }
};

export default nextConfig;
