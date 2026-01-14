import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // default is 1MB
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
         hostname: "media.istockphoto.com",
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: "images.unsplash.com",
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: "plus.unsplash.com",
        port: '',
        pathname: '/**',
      },
         {
        protocol: 'https',
        hostname: "res.cloudinary.com",
        port: '',
        pathname: '/**',
      },
     

    ],
  },
  /* config options here */
};

export default nextConfig;
