import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'example.com'], // Add all required domains
  },
};

export default nextConfig;
