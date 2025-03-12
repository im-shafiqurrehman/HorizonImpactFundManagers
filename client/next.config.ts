/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "res.cloudinary.com",
      "example.com",
      "images.unsplash.com",
      "hebbkx1anhila5yf.public.blob.vercel-storage.com"
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // Bypass ESLint errors during build
  },
};

module.exports = nextConfig;
