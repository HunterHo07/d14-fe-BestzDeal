/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',                  // Static export
  basePath: '/d14-fe-BestzDeal',     // Match repo name
  assetPrefix: '/d14-fe-BestzDeal/', // For correct asset paths
  trailingSlash: true,               // Better routing
  images: {
    unoptimized: true,     // Required for static
    loader: 'custom',
    loaderFile: './app/utils/imageLoader.js',
  },
  eslint: {
    ignoreDuringBuilds: true,        // Ignore ESLint errors during build
  },
};

export default nextConfig;
