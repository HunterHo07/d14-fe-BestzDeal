/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',                  // Static export
  trailingSlash: true,               // Better routing
  images: { unoptimized: true },     // Required for static
  eslint: {
    ignoreDuringBuilds: true,        // Ignore ESLint errors during build
  },
};

export default nextConfig;
