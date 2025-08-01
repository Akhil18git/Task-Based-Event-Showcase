import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions:{
    includePaths: ['src'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    domains: [
      'via.placeholder.com',
    ]
  },
};

export default nextConfig;
